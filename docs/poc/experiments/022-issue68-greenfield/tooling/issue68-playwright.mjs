import {chromium as real} from 'playwright';
import {readFile} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
const root=resolve(process.env.TRIAL_ASSET_DIR);
const types={'.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};
export const chromium={async launch(...args){
 const browser=await real.launch(...args);
 const newPage=browser.newPage.bind(browser);
 browser.newPage=async (...args)=>{
  const page=await newPage(...args);
  if(process.env.TRIAL_ORACLE_MODE==='continue')page.setDefaultTimeout(3500);
  const old=page.route.bind(page);
  page.route=(pattern,handler,...rest)=>old(pattern,async (route,request)=>{
   const rel=new URL(route.request().url()).pathname;
   const ext=rel.slice(rel.lastIndexOf('.'));
   if(rel!=='/'&&!rel.startsWith('/icons/')&&types[ext]){
     const path=resolve(root,'.'+rel);
     if(!path.startsWith(root+sep))return route.fulfill({status:403});
     try{return await route.fulfill({contentType:types[ext],body:await readFile(path)});}
     catch{return route.fulfill({status:404});}
   }
   return handler(route,request);
  },...rest);
  return page;
 };
 return browser;
}};

