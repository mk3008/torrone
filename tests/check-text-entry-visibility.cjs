const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('review/references/date-range-recovery-draft.html', 'utf8');
const source = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));
function fixture(embedded=false) {
 const handlers={},viewportHandlers={},frames=new Map(),moves=[];
 let id=0,rect={top:100,bottom:144};
 const input={matches:()=>true,labels:[{getBoundingClientRect:()=>({top:80,bottom:96})}],getBoundingClientRect:()=>rect};
 const document={activeElement:input,addEventListener:(n,f)=>handlers[n]=f};
 const viewport={offsetTop:0,height:500,addEventListener:(n,f)=>viewportHandlers[n]=f};
 const window={visualViewport:viewport,innerHeight:700,addEventListener(){},scrollBy:o=>moves.push(o.top)};
 window.top=embedded?{}:window;
 const context={document,window,requestAnimationFrame:f=>(frames.set(++id,f),id),cancelAnimationFrame:i=>frames.delete(i)};
 vm.runInNewContext(source,context);
 return {handlers,viewportHandlers,viewport,moves,document,input,setRect:r=>rect=r,flush:()=>{const pending=[...frames.values()];frames.clear();pending.forEach(f=>f());}};
}
const f=fixture();f.handlers.focusin();f.flush();assert.deepEqual(f.moves,[]);
f.viewport.height=130;f.viewportHandlers.resize();f.flush();assert.deepEqual(f.moves,[22]);
f.moves.length=0;f.handlers.pointerdown();f.viewportHandlers.resize();f.flush();assert.deepEqual(f.moves,[]);
f.handlers.pointerup();f.document.activeElement=null;f.handlers.click();f.flush();assert.deepEqual(f.moves,[]);
f.document.activeElement=f.input;f.handlers.focusin();f.handlers.focusout();f.flush();assert.deepEqual(f.moves,[]);
f.viewport.height=500;f.setRect({top:2,bottom:46});f.handlers.focusin();f.flush();assert.deepEqual(f.moves,[-6]);
const e=fixture(true);e.viewport.height=100;e.handlers.focusin();e.flush();assert.deepEqual(e.moves,[]);
assert.equal(f.document.activeElement,f.input);
console.log('PASS: visible no-op, exact overlap correction, top clipping, pointer protection, stale focus cancellation, unknown host no-op');
