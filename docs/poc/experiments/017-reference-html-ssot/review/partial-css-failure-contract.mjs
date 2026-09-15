import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { splitDifferencePath } from './diagnostic-presentation.mjs';

function fail(message) {
  throw new Error(`Partial CSS failure contract: ${message}`);
}

function errorObservations(report) {
  const differences = Array.isArray(report?.differences) ? report.differences : [];
  const errors = differences
    .map((difference, index) => ({ difference, rawIndex: index + 1 }))
    .filter(({ difference }) => difference.severity === 'error')
    .map(({ difference, rawIndex }) => ({
      rawIndex,
      path: difference.path,
      normalizedPath: splitDifferencePath(difference.path).normalizedPath,
      expected: difference.expected,
      actual: difference.actual
    }));
  if (report?.summary?.errorCount !== errors.length) {
    fail(`errorCount ${report?.summary?.errorCount} does not match ${errors.length} error differences`);
  }
  return errors;
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function requireStatusConsistency(report, errors, label) {
  const expectedStatus = errors.length ? 'fail' : 'pass';
  if (report.status !== expectedStatus) {
    fail(`${label} status must be ${expectedStatus} for ${errors.length} errors; received ${report.status}`);
  }
}

export function evaluatePartialCssFailureContract(controlReports, mutationReport, options) {
  const affectedElementKeys = sortedUnique(options?.affectedElementKeys || []);
  if (!affectedElementKeys.length) fail('affectedElementKeys must be non-empty');
  if (options?.property !== 'borderRadius') fail('property must be borderRadius');
  if (options?.expected !== '6px' || options?.actual !== '20px') {
    fail('mutation values must remain 6px -> 20px');
  }

  const controls = Array.isArray(controlReports) ? controlReports : [controlReports];
  if (controls.length < 2) fail('at least two exact control reports are required');
  const controlRuns = controls.map((report, index) => {
    const errors = errorObservations(report);
    requireStatusConsistency(report, errors, `control ${index + 1}`);
    return { report, errors };
  });
  const controlErrors = controlRuns.flatMap((run) => run.errors);
  const mutationErrors = errorObservations(mutationReport);
  requireStatusConsistency(mutationReport, mutationErrors, 'mutation');
  if (!mutationErrors.length) fail('mutation report unexpectedly passes');

  const expectedPaths = affectedElementKeys.map((key) => `elements.${key}.styles.borderRadius`).sort();
  const controlSignatures = sortedUnique(controlErrors.map((item) => item.normalizedPath));
  const affectedObservedInControl = expectedPaths.filter((path) => controlSignatures.includes(path));
  if (affectedObservedInControl.length) {
    fail(`control reports already contain affected mutation paths: ${affectedObservedInControl.join(', ')}`);
  }
  const sharedSecondary = mutationErrors.filter((item) => controlSignatures.includes(item.normalizedPath));
  const mutationOnly = mutationErrors.filter((item) => !controlSignatures.includes(item.normalizedPath));
  const mutationPaths = sortedUnique(mutationOnly.map((item) => item.normalizedPath));
  if (JSON.stringify(mutationPaths) !== JSON.stringify(expectedPaths)) {
    fail(`mutation-only paths do not match affected elements: ${mutationPaths.join(', ')}`);
  }
  for (const observation of mutationOnly) {
    if (observation.expected !== options.expected || observation.actual !== options.actual) {
      fail(`unexpected mutation values at ${observation.path}: ${JSON.stringify(observation.expected)} -> ${JSON.stringify(observation.actual)}`);
    }
  }

  return {
    status: 'pass',
    contract: 'control-observed-secondary-signature-separated-css-mutation-delta',
    mutation: {
      selector: options.selector,
      affectedElementKeys,
      property: options.property,
      expected: options.expected,
      actual: options.actual
    },
    controls: {
      runCount: controlRuns.length,
      runs: controlRuns.map(({ report, errors }, index) => ({
        index: index + 1,
        status: report.status,
        errorCount: errors.length,
        signatures: sortedUnique(errors.map((item) => item.normalizedPath)),
        rawErrorIndexes: errors.map((item) => item.rawIndex)
      })),
      observedSecondaryErrorCount: controlErrors.length,
      observedSecondarySignatures: controlSignatures
    },
    mutationOnly: {
      errorCount: mutationOnly.length,
      signatures: mutationPaths,
      rawErrorIndexes: mutationOnly.map((item) => item.rawIndex)
    },
    sharedSecondary: {
      errorCount: sharedSecondary.length,
      signatures: sortedUnique(sharedSecondary.map((item) => item.normalizedPath))
    },
    controlOnlySecondary: {
      errorCount: controlErrors.filter((item) => !sharedSecondary.some((shared) => shared.normalizedPath === item.normalizedPath)).length,
      signatures: controlSignatures.filter((path) => !sharedSecondary.some((item) => item.normalizedPath === path))
    }
  };
}

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!value || !['--control', '--mutation', '--affected-keys', '--out'].includes(flag)) {
      throw new Error(`Unknown or incomplete option: ${flag}`);
    }
    const key = flag.slice(2);
    if (key === 'control') {
      parsed.control ||= [];
      parsed.control.push(value);
    } else {
      parsed[key] = value;
    }
  }
  for (const key of ['mutation', 'affected-keys', 'out']) {
    if (!parsed[key]) throw new Error(`--${key} is required`);
  }
  if (!parsed.control || parsed.control.length < 2) throw new Error('--control is required at least twice');
  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const controlBytes = await Promise.all(args.control.map((path) => readFile(resolve(path))));
  const mutationBytes = await readFile(resolve(args.mutation));
  const result = evaluatePartialCssFailureContract(
    controlBytes.map((bytes) => JSON.parse(bytes.toString('utf8'))),
    JSON.parse(mutationBytes.toString('utf8')),
    {
      selector: '.outline-action',
      affectedElementKeys: args['affected-keys'].split(',').map((value) => value.trim()).filter(Boolean),
      property: 'borderRadius',
      expected: '6px',
      actual: '20px'
    }
  );
  result.sources = {
    controls: args.control.map((path, index) => ({
      path: path.replaceAll('\\', '/'),
      sha256: createHash('sha256').update(controlBytes[index]).digest('hex').toUpperCase()
    })),
    mutation: { path: args.mutation.replaceAll('\\', '/'), sha256: createHash('sha256').update(mutationBytes).digest('hex').toUpperCase() }
  };
  await mkdir(dirname(resolve(args.out)), { recursive: true });
  await writeFile(resolve(args.out), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`partial-css-contract: pass (${result.mutationOnly.errorCount} mutation-only errors; ${result.controls.observedSecondaryErrorCount} observed control errors)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.stack || error.message || String(error));
    process.exitCode = 1;
  });
}
