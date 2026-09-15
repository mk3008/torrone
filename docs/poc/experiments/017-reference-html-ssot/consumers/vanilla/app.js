(() => {
  const root = document.documentElement;
  const shell = document.querySelector('.shell');
  const navigation = document.querySelector('[data-ref="primary-navigation"]');
  const navigationToggle = document.querySelector('[data-ref="navigation-toggle"]');
  const themeToggle = document.querySelector('[data-ref="theme-toggle"]');
  const filterToggle = document.querySelector('[data-ref="filter-toggle"]');
  const filterPanel = document.querySelector('[data-ref="filter-panel"]');
  const resultSummary = document.querySelector('[data-ref="result-summary"]');
  const dialog = document.querySelector('[data-ref="detail-dialog"]');
  const detailAction = document.querySelector('[data-ref="detail-action"]');
  const dialogClose = document.querySelector('[data-ref="dialog-close"]');

  function setNavigation(open) {
    navigation.hidden = !open;
    shell.classList.toggle('navigation-hidden', !open);
    navigationToggle.setAttribute('aria-expanded', String(open));
    navigationToggle.setAttribute('aria-label', open ? 'Hide navigation' : 'Show navigation');
  }

  function setFilters(open) {
    filterPanel.hidden = !open;
    filterToggle.setAttribute('aria-expanded', String(open));
    filterToggle.textContent = open ? 'Hide filters' : 'Show filters';
  }

  navigationToggle.addEventListener('click', () => setNavigation(navigation.hidden));
  filterToggle.addEventListener('click', () => setFilters(filterPanel.hidden));

  themeToggle.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  });

  filterPanel.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(filterPanel);
    const warehouse = String(data.get('warehouse') || '').toLowerCase().split(' ')[0];
    const severity = String(data.get('severity') || '');
    let visible = 0;
    document.querySelectorAll('tbody tr').forEach((row) => {
      const matches = (!warehouse || row.dataset.warehouse === warehouse) && (!severity || row.dataset.severity === severity);
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    resultSummary.textContent = `${visible} ${visible === 1 ? 'exception' : 'exceptions'}`;
  });

  filterPanel.addEventListener('reset', () => {
    requestAnimationFrame(() => {
      document.querySelectorAll('tbody tr').forEach((row) => { row.hidden = false; });
      resultSummary.textContent = '4 exceptions';
    });
  });

  detailAction.addEventListener('click', () => dialog.showModal());
  dialogClose.addEventListener('click', () => dialog.close());
})();
