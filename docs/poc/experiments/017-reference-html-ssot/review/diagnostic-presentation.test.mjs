import assert from 'node:assert/strict';
import {
  auditPresentationTrace,
  buildPresentation,
  diagnosticKind,
  groupDifferences,
  renderMarkdown,
  splitDifferencePath
} from './diagnostic-presentation.mjs';

const info = (path, expected, actual, delta) => ({
  severity: 'info',
  path,
  expected,
  actual,
  ...(delta === undefined ? {} : { delta })
});

assert.deepEqual(splitDifferencePath('initial.elements.main.box.x'), {
  state: 'initial',
  normalizedPath: 'elements.main.box.x'
});
assert.deepEqual(splitDifferencePath('scenarios.round.trip.step-2.elements.main.box.x'), {
  state: 'scenarios.round.trip.step-2',
  normalizedPath: 'elements.main.box.x'
});
assert.equal(diagnosticKind(info('initial.elements.main.box.x', 0, 20, 20)), 'geometry');
assert.equal(diagnosticKind(info('initial.elements.extra', '<not present>', 'extra annotated element')), 'extra-element');

const fixtures = [
  info('initial.elements.main.box.x', 0, 20, 20),
  info('scenarios.repeat.step-1.elements.main.box.x', 0, 20, 20),
  info('initial.elements.main.box.y', 10, 30, 20),
  info('initial.elements.secondary.box.x', 0, 20, 20),
  info('scenarios.changed.step-1.elements.main.box.x', 5, 25, 20)
];
const exact = groupDifferences(fixtures);
assert.equal(exact.length, 4, 'exact grouping must merge only the identical repeated observation');
assert.equal(exact.find((entry) => entry.normalizedPath === 'elements.main.box.x' && entry.detail.expected === 0).occurrenceCount, 2);
assert.equal(exact.filter((entry) => entry.normalizedPath === 'elements.main.box.x').length, 2, 'same path with different values must stay separate');
assert.equal(exact.filter((entry) => entry.normalizedPath.endsWith('.box.x')).length, 3, 'same property on different keys must stay separate');
assert.equal(exact.filter((entry) => entry.normalizedPath.startsWith('elements.main.box.')).length, 3, 'different properties on the same key must stay separate');

const fieldOnly = groupDifferences(fixtures, { includeValues: false });
assert.equal(fieldOnly.length, 3, 'field-only candidate intentionally demonstrates one heterogeneous merge');

const rawReport = {
  schemaVersion: 1,
  status: 'pass',
  summary: { errorCount: 0, diagnosticCount: fixtures.length },
  differences: fixtures
};
const presentation = buildPresentation(rawReport, { reportPath: 'fixture.json', sha256: 'FIXTURE' });
assert.equal(presentation.summary.rawDifferenceCount, fixtures.length);
assert.equal(presentation.summary.diagnosticEntryCount, exact.length);
const indexed = presentation.diagnostics.flatMap((entry) => entry.rawDifferenceIndexes).sort((a, b) => a - b);
assert.deepEqual(indexed, [1, 2, 3, 4, 5], 'every raw occurrence must be indexed exactly once');
assert.equal(new Set(indexed).size, fixtures.length);
assert.equal(auditPresentationTrace(rawReport, presentation).status, 'pass');
assert.equal(renderMarkdown(presentation), renderMarkdown(presentation), 'rendering must be deterministic');

const failingReport = {
  schemaVersion: 1,
  status: 'fail',
  summary: { errorCount: 1, diagnosticCount: 1 },
  differences: [fixtures[0], { severity: 'error', path: 'scenarios.focus.step-1.elements.action.styles.outlineColor', expected: 'blue', actual: 'pink' }]
};
const failing = buildPresentation(failingReport, { reportPath: 'negative.json', sha256: 'NEGATIVE' });
assert.equal(failing.summary.status, 'fail');
assert.equal(failing.errors.length, 1);
assert.equal(failing.errors[0].rawDifferenceIndexes[0], 2);

console.log('diagnostic presentation tests: pass');
