const shell = document.querySelector('.shell');
const drawerControl = document.querySelector('.drawer-control');
const themeControl = document.querySelector('.theme-control');
const searchInput = document.querySelector('#navigation-search');
const navigationList = document.querySelector('.navigation-list');

let drawerOpen = new URLSearchParams(location.search).get('drawer') !== 'hidden';
let theme = new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light';
let groupExpanded = true;
let currentDestination = 'item-01-01';

const navItems = [
  { id: 'item-01-01', label: '項目 01-01', child: true },
  { id: 'item-01-02', label: '項目 01-02', child: true },
  ...Array.from({ length: 29 }, (_, index) => {
    const number = String(index + 2).padStart(2, '0');
    return { id: `item-${number}`, label: `項目 ${number}`, child: false };
  })
];

function iconPath(direction) {
  return direction === 'down' ? '<path d="m6 9 6 6 6-6" />' : '<path d="m9 18 6-6-6-6" />';
}

function updateUrl() {
  const params = new URLSearchParams(location.search);
  params.set('drawer', drawerOpen ? 'open' : 'hidden');
  params.set('theme', theme);
  history.replaceState(null, '', `${location.pathname}?${params}`);
}

function renderNavigation() {
  const query = searchInput.value.trim().toLocaleLowerCase('ja');
  const childMatches = navItems.filter((item) => item.child && item.label.toLocaleLowerCase('ja').includes(query));
  const leafMatches = navItems.filter((item) => !item.child && item.label.toLocaleLowerCase('ja').includes(query));
  const showGroup = !query || childMatches.length > 0 || 'グループ 01'.includes(query);
  const visibleChildren = query ? childMatches : navItems.filter((item) => item.child);
  const rows = [];
  if (showGroup) {
    rows.push(`<button class="navigation-row group-row" type="button" data-disclosure="true" aria-expanded="${groupExpanded}"><span>グループ 01</span><svg class="disclosure" aria-hidden="true" viewBox="0 0 24 24">${iconPath(groupExpanded ? 'down' : 'right')}</svg></button>`);
    if (groupExpanded || query) rows.push(...visibleChildren.map(itemRow));
  }
  rows.push(...leafMatches.map(itemRow));
  navigationList.innerHTML = rows.length ? rows.join('') : '<p class="no-matches">一致する項目はありません</p>';
}

function itemRow(item) {
  const current = item.id === currentDestination;
  return `<button class="navigation-row${item.child ? ' child' : ''}" type="button" data-destination="${item.id}"${current ? ' aria-current="page"' : ''}>${item.label}</button>`;
}

function renderShell() {
  shell.dataset.theme = theme;
  shell.classList.toggle('drawer-hidden', !drawerOpen);
  const close = drawerOpen;
  drawerControl.setAttribute('aria-label', close ? 'Close navigation' : 'Open navigation');
  drawerControl.title = close ? 'Close navigation' : 'Open navigation';
  drawerControl.innerHTML = close
    ? '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v14H4zM9 5v14M15 9l-3 3 3 3" /></svg>'
    : '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v14H4zM9 5v14M12 9l3 3-3 3" /></svg>';
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  themeControl.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  themeControl.title = `Switch to ${nextTheme} theme`;
  themeControl.innerHTML = theme === 'light'
    ? '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8z" /></svg>'
    : '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>';
  renderNavigation();
  updateUrl();
}

drawerControl.addEventListener('click', () => { drawerOpen = !drawerOpen; renderShell(); });
themeControl.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; renderShell(); });
searchInput.addEventListener('input', renderNavigation);
navigationList.addEventListener('click', (event) => {
  const disclosure = event.target.closest('[data-disclosure]');
  const destination = event.target.closest('[data-destination]');
  if (disclosure) { groupExpanded = !groupExpanded; renderNavigation(); }
  if (destination) { currentDestination = destination.dataset.destination; renderNavigation(); }
});

document.querySelector('.dummy-list').innerHTML = Array.from({ length: 80 }, (_, index) => `<li>${index + 1}</li>`).join('');
renderShell();
