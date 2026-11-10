const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{const browser=await chromium.launch({headless:true});const report=[];
async function pageAt(name,width,url){const p=await browser.newPage({viewport:{width,height:760}});await p.goto('http://127.0.0.1:4173/'+url);await p.screenshot({path:`/bench/app/evidence/${name}.png`,fullPage:true});return p}
let p=await pageAt('first-desktop-1000',1000,'?case=desktop');
report.push({check:'desktop overflow controls',docArrows:await p.getByLabel('文書を右に送る').count(),itemArrows:await p.getByLabel('項目を右に送る').count(),pageScroll:await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth)});
const before=await p.locator('.doc-track').count();
await p.getByLabel('文書を右に送る').click();await p.waitForTimeout(300);report.push({check:'desktop arrow',scrollLeft:await p.locator('.tab-row[data-type=doc] .tab-track').evaluate(e=>e.scrollLeft),selected:await p.locator('.doc-tab[aria-selected=true]').getAttribute('aria-label')});
await p.close();
p=await pageAt('first-narrow-390',390,'?case=both');report.push({check:'narrow overflow',docCount:await p.getByText('ほか4',{exact:true}).count(),itemCount:await p.getByText('ほか4',{exact:true}).count(),arrows:await p.locator('.scroll-button').count()});
await p.getByLabel(/文書を切り替える/).click();report.push({check:'doc chooser focus/cards',focus:await p.evaluate(()=>document.activeElement.textContent.trim()),cards:await p.locator('.doc-card').count(),heading:await p.getByRole('heading',{name:'ほかの文書（4）'}).count()});await p.screenshot({path:'/bench/app/evidence/first-document-chooser.png',fullPage:true});
await p.locator('.doc-card').nth(2).click();report.push({check:'card selection',selected:await p.locator('.doc-tab[aria-selected=true]').getAttribute('aria-label'),focusRole:await p.evaluate(()=>document.activeElement.getAttribute('role'))});
await p.close();
p=await pageAt('first-item-menu-390',390,'?case=both');await p.getByLabel(/項目を切り替える/).click();report.push({check:'item menu',expanded:await p.getByLabel(/項目を切り替える/).getAttribute('aria-expanded'),items:await p.locator('.item-menu button').allTextContents(),alignment:await p.evaluate(()=>{let a=document.querySelector('.item-count').getBoundingClientRect(),b=document.querySelector('.item-menu').getBoundingClientRect();return [a.right,b.right]})});await p.screenshot({path:'/bench/app/evidence/first-item-menu.png',fullPage:true});
await p.locator('.item-menu button').first().click();report.push({check:'item select focus',heading:await p.locator('#content-title').textContent(),focus:await p.evaluate(()=>document.activeElement.className)});await p.close();
p=await pageAt('first-fit-600',600,'?case=fit');report.push({check:'fit at 600',docArrows:await p.locator('.scroll-button').count(),docTabs:await p.locator('.doc-tab').count(),itemTabs:await p.locator('.item-tab').count()});
await p.locator('.doc-tab').first().press('ArrowRight');report.push({check:'arrow focus no activation',focused:await p.evaluate(()=>document.activeElement.getAttribute('aria-label')),selected:await p.locator('.doc-tab[aria-selected=true]').getAttribute('aria-label')});await p.close();
fs.writeFileSync('/bench/app/evidence/first-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
