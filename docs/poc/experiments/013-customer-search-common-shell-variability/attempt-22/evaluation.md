# Evaluation

## Outcome

`invalid for reproducibility comparison` — the original three independently
authored pages were a valid observation set, but Run 2 was directly edited
after visual feedback. The updated images remain useful implementation evidence
for the repaired page, but cannot be presented as a three-run Manifest quality
result. The evidence is not a claim of pixel-identical output.

## Inputs and scope

- Baseline commit: `2074bf0ac6b99d6265917bad987cf2dc2039e139`
- Model and effort: `gpt-5.6-terra`, `medium`
- Runs: `3`, each newly authored once
- Frozen Manifest snapshot: 45 files
- Fixed Japanese prompt SHA-256:
  `27AD9B686EA590F45B75E100F9FFE68D2B82E3B2BE7BACBC4A609A9E135E9874`
- Fixed common-shell template SHA-256:
  `764E870E5DC584BAB41EF07220653AD98ACBC3A9769D31F678BDBF3A9AB7C21F`

The updated contract fixes Search/Clear in a dedicated full-width action row at
the logical start of the bounded condition pane. It applies the same logical
start rule to Create/Save form action rows. Collection actions remain at the
logical end of the full-width toolbar of a fluid result pane.

During the first self-review cycle, an ambiguity was found: a Grid could put
only `tbody` in a horizontal scroll container. The Manifest now requires one
local Grid scroll container around the complete table, including `thead` and
`tbody`; a new numbered attempt was generated from that changed snapshot.

## Capture evidence

- Browser: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Chrome version: `150.0.7871.187`
- Desktop viewport: `1440×1200`; 12 captures
- Narrow viewport: `720×1200`; 3 captures
- Command mode: `--headless=new --disable-gpu`; a single SwiftShader retry is
  available only when a capture file is absent.
- Normal captures: 15/15 exit code `0`; SwiftShader fallback: 0 uses
- PNG path, raw-byte SHA-256, bytes, and dimensions:
  [capture-record.json](capture-record.json)

## Verification

| Command | Result | What it proves |
| --- | --- | --- |
| `tests/check-customer-search-common-shell-variability-attempt22.ps1` | exit `0` | 3 fresh runs, 45-file snapshot, fixed shell, no external references, left-aligned condition action row, result-only local overflow, complete-table scroll container, pinned boundary, captures and links |
| `tests/check-business-workflow-standard-pack.ps1` | exit `0` | 26 concepts, 23 index links, 5 settings, 23 theme roles, 2 modes, 10 override values, 8 negative cases, 72 contrast assertions, 2 binding fixtures |
| `tests/check-source-boundaries.ps1` | exit `0` | Source Independence boundary is intact |
| `git diff --check` | exit `0` | No whitespace errors in the worktree diff |

## Visual and business-screen review

Reviewed fixed light and dark captures for each run and the three narrow light
captures. All runs visibly place Search/Clear below the bounded fields at the
left edge; place the compact Add action at the fluid result-toolbar end; retain
the result toolbar and pagination outside the table scroll area; and expose an
opaque leading record-identity column with a thin boundary. No missing visible
task action or conflicting explanatory caption was found in the reviewed
states.

Limits: this is static evidence. It does not verify network behavior, persisted
query state, real navigation, keyboard interaction, assistive technology, or
responsive states beyond the captured desktop and narrow viewports.

## Post-capture correction

Visual review found that Run 2 applied its pinned-column shadow continuously,
rather than only after a horizontal scroll. This was a `non-conformance`
against the existing Manifest rule, not a Manifest or prompt change. Run 2 was
then directly edited and the full 15-capture batch was regenerated. Under the
three-run protocol, that direct output repair makes this attempt invalid for
reproducibility comparison. The limited static check now rejects an
unconditional pinned-column shadow, but the repaired Run 2 must not be used to
claim that the frozen Manifest plus prompt produced three compliant outputs.

A new numbered attempt with three fresh outputs is required before making that
claim again. The prior unchanged Run 2 source and its initial captures were
overwritten during the direct repair, so the original observation record is not
fully retained. This is an additional protocol failure; the later repaired
assets are implementation-correction evidence only.

## Two-cycle self-review

### Cycle 1

| Category | Finding | Resolution |
| --- | --- | --- |
| Potential blocker | A prior source placed only `tbody` in the horizontal scrolling context, risking a header/body alignment mismatch. | Strengthened `result-grid` and `layout-panes`; discarded that three-run result and regenerated attempt 22 from the new snapshot. |
| Potential non-blocker | Visual variation remains between independently authored Run 1–3 pages. | Expected for this variability experiment; all required structural outcomes are present. |
| Evidence weakness | Static output cannot prove runtime behavior. | Retained as an explicit limit rather than a completion claim. |
| Claim overreach | Pixel identity was not tested. | Outcome is limited to the documented structural contract. |

### Cycle 2

| Category | Result |
| --- | --- |
| Merge blockers | Direct Run 2 repair invalidates this attempt as a reproducibility result |
| Non-blockers | Expected layout variation within the fixed contract |
| Evidence shape | Complete for observation and implementation correction; invalid for three-run reproducibility comparison |
| Reporting shape | Complete: `comparison.html`, capture record, and this evaluation are mutually linked, with invalidity recorded |
| Ready for commit | No reproducibility-comparison completion claim; this task does not create a commit |
