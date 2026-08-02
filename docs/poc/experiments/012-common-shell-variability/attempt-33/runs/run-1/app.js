(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const navigationList = document.querySelector('#navigation-list');
  const navigationSearch = document.querySelector('#navigation-search');
  const dummyContent = document.querySelector('#dummy-content');

  const state = { drawer: 'open', theme: 'light', expanded: true, current: '項目 01-01', query: '' };
  const leaves = ['項目 01-01', '項目 01-02', ...Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`)];

  function readInitialState() {
    const params = new URLSearchParams(window.location.search);
    state.drawer = params.get('drawer') === 'hidden' ? 'hidden' : 'open';
    state.theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  }

  function setDrawerControl() {
    const hidden = state.drawer === 'hidden';
    drawerToggle.setAttribute('aria-label', hidden ? 'Open navigation' : 'Close navigation');
    drawerToggle.title = hidden ? 'Open navigation' : 'Close navigation';
    drawerIcon.src = hidden ? 'icons/panel-left-open.svg' : 'icons/panel-left-close.svg';
  }

  function setThemeControl() {
    const dark = state.theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'ライトテーマに切り替える' : 'ダークテーマに切り替える');
    themeToggle.title = dark ? 'ライトテーマに切り替える' : 'ダークテーマに切り替える';
    themeIcon.src = dark ? 'icons/sun.svg' : 'icons/moon.svg';
  }

  function matches(value) { return value.includes(state.query.trim()); }

  function navButton(label, className = 'leaf') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `nav-row ${className}${state.current === label ? ' current' : ''}`;
    button.textContent = label;
    button.setAttribute('aria-current', state.current === label ? 'page' : 'false');
    button.addEventListener('click', () => { state.current = label; renderNavigation(); });
    return button;
  }

  function renderNavigation() {
    const hasMatchingChild = ['項目 01-01', '項目 01-02'].some(matches);
    const isFiltering = Boolean(state.query.trim());
    navigationList.replaceChildren();
    const parentItem = document.createElement('li');
    parentItem.className = 'nav-item';
    parentItem.hidden = isFiltering && !hasMatchingChild;
    const parent = document.createElement('button');
    parent.type = 'button';
    parent.className = 'nav-row parent';
    parent.setAttribute('aria-expanded', String(state.expanded || isFiltering));
    parent.innerHTML = '<span>グループ 01</span><img class="nav-chevron" alt="" src="icons/' + (state.expanded || isFiltering ? 'chevron-down.svg' : 'chevron-right.svg') + '">';
    parent.addEventListener('click', () => { state.expanded = !state.expanded; renderNavigation(); });
    const children = document.createElement('ul');
    children.className = 'child-list group';
    children.hidden = !state.expanded && !isFiltering;
    ['項目 01-01', '項目 01-02'].forEach((label) => {
      const item = document.createElement('li');
      item.hidden = isFiltering && !matches(label);
      item.append(navButton(label));
      children.append(item);
    });
    parentItem.append(parent, children);
    navigationList.append(parentItem);
    leaves.slice(2).forEach((label) => {
      const item = document.createElement('li');
      item.className = 'nav-item';
      item.hidden = isFiltering && !matches(label);
      item.append(navButton(label));
      navigationList.append(item);
    });
  }

  function render() {
    shell.dataset.drawer = state.drawer;
    shell.dataset.theme = state.theme;
    setDrawerControl();
    setThemeControl();
    renderNavigation();
  }

  drawerToggle.addEventListener('click', () => { state.drawer = state.drawer === 'open' ? 'hidden' : 'open'; render(); });
  themeToggle.addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; render(); });
  navigationSearch.addEventListener('input', (event) => { state.query = event.target.value; renderNavigation(); });
  Array.from({ length: 80 }, (_, index) => index + 1).forEach((value) => { const item = document.createElement('li'); item.textContent = String(value); dummyContent.append(item); });
  readInitialState();
  render();
})();
