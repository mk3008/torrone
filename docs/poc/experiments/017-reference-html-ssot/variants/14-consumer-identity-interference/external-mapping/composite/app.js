(() => {
  const parts = {
    input: document.getElementById('carrier-search'),
    menu: document.getElementById('carrier-matches'),
    first: document.querySelector('.carrier-result'),
    empty: document.querySelector('[role="status"]'),
    chosen: document.querySelector('.assigned-carrier, .carrier-assignment'),
    clear: document.querySelector('.remove-carrier')
  };
  const state = { highlighted: false };
  const renderSearch = () => {
    const none = parts.input.value.trim().toLowerCase() === 'zzz';
    const hasQuery = Boolean(parts.input.value.trim());
    parts.menu.hidden = none || !hasQuery;
    parts.empty.hidden = !none;
    parts.input.setAttribute('aria-expanded', String(!parts.menu.hidden));
    parts.input.removeAttribute('aria-activedescendant');
    state.highlighted = false;
    parts.first.setAttribute('aria-selected', 'false');
  };
  const assign = () => {
    parts.menu.hidden = true;
    parts.empty.hidden = true;
    parts.input.setAttribute('aria-expanded', 'false');
    parts.input.removeAttribute('aria-activedescendant');
    parts.chosen.hidden = false;
    parts.input.value = 'Atlas Freight Services';
    parts.input.focus();
  };
  parts.input.addEventListener('input', renderSearch);
  parts.input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && !parts.menu.hidden) {
      event.preventDefault();
      state.highlighted = true;
      parts.first.setAttribute('aria-selected', 'true');
      parts.input.setAttribute('aria-activedescendant', parts.first.id);
    }
    if (event.key === 'Enter' && state.highlighted) {
      event.preventDefault();
      assign();
    }
    if (event.key === 'Escape') {
      parts.menu.hidden = true;
      parts.input.setAttribute('aria-expanded', 'false');
      parts.input.removeAttribute('aria-activedescendant');
    }
  });
  parts.first.addEventListener('click', assign);
  parts.clear.addEventListener('click', () => {
    parts.chosen.hidden = true;
    parts.input.value = '';
    parts.input.setAttribute('aria-expanded', 'false');
    parts.input.removeAttribute('aria-activedescendant');
    parts.menu.hidden = true;
    parts.empty.hidden = true;
    parts.input.focus();
  });
})();
