(() => {
  const body = document.body;
  const shell = document.querySelector('.shell-grid');
  const navigation = document.getElementById('supplier-primary-navigation');
  const navigationToggle = document.querySelector('[data-ref="navigation-toggle"]');
  const navigationParent = document.querySelector('[data-ref="navigation-parent"]');
  const navigationChildren = document.getElementById('supplier-navigation-children');
  const navigationFilter = document.querySelector('[data-ref="navigation-filter"]');
  const navigationItems = [...document.querySelectorAll('[data-navigation-item]')];
  const navigationEmpty = document.querySelector('[data-ref="navigation-empty"]');
  const navigationLinks = [...document.querySelectorAll('.navigation-link')];
  const themeToggle = document.querySelector('[aria-pressed]');
  const userMenuToggle = document.querySelector('[data-ref="user-menu-toggle"]');
  const userMenu = document.getElementById('supplier-user-menu');
  const menuCommand = userMenu.querySelector('[role="menuitem"]');
  const filtersToggle = document.querySelector('[data-ref="filters-toggle"]');
  const filterForm = document.getElementById('supplier-filter-form');
  const searchQuery = document.querySelector('[data-ref="search-query"]');
  const initialState = document.querySelector('[data-ref="result-initial"]');
  const emptyState = document.querySelector('[data-ref="result-empty"]');
  const tableWrap = document.querySelector('.table-wrap');
  const resultPages = [...document.querySelectorAll('[data-result-page]')];
  const pagination = document.querySelector('[data-ref="result-pagination"]');
  const previous = document.querySelector('[data-ref="page-previous"]');
  const next = document.querySelector('[data-ref="page-next"]');
  const pageNumber = document.querySelector('.page-number');
  const summary = document.querySelector('[aria-live="polite"]');
  let currentPage = 1;

  function showNavigation(open) {
    navigationToggle.setAttribute('aria-expanded', String(open));
    navigationToggle.setAttribute('aria-label', open ? 'Hide navigation' : 'Show navigation');
    shell.dataset.navigationOpen = String(open);
    navigation.hidden = !open;
  }

  function expandNavigationGroup(open) {
    navigationParent.setAttribute('aria-expanded', String(open));
    navigationChildren.hidden = !open;
  }

  function applyNavigationFilter() {
    const term = navigationFilter.value.trim().toLowerCase();
    let visibleLeaves = 0;
    navigationItems.forEach((item) => {
      const ownLink = item.querySelector(':scope > .navigation-link');
      if (!ownLink) return;
      const visible = !term || ownLink.textContent.toLowerCase().includes(term);
      item.hidden = !visible;
      if (visible) visibleLeaves += 1;
    });
    const childVisible = [...navigationChildren.children].some((item) => !item.hidden);
    navigationParent.closest('li').hidden = Boolean(term) && !childVisible;
    if (term && childVisible) expandNavigationGroup(true);
    navigationEmpty.hidden = visibleLeaves > 0;
  }

  function showMenu(open, restoreFocus = false) {
    userMenuToggle.setAttribute('aria-expanded', String(open));
    userMenuToggle.setAttribute('aria-label', open ? 'Close user menu' : 'Open user menu');
    userMenu.hidden = !open;
    if (open) menuCommand.focus();
    else if (restoreFocus) userMenuToggle.focus();
  }

  function showFilters(open) {
    filtersToggle.setAttribute('aria-expanded', String(open));
    filtersToggle.textContent = open ? 'Hide filters' : 'Show filters';
    filterForm.hidden = !open;
  }

  function showPage(page) {
    currentPage = page;
    resultPages.forEach((tbody) => { tbody.hidden = Number(tbody.dataset.resultPage) !== currentPage; });
    previous.disabled = currentPage === 1;
    next.disabled = currentPage === 2;
    pageNumber.textContent = `Page ${currentPage}`;
  }

  function showResultState(state) {
    initialState.hidden = state !== 'initial';
    emptyState.hidden = state !== 'empty';
    tableWrap.hidden = state !== 'results';
    pagination.hidden = state !== 'results';
    if (state === 'results') showPage(1);
    summary.textContent = state === 'initial'
      ? 'Search has not been run.'
      : state === 'empty'
        ? 'No supplier reviews found.'
        : 'Supplier review results are displayed.';
  }

  navigationToggle.addEventListener('click', () => showNavigation(navigationToggle.getAttribute('aria-expanded') !== 'true'));
  navigationParent.addEventListener('click', () => expandNavigationGroup(navigationParent.getAttribute('aria-expanded') !== 'true'));
  navigationFilter.addEventListener('input', applyNavigationFilter);
  navigationLinks.forEach((link) => link.addEventListener('click', () => {
    navigationLinks.forEach((item) => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
  }));
  themeToggle.addEventListener('click', () => {
    const dark = themeToggle.getAttribute('aria-pressed') !== 'true';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    body.dataset.theme = dark ? 'dark' : 'light';
  });
  userMenuToggle.addEventListener('click', () => showMenu(userMenuToggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && userMenuToggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      showMenu(false, true);
    }
  });
  filtersToggle.addEventListener('click', () => showFilters(filtersToggle.getAttribute('aria-expanded') !== 'true'));
  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showResultState(searchQuery.value.trim().toLowerCase() === 'no supplier record' ? 'empty' : 'results');
  });
  filterForm.addEventListener('reset', () => setTimeout(() => showResultState('initial'), 0));
  previous.addEventListener('click', () => showPage(1));
  next.addEventListener('click', () => showPage(2));
})();
