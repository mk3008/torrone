"use strict";

// Two independent product states: navigation destination and parent disclosure.
const bindingState = { currentDestination: "item-01-01" };
const disclosureState = { group01Expanded: true };

const shell = document.querySelector(".shell");
const drawer = document.querySelector("#drawer");
const drawerControl = document.querySelector("#drawer-control");
const themeControl = document.querySelector("#theme-control");
const search = document.querySelector("#drawer-search");
const searchContainer = document.querySelector("#search-container");
const group = document.querySelector("#group-01");
const groupControl = document.querySelector("#group-control");
const groupChildren = document.querySelector("#group-children");
const leafItems = document.querySelector("#leaf-items");
const noMatches = document.querySelector("#no-matches");
const numbers = document.querySelector("#numbers");

for (let number = 2; number <= 30; number += 1) {
  const item = document.createElement("button");
  item.className = "nav-row leaf";
  item.type = "button";
  item.dataset.destination = `item-${String(number).padStart(2, "0")}`;
  item.textContent = `項目 ${String(number).padStart(2, "0")}`;
  leafItems.append(item);
}
for (let number = 1; number <= 80; number += 1) {
  const item = document.createElement("li");
  item.textContent = String(number);
  numbers.append(item);
}

function renderCurrentDestination() {
  document.querySelectorAll("[data-destination]").forEach((item) => {
    const isCurrent = item.dataset.destination === bindingState.currentDestination;
    item.classList.toggle("is-current", isCurrent);
    if (isCurrent) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}
function renderDisclosure() {
  groupControl.setAttribute("aria-expanded", String(disclosureState.group01Expanded));
  groupChildren.hidden = !disclosureState.group01Expanded;
}
function replaceQuery(name, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
}
function setDrawer(open, writeQuery = true) {
  drawer.hidden = !open;
  shell.dataset.drawer = open ? "open" : "hidden";
  drawerControl.setAttribute("aria-expanded", String(open));
  const action = open ? "Close navigation" : "Open navigation";
  drawerControl.setAttribute("aria-label", action);
  drawerControl.title = action;
  if (writeQuery) replaceQuery("drawer", open ? "open" : "hidden");
}
function setTheme(theme, writeQuery = true) {
  shell.dataset.theme = theme;
  const action = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  themeControl.setAttribute("aria-label", action);
  themeControl.title = action;
  if (writeQuery) replaceQuery("theme", theme);
}
function removeClearControl() {
  searchContainer.querySelector(".clear-control")?.remove();
  searchContainer.classList.remove("has-value");
}
function addClearControl() {
  if (searchContainer.querySelector(".clear-control")) return;
  const control = document.createElement("button");
  control.className = "clear-control";
  control.type = "button";
  control.setAttribute("aria-label", "検索をクリア");
  control.title = "検索をクリア";
  control.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
  control.addEventListener("click", () => { search.value = ""; filterNavigation(); search.focus(); });
  searchContainer.append(control);
  searchContainer.classList.add("has-value");
}
function filterNavigation() {
  const query = search.value.trim().toLocaleLowerCase("ja");
  const children = [...groupChildren.querySelectorAll(".child")];
  const leaves = [...leafItems.querySelectorAll(".leaf")];
  const matchingChildren = children.filter((item) => item.textContent.toLocaleLowerCase("ja").includes(query));
  const matchingLeaves = leaves.filter((item) => item.textContent.toLocaleLowerCase("ja").includes(query));
  children.forEach((item) => { item.hidden = query !== "" && !matchingChildren.includes(item); });
  leaves.forEach((item) => { item.hidden = query !== "" && !matchingLeaves.includes(item); });
  group.hidden = query !== "" && matchingChildren.length === 0;
  if (query !== "" && matchingChildren.length > 0) {
    disclosureState.group01Expanded = true;
    renderDisclosure();
  }
  noMatches.hidden = matchingChildren.length + matchingLeaves.length !== 0;
  if (query === "") removeClearControl(); else addClearControl();
}

renderCurrentDestination();
renderDisclosure();
const initial = new URLSearchParams(window.location.search);
setDrawer(initial.get("drawer") !== "hidden", false);
setTheme(initial.get("theme") === "dark" ? "dark" : "light", false);

drawerControl.addEventListener("click", () => setDrawer(drawer.hidden));
themeControl.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
groupControl.addEventListener("click", () => {
  disclosureState.group01Expanded = !disclosureState.group01Expanded;
  renderDisclosure();
});
document.querySelectorAll("[data-destination]").forEach((item) => {
  item.addEventListener("click", () => {
    bindingState.currentDestination = item.dataset.destination;
    renderCurrentDestination();
  });
});
search.addEventListener("input", filterNavigation);
