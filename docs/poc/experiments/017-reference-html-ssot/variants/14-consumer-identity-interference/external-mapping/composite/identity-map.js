(() => {
  const file = location.pathname.split('/').pop();
  const mapping = [
    ['entity-query', '#carrier-search'],
    ['entity-option-primary', '#carrier-option-primary'],
    ['entity-empty', '.no-match'],
    ['entity-selection', '.assigned-carrier'],
    ['entity-clear', '.remove-carrier']
  ];

  if (file === 'wrong-target.html') mapping[1][1] = '.carrier-result:nth-of-type(2)';
  if (file === 'missing.html') mapping.splice(3, 1);
  if (file === 'ambiguous.html') mapping[1][1] = '.carrier-result';
  if (file === 'id-change-repaired.html') mapping[1][1] = '#carrier-option-preferred';
  if (file === 'class-change-repaired.html') mapping[2][1] = '.no-carrier-results';

  const report = [];
  for (const [key, selector] of mapping) {
    const matches = [...document.querySelectorAll(selector)];
    for (const element of matches) element.setAttribute('data-ref', key);
    report.push({ key, selector, matches: matches.length });
  }
  window.__referenceIdentityMapping = report;
})();
