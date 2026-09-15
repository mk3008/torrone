(() => {
  const shell = document.querySelector('#shell');
  const drawer = document.querySelector('#drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const panelChevron = document.querySelector('#panel-chevron');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#nav-search');
  const clearSearch = document.querySelector('#clear-search');
  const navigation = document.querySelector('#navigation-list');
  const parameters = new URLSearchParams(window.location.search);
  let drawerOpen = parameters.get('drawer') !== 'hidden';
  let theme = parameters.get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = 'item-01-01';

  const children = [
    { id: 'item-01-01', label: '項目 01-01' },
    { id: 'item-01-02', label: '項目 01-02' }
  ];
  const leaves = Array.from({ length: 29 }, (_, index) => ({
    id: `item-${String(index + 2).padStart(2, '0')}`,
    label: `項目 ${String(index + 2).padStart(2, '0')}`
  }));

  function icon(path) { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg>`; }
  function matches(item, query) { return item.label.includes(query.trim()); }
  function button(item, child = false) {
    const isCurrent = item.id === current;
    return `<button class="nav-row${child ? ' child' : ''}${isCurrent ? ' current' : ''}" type="button" data-id="${item.id}"${isCurrent ? ' aria-current="page"' : ''}><span class="label">${item.label}</span></button>`;
  }
  function renderNavigation() {
    const query = search.value;
    const matchingChildren = children.filter(item => matches(item, query));
    const matchingLeaves = leaves.filter(item => matches(item, query));
    const showGroup = !query || matchingChildren.length > 0 || 'グループ 01'.includes(query.trim());
    let html = '';
    if (showGroup) {
      const group = { id: 'group-01', label: 'グループ 01' };
      html += `<div class="group-row">${button(group)}<button class="disclosure" id="group-disclosure" type="button" aria-label="${expanded ? 'グループ 01 を折りたたむ' : 'グループ 01 を展開する'}" aria-expanded="${expanded}" title="${expanded ? '折りたたむ' : '展開する'}">${icon(expanded ? 'm6 9 6 6 6-6' : 'm9 6 6 6-6 6')}</button></div>`;
      if (expanded || query) html += matchingChildren.map(item => button(item, true)).join('');
    }
    html += matchingLeaves.map(item => button(item)).join('');
    navigation.innerHTML = html || '<p class="no-matches">一致する項目はありません</p>';
    document.querySelector('#group-disclosure')?.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
    navigation.querySelectorAll('[data-id]').forEach(item => item.addEventListener('click', () => { current = item.dataset.id; renderNavigation(); }));
  }
  function renderDrawerState() {
    shell.classList.toggle('drawer-hidden', !drawerOpen);
    drawerToggle.setAttribute('aria-expanded', String(drawerOpen));
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerOpen ? 'Close navigation' : 'Open navigation';
    panelChevron.setAttribute('d', drawerOpen ? 'm15 8-4 4 4 4' : 'm11 8 4 4-4 4');
  }
  function renderTheme() {
    shell.dataset.theme = theme;
    const light = theme === 'light';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.title = light ? 'Switch to dark mode' : 'Switch to light mode';
    themeIcon.innerHTML = light ? '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"></path>' : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>';
  }
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderDrawerState(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderTheme(); });
  search.addEventListener('input', () => { clearSearch.hidden = !search.value; renderNavigation(); });
  clearSearch.addEventListener('click', () => { search.value = ''; clearSearch.hidden = true; search.focus(); renderNavigation(); });
  document.querySelector('#number-list').innerHTML = Array.from({ length: 80 }, (_, index) => `<li>${index + 1}</li>`).join('');
  renderDrawerState(); renderTheme(); renderNavigation();
})();
