import {chromium} from 'playwright';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname,sep,join} from 'node:path';
const [project,dest]=process.argv.slice(2).map(p=>resolve(p));
const browser=await chromium.launch();
await mkdir(dest,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};
const results=[];
try{
 for(const [name,width,height,scenario] of [['desktop',1000,720,'desktop'],['narrow',420,800,'both']]){
  const page=await browser.newPage({viewport:{width,height},isMobile:width===420,hasTouch:width===420});
  const errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.route('http://own-check.test/**',async route=>{
    const path=resolve(project,'.'+new URL(route.request().url()).pathname);
    const file=path===project?join(project,'index.html'):path;
    if(!file.startsWith(project+sep))return route.fulfill({status:403});
    try{return route.fulfill({body:await readFile(file),contentType:types[extname(file)]??'application/octet-stream'});}
    catch{return route.fulfill({status:404});}
  });
  await page.goto('http://own-check.test/?case='+scenario);
  await page.locator('.reference').first().waitFor({timeout:3000}).catch(()=>{});
  await page.screenshot({path:join(dest,name+'.png'),fullPage:true});
  const rows=await page.getByRole('tablist').count();
  const selected=await page.getByRole('tab',{selected:true}).allTextContents();
  const geometry=await page.locator('.reference .row').evaluateAll(rows=>rows.map(r=>({row:r.getBoundingClientRect().toJSON(),tabs:[...r.querySelectorAll('[role=tab]')].map(t=>[t.textContent.trim(),t.getBoundingClientRect().width])})));
  results.push({name,rows,selected,errors,geometry});
  await page.close();
 }
}finally{
 await browser.close();
 await writeFile(join(dest,'smoke.json'),JSON.stringify(results,null,2));
}
if(results.some(r=>r.errors.length||r.rows!==2||r.selected.length!==2))process.exitCode=1;

