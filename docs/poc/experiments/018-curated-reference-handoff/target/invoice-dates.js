// Date-only operations: no local timezone or browser state.
(function (root) {
  const date = value => new Date(value + 'T00:00:00Z');
  const iso = value => value.toISOString().slice(0, 10);
  const dayShift = (value, count) => { const d = date(value); d.setUTCDate(d.getUTCDate() + count); return iso(d); };
  function monthShift(value, count) {
    const d = date(value), day = d.getUTCDate();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() + count);
    if (d.getUTCFullYear() < 1 || d.getUTCFullYear() > 9999) return value;
    const last = new Date(d); last.setUTCMonth(last.getUTCMonth() + 1); last.setUTCDate(0);
    d.setUTCDate(Math.min(day, last.getUTCDate()));
    return iso(d);
  }
  function parse(raw) {
    const parts = /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(raw.trim());
    if (!parts || !/^(\d{8}|\d{4}-\d{2}-\d{2})$/.test(raw.trim())) return null;
    const value = parts.slice(1).join('-');
    const d = date(value);
    return parts[1] !== '0000' && Number.isFinite(d.valueOf()) && iso(d) === value ? value : null;
  }
  function assess(raw, cutoff) {
    const values = raw.map(value => parse(value));
    const errors = raw.map((value, i) => {
      if (value.trim() && !values[i]) return 'Enter a real date using YYYY-MM-DD or YYYYMMDD.';
      if (values[i] > cutoff) { values[i] = null; return `Issue date cannot be later than ${cutoff}.`; }
      return '';
    });
    if (values[0] && values[1] && values[0] > values[1]) {
      errors[1] = 'Latest issue date must be on or after earliest issue date.';
      values[1] = null;
    }
    return { values, errors };
  }
  const api = { date, dayShift, monthShift, parse, assess };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.invoiceDates = api;
})(typeof window === 'undefined' ? {} : window);
