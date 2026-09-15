(() => {
  const form = document.querySelector('#customer-search-form');
  const gridBody = document.querySelector('.customer-grid tbody');

  form?.addEventListener('submit', (event) => event.preventDefault());
  document.querySelectorAll('[data-not-implemented]').forEach((control) => {
    control.addEventListener('click', (event) => event.preventDefault());
  });
  gridBody?.addEventListener('scroll', () => {
    gridBody.classList.toggle('is-scrolled', gridBody.scrollLeft > 0);
  });
})();
