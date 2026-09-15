(() => {
  "use strict";

  const shell = document.querySelector("#shell");
  const drawerToggle = document.querySelector("#drawer-toggle");
  const themeToggle = document.querySelector("#theme-toggle");
  const searchInput = document.querySelector("#menu-search");
  const clearSearch = document.querySelector("#clear-search");
  const menuList = document.querySelector("#menu-list");
  const noMatches = document.querySelector("#no-matches");
  const numberList = document.querySelector("#number-list");

  const fixture = {
    parent: "グループ 01",
    children: ["項目 01-01", "項目 01-02"],
    leaves: Array.from({ length: 29 }, (_, index) => `項目 ${String(index + 2).padStart(2, "0")}`)
  };

  function validParam(value, allowed, fallback) {
    return allowed.includes(value) ? value : fallback;
  }

  function updateUrl(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, "", url);
  }

  function setDrawer(state, updateLocation = true) {
    shell.dataset.drawer = state;
    const isOpen = state === "open";
    drawerToggle.setAttribute("aria-expanded", String(isOpen));
    drawerToggle.setAttribute("aria-label", isOpen ? "Drawer を閉じる" : "Drawer を開く");
    drawerToggle.title = isOpen ? "Drawer を閉じる" : "Drawer を開く";
    if (updateLocation) updateUrl("drawer", state);
  }

  function setTheme(theme, updateLocation = true) {
    shell.dataset.theme = theme;
    const nextLabel = theme === "light" ? "ダークテーマに切り替える" : "ライトテーマに切り替える";
    themeToggle.setAttribute("aria-label", nextLabel);
    themeToggle.title = nextLabel;
    if (updateLocation) updateUrl("theme", theme);
  }

  function makeLeaf(name, current = false) {
    const item = document.createElement("li");
    item.className = "menu-leaf";
    item.textContent = name;
    if (current) item.setAttribute("aria-current", "page");
    return item;
  }

  function renderMenu(query = "") {
    const normalized = query.trim().toLocaleLowerCase("ja");
    const matchingChildren = fixture.children.filter((item) => item.toLocaleLowerCase("ja").includes(normalized));
    const matchingLeaves = fixture.leaves.filter((item) => item.toLocaleLowerCase("ja").includes(normalized));
    const showParent = !normalized || fixture.parent.toLocaleLowerCase("ja").includes(normalized) || matchingChildren.length > 0;
    menuList.replaceChildren();

    if (showParent) {
      const group = document.createElement("li");
      group.className = "menu-group";
      const parent = document.createElement("div");
      parent.className = "menu-parent";
      parent.innerHTML = `<span>${fixture.parent}</span><span class="disclosure" aria-hidden="true">⌄</span>`;
      group.append(parent);
      const children = document.createElement("ul");
      children.className = "menu-children";
      const visibleChildren = normalized && fixture.parent.toLocaleLowerCase("ja").includes(normalized) ? fixture.children : matchingChildren;
      visibleChildren.forEach((item) => children.append(makeLeaf(item, item === "項目 01-01")));
      if (visibleChildren.length) group.append(children);
      menuList.append(group);
    }
    matchingLeaves.forEach((item) => menuList.append(makeLeaf(item)));
    noMatches.hidden = Boolean(menuList.children.length);
  }

  new URLSearchParams(window.location.search);
  const parameters = new URLSearchParams(window.location.search);
  setDrawer(validParam(parameters.get("drawer"), ["open", "hidden"], "open"), false);
  setTheme(validParam(parameters.get("theme"), ["light", "dark"], "light"), false);
  renderMenu();

  Array.from({ length: 80 }, (_, index) => index + 1).forEach((number) => {
    const item = document.createElement("li");
    item.textContent = String(number);
    numberList.append(item);
  });

  drawerToggle.addEventListener("click", () => setDrawer(shell.dataset.drawer === "open" ? "hidden" : "open"));
  themeToggle.addEventListener("click", () => setTheme(shell.dataset.theme === "light" ? "dark" : "light"));
  searchInput.addEventListener("input", () => {
    clearSearch.hidden = !searchInput.value;
    renderMenu(searchInput.value);
  });
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.hidden = true;
    renderMenu();
    searchInput.focus();
  });
})();
