const assert = require('node:assert/strict');
const { parse, dayShift, monthShift, assess } = require('../docs/poc/experiments/018-curated-reference-handoff/target/invoice-dates.js');
for (const [input, expected] of [
  [' 20260901 ', '2026-09-01'], ['2026-09-01', '2026-09-01'],
  ['2024-02-29', '2024-02-29'], ['2000-02-29', '2000-02-29'],
  ['0001-01-01', '0001-01-01'], ['0096-02-29', '0096-02-29'], ['9999-12-31', '9999-12-31'],
  ['', null], ['2026-02-30', null], ['20260229', null], ['1900-02-29', null], ['0000-01-01', null],
  ['2026-00-01', null], ['2026-13-01', null], ['2026-09-00', null], ['2026-04-31', null],
  ['2026-0901', null], ['202609-01', null], ['2026/09/01', null], ['2026-9-1', null], ['10000-01-01', null]
]) assert.equal(parse(input), expected, input);
assert.equal(monthShift('2024-03-31', -1), '2024-02-29');
assert.equal(monthShift('2024-02-29', 12), '2025-02-28');
assert.equal(monthShift('0001-01-01', -1), '0001-01-01');
assert.equal(monthShift('9999-12-01', 1), '9999-12-01');
assert.equal(dayShift('2024-02-28', 1), '2024-02-29');
assert.equal(dayShift('0099-12-31', 1), '0100-01-01');
const check = raw => assess(raw, '2026-09-16');
for (const raw of [['', ''], ['20260901', ''], ['', '20260910'], ['20260910', '20260910']]) {
  assert.deepEqual(check(raw).errors, ['', '']);
}
assert.equal(check(['20260917', '']).values[0], null);
assert.match(check(['20260917', '']).errors[0], /later/);
assert.deepEqual(check(['20260912', '20260910']).values, ['2026-09-12', null]);
assert.match(check(['20260912', '20260910']).errors[1], /on or after/);
// Correcting or clearing the opposite boundary restores the retained latest text.
for (const raw of [['20260909', '20260910'], ['', '20260910']]) {
  assert.equal(check(raw).values[1], '2026-09-10');
  assert.deepEqual(check(raw).errors, ['', '']);
}
assert.equal(check(['bad', '20260910']).values[1], '2026-09-10');
assert.deepEqual(check(['20260902', '20260910']).errors, ['', '']);
console.log('PASS: 21 date formats, 6 calendar arithmetic boundaries, partial ranges, cutoff, reversed-range recovery');
