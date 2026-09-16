const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('review/references/date-range-recovery-draft.html', 'utf8');
const context = { module: { exports: {} } };
vm.runInNewContext(html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>')), context);
const install = context.module.exports;
function fixture(withVisualViewport = true) {
  const events = () => ({ callbacks: {}, addEventListener(name, callback) { this.callbacks[name] = callback; } });
  const classes = new Set(), timers = new Map(), frames = [];
  const inputs = [0, 1].map(index => ({ closest(selector) {
    assert.equal(selector, '.boundary-stack');
    return { scrollIntoView(options) { calls.push({ index, options }); } };
  } }));
  const calls = [], narrow = Object.assign(events(), { matches: true });
  let id = 0;
  const win = Object.assign(events(), {
    setTimeout(fn) { timers.set(++id, fn); return id; }, clearTimeout(id) { timers.delete(id); },
    requestAnimationFrame(fn) { frames.push(fn); }
  });
  if (withVisualViewport) win.visualViewport = events();
  const doc = Object.assign(events(), { activeElement: null, body: { classList: {
    add(name) { classes.add(name); }, remove(name) { classes.delete(name); }
  } } });
  install(win, doc, inputs, narrow);
  const focus = input => { doc.activeElement = input; doc.callbacks.focusin(); };
  const drain = () => { const queued = [...timers.values()]; timers.clear(); queued.forEach(fn => fn()); };
  return { win, doc, inputs, calls, narrow, classes, timers, frames, focus, drain };
}
for (const viewport of [true, false]) {
  const f = fixture(viewport);
  f.focus(f.inputs[0]);
  assert.ok(f.classes.has('manual-entry'));
  assert.equal(f.calls.at(-1).index, 0);
  // Switch to the last input while the keyboard is still opening.
  f.focus(f.inputs[1]);
  const boundary = f.calls.length;
  f.drain();
  assert.equal(f.calls.length - boundary, 3);
  assert.ok(f.calls.slice(boundary).every(call => call.index === 1));
  assert.deepEqual(JSON.parse(JSON.stringify(f.calls.at(-1).options)), { block: 'start', inline: 'nearest', behavior: 'instant' });
  f.win.callbacks.resize();
  if (viewport) f.win.visualViewport.callbacks.resize();
  assert.equal(f.calls.at(-1).index, 1);
  // Calendar/clear focus must cancel pending keyboard scrolls, not steal focus back.
  f.focus(f.inputs[1]);
  f.focus({ calendarButton: true });
  assert.equal(f.timers.size, 0);
  assert.equal(f.classes.has('manual-entry'), false);
  const stopped = f.calls.length;
  f.drain(); f.win.callbacks.resize();
  assert.equal(f.calls.length, stopped);
  // Pointer focus must not move the tapped calendar/Clear button before click.
  f.focus(f.inputs[1]); f.doc.callbacks.pointerdown();
  f.focus({ calendarButton: true });
  assert.ok(f.classes.has('manual-entry'));
  assert.equal(f.timers.size, 0);
  f.doc.callbacks.pointerup();
  assert.ok(f.classes.has('manual-entry'));
  f.doc.callbacks.click(); f.frames.splice(0).forEach(fn => fn());
  assert.equal(f.classes.has('manual-entry'), false);
  // Blur outside the document can arrive without another focusin.
  f.focus(f.inputs[1]); f.doc.activeElement = null;
  f.doc.callbacks.focusout(); f.frames.splice(0).forEach(fn => fn());
  assert.equal(f.classes.has('manual-entry'), false);
  assert.equal(f.timers.size, 0);
  f.narrow.matches = false; f.focus(f.inputs[0]);
  assert.equal(f.classes.has('manual-entry'), false);
  assert.equal(f.timers.size, 0);
}
console.log('PASS: both boundaries, delayed keyboard opening without resize, viewport resize, focus switching, blur/calendar cleanup, desktop isolation');
