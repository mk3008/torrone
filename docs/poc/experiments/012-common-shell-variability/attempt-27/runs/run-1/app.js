(() => {
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const drawer = document.querySelector('#drawer');
  const toggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const nav = document.querySelector('#navigation');
  const input = document.querySelector('#nav-search');
  const noMatches = document.querySelector('#no-matches');
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let current = '項目 01-01'; let expanded = true;
  const items = [{ label:'グループ 01', parent:true }, { label:'項目 01-01', child:true }, { label:'項目 01-02', child:true }, ...Array.from({length:29}, (_, i) => ({ label:`項目 ${String(i + 2).padStart(2,'0')}` }))];
  function setTheme(next) { theme=next; root.dataset.theme=theme; const dark=theme==='dark'; themeToggle.setAttribute('aria-label', dark?'Switch to light theme':'Switch to dark theme'); themeToggle.title=themeToggle.getAttribute('aria-label'); themeToggle.querySelector('img').src=dark?'icons/sun.svg':'icons/moon.svg'; }
  function setDrawer(open) { drawerOpen=open; drawer.hidden=!open; toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation'); toggle.title=toggle.getAttribute('aria-label'); toggle.querySelector('img').src=open?'icons/panel-left-close.svg':'icons/panel-left-open.svg'; }
  function render() { const term=input.value.trim(); const query=term.toLocaleLowerCase(); const matched=items.filter(i=>!i.parent && i.label.toLocaleLowerCase().includes(query)); const showGroup=expanded && (query==='' || matched.some(i=>i.child)); const visible=items.filter(i => i.parent ? showGroup : (query==='' ? (!i.child || expanded) : matched.includes(i))); nav.replaceChildren(); visible.forEach(item => { const b=document.createElement('button'); b.type='button'; b.className=`nav-row${item.child?' child':''}`; b.textContent=item.label; if(item.parent){ const d=document.createElement('span'); d.className='disclosure'; const icon=document.createElement('img'); icon.src=expanded?'icons/chevron-down.svg':'icons/chevron-right.svg'; icon.alt=''; d.append(icon); b.append(d); b.addEventListener('click',()=>{expanded=!expanded;render();}); } else { if(item.label===current)b.setAttribute('aria-current','page'); b.addEventListener('click',()=>{current=item.label;render();}); } nav.append(b); }); noMatches.hidden=visible.length>0; }
  document.querySelector('#numbers').append(...Array.from({length:80},(_,i)=>{const cell=document.createElement('div');cell.className='number';cell.textContent=String(i+1);return cell;}));
  toggle.addEventListener('click',()=>setDrawer(!drawerOpen)); themeToggle.addEventListener('click',()=>setTheme(theme==='light'?'dark':'light')); input.addEventListener('input',render); setTheme(theme); setDrawer(drawerOpen); render();
})();
