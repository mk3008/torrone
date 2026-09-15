(() => {
  'use strict';

  const STYLE_PROPERTIES = [
    'display', 'position', 'overflowX', 'overflowY',
    'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
    'color', 'backgroundColor',
    'borderTopWidth', 'borderTopStyle', 'borderTopColor',
    'borderRightWidth', 'borderRightStyle', 'borderRightColor',
    'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor',
    'borderLeftWidth', 'borderLeftStyle', 'borderLeftColor',
    'borderRadius', 'paddingTop', 'paddingRight', 'paddingBottom',
    'paddingLeft', 'gap', 'rowGap', 'columnGap', 'alignItems',
    'justifyContent', 'boxShadow', 'outlineColor', 'outlineStyle',
    'outlineWidth', 'opacity', 'cursor'
  ];

  const STATE_ATTRIBUTES = [
    'aria-expanded', 'aria-pressed', 'aria-current', 'aria-selected',
    'aria-checked', 'aria-invalid', 'aria-modal', 'aria-controls',
    'aria-describedby', 'disabled', 'hidden', 'open'
  ];

  const IMPORTANT_SELECTOR = [
    'header', 'nav', 'main', 'aside', 'form', 'table', 'dialog',
    'button', 'a[href]', 'input', 'select', 'textarea', '[role]'
  ].join(',');

  const INTERACTIVE_SELECTOR = [
    'button', 'a[href]', 'input:not([type="hidden"])', 'select',
    'textarea', '[role="button"]', '[role="link"]', '[role="checkbox"]',
    '[role="radio"]', '[role="switch"]', '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const HARNESS_SELECTOR = '[data-reference-harness]';

  const UNIQUE_SEMANTIC_ROLES = new Set([
    'banner', 'navigation', 'main', 'form', 'table', 'dialog',
    'menu', 'menuitem'
  ]);

  const ARIA_INVALID_TOKENS = new Set(['false', 'grammar', 'spelling', 'true']);
  const CONFORMANCE_IDREF_ATTRIBUTES = [
    'aria-describedby', 'aria-labelledby', 'aria-errormessage'
  ];

  function isHarnessNode(element) {
    return Boolean(element?.closest?.(HARNESS_SELECTOR));
  }

  function productQueryAll(selector) {
    return [...document.querySelectorAll(selector)].filter((element) => !isHarnessNode(element));
  }

  function rounded(value) {
    return Math.round(value * 100) / 100;
  }

  function inferredRole(element) {
    const explicit = element.getAttribute('role');
    if (explicit) return explicit;
    const tag = element.tagName.toLowerCase();
    const type = (element.getAttribute('type') || '').toLowerCase();
    if (tag === 'header') {
      return element.parentElement?.closest('article,aside,main,nav,section') ? '' : 'banner';
    }
    if (tag === 'nav') return 'navigation';
    if (tag === 'main') return 'main';
    if (tag === 'aside') return 'complementary';
    if (tag === 'form') return 'form';
    if (tag === 'table') return 'table';
    if (tag === 'dialog') return 'dialog';
    if (tag === 'button') return 'button';
    if (tag === 'a' && element.hasAttribute('href')) return 'link';
    if (tag === 'select') return 'combobox';
    if (tag === 'textarea') return 'textbox';
    if (tag === 'input' && ['checkbox', 'radio', 'button', 'submit'].includes(type)) {
      return type === 'submit' || type === 'button' ? 'button' : type;
    }
    if (tag === 'input') return 'textbox';
    return '';
  }

  function accessibleName(element) {
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const value = labelledBy.split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent?.trim() || '')
        .filter(Boolean)
        .join(' ');
      if (value) return value;
    }
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel?.trim()) return ariaLabel.trim();
    if (element.labels?.length) {
      const value = [...element.labels]
        .map((label) => label.textContent?.trim() || '')
        .filter(Boolean)
        .join(' ');
      if (value) return value;
    }
    const alt = element.getAttribute('alt');
    if (alt?.trim()) return alt.trim();
    const title = element.getAttribute('title');
    if (title?.trim()) return title.trim();
    if (element instanceof HTMLInputElement && element.value && ['button', 'submit'].includes(element.type)) {
      return element.value.trim();
    }
    return (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160);
  }

  function isVisible(element) {
    if (element.hidden) return false;
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function conformanceTarget(element) {
    const explicit = element.getAttribute?.('data-ref');
    if (explicit) return explicit;
    if (element.id) return `id:${element.id}`;
    const role = inferredRole(element);
    return role ? `${element.tagName.toLowerCase()}:${role}` : element.tagName.toLowerCase();
  }

  function inspectConformance() {
    const issues = [];
    const add = (code, target, detail) => issues.push({ code, target, detail });

    for (const element of productQueryAll('[aria-invalid]')) {
      const raw = element.getAttribute('aria-invalid') || '';
      const normalized = raw.trim().toLowerCase();
      if (normalized && !ARIA_INVALID_TOKENS.has(normalized)) {
        add('unsupported-aria-invalid-token', conformanceTarget(element), `aria-invalid has unsupported value ${JSON.stringify(raw)}.`);
      }
    }

    for (const element of productQueryAll(CONFORMANCE_IDREF_ATTRIBUTES.map((attribute) => `[${attribute}]`).join(','))) {
      for (const attribute of CONFORMANCE_IDREF_ATTRIBUTES) {
        const ids = (element.getAttribute(attribute) || '').split(/\s+/).filter(Boolean);
        for (const id of ids) {
          const target = document.getElementById(id);
          if (!target) {
            add('missing-aria-reference', conformanceTarget(element), `${attribute} references missing id ${id}.`);
          } else if (isHarnessNode(target)) {
            add('aria-reference-enters-harness', conformanceTarget(element), `${attribute} references excluded harness id ${id}.`);
          }
        }
      }
    }

    for (const label of productQueryAll('label[for]')) {
      if (!label.control) {
        add('invalid-label-for-target', conformanceTarget(label), `Label for=${JSON.stringify(label.getAttribute('for') || '')} has no labelable control.`);
      }
    }

    const harnessKeys = [
      ...document.querySelectorAll('[data-reference-harness][data-ref]'),
      ...document.querySelectorAll('[data-reference-harness] [data-ref]')
    ];
    for (const element of [...new Set(harnessKeys)]) {
      add('observation-key-inside-harness', conformanceTarget(element), 'data-ref is inside an excluded Reference harness.');
    }

    const controls = productQueryAll('input:not([type="hidden"]),select,textarea')
      .filter((element) => element.hasAttribute('data-ref') || element.id)
      .map((element) => {
        const rawInvalid = element.getAttribute('aria-invalid');
        const describedBy = (element.getAttribute('aria-describedby') || '')
          .split(/\s+/)
          .filter(Boolean)
          .map((id) => {
            const target = document.getElementById(id);
            return {
              id,
              exists: Boolean(target),
              visible: Boolean(target && !isHarnessNode(target) && isVisible(target))
            };
          });
        return {
          target: conformanceTarget(element),
          ariaInvalidPresent: element.hasAttribute('aria-invalid'),
          ariaInvalidValue: rawInvalid,
          nativeInvalid: Boolean(element.willValidate && !element.validity.valid),
          describedBy
        };
      });

    return {
      issues: issues.sort((left, right) => `${left.code}:${left.target}:${left.detail}`.localeCompare(`${right.code}:${right.target}:${right.detail}`)),
      facts: { controls }
    };
  }

  function semanticDescriptor(element, controllingKeys = []) {
    if (controllingKeys.length === 1) return `semantic:controlled-by:${controllingKeys[0]}`;
    const role = inferredRole(element) || 'none';
    if (UNIQUE_SEMANTIC_ROLES.has(role)) return `semantic:role:${role}`;
    if (element.hasAttribute('aria-pressed')) return `semantic:role:${role}:aria-pressed`;
    if (element.hasAttribute('aria-expanded')) return `semantic:role:${role}:aria-expanded`;
    if (element.hasAttribute('aria-live')) {
      return `semantic:aria-live:${element.getAttribute('aria-live') || 'off'}`;
    }
    return null;
  }

  function semanticIndex() {
    const buckets = new Map();
    const controlledTargets = new Map();
    for (const controller of productQueryAll('[data-ref][aria-controls]')) {
      const controllerKey = controller.getAttribute('data-ref');
      const ids = (controller.getAttribute('aria-controls') || '').split(/\s+/).filter(Boolean);
      for (const id of ids) {
        const target = document.getElementById(id);
        if (!target || isHarnessNode(target) || target.hasAttribute('data-ref')) continue;
        if (!controlledTargets.has(target)) controlledTargets.set(target, []);
        controlledTargets.get(target).push(controllerKey);
      }
    }
    const candidates = [...new Set([
      ...productQueryAll(`${IMPORTANT_SELECTOR},[aria-live]`),
      ...controlledTargets.keys()
    ])];
    for (const element of candidates) {
      const descriptor = semanticDescriptor(element, controlledTargets.get(element) || []);
      if (!descriptor) continue;
      if (!buckets.has(descriptor)) buckets.set(descriptor, []);
      buckets.get(descriptor).push(element);
    }

    const byKey = new Map();
    const byElement = new Map();
    const ambiguities = [];
    for (const [descriptor, matches] of buckets) {
      if (matches.length === 1) {
        byKey.set(descriptor, matches[0]);
        byElement.set(matches[0], descriptor);
      } else if (matches.some((element) => !element.hasAttribute('data-ref'))) {
        ambiguities.push({ key: descriptor, count: matches.length });
      }
    }
    return {
      byKey,
      byElement,
      ambiguities: ambiguities.sort((left, right) => left.key.localeCompare(right.key))
    };
  }

  function find(target) {
    const explicit = productQueryAll('[data-ref]')
      .find((element) => element.getAttribute('data-ref') === String(target));
    if (explicit) return explicit;
    return semanticIndex().byKey.get(String(target)) || null;
  }

  function elementSnapshot(element, key, keyByElement) {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const styles = {};
    for (const property of STYLE_PROPERTIES) styles[property] = style[property];

    const attributes = {};
    for (const attribute of STATE_ATTRIBUTES) {
      if (attribute === 'disabled') attributes.disabled = Boolean(element.disabled || element.hasAttribute('disabled'));
      else if (attribute === 'hidden') attributes.hidden = Boolean(element.hidden || element.hasAttribute('hidden'));
      else if (attribute === 'open') attributes.open = Boolean(element.open || element.hasAttribute('open'));
      else attributes[attribute] = element.getAttribute(attribute);
    }
    if ('checked' in element) attributes.checked = Boolean(element.checked);

    const relationships = {};
    for (const [name, attribute] of [['controls', 'aria-controls'], ['describedBy', 'aria-describedby']]) {
      const ids = (element.getAttribute(attribute) || '').split(/\s+/).filter(Boolean);
      if (!ids.length) continue;
      relationships[name] = ids.map((id) => {
        const target = document.getElementById(id);
        if (!target) return 'missing';
        const stableIdentity = keyByElement.get(target) || target.getAttribute('data-ref');
        if (stableIdentity) return stableIdentity;
        if (name === 'describedBy') {
          const role = inferredRole(target) || 'none';
          const visibility = isVisible(target) ? 'visible' : 'hidden';
          return `unkeyed:describedBy:${target.tagName.toLowerCase()}:${role}:${visibility}`;
        }
        return `id:${id}`;
      });
    }

    return {
      key,
      tag: element.tagName.toLowerCase(),
      role: inferredRole(element),
      name: accessibleName(element),
      visible: isVisible(element),
      attributes,
      relationships,
      styles,
      box: {
        x: rounded(rect.x),
        y: rounded(rect.y),
        width: rounded(rect.width),
        height: rounded(rect.height)
      }
    };
  }

  function parseColor(value) {
    const match = value.match(/^rgba?\((\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)[, ]+(\d+(?:\.\d+)?)(?:[, /]+(\d+(?:\.\d+)?))?\)$/);
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: match[4] === undefined ? 1 : Number(match[4])
    };
  }

  function backgroundFor(element) {
    let current = element;
    while (current) {
      const color = parseColor(getComputedStyle(current).backgroundColor);
      if (color && color.a >= 0.98) return color;
      current = current.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  }

  function luminance(color) {
    const channel = (value) => {
      const normalized = value / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
  }

  function contrast(foreground, background) {
    const first = luminance(foreground);
    const second = luminance(background);
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
  }

  function accessibilityIssues() {
    const issues = [];
    const add = (code, target, detail) => issues.push({ code, target, detail });

    if (!document.documentElement.lang) add('missing-html-lang', 'html', 'The document has no lang attribute.');

    const ids = new Map();
    for (const element of productQueryAll('[id]')) {
      const count = (ids.get(element.id) || 0) + 1;
      ids.set(element.id, count);
    }
    for (const [id, count] of ids) {
      if (count > 1) add('duplicate-id', `#${id}`, `${count} elements use this ID.`);
    }

    for (const element of productQueryAll(INTERACTIVE_SELECTOR)) {
      if (isVisible(element) && !accessibleName(element)) {
        add('unnamed-interactive', element.getAttribute('data-ref') || element.id || element.tagName.toLowerCase(), 'Visible interactive element has no accessible name.');
      }
    }

    for (const image of productQueryAll('img')) {
      if (!image.hasAttribute('alt')) add('image-without-alt', image.id || image.currentSrc || 'img', 'Image lacks an alt attribute.');
    }

    for (const dialog of productQueryAll('dialog,[role="dialog"],[role="alertdialog"]')) {
      if (!accessibleName(dialog)) add('unnamed-dialog', dialog.getAttribute('data-ref') || dialog.id || 'dialog', 'Dialog has no accessible name.');
    }

    for (const controller of productQueryAll('[aria-controls]')) {
      const targets = controller.getAttribute('aria-controls').split(/\s+/).filter(Boolean);
      for (const target of targets) {
        if (!document.getElementById(target)) {
          add('missing-aria-controls-target', controller.getAttribute('data-ref') || controller.id || controller.tagName.toLowerCase(), `No element has id ${target}.`);
        }
      }
    }

    const productMainCount = productQueryAll('main').length;
    const h1Count = productQueryAll('h1').length;
    if (productMainCount > 0 && h1Count !== 1) add('unexpected-h1-count', 'document', `Expected one h1 but found ${h1Count}.`);

    const contrastTargets = productQueryAll('[data-ref],button,a,label,th,td,h1,h2,h3,p');
    const seen = new Set();
    for (const element of contrastTargets) {
      if (!isVisible(element) || !(element.textContent || '').trim()) continue;
      const target = element.getAttribute('data-ref') || element.id || `${element.tagName.toLowerCase()}:${accessibleName(element).slice(0, 40)}`;
      if (seen.has(target)) continue;
      seen.add(target);
      const style = getComputedStyle(element);
      const foreground = parseColor(style.color);
      if (!foreground || foreground.a < 0.98) continue;
      const ratio = contrast(foreground, backgroundFor(element));
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700);
      const minimum = large ? 3 : 4.5;
      if (ratio + 0.01 < minimum) add('low-text-contrast', target, `Contrast ${rounded(ratio)} is below ${minimum}.`);
    }

    return issues.sort((left, right) => `${left.code}:${left.target}`.localeCompare(`${right.code}:${right.target}`));
  }

  function contract() {
    const node = document.querySelector('script[type="application/json"][data-reference-scenarios]');
    if (!node) return { version: 1, scenarios: [], parseError: null };
    try {
      const parsed = JSON.parse(node.textContent);
      return {
        version: parsed.version || 1,
        scenarios: Array.isArray(parsed.scenarios) ? parsed.scenarios : [],
        parseError: null
      };
    } catch (error) {
      return { version: 1, scenarios: [], parseError: String(error.message || error) };
    }
  }

  function semanticInventory() {
    const counts = {};
    for (const element of productQueryAll(IMPORTANT_SELECTOR)) {
      const role = inferredRole(element);
      if (!role) continue;
      counts[role] = (counts[role] || 0) + 1;
    }
    return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
  }

  function capture() {
    const explicit = productQueryAll('[data-ref]');
    const semantics = semanticIndex();
    const semantic = [...semantics.byKey.entries()]
      .filter(([, element]) => !element.hasAttribute('data-ref'))
      .sort(([left], [right]) => left.localeCompare(right));
    const candidates = [
      ...explicit.map((element) => ({ key: element.getAttribute('data-ref'), element })),
      ...semantic.map(([key, element]) => ({ key, element }))
    ];
    const mode = explicit.length && semantic.length
      ? 'mixed-data-ref-semantic'
      : explicit.length
        ? 'explicit-data-ref'
        : 'heuristic-semantic';
    const elements = {};
    const duplicateKeys = [];
    const keyByElement = new Map();
    const seenKeys = new Set();

    candidates.forEach(({ element, key }) => {
      if (seenKeys.has(key)) duplicateKeys.push(key);
      else {
        seenKeys.add(key);
        keyByElement.set(element, key);
      }
    });
    candidates.forEach(({ element, key }) => {
      if (!elements[key]) elements[key] = elementSnapshot(element, key, keyByElement);
    });

    const active = document.activeElement;
    let activeCandidate = isHarnessNode(active) ? null : active;
    while (activeCandidate && activeCandidate !== document.body && !keyByElement.has(activeCandidate)) {
      activeCandidate = activeCandidate.parentElement;
    }
    const activeRef = activeCandidate && activeCandidate !== document.body
      ? keyByElement.get(activeCandidate) || null
      : null;

    const headings = productQueryAll('h1,h2,h3,h4,h5,h6').map((heading) => ({
      level: Number(heading.tagName.slice(1)),
      text: (heading.textContent || '').replace(/\s+/g, ' ').trim()
    }));

    return {
      mode,
      contract: contract(),
      document: {
        title: document.title,
        lang: document.documentElement.lang || '',
        viewport: { width: window.innerWidth, height: window.innerHeight },
        activeRef,
        headings,
        landmarks: {
           banner: productQueryAll('header,[role="banner"]').length,
           navigation: productQueryAll('nav,[role="navigation"]').length,
           main: productQueryAll('main,[role="main"]').length,
           form: productQueryAll('form,[role="form"]').length,
           table: productQueryAll('table,[role="table"],[role="grid"]').length,
           dialog: productQueryAll('dialog,[role="dialog"],[role="alertdialog"]').length
         }
       },
      observationBoundary: {
        excludedHarnessRoots: document.querySelectorAll(HARNESS_SELECTOR).length
      },
      duplicateKeys: [...new Set(duplicateKeys)].sort(),
      semanticAmbiguities: semantics.ambiguities,
      semanticInventory: semanticInventory(),
      elements,
      accessibilityIssues: accessibilityIssues()
    };
  }

  globalThis.ReferenceUiCore = Object.freeze({ capture, find, inspectConformance });
})();
