# Attempt 6 Run 3 correction report

## Status

`ready_for_review`

## Identity

- Task: `run-3`
- Correction attempt: `2`
- Base commit: `04da0dfd30b0e9d26c3e7d98480ee35c4fc9b395`
- Assigned review used:
  `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/reviews/run-3/initial-review.md`
- Preserved artifact: `attempt-6/runs/run-3/initial/`
- Corrected artifact: `attempt-6/runs/run-3/final/`
- Browser/server activity in this attempt: none

## Goal

Create a separate final Run 3 artifact that corrects only the three
implementation defects assigned by
`attempt-6/reviews/run-3/initial-review.md`, while preserving the complete
uncorrected `initial/` artifact and every frozen input unchanged.

## Now / Next

- Now: `final/` contains the corrected application, unchanged harness
  configuration, unchanged canonical assets, unchanged fixture, and this
  report. All requested repository checks pass.
- Next: the orchestrator performs serial browser observation of the final
  artifact, then sends it to independent review.

## Open Questions

- `UNCONFIRMED`: Does the final browser console contain zero
  artifact-attributable errors or warnings?
- `UNCONFIRMED`: From a stored collapsed Workspace, does entering `Section 01`
  visibly expose the matching child and does a true no-match query show the
  frozen empty message?
- `UNCONFIRMED`: Do final 1440 x 900 captures preserve the already-passing
  exact visual and SVG results after copy removal?

These questions require the serial browser observation that this correction
packet explicitly reserved for the orchestrator.

## Actions Taken

1. Recorded SHA-256 hashes for the initial entry, source, fixture, and report.
2. Derived `final/` from the Run 3 initial application without copying initial
   captures or the initial worker report.
3. Changed only `final/index.html`, `final/src/App.tsx`, and
   `final/src/styles.css` for the assigned correction scope.
4. Ran all six owner preflights, the final RunRoot harness comparison, visual
   binding validation, vNext static validation, SVG validation, locked install,
   TypeScript verification, and production build.
5. Recomputed the initial hashes and confirmed they are unchanged.
6. Per instruction, did not start Vite, preview, Playwright, or another browser.

## Code Changes

### 1. Non-requesting favicon

`index.html` now declares a local blank SVG data-URL favicon. The declaration
is present in both source and `dist/index.html`; the artifact no longer relies
on the browser's implicit `/favicon.ico` request.

### 2. Collapsed child search

`src/App.tsx` now separates stored disclosure state from search-driven display
state:

- `workspaceExpanded` remains the stored user disclosure state.
- `matchingWorkspaceChildren` records child matches.
- `searchRevealsWorkspaceChildren` becomes true only for a non-empty query with
  at least one child match.
- `workspaceDisplayedExpanded` temporarily exposes the matching group and
  drives the rendered children, disclosure icon, and `aria-expanded` value.

Clearing the query returns to the unchanged stored collapsed/expanded state.
A no-match query still produces no matching navigation rows and preserves the
frozen empty message path.

### 3. Product/demo copy removal

The final artifact removes the reviewer-listed implementation-authored copy:

- `Shared operations`
- `Workspace map`
- `Fixture ready`
- `Operational sequence`
- repeated `Neutral fixture item`
- assistive-only `Numbered fixture items`

Associated unused presentation CSS was removed. Frozen fixture content and the
reviewer-accepted generic/data labels remain unchanged, including application
name, navigation labels, search label/placeholder, Main heading/description,
the generic visible `Navigation` label, `Current destination`, and the 24
numbered items.

## Verification Methods

- PowerShell owner preflights:
  `check-fixed-input.ps1`, `check-product-input.ps1`,
  `check-attempt-3-input.ps1`, `check-attempt-4-input.ps1`,
  `check-react-harness-input.ps1`, and
  `check-product-fixture-input.ps1`.
- Final configuration boundary:
  `check-react-harness-input.ps1 -RunRoot <run-3/final>`.
- Exact asset integration:
  `check-visual-bindings.ps1 -TargetRoot <run-3/final>`.
- vNext and SVG:
  `check-next-contract-candidate.ps1` and
  `check-svg-rendering-contract.ps1 -TargetRoot <run-3/final>`.
- Build surface: `npm ci`, `npm run typecheck`, and `npm run build`.
- Scope and content assertions: SHA-256 comparison, initial/final file equality,
  exact-string scan of source and build output, favicon source/build scan, and
  final Vite-process check.

## Repository Evidence

| Acceptance criterion | Verification result | Repository evidence | Confidence |
| --- | --- | --- | --- |
| Prevent implicit favicon request | data-URL favicon exists in source and built HTML | `index.html`; `dist/index.html` inspection | partial until serial console observation |
| Expose child match without overwriting stored collapse | derived display expansion is gated by non-empty child match; stored state setter is unchanged | `src/App.tsx`; TypeScript and production build pass | partial until serial interaction observation |
| Preserve true no-match recovery | `workspaceVisible`/`hasMatches` remain false when neither parent nor child matches | `src/App.tsx`; TypeScript and production build pass | partial until serial interaction observation |
| Remove assigned product/demo copy | zero prohibited-string matches in `src`, source HTML, and `dist` | exact `rg` scan | high |
| Preserve initial artifact | all six recorded initial hashes match before/after values | initial hash evidence below | high |
| Preserve non-correction files | 20 final files outside the three correction paths are byte-identical to initial counterparts | SHA-256 comparison | high |
| Preserve canonical harness | final RunRoot comparison | pass | high |
| Preserve fixed visual assets and integration | visual-binding checker | pass | high |
| Preserve vNext/SVG constraints | vNext and SVG checkers; seven themed assets | pass | high |
| Build corrected artifact | locked install, typecheck, production build | pass; 34 modules transformed | high |
| Avoid worker-side browser observation | final Vite process count after verification | `0` | high |

### Initial artifact hash preservation

The values below were identical before final derivation and after all
corrections:

| Initial path | SHA-256 |
| --- | --- |
| `initial/index.html` | `9853A4DD379F4B2DB722A7BC8029364EDA6063B897412232A98D5F0F904BEF0E` |
| `initial/src/App.tsx` | `5345EB1023DCF096D35025BE3BC214DC4590313B9E4E128B17B557F5793B9AB3` |
| `initial/src/main.tsx` | `64747A629ABC49B5ADA63074156958B22CDB2063B242EF1CA554613DA172821F` |
| `initial/src/styles.css` | `492648229E595D14B4A46D833410C295AB07245D9517E3D64A33AA94BD78E381` |
| `initial/public/product-fixture.json` | `7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D` |
| `initial/worker-report.md` | `3D465CB0A130AA226F4928D44FB33B68F0CC69FD3326AB11FD140B076303395E` |

The canonical, initial, and final product fixture SHA-256 values all equal
`7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D`.

### Command results

| Check | Result |
| --- | --- |
| Reference preflight | pass; 52 files; baseline `9cd19321e53f6279e956df8a6d1fe562c3360544` |
| Product input preflight | pass; 1 file |
| Attempt 3 preflight | pass; 24 files; baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` |
| Attempt 4 preflight | pass; 11 files; baseline `a3ef3fa680314a3b2721076698b13dbe97d0ead4` |
| Attempt 5 harness preflight | pass; 14 files |
| Attempt 6 fixture preflight | pass; 5 files; baseline `2b3ebb0` |
| Final RunRoot harness comparison | pass |
| Visual binding validation | pass |
| vNext candidate static check | pass |
| SVG rendering contract check | pass; 7 themed assets |
| `npm ci` | pass; 65 packages installed from frozen lockfile |
| `npm run typecheck` | pass |
| `npm run build` | pass; Vite 5.4.14, 34 modules transformed |
| Prohibited copy scan | pass; 0 matches |
| Unchanged-file comparison | pass; 20 files |
| Final Vite process count | `0` |

`npm ci` reported two vulnerabilities already present in the frozen dependency
graph (one moderate and one high). No dependency or lockfile change was in
scope or made.

## Supplementary Evidence

None was produced by this worker because the correction packet prohibited
starting servers or capturing browser states. Final browser evidence must come
from the orchestrator's serial observation. Repository evidence therefore does
not prove console cleanliness or the rendered search transition by itself.

## Review Triage

- First, serially verify zero artifact-attributable console errors/warnings.
- Then start with `drawer=collapsed`, enter `Section 01`, confirm the one child
  appears with an expanded displayed disclosure, clear the query, and confirm
  the stored collapsed state returns.
- Enter a true no-match query and confirm the frozen empty message appears.
- Confirm all reviewer-listed copy is absent at 1440 x 900 and in the
  accessibility snapshot.
- Reconfirm the existing light/dark, Drawer, selection, focus, hover, and fixed
  SVG observations without treating mechanical success as human acceptance.

No fixed-input, Manifest, fixture, Reference, exact-binding, or harness change
should be requested from this correction.

## Attainment Status

`partial`

The assigned source corrections and all repository verification are done.
Final browser acceptance remains intentionally pending.

## Outcome

The orchestrator can now observe a separate corrected Run 3 artifact whose
source addresses exactly the three review-attributable defects without
mutating the initial evidence or frozen experiment inputs.

## Why It Matters

This preserves the experiment's initial/final audit trail while allowing the
serial reviewer to attribute any remaining issue to the corrected artifact,
not to hidden input drift or an over-broad repair.
