const NARROW_QUERY = matchMedia('(max-width: 599px)');

export async function mount(root, suppliedFixture) {
  const fixture = suppliedFixture || await fetch('./fixture.json').then((response) => {
    if (!response.ok) throw new Error('fixture.json を読み込めませんでした。');
    return response.json();
  });

  const params = new URLSearchParams(location.search);
  const caseName = params.get('case') || 'both';
  const config = fixture.cases[caseName] || fixture.cases.both;
  let documents = fixture.docs.slice(0, config.documents).map((entry, index) => ({
    id: entry[0],
    name: entry[1],
    affiliation: entry[2],
    children: entry[3].slice(0, config.initialChildren),
    childIndex: 0,
    group: index % 2
  }));

  let selectedId = documents[0]?.id || null;
  let parentOverflow = false;
  let childOverflow = false;
  let chooser = null;
  let resizeFrame = 0;
  let focusRequest = null;

  root.innerHTML = `
    <section class="workspace" aria-labelledby="workspace-title">
      <header class="workspace-header">
        <h1 id="workspace-title">受注ワークスペース</h1>
        <button class="workspace-action" type="button">作業メニュー</button>
      </header>
      <div class="reference" aria-label="文書ワークスペース"></div>
      <section class="panel" tabindex="-1"></section>
      <div class="overlay-root"></div>
    </section>`;

  const reference = root.querySelector('.reference');
  const panel = root.querySelector('.panel');
  const overlayRoot = root.querySelector('.overlay-root');
  const workspaceAction = root.querySelector('.workspace-action');

  function selectedDocument() {
    return documents.find((doc) => doc.id === selectedId) || null;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function availableRowWidth() {
    const measured = reference.getBoundingClientRect().width || reference.clientWidth;
    if (measured) return measured;
    return Math.max(0, Math.min(window.innerWidth, 1120) - 32);
  }

  function recomputeOverflow() {
    const narrow = NARROW_QUERY.matches;
    const width = availableRowWidth();
    const doc = selectedDocument();
    parentOverflow = documents.length * (narrow ? 124 : 140) > width;
    childOverflow = (doc?.children.length || 0) * (narrow ? 86 : 112) > width;

    if (!parentOverflow && chooser === 'documents') chooser = null;
    if (!childOverflow && chooser === 'children') chooser = null;
  }

  function parentTab(doc) {
    const selected = doc.id === selectedId;
    return `
      <div class="tab-shell parent-shell group-${doc.group}${selected ? ' is-selected' : ''}" data-doc-shell="${doc.id}">
        <div class="parent" role="tab" id="document-tab-${doc.id}"
          aria-controls="document-panel" aria-selected="${selected}"
          tabindex="${selected ? '0' : '-1'}" data-document="${doc.id}">
          <span class="tab-label">${escapeHtml(doc.name)}</span>
          <span class="tab-tooltip" role="tooltip">${escapeHtml(doc.name)} — ${escapeHtml(doc.affiliation)}</span>
        </div>
        <button class="close-tab" type="button" aria-label="${escapeHtml(doc.name)}を閉じる" data-close="${doc.id}">×</button>
      </div>`;
  }

  function childTab(label, index, selectedIndex) {
    const selected = index === selectedIndex;
    return `<button class="child-tab" type="button" role="tab"
      aria-selected="${selected}" tabindex="${selected ? '0' : '-1'}"
      data-child="${index}">${escapeHtml(label)}</button>`;
  }

  function render() {
    recomputeOverflow();
    const doc = selectedDocument();
    const narrow = NARROW_QUERY.matches;
    const parentCollapsed = narrow && parentOverflow && documents.length > 1;
    const childCollapsed = narrow && childOverflow && doc?.children.length > 1;

    let parentInner;
    if (parentCollapsed && doc) {
      const count = documents.length - 1;
      parentInner = `
        <div class="tabs-viewport compact-parent" data-viewport="parent">${parentTab(doc)}</div>
        <button class="more parent-more" type="button" aria-expanded="${chooser === 'documents'}"
          aria-label="ほか${count}、文書を切り替える" data-more="documents">
          <span>ほか${count}</span><span class="more-icon" aria-hidden="true"></span>
        </button>`;
    } else {
      parentInner = `<div class="tabs-viewport" data-viewport="parent"><div class="tabs-track">${documents.map(parentTab).join('')}</div></div>`;
      if (!narrow && parentOverflow) {
        parentInner += `<div class="scroll-controls">
          <button type="button" data-scroll="parent-left" aria-label="文書を左に送る">‹</button>
          <button type="button" data-scroll="parent-right" aria-label="文書を右に送る">›</button>
        </div>`;
      }
    }

    let childInner = '';
    if (doc) {
      if (childCollapsed) {
        const count = doc.children.length - 1;
        childInner = `
          <div class="tabs-viewport compact-child" data-viewport="child">${childTab(doc.children[doc.childIndex], doc.childIndex, doc.childIndex)}</div>
          <button class="more child-more" type="button" aria-expanded="${chooser === 'children'}"
            aria-label="ほか${count}、項目を切り替える" data-more="children">
            <span>ほか${count}</span><span class="more-icon" aria-hidden="true"></span>
          </button>`;
      } else {
        childInner = `<div class="tabs-viewport" data-viewport="child"><div class="tabs-track">${doc.children.map((label, index) => childTab(label, index, doc.childIndex)).join('')}</div></div>`;
        if (!narrow && childOverflow) {
          childInner += `<div class="scroll-controls">
            <button type="button" data-scroll="child-left" aria-label="項目を左に送る">‹</button>
            <button type="button" data-scroll="child-right" aria-label="項目を右に送る">›</button>
          </div>`;
        }
      }
    }

    reference.innerHTML = `
      <div class="row parent-row" role="tablist" aria-label="文書">${parentInner}</div>
      <div class="row child-row" role="tablist" aria-label="文書内の項目">${childInner}</div>`;

    if (doc) {
      const child = doc.children[doc.childIndex] || '概要';
      panel.innerHTML = `
        <h2 id="panel-heading">${escapeHtml(doc.name)}の${escapeHtml(child)}</h2>
        <p>${escapeHtml(doc.affiliation)} · ${escapeHtml(child)}</p>
        <button class="content-action" type="button">内容の確認</button>`;
      panel.id = 'document-panel';
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `document-tab-${doc.id}`);
    } else {
      panel.innerHTML = '<h2>開いている文書はありません</h2><p>文書を開くと、ここに内容が表示されます。</p>';
      panel.removeAttribute('aria-labelledby');
    }

    renderChooser();
    bindEvents();

    if (focusRequest) {
      const target = root.querySelector(focusRequest);
      focusRequest = null;
      requestAnimationFrame(() => target?.focus());
    }
  }

  function renderChooser() {
    const doc = selectedDocument();
    if (chooser === 'documents') {
      const hidden = documents.filter((item) => item.id !== selectedId);
      overlayRoot.innerHTML = `
        <section class="document-chooser" role="dialog" aria-modal="true" aria-labelledby="chooser-title">
          <header><button type="button" class="chooser-back" aria-label="文書一覧を閉じる">← 戻る</button><h2 id="chooser-title">ほかの文書（${hidden.length}）</h2></header>
          <div class="document-grid">${hidden.map((item, index) => `
            <button type="button" class="document-card" data-choose-document="${item.id}" aria-label="${escapeHtml(item.name)}、${escapeHtml(item.affiliation)}を選択">
              <span class="thumbnail thumb-${index % 4}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
              <strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.affiliation)}</span>
            </button>`).join('')}</div>
        </section>`;
    } else if (chooser === 'children' && doc) {
      const hidden = doc.children.map((label, index) => ({label, index})).filter((item) => item.index !== doc.childIndex);
      overlayRoot.innerHTML = `<div class="child-menu" role="menu" aria-label="ほか${hidden.length}、項目を切り替える">
        ${hidden.map((item) => `<button type="button" role="menuitem" data-choose-child="${item.index}">${escapeHtml(item.label)}</button>`).join('')}
      </div>`;
    } else {
      overlayRoot.innerHTML = '';
    }
  }

  function measureRows() {
    const previousParent = parentOverflow;
    const previousChild = childOverflow;
    recomputeOverflow();
    if (previousParent !== parentOverflow || previousChild !== childOverflow) render();
  }

  function scheduleMeasure() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(measureRows);
  }

  function selectDocument(id, focus = true) {
    selectedId = id;
    chooser = null;
    if (focus) focusRequest = `[data-document="${CSS.escape(id)}"]`;
    render();
  }

  function closeDocument(id) {
    const index = documents.findIndex((doc) => doc.id === id);
    if (index < 0) return;
    const wasSelected = id === selectedId;
    documents.splice(index, 1);
    if (wasSelected) {
      const next = documents[index] || documents[index - 1] || null;
      selectedId = next?.id || null;
      focusRequest = next ? `[data-document="${CSS.escape(next.id)}"]` : '.workspace-action';
    } else {
      focusRequest = `[data-document="${CSS.escape(selectedId)}"]`;
    }
    chooser = null;
    render();
  }

  function moveTabFocus(current, direction, selector) {
    const tabs = [...reference.querySelectorAll(selector)].filter((item) => item.offsetParent !== null);
    const index = tabs.indexOf(current);
    if (index < 0 || tabs.length < 2) return;
    const target = tabs[(index + direction + tabs.length) % tabs.length];
    tabs.forEach((tab) => tab.tabIndex = tab === target ? 0 : -1);
    target.focus();
  }

  function tabKeydown(event) {
    const parent = event.target.closest('[data-document]');
    const child = event.target.closest('[data-child]');
    if (!parent && !child) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveTabFocus(event.target, event.key === 'ArrowRight' ? 1 : -1, parent ? '[data-document]' : '[data-child]');
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (parent) selectDocument(parent.dataset.document);
      if (child) {
        const doc = selectedDocument();
        doc.childIndex = Number(child.dataset.child);
        focusRequest = `[data-child="${doc.childIndex}"]`;
        render();
      }
    }
  }

  function dismissChooser() {
    const type = chooser;
    chooser = null;
    render();
    requestAnimationFrame(() => root.querySelector(`[data-more="${type}"]`)?.focus());
  }

  function bindEvents() {
    reference.querySelectorAll('[data-document]').forEach((tab) => {
      tab.addEventListener('click', () => selectDocument(tab.dataset.document));
      tab.addEventListener('keydown', tabKeydown);
    });
    reference.querySelectorAll('[data-child]').forEach((tab) => {
      tab.addEventListener('click', () => {
        selectedDocument().childIndex = Number(tab.dataset.child);
        render();
      });
      tab.addEventListener('keydown', tabKeydown);
    });
    reference.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        closeDocument(button.dataset.close);
      });
    });
    reference.querySelectorAll('[data-more]').forEach((button) => {
      button.addEventListener('click', () => {
        chooser = chooser === button.dataset.more ? null : button.dataset.more;
        render();
        if (chooser === 'documents') requestAnimationFrame(() => overlayRoot.querySelector('.document-card')?.focus());
        if (chooser === 'children') requestAnimationFrame(() => overlayRoot.querySelector('[role="menuitem"]')?.focus());
      });
    });
    reference.querySelectorAll('[data-scroll]').forEach((button) => {
      button.addEventListener('click', () => {
        const [row, direction] = button.dataset.scroll.split('-');
        const viewport = reference.querySelector(`[data-viewport="${row}"]`);
        if (viewport) viewport.scrollLeft += direction === 'left' ? -280 : 280;
      });
    });
    reference.querySelectorAll('.tabs-viewport').forEach((viewport) => {
      viewport.addEventListener('wheel', (event) => {
        if (viewport.scrollWidth <= viewport.clientWidth) return;
        event.preventDefault();
        viewport.scrollLeft += event.deltaY || event.deltaX;
      }, {passive: false});
    });
  }

  overlayRoot.addEventListener('click', (event) => {
    const documentChoice = event.target.closest('[data-choose-document]');
    const childChoice = event.target.closest('[data-choose-child]');
    if (documentChoice) selectDocument(documentChoice.dataset.chooseDocument);
    if (childChoice) {
      selectedDocument().childIndex = Number(childChoice.dataset.chooseChild);
      chooser = null;
      focusRequest = '[data-more="children"]';
      render();
    }
    if (event.target.closest('.chooser-back')) dismissChooser();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && chooser) {
      event.preventDefault();
      dismissChooser();
    }
  });

  NARROW_QUERY.addEventListener('change', () => {
    chooser = null;
    render();
  });
  addEventListener('resize', scheduleMeasure);

  render();
  return {render, destroy: () => removeEventListener('resize', scheduleMeasure)};
}

const standaloneRoot = document.querySelector('#app');
if (standaloneRoot) {
  mount(standaloneRoot).catch((error) => {
    standaloneRoot.innerHTML = `<p class="error" role="alert">${error.message}</p>`;
  });
}
