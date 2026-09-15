(function () {
  const form = document.querySelector('.customer-create__form');
  const summary = document.querySelector('#form-error-summary');
  const summaryList = summary.querySelector('ul');
  const fields = [
    { id: 'customer-name', label: '氏名', required: true },
    { id: 'birth-date', label: '生年月日', required: true, pattern: /^\d{4}-\d{2}-\d{2}$/, formatError: '生年月日は YYYY-MM-DD 形式で入力してください。' },
    { id: 'address', label: '住所', required: true },
    { id: 'telephone', label: '電話番号', required: true, pattern: /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/, formatError: '電話番号は 0-9 とハイフンを使用して入力してください。' },
    { id: 'email', label: 'メールアドレス', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, formatError: 'メールアドレスは name@example.com 形式で入力してください。' },
    { id: 'notes', label: '備考', required: false }
  ];

  function getField(id) {
    return document.getElementById(id);
  }

  function getMessage(id) {
    return document.getElementById(`${id}-message`);
  }

  function validationMessage(definition) {
    const field = getField(definition.id);
    const value = field.value.trim();

    if (definition.required && value === '') {
      return `${definition.label}を入力してください。`;
    }

    if (value !== '' && definition.pattern && !definition.pattern.test(value)) {
      return definition.formatError;
    }

    return '';
  }

  function renderField(definition, message) {
    const field = getField(definition.id);
    const messageRegion = getMessage(definition.id);
    const help = messageRegion.dataset.help || '';

    if (message) {
      field.setAttribute('aria-invalid', 'true');
      messageRegion.dataset.state = 'error';
      messageRegion.textContent = message;
      return;
    }

    field.removeAttribute('aria-invalid');
    messageRegion.removeAttribute('data-state');
    messageRegion.textContent = help;
  }

  function renderSummary(errors) {
    summaryList.textContent = '';
    if (errors.length === 0) {
      summary.hidden = true;
      return;
    }

    errors.forEach(function (error) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${error.id}`;
      link.textContent = error.message;
      item.append(link);
      summaryList.append(item);
    });
    summary.hidden = false;
  }

  function validate(definition) {
    const message = validationMessage(definition);
    renderField(definition, message);
    return message;
  }

  fields.forEach(function (definition) {
    const field = getField(definition.id);

    field.addEventListener('blur', function () {
      field.dataset.touched = 'true';
      validate(definition);
    });

    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') {
        validate(definition);
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const errors = fields.map(function (definition) {
      const message = validate(definition);
      return message ? { id: definition.id, message } : null;
    }).filter(Boolean);

    renderSummary(errors);
    if (errors.length > 0) {
      summary.focus();
    }
  });
}());
