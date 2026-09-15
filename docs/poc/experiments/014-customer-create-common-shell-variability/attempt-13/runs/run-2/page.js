(() => {
  "use strict";

  const form = document.querySelector("#create-form");
  const summary = document.querySelector("#error-summary");
  const list = document.querySelector("#error-list");
  let submitted = false;
  const fieldData = {
    name: ["氏名", ""], birthdate: ["生年月日", "生年月日はYYYY-MM-DD形式で入力してください。"], address: ["住所", ""],
    phone: ["電話番号", "電話番号は数字とハイフンで入力してください。"], email: ["メールアドレス", "メールアドレスはname@example.test形式で入力してください。"], notes: ["備考", ""]
  };
  const touched = new Set();

  function validate(name) {
    const value = document.querySelector(`#${name}`).value.trim();
    const label = fieldData[name][0];
    if (name !== "notes" && !value) return `${label}を入力してください。`;
    if (!value) return "";
    if (name === "birthdate" && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)) return "生年月日はYYYY-MM-DD形式で入力してください。";
    if (name === "phone" && !/^\d{2,4}-\d{2,4}-\d{3,4}$/.test(value)) return "電話番号は数字とハイフンで入力してください。";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "メールアドレスを正しい形式で入力してください。";
    return "";
  }

  function render(name, force) {
    const input = document.querySelector(`#${name}`);
    const feedback = document.querySelector(`#${name}-feedback`);
    const error = force ? validate(name) : "";
    input.setAttribute("aria-invalid", String(Boolean(error)));
    feedback.textContent = error || fieldData[name][1];
    feedback.classList.toggle("error", Boolean(error));
    feedback.classList.toggle("helper", Boolean(!error && fieldData[name][1]));
    return error;
  }

  function renderSummary() {
    const errors = Object.keys(fieldData).map((name) => ({ name, error: validate(name) })).filter((entry) => entry.error);
    summary.hidden = errors.length === 0;
    list.innerHTML = errors.map(({ name, error }) => `<li><a href="#${name}" data-field="${name}">${error}</a></li>`).join("");
    return errors;
  }

  Object.keys(fieldData).forEach((name) => {
    const input = document.querySelector(`#${name}`);
    input.addEventListener("blur", () => { touched.add(name); render(name, true); if (submitted) renderSummary(); });
    input.addEventListener("input", () => { if (touched.has(name) || input.getAttribute("aria-invalid") === "true") { render(name, true); if (submitted) renderSummary(); } });
  });
  form.addEventListener("submit", (event) => { event.preventDefault(); submitted = true; Object.keys(fieldData).forEach((name) => render(name, true)); const errors = renderSummary(); if (errors.length) summary.focus(); });
  list.addEventListener("click", (event) => { const link = event.target.closest("[data-field]"); if (link) { event.preventDefault(); document.querySelector(`#${link.dataset.field}`).focus(); } });
})();
