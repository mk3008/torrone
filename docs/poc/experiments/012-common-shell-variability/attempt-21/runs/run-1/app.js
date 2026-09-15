(() => {
  const shell = document.getElementById('shell');
  const drawerToggle = document.getElementById('drawer-toggle');
  const drawerChevron = document.getElementById('drawer-chevron');
  const themeToggle = document.getElementById('theme-toggle');
  const themePath = document.getElementById('theme-path');
  const search = document.getElementById('nav-search');
  const clearSearch = document.getElementById('clear-search');
  const navList = document.getElementById('nav-list');
  let drawerOpen = new URLSearchParams(location.search).get('drawer') !== 'hidden';
  let theme = new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = '項目 01-01';

  const items = Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`);
  const matches = (label, query) => label.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  const icon = (down) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${down ? 'm6 9 6 6 6-6' : 'm9 6 6 6-6 6'}"></path></svg>`;

  function updateUrl() {
    const url = new URL(location.href);
    url.searchParams.set('drawer', drawerOpen ? 'open' : 'hidden');
    url.searchParams.set('theme', theme);
    history.replaceState(null, '', url);
  }
  function renderNav() {
    const query = search.value.trim();
    clearSearch.hidden = !search.value;
    const childLabels = ['項目 01-01', '項目 01-02'];
    const childMatches = childLabels.filter(label => matches(label, query));
    const leafMatches = items.filter(label => matches(label, query));
    const groupMatches = matches('グループ 01', query) || childMatches.length > 0;
    const showChildren = expanded || query.length > 0;
    const nodes = [];
    if (groupMatches) {
      nodes.push(`<button type="button" class="nav-group" aria-expanded="${expanded}" aria-label="グループ 01 を${expanded ? '折りたたむ' : '展開する'}">グループ 01${icon(expanded)}</button>`);
      if (showChildren) childMatches.forEach(label => nodes.push(row(label, true)));
    }
    leafMatches.forEach(label => nodes.push(row(label, false)));
    navList.innerHTML = nodes.length ? nodes.join('') : '<p class="no-matches">一致する項目はありません</p>';
    navList.querySelector('.nav-group')?.addEventListener('click', () => { expanded = !expanded; renderNav(); });
    navList.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => { current = button.dataset.destination; renderNav(); }));
  }
  function row(label, child) {
    const active = label === current;
    return `<button type="button" class="nav-item${child ? ' child' : ''}" data-destination="${label}"${active ? ' aria-current="page"' : ''}>${label}</button>`;
  }
  function renderShell() {
    shell.dataset.drawer = drawerOpen ? 'open' : 'hidden';
    shell.dataset.theme = theme;
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerOpen ? 'Close navigation' : 'Open navigation';
    drawerChevron.setAttribute('d', drawerOpen ? 'm16 9-3 3 3 3' : 'm13 9 3 3-3 3');
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'ダークテーマに切り替え' : 'ライトテーマに切り替え');
    themeToggle.title = themeToggle.getAttribute('aria-label');
    themePath.setAttribute('d', theme === 'light' ? 'M20.4 14.6A8.3 8.3 0 0 1 9.4 3.6 8.3 8.3 0 1 0 20.4 14.6Z' : 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z');
    updateUrl();
  }
  document.getElementById('number-list').innerHTML = Array.from({ length: 80 }, (_, i) => `<li>${i + 1}</li>`).join('');
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; renderShell(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderShell(); });
  search.addEventListener('input', renderNav);
  clearSearch.addEventListener('click', () => { search.value = ''; search.focus(); renderNav(); });
  renderShell();
  renderNav();
})();
