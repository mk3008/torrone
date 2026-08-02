(() => {
  const shell = document.querySelector('.shell');
  const drawerButton = document.querySelector('.drawer-control');
  const themeButton = document.querySelector('.theme-control');
  const search = document.querySelector('#nav-search');
  const nav = document.querySelector('.nav-list');
  const list = document.querySelector('.dummy-list');
  const params = new URLSearchParams(location.search);
  let drawerOpen = params.get('drawer') !== 'hidden';
  let dark = params.get('theme') === 'dark';
  let expanded = true;
  let current = 'item-01-01';
  const items = [{id:'group-01', label:'グループ 01', children:[{id:'item-01-01',label:'項目 01-01'},{id:'item-01-02',label:'項目 01-02'}]}, ...Array.from({length:29},(_,i)=>({id:`item-${String(i+2).padStart(2,'0')}`,label:`項目 ${String(i+2).padStart(2,'0')}`}))];
  function icon(name) { return `icons/${name}.svg`; }
  function draw() {
    shell.dataset.drawer = drawerOpen ? 'open' : 'hidden'; shell.dataset.theme = dark ? 'dark' : 'light';
    drawerButton.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation'); drawerButton.title = drawerButton.getAttribute('aria-label');
    drawerButton.querySelector('img').src = icon(drawerOpen ? 'panel-left-close' : 'panel-left-open');
    themeButton.setAttribute('aria-label', dark ? 'Switch to Light' : 'Switch to Dark'); themeButton.title = themeButton.getAttribute('aria-label');
    themeButton.querySelector('img').src = icon(dark ? 'sun' : 'moon');
    const query = search.value.trim(); const q = query.toLocaleLowerCase('ja'); nav.replaceChildren(); let shown=0;
    for (const item of items) {
      const matchedParent = item.label.toLocaleLowerCase('ja').includes(q);
      if (item.children) {
        const matches = item.children.filter(c => c.label.toLocaleLowerCase('ja').includes(q));
        if (q && !matchedParent && !matches.length) continue;
        const parent = document.createElement('button'); parent.type='button'; parent.className='nav-row nav-parent'; parent.textContent=item.label; parent.setAttribute('aria-expanded', String(expanded || Boolean(q)));
        const chev=document.createElement('img'); chev.className='chevron'; chev.alt=''; chev.src=icon((expanded || q) ? 'chevron-down' : 'chevron-right'); parent.append(chev); parent.addEventListener('click',()=>{expanded=!expanded;draw()}); nav.append(parent); shown++;
        if (expanded || q) for (const child of (q ? matches : item.children)) nav.append(row(child,true));
      } else if (!q || matchedParent) { nav.append(row(item,false)); shown++; }
    }
    if (!shown) { const none=document.createElement('p'); none.className='empty'; none.textContent='一致する項目はありません'; nav.append(none); }
  }
  function row(item, child) { const b=document.createElement('button'); b.type='button'; b.className=`nav-row nav-leaf${child?' child':''}`; b.textContent=item.label; if(item.id===current)b.setAttribute('aria-current','page'); b.addEventListener('click',()=>{current=item.id;draw()}); return b; }
  for(let n=1;n<=80;n++){const li=document.createElement('li');li.textContent=n;list.append(li)}
  drawerButton.addEventListener('click',()=>{drawerOpen=!drawerOpen;draw()}); themeButton.addEventListener('click',()=>{dark=!dark;draw()}); search.addEventListener('input',draw); draw();
})();
