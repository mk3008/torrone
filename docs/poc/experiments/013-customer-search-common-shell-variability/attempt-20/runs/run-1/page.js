(function () {
  const page = document.querySelector('.customer-page');
  const form = page.querySelector('.condition-pane form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}());
