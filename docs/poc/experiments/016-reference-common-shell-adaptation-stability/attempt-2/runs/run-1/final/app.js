(() => {
  const shell = document.querySelector('.app-shell');
  const drawer = document.querySelector('.drawer');
  const drawerToggle = document.querySelector('#drawer-toggle');
  const themeToggle = document.querySelector('#theme-toggle');
  const search = document.querySelector('#navigation-search');
  const emptyMessage = document.querySelector('#empty-message');
  const sectionItems = document.querySelector('#section-items');
  const fixtureList = document.querySelector('#fixture-list');

  for (let number = 1; number <= 29; number += 1) {
    const label = `Section ${String(number).padStart(2, '0')}`;
    const item = document.createElement('button');
    item.className = 'nav-row';
    item.type = 'button';
    item.dataset.item = label;
    item.innerHTML = '<span aria-hidden="true" class="row-marker"></span><span></span>';
    item.lastElementChild.textContent = label;
    sectionItems.append(item);
  }

  for (let number = 1; number <= 80; number += 1) {
    const item = document.createElement('li');
    item.textContent = `Fixture item ${number}`;
    fixtureList.append(item);
  }

  const setDrawer = (isOpen) => {
    shell.classList.toggle('drawer-hidden', !isOpen);
    drawerToggle.setAttribute('aria-expanded', String(isOpen));
    drawerToggle.setAttribute('aria-label', isOpen ? 'Hide navigation' : 'Show navigation');
    drawerToggle.title = isOpen ? 'Hide navigation' : 'Show navigation';
    drawer.setAttribute('aria-hidden', String(!isOpen));
  };

  drawerToggle.addEventListener('click', () => {
    setDrawer(shell.classList.contains('drawer-hidden'));
  });

  themeToggle.addEventListener('click', () => {
    const isDark = shell.dataset.theme === 'dark';
    shell.dataset.theme = isDark ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Use dark palette' : 'Use light palette');
    themeToggle.title = isDark ? 'Use dark palette' : 'Use light palette';
  });

  document.querySelectorAll('.group-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      const group = document.querySelector(`#${toggle.getAttribute('aria-controls')}`);
      toggle.setAttribute('aria-expanded', String(!expanded));
      group.hidden = expanded;
    });
  });

  document.querySelector('.nav-scroll').addEventListener('click', (event) => {
    const row = event.target.closest('.nav-row');
    if (!row) return;
    document.querySelectorAll('.nav-row.is-current').forEach((item) => {
      item.classList.remove('is-current');
      item.removeAttribute('aria-current');
    });
    row.classList.add('is-current');
    row.setAttribute('aria-current', 'page');
  });

  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    document.querySelectorAll('.nav-row').forEach((row) => {
      const matches = row.dataset.item.toLocaleLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    emptyMessage.hidden = visibleCount !== 0;
  });
})();
