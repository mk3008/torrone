const shellRoot = document.querySelector('.application-shell');
const drawerToggle = document.querySelector('#drawer-toggle');
const themeToggle = document.querySelector('#theme-toggle');
const drawer = document.querySelector('#navigation-drawer');
const navigation = document.querySelector('#navigation-list');
const queryInput = document.querySelector('#navigation-query');

const urlState = new URLSearchParams(window.location.search);
const state = {
  drawerOpen: urlState.get('drawer') !== 'hidden',
  theme: urlState.get('theme') === 'dark' ? 'dark' : 'light',
  groupOpen: urlState.get('group') !== 'collapsed',
  current: urlState.get('selection') === 'activity' ? 'activity' : 'overview'
};

const childEntries = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' }
];
const sectionEntries = Array.from({ length: 29 }, (_, index) => ({
  id: `section-${index + 1}`,
  label: `Section ${String(index + 1).padStart(2, '0')}`
}));

const iconAssets = {
  drawerVisible: 'reference-visual-bindings/icons/drawer-hide.svg',
  drawerHidden: 'reference-visual-bindings/icons/drawer-show.svg',
  themeLight: 'reference-visual-bindings/icons/theme-to-dark.svg',
  themeDark: 'reference-visual-bindings/icons/theme-to-light.svg',
  disclosureExpanded: 'reference-visual-bindings/icons/disclosure-expanded.svg',
  disclosureCollapsed: 'reference-visual-bindings/icons/disclosure-collapsed.svg',
  search: 'reference-visual-bindings/icons/search.svg'
};

function fixedIcon(asset, className = '') {
  return `<span class="fixed-icon ${className}" style="--fixed-icon: url('${iconAssets[asset]}')" aria-hidden="true"></span>`;
}

function row(entry, isChild = false) {
  const selected = entry.id === state.current;
  return `<button class="nav-row${isChild ? ' child' : ''}" type="button" data-destination="${entry.id}"${selected ? ' aria-current="page"' : ''}>${entry.label}</button>`;
}

function renderNavigation() {
  const query = queryInput.value.trim().toLowerCase();
  const matchingChildren = childEntries.filter((entry) => entry.label.toLowerCase().includes(query));
  const matchingSections = sectionEntries.filter((entry) => entry.label.toLowerCase().includes(query));
  const matchesGroup = !query || 'workspace'.includes(query) || matchingChildren.length > 0;
  const content = [];

  if (matchesGroup) {
    const disclosure = state.groupOpen ? 'disclosureExpanded' : 'disclosureCollapsed';
    content.push(`<button class="nav-row group" type="button" data-group-toggle="true" aria-expanded="${state.groupOpen}"><span>Workspace</span>${fixedIcon(disclosure, 'disclosure-icon')}</button>`);
    if (state.groupOpen || query) content.push(...matchingChildren.map((entry) => row(entry, true)));
  }

  content.push(...matchingSections.map((entry) => row(entry)));
  navigation.innerHTML = content.length ? content.join('') : '<p class="empty-navigation">No matching navigation items.</p>';
}

function writeUrl() {
  const next = new URLSearchParams();
  next.set('drawer', state.drawerOpen ? 'open' : 'hidden');
  next.set('theme', state.theme);
  next.set('group', state.groupOpen ? 'expanded' : 'collapsed');
  next.set('selection', state.current);
  history.replaceState(null, '', `${location.pathname}?${next}`);
}

function renderShell() {
  shellRoot.dataset.referenceVisualTheme = state.theme;
  shellRoot.classList.toggle('drawer-is-hidden', !state.drawerOpen);
  drawer.setAttribute('aria-hidden', String(!state.drawerOpen));

  const drawerAction = state.drawerOpen ? 'Hide navigation' : 'Show navigation';
  drawerToggle.setAttribute('aria-label', drawerAction);
  drawerToggle.title = drawerAction;
  drawerToggle.innerHTML = fixedIcon(state.drawerOpen ? 'drawerVisible' : 'drawerHidden', 'icon-header');

  const nextPalette = state.theme === 'light' ? 'dark' : 'light';
  themeToggle.setAttribute('aria-label', `Switch to ${nextPalette} palette`);
  themeToggle.title = `Switch to ${nextPalette} palette`;
  themeToggle.innerHTML = fixedIcon(state.theme === 'light' ? 'themeLight' : 'themeDark', 'icon-header');

  renderNavigation();
  writeUrl();
}

drawerToggle.addEventListener('click', () => {
  state.drawerOpen = !state.drawerOpen;
  renderShell();
});

themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  renderShell();
});

queryInput.addEventListener('input', renderNavigation);

navigation.addEventListener('click', (event) => {
  const groupToggle = event.target.closest('[data-group-toggle]');
  const destination = event.target.closest('[data-destination]');

  if (groupToggle) {
    state.groupOpen = !state.groupOpen;
    renderNavigation();
    writeUrl();
    return;
  }

  if (destination) {
    state.current = destination.dataset.destination;
    renderNavigation();
    writeUrl();
  }
});

document.querySelector('#overflow-fixture').innerHTML = Array.from(
  { length: 80 },
  (_, index) => `<li>${index + 1}</li>`
).join('');

renderShell();
