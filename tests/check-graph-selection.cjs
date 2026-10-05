const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async()=>{
 const directory=path.resolve('tmp/graph-selection-evidence');fs.mkdirSync(directory,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith('file:'))requests.push(r.url());});
 const url='file://'+path.resolve('review/references/graph-selection-draft.html');await page.goto(url);
 const node=id=>page.locator(`.node[data-node="${id}"]`),read=i=>page.locator(`.relation-item[data-relation="${i}"]`),edge=i=>page.locator(`.edge-hit[data-relation="${i}"]`);
 const visible=()=>page.locator('.edge-hit:visible').count();
 assert.equal(await node('業務設計').count(),1);assert.equal(await page.locator('.node').count(),4);assert.equal(await visible(),4);
 await page.screenshot({path:path.join(directory,'desktop-overview.png'),fullPage:true});
 for(const i of [1,3]){
  await node('業務設計').click();assert.equal(await node('業務設計').getAttribute('aria-pressed'),'true');
  assert.equal(await read(i).count(),1);await read(i).click();assert.equal(await visible(),5);assert.equal(await edge(i).getAttribute('aria-pressed'),'true');
  assert.match(await page.locator('#mode-summary').innerText(),/5 \/ 6/);assert.equal(await page.evaluate(()=>document.activeElement.id),'detail-title');
  if(i===3)await page.screenshot({path:path.join(directory,'desktop-omitted-read.png'),fullPage:true});
  await page.getByRole('button',{name:'Back to node',exact:true}).click();assert.equal(await visible(),4);assert.equal(await page.evaluate(()=>document.activeElement.dataset.relation),String(i));
 }
 await read(3).click();await node('実装').click();assert.equal(await visible(),4);assert.equal(await edge(3).isVisible(),false);assert.equal(await edge(2).isVisible(),true);assert.equal(await edge(0).isVisible(),true);
 await page.locator('#clear').click();assert.equal(await page.evaluate(()=>document.activeElement.dataset.node),'実装');assert.equal(await page.locator('[aria-pressed="true"]').count(),0);
 // Actual native keyboard event delivery and cross-region traversal.
 await node('業務設計').focus();await page.keyboard.press('Enter');assert.equal(await node('業務設計').getAttribute('aria-pressed'),'true');
 await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.dataset.node),'業務設計書');
 await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.dataset.node),'業務設計');
 await page.keyboard.press('Escape');assert.equal(await page.locator('[aria-pressed="true"]').count(),0);
 await page.keyboard.press('Space');assert.equal(await node('業務設計').getAttribute('aria-pressed'),'true');
 await page.locator('#view-details').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'detail-title');
 await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.dataset.relation),'1');await page.keyboard.press('Enter');assert.equal(await visible(),5);
 await page.keyboard.press('Escape');assert.equal(await visible(),4);assert.equal(await page.evaluate(()=>document.activeElement.dataset.node),'業務設計');
 await edge(0).focus();await page.keyboard.press('Space');assert.equal(await edge(0).getAttribute('aria-pressed'),'true');assert.match(await page.locator('.exception-note').innerText(),/not an application error/);
 await page.screenshot({path:path.join(directory,'desktop-exception.png'),fullPage:true});
 await page.getByLabel('All lines',{exact:true}).check();assert.equal(await visible(),6);assert.equal(await page.locator('[aria-pressed="true"]').count(),0);assert.equal(await page.evaluate(()=>document.activeElement.value),'all');
 await edge(1).focus();await page.keyboard.press('Enter');assert.equal(await edge(1).getAttribute('aria-pressed'),'true');
 await page.getByLabel('Output representative',{exact:true}).check();assert.equal(await visible(),4);assert.equal(await edge(1).isVisible(),false);
 // Repeat and reorder to check state does not leak from prior selection.
 await node('依頼者').click();await read(1).click();await node('業務設計書').click();await read(3).click();assert.equal(await visible(),5);assert.equal(await edge(1).isVisible(),false);
 await page.locator('.canvas').click({position:{x:800,y:545}});assert.equal(await visible(),4);assert.equal(await page.locator('[aria-pressed="true"]').count(),0);
 await page.setViewportSize({width:390,height:844});await node('業務設計').click();await page.screenshot({path:path.join(directory,'narrow-node-detail.png'),fullPage:true});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await read(3).click();assert.equal(await visible(),5);assert.equal(await page.locator('#detail-title').isVisible(),true);
 await page.getByRole('button',{name:'Back to node',exact:true}).click();assert.equal(await page.evaluate(()=>document.activeElement.dataset.relation),'3');
 await page.screenshot({path:path.join(directory,'narrow-read-return.png'),fullPage:true});
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 const result={status:'PASS',browser:await browser.version(),desktop:[1440,1000],narrow:[390,844],pageErrors:errors,externalRequests:requests,checks:['four nodes/six retained relations','paired Reads temporarily reveal separately','Input-only and Exception always present','Back restores initiating control','node switch clears temporary edge','Clear/Escape reset focus','Enter/Space activation','Tab/Shift+Tab traversal','View details cross-region focus','mode change clears selection','repeated/order-changed flows','blank canvas clear','narrow reachability/no page overflow'],limits:['Human design approval pending','No screen reader, real touch/mobile keyboard, other browsers, or whole-Viewer verification']};
 fs.writeFileSync(path.join(directory,'result.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
