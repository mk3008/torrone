(function () {
  const form = document.querySelector('[data-search-form]');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}());
