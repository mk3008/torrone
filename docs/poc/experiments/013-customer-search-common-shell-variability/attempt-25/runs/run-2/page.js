(() => {
  const form = document.querySelector('#search-form');
  const grid = document.querySelector('#grid-scroll');

  form.addEventListener('submit', event => {
    event.preventDefault();
  });

  grid.addEventListener('scroll', () => {
    grid.classList.toggle('has-horizontal-offset', grid.scrollLeft > 0);
  }, { passive: true });
})();
