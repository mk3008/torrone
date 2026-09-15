(() => {
  const shell = document.querySelector('.shell');
  const list = document.querySelector('.nav-list');
  const search = document.querySelector('#nav-search');
  const clear = document.querySelector('.clear-search');
  const drawerToggle = document.querySelector('.drawer-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  let current = '項目 01-01';
  let expanded = true;

  const params = new URLSearchParams(location.search);
  if (params.get('drawer') === 'hidden') shell.dataset.drawer = 'hidden';
  if (params.get('theme') === 'dark') shell.dataset.theme = 'dark';

  const items = ['項目 01-01', '項目 01-02', ...Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, '0')}`)];
  document.querySelector('.number-list').append(...Array.from({ length: 80 }, (_, index) => Object.assign(document.createElement('li'), { textContent: index + 1 })));

  function icon(name) { return name === 'down' ? '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>' : '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'; }
  function row(label, kind = 'leaf') { const button = document.createElement('button'); button.type = 'button'; button.className = `nav-row ${kind}`; button.textContent = label; if (label === current) button.setAttribute('aria-current', 'page'); button.addEventListener('click', () => { current = label; render(); }); return button; }
  function render() {
    const query = search.value.trim().toLowerCase();
    const matches = label => label.toLowerCase().includes(query);
    list.replaceChildren();
    const childMatches = items.slice(0, 2).some(matches);
    const leafMatches = items.slice(2).filter(matches);
    if (query && !childMatches && !leafMatches.length && !'グループ 01'.includes(query)) { list.innerHTML = '<p class="nav-empty">一致する項目はありません</p>'; return; }
    const parent = row('グループ 01', 'parent');
    const disclosure = document.createElement('button'); disclosure.type = 'button'; disclosure.className = 'disclosure'; disclosure.setAttribute('aria-label', expanded ? 'グループ 01 を折り畳む' : 'グループ 01 を展開する'); disclosure.title = disclosure.getAttribute('aria-label'); disclosure.innerHTML = icon(expanded ? 'down' : 'right'); disclosure.addEventListener('click', event => { event.stopPropagation(); expanded = !expanded; render(); }); parent.append(disclosure); list.append(parent);
    const children = document.createElement('div'); children.className = 'group-children'; children.hidden = !expanded && !query; items.slice(0, 2).filter(matches).forEach(label => children.append(row(label, 'child'))); list.append(children);
    leafMatches.forEach(label => list.append(row(label)));
  }
  function syncThemeButton() { const dark = shell.dataset.theme === 'dark'; const label = dark ? 'ライトテーマに切り替える' : 'ダークテーマに切り替える'; themeToggle.setAttribute('aria-label', label); themeToggle.title = label; }
  drawerToggle.addEventListener('click', () => { shell.dataset.drawer = shell.dataset.drawer === 'open' ? 'hidden' : 'open'; const hidden = shell.dataset.drawer === 'hidden'; const label = hidden ? 'Drawer を開く' : 'Drawer を閉じる'; drawerToggle.setAttribute('aria-label', label); drawerToggle.title = label; });
  themeToggle.addEventListener('click', () => { shell.dataset.theme = shell.dataset.theme === 'light' ? 'dark' : 'light'; syncThemeButton(); });
  search.addEventListener('input', () => { document.querySelector('.search-field').classList.toggle('has-value', Boolean(search.value)); render(); });
  clear.addEventListener('click', () => { search.value = ''; document.querySelector('.search-field').classList.remove('has-value'); search.focus(); render(); });
  syncThemeButton(); render();
})();
