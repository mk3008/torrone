(() => {
  const message = document.querySelector('.screen-message');
  const form = document.querySelector('#customer-search-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = '検索条件を受け付けました。静的な画面のため結果は更新されません。';
  });

  form.addEventListener('reset', () => {
    message.textContent = '検索条件をリセットしました。';
  });

  document.querySelector('[data-add-customer]').addEventListener('click', () => {
    message.textContent = '顧客追加はこの静的な画面では開始されません。';
  });

  document.querySelector('[data-next-page]').addEventListener('click', () => {
    message.textContent = '次のページはこの静的な画面では表示されません。';
  });

  document.querySelectorAll('[data-customer-id]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      message.textContent = `顧客ID ${link.dataset.customerId} の詳細はこの静的な画面では表示されません。`;
    });
  });
})();
