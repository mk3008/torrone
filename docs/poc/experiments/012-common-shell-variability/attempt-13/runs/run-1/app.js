"use strict";

// Product binding state for this fixed comparison fixture. Activating a supplied
// destination updates only this current-destination value; no screen transition occurs.
const productBinding = { currentDestination: "item-01-01" };

const shell = document.querySelector(".shell");
const drawer = document.querySelector("#drawer");
const drawerToggle = document.querySelector("#drawer-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const search = document.querySelector("#menu-search");
const searchFrame = document.querySelector("#search-frame");
const group = document.querySelector("#group-01");
const groupToggle = document.querySelector("#group-toggle");
const childItems = document.querySelector("#child-items");
const leafItems = document.querySelector("#leaf-items");
const noMatches = document.querySelector("#no-matches");
const numbers = document.querySelector("#numbers");

for (let number = 2; number <= 30; number += 1) {
  const row = document.createElement("button");
  row.className = "nav-item leaf";
  row.type = "button";
  row.dataset.destination = `item-${String(number).padStart(2, "0")}`;
  row.textContent = `項目 ${String(number).padStart(2, "0")}`;
  leafItems.append(row);
}

for (let number = 1; number <= 80; number += 1) {
  const row = document.createElement("li");
  row.textContent = String(number);
  numbers.append(row);
}

function renderCurrentDestination() {
  document.querySelectorAll("[data-destination]").forEach((row) => {
    const current = row.dataset.destination === productBinding.currentDestination;
    row.classList.toggle("is-current", current);
    if (current) row.setAttribute("aria-current", "page");
    else row.removeAttribute("aria-current");
  });
}

function replaceQuery(name, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
}

function setDrawer(open, updateUrl = true) {
  drawer.hidden = !open;
  shell.dataset.drawer = open ? "open" : "hidden";
  drawerToggle.setAttribute("aria-expanded", String(open));
  const label = open ? "Close navigation" : "Open navigation";
  drawerToggle.setAttribute("aria-label", label);
  drawerToggle.title = label;
  if (updateUrl) replaceQuery("drawer", open ? "open" : "hidden");
}

function setTheme(theme, updateUrl = true) {
  shell.dataset.theme = theme;
  const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  if (updateUrl) replaceQuery("theme", theme);
}

function removeClearButton() {
  searchFrame.querySelector(".clear-button")?.remove();
  searchFrame.classList.remove("has-value");
}

function addClearButton() {
  if (searchFrame.querySelector(".clear-button")) return;
  const button = document.createElement("button");
  button.className = "clear-button";
  button.type = "button";
  button.setAttribute("aria-label", "検索をクリア");
  button.title = "検索をクリア";
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
  button.addEventListener("click", () => { search.value = ""; filterNavigation(); search.focus(); });
  searchFrame.append(button);
  searchFrame.classList.add("has-value");
}

function filterNavigation() {
  const query = search.value.trim().toLocaleLowerCase("ja");
  const children = [...childItems.querySelectorAll(".child")];
  const leaves = [...leafItems.querySelectorAll(".leaf")];
  const matchingChildren = children.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  const matchingLeaves = leaves.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  children.forEach((row) => { row.hidden = query !== "" && !matchingChildren.includes(row); });
  leaves.forEach((row) => { row.hidden = query !== "" && !matchingLeaves.includes(row); });
  group.hidden = query !== "" && matchingChildren.length === 0;
  if (query !== "" && matchingChildren.length > 0) {
    groupToggle.setAttribute("aria-expanded", "true");
    childItems.hidden = false;
  }
  noMatches.hidden = matchingChildren.length + matchingLeaves.length !== 0;
  if (query === "") removeClearButton(); else addClearButton();
}

renderCurrentDestination();
const initialState = new URLSearchParams(window.location.search);
setDrawer(initialState.get("drawer") !== "hidden", false);
setTheme(initialState.get("theme") === "dark" ? "dark" : "light", false);

drawerToggle.addEventListener("click", () => setDrawer(drawer.hidden));
themeToggle.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
groupToggle.addEventListener("click", () => {
  const open = groupToggle.getAttribute("aria-expanded") === "true";
  groupToggle.setAttribute("aria-expanded", String(!open));
  childItems.hidden = open;
});
document.querySelectorAll("[data-destination]").forEach((row) => {
  row.addEventListener("click", () => { productBinding.currentDestination = row.dataset.destination; renderCurrentDestination(); });
});
search.addEventListener("input", filterNavigation);
