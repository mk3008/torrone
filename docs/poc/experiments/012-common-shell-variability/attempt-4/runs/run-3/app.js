(function () {
  const shell = document.querySelector('.app-shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#menu-search');
  const clearSearch = document.querySelector('#menu-search-clear');
  const drawerList = document.querySelector('#drawer-list');
  const noMatches = document.querySelector('#no-matches');
  const parameters = new URLSearchParams(window.location.search);

  const navigation = [
    { label: 'グループ 01', children: [
      { label: '項目 01-01', current: true },
      { label: '項目 01-02' }
    ] },
    ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))
  ];

  function makeLink(item) {
    const link = document.createElement('a');
    link.className = 'drawer-item';
    link.href = '#';
    link.textContent = item.label;
    if (item.current) link.setAttribute('aria-current', 'page');
    return link;
  }

  function renderNavigation(query) {
    const term = query.trim().toLocaleLowerCase('ja-JP');
    drawerList.replaceChildren();
    let matches = 0;

    navigation.forEach((item) => {
      if (item.children) {
        const parentMatches = item.label.toLocaleLowerCase('ja-JP').includes(term);
        const children = item.children.filter((child) => parentMatches || child.label.toLocaleLowerCase('ja-JP').includes(term));
        if (!children.length && !parentMatches) return;
        const parent = document.createElement('li');
        parent.className = 'drawer-parent';
        parent.append(makeLink(item));
        const disclosure = document.createElement('span');
        disclosure.className = 'drawer-disclosure';
        disclosure.setAttribute('aria-label', '展開中');
        disclosure.textContent = '⌄';
        parent.append(disclosure);
        const childList = document.createElement('ul');
        childList.className = 'drawer-children';
        children.forEach((child) => {
          const childItem = document.createElement('li');
          childItem.append(makeLink(child));
          childList.append(childItem);
          matches += 1;
        });
        parent.append(childList);
        drawerList.append(parent);
        return;
      }

      if (term && !item.label.toLocaleLowerCase('ja-JP').includes(term)) return;
      const leaf = document.createElement('li');
      leaf.append(makeLink(item));
      drawerList.append(leaf);
      matches += 1;
    });

    noMatches.hidden = matches !== 0;
    clearSearch.hidden = term.length === 0;
  }

  function setDrawer(state) {
    const open = state === 'open';
    shell.dataset.drawer = open ? 'open' : 'hidden';
    drawerToggle.setAttribute('aria-expanded', String(open));
    drawerToggle.setAttribute('aria-label', open ? 'Drawer を閉じる' : 'Drawer を開く');
  }

  function setTheme(theme) {
    const dark = theme === 'dark';
    shell.dataset.theme = dark ? 'dark' : 'light';
    themeIcon.textContent = dark ? '◑' : '◐';
    themeToggle.setAttribute('aria-label', dark ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
  }

  drawerToggle.addEventListener('click', () => setDrawer(shell.dataset.drawer === 'open' ? 'hidden' : 'open'));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', () => renderNavigation(search.value));
  clearSearch.addEventListener('click', () => {
    search.value = '';
    renderNavigation('');
    search.focus();
  });

  setDrawer(parameters.get('drawer') === 'hidden' ? 'hidden' : 'open');
  setTheme(parameters.get('theme') === 'dark' ? 'dark' : 'light');
  renderNavigation('');
}());
