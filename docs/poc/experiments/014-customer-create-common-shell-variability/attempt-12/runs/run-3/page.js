(() => {
  "use strict";

  const form = document.querySelector("#customer-form");
  const summary = document.querySelector("#error-summary");
  const errorList = document.querySelector("#error-list");
  const fields = {
    name: { label: "氏名", helper: "", required: true },
    birthdate: { label: "生年月日", helper: "生年月日はYYYY-MM-DD形式で入力してください。", required: true },
    address: { label: "住所", helper: "", required: true },
    phone: { label: "電話番号", helper: "電話番号は数字とハイフンで入力してください。", required: true },
    email: { label: "メールアドレス", helper: "メールアドレスはname@example.test形式で入力してください。", required: true },
    notes: { label: "備考", helper: "", required: false }
  };

  function messageFor(name, value) {
    const trimmed = value.trim();
    if (fields[name].required && !trimmed) return `${fields[name].label}を入力してください。`;
    if (!trimmed) return "";
    if (name === "birthdate" && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(trimmed)) return "生年月日はYYYY-MM-DD形式で入力してください。";
    if (name === "phone" && !/^\d{2,4}-\d{2,4}-\d{3,4}$/.test(trimmed)) return "電話番号は数字とハイフンで入力してください。";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "メールアドレスを正しい形式で入力してください。";
    return "";
  }

  function renderField(name, shouldValidate) {
    const input = document.querySelector(`#${name}`);
    const message = document.querySelector(`#${name}-message`);
    const error = shouldValidate ? messageFor(name, input.value) : "";
    input.setAttribute("aria-invalid", String(Boolean(error)));
    message.textContent = error || fields[name].helper;
    message.classList.toggle("helper", Boolean(!error && fields[name].helper));
    message.classList.toggle("error", Boolean(error));
    return error;
  }

  function renderSummary(errors) {
    summary.hidden = errors.length === 0;
    errorList.innerHTML = errors.map(({ name, error }) => `<li><a href="#${name}" data-field="${name}">${error}</a></li>`).join("");
  }

  Object.keys(fields).forEach((name) => {
    const input = document.querySelector(`#${name}`);
    let blurred = false;
    input.addEventListener("blur", () => { blurred = true; renderField(name, true); });
    input.addEventListener("input", () => {
      if (blurred || input.getAttribute("aria-invalid") === "true") renderField(name, true);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const errors = Object.keys(fields).map((name) => ({ name, error: renderField(name, true) })).filter(({ error }) => error);
    renderSummary(errors);
    if (errors.length) summary.focus();
  });

  errorList.addEventListener("click", (event) => {
    const link = event.target.closest("[data-field]");
    if (link) { event.preventDefault(); document.querySelector(`#${link.dataset.field}`).focus(); }
  });
})();
