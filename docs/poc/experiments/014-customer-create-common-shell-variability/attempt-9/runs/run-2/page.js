(function () {
  const form = document.querySelector('.customer-form');
  const summary = document.querySelector('#form-error-summary');
  const summaryList = summary.querySelector('ul');
  const fields = Array.from(form.querySelectorAll('input, textarea'));
  const helperMessages = {
    'birth-date': '生年月日は YYYY-MM-DD 形式で入力してください。',
    phone: '電話番号は 03-1234-5678 形式で入力してください。',
    email: 'メールアドレスは name@example.com 形式で入力してください。'
  };

  function errorFor(field) {
    const value = field.value.trim();
    if (field.required && !value) return `${field.labels[0].childNodes[0].textContent.trim()}を入力してください。`;
    if (!value) return '';
    if (field.id === 'birth-date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '生年月日は YYYY-MM-DD 形式で入力してください。';
    if (field.id === 'phone' && !/^\d{2,4}-\d{2,4}-\d{3,4}$/.test(value)) return '電話番号は 03-1234-5678 形式で入力してください。';
    if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'メールアドレスを正しい形式で入力してください。';
    return '';
  }

  function messageFor(field) {
    return document.querySelector(`#${field.id}-message`);
  }

  function renderField(field, validate) {
    const message = messageFor(field);
    const error = validate ? errorFor(field) : '';
    const helper = helperMessages[field.id] || '';
    field.setAttribute('aria-invalid', String(Boolean(error)));
    message.textContent = error || helper;
    message.dataset.state = error ? 'error' : helper ? 'helper' : 'empty';
    return error;
  }

  function renderSummary(errors) {
    summaryList.replaceChildren();
    errors.forEach(function (entry) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${entry.field.id}`;
      link.textContent = entry.message;
      item.appendChild(link);
      summaryList.appendChild(item);
    });
    summary.hidden = errors.length === 0;
  }

  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      renderField(field, true);
    });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') renderField(field, true);
    });
    renderField(field, false);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const errors = fields.map(function (field) {
      const message = renderField(field, true);
      return message ? { field: field, message: message } : null;
    }).filter(Boolean);
    renderSummary(errors);
    if (errors.length) {
      summary.focus();
      errors[0].field.focus();
    }
  });
}());
