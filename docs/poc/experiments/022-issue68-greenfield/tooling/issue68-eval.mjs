import {registerHooks} from 'node:module';
import {pathToFileURL} from 'node:url';
import {fileURLToPath} from 'node:url';
import {readFile,mkdir,copyFile,cp} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const [mode,appArg,outArg]=process.argv.slice(2);
const app=resolve(appArg),out=resolve(outArg);
const here=fileURLToPath(new URL('.',import.meta.url));
const original=resolve(here,'../oracle/check-overflow-oracle.mjs');
const source=mode==='strict'?original:resolve(here,'issue68-continuation.mjs');
const alias=join(out,'outputs/torrone-overflow-dogfood/preview');
await mkdir(alias,{recursive:true});
await copyFile(join(app,'index.html'),join(alias,'index.html'));
await cp(join(app,'icons'),join(alias,'icons'),{recursive:true});
process.env.TRIAL_ASSET_DIR=app;
process.env.TRIAL_ORACLE_MODE=mode;
const hook=registerHooks({resolve(spec,ctx,next){
 if(spec==='playwright'&&ctx.parentURL===pathToFileURL(source).href){
   return {url:pathToFileURL(join(here,'issue68-playwright.mjs')).href,shortCircuit:true};
 }
 return next(spec,ctx);
}});
process.chdir(out);
try{await import(pathToFileURL(source).href);}finally{hook.deregister();}

