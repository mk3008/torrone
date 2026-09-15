import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateFocusFailureContract } from './focus-failure-contract.mjs';

const expected = 'rgb(134, 185, 238)';
const actual = 'rgb(255, 0, 170)';

function difference(path, overrides = {}) {
  return { severity: 'error', path, expected, actual, ...overrides };
}

function report(differences, status = 'fail') {
  return {
    status,
    summary: { errorCount: differences.filter((item) => item.severity === 'error').length },
    differences
  };
}

function presentation(entries) {
  return {
    source: { status: 'fail' },
    summary: { status: 'fail' },
    errors: entries
  };
}

test('accepts the historical required focus signature', () => {
  const raw = report([
    difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor'),
    difference('scenarios.filter keyboard round trip.step-2.elements.filter-toggle.styles.outlineColor')
  ]);
  const result = evaluateFocusFailureContract(raw);
  assert.deepEqual(result.observedSignatures, ['elements.filter-toggle.styles.outlineColor']);
  assert.equal(result.rawErrorCount, 2);
});

test('accepts a strengthened observation only within the same mutation semantics', () => {
  const raw = report([
    difference('scenarios.search empty.step-1.elements.query-filter.styles.outlineColor'),
    difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor'),
    difference('scenarios.filter keyboard round trip.step-2.elements.filter-toggle.styles.outlineColor')
  ]);
  const reviewed = presentation([
    { normalizedPath: 'elements.filter-toggle.styles.outlineColor', detail: { expected, actual }, rawDifferenceIndexes: [2, 3] },
    { normalizedPath: 'elements.query-filter.styles.outlineColor', detail: { expected, actual }, rawDifferenceIndexes: [1] }
  ]);
  const result = evaluateFocusFailureContract(raw, reviewed);
  assert.deepEqual(result.additionalSignatures, ['elements.query-filter.styles.outlineColor']);
  assert.deepEqual(result.rawErrorIndexes, [1, 2, 3]);
});

test('accepts the immutable source foreground color when the browser omits focus-visible', () => {
  const raw = report([
    difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor', {
      expected: 'rgb(16, 29, 47)'
    })
  ]);
  const result = evaluateFocusFailureContract(raw);
  assert.deepEqual(result.observedSignatures, ['elements.filter-toggle.styles.outlineColor']);
  assert.deepEqual(result.allowedObservation.expected, ['rgb(16, 29, 47)', 'rgb(134, 185, 238)']);
});

test('rejects a missing historical signature', () => {
  assert.throws(
    () => evaluateFocusFailureContract(report([
      difference('scenarios.search empty.step-1.elements.query-filter.styles.outlineColor')
    ])),
    /required historical signature is missing/
  );
});

test('rejects an unrelated extra error', () => {
  assert.throws(
    () => evaluateFocusFailureContract(report([
      difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor'),
      difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.borderRadius')
    ])),
    /unrelated error path/
  );
});

test('rejects changed observation values', () => {
  assert.throws(
    () => evaluateFocusFailureContract(report([
      difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor', { actual: 'rgb(0, 0, 0)' })
    ])),
    /unexpected values/
  );
});

test('rejects an unexplained expected color', () => {
  assert.throws(
    () => evaluateFocusFailureContract(report([
      difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor', { expected: 'rgb(0, 0, 0)' })
    ])),
    /unexpected values/
  );
});

test('rejects an unexpected pass', () => {
  assert.throws(
    () => evaluateFocusFailureContract(report([], 'pass')),
    /raw status must be fail/
  );
});

test('rejects incomplete presentation trace', () => {
  const raw = report([
    difference('scenarios.filter keyboard round trip.step-1.elements.filter-toggle.styles.outlineColor'),
    difference('scenarios.filter keyboard round trip.step-2.elements.filter-toggle.styles.outlineColor')
  ]);
  const reviewed = presentation([
    { normalizedPath: 'elements.filter-toggle.styles.outlineColor', detail: { expected, actual }, rawDifferenceIndexes: [1] }
  ]);
  assert.throws(() => evaluateFocusFailureContract(raw, reviewed), /do not exactly trace/);
});
