(() => {
  "use strict";

  const form = document.querySelector("#customer-search-form");
  const reset = document.querySelector("#reset-search");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  reset.addEventListener("click", () => {
    form.reset();
    document.querySelector("#customer-name").focus();
  });
})();
