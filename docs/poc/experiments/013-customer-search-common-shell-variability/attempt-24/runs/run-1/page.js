(() => {
  const form = document.querySelector('#customer-search-form');
  form.addEventListener('submit', (event) => event.preventDefault());
  document.querySelectorAll('.identity a').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
})();
