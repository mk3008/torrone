(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const search = document.querySelector('#menu-search');
  const searchField = document.querySelector('.search-field');
  const clearSearch = document.querySelector('#clear-search');
  const navList = document.querySelector('#nav-list');
  const numbers = document.querySelector('#number-list');
  const query = new URLSearchParams(window.location.search);
  const items = [
    { label: 'グループ 01', group: true },
    { label: '項目 01-01', child: true, current: true },
    { label: '項目 01-02', child: true },
    ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))
  ];

  function updateUrl() {
    const params = new URLSearchParams(window.location.search);
    params.set('drawer', shell.classList.contains('drawer-hidden') ? 'hidden' : 'open');
    params.set('theme', shell.dataset.theme);
    history.replaceState(null, '', `${location.pathname}?${params}`);
  }

  function renderNavigation() {
    const term = search.value.trim().toLocaleLowerCase('ja');
    const visible = term ? items.filter((item) => item.label.toLocaleLowerCase('ja').includes(term)) : items;
    const hasChild = visible.some((item) => item.child);
    navList.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement('li');
      empty.className = 'no-matches';
      empty.textContent = '一致する項目はありません';
      navList.append(empty);
      return;
    }
    if (term && hasChild && !visible.some((item) => item.group)) visible.unshift(items[0]);
    visible.forEach((item) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `nav-row${item.child ? ' child' : ''}${item.current ? ' current' : ''}`;
      button.textContent = item.label;
      if (item.group) {
        button.setAttribute('aria-expanded', 'true');
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('class', 'disclosure');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = '<path d="m6 9 6 6 6-6"></path>';
        button.append(icon);
      }
      li.append(button);
      navList.append(li);
    });
  }

  function setDrawer(hidden) {
    shell.classList.toggle('drawer-hidden', hidden);
    drawerToggle.setAttribute('aria-label', hidden ? 'Open navigation' : 'Close navigation');
    drawerToggle.title = hidden ? 'Open navigation' : 'Close navigation';
    updateUrl();
  }

  function setTheme(theme) {
    shell.dataset.theme = theme;
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
    updateUrl();
  }

  Array.from({ length: 80 }, (_, index) => {
    const item = document.createElement('li');
    item.textContent = String(index + 1);
    numbers.append(item);
  });
  shell.classList.toggle('drawer-hidden', query.get('drawer') === 'hidden');
  setTheme(query.get('theme') === 'dark' ? 'dark' : 'light');
  renderNavigation();
  drawerToggle.addEventListener('click', () => setDrawer(!shell.classList.contains('drawer-hidden')));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', () => { searchField.classList.toggle('has-value', search.value.length > 0); renderNavigation(); });
  clearSearch.addEventListener('click', () => { search.value = ''; searchField.classList.remove('has-value'); renderNavigation(); search.focus(); });
})();
