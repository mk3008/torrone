(function () {
  const form = document.querySelector('#customer-search-form');
  const gridScroll = document.querySelector('[data-grid-scroll]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  function renderScrollState() {
    gridScroll.classList.toggle('is-scrolled', gridScroll.scrollLeft > 0);
  }

  gridScroll.addEventListener('scroll', renderScrollState, { passive: true });
  renderScrollState();
}());
