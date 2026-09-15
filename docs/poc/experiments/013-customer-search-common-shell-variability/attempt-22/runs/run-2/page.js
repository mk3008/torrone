(function () {
  const form = document.querySelector('#customer-search-form');
  const message = document.querySelector('#search-message');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    message.textContent = 'この静的ページでは検索結果は更新されません。';
  });

  form.addEventListener('reset', function () {
    message.textContent = '検索条件をクリアしました。';
  });

  const gridScroll = document.querySelector('.grid-scroll');
  function renderGridScrollState() {
    gridScroll.classList.toggle('is-scrolled', gridScroll.scrollLeft > 0);
  }
  gridScroll.addEventListener('scroll', renderGridScrollState, { passive: true });
  renderGridScrollState();
}());
