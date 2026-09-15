(() => {
  const form = document.querySelector('#customer-search-form');
  const grid = document.querySelector('#grid-scroll');
  form.addEventListener('submit', (event) => event.preventDefault());
  document.querySelectorAll('.identity a').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
  grid.addEventListener('scroll', () => grid.classList.toggle('is-scrolled', grid.scrollLeft > 0));
})();
