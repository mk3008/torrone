(() => {
  const form = document.querySelector('#customer-search-form');
  const gridScroll = document.querySelector('#grid-scroll');

  form?.addEventListener('submit', (event) => event.preventDefault());
  gridScroll?.addEventListener('scroll', () => {
    gridScroll.classList.toggle('is-scrolled', gridScroll.scrollLeft > 0);
  }, { passive: true });
})();
