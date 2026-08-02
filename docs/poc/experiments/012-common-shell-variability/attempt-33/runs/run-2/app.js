(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#navigation-search');
  const navigation = document.querySelector('#navigation-list');
  const dummyList = document.querySelector('#dummy-list');
  let expanded = true;
  let current = '項目 01-01';
  const items = ['項目 01-01', '項目 01-02', ...Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`)];

  const query = new URLSearchParams(window.location.search);
  const initialTheme = query.get('theme') === 'dark' ? 'dark' : 'light';
  const initialDrawer = query.get('drawer') === 'hidden' ? 'hidden' : 'open';
  setTheme(initialTheme);
  setDrawer(initialDrawer);
  for (let number = 1; number <= 80; number += 1) { const li = document.createElement('li'); li.textContent = String(number); dummyList.append(li); }

  function setTheme(theme) {
    const light = theme === 'light';
    shell.dataset.theme = light ? 'light' : 'dark';
    themeIcon.src = light ? 'icons/moon.svg' : 'icons/sun.svg';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.title = themeToggle.getAttribute('aria-label');
  }
  function setDrawer(state) {
    const open = state === 'open';
    shell.dataset.drawer = open ? 'open' : 'hidden';
    drawerIcon.src = open ? 'icons/panel-left-close.svg' : 'icons/panel-left-open.svg';
    drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
  }
  function row(label, className = '') {
    const button = document.createElement('button');
    button.type = 'button'; button.className = `nav-row ${className}`; button.textContent = label;
    button.setAttribute('aria-current', label === current ? 'page' : 'false');
    if (label === current) button.classList.add('current');
    button.addEventListener('click', () => { current = label; renderNavigation(); });
    return button;
  }
  function renderNavigation() {
    const term = search.value.trim().toLowerCase();
    navigation.replaceChildren();
    const matchingChildren = items.slice(0, 2).filter((item) => item.toLowerCase().includes(term));
    const matchingLeaves = items.slice(2).filter((item) => item.toLowerCase().includes(term));
    const includeParent = !term || 'グループ 01'.includes(term) || matchingChildren.length > 0;
    if (includeParent) {
      const parent = document.createElement('button');
      parent.type = 'button'; parent.className = 'nav-row parent'; parent.setAttribute('aria-expanded', String(expanded));
      const name = document.createElement('span'); name.textContent = 'グループ 01';
      const chevron = document.createElement('img'); chevron.className = 'parent-chevron'; chevron.src = expanded ? 'icons/chevron-down.svg' : 'icons/chevron-right.svg'; chevron.alt = '';
      parent.append(name, chevron); parent.addEventListener('click', () => { expanded = !expanded; renderNavigation(); }); navigation.append(parent);
      if (expanded) matchingChildren.forEach((item) => navigation.append(row(item, 'child')));
    }
    matchingLeaves.forEach((item) => navigation.append(row(item)));
    if (!navigation.children.length) { const empty = document.createElement('p'); empty.className = 'no-matches'; empty.textContent = '一致する項目はありません'; navigation.append(empty); }
  }
  drawerToggle.addEventListener('click', () => setDrawer(shell.dataset.drawer === 'open' ? 'hidden' : 'open'));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', renderNavigation);
  renderNavigation();
})();
