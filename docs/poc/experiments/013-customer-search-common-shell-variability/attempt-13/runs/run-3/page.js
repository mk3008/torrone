document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#customer-search-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});
