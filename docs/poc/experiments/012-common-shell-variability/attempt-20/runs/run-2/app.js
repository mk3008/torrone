(() => {
  'use strict';
  const shell = document.querySelector('#shell');
  const drawerToggle = document.querySelector('#drawerToggle');
  const themeToggle = document.querySelector('#themeToggle');
  const search = document.querySelector('#navSearch');
  const clear = document.querySelector('#clearSearch');
  const list = document.querySelector('#navList');
  const numbers = document.querySelector('#numbers');
  const params = new URLSearchParams(window.location.search);
  const state = { drawer: params.get('drawer') === 'hidden' ? 'hidden' : 'open', theme: params.get('theme') === 'dark' ? 'dark' : 'light', expanded: true, current: 'item-01-01', query: '' };
  const glyph = (paths) => `<svg aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`;
  const panelIcon = (open) => glyph(`<rect x="3" y="4" width="18" height="16" rx="1"></rect><path d="M9 4v16"></path><path d="${open ? '14 9l3 3-3 3' : '17 9l-3 3 3 3'}"></path>`);
  const themeIcon = (theme) => theme === 'light'
    ? glyph('<path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z"></path>')
    : glyph('<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>');
  const chevron = (down) => glyph(`<path d="m${down ? '7 9 5 5 5-5' : '9 7 5 5-5 5'}"></path>`);
  const data = [{ id: 'item-01-01', label: '項目 01-01', parent: true }, { id: 'item-01-02', label: '項目 01-02', parent: true }, ...Array.from({ length: 29 }, (_, i) => ({ id: `item-${String(i + 2).padStart(2, '0')}`, label: `項目 ${String(i + 2).padStart(2, '0')}` }))];
  function syncUrl() { const next = new URLSearchParams(window.location.search); next.set('drawer', state.drawer); next.set('theme', state.theme); history.replaceState(null, '', `${location.pathname}?${next}`); }
  function renderHeader() {
    const isOpen = state.drawer === 'open';
    drawerToggle.innerHTML = panelIcon(!isOpen);
    drawerToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation'); drawerToggle.title = isOpen ? 'Close navigation' : 'Open navigation';
    themeToggle.innerHTML = themeIcon(state.theme); const next = state.theme === 'light' ? 'dark' : 'light'; themeToggle.setAttribute('aria-label', `Switch to ${next} mode`); themeToggle.title = `Switch to ${next} mode`;
  }
  function makeRow(item, child = false) { const row = document.createElement('button'); row.type = 'button'; row.className = `nav-row${child ? ' child' : ''}${state.current === item.id ? ' current' : ''}`; row.textContent = item.label; if (state.current === item.id) row.setAttribute('aria-current', 'page'); row.addEventListener('click', () => { state.current = item.id; renderNav(); }); return row; }
  function renderNav() {
    const query = state.query.trim().toLocaleLowerCase('ja'); list.replaceChildren();
    const matches = (item) => !query || item.label.toLocaleLowerCase('ja').includes(query);
    const childMatches = data.filter((item) => item.parent && matches(item));
    const leafMatches = data.filter((item) => !item.parent && matches(item));
    const showGroup = !query || childMatches.length > 0 || 'グループ 01'.includes(query);
    if (!showGroup && !leafMatches.length) { const empty = document.createElement('p'); empty.className = 'no-matches'; empty.textContent = '一致する項目はありません'; list.append(empty); return; }
    if (showGroup) { const parent = document.createElement('div'); parent.className = `nav-row${state.current === 'group-01' ? ' current' : ''}`; const activate = document.createElement('button'); activate.type = 'button'; activate.className = 'parent-activate'; activate.textContent = 'グループ 01'; if (state.current === 'group-01') activate.setAttribute('aria-current', 'page'); activate.addEventListener('click', () => { state.current = 'group-01'; renderNav(); }); const disclosure = document.createElement('button'); disclosure.type = 'button'; disclosure.className = 'disclosure'; disclosure.setAttribute('aria-label', state.expanded ? 'グループ 01 を折りたたむ' : 'グループ 01 を展開する'); disclosure.setAttribute('aria-expanded', String(state.expanded)); disclosure.innerHTML = chevron(state.expanded); disclosure.addEventListener('click', () => { state.expanded = !state.expanded; renderNav(); }); parent.append(activate, disclosure); list.append(parent); if (state.expanded) childMatches.forEach((item) => list.append(makeRow(item, true))); }
    leafMatches.forEach((item) => list.append(makeRow(item)));
  }
  function render() { shell.dataset.theme = state.theme; shell.classList.toggle('drawer-hidden', state.drawer === 'hidden'); renderHeader(); renderNav(); syncUrl(); }
  drawerToggle.addEventListener('click', () => { state.drawer = state.drawer === 'open' ? 'hidden' : 'open'; render(); });
  themeToggle.addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; render(); });
  search.addEventListener('input', () => { state.query = search.value; document.querySelector('.search-field').classList.toggle('search-has-value', Boolean(state.query)); renderNav(); });
  clear.addEventListener('click', () => { search.value = ''; state.query = ''; document.querySelector('.search-field').classList.remove('search-has-value'); renderNav(); search.focus(); });
  Array.from({ length: 80 }, (_, index) => index + 1).forEach((value) => { const item = document.createElement('li'); item.textContent = String(value); numbers.append(item); });
  render();
})();
