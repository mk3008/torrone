---
type: PoC experiment contract
title: Customer-search composition with a fixed shell, attempt 9
status: completed-prompt-gap
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Measure whether the current Manifest and one product-facts-only customer-search
brief communicate a comparable page when the existing shared shell is reused
as an explicit, immutable fixture. This is a `composition-with-fixed-shell`
experiment under the [three-run reproducibility protocol](../../three-run-reproducibility-protocol.md).

It does not measure whether the Manifest alone can create a Header or Drawer.
Those shell responsibilities are supplied by the fixed fixture. It measures
the generated page inside that existing workspace: the bounded condition pane,
fluid result pane, Grid toolbar/footer relationship, and product-fact handling.

# Consumer-visible input

Each independent implementation receives exactly these inputs:

1. `consumer-input/design-manifest/` — the complete frozen Manifest snapshot;
2. `consumer-input/common-shell-fixture/` — the immutable shell, its page-slot
   boundary, and its SHA-256 inventory; and
3. `consumer-input/user-prompt-ja.md` — screen-specific product facts only.

No task instruction may add presentation rules, implementation selectors,
layout values, or behavior beyond these files. Cross-run communication is
prohibited.

# Fixed execution matrix

| Item | Value |
| --- | --- |
| Model | `gpt-5.6-terra` |
| Reasoning effort | `medium` |
| Independent implementations | 3 |
| Output directory | `runs/run-N/` |
| Acceptance viewport | `1440x1200` |
| Capture states | Light/Dark × Drawer open/hidden |

# Hard invariants

Each output must preserve the immutable shell files and all `index.html`
markup outside `<main class="workspace">`. The generated page can use only
`page.css` and `page.js` for its own content. It must not redefine shell
selectors or modify the shell navigation binding.

Within the page slot, evaluate the frozen Manifest and product prompt for:

- Search conditions before results with the supplied fields and Search/Clear;
- a bounded condition task and a separate condition action row;
- a fluid result Grid, a collection toolbar acting on that Grid, and a
  Grid-width continuation footer;
- result title with the supplied count, six neutral fixture rows, a leading
  customer-ID detail operation, `顧客を追加`, and plain `1` with Previous/Next;
- local-only assets and no network, persistence, or external dependencies.

# Validity rule

Once all three runs are generated, do not edit or regenerate any one run. A
capture retry is allowed only when the generated HTML/CSS/JS bytes are
unchanged. Classify deviations in the evaluation record; if any fixed input
changes, create a new attempt and generate all three runs again.
