(() => {
  const shell = document.querySelector('#shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const groupToggle = document.querySelector('#group-toggle');
  const group = document.querySelector('#nav-group');
  const search = document.querySelector('#nav-search');
  const leaves = document.querySelector('#nav-leaves');
  const noMatches = document.querySelector('#no-matches');
  const sequence = document.querySelector('#sequence');
  const params = new URLSearchParams(window.location.search);
  let drawerVisible = params.get('drawer') !== 'hidden';
  let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  let currentItem = '項目 01-01';
  let expanded = true;

  for (let index = 2; index <= 30; index += 1) {
    const item = String(index).padStart(2, '0');
    leaves.insertAdjacentHTML('beforeend', `<button class="nav-row nav-leaf" type="button" data-item="項目 ${item}">項目 ${item}</button>`);
  }
  for (let index = 1; index <= 80; index += 1) {
    sequence.insertAdjacentHTML('beforeend', `<li>${index}</li>`);
  }

  function updateUrl() {
    const next = new URL(window.location.href);
    next.searchParams.set('drawer', drawerVisible ? 'open' : 'hidden');
    next.searchParams.set('theme', theme);
    history.replaceState(null, '', next);
  }

  function renderShell() {
    shell.dataset.theme = theme;
    shell.classList.toggle('drawer-hidden', !drawerVisible);
    drawerToggle.setAttribute('aria-label', drawerVisible ? 'Close navigation' : 'Open navigation');
    drawerToggle.setAttribute('title', drawerVisible ? 'Close navigation' : 'Open navigation');
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('title', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  function renderNavigation() {
    group.classList.toggle('is-collapsed', !expanded);
    groupToggle.setAttribute('aria-expanded', String(expanded));
    document.querySelectorAll('[data-item]').forEach((item) => {
      const selected = item.dataset.item === currentItem;
      item.toggleAttribute('aria-current', selected);
    });
    const term = search.value.trim();
    const normalized = term.toLocaleLowerCase('ja');
    const allItems = [...document.querySelectorAll('[data-item]')];
    const matched = allItems.filter((item) => item.dataset.item.toLocaleLowerCase('ja').includes(normalized));
    allItems.forEach((item) => { item.hidden = term !== '' && !matched.includes(item); });
    const childMatch = matched.some((item) => item.classList.contains('nav-child'));
    group.hidden = term !== '' && !childMatch;
    leaves.hidden = term !== '' && !matched.some((item) => item.classList.contains('nav-leaf'));
    noMatches.hidden = matched.length !== 0;
    if (term !== '' && childMatch) group.classList.remove('is-collapsed');
  }

  drawerToggle.addEventListener('click', () => { drawerVisible = !drawerVisible; renderShell(); updateUrl(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderShell(); updateUrl(); });
  groupToggle.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
  search.addEventListener('input', renderNavigation);
  document.addEventListener('click', (event) => {
    const item = event.target.closest('[data-item]');
    if (!item) return;
    currentItem = item.dataset.item;
    renderNavigation();
  });

  renderShell();
  renderNavigation();
})();
