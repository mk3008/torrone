(() => {
  const all = (selector) => [...document.querySelectorAll(selector)];
  const byRef = (key) => document.querySelector(`[data-ref="${key}"]`);
  const node = {
    body: document.body,
    workbench: document.querySelector('.workbench'),
    drawer: document.getElementById('badge-route-drawer'),
    subtree: document.getElementById('badge-access-routes'),
    profile: document.getElementById('badge-profile-popover'),
    profileCommand: document.querySelector('[data-ui="menu-command"]'),
    form: document.getElementById('badge-query-form'),
    routeItems: all('[data-route-item]'),
    routes: all('[data-route]'),
    initial: byRef('result-initial'),
    empty: byRef('result-empty'),
    grid: document.querySelector('.grid-scroll'),
    live: document.querySelector('[aria-live="polite"]')
  };

  const model = {
    drawer: true,
    routeGroup: true,
    dark: false,
    profile: false,
    filters: true,
    results: 'initial',
    page: 1
  };

  const text = {
    result: {
      initial: 'Search has not been run.',
      empty: 'No badge renewals found.',
      results: 'Badge renewal results are displayed.'
    }
  };

  const badgePages = [
    [
      { id: 'BADGE-5182', holder: 'Casey Morgan', place: 'South Campus', date: 'Sep 30, 2026', access: 'Standard', status: 'Manager review' },
      { id: 'BADGE-5167', holder: 'Riley Patel', place: 'Harbor Annex', date: 'Oct 5, 2026', access: 'Restricted lab', status: 'Security review' },
      { id: 'BADGE-5149', holder: 'Jamie Torres', place: 'North Operations', date: 'Oct 11, 2026', access: 'Standard', status: 'On hold' }
    ],
    [
      { id: 'BADGE-5128', holder: 'Taylor Kim', place: 'East Warehouse', date: 'Oct 15, 2026', access: 'Elevated', status: 'Manager review' },
      { id: 'BADGE-5104', holder: 'Robin Hayes', place: 'Civic Center', date: 'Oct 18, 2026', access: 'Standard', status: 'Security review' },
      { id: 'BADGE-5089', holder: 'Drew Singh', place: 'Research Annex', date: 'Oct 22, 2026', access: 'Restricted lab', status: 'Review scheduled' }
    ]
  ];

  function renderBadgeRows() {
    const records = badgePages[model.page - 1];
    all('tbody tr').forEach((row, index) => {
      const record = records[index];
      const cells = [...row.cells];
      const link = cells[0].querySelector('a');
      link.textContent = record.id;
      link.href = `#badge-${record.id}`;
      [record.holder, record.place, record.date, record.access].forEach((value, offset) => {
        cells[offset + 1].textContent = value;
      });
      if (index === 0) cells[5].querySelector('[data-ref="status-badge"]').textContent = record.status;
      else cells[5].textContent = record.status;
    });
  }

  function render(focusReturn = false) {
    const navToggle = byRef('navigation-toggle');
    const routeParent = byRef('navigation-parent');
    const themeToggle = byRef('theme-toggle');
    const profileToggle = byRef('user-menu-toggle');
    const filterToggle = byRef('filter-toggle');
    const previous = byRef('page-previous');
    const next = byRef('page-next');

    node.workbench.dataset.drawer = model.drawer ? 'open' : 'closed';
    node.drawer.hidden = !model.drawer;
    navToggle.setAttribute('aria-expanded', String(model.drawer));
    navToggle.setAttribute('aria-label', model.drawer ? 'Hide navigation' : 'Show navigation');
    node.subtree.hidden = !model.routeGroup;
    routeParent.setAttribute('aria-expanded', String(model.routeGroup));
    node.body.dataset.colorMode = model.dark ? 'night' : 'day';
    themeToggle.setAttribute('aria-pressed', String(model.dark));
    themeToggle.setAttribute('aria-label', model.dark ? 'Use light theme' : 'Use dark theme');
    node.profile.hidden = !model.profile;
    profileToggle.setAttribute('aria-expanded', String(model.profile));
    profileToggle.setAttribute('aria-label', model.profile ? 'Close user menu' : 'Open user menu');
    node.form.hidden = !model.filters;
    filterToggle.setAttribute('aria-expanded', String(model.filters));
    filterToggle.textContent = model.filters ? 'Hide filters' : 'Show filters';
    node.initial.hidden = model.results !== 'initial';
    node.empty.hidden = model.results !== 'empty';
    node.grid.hidden = model.results !== 'results';
    byRef('result-pagination').hidden = model.results !== 'results';
    node.live.textContent = text.result[model.results];
    byRef('page-current').textContent = `Page ${model.page}`;
    previous.disabled = model.page === 1;
    next.disabled = model.page === 2;
    renderBadgeRows();

    if (model.profile) node.profileCommand.focus();
    else if (focusReturn) profileToggle.focus();
  }

  const actions = {
    'navigation-toggle': () => { model.drawer = !model.drawer; },
    'navigation-parent': () => { model.routeGroup = !model.routeGroup; },
    'theme-toggle': () => { model.dark = !model.dark; },
    'user-menu-toggle': () => { model.profile = !model.profile; },
    'filter-toggle': () => { model.filters = !model.filters; },
    'page-previous': () => { model.page = 1; },
    'page-next': () => { model.page = 2; }
  };

  document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-ref]');
    const action = control && actions[control.dataset.ref];
    if (action) {
      action();
      render();
    }

    const route = event.target.closest('[data-route]');
    if (route) {
      node.routes.forEach((item) => item.removeAttribute('aria-current'));
      route.setAttribute('aria-current', 'page');
    }
  });

  byRef('navigation-filter').addEventListener('input', (event) => {
    const query = event.currentTarget.value.trim().toLowerCase();
    let visible = 0;
    node.routeItems.forEach((item) => {
      const ownRoute = item.querySelector(':scope > [data-route]');
      if (!ownRoute) return;
      const match = !query || ownRoute.textContent.toLowerCase().includes(query);
      item.hidden = !match;
      if (match) visible += 1;
    });
    const childMatch = [...node.subtree.children].some((item) => !item.hidden);
    byRef('navigation-parent').closest('li').hidden = Boolean(query) && !childMatch;
    if (query && childMatch) model.routeGroup = true;
    byRef('navigation-empty').hidden = visible > 0;
    render();
  });

  node.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const empty = byRef('query-filter').value.trim().toLowerCase() === 'nothing found';
    model.results = empty ? 'empty' : 'results';
    model.page = 1;
    render();
  });

  node.form.addEventListener('reset', () => {
    setTimeout(() => {
      model.results = 'initial';
      model.page = 1;
      render();
    }, 0);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && model.profile) {
      event.preventDefault();
      model.profile = false;
      render(true);
    }
  });
})();
