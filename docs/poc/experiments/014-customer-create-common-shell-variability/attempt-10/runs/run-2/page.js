(() => {
  const form = document.querySelector('.customer-form');
  if (!form) return;

  const errorSummary = document.querySelector('#form-errors');
  const fields = [
    { id: 'customer-name', label: '氏名', required: true },
    { id: 'birth-date', label: '生年月日', required: true, pattern: /^\d{4}-\d{2}-\d{2}$/, format: '生年月日は YYYY-MM-DD 形式で入力してください。' },
    { id: 'address', label: '住所', required: true },
    { id: 'telephone', label: '電話番号', required: true, pattern: /^[0-9]+(?:-[0-9]+){1,3}$/, format: '電話番号は数字とハイフンを使用して入力してください。' },
    { id: 'email', label: 'メールアドレス', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, format: 'メールアドレスは name@example.com 形式で入力してください。' },
    { id: 'notes', label: '備考', required: false }
  ];

  function validationMessage(field) {
    const control = document.getElementById(field.id);
    const value = control.value.trim();
    if (field.required && !value) return `${field.label}を入力してください。`;
    if (value && field.pattern && !field.pattern.test(value)) return field.format;
    return '';
  }

  function updateField(field) {
    const control = document.getElementById(field.id);
    const message = document.getElementById(`${field.id}-message`);
    const error = validationMessage(field);
    if (error) {
      control.setAttribute('aria-invalid', 'true');
      message.textContent = error;
      message.classList.remove('helper');
      message.classList.add('error');
    } else {
      control.removeAttribute('aria-invalid');
      message.classList.remove('error');
      if (message.dataset.helper) {
        message.textContent = message.dataset.helper;
        message.classList.add('helper');
      } else {
        message.textContent = '';
        message.classList.remove('helper');
      }
    }
    return error;
  }

  fields.forEach((field) => {
    const message = document.getElementById(`${field.id}-message`);
    if (message.textContent.trim()) message.dataset.helper = message.textContent.trim();
    const control = document.getElementById(field.id);
    control.addEventListener('blur', () => updateField(field));
    control.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') updateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = fields.map(updateField).filter(Boolean);
    if (errors.length) {
      errorSummary.textContent = `入力内容を確認してください。${errors.length}件の修正が必要です。`;
      errorSummary.hidden = false;
      errorSummary.focus();
    } else {
      errorSummary.hidden = true;
      errorSummary.textContent = '';
    }
  });
})();
