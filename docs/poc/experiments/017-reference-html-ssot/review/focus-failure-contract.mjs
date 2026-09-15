import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { splitDifferencePath } from './diagnostic-presentation.mjs';

const REQUIRED_PATH = 'elements.filter-toggle.styles.outlineColor';
const EXPECTED_COLORS = ['rgb(16, 29, 47)', 'rgb(134, 185, 238)'];
const MUTATED_COLOR = 'rgb(255, 0, 170)';
const ALLOWED_PATH = /^elements\.[^.]+\.styles\.outlineColor$/;

function fail(message) {
  throw new Error(`Focus failure contract: ${message}`);
}

function errorObservations(report) {
  if (report.status !== 'fail') fail(`raw status must be fail; received ${report.status}`);
  const errors = report.differences
    .map((difference, index) => ({ difference, rawIndex: index + 1 }))
    .filter(({ difference }) => difference.severity === 'error')
    .map(({ difference, rawIndex }) => ({
      rawIndex,
      normalizedPath: splitDifferencePath(difference.path).normalizedPath,
      expected: difference.expected,
      actual: difference.actual
    }));
  if (!errors.length) fail('raw report contains no errors');
  if (report.summary.errorCount !== errors.length) {
    fail(`raw errorCount ${report.summary.errorCount} does not match ${errors.length} error differences`);
  }
  return errors;
}

function validateObservation(observation) {
  if (!ALLOWED_PATH.test(observation.normalizedPath)) {
    fail(`unrelated error path ${observation.normalizedPath}`);
  }
  if (!EXPECTED_COLORS.includes(observation.expected) || observation.actual !== MUTATED_COLOR) {
    fail(`unexpected values at ${observation.normalizedPath}: expected=${JSON.stringify(observation.expected)} actual=${JSON.stringify(observation.actual)}`);
  }
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export function evaluateFocusFailureContract(report, presentation = null) {
  const observations = errorObservations(report);
  observations.forEach(validateObservation);
  const paths = sortedUnique(observations.map((item) => item.normalizedPath));
  if (!paths.includes(REQUIRED_PATH)) fail(`required historical signature is missing: ${REQUIRED_PATH}`);

  if (presentation) {
    if (presentation.source?.status !== 'fail' || presentation.summary?.status !== 'fail') {
      fail('presentation status must remain fail');
    }
    const presentationPaths = sortedUnique(presentation.errors.map((entry) => entry.normalizedPath));
    if (JSON.stringify(presentationPaths) !== JSON.stringify(paths)) {
      fail(`presentation signatures do not match raw signatures: ${presentationPaths.join(', ')}`);
    }
    presentation.errors.forEach((entry) => validateObservation({
      normalizedPath: entry.normalizedPath,
      expected: entry.detail?.expected,
      actual: entry.detail?.actual
    }));
    const rawIndexes = observations.map((item) => item.rawIndex).sort((left, right) => left - right);
    const presentationIndexes = presentation.errors
      .flatMap((entry) => entry.rawDifferenceIndexes)
      .sort((left, right) => left - right);
    if (JSON.stringify(presentationIndexes) !== JSON.stringify(rawIndexes)) {
      fail('presentation error indexes do not exactly trace the raw errors');
    }
  }

  return {
    status: 'pass',
    contract: 'required-historical-signature-plus-focus-mutation-bounded-additions',
    requiredSignatures: [REQUIRED_PATH],
    observedSignatures: paths,
    additionalSignatures: paths.filter((path) => path !== REQUIRED_PATH),
    rawErrorCount: observations.length,
    rawErrorIndexes: observations.map((item) => item.rawIndex),
    allowedObservation: {
      normalizedPathPattern: ALLOWED_PATH.source,
      expected: EXPECTED_COLORS,
      actual: MUTATED_COLOR
    },
    presentationChecked: Boolean(presentation)
  };
}

function parseArgs(args) {
  if (!args.length) throw new Error('Usage: focus-failure-contract.mjs REPORT [--presentation FILE] --out FILE');
  const parsed = { report: args[0] };
  for (let index = 1; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!value || !['--presentation', '--out'].includes(flag)) throw new Error(`Unknown or incomplete option: ${flag}`);
    parsed[flag.slice(2)] = value;
  }
  if (!parsed.out) throw new Error('--out is required');
  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rawBytes = await readFile(resolve(args.report));
  const report = JSON.parse(rawBytes.toString('utf8'));
  const presentation = args.presentation
    ? JSON.parse(await readFile(resolve(args.presentation), 'utf8'))
    : null;
  const result = evaluateFocusFailureContract(report, presentation);
  result.rawReport = args.report.replaceAll('\\', '/');
  result.rawSha256 = createHash('sha256').update(rawBytes).digest('hex').toUpperCase();
  await mkdir(dirname(resolve(args.out)), { recursive: true });
  await writeFile(resolve(args.out), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`focus-contract: pass (${result.rawErrorCount} errors across ${result.observedSignatures.length} signatures)`);
  console.log(`wrote ${resolve(args.out)}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.stack || error.message || String(error));
    process.exitCode = 1;
  });
}
