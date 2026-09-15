(() => {
  document.querySelector('#search-form').addEventListener('submit', (event) => event.preventDefault());
  document.querySelectorAll('.record-id a').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
})();
