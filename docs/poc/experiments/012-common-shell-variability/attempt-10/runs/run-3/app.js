(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const query = document.querySelector('#menu-query');
  const searchField = document.querySelector('.search-field');
  const navigation = document.querySelector('.navigation');
  const params = new URLSearchParams(location.search);
  const leaves = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);
  let expanded = true;

  const icon = (kind) => kind === 'down'
    ? '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>'
    : '<svg class="chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>';

  function updateUrl() { const url = new URL(location.href); url.searchParams.set('drawer', shell.dataset.drawer); url.searchParams.set('theme', shell.dataset.theme); history.replaceState({}, '', url); }
  function updateHeader() {
    const drawerName = shell.dataset.drawer === 'open' ? 'Close navigation' : 'Open navigation';
    drawerToggle.setAttribute('aria-label', drawerName); drawerToggle.title = drawerName;
    const themeName = shell.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.setAttribute('aria-label', themeName); themeToggle.title = themeName;
  }
  function makeRow(label, classes = '') { const row = document.createElement('button'); row.type = 'button'; row.className = `nav-row ${classes}`.trim(); row.textContent = label; return row; }
  function renderClear() {
    searchField.querySelector('.clear')?.remove();
    if (!query.value) return;
    const clear = document.createElement('button'); clear.type = 'button'; clear.className = 'clear'; clear.setAttribute('aria-label', '検索をクリア'); clear.title = '検索をクリア'; clear.textContent = '×';
    clear.addEventListener('click', () => { query.value = ''; renderClear(); renderNavigation(); query.focus(); });
    searchField.append(clear);
  }
  function renderNavigation() {
    const term = query.value.trim(); const children = ['項目 01-01', '項目 01-02'].filter((item) => item.includes(term)); const matches = leaves.filter((item) => item.includes(term));
    navigation.replaceChildren();
    if (!children.length && !matches.length && !'グループ 01'.includes(term)) { const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = '一致する項目はありません'; navigation.append(empty); return; }
    const showParent = children.length || 'グループ 01'.includes(term);
    if (showParent) {
      const parent = makeRow('グループ 01', 'parent'); parent.setAttribute('aria-expanded', String(expanded)); parent.insertAdjacentHTML('beforeend', icon(expanded ? 'down' : 'right'));
      parent.addEventListener('click', () => { expanded = !expanded; renderNavigation(); }); navigation.append(parent);
      if (expanded) children.forEach((item) => navigation.append(makeRow(item, `child${item === '項目 01-01' ? ' current' : ''}`)));
    }
    matches.forEach((item) => navigation.append(makeRow(item)));
  }
  shell.dataset.drawer = params.get('drawer') === 'hidden' ? 'hidden' : 'open'; shell.dataset.theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  document.querySelector('.numbers').append(...Array.from({ length: 80 }, (_, index) => { const item = document.createElement('li'); item.textContent = String(index + 1); return item; }));
  updateHeader(); renderNavigation();
  drawerToggle.addEventListener('click', () => { shell.dataset.drawer = shell.dataset.drawer === 'open' ? 'hidden' : 'open'; updateHeader(); updateUrl(); });
  themeToggle.addEventListener('click', () => { shell.dataset.theme = shell.dataset.theme === 'light' ? 'dark' : 'light'; updateHeader(); updateUrl(); });
  query.addEventListener('input', () => { renderClear(); renderNavigation(); });
})();
