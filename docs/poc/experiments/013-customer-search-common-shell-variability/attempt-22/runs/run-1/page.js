(function () {
  const gridScroll = document.querySelector('#customer-grid-scroll');

  if (gridScroll) {
    gridScroll.addEventListener('scroll', function () {
      gridScroll.classList.toggle('is-scrolled', gridScroll.scrollLeft > 0);
    });
  }
}());
