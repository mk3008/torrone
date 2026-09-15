const shell = document.querySelector('.application-shell');
const drawerButton = document.querySelector('.drawer-toggle');
const paletteButton = document.querySelector('.palette-toggle');
const filterField = document.querySelector('#navigation-filter');
const navigation = document.querySelector('.navigation-scroll');
const fixture = document.querySelector('.numbered-fixture');

const query = new URLSearchParams(window.location.search);
let drawerVisible = query.get('drawer') !== 'hidden';
let palette = query.get('palette') === 'dark' ? 'dark' : 'light';
let workspaceExpanded = true;
let selectedId = 'overview';

const destinations = [
  { id: 'overview', label: 'Overview', nested: true },
  { id: 'activity', label: 'Activity', nested: true },
  ...Array.from({ length: 29 }, (_, offset) => ({
    id: `section-${offset + 1}`,
    label: `Section ${String(offset + 1).padStart(2, '0')}`,
    nested: false
  }))
];

function updateAddress() {
  const next = new URLSearchParams(window.location.search);
  next.set('drawer', drawerVisible ? 'open' : 'hidden');
  next.set('palette', palette);
  window.history.replaceState(null, '', `${window.location.pathname}?${next}`);
}

function makeDestination(item) {
  const button = document.createElement('button');
  button.className = `nav-entry${item.nested ? ' child' : ''}`;
  button.type = 'button';
  button.dataset.destination = item.id;
  button.textContent = item.label;
  if (item.id === selectedId) button.setAttribute('aria-current', 'page');
  return button;
}

function renderNavigation() {
  const term = filterField.value.trim().toLocaleLowerCase();
  const matches = destinations.filter((item) => item.label.toLocaleLowerCase().includes(term));
  const nested = matches.filter((item) => item.nested);
  const sections = matches.filter((item) => !item.nested);
  const showWorkspace = !term || nested.length > 0 || 'workspace'.includes(term);

  navigation.replaceChildren();
  if (showWorkspace) {
    const group = document.createElement('button');
    group.className = 'nav-entry group';
    group.type = 'button';
    group.dataset.disclosure = 'workspace';
    group.setAttribute('aria-expanded', String(workspaceExpanded));
    group.append('Workspace');
    const marker = document.createElement('span');
    marker.className = 'disclosure-mark';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = workspaceExpanded ? '⌄' : '›';
    group.append(marker);
    navigation.append(group);

    if (workspaceExpanded || term) nested.forEach((item) => navigation.append(makeDestination(item)));
  }
  sections.forEach((item) => navigation.append(makeDestination(item)));

  if (!navigation.children.length) {
    const empty = document.createElement('p');
    empty.className = 'no-results';
    empty.textContent = 'No matching navigation items.';
    navigation.append(empty);
  }
}

function renderShell() {
  shell.dataset.palette = palette;
  shell.classList.toggle('drawer-is-hidden', !drawerVisible);

  const drawerAction = drawerVisible ? 'Hide navigation' : 'Show navigation';
  drawerButton.setAttribute('aria-label', drawerAction);
  drawerButton.title = drawerAction;
  drawerButton.setAttribute('aria-expanded', String(drawerVisible));

  const paletteAction = palette === 'light' ? 'Switch to dark palette' : 'Switch to light palette';
  paletteButton.setAttribute('aria-label', paletteAction);
  paletteButton.title = paletteAction;
  paletteButton.querySelector('.palette-symbol').textContent = palette === 'light' ? '◐' : '☼';

  renderNavigation();
  updateAddress();
}

drawerButton.addEventListener('click', () => {
  drawerVisible = !drawerVisible;
  renderShell();
});

paletteButton.addEventListener('click', () => {
  palette = palette === 'light' ? 'dark' : 'light';
  renderShell();
});

filterField.addEventListener('input', renderNavigation);

navigation.addEventListener('click', (event) => {
  const group = event.target.closest('[data-disclosure]');
  const destination = event.target.closest('[data-destination]');
  if (group) {
    workspaceExpanded = !workspaceExpanded;
    renderNavigation();
  } else if (destination) {
    selectedId = destination.dataset.destination;
    renderNavigation();
  }
});

for (let number = 1; number <= 80; number += 1) {
  const item = document.createElement('li');
  item.setAttribute('aria-label', `Fixture item ${number}`);
  item.textContent = String(number);
  fixture.append(item);
}

renderShell();
