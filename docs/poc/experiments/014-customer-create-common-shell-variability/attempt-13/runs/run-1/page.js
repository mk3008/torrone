(() => {
  const form = document.querySelector('#customer-form');
  const summary = document.querySelector('#error-summary');
  const errorList = document.querySelector('#error-list');
  const fields = [...form.querySelectorAll('input, textarea')];
  const isValidDate = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };
  const rules = {
    name: value => value.trim() ? '' : '氏名を入力してください。',
    birthdate: value => !value.trim() ? '生年月日を入力してください。' : isValidDate(value) ? '' : '生年月日はYYYY-MM-DD形式で入力してください。',
    address: value => value.trim() ? '' : '住所を入力してください。',
    phone: value => !value.trim() ? '電話番号を入力してください。' : /^[0-9]+(?:-[0-9]+)+$/.test(value) ? '' : '電話番号は数字とハイフンを使用して入力してください。',
    email: value => !value.trim() ? 'メールアドレスを入力してください。' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'メールアドレスはuser@example.com形式で入力してください。',
    notes: () => ''
  };
  function messageFor(field) { return document.querySelector(`#${field.id}-message`); }
  function validate(field) {
    const message = rules[field.name](field.value);
    const holder = field.closest('.field');
    holder.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
    messageFor(field).textContent = message || (field.id === 'birthdate' ? '生年月日はYYYY-MM-DD形式で入力してください。' : field.id === 'phone' ? '電話番号は数字とハイフンを使用して入力してください。' : field.id === 'email' ? 'メールアドレスはuser@example.com形式で入力してください。' : '');
    return message;
  }
  fields.forEach(field => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const errors = fields.map(field => ({ field, message: validate(field) })).filter(entry => entry.message);
    summary.hidden = errors.length === 0;
    errorList.replaceChildren(...errors.map(({ field, message }) => { const item = document.createElement('li'); const button = document.createElement('button'); button.type = 'button'; button.textContent = message; button.addEventListener('click', () => field.focus()); item.append(button); return item; }));
    if (errors.length) summary.focus();
  });
})();
