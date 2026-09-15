import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluatePartialCssFailureContract } from './partial-css-failure-contract.mjs';

const options = {
  selector: '.outline-action',
  affectedElementKeys: ['filter-toggle', 'clear-action'],
  property: 'borderRadius',
  expected: '6px',
  actual: '20px'
};

function difference(path, expected, actual) {
  return { severity: 'error', path, expected, actual };
}

function report(differences) {
  return {
    status: differences.length ? 'fail' : 'pass',
    summary: { errorCount: differences.length },
    differences
  };
}

const radiusErrors = [
  difference('initial.elements.filter-toggle.styles.borderRadius', '6px', '20px'),
  difference('initial.elements.clear-action.styles.borderRadius', '6px', '20px'),
  difference('scenarios.search results.step-1.elements.filter-toggle.styles.borderRadius', '6px', '20px'),
  difference('scenarios.search results.step-1.elements.clear-action.styles.borderRadius', '6px', '20px')
];

const focusErrors = [
  difference('scenarios.search empty.step-1.elements.query-filter.styles.outlineColor', 'rgb(134, 185, 238)', 'rgb(16, 29, 47)'),
  difference('scenarios.search empty.step-1.elements.query-filter.styles.outlineStyle', 'solid', 'none')
];

const reversedFocusErrors = [
  difference('scenarios.search empty.step-1.elements.query-filter.styles.outlineColor', 'rgb(16, 29, 47)', 'rgb(134, 185, 238)'),
  difference('scenarios.search empty.step-1.elements.query-filter.styles.outlineStyle', 'none', 'solid')
];

test('accepts the bounded radius delta with a passing exact control', () => {
  const result = evaluatePartialCssFailureContract([report([]), report([])], report(radiusErrors), options);
  assert.equal(result.status, 'pass');
  assert.equal(result.controls.observedSecondaryErrorCount, 0);
  assert.deepEqual(result.mutationOnly.signatures, [
    'elements.clear-action.styles.borderRadius',
    'elements.filter-toggle.styles.borderRadius'
  ]);
});

test('separates unchanged secondary focus failures from the radius delta', () => {
  const result = evaluatePartialCssFailureContract([report([]), report(focusErrors)], report([...focusErrors, ...radiusErrors]), options);
  assert.equal(result.status, 'pass');
  assert.equal(result.controls.observedSecondaryErrorCount, 2);
  assert.deepEqual(result.sharedSecondary.signatures, [
    'elements.query-filter.styles.outlineColor',
    'elements.query-filter.styles.outlineStyle'
  ]);
});

test('uses a control-observed normalized signature when the focus delta reverses direction', () => {
  const result = evaluatePartialCssFailureContract([report(focusErrors), report([])], report([...reversedFocusErrors, ...radiusErrors]), options);
  assert.deepEqual(result.sharedSecondary.signatures, [
    'elements.query-filter.styles.outlineColor',
    'elements.query-filter.styles.outlineStyle'
  ]);
  assert.equal(result.mutationOnly.errorCount, radiusErrors.length);
});

test('rejects unexplained focus additions when the control passes', () => {
  assert.throws(
    () => evaluatePartialCssFailureContract([report([]), report([])], report([...radiusErrors, ...focusErrors]), options),
    /mutation-only paths/
  );
});

test('rejects a missing affected element', () => {
  assert.throws(
    () => evaluatePartialCssFailureContract([report([]), report([])], report(radiusErrors.filter((item) => !item.path.includes('clear-action'))), options),
    /mutation-only paths/
  );
});

test('rejects wrong radius values', () => {
  const wrong = radiusErrors.map((item, index) => index ? item : { ...item, actual: '12px' });
  assert.throws(() => evaluatePartialCssFailureContract([report([]), report([])], report(wrong), options), /unexpected mutation values/);
});

test('rejects an unexpected mutation pass', () => {
  assert.throws(() => evaluatePartialCssFailureContract([report([]), report([])], report([]), options), /unexpectedly passes/);
});

test('keeps control-only execution differences visible without attributing them to the mutation', () => {
  const result = evaluatePartialCssFailureContract([report(focusErrors), report([])], report(radiusErrors), options);
  assert.deepEqual(result.controlOnlySecondary.signatures, [
    'elements.query-filter.styles.outlineColor',
    'elements.query-filter.styles.outlineStyle'
  ]);
  assert.equal(result.mutationOnly.errorCount, radiusErrors.length);
});

test('requires before and after controls', () => {
  assert.throws(
    () => evaluatePartialCssFailureContract(report([]), report(radiusErrors), options),
    /at least two exact control reports/
  );
});

test('rejects a control that already contains an affected mutation signature', () => {
  assert.throws(
    () => evaluatePartialCssFailureContract([report([radiusErrors[0]]), report([])], report(radiusErrors), options),
    /control reports already contain affected mutation paths/
  );
});
