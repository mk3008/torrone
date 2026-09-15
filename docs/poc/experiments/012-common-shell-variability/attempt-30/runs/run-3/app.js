(() => {
  const shell = document.querySelector('.shell');
  const drawer = document.querySelector('#drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#navigation-search');
  const nav = document.querySelector('#navigation-list');
  let expanded = true;
  let current = '項目 01-01';
  const items = ['項目 02', ...Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 3).padStart(2, '0')}`)];
  const params = new URLSearchParams(location.search);
  function setDrawer(visible) { shell.dataset.drawer = visible ? 'open' : 'hidden'; drawerToggle.setAttribute('aria-label', visible ? 'Close navigation' : 'Open navigation'); drawerToggle.title = visible ? 'Close navigation' : 'Open navigation'; drawerIcon.src = visible ? 'icons/panel-left-close.svg' : 'icons/panel-left-open.svg'; drawer.setAttribute('aria-hidden', String(!visible)); }
  function setTheme(theme) { shell.dataset.theme = theme; themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle.title = themeToggle.getAttribute('aria-label'); themeIcon.src = theme === 'light' ? 'icons/moon.svg' : 'icons/sun.svg'; }
  function makeRow(label, kind = 'leaf') { const row = document.createElement('button'); row.type = 'button'; row.className = `nav-row ${kind}`; row.textContent = label; row.dataset.label = label; row.setAttribute('aria-current', label === current ? 'page' : 'false'); if (label === current) row.classList.add('current'); row.addEventListener('click', () => { current = label; render(); }); return row; }
  function render() { const q = search.value.trim().toLocaleLowerCase('ja'); const matches = (label) => !q || label.toLocaleLowerCase('ja').includes(q); const parentMatch = matches('グループ 01') || matches('項目 01-01') || matches('項目 01-02'); nav.replaceChildren(); if (parentMatch) { const parent = makeRow('グループ 01', 'parent'); parent.setAttribute('aria-expanded', String(expanded || Boolean(q))); const chevron = document.createElement('img'); chevron.className = 'nav-chevron'; chevron.src = (expanded || q) ? 'icons/chevron-down.svg' : 'icons/chevron-right.svg'; chevron.alt = ''; parent.append(chevron); parent.addEventListener('click', () => { expanded = !expanded; render(); }); nav.append(parent); if (expanded || q) ['項目 01-01', '項目 01-02'].filter(matches).forEach(label => nav.append(makeRow(label, 'child'))); } items.filter(matches).forEach(label => nav.append(makeRow(label))); if (!nav.children.length) { const empty = document.createElement('p'); empty.className = 'no-matches'; empty.textContent = '一致する項目はありません'; nav.append(empty); } }
  drawerToggle.addEventListener('click', () => setDrawer(shell.dataset.drawer !== 'open'));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', render);
  Array.from({ length: 80 }, (_, i) => i + 1).forEach(n => { const li = document.createElement('li'); li.textContent = String(n); document.querySelector('#dummy-list').append(li); });
  setTheme(params.get('theme') === 'dark' ? 'dark' : 'light'); setDrawer(params.get('drawer') === 'hidden' ? false : true); render();
})();
