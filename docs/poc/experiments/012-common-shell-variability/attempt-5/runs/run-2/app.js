(() => {
  const shell = document.querySelector('#shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#menu-search');
  const clearSearch = document.querySelector('#clear-search');
  const navigation = document.querySelector('#navigation');
  const dummyList = document.querySelector('#dummy-list');
  const params = new URLSearchParams(window.location.search);
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';

  const menu = {
    group: 'グループ 01',
    children: ['項目 01-01', '項目 01-02'],
    items: Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`),
  };

  function updateUrl() {
    const next = new URL(window.location.href);
    next.searchParams.set('drawer', drawerOpen ? 'open' : 'hidden');
    next.searchParams.set('theme', theme);
    window.history.replaceState({}, '', next);
  }

  function renderShell() {
    shell.classList.toggle('drawer-is-hidden', !drawerOpen);
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Drawerを閉じる' : 'Drawerを開く');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    document.documentElement.dataset.theme = theme;
    const nextTheme = theme === 'light' ? 'ダークテーマに切り替える' : 'ライトテーマに切り替える';
    themeToggle.setAttribute('aria-label', nextTheme);
    themeToggle.title = nextTheme;
    themeIcon.textContent = theme === 'light' ? '◐' : '☀';
  }

  function itemButton(label, isCurrent = false) {
    const button = document.createElement('button');
    button.className = `menu-item${isCurrent ? ' current' : ''}`;
    button.type = 'button';
    button.textContent = label;
    if (isCurrent) button.setAttribute('aria-current', 'page');
    return button;
  }

  function renderMenu() {
    const query = search.value.trim().toLocaleLowerCase('ja');
    clearSearch.hidden = query.length === 0;
    navigation.replaceChildren();
    const matchingChildren = menu.children.filter((item) => item.toLocaleLowerCase('ja').includes(query));
    const matchingItems = menu.items.filter((item) => item.toLocaleLowerCase('ja').includes(query));
    const groupMatches = menu.group.toLocaleLowerCase('ja').includes(query);
    const showGroup = !query || groupMatches || matchingChildren.length > 0;

    if (showGroup) {
      const group = document.createElement('section');
      group.className = 'menu-group';
      const row = document.createElement('button');
      row.className = 'group-row';
      row.type = 'button';
      row.innerHTML = '<span>グループ 01</span><span class="disclosure" aria-hidden="true">⌄</span>';
      group.append(row);
      const children = document.createElement('div');
      children.className = 'menu-children';
      (query && groupMatches ? menu.children : matchingChildren).forEach((item) => children.append(itemButton(item, item === '項目 01-01')));
      group.append(children);
      navigation.append(group);
    }
    matchingItems.forEach((item) => navigation.append(itemButton(item)));
    if (!showGroup && matchingItems.length === 0) {
      const noMatch = document.createElement('p');
      noMatch.className = 'no-match';
      noMatch.textContent = '一致する項目はありません';
      navigation.append(noMatch);
    }
  }

  Array.from({ length: 80 }, (_, index) => index + 1).forEach((number) => {
    const item = document.createElement('li');
    item.textContent = String(number);
    dummyList.append(item);
  });

  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderShell(); updateUrl(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderShell(); updateUrl(); });
  search.addEventListener('input', renderMenu);
  clearSearch.addEventListener('click', () => { search.value = ''; renderMenu(); search.focus(); });
  renderShell();
  renderMenu();
})();
