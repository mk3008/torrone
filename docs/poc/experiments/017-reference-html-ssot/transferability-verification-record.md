---
type: PoC verification record
title: Current Reference transferability gate verification
status: passed mechanically
source: reproducible repository commands and rendered evidence
---

# Verification outcome

`passed mechanically` — the independent shipment-exception Target passed the
current approved Reference with zero comparison, console, action, network,
stable-key, or bounded accessibility errors. A one-property independent CSS
mutation failed with the expected focused style signature. The approved
Reference remained byte-identical and the old complete regression passed.

# Reproducible command

```powershell
& .\docs\poc\experiments\017-reference-html-ssot\verify-transferability-gate.ps1
```

The Gate script hashes the approved Reference before and after work, scans
source sharing/fixture leakage/external references, records CSS source
independence, performs a clean Target build, snapshots and verifies the Target,
creates a temporary style mutation, requires its rejection, then runs the
existing `verify.ps1` complete regression.

# Acceptance evidence

| Acceptance criterion | Result | Repository evidence |
| --- | --- | --- |
| Fixed approved input | `pass`; SHA-256 `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` before/after | `verify-transferability-gate.ps1` |
| Different product content | `pass`; shipment exceptions, facilities, carriers, `SX-*` fixtures; prohibited exact Reference strings `0` | Target source and leakage scan |
| Different DOM/component/state | `pass`; four React product components, reducer actions, derived navigation/results; no Reference harness | `src/main.jsx`, `target.snapshot.json` |
| Independent CSS | `pass`; one local `target.css`, no import/shared path; unique hash; 94 selectors with only 10 exact generic selectors shared with Reference and 8 with old vanilla | `source-independence.json` |
| Current Reference comparison | `pass`; 0 errors, 11 scenarios, 19 actions, 27 keys | `target.report.json` |
| Console/action/network | `pass`; console `0`, action errors `0` via zero-error report, external `0`, failed requests `0` | `target.report.json` |
| Bounded accessibility | `pass`; DOM issues `0`, unnamed AX controls `0`, duplicate keys `0` | `target.snapshot.json` and zero-error report |
| Harness isolation | `pass`; Target harness roots `0`; one product-external fill-value override only | `target.snapshot.json`, `scenario-overrides.json` |
| Independent CSS negative | expected `fail`; 20 occurrences, one signature: `elements.filter-toggle.styles.borderRadius` | `style-negative.report.json` |
| Existing negatives/regression | `pass`; historical negative still 32 errors/15 signatures, semantic-only still 8/8; frozen vanilla/React reports still pass | existing `verify.ps1` output |

# What the CLI/Core matched

- all 27 keyed elements' presence, tag, role, visibility, native/ARIA state,
  selected computed-style properties, and structural geometry diagnostics;
- focus after interactions, including user-menu Escape recovery;
- navigation toggle/parent/selection/filter/no-match states;
- filter keyboard disclosure, theme, Initial/Results/Empty, Search, and Clear;
- bounded name/contrast/ID relationship checks and unnamed accessibility-tree
  controls;
- local source digest, browser viewport, external/failed requests, console and
  uncaught errors, and action execution.

`aria-controls` and `aria-describedby` ignore Target-local ID spelling but now
compare the stable-key identity of each relationship target. Each local ID must
also resolve through the existing bounded accessibility check.

# Intentionally not compared

| Difference | Reason |
| --- | --- |
| Product names, headings, labels, captions, action nouns, IDs, row fixtures | Must differ to prove content transfer; accessible names are checked for presence, not literal equality. |
| React component boundaries, reducer actions, DOM wrapper/class names | Implementation choice; no product observation value. |
| CSS selector/token/layer/source organization | Must be independent; computed output is compared separately. |
| Source digests and file count | Expected to differ; used for provenance, not equivalence. |
| Absolute structural geometry | Diagnostic only; current 24 diagnostics are one approximately 5.2 px vertical offset repeated across states. |

# Important current comparison gaps

The Core records more than the comparator gates, and not every approved visible
detail has a keyed node. The CLI does not directly prove:

- every row ID is a link;
- the first grid column is sticky;
- one value per cell;
- pagination contains only Previous/current page/Next;
- relative primary-action placement;
- heading text/level sequence, landmark counts, or full accessibility-tree role
  distribution equality.
- current form-control values after an interaction.

These were checked from Target source and rendered screenshots for this Gate.
They are candidates for later general observation work only if another
experiment demonstrates that human review is insufficient; no Target-specific
rule was added now.

# Supplementary evidence

Initial, Results, Empty, and user-menu screenshots were inspected directly.
They establish business realism, density, hierarchy, sticky-column appearance,
link treatment, and action placement. Screenshots cannot prove keyboard or real
assistive-technology behavior; repository interaction/source evidence covers
the bounded claims instead.

# Confidence and limits

Confidence is high for one Chrome desktop Target and the selected comparison
surface. It remains `UNCONFIRMED` for responsive/other-browser/real-AT behavior,
another independently generated Target, partial References, and any frozen
profile/API claim.
