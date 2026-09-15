(() => {
  const form = document.querySelector('#customer-form');
  const summary = document.querySelector('#error-summary');
  const fields = [...form.querySelectorAll('input, textarea')];
  const helpers = { birthdate: '生年月日はYYYY-MM-DD形式で入力してください。', phone: '電話番号はハイフン付きまたは数字のみで入力してください。', email: 'メールアドレスはメールアドレス形式で入力してください。' };
  function validDate(value) { const match = /^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(value); if (!match) return false; const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])); return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]); }
  function messageFor(field) {
    const value = field.value.trim();
    if (field.required && !value) return `${field.labels[0].childNodes[0].textContent.trim()}を入力してください。`;
    if (!value) return '';
    if (field.name === 'birthdate' && !validDate(value)) return '生年月日はYYYY-MM-DD形式で入力してください。';
    if (field.name === 'phone' && !/^0\\d{1,4}-?\\d{1,4}-?\\d{4}$/.test(value.replace(/\\s/g, ''))) return '電話番号の形式で入力してください。';
    if (field.name === 'email' && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) return 'メールアドレスの形式で入力してください。';
    return '';
  }
  function validate(field) { const message = messageFor(field); const region = document.querySelector(`#${field.id}-message`); field.setAttribute('aria-invalid', String(Boolean(message))); region.textContent = message || helpers[field.name] || '\u00a0'; region.classList.toggle('error', Boolean(message)); region.classList.toggle('helper', !message && Boolean(helpers[field.name])); return message; }
  fields.forEach((field) => { field.addEventListener('blur', () => validate(field)); field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); }); });
  form.addEventListener('submit', (event) => { event.preventDefault(); const errors = fields.map((field) => ({ field, message: validate(field) })).filter(({ message }) => message); if (!errors.length) { summary.hidden = true; return; } summary.innerHTML = `<p>入力内容を確認してください。</p><ul>${errors.map(({ field, message }) => `<li><a href="#${field.id}">${message}</a></li>`).join('')}</ul>`; summary.hidden = false; summary.querySelectorAll('a').forEach((link) => link.addEventListener('click', (click) => { click.preventDefault(); document.querySelector(link.getAttribute('href')).focus(); })); summary.focus(); });
})();
