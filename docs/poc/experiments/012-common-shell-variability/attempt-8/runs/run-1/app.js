"use strict";

const shell = document.querySelector(".shell");
const drawer = document.querySelector("#drawer");
const drawerControl = document.querySelector("#drawer-control");
const themeControl = document.querySelector("#theme-control");
const search = document.querySelector("#navigation-search");
const searchFrame = document.querySelector("#search-frame");
const group = document.querySelector("#group-01");
const groupToggle = document.querySelector("#group-toggle");
const groupChildren = document.querySelector("#group-children");
const leafItems = document.querySelector("#leaf-items");
const noMatches = document.querySelector("#no-matches");
const numbers = document.querySelector("#numbers");

for (let i = 2; i <= 30; i += 1) {
  const row = document.createElement("button");
  row.className = "nav-row leaf";
  row.type = "button";
  row.textContent = `項目 ${String(i).padStart(2, "0")}`;
  leafItems.append(row);
}

for (let i = 1; i <= 80; i += 1) {
  const row = document.createElement("li");
  row.textContent = String(i);
  numbers.append(row);
}

function updateAddress(key, value) {
  const locationUrl = new URL(window.location.href);
  locationUrl.searchParams.set(key, value);
  window.history.replaceState({}, "", locationUrl);
}

function showDrawer(visible, writeQuery = true) {
  drawer.hidden = !visible;
  drawerControl.setAttribute("aria-expanded", String(visible));
  const action = visible ? "Close navigation" : "Open navigation";
  drawerControl.setAttribute("aria-label", action);
  drawerControl.title = action;
  if (writeQuery) updateAddress("drawer", visible ? "open" : "hidden");
}

function applyTheme(theme, writeQuery = true) {
  shell.dataset.theme = theme;
  const action = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  themeControl.setAttribute("aria-label", action);
  themeControl.title = action;
  if (writeQuery) updateAddress("theme", theme);
}

function removeClearControl() {
  searchFrame.querySelector(".search-clear")?.remove();
  searchFrame.classList.remove("has-value");
}

function addClearControl() {
  if (searchFrame.querySelector(".search-clear")) return;
  const clear = document.createElement("button");
  clear.className = "search-clear";
  clear.type = "button";
  clear.setAttribute("aria-label", "検索をクリア");
  clear.title = "検索をクリア";
  clear.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
  clear.addEventListener("click", () => { search.value = ""; filterItems(); search.focus(); });
  searchFrame.append(clear);
  searchFrame.classList.add("has-value");
}

function filterItems() {
  const term = search.value.trim().toLocaleLowerCase("ja");
  const children = [...groupChildren.querySelectorAll(".child")];
  const leaves = [...leafItems.querySelectorAll(".leaf")];
  const matchedChildren = children.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(term));
  const matchedLeaves = leaves.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(term));
  children.forEach((row) => { row.hidden = term !== "" && !matchedChildren.includes(row); });
  leaves.forEach((row) => { row.hidden = term !== "" && !matchedLeaves.includes(row); });
  group.hidden = term !== "" && matchedChildren.length === 0;
  if (term !== "" && matchedChildren.length > 0) {
    groupToggle.setAttribute("aria-expanded", "true");
    groupChildren.hidden = false;
  }
  noMatches.hidden = matchedChildren.length + matchedLeaves.length !== 0;
  if (term === "") removeClearControl(); else addClearControl();
}

const params = new URLSearchParams(window.location.search);
showDrawer(params.get("drawer") !== "hidden", false);
applyTheme(params.get("theme") === "dark" ? "dark" : "light", false);

drawerControl.addEventListener("click", () => showDrawer(drawer.hidden));
themeControl.addEventListener("click", () => applyTheme(shell.dataset.theme === "light" ? "dark" : "light"));
groupToggle.addEventListener("click", () => {
  const expanded = groupToggle.getAttribute("aria-expanded") === "true";
  groupToggle.setAttribute("aria-expanded", String(!expanded));
  groupChildren.hidden = expanded;
});
search.addEventListener("input", filterItems);
