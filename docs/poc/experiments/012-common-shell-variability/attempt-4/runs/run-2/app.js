(() => {
  const shell = document.querySelector('.app-shell');
  const parameters = new URLSearchParams(window.location.search);
  const drawerToggle = document.querySelector('[data-drawer-toggle]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeIcon = document.querySelector('[data-theme-icon]');
  const filter = document.querySelector('#drawer-filter');
  const clearFilter = document.querySelector('[data-filter-clear]');
  const items = [...document.querySelectorAll('[data-nav-item]')];
  const group = document.querySelector('[data-group]');
  const noMatches = document.querySelector('[data-no-matches]');

  function setQuery(name, value) {
    const next = new URLSearchParams(window.location.search);
    next.set(name, value);
    history.replaceState(null, '', `${window.location.pathname}?${next.toString()}${window.location.hash}`);
  }

  function setDrawer(state) {
    const open = state !== 'hidden';
    shell.dataset.drawer = open ? 'open' : 'hidden';
    drawerToggle.setAttribute('aria-expanded', String(open));
    drawerToggle.setAttribute('aria-label', open ? 'Drawer を閉じる' : 'Drawer を開く');
  }

  function setTheme(theme) {
    const dark = theme === 'dark';
    shell.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', dark ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
    themeIcon.textContent = dark ? '☀' : '◐';
  }

  function applyFilter() {
    const query = filter.value.trim().toLocaleLowerCase('ja');
    let matches = 0;
    const parent = group.querySelector('.nav-parent a');
    const parentMatch = query && parent.dataset.navLabel.toLocaleLowerCase('ja').includes(query);
    items.forEach((item) => {
      const inGroup = group.contains(item);
      const match = !query || parentMatch && inGroup || item.dataset.navLabel.toLocaleLowerCase('ja').includes(query);
      item.hidden = !match;
      if (match) matches += 1;
    });

    const groupItems = [...group.querySelectorAll('[data-nav-item]')];
    const groupMatch = !query || parentMatch || groupItems.some((item) => !item.hidden);
    group.hidden = !groupMatch;
    noMatches.hidden = matches !== 0;
  }

  setDrawer(parameters.get('drawer'));
  setTheme(parameters.get('theme'));
  applyFilter();

  drawerToggle.addEventListener('click', () => {
    const next = shell.dataset.drawer === 'open' ? 'hidden' : 'open';
    setDrawer(next);
    setQuery('drawer', next);
  });

  themeToggle.addEventListener('click', () => {
    const next = shell.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setQuery('theme', next);
  });

  filter.addEventListener('input', applyFilter);
  clearFilter.addEventListener('click', () => {
    filter.value = '';
    applyFilter();
    filter.focus();
  });
})();
