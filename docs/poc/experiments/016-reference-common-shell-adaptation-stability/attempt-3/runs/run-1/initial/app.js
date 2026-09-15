const app = document.querySelector('.application-shell');
const drawerButton = document.querySelector('.drawer-toggle');
const themeButton = document.querySelector('.theme-toggle');
const searchField = document.querySelector('#nav-filter');
const navigation = document.querySelector('.navigation-scroll');
const fixture = document.querySelector('.numbered-fixture');

const params = new URLSearchParams(window.location.search);
const state = {
  drawer: params.get('drawer') === 'hidden' ? 'hidden' : 'open',
  theme: params.get('theme') === 'dark' ? 'dark' : 'light',
  workspaceExpanded: true,
  currentId: 'overview'
};

const destinations = [
  { id: 'overview', label: 'Overview', child: true },
  { id: 'activity', label: 'Activity', child: true },
  ...Array.from({ length: 29 }, (_, index) => ({
    id: `section-${index + 1}`,
    label: `Section ${String(index + 1).padStart(2, '0')}`,
    child: false
  }))
];

function icon(name) {
  return `<span class="fixed-icon icon-${name}" aria-hidden="true"></span>`;
}

function syncLocation() {
  const next = new URLSearchParams(window.location.search);
  next.set('drawer', state.drawer);
  next.set('theme', state.theme);
  window.history.replaceState(null, '', `${window.location.pathname}?${next}`);
}

function navigationButton(item) {
  const current = item.id === state.currentId;
  return `<button class="nav-row${item.child ? ' nav-row--child' : ''}" type="button" data-destination="${item.id}"${current ? ' aria-current="page"' : ''}>${item.label}</button>`;
}

function paintNavigation() {
  const term = searchField.value.trim().toLocaleLowerCase();
  const matches = (item) => item.label.toLocaleLowerCase().includes(term);
  const children = destinations.filter((item) => item.child && matches(item));
  const leaves = destinations.filter((item) => !item.child && matches(item));
  const showParent = !term || children.length > 0 || 'workspace'.includes(term);
  const lines = [];

  if (showParent) {
    const disclosure = state.workspaceExpanded ? 'disclosure-expanded' : 'disclosure-collapsed';
    lines.push(`<button class="nav-row nav-row--parent" type="button" data-disclosure="workspace" aria-expanded="${state.workspaceExpanded}"><span>Workspace</span>${icon(disclosure)}</button>`);
    if (state.workspaceExpanded || term) lines.push(...children.map(navigationButton));
  }

  lines.push(...leaves.map(navigationButton));
  navigation.innerHTML = lines.length ? lines.join('') : '<p class="no-navigation-result">No matching navigation items.</p>';
}

function paintShell() {
  app.dataset.drawerState = state.drawer;
  app.dataset.referenceVisualTheme = state.theme;

  const drawerIsVisible = state.drawer === 'open';
  const drawerAction = drawerIsVisible ? 'Hide navigation' : 'Show navigation';
  drawerButton.setAttribute('aria-label', drawerAction);
  drawerButton.title = drawerAction;
  drawerButton.innerHTML = icon(drawerIsVisible ? 'drawer-hide' : 'drawer-show');

  const nextTheme = state.theme === 'light' ? 'dark' : 'light';
  const paletteAction = `Switch to ${nextTheme} palette`;
  themeButton.setAttribute('aria-label', paletteAction);
  themeButton.title = paletteAction;
  themeButton.innerHTML = icon(state.theme === 'light' ? 'theme-to-dark' : 'theme-to-light');

  paintNavigation();
  syncLocation();
}

drawerButton.addEventListener('click', () => {
  state.drawer = state.drawer === 'open' ? 'hidden' : 'open';
  paintShell();
});

themeButton.addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  paintShell();
});

searchField.addEventListener('input', paintNavigation);

navigation.addEventListener('click', (event) => {
  const disclosure = event.target.closest('[data-disclosure]');
  const destination = event.target.closest('[data-destination]');
  if (disclosure) {
    state.workspaceExpanded = !state.workspaceExpanded;
    paintNavigation();
  }
  if (destination) {
    state.currentId = destination.dataset.destination;
    paintNavigation();
  }
});

fixture.innerHTML = Array.from({ length: 80 }, (_, index) => `<li>${index + 1}</li>`).join('');
paintShell();
