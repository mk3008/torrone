const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(process.argv[2] || 'review/references/date-range.html', 'utf8');
function fixture() {
  const boundary = () => ({ input: { value: '', attrs: {}, setAttribute(k,v) { this.attrs[k]=v; } }, field: {dataset:{}}, error: {} });
  const state = {start:null,end:null};
  const c = { boundaries:{start:boundary(),end:boundary()}, setValueFor:(p,v)=>state[p]=v,
    valueFor:p=>state[p], isAllowed:v=>v<='2026-08-14', setViewFromIso:()=>{}, showClear:()=>{},
    updateSelection:()=>{},renderCalendar:()=>{},close:()=>{},isCalendarSelectable:()=>true,popupOwner:'start' };
  Object.defineProperties(c,{startIso:{get:()=>state.start},endIso:{get:()=>state.end}});
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('      const setValidity ='),source.indexOf('      const focusDate ='))+
    source.slice(source.indexOf('      const clearBoundary ='),source.indexOf("      separateDateInput.addEventListener"))+
    '\nthis.commit=commitBoundary;this.choose=chooseIso;this.clear=clearBoundary;',c);
  c.set=(p,v)=>{c.boundaries[p].input.value=v;c.commit(p);};c.state=state;return c;
}
for(const bad of ['start','end']) {
 const other=bad==='start'?'end':'start';
 const f=fixture(); f.set(other,'20260810');f.set(bad,bad==='end'?'20260808':'20260812');
 assert.equal(f.boundaries[bad].input.attrs['aria-invalid'],'true');
 f.set(other,bad==='end'?'20260806':'20260814');
 assert.equal(f.boundaries[bad].input.attrs['aria-invalid'],'false',bad+' must recover on opposite commit');
 assert.equal(f.boundaries[bad].error.hidden,true);
 assert.ok(f.state.start && f.state.end);
}
for(const bad of ['start','end']) for(const action of ['clear','calendar','invalid']) {
 const other=bad==='start'?'end':'start';
 const expected=bad==='end'?'2026-08-08':'2026-08-12';
 const f=fixture();f.set(other,'20260810');f.set(bad,expected);
 if(action==='clear') f.clear(other);
 else if(action==='invalid') f.set(other,'20260230');
 else {f.popupOwner=other;f.choose(bad==='end'?'2026-08-06':'2026-08-14');}
 assert.equal(f.state[bad],expected);assert.equal(f.boundaries[bad].error.hidden,true);
 if(action==='invalid') {assert.equal(f.state[other],null);assert.equal(f.boundaries[other].input.attrs['aria-invalid'],'true');}
}
for(const raw of ['20260230','20260818']) {
 const f=fixture();f.set('start','20260810');f.set('end',raw);f.set('start','20260806');
 assert.equal(f.boundaries.end.input.attrs['aria-invalid'],'true');assert.equal(f.state.end,null);
 assert.equal(f.boundaries.end.input.value,raw);
}
{
 const f=fixture();f.set('start','20260810');f.set('end','20260808');f.set('start','20260809');
 assert.equal(f.boundaries.end.input.attrs['aria-invalid'],'true');assert.equal(f.state.end,null);
 f.boundaries.start.input.value='20260806'; // Input text alone is not a commit.
 assert.equal(f.boundaries.end.input.attrs['aria-invalid'],'true');
 f.commit('start');assert.equal(f.state.end,'2026-08-08');
}
console.log('PASS: symmetric recovery, calendar/Clear, persistent local errors, remaining reversal, commit timing');
