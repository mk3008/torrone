(function () {
  const form = document.querySelector('[data-search-form]');
  const searchMessage = document.querySelector('[data-search-message]');
  const pageMessage = document.querySelector('[data-page-message]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    searchMessage.textContent = '静的サンプルのため、検索結果は更新されません。';
  });

  form.addEventListener('reset', function () {
    searchMessage.textContent = '検索条件をリセットしました。';
  });

  document.querySelectorAll('[data-customer-id]').forEach(function (button) {
    button.addEventListener('click', function () {
      pageMessage.textContent = `${button.dataset.customerId} の詳細確認は、この静的サンプルでは遷移しません。`;
    });
  });

  document.querySelector('[data-add-customer]').addEventListener('click', function () {
    pageMessage.textContent = '顧客追加は、この静的サンプルでは遷移しません。';
  });

  document.querySelector('[data-next-page]').addEventListener('click', function () {
    pageMessage.textContent = 'ページ移動は、この静的サンプルでは実装しません。';
  });
}());
