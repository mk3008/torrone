(() => {
  const shell = document.querySelector('.shell');
  const bodyLayout = document.querySelector('.body-layout');
  const drawer = document.querySelector('.drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#navigation-search');
  const navList = document.querySelector('#nav-list');
  const noMatches = document.querySelector('#no-matches');
  const parent = { label: 'グループ 01', children: ['項目 01-01', '項目 01-02'] };
  const leaves = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);
  let current = '項目 01-01';
  let expanded = true;

  const params = new URLSearchParams(window.location.search);
  let drawerOpen = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';

  function iconPath(name) { return `icons/${name}.svg`; }
  function setDrawer(open) {
    drawerOpen = open;
    drawer.hidden = !open;
    bodyLayout.classList.toggle('drawer-hidden', !open);
    drawerToggle.setAttribute('aria-expanded', String(open));
    drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawerToggle.dataset.tooltip = open ? 'Close navigation' : 'Open navigation';
    drawerIcon.src = iconPath(open ? 'panel-left-close' : 'panel-left-open');
  }
  function setTheme(nextTheme) {
    theme = nextTheme;
    shell.dataset.theme = theme;
    const next = theme === 'light' ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
    themeToggle.dataset.tooltip = `Switch to ${next} theme`;
    themeIcon.src = iconPath(next === 'dark' ? 'moon' : 'sun');
  }
  function button(label, className, currentItem) {
    const item = document.createElement('li');
    const control = document.createElement('button');
    control.type = 'button'; control.className = `nav-row ${className}${currentItem ? ' current' : ''}`;
    control.textContent = label;
    if (currentItem) control.setAttribute('aria-current', 'page');
    control.addEventListener('click', () => { current = label; renderNavigation(); });
    item.append(control); return item;
  }
  function renderNavigation() {
    const term = search.value.trim().toLocaleLowerCase('ja');
    const parentMatches = parent.label.toLocaleLowerCase('ja').includes(term);
    const matchingChildren = parent.children.filter((name) => name.toLocaleLowerCase('ja').includes(term));
    const matchingLeaves = leaves.filter((name) => name.toLocaleLowerCase('ja').includes(term));
    const showParent = !term || parentMatches || matchingChildren.length;
    navList.replaceChildren();
    if (showParent) {
      const parentItem = document.createElement('li');
      const parentButton = document.createElement('button');
      parentButton.type = 'button'; parentButton.className = 'nav-row parent'; parentButton.setAttribute('aria-expanded', String(expanded || Boolean(term)));
      parentButton.textContent = parent.label;
      const chevron = document.createElement('img'); chevron.className = 'parent-chevron'; chevron.alt = ''; chevron.setAttribute('aria-hidden', 'true'); chevron.src = iconPath((expanded || term) ? 'chevron-down' : 'chevron-right');
      parentButton.append(chevron); parentButton.addEventListener('click', () => { if (!term) { expanded = !expanded; renderNavigation(); } });
      parentItem.append(parentButton); navList.append(parentItem);
      const children = document.createElement('ul'); children.className = 'child-region'; children.setAttribute('aria-label', 'グループ 01 の子項目'); children.hidden = !term && !expanded;
      matchingChildren.forEach((name) => children.append(button(name, 'child', current === name)));
      parentItem.append(children);
    }
    matchingLeaves.forEach((name) => navList.append(button(name, 'leaf', current === name)));
    noMatches.hidden = Boolean(showParent || matchingLeaves.length);
  }
  document.querySelector('#dummy-numbers').replaceChildren(...Array.from({ length: 80 }, (_, index) => { const li = document.createElement('li'); li.textContent = String(index + 1); return li; }));
  drawerToggle.addEventListener('click', () => setDrawer(!drawerOpen));
  themeToggle.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', renderNavigation);
  setDrawer(drawerOpen); setTheme(theme); renderNavigation();
})();
