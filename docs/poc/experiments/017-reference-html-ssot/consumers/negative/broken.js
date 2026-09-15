(() => {
  const themeToggle = document.querySelector('[data-ref="theme-toggle"]');
  const filterToggle = document.querySelector('[data-ref="filter-toggle"]');
  const dialog = document.querySelector('[data-ref="detail-dialog"]');

  themeToggle.removeAttribute('aria-label');
  filterToggle.style.borderRadius = '0px';
  dialog.addEventListener('cancel', (event) => event.preventDefault());
})();
