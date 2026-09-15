(() => {
  const shell = document.querySelector('.shell');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const drawerIcon = document.querySelector('#drawer-icon');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('#theme-icon');
  const search = document.querySelector('#nav-search');
  const navList = document.querySelector('#nav-list');
  const dummyList = document.querySelector('#dummy-list');
  let drawerOpen = new URLSearchParams(location.search).get('drawer') !== 'hidden';
  let theme = new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light';
  let expanded = true;
  let current = '項目 01-01';
  const leaves = ['項目 01-01', '項目 01-02', ...Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`)];

  function updateShell() {
    shell.dataset.theme = theme;
    shell.classList.toggle('drawer-hidden', !drawerOpen);
    drawerToggle.setAttribute('aria-label', drawerOpen ? 'Close navigation' : 'Open navigation');
    drawerToggle.title = drawerToggle.getAttribute('aria-label');
    drawerIcon.src = `icons/panel-left-${drawerOpen ? 'close' : 'open'}.svg`;
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.title = themeToggle.getAttribute('aria-label');
    themeIcon.src = `icons/${theme === 'light' ? 'moon' : 'sun'}.svg`;
  }

  function leaf(label, nested) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `nav-leaf${nested ? '' : ' top-level'}${label === current ? ' current' : ''}`;
    button.textContent = label;
    button.setAttribute('aria-current', label === current ? 'page' : 'false');
    button.addEventListener('click', () => { current = label; renderNav(); });
    return button;
  }

  function renderNav() {
    const term = search.value.trim().toLowerCase();
    navList.replaceChildren();
    const groupMatches = 'グループ 01'.includes(term);
    const childMatches = leaves.slice(0, 2).filter(label => label.toLowerCase().includes(term));
    const topMatches = leaves.slice(2).filter(label => label.toLowerCase().includes(term));
    const group = document.createElement('button');
    group.type = 'button'; group.className = 'nav-group';
    group.setAttribute('aria-expanded', String(expanded));
    group.innerHTML = '<span>グループ 01</span>';
    const chevron = document.createElement('img');
    chevron.src = `icons/chevron-${expanded ? 'down' : 'right'}.svg`; chevron.alt = '';
    group.append(chevron);
    group.addEventListener('click', () => { expanded = !expanded; renderNav(); });
    const showGroup = !term || groupMatches || childMatches.length;
    if (showGroup) {
      navList.append(group);
      const children = document.createElement('div'); children.className = 'children';
      children.hidden = !expanded && !term;
      childMatches.forEach(label => children.append(leaf(label, true)));
      if (children.childElementCount) navList.append(children);
    }
    topMatches.forEach(label => navList.append(leaf(label, false)));
    if (!navList.childElementCount) {
      const empty = document.createElement('p'); empty.className = 'no-matches'; empty.textContent = '一致する項目はありません。'; navList.append(empty);
    }
  }

  for (let i = 1; i <= 80; i += 1) { const item = document.createElement('li'); item.textContent = i; dummyList.append(item); }
  drawerToggle.addEventListener('click', () => { drawerOpen = !drawerOpen; updateShell(); });
  themeToggle.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; updateShell(); });
  search.addEventListener('input', renderNav);
  updateShell(); renderNav();
})();
