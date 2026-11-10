# Handoff

## Status
- done: Static Japanese workspace, all fixture cases, responsive rows, switching, closing, choosers, keyboard navigation and focus return.
- done: Supplied Lucide SVG files copied unchanged into `icons/`.
- no build: See `README.md`.

## Checks
- Chromium via Playwright (`node check.cjs`).
- First pass: layout rendered correctly. A test incorrectly expected arrows at 1280px; 8 × 140px fits the capped inner width, so overflow was correctly retested at 1000px.
- Inspected `evidence-desktop.png`, `evidence-mobile.png`, and `evidence-chooser.png`.
- Repair: non-overflowing narrow tabs now keep 124px/86px widths; only an overflowing selected tab expands. Narrow close controls are limited to the selected document.
- Recheck passed: desktop overflow, switching, per-document item memory, both narrow choosers, item updates and focus return.

## Remaining
Chromium coverage is bounded to representative 1000px and 390px viewports; it does not imply human approval.
