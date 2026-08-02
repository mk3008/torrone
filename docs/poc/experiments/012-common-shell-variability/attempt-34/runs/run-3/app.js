(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const nav = document.querySelector('.navigation-list');
  const search = document.querySelector('#navigation-search');
  const numbers = document.querySelector('.dummy-numbers');
  const entries = [
    { id: 'group-01', label: 'グループ 01', parent: true },
    { id: 'item-01-01', label: '項目 01-01', child: true },
    { id: 'item-01-02', label: '項目 01-02', child: true },
    ...Array.from({ length: 29 }, (_, index) => ({ id: `item-${String(index + 2).padStart(2, '0')}`, label: `項目 ${String(index + 2).padStart(2, '0')}` }))
  ];
  let expanded = true;
  let current = 'item-01-01';

  const image = (name) => `<img class="nav-icon" src="assets/${name}.svg" alt="" aria-hidden="true">`;
  function renderNav() {
    const query = search.value.trim().toLowerCase();
    const childMatches = entries.filter(x => x.child && x.label.toLowerCase().includes(query));
    const groupMatches = entries[0].label.toLowerCase().includes(query);
    const leaves = entries.filter(x => !x.parent && !x.child && x.label.toLowerCase().includes(query));
    const showGroup = !query || groupMatches || childMatches.length;
    const shownChildren = query ? childMatches : entries.filter(x => x.child);
    const nodes = [];
    if (showGroup) nodes.push(`<button class="nav-row" type="button" data-disclosure="true" aria-expanded="${expanded || Boolean(query)}"><span class="label">グループ 01</span>${image((expanded || query) ? 'chevron-down' : 'chevron-right')}</button>`);
    if (showGroup && (expanded || query)) shownChildren.forEach(entry => nodes.push(row(entry)));
    leaves.forEach(entry => nodes.push(row(entry)));
    nav.innerHTML = nodes.length ? nodes.join('') : '<p class="no-matches">一致する項目はありません</p>';
  }
  function row(entry) {
    const selected = entry.id === current;
    return `<button class="nav-row ${entry.child ? 'child' : ''} ${selected ? 'selected' : ''}" type="button" data-item="${entry.id}" ${selected ? 'aria-current="page"' : ''}><span class="label">${entry.label}</span></button>`;
  }
  function setDrawer(open) {
    shell.dataset.drawer = open ? 'open' : 'hidden';
    drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    drawerToggle.innerHTML = `<img src="assets/panel-left-${open ? 'close' : 'open'}.svg" alt="" aria-hidden="true">`;
  }
  function setTheme(theme) {
    shell.dataset.theme = theme;
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.title = themeToggle.getAttribute('aria-label');
    themeToggle.innerHTML = `<img src="assets/${isLight ? 'moon' : 'sun'}.svg" alt="" aria-hidden="true">`;
  }
  drawerToggle.addEventListener('click', () => setDrawer(shell.dataset.drawer !== 'open'));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  nav.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.disclosure) { expanded = !expanded; renderNav(); return; }
    if (button.dataset.item) { current = button.dataset.item; renderNav(); }
  });
  search.addEventListener('input', renderNav);
  Array.from({ length: 80 }, (_, index) => `<li>${index + 1}</li>`).forEach(markup => numbers.insertAdjacentHTML('beforeend', markup));
  const query = new URLSearchParams(location.search);
  setDrawer(query.get('drawer') === 'hidden' ? false : true);
  setTheme(query.get('theme') === 'dark' ? 'dark' : 'light');
  renderNav();
})();
