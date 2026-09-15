(function () {
  const form = document.querySelector('#customer-search-form');
  const message = document.querySelector('.customer-message');
  form.addEventListener('submit', function (event) { event.preventDefault(); message.textContent = '検索はこの静的ページでは実行されません。'; });
  form.addEventListener('reset', function () { message.textContent = '検索条件をリセットしました。'; });
  document.querySelectorAll('[data-detail-id]').forEach(function (button) { button.addEventListener('click', function () { message.textContent = `顧客ID ${button.dataset.detailId} の詳細確認はこの静的ページでは遷移しません。`; }); });
  document.querySelector('[data-add-customer]').addEventListener('click', function () { message.textContent = '顧客追加はこの静的ページでは実行されません。'; });
}());
