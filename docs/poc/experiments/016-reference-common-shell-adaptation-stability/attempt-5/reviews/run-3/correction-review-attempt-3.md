---
type: observation-only correction review
task_id: review-run-3
attempt: 3
reviewed_run: run-3
reviewed_artifact: initial
terminal_status: ready_for_review
viewport: 1440x900
origin: http://127.0.0.1:4175
---

# React Run 3 — correction review attempt 3

## Verdict

**ready for parent review, with one non-conformance** — the Run 3-owned, fixed-port development server was restored from the unchanged committed lockfile and observed at `1440 × 900`. Structural transitions, theme switching, selection, scroll regions, dark-theme `currentColor` rendering, and light/dark `focus-visible` all worked. However, the exact Drawer icon binding fails after the Drawer is hidden: the header control correctly changes its accessible action to `Show navigation`, but it continues to render `drawer-hide.svg` rather than the required `drawer-show.svg`.

No React source, fixed input, initial artifact, or immutable validation input was modified. This report supersedes only the observation gap in the two earlier reviews; their static-input evidence remains unchanged.

## Observed acceptance matrix

| Area | Criterion | Status | Direct observation |
| --- | --- | --- | --- |
| Structural | Header, Drawer, and workspace retain their intended relationship. | done | Light open state displayed distinct header, 288px Drawer, and remaining workspace. |
| Structural | Hiding the Drawer preserves the workspace. | done | Clicking `Hide navigation` removed the Drawer, retained `main.workspace`, and expanded the grid to 1440px. |
| Structural | Parent disclosure exposes/hides children with a discernible transition. | done | `Collapse Workspace` changed `aria-expanded` to `false`, hid children, and rendered `disclosure-collapsed.svg`. |
| Structural | Selection updates navigation and workspace coherently. | done | Clicking `Section 01` selected that row and changed the workspace `h1` to `Section 01`; the full-row selection and 4px physical-start indicator rendered. |
| Structural | Drawer navigation and workspace scroll independently. | done | Navigation: `overflow:auto`, `1228px/751px` scroll/client height. Workspace: `overflow:auto`, `2406px/840px`. |
| Exact visual binding | Light tokens, header/drawer/workspace surfaces, selected-row background, foreground, and indicator render. | done | Observed canonical light RGB results: page `#f4f7fa`, surface `#fff`, selection `#e7f1fc`, indicator `#0b5cad`. |
| Exact visual binding | Dark tokens and state-specific theme icon render. | done | Observed dark header/drawer `#1b2632`, workspace `#101820`, selected surface `#203e5a`, indicator `#74b7f5`, and `theme-to-light.svg`. |
| Exact visual binding | Drawer-open icon uses `drawer-hide.svg` and the hidden state uses `drawer-show.svg`. | not done | Open state rendered `drawer-hide.svg`. After click, the action label became `Show navigation` but computed mask remained `drawer-hide.svg`; `drawer-show.svg` did not render. |
| Exact visual binding | Disclosure icon pairing and sizes are correct. | done | Expanded and collapsed states used the respective canonical masks; 16px rendered size matched 1rem. |
| Exact visual binding | Search icon is in the leading search-field position at 1rem. | done | Observed canonical search mask at 16px in the field-leading position. |
| SVG rendering | Dark `currentColor` rendering is perceptible. | done | Dark screenshot and computed colors showed active header icons at `#f4f7fa` over `#1b2632`; search at `#bac6d2`; all were clearly visible. |
| SVG rendering | No prohibited direct external-image SVG rendering. | done | Earlier canonical SVG static check passed; the observed masks resolve to canonical SVG URLs. |
| Accessibility | Light and dark `focus-visible` feedback renders with the canonical ring. | done | Keyboard observation focused `Hide navigation`: light outline `#3b82f6`, dark outline `#ffd54a`, solid 3px-equivalent outline. Buttons exposed matching action labels. |
| Interaction evidence | Hover. | not done | Not reliably automated; retained as the required human gate. |

## Finding and route

| Finding | Classification | Evidence | Route |
| --- | --- | --- | --- |
| The hidden-Drawer state leaves the header icon on `drawer-hide.svg` although its next action is `show-navigation` and the binding map requires `drawer-show.svg`. | SVG rendering implementation error | At the fixed origin, `shell-body` became `without-drawer`, Drawer was absent, button label was `Show navigation`, and the computed mask still resolved to `reference-visual-bindings/icons/drawer-hide.svg`. | Repair the Run 3 implementation in a new authorized generation/review cycle; do not mutate this initial artifact. |

The implementation's React component boundaries, state shape, CSS organization, and CSS-mask family remain allowed implementation differences. No adaptation-instruction gap, vNext contract gap, product-input gap, validation gap, or harness/observation-tool issue was established in this fixed-port observation.

## Observation record

- The server was started only with Run 3's `npm run dev` at `127.0.0.1:4175` after `npm ci` restored the committed graph.
- Light/open, dark/open, hidden, collapsed, selected, and focus-visible states were inspected in the in-app browser at the fixed viewport. Screenshots were reviewed transiently and intentionally not persisted into the immutable initial artifact.
- Hover remains a human gate because it was not reliably automatable.
