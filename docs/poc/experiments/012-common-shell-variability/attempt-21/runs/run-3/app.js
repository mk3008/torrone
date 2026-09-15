(() => {
  "use strict";

  const shell = document.querySelector(".shell");
  const drawerToggle = document.querySelector(".drawer-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  const searchInput = document.querySelector("#nav-search");
  const clearSearch = document.querySelector(".clear-search");
  const navTree = document.querySelector(".nav-tree");
  const noMatches = document.querySelector(".no-matches");
  const numberList = document.querySelector(".number-list");

  const params = new URLSearchParams(window.location.search);
  let drawerOpen = params.get("drawer") !== "hidden";
  let theme = params.get("theme") === "dark" ? "dark" : "light";
  let currentDestination = "item-01-01";
  let groupExpanded = true;
  let query = "";

  const entries = [
    { id: "group-01", label: "グループ 01", children: [
      { id: "item-01-01", label: "項目 01-01" },
      { id: "item-01-02", label: "項目 01-02" }
    ] },
    ...Array.from({ length: 29 }, (_, index) => {
      const value = String(index + 2).padStart(2, "0");
      return { id: `item-${value}`, label: `項目 ${value}` };
    })
  ];

  function panelIcon(open) {
    return open ? '<rect x="3" y="3" width="18" height="18" rx="1"></rect><path d="M9 3v18"></path><path class="direction" d="m15 8-4 4 4 4"></path>' : '<rect x="3" y="3" width="18" height="18" rx="1"></rect><path d="M9 3v18"></path><path class="direction" d="m12 8 4 4-4 4"></path>';
  }

  function themeIcon(mode) {
    return mode === "light" ? '<path d="M20 15.4A8 8 0 0 1 8.6 4 8 8 0 1 0 20 15.4Z"></path>' : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';
  }

  function setUrlState() {
    const next = new URL(window.location.href);
    next.searchParams.set("drawer", drawerOpen ? "open" : "hidden");
    next.searchParams.set("theme", theme);
    window.history.replaceState(null, "", next);
  }

  function renderShell() {
    shell.dataset.drawer = drawerOpen ? "open" : "hidden";
    shell.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    drawerToggle.setAttribute("aria-label", drawerOpen ? "Close navigation" : "Open navigation");
    drawerToggle.title = drawerOpen ? "Close navigation" : "Open navigation";
    drawerToggle.querySelector("svg").innerHTML = panelIcon(drawerOpen);
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.title = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
    themeToggle.querySelector("svg").innerHTML = themeIcon(theme);
  }

  function matches(entry) { return entry.label.includes(query); }

  function navButton(entry, child) {
    const current = entry.id === currentDestination ? ' aria-current="page"' : "";
    return `<button class="nav-row${child ? " child-row" : ""}" type="button" data-destination="${entry.id}"${current}>${entry.label}</button>`;
  }

  function renderNavigation() {
    const normalized = query.trim();
    const group = entries[0];
    const otherItems = entries.slice(1).filter(matches);
    const matchingChildren = group.children.filter(matches);
    const groupMatches = matches(group);
    const showGroup = !normalized || groupMatches || matchingChildren.length > 0;
    const childrenToShow = normalized ? (groupMatches ? group.children : matchingChildren) : group.children;
    const showChildren = showGroup && groupExpanded && childrenToShow.length > 0;
    let html = "";
    if (showGroup) {
      const expanded = groupExpanded ? "true" : "false";
      const icon = groupExpanded ? '<path d="m6 9 6 6 6-6"></path>' : '<path d="m9 6 6 6-6 6"></path>';
      html += `<li><div class="nav-row"><button class="nav-row" type="button" data-destination="${group.id}">${group.label}</button><button class="disclosure" type="button" data-disclosure="group-01" aria-label="${groupExpanded ? "グループ 01 を折りたたむ" : "グループ 01 を展開する"}" aria-expanded="${expanded}" title="${groupExpanded ? "グループ 01 を折りたたむ" : "グループ 01 を展開する"}"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg></button></div>`;
      if (showChildren) html += `<ul>${childrenToShow.map((entry) => `<li>${navButton(entry, true)}</li>`).join("")}</ul>`;
      html += "</li>";
    }
    html += otherItems.map((entry) => `<li>${navButton(entry, false)}</li>`).join("");
    navTree.innerHTML = html;
    noMatches.hidden = Boolean(html);
  }

  for (let value = 1; value <= 80; value += 1) {
    const item = document.createElement("li");
    item.textContent = String(value);
    numberList.append(item);
  }

  drawerToggle.addEventListener("click", () => { drawerOpen = !drawerOpen; renderShell(); setUrlState(); });
  themeToggle.addEventListener("click", () => { theme = theme === "light" ? "dark" : "light"; renderShell(); setUrlState(); });
  searchInput.addEventListener("input", () => { query = searchInput.value; clearSearch.hidden = !query; renderNavigation(); });
  clearSearch.addEventListener("click", () => { searchInput.value = ""; query = ""; clearSearch.hidden = true; renderNavigation(); searchInput.focus(); });
  navTree.addEventListener("click", (event) => {
    const disclosure = event.target.closest("[data-disclosure]");
    if (disclosure) { groupExpanded = !groupExpanded; renderNavigation(); return; }
    const destination = event.target.closest("[data-destination]");
    if (destination) { currentDestination = destination.dataset.destination; renderNavigation(); }
  });

  renderShell();
  renderNavigation();
})();
