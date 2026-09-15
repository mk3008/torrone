(() => {
  const params = new URLSearchParams(window.location.search);
  const state = {
    drawer: params.get('drawer') === 'hidden' ? 'hidden' : 'open',
    theme: params.get('theme') === 'dark' ? 'dark' : 'light',
    expanded: params.get('workspace') !== 'collapsed',
    current: params.get('current') || 'Overview'
  };

  const shell = document.querySelector('#shell');
  const html = document.documentElement;
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const drawerAction = document.querySelector('#drawer-action');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const themeAction = document.querySelector('#theme-action');
  const disclosure = document.querySelector('#workspace-disclosure');
  const disclosureIcon = document.querySelector('#disclosure-icon');
  const disclosureAction = document.querySelector('#disclosure-action');
  const children = document.querySelector('#workspace-items');
  const sectionList = document.querySelector('#section-list');
  const search = document.querySelector('#nav-search');
  const noMatches = document.querySelector('#empty-message');

  const iconAssets = {
    drawerVisible: 'reference-visual-bindings/icons/drawer-hide.svg',
    drawerHidden: 'reference-visual-bindings/icons/drawer-show.svg',
    themeLight: 'reference-visual-bindings/icons/theme-to-dark.svg',
    themeDark: 'reference-visual-bindings/icons/theme-to-light.svg',
    disclosureExpanded: 'reference-visual-bindings/icons/disclosure-expanded.svg',
    disclosureCollapsed: 'reference-visual-bindings/icons/disclosure-collapsed.svg',
    search: 'reference-visual-bindings/icons/search.svg'
  };

  function applyFixedIcon(element, asset) {
    element.style.setProperty('--fixed-icon', `url("${iconAssets[asset]}")`);
  }

  for (let index = 1; index <= 29; index += 1) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'navigation-row';
    item.dataset.destination = `Section ${String(index).padStart(2, '0')}`;
    item.textContent = item.dataset.destination;
    sectionList.append(item);
  }

  const fixtureList = document.querySelector('#fixture-list');
  for (let index = 1; index <= 80; index += 1) {
    const item = document.createElement('li');
    item.textContent = `Fixture item ${index}`;
    fixtureList.append(item);
  }

  function syncUrl() {
    const next = new URLSearchParams();
    next.set('drawer', state.drawer);
    next.set('theme', state.theme);
    next.set('workspace', state.expanded ? 'expanded' : 'collapsed');
    next.set('current', state.current);
    history.replaceState(null, '', `${window.location.pathname}?${next.toString()}`);
  }

  function draw() {
    html.dataset.referenceVisualTheme = state.theme;
    shell.dataset.drawer = state.drawer;
    drawerToggle.setAttribute('aria-label', state.drawer === 'open' ? 'Hide navigation' : 'Show navigation');
    drawerAction.textContent = state.drawer === 'open' ? 'Hide navigation' : 'Show navigation';
    applyFixedIcon(drawerIcon, state.drawer === 'open' ? 'drawerVisible' : 'drawerHidden');
    themeToggle.setAttribute('aria-label', state.theme === 'light' ? 'Switch to dark palette' : 'Switch to light palette');
    themeAction.textContent = state.theme === 'light' ? 'Switch to dark palette' : 'Switch to light palette';
    applyFixedIcon(themeIcon, state.theme === 'light' ? 'themeLight' : 'themeDark');
    disclosure.setAttribute('aria-expanded', String(state.expanded));
    disclosureAction.textContent = state.expanded ? 'Collapse Workspace' : 'Expand Workspace';
    applyFixedIcon(disclosureIcon, state.expanded ? 'disclosureExpanded' : 'disclosureCollapsed');
    children.hidden = !state.expanded;

    document.querySelectorAll('.navigation-row').forEach((row) => {
      const selected = row.dataset.destination === state.current;
      row.classList.toggle('current', selected);
      if (selected) row.setAttribute('aria-current', 'page');
      else row.removeAttribute('aria-current');
    });
  }

  function filterNavigation() {
    const query = search.value.trim().toLocaleLowerCase();
    let matched = 0;
    document.querySelectorAll('.navigation-row').forEach((row) => {
      const visible = row.dataset.destination.toLocaleLowerCase().includes(query);
      row.hidden = !visible;
      if (visible) matched += 1;
    });
    noMatches.hidden = matched !== 0;
  }

  drawerToggle.addEventListener('click', () => {
    state.drawer = state.drawer === 'open' ? 'hidden' : 'open';
    draw();
    syncUrl();
  });

  themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    draw();
    syncUrl();
  });

  disclosure.addEventListener('click', () => {
    state.expanded = !state.expanded;
    draw();
    syncUrl();
  });

  search.addEventListener('input', filterNavigation);

  document.querySelector('nav').addEventListener('click', (event) => {
    const row = event.target.closest('.navigation-row');
    if (!row || row.hidden) return;
    state.current = row.dataset.destination;
    draw();
    syncUrl();
  });

  draw();
  filterNavigation();
})();
