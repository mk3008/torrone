// Keep manual entry visible even when an embedding host does not resize our viewport.
(function (root) {
  function installEntryVisibility(win, doc, inputs, narrow) {
    let retries = [];
    const activeInput = () => narrow.matches && inputs.includes(doc.activeElement) ? doc.activeElement : null;
    function reveal() {
      const input = activeInput();
      if (!input) return;
      // Reserve scroll room even for the last field in a short document. Position
      // its label and editor near the top, not the keyboard-obscured bottom edge.
      doc.body.classList.add('manual-entry');
      input.closest('.limit').scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' });
    }
    function cancelRetries() {
      retries.forEach(id => win.clearTimeout(id));
      retries = [];
    }
    function sync() {
      cancelRetries();
      if (!activeInput()) { doc.body.classList.remove('manual-entry'); return; }
      reveal();
      // Keyboard opening can finish after focus, including in an iframe that
      // receives no resize event. Every retry rechecks the current focus.
      retries = [100, 350, 700].map(delay => win.setTimeout(reveal, delay));
    }
    doc.addEventListener('focusin', sync);
    doc.addEventListener('focusout', () => win.requestAnimationFrame(() => {
      if (!activeInput()) sync();
    }));
    win.addEventListener('resize', reveal);
    win.visualViewport?.addEventListener('resize', reveal);
    narrow.addEventListener('change', sync);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = installEntryVisibility;
  else installEntryVisibility(root, root.document,
    [...root.document.querySelectorAll('.limit input')], root.matchMedia('(max-width: 720px)'));
})(typeof window === 'undefined' ? {} : window);
