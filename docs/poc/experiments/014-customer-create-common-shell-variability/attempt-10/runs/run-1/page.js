(function () {
  const form = document.querySelector('#customer-create-form');
  const summary = document.querySelector('#form-error-summary');
  const errorList = document.querySelector('#form-error-list');
  const fields = Array.from(form.querySelectorAll('input, textarea'));
  const submitted = new Set();

  function messageFor(field) {
    const value = field.value.trim();
    if (field.required && !value) return `${field.labels[0].childNodes[0].textContent.trim()}を入力してください。`;
    if (!value) return '';
    if (field.id === 'birth-date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '生年月日は YYYY-MM-DD 形式で入力してください。';
    if (field.id === 'telephone' && !/^0\d{1,4}-\d{1,4}-\d{3,4}$/.test(value)) return '電話番号は数字とハイフンを使用して入力してください。';
    if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'メールアドレスは name@example.com 形式で入力してください。';
    return '';
  }

  function renderField(field, shouldShow) {
    const message = document.querySelector(`#${field.id}-message`);
    const error = messageFor(field);
    if (shouldShow && error) {
      field.setAttribute('aria-invalid', 'true');
      message.textContent = error;
      message.classList.add('is-error');
      return error;
    }
    field.removeAttribute('aria-invalid');
    message.textContent = message.dataset.helper;
    message.classList.remove('is-error');
    return '';
  }

  function renderSummary(errors) {
    errorList.replaceChildren();
    if (!errors.length) {
      summary.hidden = true;
      return;
    }
    errors.forEach(function ({ field, message }) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = message;
      link.addEventListener('click', function () { field.focus(); });
      item.appendChild(link);
      errorList.appendChild(item);
    });
    summary.hidden = false;
  }

  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      submitted.add(field);
      renderField(field, true);
    });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') renderField(field, true);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const errors = fields.map(function (field) {
      submitted.add(field);
      const message = renderField(field, true);
      return message ? { field, message } : null;
    }).filter(Boolean);
    renderSummary(errors);
  });
}());
