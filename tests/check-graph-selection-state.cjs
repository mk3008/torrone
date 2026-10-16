// Deterministic state / event-handler checks only. Not browser or accessibility evidence.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html=fs.readFileSync('review/references/graph-selection-draft.html','utf8');
let active=null;
class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.style={};this.attrs={};this.handlers={};this.classes=new Set();this.classList={toggle:(c,on)=>{const v=on===undefined?!this.classes.has(c):on;v?this.classes.add(c):this.classes.delete(c);return v;}};}
 set className(s){this.classes=new Set(s.split(' '));}get className(){return [...this.classes].join(' ');}
 set textContent(s){this.text=String(s);this.children=[];}get textContent(){return (this.text||'')+this.children.map(x=>x.textContent).join('');}
 append(...e){this.children.push(...e);}replaceChildren(...e){this.text='';this.children=e;}
 setAttribute(k,v){this.attrs[k]=String(v);}getAttribute(k){return this.attrs[k];}
 addEventListener(k,f){this.handlers[k]=f;}fire(k,e={}){this.handlers[k]?.(e);}focus(){active=this;}
 querySelector(s){const flat=e=>e.children.flatMap(c=>[c,...flat(c)]);return flat(this).find(e=>s==='#detail-title'?e.id==='detail-title':s.startsWith('[data-relation=')?e.dataset.relation==s.match(/"(.*?)"/)[1]:false);}
}
const roots=Object.fromEntries(['#fixture','#detail','.canvas','.edges','#clear','#announcement','#mode-summary','.nodes','.captions','#view-details','.viewport'].map(s=>[s,new Element()]));
roots['#fixture'].textContent=html.match(/type="application\/json">([\s\S]*?)<\/script>/)[1];
const fixture=JSON.parse(roots['#fixture'].textContent);assert.equal(fixture.nodes.length,4);assert.equal(fixture.relations.length,6);
const radios=['representative','all'].map(value=>Object.assign(new Element('input'),{value,checked:value==='representative'}));
const document={querySelector:s=>s==='#detail-title'?roots['#detail'].querySelector(s):roots[s],querySelectorAll:()=>radios,createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),handlers:{},addEventListener(k,f){this.handlers[k]=f;}};
const context=vm.createContext({document,console});vm.runInContext(html.match(/<script>\n([\s\S]*?)<\/script>/)[1],context);
const call=s=>vm.runInContext(s,context),visible=()=>call('edgePaths.filter(e=>e.style.display!=="none").length');
const node=id=>{const b=call(`nodeButtons.get(${JSON.stringify(id)})`);b.focus();b.fire('click');};
const relation=i=>{const b=roots['#detail'].querySelector(`[data-relation="${i}"]`);assert.ok(b);b.focus();b.fire('click');};
assert.equal(visible(),4);
for(const i of [1,3]){node('業務設計');relation(i);assert.equal(visible(),5);assert.equal(call('selection.id'),i);assert.equal(active.id,'detail-title');const back=roots['#detail'].children.at(-1).children[0];back.fire('click');assert.equal(visible(),4);assert.equal(active.dataset.relation,i);}
node('業務設計');relation(3);node('実装');assert.equal(visible(),4);assert.equal(call('edgePaths[2].style.display'),'');assert.equal(call('edgePaths[0].style.display'),'');
roots['#clear'].fire('click');assert.equal(call('selection'),null);assert.equal(active.dataset.node,'実装');
node('依頼者');relation(1);document.handlers.keydown({key:'Escape',preventDefault(){}});assert.equal(visible(),4);assert.equal(active.dataset.node,'依頼者');
node('業務設計');relation(3);radios[1].checked=true;radios[1].fire('change');assert.equal(visible(),6);assert.equal(call('selection'),null);
call('edgeButtons[0]').fire('keydown',{key:' ',preventDefault(){}});assert.equal(call('selection.id'),0);assert.match(roots['#detail'].textContent,/not an application error/);
radios[0].checked=true;radios[0].fire('change');assert.equal(visible(),4);assert.equal(call('selection'),null);
node('依頼者');relation(1);node('業務設計書');relation(3);assert.equal(visible(),5);assert.equal(call('edgePaths[1].style.display'),'none');
roots['.canvas'].fire('click',{target:roots['.edges']});assert.equal(visible(),4);assert.equal(call('selection'),null);
assert.equal(roots['#clear'].disabled,true);
console.log('PASS: fixture cardinality, both omitted Reads, Back focus target, target change, Input-only / Exception retention, Clear / Escape, mode resets, repeated selection and blank-canvas clear. State/handler simulation only; no rendered UI, native focus or accessibility claim.');
