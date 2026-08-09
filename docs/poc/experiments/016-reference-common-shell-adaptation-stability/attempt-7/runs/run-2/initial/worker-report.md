---
type: Attempt 7 worker report
task_id: generate-run-2
attempt: 1
status: ready_for_review
base_commit: 6f157c0d5f2406da432d02e9ce58aa9982c79c5a
worker_thread_id: 019fe5b7-4d3e-7891-808a-cad5fa39ed34
---

# Attempt 7 Run 2 worker report

## Goal

Generate one isolated React adaptation from the Attempt 7 frozen owners, make
the enabled non-current Activity row respond across its full pointer hit area,
preserve the existing fixture and exact-binding contracts, and deliver the
required Light/Dark evidence for review.

## Attainment Status

`done` for the worker packet. The Run is delivered as `ready_for_review`;
artifact acceptance and the human visual gate are outside this worker's
authority.

## Outcome

`ready_for_review`

Run 2 is an independently implemented React/TypeScript/Vite common-shell
adaptation under this `initial/` directory. It uses the frozen harness graph,
unchanged Reference visual bindings, and unchanged product fixture. The
enabled, non-current `Activity` row changes its complete row surface on pointer
hover and remains visibly different from the simultaneous `Overview` current
treatment in the captured Light and Dark states.

This worker does not accept the Run. The full-row response and visual
distinction remain human-review decisions.

## Why It Matters

A reviewer can now compare idle Activity, hovered Activity, and current
Overview in both required themes without inferring the pointer action or fixed
state from source alone. The unchanged bindings and fixture remain inspectable
alongside the rendered evidence.

## Now / Next

- **Now:** Run 2 source, four captures, observation records, and exact check
  results are ready for orchestrator review.
- **Next:** the orchestrator verifies the commit/diff and routes the frozen Run
  to artifact review and the eventual human comparison gate.

## Open Questions

- **UNCONFIRMED:** Does human review find the full-row Activity hover
  sufficiently perceptible and distinct from current Overview in both themes?
- **UNCONFIRMED:** The browser outcomes explicitly listed as unexercised under
  Limits remain outside this worker's browser evidence.

## Actions Taken

- Read only the frozen owners named by the Attempt 7 input set and evaluation
  contract; did not inspect another Run implementation.
- Derived the application from the frozen empty React harness and reused the
  exact visual-binding assets and product fixture unchanged.
- Ran owner, target, build, capture, hash, and scope checks; preserved the
  recorded composite-preflight limitations.
- Captured the required four states serially, released the fixed port, and
  persisted reviewer-readable evidence.

## Code Changes

- Fixed React 19 / TypeScript 5.7.2 / Vite 5.4.14 harness configuration:
  7 of 7 configuration blobs match the frozen empty harness.
- Unchanged `reference-visual-bindings/` token stylesheet, binding map, and all
  seven fixed SVGs, rendered as themed CSS masks.
- Unchanged product fixture at `public/product-fixture.json`.
- Product-bound Header, Drawer, immediate navigation search, hierarchy
  disclosure, current destination, selectable Light/Dark theme, and neutral
  workspace overflow fixture.
- Current rows keep the exact full-row selection roles and physical-left
  `0.25rem` indicator. Non-current enabled rows use a Run-owned full-surface
  hover fill plus inset boundary, without text decoration or a copied
  Reference implementation.

No Manifest, Reference, product-fixture owner, harness owner, freeze document,
Attempt 6 artifact, or another Run was edited. Attempt 6 Run implementations
were not inspected or copied.

## Verification Methods

- Repository scripts for Reference, frozen-owner identity, target visual
  bindings, and SVG rendering.
- Frozen package-lock comparison, TypeScript compilation, and Vite production
  build.
- Playwright pointer movement and DOM-state inspection at the fixed origin and
  viewport.
- PNG dimension/hash checks and JSON-to-file consistency checks.
- Scoped Git status and implementation-source scans.

## Repository Evidence

- React source and plain CSS: `src/`.
- Frozen configuration and exact assets: package/TypeScript/Vite files,
  `reference-visual-bindings/`, `visual-binding-evidence.json`, and
  `public/product-fixture.json`.
- Primary rendered evidence and capture record: the four PNGs and
  `evidence/hover-observation.json`.
- Collision/rejection boundary: `evidence/rejected-observation.md`.
- Verification and limits: this report.

## Required hover evidence

All PNGs are `1440 x 900` CSS-pixel viewport captures.

| State | File | SHA-256 |
| --- | --- | --- |
| Light baseline | `evidence/hover-light-before.png` | `7e8f52958faf242562a60bc58f4022de95324b9488ee993abe99b9124b733ac2` |
| Light Activity hover | `evidence/hover-light-activity.png` | `ea0c9bc97de03331f151be41adfbbcd56670225dcb9e908aa2189bcddba224f3` |
| Dark baseline | `evidence/hover-dark-before.png` | `544b8b7c7f0835e03339438f3451c808a018fcf90aefd3d9ce00fbdde4fbaed6` |
| Dark Activity hover | `evidence/hover-dark-activity.png` | `15dbcd5ba746687aae599ba4979459c5e165ab0ff119e7a394c38119a52a9b4d` |

The focused record is `evidence/hover-observation.json`. Each theme was reset
through its fixed URL before the pair. Playwright moved the pointer from
outside navigation rows to `(275, 425)`, inside the visually empty inline-end
portion of the `Activity` row. The observed row rectangle was
`left=0, top=402, right=299, bottom=448`; `elementFromPoint` resolved to
`activity`. No click occurred.

For both hover captures:

- `Activity` was enabled and non-current;
- `Overview` remained `aria-current="page"`;
- current destination remained `overview`;
- Drawer remained open, Workspace remained expanded, and search remained
  empty;
- no destination or hierarchy state changed; and
- Playwright reported `0` console errors and `0` warnings.

The before/hover hashes differ in both themes. The PNG pairs were visually
inspected only for evidence quality: the hover surface is visible across the
row while Overview retains its selected fill, leading indicator, and weight.
That inspection is not an acceptance decision.

## Supplementary Evidence

`evidence/browser-regression-observation.json` records the completed
post-capture checks:

- collapsing Workspace hid all three children while retaining Overview as the
  current destination;
- re-expansion restored all three children;
- searching `Section 02` preserved the Workspace parent context;
- an unmatched query displayed the supplied no-match message; and
- clearing search restored all six visible rows and retained Overview.

The Run 2 Playwright session was closed and its owned Vite listener was stopped.
Port `127.0.0.1:4175` was confirmed free before notifying the orchestrator.

The browser execution is supplementary runtime evidence. Its stable PNG and
JSON outputs are committed as repository evidence; the Playwright CLI's
temporary internal snapshot/console cache is not retained.

## Verification results

| Verification | Result | Exact evidence or output |
| --- | --- | --- |
| Runtime versions | pass | Node `v22.14.0`; npm `10.9.2` |
| Locked install | pass with audit notice | `npm ci`; 65 packages added; npm reported 2 vulnerabilities (1 moderate, 1 high); lockfile unchanged |
| TypeScript | pass | `npm run typecheck` |
| Production build | pass | `npm run build`; Vite transformed 34 modules and produced the production bundle |
| Approved Reference static check | pass | `check-reference.ps1`: `Reference-first common shell static check passed.` |
| Attempt 3 frozen visual-binding input | pass | provenance passed; baseline `1d805e8...`; 24 files |
| Product fixture frozen input | pass | baseline `2b3ebb0`; 5 files |
| vNext candidate static check | pass | `Reference contract vNext candidate static check passed.` |
| SVG contract self-test | pass | CSS mask accepted; direct external image rejected |
| Run visual bindings | pass | `check-visual-bindings.ps1 -TargetRoot <RunRoot>` |
| Run SVG target | pass | 7 themed assets; direct-image check passed |
| Frozen harness configuration | pass | 7 of 7 Run configuration blobs match the empty harness |
| Product fixture Run copy | pass | Run copy blob `b92ebaea742ef9fe022962f46813e6a8366c3b1c` matches owner |
| Observation JSON and PNGs | pass | both JSON files parse; all four recorded SHA-256 values match their PNGs; all PNGs are 1440 x 900 |
| Implementation external/direct-image scan | pass | no HTTP(S) or `<img>` reference in `index.html`, `src/`, or `vite.config.ts` |

## Known non-passing composite preflights

The Attempt 4 composite preflight exited `1` because its nested historical
Attempt 2 bundle reports only:

`Approved baseline differs from working tree: templates/business-app/design-manifest`

The Attempt 5 composite preflight, including `-RunRoot`, reached that same
nested check and exited `1` through `Attempt 4 fixed-input preflight failed.`
No Run configuration mismatch was reported before the nested failure. These
are the frozen Attempt 7 input set's recorded historical auxiliary-Manifest
mismatches; they were not waived, repaired, or reclassified by this worker.
The focused Reference, Attempt 3, vNext, SVG, harness-blob, product-fixture,
Run-target, build, and browser checks above report their independent results.

## Rejected observation

Before Run 1 released the fixed port, Run 2's strict-port startup failed and a
first Playwright open reached the Run 1 listener. That page was rejected and
never used for Run 2 evidence. `evidence/rejected-observation.md` records the
collision, the known PID, the rejection, and the limit that raw temporary
snapshot/console files had already been removed before the orchestrator asked
for retention. No screenshot was taken during the rejected open.

## Review Triage

- **Worker-packet blockers:** none found after final verification.
- **Human gate:** required; visual acceptance is `UNCONFIRMED` by this worker.
- **Non-blockers carried forward:** the known historical composite-preflight
  mismatch, the frozen dependency graph's npm audit notice, and the explicitly
  unexercised supplementary browser outcomes.
- **Evidence shape:** primary repository evidence and supplementary runtime
  evidence are separated; limitations and the rejected origin are visible.
- **Reporting shape:** outcome, reviewer value, attainment, next owner, and
  uncertainty are explicit.
- **Ready For PR?:** no; this is a frozen experiment Run prepared for
  orchestrator/artifact review, not a PR deliverable.

## Limits and review gates

- Human review must decide whether the full-row hover response is perceptible
  and sufficiently distinct from current/selected treatment in both themes.
- Screenshots and computed styles do not prove event semantics, keyboard or
  assistive-technology behavior, contrast compliance, reflow, or production
  readiness.
- The supplementary browser pass did not exercise Drawer visibility,
  selection transfer, focus-visible, or independent scrolling because the
  fixed port was released promptly for Run 1's queued recapture. These outcomes
  must not be reported as browser-verified by this worker.
- `npm ci` reported the audit notice above; this Run did not change the frozen
  dependency graph or run an automatic audit fix.
- The final commit hash is delivered in the terminal `WORKER_REPORT` message;
  it is intentionally not self-referential inside the committed report.
