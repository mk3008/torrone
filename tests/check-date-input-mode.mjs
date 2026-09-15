// Focus-policy regression checks. This does not emulate a software keyboard.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../review/references/date-range.html', import.meta.url), 'utf8');
const between = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
const focusPolicy = between('      const separateDateInput =', '      const setViewFromIso =');
const onInputFocus = source.match(/boundary\.input\.addEventListener\('focus', \(\) => \{([\s\S]*?)\n        \}\);/)[1];
const openPolicy = between('      const open = (position,', '      function close(');
function environment(mobile) {
  const state = { active: null, opened: 0, closed: 0, scrolled: 0 };
  const node = name => ({ focus() { state.active = name; } });
  const boundary = { position: 'start', input: node('input'), trigger: node('trigger') };
  const frames = [];
  const context = vm.createContext({
    boundaries: { start: boundary }, boundary,
    suppressFocusOpen: false,
    matchMedia: () => ({ matches: mobile }),
    setTimeout: callback => callback(),
    open: () => state.opened++, close: () => state.closed++,
    requestAnimationFrame: callback => frames.push(callback),
    popup: { hidden: true, scrollIntoView() { state.scrolled++; } },
    gridBody: { querySelector: () => node('day') },
    control: { dataset: {} }, popupOwner: null,
    setViewFromIso() {}, valueFor: () => null,
    startIso: null, endIso: null, fixedToday: '2026-08-14',
    renderCalendar() {}, setExpanded() {},
  });
  vm.runInContext(focusPolicy, context);
  return { context, state, frames };
}
for (const mobile of [true, false]) {
  const { context, state } = environment(mobile);
  vm.runInContext('(() => {' + onInputFocus + '})()', context);
  assert.equal(state.opened, mobile ? 0 : 1, 'Mobile typing must not open calendar');
  assert.equal(state.closed, mobile ? 1 : 0, 'Mobile typing closes an existing calendar');
  vm.runInContext('focusWithoutOpening(boundary.input)', context);
  assert.equal(state.active, mobile ? 'trigger' : 'input', 'Return focus must not request a mobile keyboard');
}
{
  const { context, state, frames } = environment(true);
  state.active = 'input';
  vm.runInContext(openPolicy + '\nopen("start", {focusDay:true});', context);
  assert.equal(state.active, 'trigger', 'Calendar entry leaves editable input synchronously');
  frames.shift()();
  assert.equal(state.active, 'day');
  assert.equal(state.scrolled, 1);
}
{
  const { context, state, frames } = environment(true);
  vm.runInContext(openPolicy + '\nopen("start", {focusDay:true}); popup.hidden = true;', context);
  frames.shift()();
  assert.equal(state.active, 'trigger', 'Cancelled opening must not focus a hidden day');
}
console.log('Date input focus policy: mobile/desktop, return focus, entry, cancelled opening PASS');
