(function () {
  const form = document.querySelector('[data-search-form]');

  if (form) {
    form.addEventListener('reset', function () {
      window.setTimeout(function () {
        form.querySelector('input')?.focus();
      }, 0);
    });
  }
}());
