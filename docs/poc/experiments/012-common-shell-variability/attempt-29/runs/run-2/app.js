const items = ['項目 01-01', '項目 01-02', ...Array.from({ length: 29 }, (_, i) => `項目 ${String(i + 2).padStart(2, '0')}`)];
const params = new URLSearchParams(location.search);
const shell = document.querySelector('.shell');
const drawer = document.querySelector('#drawer');
const drawerToggle = document.querySelector('#drawer-toggle');
const drawerIcon = document.querySelector('#drawer-icon');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const navigation = document.querySelector('#navigation');
const search = document.querySelector('#nav-search');
let open = params.get('drawer') !== 'hidden';
let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
let expanded = true;
let current = '項目 01-01';

function setDrawer() {
  shell.classList.toggle('drawer-hidden', !open);
  drawer.hidden = !open;
  drawerToggle.setAttribute('aria-expanded', String(open));
  drawerToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  drawerToggle.title = open ? 'Close navigation' : 'Open navigation';
  drawerIcon.src = `icons/panel-left-${open ? 'close' : 'open'}.svg`;
}
function setTheme() {
  shell.dataset.theme = theme;
  const next = theme === 'light' ? 'dark' : 'light';
  themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
  themeToggle.title = `Switch to ${next} theme`;
  themeIcon.src = `icons/${theme === 'light' ? 'moon' : 'sun'}.svg`;
}
function row(label, className = '') {
  const button = document.createElement('button'); button.type = 'button'; button.className = `nav-row ${className}`; button.textContent = label;
  button.setAttribute('aria-current', label === current ? 'page' : 'false');
  if (label === current) button.classList.add('current');
  button.addEventListener('click', () => { current = label; renderNav(); }); return button;
}
function renderNav() {
  const query = search.value.trim().toLowerCase(); navigation.replaceChildren();
  const matchingChildren = items.slice(0, 2).filter(x => x.toLowerCase().includes(query));
  const matchingLeaves = items.slice(2).filter(x => x.toLowerCase().includes(query));
  const parentMatches = 'グループ 01'.toLowerCase().includes(query);
  if (!matchingChildren.length && !matchingLeaves.length && !parentMatches) { const empty = document.createElement('p'); empty.className='no-matches'; empty.textContent='一致する項目はありません'; navigation.append(empty); return; }
  if (parentMatches || matchingChildren.length) {
    const parent = document.createElement('button'); parent.type='button'; parent.className='nav-row parent-row'; parent.setAttribute('aria-expanded', String(expanded));
    const text=document.createElement('span'); text.className='parent-label'; text.textContent='グループ 01';
    const icon=document.createElement('img'); icon.src=`icons/chevron-${expanded ? 'down' : 'right'}.svg`; icon.alt='';
    const aff=document.createElement('span'); aff.className='disclosure'; aff.append(icon); parent.append(text, aff);
    parent.addEventListener('click', () => { expanded=!expanded; renderNav(); }); navigation.append(parent);
    if (expanded) { const children=document.createElement('div'); children.className='child-list'; matchingChildren.forEach(x => children.append(row(x,'child-row'))); navigation.append(children); }
  }
  matchingLeaves.forEach(x => navigation.append(row(x)));
}
document.querySelector('#dummy-list').replaceChildren(...Array.from({length:80},(_,i)=>{const li=document.createElement('li');li.textContent=String(i+1);return li;}));
drawerToggle.addEventListener('click', () => { open=!open; setDrawer(); });
themeToggle.addEventListener('click', () => { theme=theme==='light'?'dark':'light'; setTheme(); });
search.addEventListener('input', renderNav); setDrawer(); setTheme(); renderNav();
