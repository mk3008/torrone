# Evaluation — final third retry

## Inputs

- Baseline commit: `2074bf0ac6b99d6265917bad987cf2dc2039e139`
- Model: `gpt-5.6-terra`; reasoning effort: `medium`; fresh independent runs: `3`
- Fixed product prompt SHA-256:
  `27AD9B686EA590F45B75E100F9FFE68D2B82E3B2BE7BACBC4A609A9E135E9874`
- Frozen Manifest snapshot: `45` files
- Fixed common-shell assets: template plus `shell.css` and `shell.js`; their
  expected raw-byte SHA-256 values are asserted by the attempt-specific check.

## Capture

All `15` captures completed with Chrome `150.0.7871.187` using
`--headless=new --disable-gpu` and exit code `0`.

- Wide states: `12` PNGs at `1440x1200` (Light/Dark × Drawer open/hidden × 3)
- Narrow states: `3` PNGs at `720x1200` (Light × Drawer hidden × 3)
- SwiftShader fallback: not used

The exact executable path, command template, raw-byte SHA-256 values, image
dimensions, and file sizes are recorded in
[capture-record.json](capture-record.json).

## Automated assessment

The attempt-specific composition check passed for all three fresh runs:

```text
Customer-search attempt-20 composition checks passed. Runs: 3.
Manifest snapshot files: 45. Immutable shell assets: 2 plus template.
Captures: 12 at 1440x1200 plus 3 at 720x1200. External dependencies: 0.
```

It asserts the fixed-shell boundary, bounded condition pane, a table-only local
Grid scroll container, a pinned leading record-identity column, and separate
non-scrolling result header and pagination footer.

## Visual review

The fixed PNGs show the shared Header and Drawer in the wide states, a
full-width Header with the Drawer hidden in the narrow states, and a visible
horizontal scrollbar inside the Grid body. The result toolbar is above the
Grid body and pagination below it; neither is part of the grid scroll region.

This visual evidence does not prove a live horizontal-scroll interaction or
sticky-column behavior at every scroll offset. The source/static assertions
are evidence for those declarations; a browser-interaction test was not part
of this static variability experiment.

## Self-review — cycle 1

### Potential blockers

- None found in the final three-run set. Each run explicitly removes the
  decorative border from any semantic `fieldset`, preserving the unboxed
  condition-group rule.

### Potential non-blockers

- Neutral fixture wording and minor spacing differ between fresh runs. The
  fixed prompt does not constrain those details.

### Evidence weaknesses

- Captures show the initial layout only. They do not demonstrate a user-driven
  horizontal scroll position or keyboard behavior.

### Claim-overreach check

- Do not claim pixel-identical output. The evidence supports the stated
  structural rules across the three fresh runs.

## Self-review — cycle 2

### Merge blockers

- None found.

### Non-blockers

- Variations within the page slot do not alter the fixed shared shell,
  bounded conditions, or local Grid-overflow ownership.

### Evidence-shape status

- Sufficient for the static-layout claims and source-boundary assertions;
  intentionally does not cover interaction behavior.

### Reporting-shape status

- Complete: prompt, model, frozen inputs, captures, automated checks, visual
  observation, and both self-review cycles are recorded.

### Ready for PR?

- Yes for the experiment evidence. This task does not create a PR.

## Verdict

`done`. This was the third retry. The three generated runs passed the final
self-review and no additional retry is needed.
