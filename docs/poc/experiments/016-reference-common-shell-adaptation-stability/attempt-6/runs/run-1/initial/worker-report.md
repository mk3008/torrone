# Attempt 6 Run 1 initial Worker report

## Outcome

**Attainment Status: partial.** The independent Run 1 React common-shell
initial artifact is durable and passes all frozen-input, harness, TypeScript,
production-build, exact-asset, vNext, and SVG static gates. Browser-rendered
acceptance and the required `1440x900` captures remain **UNCONFIRMED** because a
concurrent process occupied the frozen port. Per the orchestrator's
`OBSERVATION_CLARIFICATION`, the orchestrator will perform serial per-Run HTTP
observation before independent review.

## Goal

Produce an independent React + TypeScript + Vite adaptation of the approved
common shell under the Run 1 initial directory, using only frozen inputs and
preserving the uncorrected initial artifact for later review.

## Why It Matters

This artifact makes it possible to compare whether one independent React
adaptation preserves the common shell's structural invariants, exact visual
bindings, themed fixed SVGs, and product-owned hierarchy without reusing a
prior Run or changing the frozen authorities.

## Base commit

`04da0dfd30b0e9d26c3e7d98480ee35c4fc9b395`

## Now / Next

- **Now:** the Run 1 source, frozen copies, build output, static results, and
  observation-provenance record are durable.
- **Next:** the orchestrator performs provenance-safe serial browser observation
  and captures at `1440x900`, then sends the unchanged initial artifact to an
  independent reviewer.

## Open Questions

- **UNCONFIRMED:** rendered placement, cascade, icon perceptibility, and exact
  theme colors in light and dark.
- **UNCONFIRMED:** browser-visible Drawer hidden, Workspace expanded/collapsed,
  selected, `focus-visible`, and hover states.
- **Human decision remains required:** the non-current hover treatment uses an
  underline because the frozen binding set has no approved hover token; the
  Interaction Foundations candidate still requires human review.

## Actions Taken

1. Completed and delivered the direct Worker start handshake.
2. Read the applicable repository guidance and frozen owner inputs without
   consulting Attempt 5 outputs or another Attempt 6 Run.
3. Ran all owner preflights before implementation.
4. Derived the assigned directory from the frozen React harness.
5. Copied the canonical visual bindings, evidence template, and approved product
   fixture unchanged.
6. Authored the React component/state implementation and plain CSS only in the
   assigned Run 1 initial directory.
7. Installed the locked dependency graph, typechecked, built, reran every owner
   preflight, and ran the target static gates.
8. Attempted browser observation, rejected all results after proving a
   fixed-port provenance conflict, and preserved only the durable conflict
   record.

## Code Changes

All changed paths are under
`docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/runs/run-1/initial/`:

- Frozen harness copies: `.gitignore`, `index.html`, `package.json`,
  `package-lock.json`, `tsconfig.json`, `tsconfig.app.json`,
  `tsconfig.node.json`, `vite.config.ts`, `src/main.tsx`, and
  `src/vite-env.d.ts`.
- Run implementation: `src/HarnessApp.tsx` and `src/harness.css`.
- Frozen visual evidence: `reference-visual-bindings/` and
  `visual-binding-evidence.json`.
- Frozen product data copy: `public/product-fixture.json`.
- Observation evidence: `captures/observation-conflict.md`.
- Durable report: `worker-report.md`.

No frozen input, Reference, vNext contract, React harness, past Attempt, or
other Run output was changed.

## Initial Artifacts

| Artifact | Path | State |
| --- | --- | --- |
| React shell source | `src/HarnessApp.tsx` | durable initial |
| Plain CSS integration | `src/harness.css` | durable initial |
| Canonical binding copy | `reference-visual-bindings/` | unchanged copy |
| Visual evidence map | `visual-binding-evidence.json` | unchanged copy |
| Product fixture copy | `public/product-fixture.json` | SHA-256 matched |
| Production bundle | `dist/` | generated locally; ignored by fixed harness |
| Port-conflict record | `captures/observation-conflict.md` | durable evidence |

## Verification Methods

### Environment and build

| Check | Result |
| --- | --- |
| `node --version` | pass: `v22.14.0` |
| `npm --version` | pass: `10.9.2` |
| `npm ci` | pass: 65 packages added; fixed audit reported 1 moderate and 1 high vulnerability |
| `npm run typecheck` | pass |
| `npm run build` | pass: Vite 5.4.14, 34 modules transformed |

The dependency audit findings were not remediated because the committed
lockfile and dependency graph are frozen inputs.

### Owner preflights

Every check below passed both before and after implementation. The post-build
React harness check included the assigned `-RunRoot`.

| Owner | Command | Result |
| --- | --- | --- |
| Reference | `attempt-2/check-fixed-input.ps1` | pass; baseline `9cd19321...`, 52 files |
| Historical product | `attempt-2/check-product-input.ps1` | pass; 1 file |
| Attempt 3 visual binding | `attempt-3/freeze/check-attempt-3-input.ps1` | pass; baseline `1d805e8f...`, 24 files |
| Attempt 4 vNext | `attempt-4/freeze/check-attempt-4-input.ps1` | pass; baseline `a3ef3fa...`, 11 files |
| React harness | `attempt-5/freeze/check-react-harness-input.ps1 -RunRoot <Run 1 initial>` | pass; 14 files and canonical Run configuration |
| Attempt 6 fixture | `attempt-6/freeze/check-product-fixture-input.ps1` | pass; baseline `2b3ebb0`, 5 files |

The product/harness preflights emitted sandbox warnings about the user-level
Git ignore file, but the checks exited `0` and their path/blob assertions passed.

### Target static gates

| Check | Result | What it proves |
| --- | --- | --- |
| `check-visual-bindings.ps1 -TargetRoot <Run 1 initial>` | pass | Canonical token, binding map, seven SVGs, evidence map, asset references, and theme hook are present and unchanged. |
| `check-next-contract-candidate.ps1` | pass | The frozen vNext contract validation structure remains intact. |
| `check-svg-rendering-contract.ps1 -TargetRoot <Run 1 initial>` | pass; 7 themed assets | No prohibited direct external-image rendering path is present. |
| Fixture SHA-256 comparison | pass: `7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D` | The Run consumes a byte-identical product fixture copy. |
| Hierarchy integration assertions | pass | Source fetches the fixture, keeps disclosure separate, and renders children only while Workspace is expanded. |

## Repository Evidence

- `src/HarnessApp.tsx` contains the independent component/state implementation,
  accessible control names, fixture-driven hierarchy, selection, Drawer,
  Workspace, and theme transitions.
- `src/harness.css` provides the distinct Header/Drawer/Main shell, independent
  Drawer/workspace scrolling, selected full-row treatment with a physical-start
  `0.25rem` indicator, focus treatment, and CSS-mask `currentColor` integration.
- `reference-visual-bindings/` and `visual-binding-evidence.json` are the
  canonical exact-binding inspection surface.
- `public/product-fixture.json` is byte-identical to the frozen fixture.
- `captures/observation-conflict.md` proves why no browser evidence was accepted.

## Supplementary Evidence

- Local production output in `dist/` was generated successfully but is ignored
  by the frozen harness and is not the primary durable proof.
- The discarded Playwright snapshot and console were intentionally deleted
  because the observed DOM came from the process already occupying port `4175`,
  not from Run 1.
- No PNG is claimed as Run 1 evidence in this report.

## Acceptance Matrix

| Acceptance area | Repository/static evidence | Browser evidence | Status |
| --- | --- | --- | --- |
| Header, Drawer, Main responsibilities | component/CSS inspection plus typecheck/build | serial observation pending | partial |
| Drawer toggle removes Drawer and reserved track while preserving workspace | conditional React rendering and hidden grid class | serial observation pending | partial |
| Independent Drawer/workspace scroll regions | `overflow-y: auto` on both bounded regions | serial observation pending | partial |
| Workspace disclosure remains separate and retains selection | independent state variables and parent-only toggle | serial observation pending | partial |
| Accessible control names and focusability | native buttons/input, `aria-label`, `aria-expanded`, `aria-current`, `:focus-visible` | focus-visible capture pending | partial |
| Exact token/binding assets | exact-binding static checker passed | light/dark rendered comparison pending | partial |
| Selected row and physical-start indicator | bound token declarations and static asset evidence | selected capture pending | partial |
| Fixed SVG geometry and themed rendering family | seven unchanged SVGs; CSS masks; SVG static checker passed | light/dark perceptibility pending | partial |
| Hierarchy: Overview, Workspace parent, Activity | frozen fixture plus SHA-256 and integration assertions | expanded/collapsed captures pending | partial |
| Exactly Section 01–03 as Workspace children | fixture preflight and byte-identical copy | expanded/collapsed captures pending | partial |
| Search fixture behavior | fixture-driven label, placeholder, filter, and empty message in source | browser interaction pending | partial |
| Hover | non-current label underline authored outside exact bindings | hover capture pending; Foundation decision remains human-owned | partial |

## Capture Matrix

| Required capture | Worker result | Next evidence owner |
| --- | --- | --- |
| Light, Drawer open | not accepted | orchestrator serial observation |
| Dark, Drawer open | not accepted | orchestrator serial observation |
| Drawer hidden | not accepted | orchestrator serial observation |
| Workspace expanded | not accepted | orchestrator serial observation |
| Workspace collapsed | not accepted | orchestrator serial observation |
| Selected | not accepted | orchestrator serial observation |
| `focus-visible` | not accepted | orchestrator serial observation |
| Hover | not accepted | orchestrator serial observation, then human judgment |

## Problems and Classification

- `observation-gap`: concurrent occupation of the frozen `127.0.0.1:4175`
  endpoint prevented provenance-safe Run 1 capture. The orchestrator has assigned
  a deterministic serial observation return path; no implementation change was
  made.
- `allowed-implementation-freedom`: React component boundaries, local state,
  CSS organization, CSS-mask SVG integration, non-current hover underline, and
  the disclosure-only Workspace parent are implementation choices outside the
  exact binding map.
- No `exact-binding-miss`, `structural-invariant-miss`,
  `reference-binding-gap`, `adaptation-instruction-gap`, `fixture-gap`, or
  `non-conformance` was established by the completed static checks.
- The locked `npm ci` audit result is an environment/dependency limitation,
  outside the visual deviation taxonomy; changing it would violate the fixed
  harness scope.

## Correction Counts

- Implementation correction count: **0**.
- Observation-tool correction count: **2**.
  1. Task-local npm cache after the default cache `EPERM` failure.
  2. Provenance rejection and cleanup after the fixed-port collision.

## Unlisted Judgments

- Used the permitted CSS-mask family so each unchanged canonical SVG renders
  with `background-color: currentColor` in the active theme.
- Treated `Workspace` as disclosure-only, while non-parent top-level items and
  its children are selectable destinations.
- Kept collapsed Workspace authoritative even when search text matches a child;
  collapse hides only the children and does not change the current destination.
- Used an underline for non-selected hover instead of inventing a hover color or
  token. This remains subject to the human-owned Interaction Foundations gate.
- Loaded the byte-identical fixture at runtime and did not inspect or copy its
  observation-only preview implementation.

## Review Triage

- **Non-blocking for durable initial handoff:** all frozen/static/build checks
  pass and no fixed-input change is required.
- **Required before independent review:** orchestrator-owned serial browser
  observation and all eight `1440x900` captures.
- **Required before acceptance:** independent artifact review and the human
  review gate. This Worker does not accept its own output.

## Human Gate

Human acceptance is not requested yet. It remains gated on provenance-safe
rendered evidence, independent review, and explicit judgment of visible state
distinguishability, especially hover and `focus-visible`.
