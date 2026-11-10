# Handoff

## Status

- `done`: standalone static app at `/`, with all fixture cases selected by `?case=`.
- `done`: responsive document/item rows, desktop clipping controls, narrow choosers, close behavior, keyboard tab operation, focus transfer and empty state.
- `not done`: human visual approval and real assistive-technology/device review are outside this browser pass.

## Inputs and design references

- Data: `/bench/fixture.json` (copied into the app logic without changing order or labels).
- Icons: official supplied Lucide SVG files in `/bench/icons`; copied as separate assets, with license.
- Torrone catalog examples actually consulted: `POPOVER-001` for a trailing-edge-aligned anchored item list and `ICON-BUTTON-001` for independent icon-command focus. `TEXT-BUTTON-001` was listed in the catalog but its README was not present, so no behavior was inferred from it.
- The shared brief is the application interaction source. It overrides the catalog's illustrative geometry and styling.

## Browser review and repair

Tools used: static Python server, Playwright with installed Chromium, DOM geometry/accessibility-state assertions, PNG screenshots, and the benchmark image viewer.

First pass:

- At 1180 px, all eight 140 px document tabs correctly fit the 1148 px inner workspace, so no arrows appeared; the initial test expectation was corrected to test overflow at 1000 px.
- At 390 px, screenshots confirmed the selected tab/count composition, exact 6 px surface gap, right-aligned item list, two-column document cards, truncation, and connected tab/content surfaces.
- Found that opening the item chooser left focus on its trigger instead of moving into the chooser.

Repair:

- Moved focus to the first hidden item when its chooser opens.
- Made document chooser entry, chooser dismissal, card selection, item selection, and post-close focus transfers deterministic.

Recheck:

- `node test.cjs`: desktop arrows and selection preservation, narrow chooser/card flow, item selection/focus return, 600 px breakpoint, and focus-without-selection passed.
- `node final-check.cjs`: 12 focused checks passed, including independent row overflow, wheel movement, fit restoration, 6 px narrow gap, both Escape returns, inactive/selected close behavior, selected-item memory, and unknown-case fallback.
- Evidence: `evidence/first-*.png`, `evidence/final-narrow.png`, `evidence/first-report.json`, and `evidence/final-report.json`.

## Run

No build is required. See `README.md`; serve this directory and open the root URL.
