(() => {
  const form = document.querySelector('#customer-create-form');
  const summary = document.querySelector('#form-error-summary');
  const summaryList = document.querySelector('#form-error-list');

  const fields = [
    { id: 'customer-name', label: '氏名', required: true },
    { id: 'birth-date', label: '生年月日', required: true, format: /^\d{4}-\d{2}-\d{2}$/, error: '生年月日は YYYY-MM-DD 形式で入力してください。', help: '生年月日は YYYY-MM-DD 形式で入力してください。' },
    { id: 'address', label: '住所', required: true },
    { id: 'telephone', label: '電話番号', required: true, format: /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/, error: '電話番号は数字とハイフンを使用して入力してください。', help: '電話番号は数字とハイフンを使用して入力してください。' },
    { id: 'email', label: 'メールアドレス', required: true, format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: 'メールアドレスは name@example.com 形式で入力してください。', help: 'メールアドレスは name@example.com 形式で入力してください。' },
    { id: 'notes', label: '備考', required: false }
  ].map((definition) => ({ ...definition, control: document.querySelector(`#${definition.id}`), touched: false, invalid: false }));

  function validationMessage(field) {
    const value = field.control.value.trim();
    if (field.required && !value) return `${field.label}を入力してください。`;
    if (value && field.format && !field.format.test(value)) return field.error;
    return '';
  }

  function setFieldMessage(field, message) {
    const region = document.querySelector(`#${field.id}-message`);
    const isError = Boolean(message);
    field.invalid = isError;
    field.control.setAttribute('aria-invalid', String(isError));
    region.classList.toggle('field-message--error', isError);
    region.classList.toggle('field-message--help', !isError && Boolean(field.help));
    region.textContent = isError ? message : (field.help || '\u00a0');
  }

  function validateField(field) {
    const message = validationMessage(field);
    setFieldMessage(field, message);
    return message;
  }

  function updateSummary(messages, moveFocus) {
    summaryList.replaceChildren();
    if (!messages.length) {
      summary.hidden = true;
      return;
    }

    for (const { field, message } of messages) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = message;
      link.addEventListener('click', () => field.control.focus());
      item.append(link);
      summaryList.append(item);
    }
    summary.hidden = false;
    if (moveFocus) summary.focus();
  }

  for (const field of fields) {
    field.control.addEventListener('blur', () => {
      field.touched = true;
      validateField(field);
      updateSummary(fields.filter((item) => item.invalid).map((item) => ({ field: item, message: validationMessage(item) })), false);
    });
    field.control.addEventListener('input', () => {
      if (!field.invalid) return;
      validateField(field);
      updateSummary(fields.filter((item) => item.invalid).map((item) => ({ field: item, message: validationMessage(item) })), false);
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const messages = fields.map((field) => ({ field, message: validateField(field) })).filter(({ message }) => message);
    updateSummary(messages, true);
  });
})();
