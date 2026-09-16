// Regression for owner correction: typing does not request scrolling or transfer focus.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('review/references/date-range-recovery-draft.html', 'utf8');
assert.ok(!html.includes('window.visualViewport'), 'Withdrawn keyboard-following helper must not return');
assert.ok(!html.includes('window.scrollBy'), 'No independent textbox scroll correction');
assert.ok(!html.includes('manual-entry'), 'No focus-dependent document padding');
assert.ok(!html.includes('installEntryVisibility'), 'No delayed input scrolling');
function fixture(narrow) {
 const calls=[], frames=[];
 const boundaries=Object.fromEntries(['start','end'].map(position=>[position,{position,
  input:{handlers:{},addEventListener(k,fn){this.handlers[k]=fn;}},
  stack:{scrollIntoView:o=>{assert.equal(o.block,'start');calls.push('scroll '+position+' context');}},
  trigger:{focus:()=>calls.push('trigger'),addEventListener(){}},clear:{addEventListener(){}}
 }]));
 const c={boundaries,separateDateInput:{matches:narrow},suppressFocusOpen:false,
 close:()=>calls.push('close'),open:p=>calls.push('open '+p),showClear(){},commitBoundary:p=>(calls.push('commit '+p),true),
 popup:{hidden:true},setTimeout:fn=>fn(),clearBoundary(){}};
 vm.createContext(c);
 vm.runInContext(html.slice(html.indexOf('      Object.values(boundaries).forEach((boundary) => {'),html.indexOf("      closeButton.addEventListener")),c);
 for(const p of ['start','end']) {
  calls.length=0;boundaries[p].input.handlers.focus();
  assert.deepEqual(calls,narrow?['close']:['open '+p]);
  calls.length=0;boundaries[p].input.handlers.keydown({key:'Enter',preventDefault(){}});
  assert.deepEqual(calls,['commit '+p,'close']);
  calls.length=0;boundaries[p].input.handlers.keydown({key:'Enter',isComposing:true,preventDefault(){throw Error('IME intercepted');}});
  assert.deepEqual(calls,[]);
 }
 Object.assign(c,{control:{dataset:{}},popupOwner:'start',placeCalendar(){},setViewFromIso(){},valueFor:()=>null,startIso:null,endIso:null,fixedToday:'2026-08-14',renderCalendar(){},setExpanded(){},requestAnimationFrame:fn=>frames.push(fn),gridBody:{querySelector:()=>({focus:o=>{assert.equal(o.preventScroll,true);calls.push('day');}})}});
 c.popup.scrollIntoView=()=>{throw Error('Calendar-only alignment hides its editor');};
 vm.runInContext(html.slice(html.indexOf('      const open ='),html.indexOf('      function close'))+'\nthis.openCalendar=open;',c);
 calls.length=0;c.openCalendar('end',{focusDay:true});frames.splice(0).forEach(fn=>fn());
 assert.deepEqual(calls,narrow?['trigger','day','scroll end context']:['day']);
}
fixture(true);fixture(false);
console.log('PASS: manual focus/Enter/IME avoid navigation; only calendar opening requests scroll');
