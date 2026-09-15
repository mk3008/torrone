(() => {
  const params = new URLSearchParams(window.location.search);
  const shell = document.querySelector('#shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#nav-search');
  const nav = document.querySelector('#navigation-list');
  const items = Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`);
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let drawerVisible = params.get('drawer') !== 'hidden';
  let expanded = true;
  let current = '項目 01-01';

  const syncQuery = () => {
    const next = new URLSearchParams(window.location.search);
    next.set('theme', theme); next.set('drawer', drawerVisible ? 'open' : 'hidden');
    history.replaceState(null, '', `${location.pathname}?${next}`);
  };
  const applyShellState = () => {
    shell.classList.toggle('theme-light', theme === 'light');
    shell.classList.toggle('theme-dark', theme === 'dark');
    shell.classList.toggle('drawer-hidden', !drawerVisible);
    drawerToggle.setAttribute('aria-label', drawerVisible ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    drawerIcon.src = `assets/panel-left-${drawerVisible ? 'close' : 'open'}.svg`;
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark mode' : 'Switch to Light mode');
    themeToggle.title = themeToggle.getAttribute('aria-label');
    themeIcon.src = `assets/${theme === 'light' ? 'moon' : 'sun'}.svg`;
  };
  const row = (label, level = 'leaf') => {
    const button = document.createElement('button');
    button.className = `nav-row ${level}${current === label ? ' current' : ''}`;
    button.type = 'button'; button.textContent = label;
    if (current === label) button.setAttribute('aria-current', 'page');
    button.addEventListener('click', () => { current = label; renderNav(); });
    return button;
  };
  const renderNav = () => {
    const query = search.value.trim().toLocaleLowerCase('ja');
    const parent = 'グループ 01';
    const children = ['項目 01-01', '項目 01-02'];
    const parentMatches = parent.toLocaleLowerCase('ja').includes(query);
    const childMatches = children.filter(x => x.toLocaleLowerCase('ja').includes(query));
    const leafMatches = items.filter(x => x.toLocaleLowerCase('ja').includes(query));
    nav.replaceChildren();
    const groupVisible = !query || parentMatches || childMatches.length;
    if (groupVisible) {
      const group = row(parent, 'parent');
      const disclosure = document.createElement('button');
      disclosure.className = 'disclosure'; disclosure.type = 'button';
      disclosure.setAttribute('aria-label', expanded ? 'グループ 01 を閉じる' : 'グループ 01 を開く');
      disclosure.innerHTML = `<img src="assets/${expanded ? 'chevron-down' : 'chevron-right'}.svg" alt="">`;
      disclosure.addEventListener('click', event => { event.stopPropagation(); expanded = !expanded; renderNav(); });
      group.append(disclosure); nav.append(group);
      if (expanded || query) (parentMatches ? children : childMatches).forEach(child => nav.append(row(child, 'child')));
    }
    leafMatches.forEach(leaf => nav.append(row(leaf)));
    if (!nav.childElementCount) { const empty = document.createElement('p'); empty.className = 'no-matches'; empty.textContent = '一致する項目はありません。'; nav.append(empty); }
  };
  document.querySelector('#number-list').append(...Array.from({ length: 80 }, (_, i) => { const li = document.createElement('li'); li.textContent = i + 1; return li; }));
  drawerToggle.addEventListener('click', () => { drawerVisible = !drawerVisible; applyShellState(); syncQuery(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; applyShellState(); syncQuery(); });
  search.addEventListener('input', renderNav);
  applyShellState(); renderNav();
})();
