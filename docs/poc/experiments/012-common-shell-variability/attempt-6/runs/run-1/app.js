"use strict";

const items = [
  { label: "グループ 01", type: "parent" },
  { label: "項目 01-01", type: "child", current: true },
  { label: "項目 01-02", type: "child" },
  ...Array.from({ length: 29 }, (_, index) => ({ label: `項目 ${String(index + 2).padStart(2, "0")}`, type: "item" }))
];

const shell = document.querySelector(".shell");
const drawerToggle = document.querySelector("#drawer-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const searchInput = document.querySelector("#menu-search");
const clearSearch = document.querySelector("#clear-search");
const navigation = document.querySelector(".navigation-list");
const numberList = document.querySelector(".number-list");

function renderNavigation(query = "") {
  const term = query.trim().toLocaleLowerCase("ja");
  const matched = term ? items.filter((item) => item.label.toLocaleLowerCase("ja").includes(term)) : items;
  const includesChild = matched.some((item) => item.type === "child");
  const visible = includesChild && !matched.some((item) => item.type === "parent")
    ? [items[0], ...matched]
    : matched;

  navigation.replaceChildren();
  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "no-matches";
    empty.textContent = "一致する項目はありません";
    navigation.append(empty);
    return;
  }
  visible.forEach((item) => {
    const button = document.createElement("button");
    button.className = `nav-row ${item.type}${item.current ? " current" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    if (item.type === "parent") {
      const disclosure = document.createElement("span");
      disclosure.className = "disclosure";
      disclosure.setAttribute("aria-hidden", "true");
      disclosure.textContent = "⌄";
      button.append(disclosure);
      button.setAttribute("aria-expanded", "true");
    }
    navigation.append(button);
  });
}

function setDrawer(isOpen) {
  shell.classList.toggle("drawer-hidden", !isOpen);
  drawerToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  drawerToggle.setAttribute("title", isOpen ? "Close navigation" : "Open navigation");
  drawerToggle.setAttribute("aria-expanded", String(isOpen));
}

function setTheme(theme) {
  const isDark = theme === "dark";
  shell.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
}

const parameters = new URLSearchParams(window.location.search);
setDrawer(parameters.get("drawer") !== "hidden");
setTheme(parameters.get("theme") === "dark" ? "dark" : "light");
renderNavigation();

for (let number = 1; number <= 80; number += 1) {
  const item = document.createElement("li");
  item.textContent = String(number);
  numberList.append(item);
}

drawerToggle.addEventListener("click", () => setDrawer(shell.classList.contains("drawer-hidden")));
themeToggle.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
searchInput.addEventListener("input", () => {
  clearSearch.hidden = searchInput.value.length === 0;
  renderNavigation(searchInput.value);
});
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.hidden = true;
  renderNavigation();
  searchInput.focus();
});
