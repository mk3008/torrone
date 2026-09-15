(() => {
  const shell = document.querySelector('.shell');
  const drawerControl = document.querySelector('#drawer-control');
  const themeControl = document.querySelector('#theme-control');
  const search = document.querySelector('#drawer-search');
  const searchBox = document.querySelector('.search-box');
  const parent = document.querySelector('.parent');
  const children = document.querySelector('.group-children');
  const leaves = document.querySelector('#leaf-items');
  const noMatches = document.querySelector('#no-matches');

  for (let number = 2; number <= 30; number += 1) {
    const button = document.createElement('button');
    button.className = 'nav-item leaf';
    button.type = 'button';
    button.textContent = `項目 ${String(number).padStart(2, '0')}`;
    leaves.append(button);
  }
  for (let number = 1; number <= 80; number += 1) {
    const row = document.createElement('li');
    row.textContent = String(number);
    document.querySelector('#numbers').append(row);
  }

  const updateQuery = (key, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
  };
  const setDrawer = (isOpen, writeUrl = true) => {
    shell.classList.toggle('is-drawer-hidden', !isOpen);
    const name = isOpen ? 'Close navigation' : 'Open navigation';
    drawerControl.setAttribute('aria-label', name);
    drawerControl.title = name;
    if (writeUrl) updateQuery('drawer', isOpen ? 'open' : 'hidden');
  };
  const setTheme = (theme, writeUrl = true) => {
    shell.dataset.theme = theme;
    const name = theme === 'light' ? 'ダークテーマに切り替え' : 'ライトテーマに切り替え';
    themeControl.setAttribute('aria-label', name);
    themeControl.title = name;
    if (writeUrl) updateQuery('theme', theme);
  };
  const renderClearControl = () => {
    const existing = document.querySelector('.clear-search');
    if (search.value.length === 0) {
      existing?.remove();
      return;
    }
    if (existing) return;
    const clear = document.createElement('button');
    clear.className = 'clear-search';
    clear.type = 'button';
    clear.setAttribute('aria-label', '検索をクリア');
    clear.title = '検索をクリア';
    clear.textContent = '×';
    clear.addEventListener('click', () => { search.value = ''; filterNavigation(); search.focus(); });
    searchBox.append(clear);
  };
  const filterNavigation = () => {
    const query = search.value.trim().toLocaleLowerCase('ja');
    const items = [...document.querySelectorAll('.child, .leaf')];
    let matches = 0;
    items.forEach((item) => {
      const visible = !query || item.textContent.toLocaleLowerCase('ja').includes(query);
      item.hidden = !visible;
      if (visible) matches += 1;
    });
    const hasChildMatch = [...document.querySelectorAll('.child')].some((item) => !item.hidden);
    parent.hidden = Boolean(query) && !hasChildMatch;
    children.hidden = !hasChildMatch || parent.getAttribute('aria-expanded') === 'false';
    noMatches.hidden = matches !== 0;
    renderClearControl();
  };

  const params = new URLSearchParams(window.location.search);
  setDrawer(params.get('drawer') !== 'hidden', false);
  setTheme(params.get('theme') === 'dark' ? 'dark' : 'light', false);
  drawerControl.addEventListener('click', () => setDrawer(shell.classList.contains('is-drawer-hidden')));
  themeControl.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  parent.addEventListener('click', () => {
    parent.setAttribute('aria-expanded', String(parent.getAttribute('aria-expanded') !== 'true'));
    filterNavigation();
  });
  search.addEventListener('input', filterNavigation);
  document.querySelector('.navigation').addEventListener('click', (event) => {
    const next = event.target.closest('.child, .leaf');
    if (!next) return;
    document.querySelectorAll('.is-current').forEach((item) => { item.classList.remove('is-current'); item.removeAttribute('aria-current'); });
    next.classList.add('is-current');
    next.setAttribute('aria-current', 'page');
  });
})();
