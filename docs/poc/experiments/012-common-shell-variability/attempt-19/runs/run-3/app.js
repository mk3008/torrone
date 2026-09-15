(() => {
  const shell = document.querySelector('.shell');
  const drawerButton = document.querySelector('#drawer-button');
  const themeButton = document.querySelector('#theme-button');
  const search = document.querySelector('#drawer-search');
  const searchBox = document.querySelector('.search-box');
  const clearButton = document.querySelector('#clear-search');
  const list = document.querySelector('#navigation-list');
  const numbers = document.querySelector('#numbers');
  const params = new URLSearchParams(location.search);
  const leaves = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);
  const state = { current: '項目 01-01', expanded: true };

  function syncUrl() {
    const next = new URLSearchParams(location.search);
    next.set('drawer', shell.classList.contains('drawer-hidden') ? 'hidden' : 'open');
    next.set('theme', shell.dataset.theme);
    history.replaceState(null, '', `${location.pathname}?${next.toString()}`);
  }

  function item(label, child = false) {
    const li = document.createElement('li');
    li.className = `nav-entry${child ? ' child' : ''}${state.current === label ? ' current' : ''}`;
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.type = 'button';
    button.textContent = label;
    if (state.current === label) button.setAttribute('aria-current', 'page');
    button.addEventListener('click', () => { state.current = label; render(); });
    li.append(button);
    return li;
  }

  function group() {
    const li = item('グループ 01');
    const disclosure = document.createElement('button');
    disclosure.className = 'disclosure';
    disclosure.type = 'button';
    disclosure.setAttribute('aria-label', state.expanded ? 'Collapse グループ 01' : 'Expand グループ 01');
    disclosure.setAttribute('aria-expanded', String(state.expanded));
    disclosure.innerHTML = state.expanded
      ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"></path></svg>';
    disclosure.addEventListener('click', () => { state.expanded = !state.expanded; render(); });
    li.append(disclosure);
    return li;
  }

  function render() {
    const term = search.value.trim().toLocaleLowerCase('ja');
    const childItems = ['項目 01-01', '項目 01-02'];
    const matches = (label) => label.toLocaleLowerCase('ja').includes(term);
    const matchingChildren = childItems.filter(matches);
    const matchingLeaves = leaves.filter(matches);
    const parentMatch = matches('グループ 01');
    list.replaceChildren();
    if (term && !parentMatch && !matchingChildren.length && !matchingLeaves.length) {
      const empty = document.createElement('li');
      empty.className = 'no-results';
      empty.textContent = '一致する項目はありません';
      list.append(empty);
      return;
    }
    if (!term || parentMatch || matchingChildren.length) list.append(group());
    const showChildren = term ? matchingChildren : (state.expanded ? childItems : []);
    showChildren.forEach((label) => list.append(item(label, true)));
    (term ? matchingLeaves : leaves).forEach((label) => list.append(item(label)));
  }

  function setDrawer(hidden) {
    shell.classList.toggle('drawer-hidden', hidden);
    drawerButton.setAttribute('aria-label', hidden ? 'Open navigation' : 'Close navigation');
    drawerButton.title = hidden ? 'Open navigation' : 'Close navigation';
    syncUrl();
  }

  function setTheme(theme) {
    shell.dataset.theme = theme;
    const light = theme === 'light';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeButton.title = light ? 'Switch to dark mode' : 'Switch to light mode';
    syncUrl();
  }

  Array.from({ length: 80 }, (_, index) => {
    const line = document.createElement('li');
    line.textContent = String(index + 1);
    numbers.append(line);
  });
  setDrawer(params.get('drawer') === 'hidden');
  setTheme(params.get('theme') === 'dark' ? 'dark' : 'light');
  render();
  drawerButton.addEventListener('click', () => setDrawer(!shell.classList.contains('drawer-hidden')));
  themeButton.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', () => { searchBox.classList.toggle('has-value', Boolean(search.value)); render(); });
  clearButton.addEventListener('click', () => { search.value = ''; searchBox.classList.remove('has-value'); render(); search.focus(); });
})();
