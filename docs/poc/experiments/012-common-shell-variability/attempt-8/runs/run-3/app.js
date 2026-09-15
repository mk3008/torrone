(() => {
  const shell = document.querySelector('.shell');
  const drawerControl = document.querySelector('.drawer-control');
  const themeControl = document.querySelector('.theme-control');
  const search = document.querySelector('#navigation-search');
  const searchControl = document.querySelector('.search-control');
  const list = document.querySelector('.navigation-list');
  const params = new URLSearchParams(location.search);
  const leafItems = Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`);

  function updateQuery() {
    const url = new URL(location.href);
    url.searchParams.set('drawer', shell.dataset.drawer);
    url.searchParams.set('theme', shell.dataset.theme);
    history.replaceState({}, '', url);
  }

  function updateControls() {
    const drawerAction = shell.dataset.drawer === 'open' ? 'Close navigation' : 'Open navigation';
    drawerControl.setAttribute('aria-label', drawerAction);
    drawerControl.title = drawerAction;
    const themeAction = shell.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    themeControl.setAttribute('aria-label', themeAction);
    themeControl.title = themeAction;
  }

  function row(label, extra = '') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `nav-row ${extra}`.trim();
    button.textContent = label;
    return button;
  }

  function renderClear() {
    searchControl.querySelector('.clear-control')?.remove();
    if (!search.value) return;
    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'clear-control';
    clear.setAttribute('aria-label', '検索をクリア');
    clear.title = '検索をクリア';
    clear.textContent = '×';
    clear.addEventListener('click', () => { search.value = ''; renderClear(); renderMenu(); search.focus(); });
    searchControl.append(clear);
  }

  function renderMenu() {
    const term = search.value.trim();
    const children = ['項目 01-01', '項目 01-02'].filter((item) => item.includes(term));
    const leaves = leafItems.filter((item) => item.includes(term));
    list.replaceChildren();
    if (!children.length && !leaves.length && !'グループ 01'.includes(term)) {
      const empty = document.createElement('p'); empty.className = 'no-match'; empty.textContent = '一致する項目はありません'; list.append(empty); return;
    }
    if (children.length || 'グループ 01'.includes(term)) {
      const parent = row('グループ 01', 'parent');
      const disclosure = document.createElement('span'); disclosure.className = 'disclosure'; disclosure.textContent = '⌄'; parent.append(disclosure); list.append(parent);
      children.forEach((item) => list.append(row(item, `child${item === '項目 01-01' ? ' current' : ''}`)));
    }
    leaves.forEach((item) => list.append(row(item)));
  }

  shell.dataset.drawer = params.get('drawer') === 'hidden' ? 'hidden' : 'open';
  shell.dataset.theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  document.querySelector('.sequence').append(...Array.from({ length:80 }, (_, i) => { const item = document.createElement('li'); item.textContent = String(i + 1); return item; }));
  updateControls(); renderMenu();
  drawerControl.addEventListener('click', () => { shell.dataset.drawer = shell.dataset.drawer === 'open' ? 'hidden' : 'open'; updateControls(); updateQuery(); });
  themeControl.addEventListener('click', () => { shell.dataset.theme = shell.dataset.theme === 'light' ? 'dark' : 'light'; updateControls(); updateQuery(); });
  search.addEventListener('input', () => { renderClear(); renderMenu(); });
})();
