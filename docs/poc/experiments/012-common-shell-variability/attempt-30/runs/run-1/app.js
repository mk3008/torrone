(() => {
  const params = new URLSearchParams(window.location.search);
  const shell = document.querySelector('.shell');
  const root = document.documentElement;
  const drawer = document.querySelector('#drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const navList = document.querySelector('#nav-list');
  const navSearch = document.querySelector('#nav-search');
  const dummyContent = document.querySelector('#dummy-content');
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = '項目 01-01';
  const leaves = Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`);

  function image(path) { return `<img class="disclosure-icon" src="icons/${path}" alt="" aria-hidden="true">`; }
  function renderNav() {
    const query = navSearch.value.trim().toLowerCase();
    const parentMatches = 'グループ 01'.toLowerCase().includes(query);
    const childItems = ['項目 01-01', '項目 01-02'];
    const matchedChildren = query ? childItems.filter((item) => item.toLowerCase().includes(query)) : childItems;
    const matchedLeaves = query ? leaves.filter((item) => item.toLowerCase().includes(query)) : leaves;
    const showGroup = !query || parentMatches || matchedChildren.length > 0;
    const showChildren = query ? matchedChildren.length > 0 : expanded;
    let html = '';
    if (showGroup) {
      const open = query ? true : expanded;
      html += `<button class="parent-row" type="button" aria-expanded="${open}" id="group-toggle"><span>グループ 01</span>${image(open ? 'chevron-down.svg' : 'chevron-right.svg')}</button>`;
      if (showChildren) html += matchedChildren.map(row).join('');
    }
    html += matchedLeaves.map(row).join('');
    navList.innerHTML = html || '<p class="no-matches">一致する項目はありません</p>';
    const groupToggle = document.querySelector('#group-toggle');
    if (groupToggle) groupToggle.addEventListener('click', () => { if (!navSearch.value.trim()) { expanded = !expanded; renderNav(); } });
    navList.querySelectorAll('.nav-row').forEach((node) => node.addEventListener('click', (event) => { event.preventDefault(); current = node.dataset.item; renderNav(); }));
  }
  function row(item) { const child = item.startsWith('項目 01-'); const active = item === current; const destination = `#${encodeURIComponent(item)}`; return `<a class="nav-row${child ? ' child' : ''}" href="${destination}" data-item="${item}"${active ? ' aria-current="page"' : ''}>${item}</a>`; }
  function renderDrawer() {
    shell.classList.toggle('drawer-hidden', !drawerOpen);
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    drawerIcon.src = drawerOpen ? 'icons/panel-left-close.svg' : 'icons/panel-left-open.svg';
    drawer.setAttribute('aria-hidden', String(!drawerOpen));
  }
  function renderTheme() {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.title = themeToggle.getAttribute('aria-label');
    themeIcon.src = dark ? 'icons/sun.svg' : 'icons/moon.svg';
  }
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderDrawer(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderTheme(); });
  navSearch.addEventListener('input', renderNav);
  for (let i = 1; i <= 80; i += 1) { const item = document.createElement('li'); item.textContent = String(i); dummyContent.append(item); }
  renderDrawer(); renderTheme(); renderNav();
})();
