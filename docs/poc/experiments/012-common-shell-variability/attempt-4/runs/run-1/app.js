(function () {
  const shell = document.querySelector('.app-shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#drawer-search');
  const clear = document.querySelector('#drawer-clear');
  const noMatches = document.querySelector('#no-matches');
  const parent = document.querySelector('.drawer-parent');
  const children = Array.from(parent.querySelectorAll('.drawer-children > li'));
  const leaves = Array.from(document.querySelectorAll('.drawer-list > li:not(.drawer-parent)'));
  const params = new URLSearchParams(window.location.search);

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

  function filterMenu() {
    const term = search.value.trim().toLocaleLowerCase('ja-JP');
    const parentMatch = parent.dataset.parent.toLocaleLowerCase('ja-JP').includes(term);
    let matches = parentMatch;

    children.forEach(function (child) {
      const match = parentMatch || child.dataset.item.toLocaleLowerCase('ja-JP').includes(term);
      child.hidden = !match;
      matches = matches || match;
    });
    parent.hidden = !parentMatch && !children.some(function (child) { return !child.hidden; });

    leaves.forEach(function (leaf) {
      const match = leaf.dataset.item.toLocaleLowerCase('ja-JP').includes(term);
      leaf.hidden = !match;
      matches = matches || match;
    });
    noMatches.hidden = matches;
  }

  drawerToggle.addEventListener('click', function () {
    setDrawer(shell.dataset.drawer === 'open' ? 'hidden' : 'open');
  });

  themeToggle.addEventListener('click', function () {
    setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light');
  });

  search.addEventListener('input', filterMenu);
  clear.addEventListener('click', function () {
    search.value = '';
    filterMenu();
    search.focus();
  });

  setDrawer(params.get('drawer') === 'hidden' ? 'hidden' : 'open');
  setTheme(params.get('theme') === 'dark' ? 'dark' : 'light');
  filterMenu();
}());
