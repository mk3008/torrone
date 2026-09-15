(() => {
  const form = document.querySelector('#customer-form');
  const summary = document.querySelector('#error-summary');
  const list = document.querySelector('#error-list');
  const fields = [...form.querySelectorAll('input, textarea')];
  const rules = {
    name: value => value.trim() ? '' : '氏名を入力してください。',
    birthdate: value => !value.trim() ? '生年月日を入力してください。' : /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) ? '' : '生年月日はYYYY-MM-DD形式で入力してください。',
    address: value => value.trim() ? '' : '住所を入力してください。',
    phone: value => !value.trim() ? '電話番号を入力してください。' : /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/.test(value) ? '' : '電話番号は数字とハイフンを使用して入力してください。',
    email: value => !value.trim() ? 'メールアドレスを入力してください。' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'メールアドレスはname@example.com形式で入力してください。',
    notes: () => ''
  };
  function validate(field) { const message = rules[field.name](field.value); const region = document.querySelector(`#${field.id}-message`); field.classList.toggle('is-invalid', Boolean(message)); field.setAttribute('aria-invalid', String(Boolean(message))); region.textContent = message || (field.name === 'birthdate' ? '生年月日はYYYY-MM-DD形式で入力してください。' : field.name === 'phone' ? '電話番号は数字とハイフンを使用して入力してください。' : field.name === 'email' ? 'メールアドレスはname@example.com形式で入力してください。' : '\u00a0'); region.classList.toggle('is-error', Boolean(message)); return message; }
  function updateSummary() { const invalid = fields.map(field => [field, rules[field.name](field.value)]).filter(([, message]) => message); summary.hidden = !invalid.length; list.innerHTML = invalid.map(([field, message]) => `<li><button type="button" data-field="${field.id}">${message}</button></li>`).join(''); return invalid; }
  fields.forEach(field => { field.addEventListener('blur', () => { validate(field); updateSummary(); }); field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') { validate(field); updateSummary(); } }); });
  form.addEventListener('submit', event => { event.preventDefault(); fields.forEach(validate); const invalid = updateSummary(); if (invalid.length) summary.focus(); });
  list.addEventListener('click', event => { const button = event.target.closest('[data-field]'); if (button) document.querySelector(`#${button.dataset.field}`).focus(); });
})();
