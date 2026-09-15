(() => {
  const root = document.documentElement;
  const shell = document.getElementById('shell');
  const drawerButton = document.getElementById('drawer-toggle');
  const drawerIcon = document.getElementById('drawer-icon');
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const group = document.getElementById('group-01');
  const parent = group.querySelector('.parent-row');
  const children = document.getElementById('group-01-children');
  const leaves = document.getElementById('leaf-list');
  const search = document.getElementById('nav-search');
  const noMatches = document.getElementById('no-matches');
  const query = new URLSearchParams(location.search);

  for (let i = 2; i <= 30; i += 1) {
    const item = document.createElement('button');
    item.type = 'button'; item.className = 'nav-row'; item.dataset.item = `項目 ${String(i).padStart(2, '0')}`;
    item.textContent = item.dataset.item; leaves.append(item);
  }
  for (let i = 1; i <= 80; i += 1) {
    const item = document.createElement('li'); item.textContent = String(i); document.getElementById('number-list').append(item);
  }
  function setDrawer(isOpen) {
    shell.classList.toggle('drawer-hidden', !isOpen);
    drawerButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    drawerButton.title = drawerButton.getAttribute('aria-label');
    drawerIcon.src = isOpen ? 'icons/panel-left-close.svg' : 'icons/panel-left-open.svg';
  }
  function setTheme(theme) {
    root.dataset.theme = theme;
    const next = theme === 'light' ? 'dark' : 'light';
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
    themeButton.title = themeButton.getAttribute('aria-label');
    themeIcon.src = theme === 'light' ? 'icons/moon.svg' : 'icons/sun.svg';
  }
  function setCurrent(target) {
    document.querySelectorAll('[data-item]').forEach((item) => { item.classList.toggle('is-current', item === target); item.toggleAttribute('aria-current', item === target); });
  }
  function filterNavigation() {
    const term = search.value.trim().toLocaleLowerCase('ja');
    const childRows = [...children.querySelectorAll('[data-item]')];
    const leafRows = [...leaves.querySelectorAll('[data-item]')];
    const parentMatches = parent.textContent.toLocaleLowerCase('ja').includes(term);
    const childMatches = childRows.filter((item) => item.textContent.toLocaleLowerCase('ja').includes(term));
    const leafMatches = leafRows.filter((item) => item.textContent.toLocaleLowerCase('ja').includes(term));
    const filtering = term.length > 0;
    childRows.forEach((item) => { item.hidden = filtering && !parentMatches && !childMatches.includes(item); });
    leafRows.forEach((item) => { item.hidden = filtering && !leafMatches.includes(item); });
    group.hidden = filtering && !parentMatches && childMatches.length === 0;
    if (filtering && !group.hidden) { group.classList.remove('is-collapsed'); parent.setAttribute('aria-expanded', 'true'); }
    noMatches.hidden = !(filtering && group.hidden && leafMatches.length === 0);
  }
  setDrawer(query.get('drawer') !== 'hidden');
  setTheme(query.get('theme') === 'dark' ? 'dark' : 'light');
  drawerButton.addEventListener('click', () => setDrawer(shell.classList.contains('drawer-hidden')));
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
  parent.addEventListener('click', () => { const open = parent.getAttribute('aria-expanded') !== 'true'; parent.setAttribute('aria-expanded', String(open)); group.classList.toggle('is-collapsed', !open); parent.querySelector('img').src = open ? 'icons/chevron-down.svg' : 'icons/chevron-right.svg'; });
  document.querySelector('.navigation').addEventListener('click', (event) => { const item = event.target.closest('[data-item]'); if (item) setCurrent(item); });
  search.addEventListener('input', filterNavigation);
})();
