const DATA={docs:[["invoice","請求書","東日本",["明細","履歴","メモ","関連資料","承認状況","更新記録"]],["east","受注管理","東日本",["概要","受注明細"]],["west","受注管理","西日本",["概要","見積履歴"]],["report","四半期売上の照合レポート","西日本",["明細","履歴"]],["refund","返品処理","東日本",["一覧","確認"]],["payment","入金照合","西日本",["概要","記録"]],["audit","監査メモ","西日本",["概要","記録"]],["export","取引データのダウンロード","東日本",["概要","記録"]]],cases:{fit:{documents:2,initialChildren:2},parent:{documents:5,initialChildren:2},child:{documents:2,initialChildren:5},both:{documents:5,initialChildren:5},desktop:{documents:8,initialChildren:5},pcChild:{documents:2,initialChildren:6}}};
const app=document.querySelector('#app'),menu=document.querySelector('#menu');
const q=new URLSearchParams(location.search),cfg=DATA.cases[q.get('case')]||DATA.cases.both;
let docs=DATA.docs.slice(0,cfg.documents).map((d,i)=>({id:d[0],label:d[1],aff:d[2],items:d[3].slice(0,i?d[3].length:cfg.initialChildren),selected:d[3][0]}));
let selected=docs[0]?.id,chooser=false,itemOpen=false,returnTrigger=null;
const icon=(name)=>`<img src="${name}.svg" alt="">`;
function current(){return docs.find(d=>d.id===selected)}
function narrow(){return innerWidth<600}
function over(kind,count){const width=app.clientWidth;return count*(kind==='doc'?(narrow()?124:140):(narrow()?86:112))>width}
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(focusTarget){
 if(chooser){renderChooser();return}
 if(!docs.length){app.innerHTML='<div class="empty">開いている文書はありません。</div>';menu.focus();return}
 const d=current(); app.innerHTML=`${row('doc',docs,d.id)}${row('item',d.items,d.selected)}<section class="content" aria-live="polite"><h2>${esc(d.label)}の${esc(d.selected)}</h2><p class="meta">${esc(d.aff)} · ${esc(d.selected)}</p><button class="outline">内容の確認</button></section>`;
 bind(); if(focusTarget) requestAnimationFrame(()=>document.querySelector(focusTarget)?.focus());
}
function row(kind,list,sel){
 const isDoc=kind==='doc',overflow=over(kind,list.length),hidden=list.length-1,label=isDoc?'文書':'項目';
 if(narrow()&&overflow){
  const val=isDoc?current():sel; const obj=isDoc?val:null; const text=isDoc?obj.label:val;
  return `<div class="tabs-row compact-row" role="tablist" aria-label="${label}"><div class="compact-selected">${tab(kind,isDoc?obj:val,true)}</div><button class="count" data-count="${kind}" aria-expanded="${kind==='item'&&itemOpen}" aria-label="ほか${hidden}、${label}を切り替える">ほか${hidden}${icon(kind==='doc'?'chevron-right':'chevron-down')}</button>${kind==='item'&&itemOpen?itemPopup(current().items.filter(x=>x!==sel)):''}</div>`;
 }
 const tabs=list.map(x=>tab(kind,x,isDoc?x.id===sel:x===sel)).join('');
 return `<div class="tabs-row"><div class="track-wrap"><div class="track" role="tablist" aria-label="${label}" style="--tab-width:${isDoc?140:112}px">${tabs}</div></div>${!narrow()&&overflow?`<button class="nav" data-scroll="${kind}:-1" aria-label="${label}を左に送る">${icon('chevron-left')}</button><button class="nav" data-scroll="${kind}:1" aria-label="${label}を右に送る">${icon('chevron-right')}</button>`:''}</div>`;
}
function tab(kind,x,on){const isDoc=kind==='doc',d=isDoc?x:current(),value=isDoc?x.id:x,label=isDoc?x.label:x,full=isDoc?`${x.label}、${x.aff}`:x;return `<div class="tab ${isDoc?'doc-tab '+(x.aff==='東日本'?'east':'west'):'item-tab'}" role="tab" aria-selected="${on}" aria-label="${esc(full)}" tabindex="${on?0:-1}" data-kind="${kind}" data-value="${esc(value)}" ${isDoc?`title="${esc(x.label)} · ${esc(x.aff)}"`:''}><span class="tab-label">${esc(label)}</span>${isDoc?`<button class="close" tabindex="${on?0:-1}" aria-label="${esc(x.label)}を閉じる" data-close="${x.id}">${icon('x')}</button>`:''}</div>`}
function itemPopup(items){return `<div class="item-pop">${items.map(x=>`<button class="list-item" data-pick-item="${esc(x)}">${esc(x)}</button>`).join('')}</div>`}
function renderChooser(){const hidden=docs.filter(d=>d.id!==selected);app.innerHTML=`<section class="chooser"><div class="chooser-head"><button class="back">戻る</button><h2 tabindex="-1">ほかの文書（${hidden.length}）</h2></div><div class="cards">${hidden.map(d=>`<button class="card" data-pick-doc="${d.id}" aria-label="${esc(d.label)}、${esc(d.aff)}"><span class="thumb" aria-hidden="true"></span><span><strong>${esc(d.label)}</strong><span>${esc(d.aff)}</span></span></button>`).join('')}</div></section>`;document.querySelector('.back').onclick=closeChooser;document.querySelectorAll('[data-pick-doc]').forEach(b=>b.onclick=()=>{selected=b.dataset.pickDoc;chooser=false;render(`[data-kind=doc][data-value="${selected}"]`) });requestAnimationFrame(()=>document.querySelector('.back').focus())}
function closeChooser(){chooser=false;render();requestAnimationFrame(()=>returnTrigger?.focus())}
function bind(){
 document.querySelectorAll('.tab').forEach(t=>{t.onclick=e=>{if(e.target.closest('.close'))return;activate(t)};t.onkeydown=e=>tabKeys(e,t);t.onfocus=()=>t.classList.add('focused');t.onblur=e=>{if(!t.contains(e.relatedTarget))t.classList.remove('focused')};});
 document.querySelectorAll('.close').forEach(b=>{b.onclick=e=>{e.stopPropagation();closeDoc(b.dataset.close)};b.onfocus=()=>b.closest('.tab').classList.add('focused')});
 document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{const [k,dir]=b.dataset.scroll.split(':');const track=b.parentElement.querySelector('.track');track.scrollBy({left:Number(dir)*(k==='doc'?140:112),behavior:'smooth'})});
 document.querySelectorAll('.track').forEach(t=>t.onwheel=e=>{if(t.scrollWidth>t.clientWidth){e.preventDefault();t.scrollLeft+=e.deltaY||e.deltaX}},{passive:false});
 document.querySelectorAll('.count').forEach(b=>b.onclick=()=>{returnTrigger=b;if(b.dataset.count==='doc'){chooser=true;render()}else{itemOpen=!itemOpen;render();requestAnimationFrame(()=>{const trigger=document.querySelector('[data-count=item]');returnTrigger=trigger;if(itemOpen)document.querySelector('.list-item')?.focus();else trigger?.focus()})}});
 document.querySelectorAll('[data-pick-item]').forEach(b=>b.onclick=()=>{current().selected=b.dataset.pickItem;itemOpen=false;render();requestAnimationFrame(()=>document.querySelector('[data-count=item]')?.focus())});
}
function activate(t){if(t.dataset.kind==='doc'){selected=t.dataset.value;itemOpen=false}else current().selected=t.dataset.value;render(`[data-kind="${t.dataset.kind}"][data-value="${CSS.escape(t.dataset.value)}"]`)}
function tabKeys(e,t){if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(t);return}if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const all=[...(t.closest('[role=tablist]').querySelectorAll('[role=tab]'))],i=all.indexOf(t),n=(i+(e.key==='ArrowRight'?1:-1)+all.length)%all.length;all[n].focus();all[n].scrollIntoView({inline:'nearest',block:'nearest'})}
function closeDoc(id){const i=docs.findIndex(d=>d.id===id),was=id===selected;docs.splice(i,1);if(!docs.length){render();return}let target=selected;if(was)target=docs[Math.min(i,docs.length-1)].id;selected=target;render(`[data-kind=doc][data-value="${target}"]`)}
addEventListener('keydown',e=>{if(e.key==='Escape'){if(chooser){e.preventDefault();closeChooser()}else if(itemOpen){e.preventDefault();itemOpen=false;render();requestAnimationFrame(()=>returnTrigger?.focus())}}});
let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>render(),80)});render();
