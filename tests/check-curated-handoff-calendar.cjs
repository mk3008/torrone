// Run the real candidate handlers with a small DOM event fixture. This models
// focusout -> microtask checkpoint -> focusin -> click; it is not browser QA.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const dates = require('../docs/poc/experiments/018-curated-reference-handoff/target/invoice-dates.js');
function setup() {
  let doc;
  class Element {
    constructor() { this.events = {}; this.attrs = {}; this.dataset = {}; this.children = []; this.hidden = false; this.value = ''; }
    addEventListener(name, fn) { (this.events[name] ||= []).push(fn); }
    fire(name, event = {}) { for (const fn of this.events[name] || []) fn(event); }
    setAttribute(key, value) { this.attrs[key] = value; }
    getAttribute(key) { return this.attrs[key]; }
    contains(target) { return target === this || this.children.some(child => child.contains(target)); }
    append(child) { this.children.push(child); }
    replaceChildren(...children) { this.children = children; }
    querySelector(selector) { return this.selectors?.[selector] || this.children.find(child => selector === '[tabindex="0"]' && child.tabIndex === 0); }
    querySelectorAll() { return []; }
    closest(selector) { return selector === 'button' ? this : null; }
    focus() { doc.activeElement = this; }
    scrollIntoView() {}
  }
  const nodes = Object.fromEntries(['#date-browser','#date-options','#issue-window','#ledger-scope','#search-result','#editing-label','#display-month','#availability','form'].map(key => [key,new Element()]));
  const sections = [0,1].map(() => {
    const section = new Element();
    section.selectors = Object.fromEntries(['input','[data-action="erase"]','[data-action="browse"]','.problem'].map(key => [key,new Element()]));
    section.children.push(...Object.values(section.selectors));
    return section;
  });
  nodes['#issue-window'].children.push(...sections);
  const search = new Element();
  nodes.form.querySelectorAll = () => [...sections.flatMap(section => ['input','[data-action="erase"]','[data-action="browse"]'].map(key => section.selectors[key])), search];
  const popup = nodes['#date-browser'], options = nodes['#date-options'];
  popup.hidden = true;
  popup.children.push(options);
  doc = new Element(); doc.activeElement = null;
  doc.querySelector = selector => nodes[selector];
  doc.querySelectorAll = () => sections;
  doc.createElement = () => new Element();
  const microtasks = [], frames = [];
  vm.runInNewContext(fs.readFileSync(require.resolve('../docs/poc/experiments/018-curated-reference-handoff/target/invoice.js'), 'utf8'), {
    document: doc, window: { invoiceDates: dates }, Intl,
    matchMedia: () => ({ matches: true, addEventListener() {} }),
    queueMicrotask: fn => microtasks.push(fn), requestAnimationFrame: fn => frames.push(fn)
  });
  return { doc, nodes, sections, popup, options, microtasks, frames, Element, search };
}
const flush = queue => { while (queue.length) queue.shift()(); };
for (const owner of [0,1]) {
  const f = setup(), input = f.sections[owner].selectors.input;
  f.sections[owner].selectors['[data-action="browse"]'].fire('click');
  const day = f.options.children.find(button => button.dataset.iso === '2026-09-10');
  assert.ok(day && !day.disabled);
  // Native focus can transiently leave activeElement outside the control before
  // a microtask checkpoint. relatedTarget already identifies the tapped day.
  f.doc.activeElement = null;
  f.nodes['#issue-window'].fire('focusout', { relatedTarget: day });
  flush(f.microtasks);
  assert.equal(f.popup.hidden, false, `boundary ${owner}: calendar closed before day click`);
  f.doc.activeElement = day;
  flush(f.frames);
  f.popup.fire('click', { target: day });
  assert.equal(input.value, '2026-09-10');
  assert.equal(f.sections[1-owner].selectors.input.value, '');
  assert.equal(f.popup.hidden, true);
  assert.equal(f.doc.activeElement, f.sections[owner].selectors['[data-action="browse"]']);
  // Null relatedTarget must allow a subsequent focusin before dismissal checks.
  f.sections[owner].selectors['[data-action="browse"]'].fire('click');
  const nextDay = f.options.children.find(button => button.dataset.iso === '2026-09-09');
  f.doc.activeElement = null;
  f.nodes['#issue-window'].fire('focusout', { relatedTarget: null });
  flush(f.microtasks);
  assert.equal(f.popup.hidden, false);
  f.doc.activeElement = nextDay; flush(f.frames);
  assert.equal(f.popup.hidden, false);
  // A genuine exit still dismisses; invalid/future buttons still do nothing.
  const disabled = f.options.children.find(button => button.dataset.iso === '2026-09-17');
  assert.equal(disabled.disabled, true);
  f.popup.fire('click', { target: disabled });
  assert.equal(input.value, '2026-09-10');
  const outside = new f.Element(); f.doc.activeElement = outside;
  f.nodes['#issue-window'].fire('focusout', { relatedTarget: outside });
  flush(f.frames); flush(f.microtasks);
  assert.equal(f.popup.hidden, true);
}
console.log('PASS: both calendar boundaries commit after focus transition; null destination, focus return, disabled dates, outside dismissal');

// Manual Enter confirms in place; Tab owns sequential navigation. This replaces
// the earlier Enter-as-Tab policy after the owner requested a source-based rule.
for (const index of [0, 1]) {
  const f = setup(), controls = f.sections[index].selectors;
  f.sections[1-index].selectors['[data-action="browse"]'].fire('click');
  controls.input.focus(); controls.input.fire('focus');
  controls.input.value = '20260910';
  controls.input.fire('keydown', { key: 'Enter', preventDefault() {} });
  assert.equal(f.doc.activeElement, controls.input, 'Valid Enter keeps the current field');
  assert.equal(controls.input.value, '2026-09-10');
  assert.equal(f.popup.hidden, true);
  controls.input.focus(); controls.input.fire('focus'); controls.input.value = '';
  controls.input.fire('keydown', { key: 'Enter', preventDefault() {} });
  assert.equal(f.doc.activeElement, controls.input, 'Blank Enter keeps the current field');
  controls.input.focus(); controls.input.fire('focus'); controls.input.value = 'bad';
  controls.input.fire('keydown', { key: 'Enter', preventDefault() {} });
  assert.equal(f.doc.activeElement, controls.input, 'Invalid input keeps focus for recovery');
}
console.log('PASS: valid, blank and invalid Enter keep either field regardless of previous calendar owner');
for (const index of [0, 1]) {
  const f = setup(), input = f.sections[index].selectors.input;
  input.focus(); input.fire('focus'); input.value = '20260910';
  input.fire('keydown', { key: 'Enter', isComposing: true, preventDefault() { throw new Error('Composition must not be intercepted'); } });
  assert.equal(input.value, '20260910');
  assert.equal(f.doc.activeElement, input);
}
const html = fs.readFileSync(require.resolve('../docs/poc/experiments/018-curated-reference-handoff/target/index.html'), 'utf8');
assert.equal((html.match(/enterkeyhint="done"/g) || []).length, 2);
console.log('PASS: composition Enter is untouched; both mobile inputs request Done');
