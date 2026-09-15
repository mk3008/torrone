"use strict";

const app = document.querySelector(".app");
const drawer = document.querySelector("#drawer");
const drawerButton = document.querySelector("#drawer-button");
const themeButton = document.querySelector("#theme-button");
const search = document.querySelector("#nav-search");
const searchControl = document.querySelector("#search-control");
const group = document.querySelector("#group");
const parentButton = document.querySelector("#parent-button");
const children = document.querySelector("#children");
const leaves = document.querySelector("#leaves");
const emptyMessage = document.querySelector("#empty-message");
const sequence = document.querySelector("#sequence");

for (let number = 2; number <= 30; number += 1) {
  const item = document.createElement("button");
  item.className = "nav-row leaf";
  item.type = "button";
  item.textContent = `項目 ${String(number).padStart(2, "0")}`;
  leaves.append(item);
}

for (let number = 1; number <= 80; number += 1) {
  const item = document.createElement("li");
  item.textContent = String(number);
  sequence.append(item);
}

function replaceQuery(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, "", url);
}

function setDrawer(open, updateQuery = true) {
  drawer.hidden = !open;
  app.dataset.drawerOpen = String(open);
  drawerButton.setAttribute("aria-expanded", String(open));
  const name = open ? "Close navigation" : "Open navigation";
  drawerButton.setAttribute("aria-label", name);
  drawerButton.title = name;
  if (updateQuery) replaceQuery("drawer", open ? "open" : "hidden");
}

function setTheme(theme, updateQuery = true) {
  app.dataset.theme = theme;
  const name = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  themeButton.setAttribute("aria-label", name);
  themeButton.title = name;
  if (updateQuery) replaceQuery("theme", theme);
}

function clearButton() {
  searchControl.querySelector(".clear-button")?.remove();
  searchControl.classList.remove("has-query");
}

function installClearButton() {
  if (searchControl.querySelector(".clear-button")) return;
  const button = document.createElement("button");
  button.className = "clear-button";
  button.type = "button";
  button.setAttribute("aria-label", "検索をクリア");
  button.title = "検索をクリア";
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
  button.addEventListener("click", () => { search.value = ""; filterNavigation(); search.focus(); });
  searchControl.append(button);
  searchControl.classList.add("has-query");
}

function filterNavigation() {
  const query = search.value.trim().toLocaleLowerCase("ja");
  const childRows = [...children.querySelectorAll(".child")];
  const leafRows = [...leaves.querySelectorAll(".leaf")];
  const matchingChildren = childRows.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  const matchingLeaves = leafRows.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  childRows.forEach((row) => { row.hidden = query !== "" && !matchingChildren.includes(row); });
  leafRows.forEach((row) => { row.hidden = query !== "" && !matchingLeaves.includes(row); });
  group.hidden = query !== "" && matchingChildren.length === 0;
  if (query !== "" && matchingChildren.length > 0) {
    parentButton.setAttribute("aria-expanded", "true");
    children.hidden = false;
  }
  emptyMessage.hidden = matchingChildren.length + matchingLeaves.length !== 0;
  if (query === "") clearButton(); else installClearButton();
}

const query = new URLSearchParams(window.location.search);
setDrawer(query.get("drawer") !== "hidden", false);
setTheme(query.get("theme") === "dark" ? "dark" : "light", false);

drawerButton.addEventListener("click", () => setDrawer(drawer.hidden));
themeButton.addEventListener("click", () => setTheme(app.dataset.theme === "light" ? "dark" : "light"));
parentButton.addEventListener("click", () => {
  const isExpanded = parentButton.getAttribute("aria-expanded") === "true";
  parentButton.setAttribute("aria-expanded", String(!isExpanded));
  children.hidden = isExpanded;
});
search.addEventListener("input", filterNavigation);
