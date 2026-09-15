(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const search = document.querySelector('#menu-search');
  const clearSearch = document.querySelector('.clear-search');
  const menuList = document.querySelector('#menu-list');
  const noMatches = document.querySelector('#no-matches');
  const numberList = document.querySelector('.number-list');

  const params = new URLSearchParams(window.location.search);
  const startDrawer = params.get('drawer') === 'hidden' ? 'hidden' : 'open';
  const startTheme = params.get('theme') === 'dark' ? 'dark' : 'light';
  const entries = [
    { label: 'グループ 01', children: ['項目 01-01', '項目 01-02'] },
    ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))
  ];

  function setQueryValue(name, value) {
    const next = new URL(window.location.href);
    next.searchParams.set(name, value);
    window.history.replaceState({}, '', next);
  }

  function renderMenu(query = '') {
    const normalized = query.trim().toLocaleLowerCase('ja-JP');
    const markup = entries.map((entry) => {
      const groupMatch = entry.label.toLocaleLowerCase('ja-JP').includes(normalized);
      const matchingChildren = entry.children?.filter((child) => child.toLocaleLowerCase('ja-JP').includes(normalized)) || [];
      if (normalized && !groupMatch && matchingChildren.length === 0) return '';

      if (entry.children) {
        const children = normalized && groupMatch ? entry.children : (normalized ? matchingChildren : entry.children);
        return `<li class="menu-group"><div class="group-row"><span>${entry.label}</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></div><ul class="child-list">${children.map((child) => `<li><a class="menu-item${child === '項目 01-01' ? ' current' : ''}" href="#${encodeURIComponent(child)}"${child === '項目 01-01' ? ' aria-current="page"' : ''}>${child}</a></li>`).join('')}</ul></li>`;
      }
      return `<li><a class="menu-item" href="#${encodeURIComponent(entry.label)}">${entry.label}</a></li>`;
    }).join('');
    menuList.innerHTML = markup;
    noMatches.hidden = Boolean(markup);
  }

  function setDrawer(drawer) {
    shell.dataset.drawer = drawer;
    const isOpen = drawer === 'open';
    drawerToggle.setAttribute('aria-expanded', String(isOpen));
    drawerToggle.setAttribute('aria-label', isOpen ? 'Drawer を閉じる' : 'Drawer を開く');
    setQueryValue('drawer', drawer);
  }

  function setTheme(theme) {
    shell.dataset.theme = theme;
    const next = theme === 'light' ? 'ダークテーマに切り替える' : 'ライトテーマに切り替える';
    themeToggle.setAttribute('aria-label', next);
    themeToggle.setAttribute('title', next);
    setQueryValue('theme', theme);
  }

  drawerToggle.addEventListener('click', () => setDrawer(shell.dataset.drawer === 'open' ? 'hidden' : 'open'));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', () => {
    const active = search.value.length > 0;
    clearSearch.hidden = !active;
    renderMenu(search.value);
  });
  clearSearch.addEventListener('click', () => {
    search.value = '';
    clearSearch.hidden = true;
    renderMenu();
    search.focus();
  });

  numberList.innerHTML = Array.from({ length: 80 }, (_, index) => `<li>${index + 1}</li>`).join('');
  renderMenu();
  setDrawer(startDrawer);
  setTheme(startTheme);
})();
