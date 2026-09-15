(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const queryInput = document.querySelector('#menu-query');
  const clearButton = document.querySelector('.clear-search');
  const menu = document.querySelector('.menu-list');
  const params = new URLSearchParams(window.location.search);
  const initialDrawer = params.get('drawer') === 'hidden' ? 'hidden' : 'open';
  const initialTheme = params.get('theme') === 'dark' ? 'dark' : 'light';
  const items = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);

  function updateUrl() {
    const next = new URL(window.location.href);
    next.searchParams.set('drawer', shell.dataset.drawer);
    next.searchParams.set('theme', shell.dataset.theme);
    window.history.replaceState({}, '', next);
  }

  function updateHeaderControls() {
    const drawerOpen = shell.dataset.drawer === 'open';
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    const nextTheme = shell.dataset.theme === 'light' ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    themeToggle.title = themeToggle.getAttribute('aria-label');
  }

  function makeRow(label, className = '') {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = `menu-row ${className}`.trim();
    row.textContent = label;
    return row;
  }

  function renderMenu() {
    const term = queryInput.value.trim();
    const matchingChildren = ['項目 01-01', '項目 01-02'].filter((item) => item.includes(term));
    const matchingItems = items.filter((item) => item.includes(term));
    menu.replaceChildren();
    if (!matchingChildren.length && !matchingItems.length && !'グループ 01'.includes(term)) {
      const empty = document.createElement('p');
      empty.className = 'no-matches';
      empty.textContent = '一致する項目はありません';
      menu.append(empty);
      return;
    }
    if (matchingChildren.length || 'グループ 01'.includes(term)) {
      const parent = makeRow('グループ 01', 'parent');
      const disclosure = document.createElement('span');
      disclosure.className = 'disclosure';
      disclosure.textContent = '⌄';
      parent.append(disclosure);
      menu.append(parent);
      matchingChildren.forEach((item) => {
        const current = item === '項目 01-01';
        const child = makeRow('', `child${current ? ' current' : ''}`);
        child.append(item);
        menu.append(child);
      });
    }
    matchingItems.forEach((item) => menu.append(makeRow(item)));
  }

  shell.dataset.drawer = initialDrawer;
  shell.dataset.theme = initialTheme;
  document.querySelector('.number-list').append(...Array.from({ length: 80 }, (_, index) => {
    const item = document.createElement('li');
    item.textContent = String(index + 1);
    return item;
  }));
  updateHeaderControls();
  renderMenu();

  drawerToggle.addEventListener('click', () => {
    shell.dataset.drawer = shell.dataset.drawer === 'open' ? 'hidden' : 'open';
    updateHeaderControls();
    updateUrl();
  });
  themeToggle.addEventListener('click', () => {
    shell.dataset.theme = shell.dataset.theme === 'light' ? 'dark' : 'light';
    updateHeaderControls();
    updateUrl();
  });
  queryInput.addEventListener('input', () => {
    document.querySelector('.search-field').classList.toggle('has-value', Boolean(queryInput.value));
    renderMenu();
  });
  clearButton.addEventListener('click', () => {
    queryInput.value = '';
    document.querySelector('.search-field').classList.remove('has-value');
    renderMenu();
    queryInput.focus();
  });
})();
