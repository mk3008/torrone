(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const search = document.querySelector('#navigation-search');
  const navigation = document.querySelector('.navigation-list');
  const numbers = document.querySelector('.dummy-numbers');
  const items = [{ label: 'グループ 01', parent: true }, { label: '項目 01-01', child: true }, { label: '項目 01-02', child: true }, ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))];
  let expanded = true;
  let current = '項目 01-01';

  const setIcon = (target, className) => { target.querySelector('.icon').className = `icon ${className}`; };
  const updateDrawerControl = () => {
    const open = shell.dataset.drawer === 'open';
    drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = open ? 'Close navigation' : 'Open navigation';
    setIcon(drawerToggle, open ? 'icon-panel-close' : 'icon-panel-open');
  };
  const updateThemeControl = () => {
    const dark = shell.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    setIcon(themeToggle, dark ? 'icon-sun' : 'icon-moon');
  };
  const renderNavigation = () => {
    const query = search.value.trim().toLocaleLowerCase('ja');
    navigation.replaceChildren();
    const groupMatches = items.slice(1, 3).some(item => item.label.toLocaleLowerCase('ja').includes(query));
    const visibleItems = items.filter((item, index) => {
      if (!query) return item.parent || !item.child || expanded;
      return item.parent ? groupMatches || item.label.toLocaleLowerCase('ja').includes(query) : item.label.toLocaleLowerCase('ja').includes(query);
    });
    visibleItems.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `nav-row${item.parent ? ' parent' : ''}${item.child ? ' child' : ''}${item.label === current ? ' selected' : ''}`;
      button.textContent = item.label;
      if (item.label === current) button.setAttribute('aria-current', 'page');
      if (item.parent) {
        const isExpanded = query ? true : expanded;
        button.setAttribute('aria-expanded', String(isExpanded));
        const icon = document.createElement('span');
        icon.className = `icon ${isExpanded ? 'icon-chevron-down' : 'icon-chevron-right'}`;
        icon.setAttribute('aria-hidden', 'true');
        button.append(icon);
        button.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
      } else {
        button.addEventListener('click', () => { current = item.label; renderNavigation(); });
      }
      navigation.append(button);
    });
    if (!visibleItems.length) { const empty = document.createElement('p'); empty.className = 'no-matches'; empty.textContent = '一致する項目はありません'; navigation.append(empty); }
  };
  for (let value = 1; value <= 80; value += 1) { const item = document.createElement('li'); item.textContent = value; numbers.append(item); }
  drawerToggle.addEventListener('click', () => { shell.dataset.drawer = shell.dataset.drawer === 'open' ? 'hidden' : 'open'; updateDrawerControl(); });
  themeToggle.addEventListener('click', () => { shell.dataset.theme = shell.dataset.theme === 'light' ? 'dark' : 'light'; updateThemeControl(); });
  search.addEventListener('input', renderNavigation);
  const params = new URLSearchParams(window.location.search);
  if (params.get('theme') === 'dark') shell.dataset.theme = 'dark';
  if (params.get('drawer') === 'hidden') shell.dataset.drawer = 'hidden';
  updateDrawerControl(); updateThemeControl(); renderNavigation();
})();
