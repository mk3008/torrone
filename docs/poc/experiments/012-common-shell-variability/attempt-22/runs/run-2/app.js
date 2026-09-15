(() => {
  const icons = {
    panelLeftOpen: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1"></rect><path d="M9 3v18M13 12h6m-3-3 3 3-3 3"></path></svg>',
    panelLeftClose: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1"></rect><path d="M9 3v18M19 12h-6m3-3-3 3 3 3"></path></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.3A8.5 8.5 0 0 1 8.7 3.5 8.5 8.5 0 1 0 20.5 15.3Z"></path></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m0-14.2 1.4 1.4m11.4 11.4 1.4 1.4"></path></svg>'
  };
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const search = document.querySelector('#nav-search');
  const clear = document.querySelector('#clear-search');
  const navList = document.querySelector('#nav-list');
  const noResults = document.querySelector('#no-results');
  const params = new URLSearchParams(location.search);
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = '項目 01-01';
  const leaves = ['項目 01-01', '項目 01-02', ...Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`)];
  document.querySelector('.search-icon').innerHTML = icons.search;
  clear.innerHTML = icons.x;
  Array.from({ length: 80 }, (_, i) => `<li>${i + 1}</li>`).forEach(markup => document.querySelector('#number-grid').insertAdjacentHTML('beforeend', markup));
  function syncUrl() { const next = new URL(location.href); next.searchParams.set('drawer', drawerOpen ? 'open' : 'hidden'); next.searchParams.set('theme', theme); history.replaceState(null, '', next); }
  function renderControls() {
    shell.dataset.drawer = drawerOpen ? 'open' : 'hidden'; shell.dataset.theme = theme;
    drawerToggle.innerHTML = drawerOpen ? icons.panelLeftClose : icons.panelLeftOpen;
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation'); drawerToggle.title = drawerOpen ? 'Close navigation' : 'Open navigation';
    themeToggle.innerHTML = theme === 'light' ? icons.moon : icons.sun;
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle.title = themeToggle.getAttribute('aria-label');
  }
  function matches(label, term) { return label.toLocaleLowerCase().includes(term.toLocaleLowerCase()); }
  function renderNavigation() {
    const term = search.value.trim(); const matchingChildren = leaves.filter(item => matches(item, term));
    const showGroup = !term || matches('グループ 01', term) || matchingChildren.length > 0;
    const standalone = leaves.slice(2).filter(item => matches(item, term));
    navList.innerHTML = '';
    if (showGroup) {
      navList.insertAdjacentHTML('beforeend', `<li><button class="nav-row group" id="group-toggle" type="button" aria-expanded="${expanded}">グループ 01 <span class="disclosure">${expanded ? icons.down : icons.right}</span></button></li>`);
      if (expanded) matchingChildren.slice(0, 2).forEach(item => addItem(item, true));
    }
    standalone.forEach(item => addItem(item, false));
    noResults.hidden = navList.children.length !== 0;
    const group = document.querySelector('#group-toggle'); if (group) group.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
  }
  function addItem(label, child) { const selected = label === current; navList.insertAdjacentHTML('beforeend', `<li><button class="nav-row${child ? ' child' : ''}" type="button" data-destination="${label}"${selected ? ' aria-current="page"' : ''}>${label}</button></li>`); }
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderControls(); syncUrl(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderControls(); syncUrl(); });
  search.addEventListener('input', () => { clear.classList.toggle('is-visible', search.value.length > 0); renderNavigation(); });
  clear.addEventListener('click', () => { search.value = ''; clear.classList.remove('is-visible'); renderNavigation(); search.focus(); });
  navList.addEventListener('click', event => { const item = event.target.closest('[data-destination]'); if (item) { current = item.dataset.destination; renderNavigation(); } });
  renderControls(); renderNavigation();
})();
