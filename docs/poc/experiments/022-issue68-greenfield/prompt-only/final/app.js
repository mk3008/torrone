const ICONS = {
  left: 'icons/chevron-left.svg',
  right: 'icons/chevron-right.svg',
  down: 'icons/chevron-down.svg',
  close: 'icons/x.svg'
};

function icon(src) {
  const image = document.createElement('img');
  image.src = src;
  image.alt = '';
  image.draggable = false;
  return image;
}

export async function mount(root, fixtureSource = 'fixture.json') {
  const fixture = typeof fixtureSource === 'string'
    ? await fetch(fixtureSource).then(response => {
        if (!response.ok) throw new Error(`fixture.json: ${response.status}`);
        return response.json();
      })
    : fixtureSource;

  const caseName = new URLSearchParams(location.search).get('case') || 'both';
  const configuration = fixture.cases[caseName] || fixture.cases.both;
  let documents = fixture.docs.slice(0, configuration.documents).map((entry, index) => ({
    id: entry[0],
    name: entry[1],
    affiliation: entry[2],
    children: entry[3].slice(0, configuration.initialChildren),
    selectedChild: 0,
    color: ['#dce9f5', '#e8e2f3', '#e1eee7', '#f4e7dc'][index % 4]
  }));
  let selectedDocument = 0;
  let openLayer = null;
  let resizeFrame = 0;

  root.innerHTML = `
    <section class="shell" aria-label="文書ワークスペース">
      <div class="shell-head">
        <div><p class="eyebrow">DOCUMENT WORKSPACE</p><h1>文書ワークスペース</h1></div>
        <button class="workspace-action" type="button">新しい文書</button>
      </div>
      <div class="reference"></div>
      <section class="content" tabindex="-1"></section>
      <button class="content-action" type="button">内容を確認</button>
    </section>`;

  const reference = root.querySelector('.reference');
  const content = root.querySelector('.content');
  const workspaceAction = root.querySelector('.workspace-action');

  const isNarrow = () => matchMedia('(max-width: 599px)').matches;
  const activeDocument = () => documents[selectedDocument] || null;

  function availableRowWidth() {
    const style = getComputedStyle(reference);
    return reference.clientWidth
      - parseFloat(style.paddingLeft || 0)
      - parseFloat(style.paddingRight || 0);
  }

  function closePopup({ restoreFocus = false } = {}) {
    if (!openLayer) return;
    const { element, trigger } = openLayer;
    element.remove();
    openLayer = null;
    if (trigger?.isConnected) trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus && trigger?.isConnected) trigger.focus();
  }

  function handleTabKey(event, tabs, index, activate) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      tabs[(index + step + tabs.length) % tabs.length]?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  }

  function makeCloseButton(documentIndex) {
    const button = document.createElement('button');
    const doc = documents[documentIndex];
    button.type = 'button';
    button.className = 'close-tab';
    button.setAttribute('aria-label', `${doc.name}（${doc.affiliation}）を閉じる`);
    button.append(icon(ICONS.close));
    button.addEventListener('click', event => {
      event.stopPropagation();
      closeDocument(documentIndex);
    });
    return button;
  }

  function makeParentTab(documentIndex, narrow = false) {
    const doc = documents[documentIndex];
    const tab = document.createElement('div');
    tab.className = `parent tab${documentIndex === selectedDocument ? ' is-selected' : ''}${narrow ? ' narrow-tab' : ''}`;
    tab.style.setProperty('--group-tint', doc.color);
    tab.id = `document-tab-${doc.id}`;
    tab.dataset.index = documentIndex;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(documentIndex === selectedDocument));
    tab.setAttribute('aria-controls', 'workspace-panel');
    tab.setAttribute('aria-label', `${doc.name}、${doc.affiliation}`);
    tab.title = `${doc.name}（${doc.affiliation}）`;
    tab.tabIndex = documentIndex === selectedDocument ? 0 : -1;
    tab.innerHTML = '<span class="tab-copy"><span class="tab-name"></span><span class="affiliation"></span></span><span class="close-slot"></span>';
    tab.querySelector('.tab-name').textContent = doc.name;
    tab.querySelector('.affiliation').textContent = doc.affiliation;
    tab.querySelector('.close-slot').append(makeCloseButton(documentIndex));
    tab.addEventListener('click', event => {
      if (!event.target.closest('.close-tab')) selectDocument(documentIndex, true);
    });
    tab.addEventListener('keydown', event => {
      const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
      handleTabKey(event, tabs, tabs.indexOf(tab), () => selectDocument(documentIndex, true));
    });
    return tab;
  }

  function makeChildTab(childIndex, narrow = false) {
    const doc = activeDocument();
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `child tab${childIndex === doc.selectedChild ? ' is-selected' : ''}${narrow ? ' narrow-tab' : ''}`;
    tab.id = `child-tab-${doc.id}-${childIndex}`;
    tab.dataset.index = childIndex;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(childIndex === doc.selectedChild));
    tab.setAttribute('aria-controls', 'workspace-panel');
    tab.tabIndex = childIndex === doc.selectedChild ? 0 : -1;
    tab.textContent = doc.children[childIndex];
    tab.addEventListener('click', () => selectChild(childIndex, true));
    tab.addEventListener('keydown', event => {
      const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
      handleTabKey(event, tabs, tabs.indexOf(tab), () => selectChild(childIndex, true));
    });
    return tab;
  }

  function arrowButton(direction, kind, scroller) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scroll-button';
    button.dataset.scroll = direction;
    button.setAttribute('aria-label', kind === 'parent'
      ? `文書を${direction === 'left' ? '左' : '右'}に送る`
      : `タブを${direction === 'left' ? '左' : '右'}に送る`);
    button.append(icon(direction === 'left' ? ICONS.left : ICONS.right));
    button.addEventListener('click', () => {
      scroller.scrollLeft += direction === 'left' ? -220 : 220;
    });
    return button;
  }

  function rowNeedsOverflow(kind, count, availableWidth) {
    const tabWidth = kind === 'parent' ? 140 : 112;
    return count * tabWidth > availableWidth + 0.5;
  }

  function createDesktopRow(kind, availableWidth) {
    const row = document.createElement('div');
    row.className = `row ${kind}-row`;
    const viewport = document.createElement('div');
    viewport.className = 'tab-viewport';
    const list = document.createElement('div');
    list.className = 'tab-list';
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', kind === 'parent' ? '文書' : `${activeDocument().name}のタブ`);
    const count = kind === 'parent' ? documents.length : activeDocument().children.length;
    for (let index = 0; index < count; index++) {
      list.append(kind === 'parent' ? makeParentTab(index) : makeChildTab(index));
    }
    viewport.append(list);

    if (rowNeedsOverflow(kind, count, availableWidth)) {
      row.classList.add('is-overflowing');
      row.append(arrowButton('left', kind, viewport), viewport, arrowButton('right', kind, viewport));
      viewport.addEventListener('wheel', event => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.preventDefault();
          viewport.scrollLeft += event.deltaY;
        }
      }, { passive: false });
    } else {
      row.append(viewport);
    }
    return row;
  }

  function makeMoreButton(kind, hiddenCount) {
    const button = document.createElement('button');
    const label = `ほか${hiddenCount}`;
    button.type = 'button';
    button.className = 'more';
    button.textContent = label;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', kind === 'parent'
      ? `文書を切り替える、${label}`
      : `子タブを切り替える、${label}`);
    button.append(icon(kind === 'parent' ? ICONS.right : ICONS.down));
    button.addEventListener('click', () => {
      if (openLayer?.trigger === button) closePopup({ restoreFocus: true });
      else if (kind === 'parent') openDocumentChooser(button, label);
      else openChildChooser(button, label);
    });
    return button;
  }

  function createNarrowRow(kind, availableWidth) {
    const row = document.createElement('div');
    row.className = `row ${kind}-row narrow-row`;
    const list = document.createElement('div');
    list.className = 'tab-list';
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', kind === 'parent' ? '文書' : `${activeDocument().name}のタブ`);
    const count = kind === 'parent' ? documents.length : activeDocument().children.length;
    const tabWidth = kind === 'parent' ? 124 : 86;

    if (count * tabWidth <= availableWidth + 0.5) {
      for (let index = 0; index < count; index++) {
        list.append(kind === 'parent' ? makeParentTab(index, true) : makeChildTab(index, true));
      }
      row.append(list);
      return row;
    }

    row.classList.add('is-overflowing');
    const selectedIndex = kind === 'parent' ? selectedDocument : activeDocument().selectedChild;
    list.append(kind === 'parent' ? makeParentTab(selectedIndex, true) : makeChildTab(selectedIndex, true));
    row.append(list, makeMoreButton(kind, count - 1));
    return row;
  }

  function openDocumentChooser(trigger, label) {
    closePopup();
    const chooser = document.createElement('section');
    chooser.className = 'chooser document-chooser';
    chooser.setAttribute('role', 'dialog');
    chooser.setAttribute('aria-modal', 'true');
    chooser.setAttribute('aria-label', `文書を切り替える、${label}`);
    chooser.innerHTML = '<div class="chooser-head"><h2>文書を選択</h2><button type="button" class="dismiss" aria-label="文書選択を閉じる">閉じる</button></div><div class="document-grid"></div>';
    const grid = chooser.querySelector('.document-grid');

    documents.forEach((doc, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `document-card${index === selectedDocument ? ' current' : ''}`;
      card.setAttribute('aria-label', `${doc.name}、${doc.affiliation}の文書を選択`);
      card.innerHTML = '<span class="thumbnail" aria-hidden="true"><span></span><span></span><span></span></span><span class="card-copy"><strong></strong><small></small></span>';
      card.querySelector('strong').textContent = doc.name;
      card.querySelector('small').textContent = doc.affiliation;
      card.addEventListener('click', () => {
        closePopup();
        selectDocument(index, true);
      });
      grid.append(card);
    });

    document.body.append(chooser);
    chooser.querySelector('.dismiss').addEventListener('click', () => closePopup({ restoreFocus: true }));
    openLayer = { element: chooser, trigger };
    trigger.setAttribute('aria-expanded', 'true');
    chooser.addEventListener('keydown', popupKeydown);
    chooser.querySelector('.document-card.current, .document-card')?.focus();
  }

  function openChildChooser(trigger, label) {
    closePopup();
    const doc = activeDocument();
    const chooser = document.createElement('div');
    chooser.className = 'chooser child-chooser';
    chooser.setAttribute('role', 'dialog');
    chooser.setAttribute('aria-label', `子タブを切り替える、${label}`);

    doc.children.forEach((child, index) => {
      if (index === doc.selectedChild) return;
      const option = document.createElement('button');
      option.type = 'button';
      option.textContent = child;
      option.addEventListener('click', () => {
        doc.selectedChild = index;
        closePopup();
        render();
        requestAnimationFrame(() => root.querySelector('.child-row .more')?.focus());
      });
      chooser.append(option);
    });

    document.body.append(chooser);
    const rect = trigger.getBoundingClientRect();
    chooser.style.top = `${rect.bottom + 6}px`;
    chooser.style.right = `${Math.max(16, innerWidth - rect.right)}px`;
    openLayer = { element: chooser, trigger };
    trigger.setAttribute('aria-expanded', 'true');
    trigger.classList.add('is-open');
    chooser.addEventListener('keydown', popupKeydown);
    chooser.querySelector('button')?.focus();
  }

  function popupKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePopup({ restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [...event.currentTarget.querySelectorAll('button:not([disabled])')];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function selectDocument(index, focusTab = false) {
    selectedDocument = index;
    closePopup();
    render();
    if (focusTab) requestAnimationFrame(() => root.querySelector(`.parent[data-index="${index}"]`)?.focus());
  }

  function selectChild(index, focusTab = false) {
    activeDocument().selectedChild = index;
    closePopup();
    render();
    if (focusTab) requestAnimationFrame(() => root.querySelector(`.child[data-index="${index}"]`)?.focus());
  }

  function closeDocument(index) {
    const wasSelected = index === selectedDocument;
    documents.splice(index, 1);
    if (!documents.length) {
      selectedDocument = -1;
      render();
      workspaceAction.focus();
      return;
    }
    if (index < selectedDocument) selectedDocument--;
    else if (wasSelected) selectedDocument = Math.min(index, documents.length - 1);
    const focusIndex = Math.min(index, documents.length - 1);
    render();
    requestAnimationFrame(() => root.querySelector(`.parent[data-index="${focusIndex}"]`)?.focus());
  }

  function updateContent() {
    const doc = activeDocument();
    content.id = 'workspace-panel';
    content.setAttribute('role', 'tabpanel');
    if (!doc) {
      content.removeAttribute('aria-labelledby');
      content.innerHTML = '<h2>開いている文書はありません</h2><p>「新しい文書」から作業を始められます。</p>';
      return;
    }
    const child = doc.children[doc.selectedChild];
    content.setAttribute('aria-labelledby', `child-tab-${doc.id}-${doc.selectedChild}`);
    content.innerHTML = '<p class="content-meta"></p><h2></h2><div class="mock-panel" aria-label="モックコンテンツ"><div><span>担当エリア</span><strong></strong></div><div><span>ステータス</span><strong>確認中</strong></div><div><span>最終更新</span><strong>本日 10:30</strong></div></div><p class="content-note">この領域は表示確認用のモックコンテンツです。変更内容は保存されません。</p>';
    content.querySelector('.content-meta').textContent = `${doc.affiliation} / ${child}`;
    content.querySelector('h2').textContent = `${doc.name}の${child}`;
    content.querySelector('.mock-panel strong').textContent = doc.affiliation;
  }

  function render() {
    closePopup();
    reference.replaceChildren();
    updateContent();
    if (!documents.length) return;
    const width = availableRowWidth() || Math.max(0, innerWidth - 32);
    const factory = isNarrow() ? createNarrowRow : createDesktopRow;
    reference.append(factory('parent', width), factory('child', width));
  }

  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(render);
  });
  observer.observe(reference);
  const media = matchMedia('(max-width: 599px)');
  media.addEventListener('change', render);
  const outsidePointer = event => {
    if (openLayer && !openLayer.element.contains(event.target) && !openLayer.trigger.contains(event.target)) closePopup();
  };
  document.addEventListener('pointerdown', outsidePointer);
  render();

  return {
    render,
    destroy() {
      closePopup();
      observer.disconnect();
      media.removeEventListener('change', render);
      document.removeEventListener('pointerdown', outsidePointer);
    }
  };
}

const standaloneRoot = document.querySelector('#app');
if (standaloneRoot) {
  mount(standaloneRoot).catch(error => {
    standaloneRoot.innerHTML = '<p class="load-error">画面を読み込めませんでした。</p>';
    console.error(error);
  });
}
