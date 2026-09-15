(() => {
  const shell = document.querySelector('.shell');
  const drawer = document.getElementById('drawer');
  const drawerToggle = document.getElementById('drawer-toggle');
  const drawerIcon = document.getElementById('drawer-icon');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const search = document.getElementById('nav-search');
  const list = document.getElementById('nav-list');
  const noMatches = document.getElementById('no-matches');
  let current = '項目 01-01';
  let expanded = true;

  const navigation = [
    { label: 'グループ 01', children: ['項目 01-01', '項目 01-02'] },
    ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))
  ];

  function matches(label, query) { return label.toLowerCase().includes(query); }
  function button(label, child = false) {
    const item = document.createElement('li');
    const control = document.createElement('button');
    control.type = 'button'; control.className = `nav-row${child ? ' nav-row--child' : ''}`;
    control.textContent = label;
    if (label === current) control.setAttribute('aria-current', 'page');
    control.addEventListener('click', () => { current = label; render(); });
    item.append(control); return item;
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    list.replaceChildren();
    let count = 0;
    navigation.forEach(item => {
      if (item.children) {
        const childMatches = item.children.filter(label => matches(label, query));
        const parentMatches = matches(item.label, query);
        if (query && !parentMatches && !childMatches.length) return;
        const parent = document.createElement('li');
        const row = document.createElement('div'); row.className = `nav-row${item.label === current ? ' is-current' : ''}`;
        const parentButton = document.createElement('button'); parentButton.type = 'button'; parentButton.className = 'nav-row__label'; parentButton.textContent = item.label;
        if (item.label === current) parentButton.setAttribute('aria-current', 'page');
        parentButton.addEventListener('click', () => { current = item.label; render(); });
        const disclosure = document.createElement('button'); disclosure.type = 'button'; disclosure.className = 'disclosure'; disclosure.setAttribute('aria-label', expanded || query ? 'Collapse グループ 01' : 'Expand グループ 01');
        disclosure.innerHTML = `<img src="icons/${expanded || query ? 'chevron-down' : 'chevron-right'}.svg" alt="" />`;
        disclosure.addEventListener('click', () => { expanded = !expanded; render(); });
        row.append(parentButton, disclosure); parent.append(row); list.append(parent); count++;
        if (expanded || query) {
          const visibleChildren = query && parentMatches ? item.children : (query ? childMatches : item.children);
          visibleChildren.forEach(label => { list.append(button(label, true)); count++; });
        }
      } else if (!query || matches(item.label, query)) { list.append(button(item.label)); count++; }
    });
    noMatches.hidden = count !== 0;
  }

  function setDrawer(hidden) {
    shell.classList.toggle('drawer-hidden', hidden);
    drawerToggle.setAttribute('aria-label', hidden ? 'Open navigation' : 'Close navigation');
    drawerToggle.title = hidden ? 'Open navigation' : 'Close navigation';
    drawerIcon.src = `icons/panel-left-${hidden ? 'open' : 'close'}.svg`;
  }
  function setTheme(theme) {
    const dark = theme === 'dark'; shell.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    themeIcon.src = `icons/${dark ? 'sun' : 'moon'}.svg`;
  }
  const params = new URLSearchParams(location.search);
  setDrawer(params.get('drawer') === 'hidden');
  setTheme(params.get('theme') === 'dark' ? 'dark' : 'light');
  drawerToggle.addEventListener('click', () => setDrawer(!shell.classList.contains('drawer-hidden')));
  themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'light' ? 'dark' : 'light'));
  search.addEventListener('input', render);
  document.getElementById('dummy-list').append(...Array.from({ length: 80 }, (_, i) => { const li = document.createElement('li'); li.textContent = i + 1; return li; }));
  render();
})();
