(function () {
  const scrollArea = document.querySelector('.table-scroll');

  if (!scrollArea) return;

  function reflectScrollPosition() {
    scrollArea.classList.toggle('is-scrolled', scrollArea.scrollLeft > 0);
  }

  scrollArea.addEventListener('scroll', reflectScrollPosition, { passive: true });
  reflectScrollPosition();
}());
