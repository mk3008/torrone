"use strict";

const shell = document.querySelector(".app-shell");
const drawer = document.querySelector(".drawer");
const drawerToggle = document.querySelector("#drawer-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const searchInput = document.querySelector("#menu-search");
const clearSearch = document.querySelector(".clear-search");
const parentButton = document.querySelector(".nav-parent");
const childList = document.querySelector(".nav-children");
const noMatches = document.querySelector(".no-matches");
const leafHost = document.querySelector("#nav-leaves");
const dummyList = document.querySelector("#dummy-list");

for (let number = 2; number <= 30; number += 1) {
  const item = document.createElement("a");
  item.className = "nav-item nav-leaf";
  item.href = `#item-${String(number).padStart(2, "0")}`;
  item.textContent = `項目 ${String(number).padStart(2, "0")}`;
  leafHost.append(item);
}

for (let number = 1; number <= 80; number += 1) {
  const item = document.createElement("li");
  item.textContent = String(number);
  dummyList.append(item);
}

function setQuery(name, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
}

function setDrawer(isOpen, updateQuery = true) {
  drawer.hidden = !isOpen;
  drawerToggle.setAttribute("aria-expanded", String(isOpen));
  drawerToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  drawerToggle.title = isOpen ? "Close navigation" : "Open navigation";
  if (updateQuery) setQuery("drawer", isOpen ? "open" : "hidden");
}

function setTheme(theme, updateQuery = true) {
  shell.dataset.theme = theme;
  const next = theme === "light" ? "dark" : "light";
  const label = `Switch to ${next} mode`;
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  if (updateQuery) setQuery("theme", theme);
}

function filterNavigation() {
  const query = searchInput.value.trim().toLocaleLowerCase("ja");
  clearSearch.hidden = query.length === 0;
  const childItems = [...childList.querySelectorAll(".nav-child")];
  const leafItems = [...leafHost.querySelectorAll(".nav-leaf")];
  const matchingChildren = childItems.filter((item) => item.textContent.toLocaleLowerCase("ja").includes(query));
  const matchingLeaves = leafItems.filter((item) => item.textContent.toLocaleLowerCase("ja").includes(query));
  childItems.forEach((item) => { item.hidden = query.length > 0 && !matchingChildren.includes(item); });
  leafItems.forEach((item) => { item.hidden = query.length > 0 && !matchingLeaves.includes(item); });
  document.querySelector(".nav-group").hidden = query.length > 0 && matchingChildren.length === 0;
  noMatches.hidden = matchingChildren.length + matchingLeaves.length !== 0;
}

const params = new URLSearchParams(window.location.search);
setDrawer(params.get("drawer") !== "hidden", false);
setTheme(params.get("theme") === "dark" ? "dark" : "light", false);

drawerToggle.addEventListener("click", () => setDrawer(drawer.hidden));
themeToggle.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
parentButton.addEventListener("click", () => {
  const expanded = parentButton.getAttribute("aria-expanded") === "true";
  parentButton.setAttribute("aria-expanded", String(!expanded));
  childList.hidden = expanded;
});
searchInput.addEventListener("input", filterNavigation);
clearSearch.addEventListener("click", () => { searchInput.value = ""; filterNavigation(); searchInput.focus(); });
