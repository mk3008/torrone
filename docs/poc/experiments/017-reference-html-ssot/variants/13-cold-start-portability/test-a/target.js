(() => {
  const one = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const ui = {
    body: document.body,
    layout: one('.inspection-layout'),
    drawer: one('#inspection-sections'),
    drawerToggle: one('[data-ref="navigation-toggle"]'),
    groupToggle: one('[data-ref="navigation-parent"]'),
    group: one('#inspection-section-children'),
    drawerQuery: one('[data-ref="navigation-filter"]'),
    drawerEmpty: one('[data-ref="navigation-empty"]'),
    profileToggle: one('[data-ref="user-menu-toggle"]'),
    profileMenu: one('#inspection-operator-menu'),
    theme: one('[aria-pressed]'),
    filterToggle: one('[data-ref="filters-toggle"]'),
    form: one('#inspection-query-form'),
    query: one('[data-ref="search-query"]'),
    initial: one('[data-ref="result-initial"]'),
    empty: one('[data-ref="result-empty"]'),
    tableBox: one('.finding-table-scroll'),
    pager: one('[data-ref="result-pagination"]'),
    back: one('[data-ref="page-previous"]'),
    forward: one('[data-ref="page-next"]'),
    pageLabel: one('.active-page'),
    live: one('[aria-live="polite"]')
  };
  const model = { drawerOpen: true, groupOpen: true, menuOpen: false, filtersOpen: true, result: 'initial', page: 1, dark: false };

  const render = {
    drawer() {
      ui.drawer.hidden = !model.drawerOpen;
      ui.layout.classList.toggle('nav-hidden', !model.drawerOpen);
      ui.drawerToggle.setAttribute('aria-expanded', String(model.drawerOpen));
      ui.drawerToggle.setAttribute('aria-label', model.drawerOpen ? 'Collapse navigation' : 'Expand navigation');
    },
    group() {
      ui.group.hidden = !model.groupOpen;
      ui.groupToggle.setAttribute('aria-expanded', String(model.groupOpen));
    },
    menu(restore = false) {
      ui.profileMenu.hidden = !model.menuOpen;
      ui.profileToggle.setAttribute('aria-expanded', String(model.menuOpen));
      ui.profileToggle.setAttribute('aria-label', model.menuOpen ? 'Hide operator menu' : 'Show operator menu');
      if (model.menuOpen) one('#inspection-operator-menu [role="menuitem"]').focus();
      else if (restore) ui.profileToggle.focus();
    },
    theme() {
      ui.body.dataset.skin = model.dark ? 'night' : 'day';
      ui.theme.setAttribute('aria-pressed', String(model.dark));
      ui.theme.setAttribute('aria-label', model.dark ? 'Switch to light theme' : 'Switch to dark theme');
    },
    filters() {
      ui.form.hidden = !model.filtersOpen;
      ui.filterToggle.setAttribute('aria-expanded', String(model.filtersOpen));
      ui.filterToggle.textContent = model.filtersOpen ? 'Hide filters' : 'Show filters';
    },
    result() {
      ui.initial.hidden = model.result !== 'initial';
      ui.empty.hidden = model.result !== 'empty';
      ui.tableBox.hidden = model.result !== 'results';
      ui.pager.hidden = model.result !== 'results';
      all('[data-finding-page]').forEach((group) => { group.hidden = Number(group.dataset.findingPage) !== model.page; });
      ui.back.disabled = model.page === 1;
      ui.forward.disabled = model.page === 2;
      ui.pageLabel.textContent = `Page ${model.page}`;
      ui.live.textContent = model.result === 'initial'
        ? 'Search has not been run.'
        : model.result === 'empty'
          ? 'No inspection findings found.'
          : 'Inspection finding results are displayed.';
    }
  };

  ui.drawerToggle.addEventListener('click', () => { model.drawerOpen = !model.drawerOpen; render.drawer(); });
  ui.groupToggle.addEventListener('click', () => { model.groupOpen = !model.groupOpen; render.group(); });
  ui.drawerQuery.addEventListener('input', () => {
    const text = ui.drawerQuery.value.trim().toLowerCase();
    let shown = 0;
    all('[data-drawer-entry]').forEach((entry) => {
      const link = entry.querySelector(':scope > .section-link');
      if (!link) return;
      const match = !text || link.textContent.toLowerCase().includes(text);
      entry.hidden = !match;
      if (match) shown += 1;
    });
    const hasChild = [...ui.group.children].some((entry) => !entry.hidden);
    ui.groupToggle.closest('li').hidden = Boolean(text) && !hasChild;
    if (text && hasChild) { model.groupOpen = true; render.group(); }
    ui.drawerEmpty.hidden = shown > 0;
  });
  all('.section-link').forEach((link) => link.addEventListener('click', () => {
    all('.section-link').forEach((candidate) => candidate.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
  }));
  ui.profileToggle.addEventListener('click', () => { model.menuOpen = !model.menuOpen; render.menu(); });
  ui.theme.addEventListener('click', () => { model.dark = !model.dark; render.theme(); });
  ui.filterToggle.addEventListener('click', () => { model.filtersOpen = !model.filtersOpen; render.filters(); });
  ui.form.addEventListener('submit', (event) => {
    event.preventDefault();
    model.result = ui.query.value.trim().toLowerCase() === 'no inspection' ? 'empty' : 'results';
    model.page = 1;
    render.result();
  });
  ui.form.addEventListener('reset', () => setTimeout(() => {
    model.result = 'initial';
    model.page = 1;
    render.result();
  }, 0));
  ui.back.addEventListener('click', () => { model.page = 1; render.result(); });
  ui.forward.addEventListener('click', () => { model.page = 2; render.result(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && model.menuOpen) {
      event.preventDefault();
      model.menuOpen = false;
      render.menu(true);
    }
  });
})();
