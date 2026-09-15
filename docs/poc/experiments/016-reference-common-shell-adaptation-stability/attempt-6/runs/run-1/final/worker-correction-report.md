# Attempt 6 Run 1 final correction report

## Outcome

**Attainment Status: partial.** A separate Run 1 final artifact now contains
only the five review-attributable implementation corrections requested in
`attempt-6/reviews/run-1/initial-review.md`. All fixed-input, harness, build,
vNext, exact-visual, and SVG static checks pass. Rendered behavior and a clean
browser console remain **UNCONFIRMED** until the orchestrator performs the
assigned serial observation.

## Goal

Preserve the Run 1 initial artifact unchanged while producing a separate final
artifact that corrects only the five implementation non-conformances identified
by the assigned independent review.

## Why It Matters

Reviewers can compare an untouched initial result with a narrowly corrected
final result, attribute every implementation change to a documented finding,
and serially verify the final artifact without any frozen input or exact visual
authority having changed.

## Base and review authority

- Base commit: `04da0dfd30b0e9d26c3e7d98480ee35c4fc9b395`.
- Correction attempt: `2`.
- Assigned review:
  `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/reviews/run-1/initial-review.md`.
- No other review, Run output, correction history, or past Attempt output was
  inspected.

## Now / Next

- **Now:** the final source artifact and repository-verifiable evidence are
  ready for orchestrator review.
- **Next:** the orchestrator starts the final artifact in isolation, performs
  the serial console and `1440x900` state observation, and returns the evidence
  to independent review.

## Open Questions

- **UNCONFIRMED:** the data favicon suppresses the implicit `/favicon.ico`
  request in the orchestrator's browser environment.
- **UNCONFIRMED:** the search remains visibly fixed while a deliberately long
  navigation list scrolls.
- **UNCONFIRMED:** the selected weight and positive-offset focus halo have the
  expected rendered distinction and gap.
- **UNCONFIRMED:** refreshed final captures contain no unrelated visual drift.

## Actions Taken

1. Sent and completed the direct Attempt 2 correction handshake.
2. Read only the assigned Run 1 initial review.
3. Recorded the initial artifact's pre-correction combined hash.
4. Copied the 23 application files from `initial/` into a separate `final/`
   artifact, excluding initial reports, captures, dependencies, and build
   output.
5. Changed only `index.html`, `src/HarnessApp.tsx`, and `src/harness.css`.
6. Ran dependency installation, typecheck, production build, every owner
   preflight, the final RunRoot harness comparison, and all requested target
   static checks.
7. Recomputed the initial combined hash and confirmed that it is unchanged.
8. Did not start a server or capture browser states, as instructed.

## Code Changes

### Review-attributable differences from initial

| Final path | Correction |
| --- | --- |
| `index.html` | Adds an explicit artifact-owned SVG data favicon declaration so the browser need not request `/favicon.ico`. |
| `src/HarnessApp.tsx` | Removes the visible unsupplied `Common shell` Header overline and identifies the remaining Drawer navigation region as the scroll owner. |
| `src/harness.css` | Keeps Drawer overflow hidden, gives the remaining navigation region vertical scrolling, uses a `2px` positive focus-outline offset, and gives the current navigation row weight `700`. |

The final artifact otherwise contains byte-for-byte copies of the initial app
configuration, source entry, product fixture, binding evidence, canonical token
stylesheet, binding map, and seven SVGs.

### Preserved initial artifact

The initial integrity set excludes local `node_modules/`, `dist/`, and ignored
runtime logs. Before and after correction it contained 25 files with combined
SHA-256:

`475A5AE67B8FB201458C5208DF368C7AC6FBE7EA1FD053B922CFEFC31FD3F454`

No file under `attempt-6/runs/run-1/initial/` was edited.

## Verification Methods

### Build and dependency graph

| Command | Result |
| --- | --- |
| `npm ci` | pass; 65 packages installed from the frozen lockfile |
| `npm run typecheck` | pass |
| `npm run build` | pass; Vite 5.4.14, 34 modules transformed |

The frozen dependency audit still reports one moderate and one high
vulnerability. It was not changed because the dependency graph and lockfile are
fixed inputs.

### Frozen owner preflights

| Owner | Command | Result |
| --- | --- | --- |
| Reference | `attempt-2/check-fixed-input.ps1` | pass; baseline `9cd19321...`, 52 files |
| Historical product | `attempt-2/check-product-input.ps1` | pass; 1 file |
| Attempt 3 visual binding | `attempt-3/freeze/check-attempt-3-input.ps1` | pass; baseline `1d805e8f...`, 24 files |
| Attempt 4 vNext | `attempt-4/freeze/check-attempt-4-input.ps1` | pass; baseline `a3ef3fa...`, 11 files |
| React harness | `attempt-5/freeze/check-react-harness-input.ps1 -RunRoot <Run 1 final>` | pass; 14 files and canonical final Run configuration |
| Attempt 6 fixture | `attempt-6/freeze/check-product-fixture-input.ps1` | pass; baseline `2b3ebb0`, 5 files |

The historical product and harness checks emitted sandbox warnings about the
user-level Git ignore file. They exited `0`, and their blob/path assertions
passed.

### Final target checks

| Check | Result | Evidence boundary |
| --- | --- | --- |
| `check-visual-bindings.ps1 -TargetRoot <Run 1 final>` | pass | Proves exact canonical binding copies and integration references. |
| `check-next-contract-candidate.ps1` | pass | Proves the frozen vNext validation structure remains intact. |
| `check-svg-rendering-contract.ps1 -TargetRoot <Run 1 final>` | pass; 7 themed assets | Proves there is no prohibited direct external-image rendering path. |
| Five correction source assertions | pass | Proves the requested declarations and CSS/React ownership changes are present. |
| Final fixture SHA-256 comparison | pass: `7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D` | Proves the final product fixture copy is byte-identical to the frozen source. |
| Initial combined SHA-256 comparison | pass | Proves the durable initial evidence was not edited by this correction. |

## Acceptance Matrix

| Assigned correction | Repository verification | Browser verification | Status |
| --- | --- | --- | --- |
| Remove visible `Common shell` Header overline | The element is absent from final `HarnessApp.tsx`; only supplied application identity remains. | refreshed Header captures pending | partial |
| Keep search fixed above a navigation-list-only scrollport | Drawer uses `overflow: hidden`; `navigation-scroll-region` is flex-remnant with `min-height: 0` and `overflow-y: auto`. | long-list scroll behavior pending | partial |
| Distinguish selected-row type weight | `.navigation-button.is-current` now has `font-weight: 700` without changing selected surface, foreground, indicator, or alignment rules. | selected-state capture pending | partial |
| Draw an outer focus halo with a visible gap | Canonical focus color remains; `outline-offset` changed from `-3px` to `2px`. | focused-search capture pending | partial |
| Prevent artifact-attributable favicon 404 | `index.html` declares a valid SVG `data:` favicon and adds no network asset. | clean console re-observation pending | partial |
| Preserve frozen inputs and exact assets | All owner, RunRoot, visual, vNext, SVG, fixture-hash checks pass. | no additional browser proof needed for byte identity | done |
| Preserve initial artifact | Combined initial hash matches before and after correction. | not applicable | done |

## Repository Evidence

- `index.html` contains the explicit local data favicon declaration.
- `src/HarnessApp.tsx` contains only the supplied Header identity and marks the
  remaining Drawer navigation region for scrolling.
- `src/harness.css` contains the corrected scroll ownership, focus gap, and
  selected type weight.
- `reference-visual-bindings/`, `visual-binding-evidence.json`, and
  `public/product-fixture.json` retain their canonical content.
- Passing commands above provide reproducible build, config, asset, and source
  evidence.

## Supplementary Evidence

- Local production output exists under ignored `dist/` after the successful
  build; it is not the durable source of truth.
- No browser, console, screenshot, or hover evidence was collected by this
  Worker for the final artifact. Confidence in rendered correction behavior is
  therefore weaker until orchestrator serial observation.

## Correction Scope and Counts

- Review-attributable implementation corrections: **5**.
- Final application files differing from initial: **3**.
- Observation-tool corrections in this attempt: **0**.
- Fixed-input, fixture, Reference, contract, hierarchy, state, exact-binding,
  SVG, hover, or unrelated visual changes: **0**.

## Problems and Classification

The five assigned `non-conformance` findings are corrected at the source level.
No `manifest-gap`, `prompt-gap`, `fixture-gap`, `reference-binding-gap`,
`adaptation-instruction-gap`, `validation-gap`, `exact-binding-miss`, or
`structural-invariant-miss` was introduced or routed to this correction.
Rendered confirmation remains an observation/review step, not a new input or
implementation correction.

## Review Triage

- **Ready for orchestrator review:** final source, build, static evidence, and
  initial-integrity proof are complete.
- **Required before acceptance:** provenance-safe serial browser observation,
  clean-console confirmation, refreshed `1440x900` captures, and independent
  review of the final artifact.
- **Not requested:** any input change, hover correction, new design rule, or
  Worker self-acceptance.

## Human Gate

Human acceptance is not requested by this report. It remains downstream of
serial rendered evidence and independent final review.
