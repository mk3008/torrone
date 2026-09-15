(function () {
  const form = document.querySelector('#customer-create-form');
  const summary = document.querySelector('#validation-summary');
  const summaryList = document.querySelector('#validation-summary-list');
  const fields = Array.from(form.querySelectorAll('input, textarea'));

  const messages = {
    'customer-name': {
      required: '氏名を入力してください。'
    },
    'birth-date': {
      required: '生年月日を入力してください。',
      format: '生年月日は YYYY-MM-DD 形式で入力してください。'
    },
    address: {
      required: '住所を入力してください。'
    },
    telephone: {
      required: '電話番号を入力してください。',
      format: '電話番号は数字とハイフンを使用して入力してください。'
    },
    email: {
      required: 'メールアドレスを入力してください。',
      format: 'メールアドレスは name@example.com 形式で入力してください。'
    }
  };

  function errorFor(field) {
    const value = field.value.trim();
    if (field.required && !value) return messages[field.id].required;
    if (!value) return '';
    if (field.id === 'birth-date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return messages[field.id].format;
    if (field.id === 'telephone' && !/^\d{2,4}-\d{2,4}-\d{3,4}$/.test(value)) return messages[field.id].format;
    if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return messages[field.id].format;
    return '';
  }

  function setFieldState(field, error) {
    const region = document.querySelector(`#${field.id}-message`);
    if (error) {
      field.setAttribute('aria-invalid', 'true');
      region.textContent = error;
      region.classList.remove('field-message--helper');
      region.classList.add('field-message--error');
      return error;
    }

    field.removeAttribute('aria-invalid');
    region.textContent = region.dataset.helper;
    region.classList.toggle('field-message--helper', Boolean(region.dataset.helper));
    region.classList.remove('field-message--error');
    return '';
  }

  function validate(field) {
    return setFieldState(field, errorFor(field));
  }

  function renderSummary(errors) {
    summaryList.replaceChildren();
    if (!errors.length) {
      summary.hidden = true;
      return;
    }

    errors.forEach(({ field, error }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = error;
      link.addEventListener('click', function () {
        field.focus();
      });
      item.append(link);
      summaryList.append(item);
    });
    summary.hidden = false;
  }

  function refreshSummaryIfVisible() {
    if (summary.hidden) return;
    const errors = fields.map((field) => ({ field, error: validate(field) })).filter(({ error }) => error);
    renderSummary(errors);
  }

  fields.forEach((field) => {
    field.addEventListener('blur', function () {
      field.dataset.touched = 'true';
      validate(field);
      refreshSummaryIfVisible();
    });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') {
        validate(field);
        refreshSummaryIfVisible();
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const errors = fields.map((field) => ({ field, error: validate(field) })).filter(({ error }) => error);
    renderSummary(errors);
    if (errors.length) summary.focus();
  });
}());
