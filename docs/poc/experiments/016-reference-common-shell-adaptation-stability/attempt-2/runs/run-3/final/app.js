const application = document.querySelector('.application');
const drawerToggle = document.querySelector('.drawer-toggle');
const paletteToggle = document.querySelector('.palette-toggle');
const navigationFilter = document.querySelector('#navigation-filter');
const navigation = document.querySelector('.navigation');
const fixture = document.querySelector('.numbered-fixture');

const requestedState = new URLSearchParams(window.location.search);
let drawerState = requestedState.get('drawer') === 'hidden' ? 'hidden' : 'open';
let palette = requestedState.get('theme') === 'dark' ? 'dark' : 'light';
let workspaceExpanded = true;
let currentLocation = 'overview';

const destinations = [
  { id: 'overview', name: 'Overview', nested: true },
  { id: 'activity', name: 'Activity', nested: true },
  ...Array.from({ length: 29 }, (_, position) => ({
    id: `section-${position + 1}`,
    name: `Section ${String(position + 1).padStart(2, '0')}`,
    nested: false
  }))
];

function chevron(expanded) {
  return expanded
    ? '<path d="m6.5 9 5.5 5.5L17.5 9" />'
    : '<path d="m9 6.5 5.5 5.5L9 17.5" />';
}

function syncAddress() {
  const query = new URLSearchParams(window.location.search);
  query.set('drawer', drawerState);
  query.set('theme', palette);
  window.history.replaceState(null, '', `${window.location.pathname}?${query.toString()}`);
}

function destinationButton(destination) {
  const isCurrent = destination.id === currentLocation;
  const currentAttribute = isCurrent ? ' aria-current="page"' : '';
  const childClass = destination.nested ? ' is-child' : '';
  return `<button class="navigation-row${childClass}" type="button" data-location="${destination.id}"${currentAttribute}>${destination.name}</button>`;
}

function renderNavigation() {
  const searchTerm = navigationFilter.value.trim().toLocaleLowerCase();
  const nested = destinations.filter((entry) => entry.nested && entry.name.toLocaleLowerCase().includes(searchTerm));
  const sections = destinations.filter((entry) => !entry.nested && entry.name.toLocaleLowerCase().includes(searchTerm));
  const groupMatches = !searchTerm || nested.length > 0 || 'workspace'.includes(searchTerm);
  const displayNested = searchTerm ? nested : destinations.filter((entry) => entry.nested);
  const output = [];

  if (groupMatches) {
    output.push(`<button class="navigation-row group" type="button" data-group-toggle aria-expanded="${workspaceExpanded}"><span>Workspace</span><svg class="disclosure-mark" aria-hidden="true" viewBox="0 0 24 24">${chevron(workspaceExpanded)}</svg></button>`);
    if (workspaceExpanded || searchTerm) output.push(...displayNested.map(destinationButton));
  }

  output.push(...sections.map(destinationButton));
  navigation.innerHTML = output.length ? output.join('') : '<p class="empty-navigation">No matching navigation items.</p>';
}

function renderApplication() {
  const drawerVisible = drawerState === 'open';
  application.dataset.palette = palette;
  application.classList.toggle('drawer-is-hidden', !drawerVisible);

  const drawerLabel = drawerVisible ? 'Hide navigation' : 'Show navigation';
  drawerToggle.setAttribute('aria-label', drawerLabel);
  drawerToggle.title = drawerLabel;
  drawerToggle.innerHTML = drawerVisible
    ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v14H10V5m5 4-3 3 3 3" /></svg>'
    : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v14H10V5m2 4 3 3-3 3" /></svg>';

  const nextPalette = palette === 'light' ? 'dark' : 'light';
  paletteToggle.setAttribute('aria-label', `Switch to ${nextPalette} palette`);
  paletteToggle.title = `Switch to ${nextPalette} palette`;
  paletteToggle.innerHTML = palette === 'light'
    ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.7 14.6A8.7 8.7 0 1 1 9.4 3.3a6.9 6.9 0 0 0 11.3 11.3z" /></svg>'
    : '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.8" /><path d="M12 2.5v2M12 19.5v2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4M2.5 12h2m15 0h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></svg>';

  renderNavigation();
  syncAddress();
}

drawerToggle.addEventListener('click', () => {
  drawerState = drawerState === 'open' ? 'hidden' : 'open';
  renderApplication();
});

paletteToggle.addEventListener('click', () => {
  palette = palette === 'light' ? 'dark' : 'light';
  renderApplication();
});

navigationFilter.addEventListener('input', renderNavigation);

navigation.addEventListener('click', (event) => {
  const groupToggle = event.target.closest('[data-group-toggle]');
  const selected = event.target.closest('[data-location]');

  if (groupToggle) {
    workspaceExpanded = !workspaceExpanded;
    renderNavigation();
    return;
  }

  if (selected) {
    currentLocation = selected.dataset.location;
    renderNavigation();
  }
});

fixture.innerHTML = Array.from({ length: 80 }, (_, index) => `<li>${index + 1}</li>`).join('');
renderApplication();
