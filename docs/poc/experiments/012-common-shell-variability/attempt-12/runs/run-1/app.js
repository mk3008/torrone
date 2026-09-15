"use strict";

// This object represents product binding input. The sample fixture supplies
// item-01-01; the common Drawer component has no hard-coded current item.
const productBinding = Object.freeze({ currentDrawerItem: "item-01-01" });

const shell = document.querySelector(".shell");
const drawer = document.querySelector("#drawer");
const drawerToggle = document.querySelector("#drawer-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const search = document.querySelector("#navigation-search");
const searchFrame = document.querySelector("#search-frame");
const group = document.querySelector("#group-01");
const groupToggle = document.querySelector("#group-toggle");
const groupChildren = document.querySelector("#group-children");
const leafItems = document.querySelector("#leaf-items");
const noMatches = document.querySelector("#no-matches");
const numberList = document.querySelector("#number-list");

for (let number = 2; number <= 30; number += 1) {
  const row = document.createElement("button");
  row.className = "nav-row leaf";
  row.type = "button";
  row.dataset.itemId = `item-${String(number).padStart(2, "0")}`;
  row.textContent = `項目 ${String(number).padStart(2, "0")}`;
  leafItems.append(row);
}

for (let number = 1; number <= 80; number += 1) {
  const row = document.createElement("li");
  row.textContent = String(number);
  numberList.append(row);
}

function applyCurrentDestination(binding) {
  document.querySelectorAll("[data-item-id]").forEach((row) => {
    const isCurrent = binding.currentDrawerItem === row.dataset.itemId;
    row.classList.toggle("is-current", isCurrent);
    if (isCurrent) row.setAttribute("aria-current", "page");
    else row.removeAttribute("aria-current");
  });
}

function setUrlState(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, "", url);
}

function setDrawer(open, updateUrl = true) {
  drawer.hidden = !open;
  shell.dataset.drawer = open ? "open" : "hidden";
  drawerToggle.setAttribute("aria-expanded", String(open));
  const action = open ? "Close navigation" : "Open navigation";
  drawerToggle.setAttribute("aria-label", action);
  drawerToggle.title = action;
  if (updateUrl) setUrlState("drawer", open ? "open" : "hidden");
}

function setTheme(theme, updateUrl = true) {
  shell.dataset.theme = theme;
  const action = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  themeToggle.setAttribute("aria-label", action);
  themeToggle.title = action;
  if (updateUrl) setUrlState("theme", theme);
}

function removeClearButton() {
  searchFrame.querySelector(".clear-search")?.remove();
  searchFrame.classList.remove("has-value");
}

function addClearButton() {
  if (searchFrame.querySelector(".clear-search")) return;
  const button = document.createElement("button");
  button.className = "clear-search";
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
  const children = [...groupChildren.querySelectorAll(".child")];
  const leaves = [...leafItems.querySelectorAll(".leaf")];
  const matchingChildren = children.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  const matchingLeaves = leaves.filter((row) => row.textContent.toLocaleLowerCase("ja").includes(query));
  children.forEach((row) => { row.hidden = query !== "" && !matchingChildren.includes(row); });
  leaves.forEach((row) => { row.hidden = query !== "" && !matchingLeaves.includes(row); });
  group.hidden = query !== "" && matchingChildren.length === 0;
  if (query !== "" && matchingChildren.length > 0) {
    groupToggle.setAttribute("aria-expanded", "true");
    groupChildren.hidden = false;
  }
  noMatches.hidden = matchingChildren.length + matchingLeaves.length !== 0;
  if (query === "") removeClearButton(); else addClearButton();
}

applyCurrentDestination(productBinding);
const initialState = new URLSearchParams(window.location.search);
setDrawer(initialState.get("drawer") !== "hidden", false);
setTheme(initialState.get("theme") === "dark" ? "dark" : "light", false);

drawerToggle.addEventListener("click", () => setDrawer(drawer.hidden));
themeToggle.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
groupToggle.addEventListener("click", () => {
  const isExpanded = groupToggle.getAttribute("aria-expanded") === "true";
  groupToggle.setAttribute("aria-expanded", String(!isExpanded));
  groupChildren.hidden = isExpanded;
});
search.addEventListener("input", filterNavigation);
