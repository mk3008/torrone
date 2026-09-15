(() => {
  const shell = document.querySelector('.app-shell');
  const drawer = document.querySelector('.drawer');
  const navList = document.querySelector('.nav-list');
  const noMatches = document.querySelector('.no-matches');
  const searchInput = document.querySelector('#navigation-search');
  const clearButton = document.querySelector('.clear-search');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const numbers = document.querySelector('.numbers');
  let expanded = true;
  let currentDestination = 'item-01-01';

  const items = [
    { id: 'group-01', label: 'グループ 01', parent: true },
    { id: 'item-01-01', label: '項目 01-01', child: true },
    { id: 'item-01-02', label: '項目 01-02', child: true },
    ...Array.from({ length: 29 }, (_, index) => {
      const number = String(index + 2).padStart(2, '0');
      return { id: `item-${number}`, label: `項目 ${number}` };
    })
  ];

  function queryState() {
    const params = new URLSearchParams(window.location.search);
    return {
      drawer: params.get('drawer') === 'hidden' ? 'hidden' : 'open',
      theme: params.get('theme') === 'dark' ? 'dark' : 'light'
    };
  }

  function updateUrl(partial) {
    const state = { ...queryState(), ...partial };
    const params = new URLSearchParams(window.location.search);
    params.set('drawer', state.drawer);
    params.set('theme', state.theme);
    history.replaceState(null, '', `${window.location.pathname}?${params.toString()}${window.location.hash}`);
  }

  function applyState() {
    const state = queryState();
    shell.dataset.drawer = state.drawer;
    shell.dataset.theme = state.theme;
    drawerToggle.setAttribute('aria-label', state.drawer === 'open' ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    themeToggle.setAttribute('aria-label', state.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.title = themeToggle.getAttribute('aria-label');
  }

  function renderNavigation() {
    const term = searchInput.value.trim().toLocaleLowerCase('ja');
    const matches = (item) => item.label.toLocaleLowerCase('ja').includes(term);
    const visibleChildren = items.filter((item) => item.child && matches(item));
    const visibleLeaves = items.filter((item) => !item.parent && !item.child && matches(item));
    const showGroup = !term || matches(items[0]) || visibleChildren.length > 0;
    const groupChildren = expanded || Boolean(term);
    const visible = [...(showGroup ? [items[0]] : []), ...(showGroup && groupChildren ? visibleChildren : []), ...visibleLeaves];
    navList.replaceChildren();
    visible.forEach((item) => {
      const li = document.createElement('li');
      const row = document.createElement('div');
      row.className = `nav-row${item.child ? ' child' : ''}${item.id === currentDestination ? ' current' : ''}`;
      const itemButton = document.createElement('button');
      itemButton.type = 'button';
      itemButton.className = 'nav-item';
      itemButton.textContent = item.label;
      if (item.id === currentDestination) itemButton.setAttribute('aria-current', 'page');
      itemButton.addEventListener('click', () => { currentDestination = item.id; renderNavigation(); });
      row.append(itemButton);
      if (item.parent) {
        itemButton.setAttribute('aria-expanded', String(expanded));
        const disclosure = document.createElement('button');
        disclosure.type = 'button';
        disclosure.className = 'disclosure';
        disclosure.setAttribute('aria-label', expanded ? 'グループ 01 を折りたたむ' : 'グループ 01 を展開する');
        disclosure.title = disclosure.getAttribute('aria-label');
        disclosure.innerHTML = expanded
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"></path></svg>';
        disclosure.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
        row.append(disclosure);
      }
      li.append(row);
      navList.append(li);
    });
    noMatches.hidden = visible.length !== 0;
    drawer.classList.toggle('has-query', Boolean(searchInput.value));
  }

  numbers.append(...Array.from({ length: 80 }, (_, index) => {
    const li = document.createElement('li'); li.textContent = String(index + 1); return li;
  }));
  drawerToggle.addEventListener('click', () => { updateUrl({ drawer: queryState().drawer === 'open' ? 'hidden' : 'open' }); applyState(); });
  themeToggle.addEventListener('click', () => { updateUrl({ theme: queryState().theme === 'light' ? 'dark' : 'light' }); applyState(); });
  searchInput.addEventListener('input', renderNavigation);
  clearButton.addEventListener('click', () => { searchInput.value = ''; renderNavigation(); searchInput.focus(); });
  window.addEventListener('popstate', applyState);
  applyState();
  renderNavigation();
})();
