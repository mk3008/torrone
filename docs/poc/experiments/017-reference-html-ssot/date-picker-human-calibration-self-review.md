# DatePicker Human Calibration Phase 1 Two-Cycle Self-Review

## Outcome

`done` — two self-review cycles found and corrected one scope regression. No remaining issue blocks human calibration. Human approval and the final Gate result remain explicitly unclaimed.

## Cycle 1 — requirement and product-surface review

### Checks

- Re-read the requested two-phase boundary and confirmed that only Phase 1 work exists.
- Compared each baseline directly with its frozen Composite origin.
- Reviewed the visible samples using the business-screen review criteria: task flow, explanatory copy, action captions, state/recovery language, keyboard behavior, bounded accessibility, and harness isolation.
- Checked that Single date and Date range were not recombined and that no new experimental variant, Target, CLI/Core change, month navigation, locale, timezone, or disabled-date feature was introduced.
- Checked that the Review Pack begins with the human judgment question and keeps technical evidence out of the primary path.

### Finding and correction

The first baseline draft removed the Date range origin's runtime `data-range-role="end"` annotation because it was unused by the visible sample. That removal would have turned Phase 1 into an unrequested Consumer-identity reduction experiment. The annotation and its source statement were restored unchanged.

Because the correction changed the Date range baseline hash, the intermediate generated evidence was removed and regenerated. Only this task's not-yet-delivered output directories were removed; frozen Composite and earlier PoC evidence were not touched. The final Date range hash is `DA068C8BB35EC3B0AF8108DF4EB72A17201886BF56B6CDFCB4B0EA58A18A9C94`.

### Remaining assessment

No visible copy exists solely to explain implementation or the experiment. The review label is necessary harness content and excluded from product observation. Popup density, placement, dimensions, state styling, and completion preference remain human judgments rather than AI-approved design decisions.

## Cycle 2 — evidence and reporting review

### Checks

- Parsed the Phase 1 PowerShell verifier with zero syntax errors.
- Re-ran the fixed verifier after the Cycle 1 correction: Single date passed 12 states, Date range passed 15 states, and both snapshots reported zero bounded accessibility issues.
- Confirmed both current source hashes exactly match the generated baseline manifest.
- Confirmed exactly one final Phase 1 output directory with 32 evidence files.
- Resolved every Review Pack direct link and representative screenshot link successfully.
- Resolved all six new DatePicker README links successfully.
- Found no stale intermediate run path, `variants/12` path, external URL, `@import`, `fetch`, `XMLHttpRequest`, or `WebSocket` in the baseline.
- Confirmed no Playwright browser session remained open after the real-browser spot check.
- Rechecked that the accepted Reference, CLI, Core, Composite candidates, fixed Composite output, and historical provenance stayed hash-identical.

### Reporting audit

The records claim only `done` for Phase 1 readiness and `ready-for-human-review` for the baseline. They do not claim human approval, Target transfer, observation extraction, canonical adoption, or a final Gate classification.

## Residual risks and deliberate gaps

- The design has not been accepted by a human; that is the next required event.
- Current evidence uses one Chromium lineage and bounded accessibility checks, not other browsers or real assistive technology.
- Reverse range selection, month navigation, locale, timezone, disabled dates, and responsive behavior are not exercised.
- `aria-activedescendant`, Consumer identity reduction, corrected-Reference Target transfer, and reusable observation classification remain Phase 2 or later work.

These are disclosed scope limits, not reasons to expand Phase 1.

