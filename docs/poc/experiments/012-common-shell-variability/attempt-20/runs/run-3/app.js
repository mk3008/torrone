(() => {
  "use strict";

  const shell = document.querySelector("#shell");
  const drawerToggle = document.querySelector("#drawer-toggle");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const searchInput = document.querySelector("#nav-search");
  const clearSearch = document.querySelector("#clear-search");
  const navItems = document.querySelector("#nav-items");
  const noMatches = document.querySelector("#no-matches");
  const sequence = document.querySelector("#sequence");
  const params = new URLSearchParams(window.location.search);

  const state = {
    drawer: params.get("drawer") === "hidden" ? "hidden" : "open",
    theme: params.get("theme") === "dark" ? "dark" : "light",
    current: "item-01-01",
    expanded: true,
    search: ""
  };

  const entries = [
    { id: "group-01", label: "グループ 01", group: true },
    { id: "item-01-01", label: "項目 01-01", child: true },
    { id: "item-01-02", label: "項目 01-02", child: true },
    ...Array.from({ length: 29 }, (_, index) => {
      const number = String(index + 2).padStart(2, "0");
      return { id: `item-${number}`, label: `項目 ${number}` };
    })
  ];

  function panelIcon(direction) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="1"></rect><path d="M9 4v16"></path><path d="${direction === "open" ? "m13 9 3 3-3 3" : "m16 9-3 3 3 3"}"></path></svg>`;
  }

  function disclosureIcon() {
    return state.expanded
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 5 5-5 5"></path></svg>';
  }

  function visibleEntries() {
    const needle = state.search.trim().toLocaleLowerCase("ja");
    const matchingLeaves = entries.filter((entry) => !entry.group && entry.label.toLocaleLowerCase("ja").includes(needle));
    const includeGroup = !needle || matchingLeaves.some((entry) => entry.child);
    return entries.filter((entry) => {
      if (entry.group) return includeGroup;
      if (entry.child && !state.expanded && !needle) return false;
      return entry.label.toLocaleLowerCase("ja").includes(needle);
    });
  }

  function renderNavigation() {
    const visible = visibleEntries();
    navItems.replaceChildren();
    visible.forEach((entry) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `nav-row${entry.child ? " is-child" : ""}`;
      row.dataset.id = entry.id;
      row.textContent = entry.label;
      if (entry.id === state.current) row.setAttribute("aria-current", "page");
      if (entry.group) {
        row.setAttribute("aria-expanded", String(state.expanded));
        const disclosure = document.createElement("span");
        disclosure.className = "disclosure";
        disclosure.setAttribute("aria-hidden", "true");
        disclosure.innerHTML = disclosureIcon();
        row.append(disclosure);
      }
      navItems.append(row);
    });
    noMatches.hidden = visible.length !== 0;
    clearSearch.hidden = state.search.length === 0;
  }

  function syncShell() {
    shell.dataset.theme = state.theme;
    shell.classList.toggle("drawer-hidden", state.drawer === "hidden");
    const drawerOpen = state.drawer === "open";
    drawerToggle.setAttribute("aria-label", drawerOpen ? "Close navigation" : "Open navigation");
    drawerToggle.title = drawerOpen ? "Close navigation" : "Open navigation";
    drawerToggle.setAttribute("aria-expanded", String(drawerOpen));
    drawerToggle.innerHTML = panelIcon(drawerOpen ? "close" : "open");
    const dark = state.theme === "dark";
    themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    themeIcon.innerHTML = dark
      ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>'
      : '<path d="M20.5 15.1A8.5 8.5 0 0 1 8.9 3.5 8.5 8.5 0 1 0 20.5 15.1Z"></path>';
  }

  drawerToggle.addEventListener("click", () => { state.drawer = state.drawer === "open" ? "hidden" : "open"; syncShell(); });
  themeToggle.addEventListener("click", () => { state.theme = state.theme === "light" ? "dark" : "light"; syncShell(); });
  searchInput.addEventListener("input", () => { state.search = searchInput.value; renderNavigation(); });
  clearSearch.addEventListener("click", () => { state.search = ""; searchInput.value = ""; renderNavigation(); searchInput.focus(); });
  navItems.addEventListener("click", (event) => {
    const row = event.target.closest(".nav-row");
    if (!row) return;
    if (row.dataset.id === "group-01") { state.expanded = !state.expanded; renderNavigation(); return; }
    state.current = row.dataset.id;
    renderNavigation();
  });
  for (let index = 1; index <= 80; index += 1) sequence.append(document.createElement("li"));
  syncShell();
  renderNavigation();
})();
