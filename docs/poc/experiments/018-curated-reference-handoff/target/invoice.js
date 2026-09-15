(() => {
  'use strict';
  const reviewDay = '2026-09-16';
  const narrow = matchMedia('(max-width: 720px)');
  const browser = document.querySelector('#date-browser');
  const options = document.querySelector('#date-options');
  const windowControl = document.querySelector('#issue-window');
  const limits = [...document.querySelectorAll('.limit')].map(section => ({
    section, input: section.querySelector('input'), erase: section.querySelector('[data-action="erase"]'),
    browse: section.querySelector('[data-action="browse"]'), problem: section.querySelector('.problem'), value: null
  }));
  const monthName = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  let owner = 0;
  let page = reviewDay.slice(0, 7) + '-01';
  let cursor = reviewDay;
  let restoring = false;
  const { date, dayShift, monthShift, assess } = window.invoiceDates;
  function validate() {
    const { values, errors } = assess(limits.map(limit => limit.input.value), reviewDay);
    limits.forEach((limit, i) => {
      limit.value = values[i];
      if (values[i]) limit.input.value = values[i];
    });
    limits.forEach((limit, i) => {
      limit.input.setAttribute('aria-invalid', String(Boolean(errors[i])));
      limit.problem.textContent = errors[i];
      limit.problem.hidden = !errors[i];
      limit.erase.hidden = !limit.input.value;
    });
    document.querySelector('#ledger-scope').textContent = errors.some(Boolean)
      ? 'Correct the issue dates before searching.'
      : `Issue dates: ${limits[0].value || 'any earlier date'} through ${limits[1].value || 'any later date'}.`;
    document.querySelector('#search-result').textContent = '';
    return !errors.some(Boolean);
  }
  function unavailable(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '0001-01-01') return 'Outside supported date format';
    if (value > reviewDay) return 'After review date';
    if (owner === 0 && limits[1].value && value > limits[1].value) return 'After latest issue date';
    if (owner === 1 && limits[0].value && value < limits[0].value) return 'Before earliest issue date';
    return '';
  }
  function expanded() {
    limits.forEach((limit, i) => [limit.input, limit.browse].forEach(element =>
      element.setAttribute('aria-expanded', String(!browser.hidden && i === owner))));
  }
  function dismiss(restore = false) {
    browser.hidden = true;
    expanded();
    if (restore) {
      restoring = true;
      (narrow.matches ? limits[owner].browse : limits[owner].input).focus();
      restoring = false;
    }
  }
  function paint() {
    document.querySelector('#editing-label').textContent = owner === 0 ? 'Choose earliest issue date' : 'Choose latest issue date';
    document.querySelector('#display-month').textContent = monthName.format(date(page));
    document.querySelector('#availability').textContent = `Available: ${owner === 1 && limits[0].value || '0001-01-01'} through ${owner === 0 && limits[1].value || reviewDay}.`;
    browser.querySelectorAll('[data-shift]').forEach(button => {
      button.disabled = monthShift(page, Number(button.dataset.shift)) === page;
    });
    const first = dayShift(page, -date(page).getUTCDay());
    const days = Array.from({ length: 42 }, (_, i) => dayShift(first, i));
    if (!days.includes(cursor) || unavailable(cursor)) cursor = days.find(value => !unavailable(value)) || null;
    options.replaceChildren(...days.map(value => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.iso = value;
      button.textContent = date(value).getUTCDate();
      const endpoint = limits.some(limit => limit.value === value);
      const between = limits[0].value && limits[1].value && value > limits[0].value && value < limits[1].value;
      button.className = [value.slice(0, 7) !== page.slice(0, 7) ? 'spill' : '', between ? 'between' : ''].join(' ');
      const reason = unavailable(value);
      button.disabled = Boolean(reason);
      button.tabIndex = value === cursor ? 0 : -1;
      button.setAttribute('aria-pressed', String(endpoint));
      button.setAttribute('aria-label', `${value}${limits[0].value === value ? ', earliest issue date' : ''}${limits[1].value === value ? ', latest issue date' : ''}${between ? ', inside issue window' : ''}${reason ? ', unavailable: ' + reason : ''}`);
      if (value === reviewDay) button.setAttribute('aria-current', 'date');
      return button;
    }));
  }
  function open(index, focusCalendar) {
    validate();
    owner = index;
    cursor = limits[index].value || limits[1 - index].value || reviewDay;
    page = cursor.slice(0, 7) + '-01';
    if (narrow.matches) limits[index].browse.focus(); // Leave the editable field before showing the calendar.
    limits[index].section.append(browser);
    browser.hidden = false;
    expanded(); paint();
    if (focusCalendar) {
      (options.querySelector('[tabindex="0"]') || browser.querySelector('[data-action="dismiss"]')).focus();
      if (narrow.matches) browser.scrollIntoView({ block: 'nearest' });
    }
  }
  limits.forEach((limit, index) => {
    limit.input.addEventListener('focus', () => {
      if (restoring) return;
      if (narrow.matches) dismiss(); else open(index, false);
    });
    limit.input.addEventListener('input', () => {
      limit.erase.hidden = !limit.input.value;
      document.querySelector('#search-result').textContent = '';
      document.querySelector('#ledger-scope').textContent = 'Editing issue dates…';
    });
    limit.input.addEventListener('change', () => {
      validate();
      if (!browser.hidden) {
        cursor = limit.value || limits[1 - index].value || reviewDay;
        page = cursor.slice(0, 7) + '-01'; paint();
      }
    });
    limit.input.addEventListener('keydown', event => {
      if (event.key === 'Tab') dismiss();
      if (event.key === 'ArrowDown') { event.preventDefault(); open(index, true); }
      if (event.key === 'Enter') { event.preventDefault(); if (validate()) dismiss(true); }
      if (event.key === 'Escape') { validate(); dismiss(); }
    });
    limit.browse.addEventListener('click', () => {
      if (!browser.hidden && owner === index) dismiss(true); else open(index, true);
    });
    limit.erase.addEventListener('click', () => {
      limit.input.value = ''; owner = index; validate(); dismiss(true);
    });
  });
  browser.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.action === 'dismiss') dismiss(true);
    if (button.dataset.shift) { page = monthShift(page, Number(button.dataset.shift)); paint(); }
    if (button.dataset.iso) {
      limits[owner].input.value = button.dataset.iso;
      validate(); dismiss(true);
    }
  });
  browser.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); dismiss(true); return; }
    const value = event.target.dataset.iso;
    if (!value) return;
    let next;
    const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -date(value).getUTCDay(), End: 6 - date(value).getUTCDay() };
    if (event.key in offsets) next = dayShift(value, offsets[event.key]);
    if (event.key === 'PageUp' || event.key === 'PageDown') next = monthShift(value, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
    if (!next) return;
    event.preventDefault();
    if (unavailable(next)) return;
    cursor = next; page = next.slice(0, 7) + '-01'; paint();
    options.querySelector('[tabindex="0"]').focus();
  });
  windowControl.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !browser.hidden) { event.preventDefault(); dismiss(true); }
  });
  windowControl.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!browser.hidden && !browser.contains(document.activeElement) && !limits[owner].section.contains(document.activeElement)) dismiss();
    });
  });
  document.addEventListener('pointerdown', event => {
    if (!windowControl.contains(event.target)) dismiss();
  });
  narrow.addEventListener('change', () => dismiss(browser.contains(document.activeElement)));
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault(); dismiss();
    if (!validate()) { limits.find(limit => limit.input.getAttribute('aria-invalid') === 'true').input.focus(); return; }
    document.querySelector('#search-result').textContent = `Preview search: ${limits[0].value || 'unbounded start'} → ${limits[1].value || 'unbounded end'}. No backend request is sent.`;
  });
})();
