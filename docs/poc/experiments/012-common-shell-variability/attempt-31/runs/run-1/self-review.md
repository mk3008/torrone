# Self-review — Run 1

This is a generator self-review, not human approval.

## 1. Disclosure and current item

- Before: `グループ 01` is expanded; its trailing glyph is the supplied downward chevron. `項目 01-01` is the sole current item and has a physical-left indicator with a full-row selection surface.
- Action: traced the complete parent-row handler, then a supplied leaf-row handler in `app.js`.
- After: the parent handler changes only `expanded`; it swaps the trailing chevron to the supplied right chevron when collapsed and preserves `current`. A leaf handler assigns only `current`; `draw()` transfers `aria-current`, full row background, and physical-left indicator without changing its `child` label inset.

## 2. Header icon-only controls

- Light: `Close navigation` uses the local left-panel-close glyph; `Switch to Dark` uses the local moon glyph. Both are bordered icon-only controls with accessible names, matching `title` tooltips, and an outer `:focus-visible` ring.
- Dark: `Open navigation` uses the local left-panel-open glyph when hidden; `Switch to Light` uses the local sun glyph. The dark palette applies a contrast filter to local SVG glyphs and retains the visible control boundary and focus ring.
- Observation: each rendered glyph state is selected directly by the current Drawer/theme state, not by hover or a tooltip.

## 3. Drawer visibility

- Before: the Drawer is an `aside` below the Header, with its search region and scrollable navigation list; the workspace is its sibling task region.
- Action: traced `Close navigation` and then `Open navigation` through the Header controller handler.
- After: the Drawer body is `display:none` only while hidden, the split grid changes from a Drawer/workspace pair to the workspace alone, and the Header controller changes its accessible name, tooltip, and local panel glyph. Workspace content is not replaced or moved into the controlled region.

## 4. Navigation search

- Before: the labelled `メニューを検索` field has an ordinary `border-interactive` boundary and a visible outer focus ring through its wrapper.
- Action: traced input filtering with a supplied label match and then clearing the field.
- After: matching children retain `グループ 01`; clearing restores the full fixed hierarchy. A no-match state is explicit.

## 5. Layout and scroll ownership

- Observation: Header is outside the fixed-height `shell-body`; Drawer navigation has the only Drawer `overflow-y:auto`; workspace has its own `overflow-y:auto`. The page grid begins at the workspace logical start edge and keeps bounded outer gutters. The Header stays a fluid full-shell band.

## 6. External-resource check

- Command: `rg -n 'https?://|cdn|@import' index.html styles.css app.js`
- Result: no matches (`EXTERNAL_REFERENCES=0`). `node --check app.js` completed successfully. All icon `src` values are local files under `icons/`.

## Limitations

- The installed Playwright CLI blocked the required `file:` URL before it could render the local specimen, so this review records static source tracing plus local syntax/resource checks rather than a successful automated visual interaction session.
- This review does not claim human approval, accessibility certification, or cross-browser verification.
