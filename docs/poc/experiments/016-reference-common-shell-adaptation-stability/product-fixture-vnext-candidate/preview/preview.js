const shell = document.querySelector('.shell');
const drawerControl = document.querySelector('.drawer-control');
const themeControl = document.querySelector('.theme-control');
const searchInput = document.querySelector('#navigation-search');
const navigationList = document.querySelector('.navigation-list');

const params = new URLSearchParams(location.search);
let drawerOpen = params.get('drawer') !== 'hidden';
let theme = params.get('theme') === 'dark' ? 'dark' : 'light';
let fixture;
let groupExpanded;
let currentDestination;

function icon(paths) {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`;
}

function disclosureIcon(expanded) {
  return expanded
    ? '<path d="m6 9 6 6 6-6" />'
    : '<path d="m9 18 6-6-6-6" />';
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
}

function destinationRow(item, child = false) {
  const current = item.id === currentDestination;
  return `<button class="navigation-row${child ? ' child' : ''}" type="button" data-destination="${escapeHtml(item.id)}"${current ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</button>`;
}

function renderNavigation() {
  const query = searchInput.value.trim().toLowerCase();
  const rows = [];

  fixture.navigation.forEach((item) => {
    if (item.role === 'top-level') {
      if (!query || item.label.toLowerCase().includes(query)) rows.push(destinationRow(item));
      return;
    }

    const matchingChildren = item.children.filter((child) => !query || child.label.toLowerCase().includes(query));
    const groupMatches = !query || item.label.toLowerCase().includes(query) || matchingChildren.length > 0;
    if (!groupMatches) return;

    rows.push(`<button class="navigation-row group-row" type="button" data-disclosure="true" aria-expanded="${groupExpanded}"><span>${escapeHtml(item.label)}</span><svg class="disclosure" aria-hidden="true" viewBox="0 0 24 24">${disclosureIcon(groupExpanded)}</svg></button>`);
    if (groupExpanded || query) rows.push(...matchingChildren.map((child) => destinationRow(child, true)));
  });

  navigationList.innerHTML = rows.length ? rows.join('') : `<p class="no-matches">${escapeHtml(fixture.search.emptyMessage)}</p>`;
}

function renderShell() {
  shell.dataset.theme = theme;
  shell.classList.toggle('drawer-hidden', !drawerOpen);

  const nextDrawerAction = drawerOpen ? 'Hide navigation' : 'Show navigation';
  drawerControl.setAttribute('aria-label', nextDrawerAction);
  drawerControl.title = nextDrawerAction;
  drawerControl.innerHTML = drawerOpen
    ? icon('<path d="M4 5h16v14H4zM9 5v14M15 9l-3 3 3 3" />')
    : icon('<path d="M4 5h16v14H4zM9 5v14M12 9l3 3-3 3" />');

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  themeControl.setAttribute('aria-label', `Switch to ${nextTheme} palette`);
  themeControl.title = `Switch to ${nextTheme} palette`;
  themeControl.innerHTML = theme === 'light'
    ? icon('<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8z" />')
    : icon('<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />');

  renderNavigation();
}

async function initialize() {
  const response = await fetch('../fixture.json');
  if (!response.ok) throw new Error(`Could not load fixture candidate: ${response.status}`);
  fixture = await response.json();
  groupExpanded = fixture.initial.workspaceExpanded;
  currentDestination = fixture.initial.currentDestination;

  document.querySelector('.workspace-name').textContent = fixture.applicationName;
  document.querySelector('.drawer-search label').textContent = fixture.search.label;
  searchInput.setAttribute('aria-label', fixture.search.label);
  searchInput.placeholder = fixture.search.placeholder;
  document.querySelector('#workspace-heading').textContent = fixture.main.heading;
  document.querySelector('.workspace-description').textContent = fixture.main.description;
  document.querySelector('.fixture-list').innerHTML = Array.from(
    { length: fixture.main.itemCount },
    (_, index) => `<li>${index + 1}</li>`
  ).join('');

  drawerControl.addEventListener('click', () => {
    drawerOpen = !drawerOpen;
    renderShell();
  });
  themeControl.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    renderShell();
  });
  searchInput.addEventListener('input', renderNavigation);
  navigationList.addEventListener('click', (event) => {
    const disclosure = event.target.closest('[data-disclosure]');
    const destination = event.target.closest('[data-destination]');
    if (disclosure) {
      groupExpanded = !groupExpanded;
      renderNavigation();
    } else if (destination) {
      currentDestination = destination.dataset.destination;
      renderNavigation();
    }
  });

  renderShell();
}

initialize().catch((error) => {
  navigationList.innerHTML = `<p class="no-matches">${escapeHtml(error.message)}</p>`;
});
