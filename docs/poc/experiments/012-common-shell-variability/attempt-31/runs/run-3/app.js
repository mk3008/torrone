(function () {
  const shell = document.querySelector('.app-shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#nav-search');
  const navigation = document.querySelector('#navigation');
  const noMatches = document.querySelector('#no-matches');
  const params = new URLSearchParams(window.location.search);
  let drawerVisible = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = '項目 01-01';
  const children = ['項目 01-01', '項目 01-02'];
  const leaves = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);

  function setDrawer(visible) {
    drawerVisible = visible;
    shell.dataset.drawer = visible ? 'open' : 'hidden';
    drawerToggle.setAttribute('aria-label', visible ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = visible ? 'Close navigation' : 'Open navigation';
    drawerIcon.src = visible ? 'icons/panel-left-close.svg' : 'icons/panel-left-open.svg';
  }

  function setTheme(next) {
    theme = next;
    shell.dataset.theme = next;
    const dark = next === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to Light' : 'Switch to Dark');
    themeToggle.title = dark ? 'Switch to Light' : 'Switch to Dark';
    themeIcon.src = dark ? 'icons/sun.svg' : 'icons/moon.svg';
  }

  function makeLeaf(label, child) {
    const item = document.createElement('a');
    item.className = `nav-row${child ? ' child' : ''}`;
    item.href = `#${encodeURIComponent(label)}`;
    item.textContent = label;
    if (label === current) item.setAttribute('aria-current', 'page');
    item.addEventListener('click', (event) => {
      event.preventDefault();
      current = label;
      renderNavigation();
    });
    return item;
  }

  function renderNavigation() {
    const term = search.value.trim().toLowerCase();
    const parentMatches = 'グループ 01'.includes(term);
    const matchingChildren = children.filter((label) => label.toLowerCase().includes(term));
    const matchingLeaves = leaves.filter((label) => label.toLowerCase().includes(term));
    const showGroup = !term || parentMatches || matchingChildren.length > 0;
    const showChildren = showGroup && (term ? parentMatches || matchingChildren.length > 0 : expanded);
    navigation.replaceChildren();
    if (showGroup) {
      const parent = document.createElement('button');
      parent.type = 'button';
      parent.className = 'nav-row parent';
      parent.setAttribute('aria-expanded', String(showChildren));
      parent.innerHTML = '<span>グループ 01</span><img class="chevron" alt="" aria-hidden="true">';
      parent.querySelector('img').src = showChildren ? 'icons/chevron-down.svg' : 'icons/chevron-right.svg';
      parent.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
      navigation.append(parent);
      if (showChildren) {
        const region = document.createElement('div');
        region.className = 'child-region';
        const childItems = term && !parentMatches ? matchingChildren : children;
        childItems.forEach((label) => region.append(makeLeaf(label, true)));
        navigation.append(region);
      }
    }
    matchingLeaves.forEach((label) => navigation.append(makeLeaf(label, false)));
    noMatches.hidden = Boolean(showGroup || matchingLeaves.length);
  }

  drawerToggle.addEventListener('click', () => setDrawer(!drawerVisible));
  themeToggle.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', renderNavigation);
  document.querySelector('#number-list').replaceChildren(...Array.from({ length: 80 }, (_, i) => {
    const item = document.createElement('li'); item.textContent = String(i + 1); return item;
  }));
  setDrawer(drawerVisible);
  setTheme(theme);
  renderNavigation();
}());
