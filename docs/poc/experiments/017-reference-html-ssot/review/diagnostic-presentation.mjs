import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function ordered(value) {
  if (Array.isArray(value)) return value.map(ordered);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, ordered(value[key])]));
}

export function stableValue(value) {
  return JSON.stringify(ordered(value));
}

export function splitDifferencePath(path) {
  if (path.startsWith('initial.')) {
    return { state: 'initial', normalizedPath: path.slice('initial.'.length) };
  }
  const scenario = /^scenarios\.(.+)\.step-(\d+)\.(.+)$/.exec(path);
  if (scenario) {
    return {
      state: `scenarios.${scenario[1]}.step-${scenario[2]}`,
      normalizedPath: scenario[3]
    };
  }
  return { state: 'bundle', normalizedPath: path };
}

export function diagnosticKind(difference) {
  if (difference.severity === 'error') return 'error';
  if (/\.box\.(?:x|y|width|height)$/.test(difference.path) && Number.isFinite(difference.delta)) {
    return 'geometry';
  }
  if (difference.expected === '<not present>' && difference.actual === 'extra annotated element') {
    return 'extra-element';
  }
  return 'other';
}

function observationDetail(difference) {
  return ordered(Object.fromEntries(
    Object.entries(difference).filter(([key]) => !['severity', 'path'].includes(key))
  ));
}

export function groupDifferences(differences, { includeValues = true } = {}) {
  const groups = new Map();
  differences.forEach((difference, index) => {
    const { state, normalizedPath } = splitDifferencePath(difference.path);
    const kind = diagnosticKind(difference);
    const detail = observationDetail(difference);
    const signatureShape = {
      severity: difference.severity,
      kind,
      normalizedPath,
      ...(includeValues ? { detail } : {})
    };
    const signature = stableValue(signatureShape);
    if (!groups.has(signature)) {
      groups.set(signature, {
        severity: difference.severity,
        kind,
        normalizedPath,
        detail,
        occurrenceCount: 0,
        rawDifferenceIndexes: [],
        states: []
      });
    }
    const group = groups.get(signature);
    group.occurrenceCount += 1;
    group.rawDifferenceIndexes.push(index + 1);
    if (!group.states.includes(state)) group.states.push(state);
  });
  return [...groups.values()].sort((left, right) => {
    const leftKey = [left.severity === 'error' ? '0' : '1', left.kind, left.normalizedPath, stableValue(left.detail)].join('|');
    const rightKey = [right.severity === 'error' ? '0' : '1', right.kind, right.normalizedPath, stableValue(right.detail)].join('|');
    return leftKey.localeCompare(rightKey);
  });
}

function requireRawSummary(report, errors, diagnostics) {
  if (!report.summary || report.summary.errorCount !== errors.length) {
    throw new Error('Raw report summary.errorCount does not match its differences array.');
  }
  if (report.summary.diagnosticCount !== diagnostics.length) {
    throw new Error('Raw report summary.diagnosticCount does not match its differences array.');
  }
  const derivedStatus = errors.length ? 'fail' : 'pass';
  if (report.status !== derivedStatus) {
    throw new Error(`Raw report status ${report.status} does not match derived status ${derivedStatus}.`);
  }
}

export function buildPresentation(report, source) {
  const differences = report.differences || [];
  const rawErrors = differences.filter((difference) => difference.severity === 'error');
  const rawDiagnostics = differences.filter((difference) => difference.severity === 'info');
  const unknown = differences.filter((difference) => !['error', 'info'].includes(difference.severity));
  if (unknown.length) throw new Error(`Raw report contains ${unknown.length} unsupported severity value(s).`);
  requireRawSummary(report, rawErrors, rawDiagnostics);

  const entries = groupDifferences(differences, { includeValues: true });
  const errors = entries.filter((entry) => entry.severity === 'error');
  const diagnostics = entries.filter((entry) => entry.severity === 'info');
  return {
    schemaVersion: 1,
    responsibility: 'review-presentation-only',
    source: {
      reportPath: source.reportPath,
      sha256: source.sha256,
      schemaVersion: report.schemaVersion,
      status: report.status
    },
    summary: {
      status: report.status,
      rawDifferenceCount: differences.length,
      rawErrorCount: rawErrors.length,
      rawDiagnosticCount: rawDiagnostics.length,
      reviewerEntryCount: entries.length,
      errorEntryCount: errors.length,
      diagnosticEntryCount: diagnostics.length,
      repeatedOccurrencesCollapsed: differences.length - entries.length,
      rawCountsPreserved: true
    },
    ordering: [
      'severity: error before informational diagnostic',
      'within severity: diagnostic shape, normalized path, exact observation values'
    ],
    traceability: {
      differenceArray: 'differences',
      rawDifferenceIndexBase: 1,
      guarantee: 'Every raw difference index occurs in exactly one presentation entry.'
    },
    errors,
    diagnostics
  };
}

export function auditPresentationTrace(report, presentation) {
  const entries = [...presentation.errors, ...presentation.diagnostics];
  const indexed = entries.flatMap((entry) => entry.rawDifferenceIndexes);
  const expectedIndexes = (report.differences || []).map((_, index) => index + 1);
  const sortedIndexes = [...indexed].sort((left, right) => left - right);
  const missingOrDuplicateIndexes = stableValue(sortedIndexes) !== stableValue(expectedIndexes);
  const signatureMismatches = [];
  entries.forEach((entry, entryIndex) => {
    const raw = entry.rawDifferenceIndexes.map((index) => report.differences[index - 1]);
    const regrouped = groupDifferences(raw, { includeValues: true });
    if (regrouped.length !== 1) {
      signatureMismatches.push(entryIndex + 1);
      return;
    }
    const reconstructed = regrouped[0];
    if (
      reconstructed.severity !== entry.severity ||
      reconstructed.kind !== entry.kind ||
      reconstructed.normalizedPath !== entry.normalizedPath ||
      stableValue(reconstructed.detail) !== stableValue(entry.detail) ||
      reconstructed.occurrenceCount !== entry.occurrenceCount
    ) signatureMismatches.push(entryIndex + 1);
  });
  return {
    status: !missingOrDuplicateIndexes && !signatureMismatches.length ? 'pass' : 'fail',
    rawDifferenceCount: expectedIndexes.length,
    indexedOccurrenceCount: indexed.length,
    uniqueIndexedOccurrenceCount: new Set(indexed).size,
    missingOrDuplicateIndexes,
    signatureMismatches
  };
}

function inline(value) {
  return stableValue(value).replaceAll('|', '\\|').replaceAll('`', '\\`');
}

function renderEntry(entry, index) {
  const values = Object.keys(entry.detail).length ? inline(entry.detail) : '{}';
  return `| ${index + 1} | ${entry.kind} | \`${entry.normalizedPath}\` | ${values} | ${entry.occurrenceCount} | ${entry.states.length} | ${entry.rawDifferenceIndexes.join(', ')} |`;
}

export function renderMarkdown(presentation) {
  const lines = [
    '# Diagnostic review presentation',
    '',
    `- Status: **${presentation.summary.status}**`,
    `- Complete raw evidence: \`${presentation.source.reportPath}\``,
    `- Raw SHA-256: \`${presentation.source.sha256}\``,
    `- Raw differences: ${presentation.summary.rawDifferenceCount} (${presentation.summary.rawErrorCount} errors, ${presentation.summary.rawDiagnosticCount} informational diagnostics)`,
    `- Reviewer entries: ${presentation.summary.reviewerEntryCount} (${presentation.summary.errorEntryCount} errors, ${presentation.summary.diagnosticEntryCount} informational signatures)`,
    '- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.',
    '- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.',
    '',
    '## Errors',
    ''
  ];
  if (!presentation.errors.length) lines.push('None.', '');
  else {
    lines.push('| # | Kind | Observable path | Exact values | Occurrences | States | Raw indexes |', '| ---: | --- | --- | --- | ---: | ---: | --- |');
    presentation.errors.forEach((entry, index) => lines.push(renderEntry(entry, index)));
    lines.push('');
  }
  lines.push('## Informational diagnostics', '');
  if (!presentation.diagnostics.length) lines.push('None.', '');
  else {
    lines.push('| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |', '| ---: | --- | --- | --- | ---: | ---: | --- |');
    presentation.diagnostics.forEach((entry, index) => lines.push(renderEntry(entry, index)));
    lines.push('');
  }
  lines.push('Shape labels describe report data only. They do not claim a root cause or importance level.', '');
  return `${lines.join('\n')}\n`;
}

function parseArgs(args) {
  if (!args.length) throw new Error('Usage: diagnostic-presentation.mjs REPORT --out FILE [--markdown FILE]');
  const parsed = { report: args[0] };
  for (let index = 1; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!value || !['--out', '--markdown'].includes(flag)) throw new Error(`Unknown or incomplete option: ${flag}`);
    parsed[flag.slice(2)] = value;
  }
  if (!parsed.out) throw new Error('--out is required.');
  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const raw = await readFile(resolve(args.report));
  const report = JSON.parse(raw.toString('utf8'));
  const presentation = buildPresentation(report, {
    reportPath: args.report.replaceAll('\\', '/'),
    sha256: createHash('sha256').update(raw).digest('hex').toUpperCase()
  });
  await mkdir(dirname(resolve(args.out)), { recursive: true });
  await writeFile(resolve(args.out), `${JSON.stringify(presentation, null, 2)}\n`);
  if (args.markdown) {
    await mkdir(dirname(resolve(args.markdown)), { recursive: true });
    await writeFile(resolve(args.markdown), renderMarkdown(presentation));
  }
  console.log(`review: ${presentation.summary.status} (${presentation.summary.errorEntryCount} error entries, ${presentation.summary.diagnosticEntryCount} diagnostic entries from ${presentation.summary.rawDifferenceCount} raw differences)`);
  console.log(`wrote ${resolve(args.out)}`);
  if (args.markdown) console.log(`wrote ${resolve(args.markdown)}`);
  if (presentation.summary.status !== 'pass') process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.stack || error.message || String(error));
    process.exitCode = 2;
  });
}
