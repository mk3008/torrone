import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  auditPresentationTrace,
  buildPresentation,
  diagnosticKind,
  groupDifferences,
  renderMarkdown,
  splitDifferencePath,
  stableValue
} from './diagnostic-presentation.mjs';

function parseArgs(args) {
  if (args.length < 3 || args[0] !== '--out') {
    throw new Error('Usage: diagnostic-analysis.mjs --out FILE NAME=REPORT [...]');
  }
  return {
    out: args[1],
    reports: args.slice(2).map((entry) => {
      const separator = entry.indexOf('=');
      if (separator < 1) throw new Error(`Expected NAME=REPORT but received ${entry}`);
      return { name: entry.slice(0, separator), path: entry.slice(separator + 1) };
    })
  };
}

function fieldKey(difference) {
  return stableValue({
    kind: diagnosticKind(difference),
    normalizedPath: splitDifferencePath(difference.path).normalizedPath
  });
}

function exactKey(difference) {
  const group = groupDifferences([difference], { includeValues: true })[0];
  return stableValue({ kind: group.kind, normalizedPath: group.normalizedPath, detail: group.detail });
}

function aggregateFamilies(comparisons, names) {
  const selected = comparisons.filter((comparison) => names.includes(comparison.name));
  return {
    rawDiagnosticCount: selected.reduce((sum, item) => sum + item.raw.diagnosticCount, 0),
    exactDiagnosticEntryCount: selected.reduce((sum, item) => sum + item.exactValue.diagnosticEntryCount, 0),
    fieldOnlyDiagnosticEntryCount: selected.reduce((sum, item) => sum + item.fieldOnly.diagnosticEntryCount, 0),
    repeatedOccurrencesCollapsed: selected.reduce((sum, item) => sum + item.exactValue.repeatedOccurrencesCollapsed, 0),
    heterogeneousFieldGroups: selected.reduce((sum, item) => sum + item.fieldOnly.heterogeneousGroupCount, 0)
  };
}

async function analyze(name, path) {
  const bytes = await readFile(resolve(path));
  const report = JSON.parse(bytes.toString('utf8'));
  const presentation = buildPresentation(report, {
    reportPath: path.replaceAll('\\', '/'),
    sha256: createHash('sha256').update(bytes).digest('hex').toUpperCase()
  });
  const diagnostics = report.differences.filter((difference) => difference.severity === 'info');
  const kindCounts = {};
  diagnostics.forEach((difference) => {
    const kind = diagnosticKind(difference);
    kindCounts[kind] = (kindCounts[kind] || 0) + 1;
  });
  const fieldGroups = new Map();
  diagnostics.forEach((difference) => {
    const key = fieldKey(difference);
    if (!fieldGroups.has(key)) fieldGroups.set(key, { field: JSON.parse(key), exactKeys: new Set(), occurrences: 0 });
    const group = fieldGroups.get(key);
    group.exactKeys.add(exactKey(difference));
    group.occurrences += 1;
  });
  const heterogeneousGroups = [...fieldGroups.values()]
    .filter((group) => group.exactKeys.size > 1)
    .map((group) => ({
      ...group.field,
      occurrenceCount: group.occurrences,
      exactObservationCount: group.exactKeys.size
    }))
    .sort((left, right) => left.normalizedPath.localeCompare(right.normalizedPath));
  const trace = auditPresentationTrace(report, presentation);
  if (trace.status !== 'pass') throw new Error(`${name} failed presentation trace audit.`);
  return {
    name,
    sourcePath: path.replaceAll('\\', '/'),
    sourceSha256: presentation.source.sha256,
    sourceStatus: report.status,
    raw: {
      differenceCount: report.differences.length,
      errorCount: report.summary.errorCount,
      diagnosticCount: report.summary.diagnosticCount,
      diagnosticKinds: kindCounts,
      jsonLineCount: bytes.toString('utf8').split(/\r?\n/).length - 1
    },
    exactValue: {
      reviewerEntryCount: presentation.summary.reviewerEntryCount,
      errorEntryCount: presentation.summary.errorEntryCount,
      diagnosticEntryCount: presentation.summary.diagnosticEntryCount,
      repeatedOccurrencesCollapsed: presentation.summary.repeatedOccurrencesCollapsed,
      markdownLineCount: renderMarkdown(presentation).split(/\r?\n/).length - 1,
      trace
    },
    fieldOnly: {
      diagnosticEntryCount: groupDifferences(diagnostics, { includeValues: false }).length,
      heterogeneousGroupCount: heterogeneousGroups.length,
      heterogeneousGroups
    }
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const comparisons = [];
  for (const report of args.reports) comparisons.push(await analyze(report.name, report.path));
  const output = {
    schemaVersion: 1,
    selectedPresentation: 'exact-observation-signature',
    reason: 'It groups only state/frame repetition with identical path and values; it does not infer cause.',
    comparisons,
    families: {
      search: aggregateFamilies(comparisons, ['search-shell', 'search-workspace']),
      formHeavy: aggregateFamilies(comparisons, ['form-shell', 'form-workflow'])
    }
  };
  await mkdir(dirname(resolve(args.out)), { recursive: true });
  await writeFile(resolve(args.out), `${JSON.stringify(output, null, 2)}\n`);
  console.log(`analysis: ${comparisons.length} reports; wrote ${resolve(args.out)}`);
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 2;
});

