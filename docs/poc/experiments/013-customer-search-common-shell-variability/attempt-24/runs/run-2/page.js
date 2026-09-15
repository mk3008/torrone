(() => {
  const form = document.querySelector('#customer-search-form');
  const resetButton = document.querySelector('#reset-button');
  const grid = document.querySelector('#grid-scroll');

  form.addEventListener('submit', event => {
    event.preventDefault();
  });

  resetButton.addEventListener('click', () => {
    window.setTimeout(() => form.querySelector('input').focus(), 0);
  });

  grid.addEventListener('scroll', () => {
    grid.classList.toggle('is-scrolled', grid.scrollLeft > 0);
  }, { passive: true });
})();
