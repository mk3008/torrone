(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#nav-search');
  const navList = document.querySelector('#nav-list');
  const noResults = document.querySelector('#no-results');
  const items = ['項目 02', ...Array.from({ length: 28 }, (_, index) => `項目 ${String(index + 3).padStart(2, '0')}`)];
  let expanded = true;
  let current = '項目 01-01';
  const parameters = new URLSearchParams(window.location.search);
  const requestedTheme = parameters.get('theme');
  const requestedDrawer = parameters.get('drawer');
  if (requestedTheme === 'dark' || requestedTheme === 'light') shell.dataset.theme = requestedTheme;
  if (requestedDrawer === 'hidden' || requestedDrawer === 'open') shell.dataset.drawer = requestedDrawer;

  function updateHeaderControls() {
    const isOpen = shell.dataset.drawer === 'open';
    drawerIcon.src = `icons/panel-left-${isOpen ? 'close' : 'open'}.svg`;
    drawerToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = isOpen ? 'Close navigation' : 'Open navigation';
    const dark = shell.dataset.theme === 'dark';
    themeIcon.src = `icons/${dark ? 'sun' : 'moon'}.svg`;
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
  }
  function matches(label, query) { return label.toLocaleLowerCase('ja').includes(query.toLocaleLowerCase('ja')); }
  function row(label, className, selected, click, disclosure) {
    const button = document.createElement('button'); button.type = 'button'; button.className = `nav-row ${className}${selected ? ' current' : ''}`;
    button.textContent = label; button.setAttribute('aria-current', selected ? 'page' : 'false'); button.addEventListener('click', click);
    if (disclosure) { const icon = document.createElement('img'); icon.src = `icons/chevron-${expanded ? 'down' : 'right'}.svg`; icon.alt = ''; const trailing = document.createElement('span'); trailing.className = 'nav-disclosure'; trailing.append(icon); button.append(trailing); button.setAttribute('aria-expanded', String(expanded)); }
    return button;
  }
  function setCurrent(label) { current = label; renderNavigation(); }
  function renderNavigation() {
    const query = search.value.trim(); navList.replaceChildren();
    const groupMatches = matches('グループ 01', query) || matches('項目 01-01', query) || matches('項目 01-02', query);
    const visibleLeaves = items.filter((label) => matches(label, query));
    if (groupMatches) {
      navList.append(row('グループ 01', 'parent', false, () => { expanded = !expanded; renderNavigation(); }, true));
      if (expanded || query) ['項目 01-01', '項目 01-02'].filter((label) => !query || matches(label, query) || matches('グループ 01', query)).forEach((label) => navList.append(row(label, 'child', current === label, () => setCurrent(label))));
    }
    visibleLeaves.forEach((label) => navList.append(row(label, 'leaf', current === label, () => setCurrent(label))));
    noResults.hidden = navList.children.length !== 0;
  }
  drawerToggle.addEventListener('click', () => { shell.dataset.drawer = shell.dataset.drawer === 'open' ? 'hidden' : 'open'; updateHeaderControls(); });
  themeToggle.addEventListener('click', () => { shell.dataset.theme = shell.dataset.theme === 'light' ? 'dark' : 'light'; updateHeaderControls(); });
  search.addEventListener('input', renderNavigation);
  for (let value = 1; value <= 80; value += 1) { const item = document.createElement('li'); item.textContent = String(value); document.querySelector('#dummy-list').append(item); }
  updateHeaderControls(); renderNavigation();
})();
