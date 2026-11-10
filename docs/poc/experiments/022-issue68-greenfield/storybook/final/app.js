const ICONS = {
  left: './icons/chevron-left.svg',
  right: './icons/chevron-right.svg',
  down: './icons/chevron-down.svg',
  close: './icons/x.svg',
};

const esc = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[char]));

const icon = (src, className = '') =>
  `<img class="icon ${className}" src="${src}" alt="" aria-hidden="true">`;

export async function mount(root, options = {}) {
  if (!root) throw new Error('mount target is required');

  const fixture = options.fixture ?? await fetch('./fixture.json').then((response) => {
    if (!response.ok) throw new Error('fixture.json could not be loaded');
    return response.json();
  });
  const requestedCase = options.caseName ?? new URLSearchParams(location.search).get('case') ?? 'both';
  const configuration = fixture.cases[requestedCase] ?? fixture.cases.both;
  const documents = fixture.docs.slice(0, configuration.documents).map((entry) => ({
    id: entry[0],
    name: entry[1],
    affiliation: entry[2],
    children: entry[3].slice(0, configuration.initialChildren),
  }));

  const state = {
    documents,
    selectedDocumentId: documents[0]?.id ?? null,
    selectedChildren: Object.fromEntries(documents.map((document) => [document.id, document.children[0]])),
    focusedParentId: documents[0]?.id ?? null,
    focusedChild: documents[0]?.children[0] ?? null,
    parentOverflow: false,
    childOverflow: false,
    chooser: null,
    returnFocus: null,
  };

  root.innerHTML = `
    <div class="workspace-shell">
      <button class="workspace-action" type="button">ワークスペース操作</button>
      <div class="reference" aria-label="文書ワークスペース"></div>
      <section class="content-panel" tabindex="-1"></section>
      <button class="content-action" type="button">内容を確認</button>
    </div>`;

  const reference = root.querySelector('.reference');
  const content = root.querySelector('.content-panel');
  const isNarrow = () => matchMedia('(max-width: 599px)').matches;
  const selectedDocument = () => state.documents.find((doc) => doc.id === state.selectedDocumentId);

  function tabMarkup(document, selected) {
    const focusable = state.focusedParentId === document.id ? '0' : '-1';
    return `
      <div class="parent${selected ? ' is-selected' : ''}" data-parent-id="${esc(document.id)}">
        <button type="button" role="tab" aria-selected="${selected}" tabindex="${focusable}"
          aria-controls="document-content" data-parent-tab="${esc(document.id)}"
          aria-label="${esc(document.name)}、${esc(document.affiliation)}">
          <span class="tab-copy">
            <span class="tab-label">${esc(document.name)}</span>
            <span class="affiliation">${esc(document.affiliation)}</span>
          </span>
        </button>
        <button class="close-tab" type="button" tabindex="${selected ? '0' : '-1'}"
          aria-label="${esc(document.name)}を閉じる" data-close="${esc(document.id)}">${icon(ICONS.close)}</button>
        <span class="tab-tooltip" role="tooltip">${esc(document.name)}・${esc(document.affiliation)}</span>
      </div>`;
  }

  function childMarkup(label, selected) {
    const focusable = state.focusedChild === label ? '0' : '-1';
    return `<button type="button" role="tab" aria-selected="${selected}" tabindex="${focusable}"
      aria-controls="document-content" class="child-tab${selected ? ' is-selected' : ''}"
      data-child-tab="${esc(label)}">${esc(label)}</button>`;
  }

  function measureOverflow(kind, count) {
    if (count < 2) return false;
    const row = reference.querySelector(`.row.${kind}-row`);
    const viewport = row?.querySelector('.tab-viewport');
    const track = viewport?.querySelector('.tab-track');
    if (!viewport || !track) return false;

    // The viewport excludes row insets. scrollWidth includes fixed tab widths and gaps.
    // Compare without tolerance so a row one CSS pixel short enters overflow mode.
    return track.scrollWidth > viewport.clientWidth;
  }

  function renderParentRow(mode = 'measure') {
    const narrowCollapsed = mode !== 'measure' && isNarrow() && state.parentOverflow;
    const desktopScroll = mode !== 'measure' && !isNarrow() && state.parentOverflow;
    const current = selectedDocument();
    let tabs = state.documents;
    if (narrowCollapsed && current) tabs = [current];
    const otherCount = Math.max(0, state.documents.length - 1);

    return `<div class="row parent-row${desktopScroll ? ' has-scroll' : ''}" aria-label="開いている文書">
      ${desktopScroll ? `<button class="scroll-control" type="button" data-scroll="-1" aria-label="文書を左に送る">${icon(ICONS.left)}</button>` : ''}
      <div class="tab-viewport">
        <div role="tablist" aria-label="文書" class="tab-track">
          ${tabs.map((document) => tabMarkup(document, document.id === state.selectedDocumentId)).join('')}
        </div>
      </div>
      ${desktopScroll ? `<button class="scroll-control" type="button" data-scroll="1" aria-label="文書を右に送る">${icon(ICONS.right)}</button>` : ''}
      ${narrowCollapsed ? `<button class="more parent-more" type="button" aria-expanded="${state.chooser === 'documents'}"
        aria-haspopup="dialog" aria-label="文書を切り替える、ほか${otherCount}" data-open="documents"><span>ほか${otherCount}</span>${icon(ICONS.right)}</button>` : ''}
    </div>`;
  }

  function renderChildRow(mode = 'measure') {
    const document = selectedDocument();
    const children = document?.children ?? [];
    const selected = document ? state.selectedChildren[document.id] : null;
    const narrowCollapsed = mode !== 'measure' && isNarrow() && state.childOverflow;
    const desktopScroll = mode !== 'measure' && !isNarrow() && state.childOverflow;
    const visible = narrowCollapsed ? children.filter((label) => label === selected) : children;
    const otherCount = Math.max(0, children.length - 1);

    return `<div class="row child-row${desktopScroll ? ' has-scroll' : ''}" aria-label="文書内のタブ">
      ${desktopScroll ? `<button class="scroll-control" type="button" data-child-scroll="-1" aria-label="項目を左に送る">${icon(ICONS.left)}</button>` : ''}
      <div class="tab-viewport">
        <div role="tablist" aria-label="${document ? esc(document.name) : '文書'}の項目" class="tab-track">
          ${visible.map((label) => childMarkup(label, label === selected)).join('')}
        </div>
      </div>
      ${desktopScroll ? `<button class="scroll-control" type="button" data-child-scroll="1" aria-label="項目を右に送る">${icon(ICONS.right)}</button>` : ''}
      ${narrowCollapsed ? `<button class="more child-more" type="button" aria-expanded="${state.chooser === 'children'}"
        aria-haspopup="listbox" aria-label="項目を切り替える、ほか${otherCount}" data-open="children"><span>ほか${otherCount}</span>${icon(ICONS.down, state.chooser === 'children' ? 'turn' : '')}</button>` : ''}
    </div>`;
  }

  function renderChooser() {
    if (state.chooser === 'documents') {
      const count = Math.max(0, state.documents.length - 1);
      return `<div class="chooser-backdrop" data-dismiss>
        <section class="document-chooser" role="dialog" aria-modal="true" aria-label="文書を切り替える、ほか${count}">
          <div class="chooser-heading"><h2>文書を切り替える</h2><button type="button" data-dismiss aria-label="文書選択を閉じる">${icon(ICONS.close)}</button></div>
          <div class="document-grid">${state.documents.map((document) => `
            <button type="button" class="document-card${document.id === state.selectedDocumentId ? ' is-current' : ''}" data-choose-document="${esc(document.id)}">
              <span class="thumbnail" aria-hidden="true"><span></span><span></span><span></span></span>
              <span><strong>${esc(document.name)}</strong><small>${esc(document.affiliation)}</small></span>
            </button>`).join('')}</div>
        </section>
      </div>`;
    }
    if (state.chooser === 'children') {
      const document = selectedDocument();
      const selected = document ? state.selectedChildren[document.id] : null;
      const alternatives = document?.children.filter((label) => label !== selected) ?? [];
      return `<div class="child-menu" role="listbox" aria-label="項目を切り替える、ほか${alternatives.length}">
        ${alternatives.map((label) => `<button role="option" aria-selected="false" type="button" data-choose-child="${esc(label)}">${esc(label)}</button>`).join('')}
      </div>`;
    }
    return '';
  }

  function renderContent() {
    const document = selectedDocument();
    if (!document) {
      content.id = 'document-content';
      content.innerHTML = '<div class="empty-state"><h2>開いている文書はありません</h2><p>文書を開くと、ここに内容が表示されます。</p></div>';
      return;
    }
    const child = state.selectedChildren[document.id];
    content.id = 'document-content';
    content.innerHTML = `
      <p class="eyebrow">${esc(document.affiliation)} / ${esc(child)}</p>
      <h2>${esc(document.name)}の${esc(child)}</h2>
      <div class="mock-content" aria-label="モック文書内容">
        <div class="summary-card"><span>進行状況</span><strong>確認中</strong></div>
        <div class="summary-card"><span>最終更新</span><strong>本日 10:24</strong></div>
        <div class="mock-lines" aria-hidden="true"><span></span><span></span><span></span></div>
      </div>`;
  }

  function render({ focusSelector, preserveScroll = {} } = {}) {
    reference.innerHTML = `${renderParentRow('measure')}${renderChildRow('measure')}`;
    state.parentOverflow = measureOverflow('parent', state.documents.length);
    state.childOverflow = measureOverflow('child', selectedDocument()?.children.length ?? 0);
    reference.innerHTML = `${renderParentRow()}${renderChildRow()}${renderChooser()}`;
    renderContent();
    bindEvents();

    const parentTrack = reference.querySelector('.parent-row .tab-viewport');
    const childTrack = reference.querySelector('.child-row .tab-viewport');
    if (parentTrack && preserveScroll.parent != null) parentTrack.scrollLeft = preserveScroll.parent;
    if (childTrack && preserveScroll.child != null) childTrack.scrollLeft = preserveScroll.child;
    if (focusSelector) requestAnimationFrame(() => reference.querySelector(focusSelector)?.focus());
  }

  function visibleTabs(kind) {
    return [...reference.querySelectorAll(kind === 'parent' ? '[data-parent-tab]' : '[data-child-tab]')];
  }

  function onTabKeydown(event, kind) {
    const tabs = visibleTabs(kind);
    const index = tabs.indexOf(event.currentTarget);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + delta + tabs.length) % tabs.length];
      tabs.forEach((tab) => { tab.tabIndex = tab === next ? 0 : -1; });
      if (kind === 'parent') state.focusedParentId = next.dataset.parentTab;
      else state.focusedChild = next.dataset.childTab;
      next.focus();
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (kind === 'parent') selectDocument(event.currentTarget.dataset.parentTab, true);
      else selectChild(event.currentTarget.dataset.childTab, true);
    }
  }

  function selectDocument(id, focus = false) {
    if (!state.documents.some((document) => document.id === id)) return;
    state.selectedDocumentId = id;
    state.focusedParentId = id;
    state.focusedChild = state.selectedChildren[id];
    state.chooser = null;
    render({ focusSelector: focus ? `[data-parent-tab="${CSS.escape(id)}"]` : undefined });
  }

  function selectChild(label, focusTab = false, focusTrigger = false) {
    const document = selectedDocument();
    if (!document?.children.includes(label)) return;
    state.selectedChildren[document.id] = label;
    state.focusedChild = label;
    state.chooser = null;
    render({
      focusSelector: focusTrigger ? '[data-open="children"]' : focusTab ? `[data-child-tab="${CSS.escape(label)}"]` : undefined,
    });
  }

  function closeDocument(id) {
    const closingIndex = state.documents.findIndex((document) => document.id === id);
    if (closingIndex < 0) return;
    const wasSelected = state.selectedDocumentId === id;
    state.documents.splice(closingIndex, 1);
    delete state.selectedChildren[id];
    if (wasSelected) {
      const replacement = state.documents[closingIndex] ?? state.documents[closingIndex - 1];
      state.selectedDocumentId = replacement?.id ?? null;
    }
    const focusDocument = state.documents[closingIndex] ?? state.documents[closingIndex - 1];
    state.focusedParentId = focusDocument?.id ?? null;
    if (state.selectedDocumentId) state.focusedChild = state.selectedChildren[state.selectedDocumentId];
    render({ focusSelector: focusDocument ? `[data-parent-tab="${CSS.escape(focusDocument.id)}"]` : undefined });
    if (!focusDocument) root.querySelector('.workspace-action').focus();
  }

  function dismissChooser() {
    if (!state.chooser) return;
    const selector = state.returnFocus;
    state.chooser = null;
    state.returnFocus = null;
    render({ focusSelector: selector });
  }

  function bindEvents() {
    reference.querySelectorAll('[data-parent-tab]').forEach((tab) => {
      tab.addEventListener('click', () => selectDocument(tab.dataset.parentTab));
      tab.addEventListener('keydown', (event) => onTabKeydown(event, 'parent'));
      tab.addEventListener('focus', () => { state.focusedParentId = tab.dataset.parentTab; });
    });
    reference.querySelectorAll('[data-child-tab]').forEach((tab) => {
      tab.addEventListener('click', () => selectChild(tab.dataset.childTab));
      tab.addEventListener('keydown', (event) => onTabKeydown(event, 'child'));
      tab.addEventListener('focus', () => { state.focusedChild = tab.dataset.childTab; });
    });
    reference.querySelectorAll('[data-close]').forEach((button) =>
      button.addEventListener('click', () => closeDocument(button.dataset.close)));

    reference.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => {
      reference.querySelector('.parent-row .tab-viewport')?.scrollBy({ left: Number(button.dataset.scroll) * 144, behavior: 'smooth' });
    }));
    reference.querySelectorAll('[data-child-scroll]').forEach((button) => button.addEventListener('click', () => {
      reference.querySelector('.child-row .tab-viewport')?.scrollBy({ left: Number(button.dataset.childScroll) * 116, behavior: 'smooth' });
    }));
    reference.querySelectorAll('.has-scroll .tab-viewport').forEach((viewport) => viewport.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        viewport.scrollLeft += event.deltaY;
      }
    }, { passive: false }));

    reference.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => {
      state.chooser = button.dataset.open;
      state.returnFocus = `[data-open="${button.dataset.open}"]`;
      render({ focusSelector: state.chooser === 'documents' ? '[data-choose-document]' : '[data-choose-child]' });
    }));
    reference.querySelectorAll('[data-choose-document]').forEach((button) =>
      button.addEventListener('click', () => selectDocument(button.dataset.chooseDocument, true)));
    reference.querySelectorAll('[data-choose-child]').forEach((button) =>
      button.addEventListener('click', () => selectChild(button.dataset.chooseChild, false, true)));
    reference.querySelectorAll('[data-dismiss]').forEach((element) => element.addEventListener('click', (event) => {
      if (event.target === element || event.currentTarget.matches('button')) dismissChooser();
    }));
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.chooser) {
      event.preventDefault();
      dismissChooser();
    }
  });

  let resizeFrame;
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => render());
  });
  observer.observe(root.querySelector('.workspace-shell'));

  render();
  return { destroy: () => observer.disconnect(), state };
}

const standaloneRoot = document.querySelector('#app');
if (standaloneRoot) mount(standaloneRoot);
