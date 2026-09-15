(() => {
  const form = document.querySelector('#customer-form');
  const summary = document.querySelector('#error-summary');
  const fields = [...form.querySelectorAll('input, textarea')];
  const rules = {
    name: (value) => value.trim() ? '' : '氏名を入力してください。',
    birthdate: (value) => !value.trim() ? '生年月日を入力してください。' : (/^\\d{4}-\\d{2}-\\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00`))) ? '' : '生年月日をYYYY-MM-DD形式で入力してください。',
    address: (value) => value.trim() ? '' : '住所を入力してください。',
    phone: (value) => !value.trim() ? '電話番号を入力してください。' : /^0\\d{1,4}-?\\d{1,4}-?\\d{4}$/.test(value.replace(/\\s/g, '')) ? '' : '電話番号の形式で入力してください。',
    email: (value) => !value.trim() ? 'メールアドレスを入力してください。' : /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? '' : 'メールアドレスの形式で入力してください。',
    notes: () => ''
  };
  const helper = { birthdate: 'YYYY-MM-DD形式で入力してください。', phone: '電話番号をハイフン付きまたは数字のみで入力してください。', email: 'メールアドレスの形式で入力してください。' };
  function validate(field) {
    const message = rules[field.name](field.value);
    const region = document.querySelector(`#${field.id}-message`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    region.textContent = message || helper[field.name] || '\u00a0';
    region.classList.toggle('error', Boolean(message));
    region.classList.toggle('helper', !message && Boolean(helper[field.name]));
    return message;
  }
  fields.forEach((field) => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = fields.map((field) => ({ field, message: validate(field) })).filter(({ message }) => message);
    if (!errors.length) { summary.hidden = true; return; }
    summary.innerHTML = `<p>入力内容を確認してください。</p><ul>${errors.map(({ field, message }) => `<li><a href="#${field.id}">${message}</a></li>`).join('')}</ul>`;
    summary.hidden = false;
    summary.querySelectorAll('a').forEach((link) => link.addEventListener('click', (click) => { click.preventDefault(); document.querySelector(link.getAttribute('href')).focus(); }));
    summary.focus();
  });
})();
