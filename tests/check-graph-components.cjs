// Bounded browser evidence for the isolated components, not whole-Viewer coverage.
const { chromium }=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let browser;
(async()=>{
 const source=fs.readFileSync('review/references/graph-components-draft.html','utf8');
 const fixture=html=>JSON.parse(html.match(/<script id="fixture" type="application\/json">([\s\S]*?)<\/script>/)[1]);
 const data=fixture(source),original=fixture(fs.readFileSync('review/references/graph-selection-draft.html','utf8'));
 assert.deepEqual(data.nodes,original.nodes.map(n=>Object.fromEntries(['id','type','name','scope'].map(k=>[k,n[k]]))));
 assert.deepEqual(data.relations,[2,5,3,0].map(i=>original.relations[i]));
 const directory=path.resolve('tmp/graph-components-evidence');fs.mkdirSync(directory,{recursive:true});
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1200,height:1000}}),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith('file:'))requests.push(r.url());});
 await page.goto('file://'+path.resolve('review/references/graph-components-draft.html'));
 const node=id=>page.locator(`.node[data-node="${id}"]`),sample=i=>page.locator(`[data-relation="${i}"]`),control=i=>sample(i).locator('.relation-control');
 const visible=()=>page.locator('.edge').evaluateAll(paths=>paths.filter(p=>getComputedStyle(p).visibility==='visible'&&Number.parseFloat(getComputedStyle(p).strokeWidth)>0).length);
 const focused=()=>page.evaluate(()=>document.activeElement.id||document.activeElement.dataset.node||document.activeElement.closest('[data-relation]')?.dataset.relation);
 assert.equal(await page.locator('.node').count(),4);assert.equal(await visible(),3);
 assert.equal(await node('業務設計').evaluate(e=>getComputedStyle(e).borderRadius),'15px');assert.equal(await node('業務設計書').evaluate(e=>getComputedStyle(e).borderLeftWidth),'8px');
 await page.screenshot({path:path.join(directory,'desktop-normal.png'),fullPage:true});
 await node('実装').focus();await page.keyboard.press('Enter');assert.equal(await node('実装').getAttribute('aria-pressed'),'true');
 await page.keyboard.press('Tab');assert.equal(await focused(),'依頼者');assert.equal(await node('実装').getAttribute('aria-pressed'),'true');
 assert.equal(await node('依頼者').evaluate(e=>e.matches(':focus-visible')),true);await page.screenshot({path:path.join(directory,'desktop-node-selection-focus.png'),fullPage:true});
 await page.keyboard.press('Shift+Tab');assert.equal(await focused(),'実装');await page.keyboard.press('Space');assert.equal(await node('実装').getAttribute('aria-pressed'),'false');
 await node('業務設計').click();await node('業務設計書').click();assert.equal(await node('業務設計').getAttribute('aria-pressed'),'false');await page.keyboard.press('Escape');assert.equal(await page.locator('.node[aria-pressed="true"]').count(),0);
 // Details keep one local operation intact: open -> read -> close/return.
 for(const i of [0,1,2,3]){
  await control(i).focus();await page.keyboard.press(i%2?'Space':'Enter');assert.equal(await control(i).getAttribute('aria-expanded'),'true');assert.equal(await focused(),`caption-${i}`);
  assert.equal(await sample(i).locator('h4').innerText(),data.relations[i].label);assert.equal(await visible(),i===2?4:3);
  if(i===2)await page.screenshot({path:path.join(directory,'desktop-omitted-read.png'),fullPage:true});
  await page.keyboard.press('Tab');assert.equal(await sample(i).getByRole('button',{name:'Close details'}).evaluate(e=>e===document.activeElement),true);
  await page.keyboard.press('Enter');assert.equal(await focused(),String(i));assert.equal(await visible(),3);assert.equal(await control(i).getAttribute('aria-expanded'),'false');
 }
 await control(2).click();await control(3).click();assert.equal(await visible(),3);assert.equal(await control(2).getAttribute('aria-expanded'),'false');assert.equal(await sample(2).locator('.local-detail').isVisible(),false);assert.match(await sample(3).locator('.exception-note').innerText(),/not an application error/);
 await page.keyboard.press('Escape');assert.equal(await focused(),'3');assert.equal(await page.locator('.relation-control[aria-expanded="true"]').count(),0);
 await control(2).click();await control(2).click();assert.equal(await visible(),3);assert.equal(await focused(),'2');
 // These are independent component specimens, not graph / Detail composition.
 await node('依頼者').click();await control(1).click();assert.equal(await node('依頼者').getAttribute('aria-pressed'),'true');await page.keyboard.press('Escape');assert.equal(await node('依頼者').getAttribute('aria-pressed'),'true');
 await page.setViewportSize({width:390,height:844});await control(2).click();assert.equal(await visible(),4);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:path.join(directory,'narrow-omitted-read.png'),fullPage:true});await sample(2).getByRole('button',{name:'Close details'}).click();assert.equal(await focused(),'2');assert.equal(await visible(),3);
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 const result={status:'PASS',browser:await browser.version(),desktop:[1200,1000],narrow:[390,844],checks:['fixture meaning reused','node kind/scope and outside-scope selection','selection separate from native keyboard focus','Enter/Space, Tab/Shift+Tab, Escape','relation direction/type and full captions','omitted Read open/close/return','switch/repeat clears temporary Read','Input-only and Exception retained','independent specimen state','narrow reachability/no page overflow'],pageErrors:errors,externalRequests:requests,limits:['Draft; human design review pending','No screen reader, real touch/mobile keyboard, other browsers, or whole-Viewer coverage']};
 fs.writeFileSync(path.join(directory,'result.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(async e=>{console.error(e);await browser?.close();process.exitCode=1;});
