(() => {
  const shell = document.querySelector('.shell');
  const drawer = document.querySelector('#drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#nav-search');
  const list = document.querySelector('#nav-list');
  const noMatches = document.querySelector('#no-matches');
  let expanded = true;
  let current = '項目 01-01';
  const leaves = ['項目 01-01','項目 01-02', ...Array.from({length:29}, (_, i) => `項目 ${String(i + 2).padStart(2,'0')}`)];
  const params = new URLSearchParams(location.search);
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let drawerOpen = params.get('drawer') !== 'hidden';
  document.querySelector('#dummy-list').replaceChildren(...Array.from({length:80}, (_,i) => { const li=document.createElement('li'); li.textContent=String(i+1); return li; }));
  function img(path) { const el=document.createElement('img'); el.src=`icons/${path}.svg`; el.alt=''; el.className='chevron'; return el; }
  function row(label, kind, parent) { const b=document.createElement('button'); b.type='button'; b.className=`nav-row ${kind}${label===current ? ' current':''}`; b.textContent=label; if (kind==='group') { b.setAttribute('aria-expanded', String(expanded)); b.append(img(expanded ? 'chevron-down':'chevron-right')); b.addEventListener('click', () => { expanded=!expanded; render(); }); } else { b.setAttribute('aria-current', label===current ? 'page':'false'); b.addEventListener('click', () => { current=label; render(); }); } return b; }
  function render() { const q=search.value.trim().toLowerCase(); const items=leaves.filter(x => x.toLowerCase().includes(q)); const showGroup=!q || 'グループ 01'.includes(q) || items.some(x => x.startsWith('項目 01-')); list.replaceChildren(); if(showGroup) { list.append(row('グループ 01','group')); if(expanded || q) items.filter(x=>x.startsWith('項目 01-')).forEach(x=>list.append(row(x,'child'))); } items.filter(x=>!x.startsWith('項目 01-')).forEach(x=>list.append(row(x,'leaf'))); noMatches.hidden=Boolean(showGroup || items.length); }
  function setDrawer(open) { drawerOpen=open; drawer.hidden=!open; drawerToggle.setAttribute('aria-label', open ? 'Close navigation':'Open navigation'); drawerToggle.title=drawerToggle.getAttribute('aria-label'); drawerIcon.src=`icons/panel-left-${open ? 'close':'open'}.svg`; }
  function setTheme(next) { theme=next; shell.dataset.theme=theme; const toDark=theme==='light'; themeToggle.setAttribute('aria-label', toDark ? 'Switch to Dark theme':'Switch to Light theme'); themeToggle.title=themeToggle.getAttribute('aria-label'); themeIcon.src=`icons/${toDark ? 'moon':'sun'}.svg`; }
  search.addEventListener('input', render); drawerToggle.addEventListener('click',()=>setDrawer(!drawerOpen)); themeToggle.addEventListener('click',()=>setTheme(theme==='light'?'dark':'light'));
  setDrawer(drawerOpen); setTheme(theme); render();
})();
