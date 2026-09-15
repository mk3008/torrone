(() => {
  const params = new URLSearchParams(window.location.search);
  const shell = document.querySelector('.shell');
  const shellBody = document.querySelector('.shell-body');
  const drawer = document.querySelector('.drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const drawerLabel = document.querySelector('#drawer-toggle-label');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const themeLabel = document.querySelector('#theme-toggle-label');
  const search = document.querySelector('#nav-search');
  const navItems = document.querySelector('#navigation-items');
  const noMatches = document.querySelector('#no-matches');
  const numberList = document.querySelector('#number-list');
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let current = '項目 01-01';
  let groupExpanded = true;
  const leaves = Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`);

  function syncUrl() {
    const next = new URL(window.location.href);
    next.searchParams.set('drawer', drawerOpen ? 'open' : 'hidden');
    next.searchParams.set('theme', theme);
    window.history.replaceState({}, '', next);
  }
  function renderShell() {
    drawer.hidden = !drawerOpen;
    shellBody.classList.toggle('drawer-hidden', !drawerOpen);
    drawerToggle.setAttribute('aria-expanded', String(drawerOpen));
    const drawerAction = drawerOpen ? 'Close navigation' : 'Open navigation';
    drawerToggle.title = drawerAction; drawerLabel.textContent = drawerAction;
    drawerIcon.src = `icons/panel-left-${drawerOpen ? 'close' : 'open'}.svg`;
    shell.dataset.theme = theme;
    const themeAction = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.title = themeAction; themeLabel.textContent = themeAction;
    themeIcon.src = `icons/${theme === 'light' ? 'moon' : 'sun'}.svg`;
  }
  function item(label, child = false) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = `nav-item${child ? ' child' : ''}${current === label ? ' current' : ''}`;
    button.textContent = label; button.setAttribute('aria-current', current === label ? 'page' : 'false');
    button.addEventListener('click', () => { current = label; renderNavigation(); });
    return button;
  }
  function renderNavigation() {
    const query = search.value.trim().toLocaleLowerCase('ja');
    navItems.replaceChildren();
    const groupMatches = 'グループ 01'.toLocaleLowerCase('ja').includes(query);
    const children = ['項目 01-01', '項目 01-02'];
    const matchingChildren = children.filter((label) => label.toLocaleLowerCase('ja').includes(query));
    const matchingLeaves = leaves.filter((label) => label.toLocaleLowerCase('ja').includes(query));
    const showGroup = !query || groupMatches || matchingChildren.length;
    if (showGroup) {
      const parent = document.createElement('button');
      parent.type = 'button'; parent.className = 'nav-item'; parent.textContent = 'グループ 01';
      parent.setAttribute('aria-expanded', String(groupExpanded || Boolean(query)));
      const icon = document.createElement('img'); icon.src = `icons/chevron-${groupExpanded || query ? 'down' : 'right'}.svg`; icon.alt = '';
      const disclosure = document.createElement('span'); disclosure.className = 'disclosure'; disclosure.append(icon); parent.append(disclosure);
      parent.addEventListener('click', () => { groupExpanded = !groupExpanded; renderNavigation(); });
      navItems.append(parent);
      const childGroup = document.createElement('div'); childGroup.className = 'group-children'; childGroup.hidden = !groupExpanded && !query;
      matchingChildren.forEach((label) => childGroup.append(item(label, true)));
      navItems.append(childGroup);
    }
    matchingLeaves.forEach((label) => navItems.append(item(label)));
    noMatches.hidden = Boolean(showGroup || matchingLeaves.length);
  }
  for (let i = 1; i <= 80; i += 1) { const entry = document.createElement('li'); entry.textContent = i; numberList.append(entry); }
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderShell(); syncUrl(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderShell(); syncUrl(); });
  search.addEventListener('input', renderNavigation);
  renderShell(); renderNavigation();
})();
