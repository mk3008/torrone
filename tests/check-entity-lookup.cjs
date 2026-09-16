const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('review/references/entity-lookup.html', 'utf8');
class Element {
  constructor() { this.handlers={}; this.children=[]; this.dataset={}; this.hidden=false; this.value=''; this.style={setProperty(){}}; }
  addEventListener(name, fn) { this.handlers[name]=fn; }
  fire(name, event={}) { this.handlers[name]?.(event); }
  setAttribute(name,value) { this[name]=value; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children=[]; }
  focus() { active=this; }
  showModal() { this.open=true; }
  close() { this.open=false; }
  querySelector(selector) { return elements[selector]; }
}
let active;
const elements={};
for(const selector of [...html.matchAll(/document\.querySelector\('([^']+)'\)|dialog\.querySelector\('([^']+)'\)|selection\.querySelector\('([^']+)'\)/g)]) elements[selector[1]||selector[2]||selector[3]]=new Element();
elements['location-dialog']=new Element(); elements['dialog-title']=new Element();
const e=ref=>elements[`[data-ref="${ref}"]`];
const ctx={document:{querySelector:s=>elements[s],getElementById:s=>elements[s],createElement:()=>new Element()},matchMedia:()=>({matches:true}),window:{addEventListener(){}},innerHeight:700};
vm.runInNewContext(html.match(/<script>\s*([\s\S]*?)<\/script>/)[1],ctx);
const results=elements['.results'];
const open=()=>e('lookup-trigger').fire('click');
const filter=text=>{e('lookup-query').value=text;e('lookup-query').fire('input');};
const choose=i=>{const radios=results.children.map(x=>x.children[0]);radios.forEach((r,n)=>r.checked=n===i);radios[i].fire('change');};
const committed=()=>[e('selected-name').textContent,e('selected-id').textContent];
open();assert.equal(results.children.length,2);assert.equal(e('lookup-confirm').disabled,true);
filter(' lc-044 ');assert.equal(results.children.length,1);choose(0);assert.equal(e('lookup-confirm').disabled,false);e('lookup-confirm').fire('click');assert.deepEqual(committed(),['Riverside Depot','Location LC-044']);assert.equal(active,e('lookup-trigger'));
for(const mode of ['cancel','close','escape']) {
 open();choose(0);
 if(mode==='cancel') e('lookup-cancel').fire('click');
 if(mode==='close') elements['.dialog-close'].fire('click');
 if(mode==='escape') elements['location-dialog'].fire('cancel',{preventDefault(){}});
 assert.deepEqual(committed(),['Riverside Depot','Location LC-044']);assert.equal(active,e('lookup-trigger'));
 open();assert.equal(e('lookup-confirm').disabled,true);assert.ok(results.children.every(x=>!x.children[0].checked));
}
filter('north');choose(0);filter('not a location');assert.equal(results.children.length,0);assert.equal(e('lookup-empty').hidden,false);assert.equal(e('lookup-confirm').disabled,true);e('lookup-confirm').fire('click');assert.deepEqual(committed(),['Riverside Depot','Location LC-044']);
filter('DISTRIBUTION');choose(0);e('lookup-confirm').fire('click');assert.deepEqual(committed(),['North Distribution Center','Location LC-031']);
e('lookup-clear').fire('click');assert.equal(e('lookup-selection').hidden,true);assert.deepEqual(committed(),['','']);assert.equal(active,e('lookup-trigger'));
open();choose(0);choose(1);e('lookup-confirm').fire('click');assert.deepEqual(committed(),['Riverside Depot','Location LC-044']);
console.log('PASS: fixture filtering, both commits, selection replacement, empty/filter reset, all cancellation paths, Clear and reselection. Handler fixture only; native radio/dialog keyboard behavior requires browser review.');
