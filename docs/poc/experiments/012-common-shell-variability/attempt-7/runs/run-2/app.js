(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const searchInput = document.querySelector('#menu-search');
  const clearSearch = document.querySelector('.clear-search');
  const searchField = document.querySelector('.search-field');
  const parent = document.querySelector('.parent-row');
  const children = document.querySelector('.children');
  const leaves = document.querySelector('#nav-leaves');
  const noMatches = document.querySelector('.no-matches');

  for (let i = 2; i <= 30; i += 1) {
    const item = document.createElement('button');
    item.className = 'nav-row leaf-row';
    item.type = 'button';
    item.textContent = `項目 ${String(i).padStart(2, '0')}`;
    leaves.append(item);
  }
  for (let i = 1; i <= 80; i += 1) {
    const item = document.createElement('li');
    item.textContent = String(i);
    document.querySelector('#dummy-list').append(item);
  }

  const params = new URLSearchParams(window.location.search);
  const setParam = (key, value) => {
    const next = new URL(window.location.href);
    next.searchParams.set(key, value);
    window.history.replaceState({}, '', next);
  };
  const setDrawer = (open) => {
    shell.classList.toggle('drawer-hidden', !open);
    drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = open ? 'Close navigation' : 'Open navigation';
    setParam('drawer', open ? 'open' : 'hidden');
  };
  const setTheme = (theme) => {
    shell.dataset.theme = theme;
    const nextName = theme === 'light' ? 'ダークテーマに切り替え' : 'ライトテーマに切り替え';
    themeToggle.setAttribute('aria-label', nextName);
    themeToggle.title = nextName;
    setParam('theme', theme);
  };
  const filterMenu = () => {
    const query = searchInput.value.trim().toLocaleLowerCase('ja');
    searchField.classList.toggle('has-value', query.length > 0);
    const rows = [...document.querySelectorAll('.child-row, .leaf-row')];
    let matchCount = 0;
    rows.forEach((row) => {
      const matches = !query || row.textContent.toLocaleLowerCase('ja').includes(query);
      row.hidden = !matches;
      if (matches) matchCount += 1;
    });
    const childMatch = [...document.querySelectorAll('.child-row')].some((row) => !row.hidden);
    parent.hidden = Boolean(query) && !childMatch;
    children.hidden = !childMatch || parent.getAttribute('aria-expanded') === 'false';
    noMatches.hidden = matchCount !== 0;
  };

  setDrawer(params.get('drawer') !== 'hidden');
  setTheme(params.get('theme') === 'dark' ? 'dark' : 'light');
  drawerToggle.addEventListener('click', () => setDrawer(shell.classList.contains('drawer-hidden')));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  parent.addEventListener('click', () => {
    const expanded = parent.getAttribute('aria-expanded') !== 'true';
    parent.setAttribute('aria-expanded', String(expanded));
    filterMenu();
  });
  searchInput.addEventListener('input', filterMenu);
  clearSearch.addEventListener('click', () => { searchInput.value = ''; filterMenu(); searchInput.focus(); });
  document.querySelector('.nav-list').addEventListener('click', (event) => {
    const row = event.target.closest('.child-row, .leaf-row');
    if (!row) return;
    document.querySelectorAll('.nav-row.selected').forEach((item) => { item.classList.remove('selected'); item.removeAttribute('aria-current'); });
    row.classList.add('selected');
    row.setAttribute('aria-current', 'page');
  });
})();
