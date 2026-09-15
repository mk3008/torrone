class CoveragePeriodEditor {
  constructor(root) {
    this.root = root;
    this.limit = '2026-10-20';
    this.tray = root.querySelector('[role="dialog"]');
    this.mode = root.querySelector('.coverage-mode');
    this.feedback = root.querySelector('[data-ref="range-status"]');
    this.fields = {
      start: root.querySelector('[data-ref="range-start"]'),
      end: root.querySelector('[data-ref="range-end"]')
    };
    this.availableDays = [...root.querySelectorAll('button[data-value]:not(:disabled)')];
    this.active = 'start';
    this.skipFocus = false;
    this.pointerWithin = false;
    this.bind();
    this.paint();
  }

  parse(raw) {
    if (!raw) return '';
    const packed = /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
    const candidate = packed ? `${packed[1]}-${packed[2]}-${packed[3]}` : raw;
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(candidate);
    if (!parts) return null;
    const value = new Date(Date.UTC(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3])));
    if (value.getUTCFullYear() !== Number(parts[1]) || value.getUTCMonth() !== Number(parts[2]) - 1 || value.getUTCDate() !== Number(parts[3])) return null;
    return candidate;
  }

  current() {
    return { start: this.fields.start.value, end: this.fields.end.value };
  }

  expanded(value) {
    this.fields.start.setAttribute('aria-expanded', String(value && this.active === 'start'));
    this.fields.end.setAttribute('aria-expanded', String(value && this.active === 'end'));
  }

  reveal(boundary, moveToCalendar = false) {
    this.active = boundary;
    this.mode.textContent = boundary === 'start' ? 'Choosing effective date' : 'Choosing expiry date';
    this.tray.hidden = false;
    this.expanded(true);
    if (moveToCalendar) requestAnimationFrame(() => (this.tray.querySelector('[aria-pressed="true"]') || this.availableDays[0]).focus());
  }

  dismiss(returnFocus = false) {
    this.tray.hidden = true;
    this.expanded(false);
    if (returnFocus && document.activeElement !== this.fields[this.active]) {
      this.skipFocus = true;
      this.fields[this.active].focus();
      this.skipFocus = false;
    }
  }

  paintDays() {
    const chosen = this.current();
    for (const button of this.availableDays) {
      const date = button.dataset.value;
      const edge = date === chosen.start || date === chosen.end;
      const span = chosen.start && chosen.end && date > chosen.start && date < chosen.end;
      button.classList.toggle('coverage-edge', Boolean(edge));
      button.classList.toggle('coverage-span', Boolean(span));
      button.toggleAttribute('aria-pressed', Boolean(edge));
      if (edge) button.setAttribute('aria-pressed', 'true');
    }
  }

  paint() {
    const chosen = this.current();
    this.paintDays();
    this.feedback.dataset.level = 'normal';
    if (chosen.start && chosen.end) this.feedback.textContent = `Coverage runs from ${chosen.start} through ${chosen.end}.`;
    else if (chosen.start) this.feedback.textContent = `Effective ${chosen.start}; expiry remains open.`;
    else if (chosen.end) this.feedback.textContent = `Effective date remains open; expires ${chosen.end}.`;
    else this.feedback.textContent = 'Both coverage boundaries are open.';
  }

  fail(field, text) {
    field.value = '';
    field.setAttribute('aria-invalid', 'true');
    this.feedback.dataset.level = 'problem';
    this.feedback.textContent = text;
    this.paintDays();
    this.reveal(field === this.fields.start ? 'start' : 'end');
  }

  save(boundary, raw) {
    const field = this.fields[boundary];
    const date = this.parse(raw.trim());
    if (date === null) { this.fail(field, 'Use yyyy-mm-dd or eight digits for a real date.'); return false; }
    if (date > this.limit) { this.fail(field, 'Coverage dates after 2026-10-20 are unavailable.'); return false; }
    const counterpart = boundary === 'start' ? this.fields.end.value : this.fields.start.value;
    const reversed = date && counterpart && (boundary === 'start' ? date > counterpart : date < counterpart);
    if (reversed) { this.fail(field, 'The effective date cannot follow the expiry date.'); return false; }
    field.value = date;
    field.removeAttribute('aria-invalid');
    this.paint();
    this.dismiss();
    return true;
  }

  moveDay(button, key) {
    const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[key];
    if (!offset) return false;
    const index = this.availableDays.indexOf(button);
    this.availableDays[Math.max(0, Math.min(this.availableDays.length - 1, index + offset))].focus();
    return true;
  }

  bind() {
    this.root.addEventListener('focusin', (event) => {
      const boundary = event.target.matches('[data-ref="range-start"]') ? 'start' : event.target.matches('[data-ref="range-end"]') ? 'end' : null;
      if (boundary && !this.skipFocus) this.reveal(boundary);
    });
    this.root.addEventListener('pointerdown', () => {
      this.pointerWithin = true;
      setTimeout(() => { this.pointerWithin = false; }, 50);
    });
    this.root.addEventListener('focusout', () => setTimeout(() => {
      if (!this.pointerWithin && !this.root.contains(document.activeElement)) this.dismiss();
    }, 0));
    this.root.addEventListener('input', (event) => {
      if (event.target.matches('input[data-ref]')) event.target.removeAttribute('aria-invalid');
    });
    this.root.addEventListener('change', (event) => {
      if (event.target === this.fields.start) this.save('start', event.target.value);
      if (event.target === this.fields.end) this.save('end', event.target.value);
    });
    this.root.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-value]');
      if (button && this.save(this.active, button.dataset.value)) this.dismiss(true);
    });
    this.root.addEventListener('keydown', (event) => {
      const fieldBoundary = event.target === this.fields.start ? 'start' : event.target === this.fields.end ? 'end' : null;
      if (fieldBoundary && event.key === 'Escape') { event.preventDefault(); this.dismiss(); return; }
      if (fieldBoundary && event.key === 'ArrowDown') { event.preventDefault(); this.reveal(fieldBoundary, true); return; }
      const day = event.target.closest('button[data-value]');
      if (!day) return;
      if (this.moveDay(day, event.key)) event.preventDefault();
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (this.save(this.active, day.dataset.value)) this.dismiss(true); }
      if (event.key === 'Escape') { event.preventDefault(); this.dismiss(true); }
    });
  }
}

new CoveragePeriodEditor(document.getElementById('coverage-widget'));
