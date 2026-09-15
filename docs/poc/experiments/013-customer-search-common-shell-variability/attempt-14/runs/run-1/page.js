(function () {
  const note = document.querySelector('[data-screen-note]');
  const form = document.querySelector('[data-search-form]');

  function showNote(message) {
    note.textContent = message;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    showNote('検索結果の更新はこの静的ページでは実装していません。');
  });

  form.addEventListener('reset', function () {
    showNote('検索条件をリセットしました。');
  });

  document.querySelectorAll('[data-record-link], [data-add-customer], [data-next-page]').forEach(function (control) {
    control.addEventListener('click', function (event) {
      event.preventDefault();
      showNote('この静的ページでは遷移を実装していません。');
    });
  });
}());
