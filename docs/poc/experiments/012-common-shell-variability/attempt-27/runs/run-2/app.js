const fixture = [
  { label: '項目 01-01', child: true },
  { label: '項目 01-02', child: true },
  ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, '0')}` }))
];
const navList = document.querySelector('#nav-list');
const noMatches = document.querySelector('#no-matches');
const search = document.querySelector('#navigation-search');
const drawer = document.querySelector('#drawer');
const drawerToggle = document.querySelector('#drawer-toggle');
const drawerIcon = document.querySelector('#drawer-icon');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const shell = document.querySelector('.shell');
let current = '項目 01-01';
let expanded = true;

function item(label, child = false) {
  const button = document.createElement('button');
  button.className = `nav-item${child ? ' child' : ''}`;
  button.textContent = label;
  button.type = 'button';
  button.setAttribute('aria-current', label === current ? 'page' : 'false');
  button.addEventListener('click', () => { current = label; renderNavigation(); });
  return button;
}
function renderNavigation() {
  const term = search.value.trim();
  const matches = fixture.filter(entry => entry.label.includes(term));
  navList.replaceChildren();
  if (matches.some(entry => entry.child)) {
    const group = document.createElement('button');
    group.type = 'button'; group.className = 'nav-group'; group.textContent = 'グループ 01';
    group.setAttribute('aria-expanded', String(expanded));
    const chevron = document.createElement('img'); chevron.src = 'icons/chevron-down.svg'; chevron.alt = '';
    group.append(chevron); group.addEventListener('click', () => { expanded = !expanded; renderNavigation(); });
    navList.append(group);
    const children = document.createElement('div'); children.className = 'nav-children'; children.hidden = !expanded && !term;
    matches.filter(entry => entry.child).forEach(entry => children.append(item(entry.label, true)));
    navList.append(children);
  }
  matches.filter(entry => !entry.child).forEach(entry => navList.append(item(entry.label)));
  noMatches.hidden = matches.length !== 0;
}
function setDrawer(isOpen) {
  shell.classList.toggle('drawer-hidden', !isOpen);
  drawerToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  drawerToggle.title = drawerToggle.getAttribute('aria-label');
  drawerIcon.src = isOpen ? 'icons/panel-left-close.svg' : 'icons/panel-left-open.svg';
}
function setTheme(theme) {
  shell.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggle.title = themeToggle.getAttribute('aria-label');
  themeIcon.src = dark ? 'icons/sun.svg' : 'icons/moon.svg';
}
const params = new URLSearchParams(location.search);
setDrawer(params.get('drawer') !== 'hidden');
setTheme(params.get('theme') === 'dark' ? 'dark' : 'light');
drawerToggle.addEventListener('click', () => setDrawer(shell.classList.contains('drawer-hidden')));
themeToggle.addEventListener('click', () => setTheme(shell.dataset.theme === 'dark' ? 'light' : 'dark'));
search.addEventListener('input', renderNavigation);
renderNavigation();
const sequence = document.querySelector('#sequence');
for (let number = 1; number <= 80; number += 1) { const cell = document.createElement('li'); cell.textContent = number; sequence.append(cell); }
