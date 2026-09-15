(() => {
  const shell = document.querySelector('#shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const menuSearch = document.querySelector('#menu-search');
  const clearSearch = document.querySelector('#clear-search');
  const navList = document.querySelector('#nav-list');
  const scrollItems = document.querySelector('#scroll-items');

  const params = new URLSearchParams(window.location.search);
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';

  const items = [
    { label: 'グループ 01', group: true },
    { label: '項目 01-01', child: true, current: true },
    { label: '項目 01-02', child: true },
    ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))
  ];

  function updateQuery() {
    const next = new URL(window.location.href);
    next.searchParams.set('drawer', drawerOpen ? 'open' : 'hidden');
    next.searchParams.set('theme', theme);
    window.history.replaceState({}, '', next);
  }

  function setDrawerState() {
    shell.classList.toggle('drawer-hidden', !drawerOpen);
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerOpen ? 'Close navigation' : 'Open navigation';
    drawerToggle.setAttribute('aria-expanded', String(drawerOpen));
  }

  function setTheme() {
    shell.dataset.theme = theme;
    const nextMode = theme === 'light' ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', `Switch to ${nextMode} mode`);
    themeToggle.title = `Switch to ${nextMode} mode`;
  }

  function renderMenu(query = '') {
    const normalized = query.trim().toLocaleLowerCase('ja');
    const matchingChildren = items.filter((item) => item.child && item.label.toLocaleLowerCase('ja').includes(normalized));
    const matchingLeaves = items.filter((item) => !item.group && !item.child && item.label.toLocaleLowerCase('ja').includes(normalized));
    const shown = normalized ? [...(matchingChildren.length ? [items[0], ...matchingChildren] : []), ...matchingLeaves] : items;
    navList.replaceChildren();
    if (!shown.length) {
      const empty = document.createElement('p');
      empty.className = 'no-matches';
      empty.textContent = '一致する項目はありません';
      navList.append(empty);
      return;
    }
    shown.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `nav-row${item.child ? ' child' : ''}${item.current ? ' current' : ''}`;
      button.textContent = item.label;
      if (item.current) button.setAttribute('aria-current', 'page');
      if (item.group) {
        button.setAttribute('aria-expanded', 'true');
        button.insertAdjacentHTML('beforeend', '<svg class="disclosure" aria-hidden="true" viewBox="0 0 24 24"><path d="M 5 8 L 12 15 L 19 8"/></svg>');
      }
      navList.append(button);
    });
  }

  Array.from({ length: 80 }, (_, index) => index + 1).forEach((number) => {
    const item = document.createElement('li');
    item.textContent = String(number);
    scrollItems.append(item);
  });

  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; setDrawerState(); updateQuery(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; setTheme(); updateQuery(); });
  menuSearch.addEventListener('input', () => {
    const hasValue = menuSearch.value.length > 0;
    menuSearch.closest('.search-field').classList.toggle('has-value', hasValue);
    renderMenu(menuSearch.value);
  });
  clearSearch.addEventListener('click', () => { menuSearch.value = ''; menuSearch.dispatchEvent(new Event('input')); menuSearch.focus(); });

  setDrawerState();
  setTheme();
  renderMenu();
})();
