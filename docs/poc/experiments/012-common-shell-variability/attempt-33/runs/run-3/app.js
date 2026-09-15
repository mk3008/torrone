(() => {
  const shell = document.getElementById('shell');
  const drawer = document.getElementById('drawer');
  const drawerToggle = document.getElementById('drawer-toggle');
  const drawerIcon = document.getElementById('drawer-icon');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const search = document.getElementById('navigation-search');
  const list = document.getElementById('navigation-list');
  const entries = [{ id:'01-01', label:'項目 01-01', kind:'child' }, { id:'01-02', label:'項目 01-02', kind:'child' }, ...Array.from({ length:29 }, (_, index) => ({ id:String(index + 2).padStart(2,'0'), label:`項目 ${String(index + 2).padStart(2,'0')}`, kind:'leaf' }))];
  let expanded = true;
  let current = '01-01';
  const query = new URLSearchParams(location.search);
  let drawerState = query.get('drawer') === 'hidden' ? 'hidden' : 'open';
  let theme = query.get('theme') === 'dark' ? 'dark' : 'light';
  function setDrawer(state) { drawerState = state; shell.dataset.drawer = state; const open = state === 'open'; drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); drawerToggle.title = open ? 'Close navigation' : 'Open navigation'; drawerIcon.src = `icons/panel-left-${open ? 'close' : 'open'}.svg`; drawerToggle.setAttribute('aria-expanded', String(open)); }
  function setTheme(next) { theme = next; shell.dataset.theme = next; const isLight = next === 'light'; themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme'; themeIcon.src = `icons/${isLight ? 'moon' : 'sun'}.svg`; }
  function row(item) { const button = document.createElement('button'); button.type = 'button'; button.className = `nav-row ${item.kind}${item.id === current ? ' current' : ''}`; button.textContent = item.label; button.dataset.id = item.id; if (item.id === current) button.setAttribute('aria-current','page'); button.addEventListener('click', () => { current = item.id; render(); }); return button; }
  function render() { const value = search.value.trim(); const matching = entries.filter(entry => entry.label.includes(value)); const parentMatches = 'グループ 01'.includes(value) || matching.some(item => item.kind === 'child'); list.replaceChildren(); if (!matching.length && !parentMatches) { const empty = document.createElement('p'); empty.className = 'empty-state'; empty.textContent = '一致する項目はありません'; list.append(empty); return; } const parent = document.createElement('button'); parent.type='button'; parent.className='nav-row parent'; parent.textContent='グループ 01'; parent.setAttribute('aria-expanded',String(expanded)); const chevron = document.createElement('img'); chevron.className='chevron'; chevron.src=`icons/chevron-${expanded ? 'down' : 'right'}.svg`; chevron.alt=''; chevron.setAttribute('aria-hidden','true'); parent.append(chevron); parent.addEventListener('click',() => { expanded=!expanded; render(); }); list.append(parent); if (expanded) matching.filter(item => item.kind === 'child').forEach(item => list.append(row(item))); matching.filter(item => item.kind === 'leaf').forEach(item => list.append(row(item))); }
  drawerToggle.addEventListener('click', () => setDrawer(drawerState === 'open' ? 'hidden' : 'open'));
  themeToggle.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', render);
  document.getElementById('dummy-numbers').replaceChildren(...Array.from({ length:80 }, (_, index) => { const item=document.createElement('li'); item.textContent=String(index+1); return item; }));
  setDrawer(drawerState); setTheme(theme); render();
})();
