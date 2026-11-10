import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const out='outputs/torrone-overflow-dogfood';
const html=await readFile(out+'/preview/index.html','utf8');
const browser=await chromium.launch();
const tests=[];
await mkdir(out+'/evidence',{recursive:true});
const routes=async page=>{
 page.on('pageerror',err=>tests.push({error:err.message}));
 await page.route('http://oracle.test/**',async route=>{
   const rel=new URL(route.request().url()).pathname.slice(1);
   const icon=rel.startsWith('icons/');
   const extended=new URL(route.request().url()).searchParams.get('case')==='pcChild';
   const document=extended?html.replace('const closeIcon=', "fixture.docs[0][3].push('更新記録');fixture.cases.pcChild={documents:2,initialChildren:6};const closeIcon="):html;
   await route.fulfill({body:icon?await readFile(out+'/preview/'+rel):document,contentType:icon?'image/svg+xml':'text/html; charset=utf-8'});
 });
};
const page=await browser.newPage({viewport:{width:1024,height:720}});
const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
await Promise.all([routes(page),routes(touch)]);
const expectRows=async (page,id,expected)=>{
 const actual=await page.locator('.reference .row').evaluateAll(rows=>rows.map(row=>{
   const tabs=row.querySelectorAll('[role=tab]').length;
   const arrows=row.querySelectorAll('[data-scroll]').length;
   const more=row.querySelector('.more')?.textContent.trim()??'';
   return [tabs,arrows,more];
 }));
 assert.deepEqual(actual,expected,id);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,id);
 tests.push({id,width:page.viewportSize().width,rows:actual,status:'pass'});
};
const go=async (page,scenario,width)=>{
 await page.setViewportSize({width,height:page===touch?844:720});
 await page.goto('http://oracle.test/?case='+scenario);
 await page.locator('.reference .row').nth(1).waitFor();
};
const resize=async (page,width)=>{
 await page.setViewportSize({width,height:page===touch?844:720});
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
};
const shot=(page,n)=>page.screenshot({path:out+'/evidence/'+n+'.png',clip:{x:0,y:0,width:page.viewportSize().width,height:400}});
try{
 await go(page,'parent',732);
 await expectRows(page,'PC · exact fit',[[5,0,''],[2,0,'']]);
 await shot(page,'pc-fit');
 await resize(page,731);
 await expectRows(page,'PC · 1px short',[[5,2,''],[2,0,'']]);
 await shot(page,'pc-overflow');
 const tabName=await page.getByRole('tab',{selected:true}).first().textContent();
 await page.getByRole('button',{name:'文書を右に送る'}).click();
 assert.ok(await page.getByRole('tablist').first().evaluate(row=>row.scrollLeft)>0);
 assert.equal(await page.getByRole('tab',{selected:true}).first().textContent(),tabName);
 tests.push({id:'PC · scroll retains selection',status:'pass'});
 await resize(page,732);
 await expectRows(page,'PC · restored width',[[5,0,''],[2,0,'']]);
 await go(page,'pcChild',704);
 await expectRows(page,'PC · child exact fit',[[2,0,''],[6,0,'']]);
 await resize(page,703);
 await expectRows(page,'PC · child only 1px short',[[2,0,''],[6,2,'']]);

 await go(touch,'fit',280);
 await expectRows(touch,'Mobile · exact fit',[[2,0,''],[2,0,'']]);
 await resize(touch,279);
 await expectRows(touch,'Mobile · same 2 tabs, 1px short',[[1,0,'ほか1'],[2,0,'']]);
 await resize(touch,280);
 await expectRows(touch,'Mobile · restored width',[[2,0,''],[2,0,'']]);
 await go(touch,'child',462);
 await expectRows(touch,'Mobile · child exact fit',[[2,0,''],[5,0,'']]);
 await resize(touch,461);
 await expectRows(touch,'Mobile · child only 1px short',[[2,0,''],[1,0,'ほか4']]);
 await shot(touch,'mobile-child-overflow');
 await go(touch,'parent',390);
 await expectRows(touch,'Mobile · parent only',[[1,0,'ほか4'],[2,0,'']]);
 await go(touch,'both',390);
 await expectRows(touch,'Mobile · both',[[1,0,'ほか4'],[1,0,'ほか4']]);
 const gaps=await touch.locator('.reference .row').evaluateAll(rows=>rows.map(row=>{
   const tab=row.querySelector('[role=tab][aria-selected=true]');
   const tabSurface=tab.closest('.parent')??tab;
   return row.querySelector('.more').getBoundingClientRect().left-tabSurface.getBoundingClientRect().right;
 }));
 assert.deepEqual(gaps,[6,6]);
 tests.push({id:'Mobile · selected tab fills remaining width',gaps,status:'pass'});
 await shot(touch,'mobile-both-overflow');
 await touch.getByRole('button',{name:/文書を切り替える/}).tap();
 await touch.getByRole('button',{name:/受注管理.*西日本/}).tap();
 await expectRows(touch,'Mobile · new document children now fit',[[1,0,'ほか4'],[2,0,'']]);
 assert.match(await touch.getByRole('heading',{level:2}).innerText(),/受注管理の概要/);
 assert.equal(tests.filter(t=>t.error).length,0);
}finally{
 await writeFile(out+'/evidence/results.json',JSON.stringify({chromium:browser.version(),tests},null,2));
 await browser.close();
}
console.log(tests.length+' browser checks passed.');


