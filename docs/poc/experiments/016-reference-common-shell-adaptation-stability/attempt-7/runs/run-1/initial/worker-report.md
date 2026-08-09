---
task_id: generate-run-1
attempt: 1
status: ready_for_review
completed: Independent Attempt 7 Run 1 React common-shell adaptation, final hover evidence, and browser regression evidence.
changed:
  - docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-7/runs/run-1/initial/
evidence:
  - hover-observation.json
  - interaction-observation.json
  - hover-light-before.png
  - hover-light-activity.png
  - hover-dark-before.png
  - hover-dark-activity.png
verification:
  - npm ci: pass with the frozen graph; 65 packages installed
  - npm run typecheck: pass
  - npm run build: pass; 34 modules transformed
  - Attempt 3 visual-binding target check: pass
  - vNext themed-SVG target check: pass; seven themed assets
  - Final Chromium hover capture: pass mechanically; four 1440x900 PNGs, zero console errors and warnings
  - Production-preview shell interaction observation: pass; zero console errors and warnings
blockers: []
decision_required: Human visual judgment of full-row hover perceptibility and distinction from current selection.
options:
  - Accept the Run for comparison.
  - Classify a visible non-conformance without repairing this frozen Run.
recommendation: Review the two before/hover pairs side by side and preserve this Run unchanged for the Attempt 7 comparison.
risks:
  - The historical Attempt 4 and Attempt 5 composite checks remain non-passing because their nested Attempt 2 inventory contains the intentionally superseded auxiliary Manifest.
  - npm reported one moderate and one high advisory in the frozen dependency graph; no lockfile-changing audit fix was applied.
  - Browser evidence does not certify assistive-technology behavior, responsive reflow, or persistence across browser restarts.
timing:
  total_wall_clock: approximately 2h50m
  bootstrap_and_transport: approximately 5m
  source_or_input_inspection: approximately 25m
  analysis_and_observation: approximately 10m
  artifact_writing: approximately 15m
  verification_and_rendering: approximately 20m
  review_or_wait: approximately 5m
  tooling_recovery: approximately 1h30m, dominated by one Playwright npx help call that reported 5764.0s wall time before recovery
---

# Worker report — Attempt 7 Run 1

## Goal

Create one independent, self-contained React adaptation from the Attempt 7
frozen owners. The enabled, non-current `Activity` row must change its complete
row hit-area surface on pointer hover, while the simultaneously visible
`Overview` current treatment stays separately recognizable.

## Now / Next

- **Now:** The worker scope is `ready_for_review`. Final source, final captures,
  hashes, observation records, and checks are present under this Run directory.
- **Next:** The orchestrator verifies the scoped commit and opens the required
  artifact and human visual review. This worker does not accept its own Run.

## Open Questions

- Human judgment remains required for whether the full-row surface change is
  perceptible enough and distinct enough from current selection in both themes.
- No implementation decision or mechanical check can close that human gate.

## Actions Taken

- Read the complete reviewed Standard Pack Manifest at `d0363783…` and only the
  frozen owner inputs named by Attempt 7.
- Derived this application from the frozen empty React harness without reading
  or copying Attempt 6 Run implementations.
- Reused the canonical fixture, visual tokens, binding map, and seven SVGs
  unchanged. Fixed SVGs render through CSS masks with themed foregrounds.
- Implemented Drawer visibility, hierarchy disclosure, immediate navigation
  search, current-location transfer, selectable Light/Dark theme, independent
  shell scroll ownership, and visible focus treatment.
- Implemented the hover response as an implementation-owned full-row surface
  mix plus inset boundary. It does not reuse the selection surface and contains
  no text-decoration-only fallback.
- Captured final post-self-review bytes in four required states and separately
  exercised existing shell interactions from the verified production build.

## Code Changes

- `src/HarnessApp.tsx` contains the independent React state and component tree.
- `src/harness.css` imports canonical tokens and integrates every fixed SVG.
- `public/fixture.json` is byte-identical to the frozen product fixture.
- `reference-visual-bindings/` and `visual-binding-evidence.json` are unchanged
  copies required by the exact-binding contract.
- Four PNGs and two JSON observation records preserve reviewer-visible evidence.

## Acceptance Criteria and Verification Methods

| Acceptance criterion | Verification method | Result | Confidence |
| --- | --- | --- | --- |
| Independent React/Vite/plain-CSS Run from the empty harness | Frozen package/config hash comparison; dependency inspection; typecheck; production build | **pass** | High |
| Activity is enabled and non-current before hover | Browser state read before each capture | **pass** (`disabled=false`, no `aria-current`) | High |
| Pointer targets the complete Activity row away from its label, without clicking | Browser bounding boxes and pointer coordinate in `hover-observation.json` | **pass** (row `x=0..287`, label ends at `67.71875`, pointer `x=269`, `clicked=false`) | High |
| Hover changes the full row surface, not only text | Before/hover PNG pairs, computed full-row background and inset boundary, worker visual inspection | **mechanically evidenced; human judgment pending** | Medium until human review |
| Hover remains distinct from Overview current selection | Both hover PNGs keep Overview's selected surface, bold label, and physical-left indicator | **mechanically evidenced; human judgment pending** | Medium until human review |
| Hover does not change hierarchy or navigation state | Before/after browser state reads | **pass** | High |
| Canonical fixture and exact visual bindings are preserved | Fixture byte comparison; visual-binding target check; themed-SVG target check | **pass** | High |
| Existing shell interactions remain observable | Production-preview browser regression for disclosure, search, no-match, selection, theme, Drawer, entry URLs, and focus | **pass** | High for exercised behavior |
| Required evidence is complete | Four SHA-256-identified PNGs at exactly 1440x900 plus observation records | **pass** | High |

## Verification Methods and Exact Results

### Frozen-owner and target checks

- `check-reference.ps1`: **pass**.
- Attempt 3 `check-attempt-3-input.ps1`: **pass**, 24 files; visual-binding
  provenance also passed.
- Attempt 3 `check-visual-bindings.ps1 -TargetRoot <Run>`: **pass**.
- Attempt 6 `check-product-fixture-input.ps1`: **pass**, 5 files.
- Product fixture candidate check: **pass** with top-level, parent, and child
  roles and canonical-data-backed preview.
- vNext candidate check: **pass**.
- vNext SVG self-test: **pass**; mask accepted and direct-image misuse rejected.
- vNext `check-svg-rendering-contract.ps1 -TargetRoot <Run>`: **pass**, seven
  themed assets.
- React harness boundary check: **pass** for the canonical empty harness.
- Run configuration comparison: all seven frozen configuration files are
  byte-identical to the harness (`package.json`, lockfile, three tsconfig files,
  Vite config, and `.gitignore`).

### Known composite result retained without waiver

- Attempt 4 composite: **not pass**, exactly because nested Attempt 2 reports
  `templates/business-app/design-manifest` different from its historical
  auxiliary Manifest.
- Attempt 5 input check with `-RunRoot`: the Run configuration comparison
  produced no mismatch, then the command remained **not pass** at the nested
  Attempt 4 check for the same historical Manifest reason.
- These results match the Attempt 7 freeze record. They are not converted into
  passes and do not indicate Run-owned fixture, binding, or harness drift.

### Build and browser

- Node `v22.14.0` and npm `10.9.2`: fixed condition matched.
- `npm ci`: **pass**, 65 packages installed; npm reported 2 advisories
  (1 moderate, 1 high) in the frozen graph.
- `npm run typecheck`: **pass**.
- `npm run build`: **pass**, Vite transformed 34 modules.
- Final strict dev-origin capture at `http://127.0.0.1:4175`: **pass**.
  Light and Dark before/hover states used a `1440 × 900` viewport. Both actions
  observed `:hover` at the same semantic inline-end row point, with zero console
  errors, zero warnings, and zero page errors.
- Production preview interaction observation at `http://127.0.0.1:4176`:
  **pass** for disclosure collapse/expand, current-state preservation, matching
  child plus parent context, no-match state, clear restore, Activity activation,
  theme switch, Drawer hide/restore, hidden/collapsed/selected URL entries,
  child label alignment, and a `3px` focus outline with `3px` offset. Console
  errors, warnings, and page errors were all zero.
- Artifact integrity check: **pass** for four files at exactly 1440x900, stored
  SHA-256 hashes, canonical fixture bytes, and observation metadata.
- Run source-boundary scan: **pass**; no Run-owned six-digit literal colors and
  no external HTTP(S) runtime references.

## Repository Evidence

- `hover-observation.json` records URLs, viewport, hashes, row/label bounds,
  pointer action, computed hover style, preserved state, and console counts.
- `interaction-observation.json` records the existing interaction regression.
- `hover-light-before.png` and `hover-light-activity.png` are the Light pair.
- `hover-dark-before.png` and `hover-dark-activity.png` are the Dark pair.
- The React source, canonical asset copies, fixture, and visual-binding evidence
  are all in this same Run directory.

## Supplementary Evidence

- Live command output showed every named pass and the two historically expected
  composite failures. The durable JSON and Markdown records retain the results
  needed for review without depending on the live terminal.
- The first Playwright package discovery call stalled for 5764.0 seconds. It was
  recovered without changing Run source or capture conditions; all final captures
  were regenerated from the post-self-review source.

## Review Triage

### Merge blockers

- None in the worker scope.

### Human-review item

- Decide the visual quality of the full-row Activity hover and its distinction
  from Overview current selection in both themes.

### Non-blockers and limits

- Historical Attempt 4/5 composite non-pass is preserved and explained above.
- Frozen dependency advisories remain visible; changing the lockfile was outside
  scope and would invalidate the harness condition.
- Screenshots do not prove assistive-technology behavior, keyboard traversal,
  responsive reflow, or persistence across browser restarts.

## Attainment Status

`done` for the assigned worker deliverable; `ready_for_review` in orchestration
terms. Human acceptance is not claimed.

## Outcome

Reviewers can compare a final, independent Run 1 whose non-current Activity row
responds across the complete hit area in both Light and Dark while Overview
remains visibly current, with exact owner bindings and existing shell behavior
preserved.

## Why It Matters

The evidence isolates the reviewed Manifest change from label-only hover and
selection-state ambiguity. It gives the three-run experiment a comparable,
reproducible Run without promoting this implementation's concrete hover styling
into the Manifest or another owner.
