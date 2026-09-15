(() => {
  const icons = {
    panelOpen: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M13 9l3 3-3 3"/></svg>',
    panelClose: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M16 9l-3 3 3 3"/></svg>',
    moon: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
    sun: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
  };
  const params = new URLSearchParams(location.search);
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = 'item-01-01';
  const entries = [{ id:'item-01-01', label:'項目 01-01', child:true }, { id:'item-01-02', label:'項目 01-02', child:true }, ...Array.from({length:29}, (_, index) => ({ id:`item-${String(index + 2).padStart(2,'0')}`, label:`項目 ${String(index + 2).padStart(2,'0')}` }))];
  const shell = document.querySelector('#shell'), drawerToggle = document.querySelector('#drawer-toggle'), themeToggle = document.querySelector('#theme-toggle'), navigation = document.querySelector('#navigation'), search = document.querySelector('#menu-search'), clear = document.querySelector('#search-clear');
  document.querySelector('#numbers').innerHTML = Array.from({length:80}, (_, i) => `<div class="number">${i + 1}</div>`).join('');
  function replaceQuery() { const next = new URL(location); next.searchParams.set('drawer', drawerOpen ? 'open' : 'hidden'); next.searchParams.set('theme', theme); history.replaceState(null, '', next); }
  function renderControls() { shell.dataset.theme = theme; shell.classList.toggle('drawer-hidden', !drawerOpen); drawerToggle.innerHTML = drawerOpen ? icons.panelClose : icons.panelOpen; drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation'); drawerToggle.title = drawerToggle.getAttribute('aria-label'); themeToggle.innerHTML = theme === 'light' ? icons.moon : icons.sun; themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle.title = themeToggle.getAttribute('aria-label'); replaceQuery(); }
  function row(entry) { const selected = entry.id === current; return `<button type="button" class="nav-row${entry.child ? ' child' : ''}${selected ? ' current' : ''}" data-id="${entry.id}"${selected ? ' aria-current="page"' : ''}>${entry.label}</button>`; }
  function renderNav() { const term = search.value.trim(); document.querySelector('.search-field').classList.toggle('has-value', Boolean(term)); const matched = entries.filter(entry => entry.label.includes(term)); const children = matched.filter(entry => entry.child); const leaves = matched.filter(entry => !entry.child); const parentNeeded = !term || children.length > 0 || 'グループ 01'.includes(term); let html = ''; if (parentNeeded) html += `<button type="button" class="nav-row parent" data-disclosure="true" aria-expanded="${expanded}">グループ 01 <span class="disclosure" aria-hidden="true"><span class="chevron${expanded ? '' : ' right'}"></span></span></button>`; if (expanded) html += children.map(row).join(''); html += leaves.map(row).join(''); navigation.innerHTML = html || '<div class="no-matches">一致する項目はありません</div>'; }
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderControls(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderControls(); });
  search.addEventListener('input', renderNav); clear.addEventListener('click', () => { search.value = ''; search.focus(); renderNav(); });
  navigation.addEventListener('click', event => { const disclosure = event.target.closest('[data-disclosure]'); if (disclosure) { expanded = !expanded; renderNav(); return; } const item = event.target.closest('[data-id]'); if (item) { current = item.dataset.id; renderNav(); } });
  renderControls(); renderNav();
})();
