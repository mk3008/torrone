"use strict";

const shell = document.querySelector(".shell");
const drawer = document.querySelector("#drawer");
const drawerToggle = document.querySelector("#drawer-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const search = document.querySelector("#drawer-search");
const searchBox = document.querySelector("#search-box");
const group = document.querySelector("#group-01");
const groupControl = document.querySelector("#group-control");
const groupItems = document.querySelector("#group-items");
const leaves = document.querySelector("#leaf-items");
const noResults = document.querySelector("#no-results");
const numbers = document.querySelector("#numbers");

for (let value = 2; value <= 30; value += 1) {
  const item = document.createElement("button");
  item.className = "nav-row nav-leaf";
  item.type = "button";
  item.textContent = `項目 ${String(value).padStart(2, "0")}`;
  leaves.append(item);
}

for (let value = 1; value <= 80; value += 1) {
  const item = document.createElement("li");
  item.textContent = String(value);
  numbers.append(item);
}

function writeState(name, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
}

function setDrawer(open, updateUrl = true) {
  drawer.hidden = !open;
  shell.dataset.drawer = open ? "open" : "hidden";
  drawerToggle.setAttribute("aria-expanded", String(open));
  const action = open ? "Close navigation" : "Open navigation";
  drawerToggle.setAttribute("aria-label", action);
  drawerToggle.title = action;
  if (updateUrl) writeState("drawer", open ? "open" : "hidden");
}

function setTheme(theme, updateUrl = true) {
  shell.dataset.theme = theme;
  const action = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  themeToggle.setAttribute("aria-label", action);
  themeToggle.title = action;
  if (updateUrl) writeState("theme", theme);
}

function removeClear() {
  searchBox.querySelector(".clear-search")?.remove();
  searchBox.classList.remove("has-value");
}

function addClear() {
  if (searchBox.querySelector(".clear-search")) return;
  const button = document.createElement("button");
  button.className = "clear-search";
  button.type = "button";
  button.setAttribute("aria-label", "検索をクリア");
  button.title = "検索をクリア";
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
  button.addEventListener("click", () => { search.value = ""; filter(); search.focus(); });
  searchBox.append(button);
  searchBox.classList.add("has-value");
}

function filter() {
  const query = search.value.trim().toLocaleLowerCase("ja");
  const childRows = [...groupItems.querySelectorAll(".nav-child")];
  const leafRows = [...leaves.querySelectorAll(".nav-leaf")];
  const matchingChildren = childRows.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  const matchingLeaves = leafRows.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  childRows.forEach((row) => { row.hidden = query !== "" && !matchingChildren.includes(row); });
  leafRows.forEach((row) => { row.hidden = query !== "" && !matchingLeaves.includes(row); });
  group.hidden = query !== "" && matchingChildren.length === 0;
  if (query !== "" && matchingChildren.length > 0) {
    groupControl.setAttribute("aria-expanded", "true");
    groupItems.hidden = false;
  }
  noResults.hidden = matchingChildren.length + matchingLeaves.length !== 0;
  if (query === "") removeClear(); else addClear();
}

const initial = new URLSearchParams(window.location.search);
setDrawer(initial.get("drawer") !== "hidden", false);
setTheme(initial.get("theme") === "dark" ? "dark" : "light", false);

drawerToggle.addEventListener("click", () => setDrawer(drawer.hidden));
themeToggle.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
groupControl.addEventListener("click", () => {
  const expanded = groupControl.getAttribute("aria-expanded") === "true";
  groupControl.setAttribute("aria-expanded", String(!expanded));
  groupItems.hidden = expanded;
});
search.addEventListener("input", filter);
