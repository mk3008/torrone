# Attempt 8 Run 1 worker report

## Status

`ready_for_review`

Run 1 was independently implemented, frozen, mechanically verified, and
observed through the exact serial ten-step contract. Attempt 2 was strictly an
observation-only correction: the 22-file implementation-tree SHA-256 was
`6b5ed5c12950a3ef253e1e61217422942df9dcec1496fddda2cdbb00a424d07f`
both before and after capture.

All six required `1440 x 900` PNGs are retained. The final Run console record
reported zero errors and zero warnings. This report makes no human-acceptance
claim.

## Identity

| Field | Observed value |
| --- | --- |
| Task | `generate-run-1` |
| Attempt | `2` |
| Worker thread | `019feea6-b1b0-73f1-a4c2-898cffc36b5b` |
| Base commit | `473cc705c346ec0c961d2ad1e5e184b71933e2eb` |
| Assigned root | `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-8/runs/run-1/initial/` |
| Model | `configured-default`; no override was applied, and the concrete model ID was not exposed by worker thread metadata |
| Reasoning effort | `configured-default`; no override was applied, and the concrete effort label was not exposed by worker thread metadata |
| Execution surface | `codex-thread-ui` |

The observed policy matched the frozen `configured-default` policy before
implementation. No peer Run or earlier generated Run was inspected.

## Correction history

Attempt 1 stopped before screenshots because the frozen endpoint was owned by
an unrelated `sql-lineage-viewer` Vite Preview process. Its unrelated page was
rejected and the session was closed. After the user authorized a coordinated
release, the orchestrator stopped exactly that external listener and verified
port `4175` was free.

Attempt 2 performed one observation-only retry. It did not edit application
source, harness configuration, exact bindings, prompt, frozen inputs, owners,
or verification criteria. Generated `.playwright-cli/` files are observation
artifacts and are outside the recorded implementation manifest.

## Frozen implementation

- Digest record: `evidence/implementation-tree.sha256`
- Aggregate SHA-256: `6b5ed5c12950a3ef253e1e61217422942df9dcec1496fddda2cdbb00a424d07f`
- Files: `22`
- Before Attempt 2 observation: matched.
- After Attempt 2 observation: matched.
- Excluded from the implementation manifest: `node_modules/`, `dist/`,
  `evidence/`, `.playwright-cli/`, and `worker-report.md`.

## Changed paths

All durable task-owned changes are under the assigned Run root:

- byte-equivalent canonical harness configuration: `.gitignore`,
  `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.app.json`,
  `tsconfig.node.json`, and `vite.config.ts`;
- independently authored application source: `src/OperationsShell.tsx`,
  `src/operations-shell.css`, and `src/main.tsx`;
- unchanged exact bindings: `reference-visual-bindings/` and
  `visual-binding-evidence.json`;
- frozen implementation record: `evidence/implementation-tree.sha256`;
- serial browser evidence: `evidence/interaction/` and `.playwright-cli/`;
- server records: `evidence/commands/`; and
- this report.

`node_modules/` and `dist/` were generated locally and remain ignored by the
canonical harness configuration.

## Acceptance matrix

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| One independently authored React/Vite/plain-CSS Run under the assigned Run 1 root | `done` | Application source is confined to the assigned root; all seven fixed harness configuration files matched canonical blobs. |
| Preserve product fixture facts and initial Light / Drawer-open / Workspace-expanded / Overview-current state | `done` | Initial snapshot and `01-initial-expanded.png` show the supplied labels, order, state, and stable workspace task. |
| Drawer visible-to-hidden-to-visible behavior preserves workspace task state | `done` | Steps 4-7; `03-drawer-hidden.png` and `04-drawer-visible-collapsed.png`. |
| Workspace collapsed-to-expanded-to-collapsed behavior preserves Drawer visibility and current destination | `done` | Steps 2, 8, and 9; `02-parent-collapsed-before.png`, `05-parent-expanded.png`, and `06-parent-collapsed-after.png`. |
| `Activity` remains a leaf without disclosure behavior | `done` | Step 3 fresh snapshot shows a leaf button with no expansion state, disclosure icon, nested region, or child list. |
| No Reference implementation copying and no peer-Run access | `done` | Only frozen owner contracts, product facts, exact assets, canonical harness, and visible illustrative behavior were used. |
| Six untouched `1440 x 900` PNGs with hashes and dimensions | `done` | Table below and `evidence/interaction/capture-record.md`. |
| Command, browser, console, serial observation, and hash records | `done` | `evidence/interaction/capture-record.md`, `.playwright-cli/`, and server logs. |
| Frozen-owner, harness, exact-binding, SVG, typecheck, and build verification | `done` with retained limits | Focused checks passed; documented historical composite non-passes remained unchanged. |
| Reproducibility classification without local repair | `done` | Attempt 1 `observation-gap` was resolved by an observation-only retry; implementation bytes stayed unchanged. |
| Human acceptance | `not done` | Intentionally reserved for artifact review and the human gate. |

## Verification evidence

### Passed focused checks

| Command / check | Result |
| --- | --- |
| `git rev-parse HEAD` | `473cc705c346ec0c961d2ad1e5e184b71933e2eb` |
| Attempt 8 Manifest and Reference Git-tree identities plus frozen-document SHA-256 comparison | Passed: Manifest tree `1f493af6aaae09b6c89d35f46b45a0f8ac35ffce`, Reference tree `c98218e35fe491fa7bd14113db135f31c427ef41`, and all three frozen-document hashes matched. |
| `docs/poc/experiments/015-reference-first-common-shell/check-reference.ps1` | Passed. |
| Attempt 3 `check-attempt-3-input.ps1` | Passed; provenance passed; baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`, 24 files. |
| Attempt 6 `check-product-fixture-input.ps1` | Passed; baseline `2b3ebb0`, 5 files. |
| vNext `check-next-contract-candidate.ps1` | Passed. |
| Attempt 5 `check-react-harness-boundary.ps1` | Passed. |
| `tests/check-business-app-standard-pack.ps1` | Passed; 3 positive and 11 negative contract cases. |
| `tests/check-manifest-quality-workflow.ps1` | Passed; seven required phases and local links valid. |
| `tests/check-source-boundaries.ps1` | Passed. |
| `npm ci --no-audit --no-fund` | Passed; 65 packages installed from the frozen lockfile. |
| `npm run typecheck` | Passed. |
| `npm run build` | Passed; Vite 5.4.14 transformed 34 modules and emitted the production bundle. |
| Attempt 3 `check-visual-bindings.ps1 -TargetRoot <Run 1>` | Passed. |
| vNext `check-svg-rendering-contract.ps1 -TargetRoot <Run 1>` | Passed; seven themed assets. |
| Direct canonical harness configuration comparison | Passed; all seven fixed configuration files matched canonical Git blobs. |
| Implementation digest before and after Attempt 2 observation | Passed; both `6b5ed5c12950a3ef253e1e61217422942df9dcec1496fddda2cdbb00a424d07f`. |
| Exact Playwright ten-step serial capture | Passed; all 25 resolved commands exited `0` without reload or state reset. |
| Run console | Total messages `3`; errors `0`; warnings `0`; one displayed informational React DevTools message. |

### Retained historical composite limits

The following non-passes were re-observed with the documented historical cause
and were not weakened or reclassified:

- Attempt 2 `check-fixed-input.ps1`: its historical bundle reports the current
  `templates/business-app/design-manifest` tree as different from the old
  approved baseline.
- Attempt 4 `check-attempt-4-input.ps1`: non-pass only through that nested
  Attempt 2 comparison; its focused vNext check passed.
- Attempt 5 `check-react-harness-input.ps1`: non-pass only through the nested
  Attempt 4 / Attempt 2 chain; its focused harness boundary and direct Run
  configuration comparison passed.

One supplementary historical Header/Drawer image-method check could not load
`System.Drawing.Image` in this environment. It is not one of the frozen
Attempt 8 focused pass gates and did not alter any owner or Run artifact.

## Browser and serial observation

- Durable record: `evidence/interaction/capture-record.md`
- Session: `attempt8-run-1-interaction`
- URL:
  `http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview`
- Viewport: `1440 x 900` CSS pixels
- Playwright CLI: `0.1.18`
- Chrome: `151.0.7922.108` at
  `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Console: errors `0`, warnings `0`

The exact serial observations confirmed:

1. initial Drawer visible, `Workspace` expanded, supplied children visible,
   `Overview` current, and workspace task visible;
2. full-row `Workspace` activation collapsed only that parent;
3. `Activity` had no disclosure behavior;
4. `Close navigation` removed the Drawer body, boundary, and reserved track
   without removing or changing the workspace task;
5. `Open navigation` returned the same Drawer with `Workspace` still
   collapsed and `Overview` still current;
6. the subsequent `Workspace` activations produced
   `collapsed -> expanded -> collapsed`; and
7. the final stable state was Drawer visible, `Workspace` collapsed,
   `Overview` current, with unchanged product labels/order and workspace task.

## PNG evidence

| File | Dimensions | SHA-256 |
| --- | --- | --- |
| `evidence/interaction/01-initial-expanded.png` | `1440 x 900` | `9ef4d46bac17c3550239050351a7ccbdc32b708510f3e5f2bc4d315d8f3e4131` |
| `evidence/interaction/02-parent-collapsed-before.png` | `1440 x 900` | `4523d839da54512c296bce35c1487000ce56e8a3b42c8fd0ecb869e8ff4aebc3` |
| `evidence/interaction/03-drawer-hidden.png` | `1440 x 900` | `d4fe8e4bd97a2a07ecd8229c62370cdff6de66819131fcea3649c6c6214ef9b9` |
| `evidence/interaction/04-drawer-visible-collapsed.png` | `1440 x 900` | `e067bf855180eb5d382fa2e1a59945a676e1bb603c2de21c5a98d6f615b26ff1` |
| `evidence/interaction/05-parent-expanded.png` | `1440 x 900` | `9bdd1136e4949bb3655e463d5cbf1138693cf021eb60e958e04702b25d6b261c` |
| `evidence/interaction/06-parent-collapsed-after.png` | `1440 x 900` | `4523d839da54512c296bce35c1487000ce56e8a3b42c8fd0ecb869e8ff4aebc3` |

The identical step-2 and final hashes corroborate the returned stable Drawer
visible / parent collapsed state. The screenshots were also visually inspected
after capture; no capture crop, missing region, or wrong-page artifact was
observed.

## Reproducibility classification and limits

- Attempt 1 classification: `observation-gap`, caused only by an unrelated
  process owning the frozen port.
- Attempt 2 result: that observation gap is resolved on unchanged Run bytes.
- Worker-level material deviation: none observed within the fixed ten-step
  contract.
- Cross-Run classification: not performed; this Worker did not inspect peers.
- Human acceptance: not claimed. Static evidence and one Run's screenshots do
  not decide meaningful behavioral equivalence or promote this Run.

The evidence does not prove assistive-technology behavior, broad keyboard
traversal, responsive behavior, production readiness, or cross-Run visual
equivalence. Those remain review and human-gate responsibilities.

## Terminal report

```yaml
task_id: generate-run-1
status: ready_for_review
completed: independently implemented, froze, verified, and serially observed Attempt 8 Run 1
changed:
  - docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-8/runs/run-1/initial/
evidence:
  - evidence/implementation-tree.sha256
  - evidence/interaction/capture-record.md
  - evidence/interaction/01-initial-expanded.png
  - evidence/interaction/02-parent-collapsed-before.png
  - evidence/interaction/03-drawer-hidden.png
  - evidence/interaction/04-drawer-visible-collapsed.png
  - evidence/interaction/05-parent-expanded.png
  - evidence/interaction/06-parent-collapsed-after.png
verification:
  - focused owner checks passed
  - canonical harness comparison passed
  - npm ci, typecheck, and production build passed
  - exact visual-binding and SVG-rendering checks passed
  - implementation digest matched before and after capture
  - exact ten-step serial capture completed with console errors 0 and warnings 0
blockers: []
decision_required: null
options: []
recommendation: proceed to independent artifact review without editing Run 1
risks:
  - human and cross-Run equivalence decisions remain open
timing:
  total_wall_clock: not precisely instrumented
  bootstrap_and_transport: completed in Attempt 1
  source_or_input_inspection: completed in Attempt 1
  analysis_and_observation: completed through one Attempt 2 observation-only retry
  artifact_writing: completed
  verification_and_rendering: completed for worker scope
  review_or_wait: pending orchestrator review
  tooling_recovery: coordinated release resolved the Attempt 1 port conflict
```
