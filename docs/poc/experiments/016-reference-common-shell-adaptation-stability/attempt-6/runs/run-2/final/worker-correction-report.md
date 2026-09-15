# Attempt 6 Run 2 correction report

Status: `ready_for_review` for orchestrator-owned serial HTTP observation. The bounded source corrections and repository verification are complete; rendered states and console output remain `UNCONFIRMED` because this worker was instructed not to start a server or capture browser evidence.

## Identity and authority

- Task: `run-2`
- Attempt: `2`
- Worker thread: `019fe170-f2cf-7af2-9b9d-cecfeba39e43`
- Base commit: `04da0dfd30b0e9d26c3e7d98480ee35c4fc9b395`
- Assigned review: [initial-review.md](../../../reviews/run-2/initial-review.md)
- Initial artifact: [../initial/](../initial/)
- Final artifact: this directory
- Correction authority: only D1–D6 from the assigned review and the orchestrator's six-item correction packet

No peer Run, peer review, frozen input implementation, past Attempt output, server, or browser capture was inspected for this correction.

## Preservation and changed surface

The initial durable tree was hashed before and after the correction. Both observations produced:

```text
files=27
SHA256=70E98133C20BE472311677BEC910C0BABC286C7A7F325CF688427711A65B80AF
```

The final artifact was mechanically derived from the initial artifact without its initial report or observation output. A SHA-256 comparison between corresponding implementation artifacts found exactly three changed files:

1. [index.html](index.html)
2. [src/HarnessApp.tsx](src/HarnessApp.tsx)
3. [src/harness.css](src/harness.css)

All copied harness configuration, fixture data, visual-binding evidence, tokens, binding map, and seven SVG assets remain content-identical to the initial artifact and canonical checks.

## Review-attributable corrections

| Review defect | Correction | Repository evidence | Static result | Rendered result |
| --- | --- | --- | --- | --- |
| D1 — Drawer scroll ownership | `.navigation-drawer` is now a finite `auto / minmax(0, 1fr)` grid with `overflow: hidden`; the fixed search row occupies the first track. `nav` constrains the remaining region, and `.navigation-list` alone owns `overflow-y: auto`. Workspace scrolling is unchanged. | [src/harness.css](src/harness.css) | `done` | `UNCONFIRMED` pending serial observation with an overflowing fixture or source-backed review. |
| D2 — Collapsed parent search | A non-empty child match renders a temporary child-results list under its parent when the stored Workspace state is collapsed. The ordinary disclosure list remains `hidden={!workspaceExpanded}`, and search never calls `setWorkspaceExpanded`; clearing search therefore restores the stored collapsed view. | [src/HarnessApp.tsx](src/HarnessApp.tsx) | `done` | `UNCONFIRMED` pending serial interaction observation. |
| D3 — Selected type weight | `.navigation-row.selected` now adds `font-weight: 650` while retaining canonical foreground, full-row surface, physical-left indicator, and child indentation. | [src/harness.css](src/harness.css) | `done` | `UNCONFIRMED` pending selected-state capture. |
| D4 — Outer focus halo | The canonical focus color is retained. `outline-offset` changed from negative to positive `0.1875rem`, preserving the ordinary control border and creating a visible gap before the halo. | [src/harness.css](src/harness.css) | `done` | `UNCONFIRMED` pending keyboard `focus-visible` capture. |
| D5 — Dynamic Header tooltips | Drawer and theme next-action strings are each computed once and supplied to both `aria-label` and `title`, so tooltip and accessible name change together with state. | [src/HarnessApp.tsx](src/HarnessApp.tsx) | `done` | `UNCONFIRMED` pending tooltip/state observation. |
| D6 — Favicon 404 | A data-URL favicon is declared in the document head. The declaration is present in both source and production `dist/index.html`, so the artifact no longer relies on the browser's implicit `/favicon.ico` request. | [index.html](index.html) | `done` | Console-error-free result remains `UNCONFIRMED` pending serial observation. |

No correction was made for D7 because the review classifies it as an evidence-only observation gap. No correction was made for D8 because the assigned review accepts it as `allowed-implementation-freedom`.

## Verification

### Preflights

All relevant owner preflights passed before correction:

- Reference fixed input (`52` files)
- Product input (`1` file)
- Attempt 3 visual-binding input (`24` files)
- Attempt 4 vNext input (`11` files)
- React harness input (`14` files)
- Attempt 6 product fixture (`5` files)

They passed again after correction. The final harness check used:

```text
check-react-harness-input.ps1 -RunRoot docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/runs/run-2/final
```

It reported the final Run root and `files=14`, confirming that package, lockfile, TypeScript configuration, Vite configuration, and local ignore rules still match the frozen harness.

### Install, typecheck, build, and contract checks

| Command / check | Result | Evidence |
| --- | --- | --- |
| `node --version` | `done` | `v22.14.0` |
| `npm --version` | `done` | `10.9.2` |
| `npm ci` | `done` | `65` packages installed and `66` audited from the unchanged lockfile. The frozen graph still reports one moderate and one high audit finding; no dependency was changed. |
| `npm run typecheck` | `done` | TypeScript build completed without error. |
| `npm run build` | `done` | Vite `5.4.14`, `35` modules transformed, production output generated. |
| vNext candidate static check | `done` | `Reference contract vNext candidate static check passed.` |
| Attempt 3 visual-binding check | `done` | `Visual binding validation passed.` |
| SVG rendering contract check | `done` | Passed with `themed-assets=7`. |
| Targeted correction assertions | `done` | Two-row Drawer, list-only scroll owner, collapsed-search override, stored disclosure state, selected weight, positive focus gap, paired dynamic tooltips, and source/built data favicon all passed. |
| Initial preservation check | `done` | The 27-file durable-tree digest remained `70E981...B80AF`. |
| Initial-to-final correction boundary | `done` | Exactly `index.html`, `src/HarnessApp.tsx`, and `src/harness.css` differ before this report. |
| Browser/server checks | `not done` | Explicitly prohibited in the correction packet; orchestrator serial observation is required. |

The fixed harness contains no test or lint script. Typecheck, production build, owner preflights, contract checks, and targeted source assertions are the available repository checks.

## Acceptance matrix

| Acceptance criterion | Verification method | Result | Repository evidence | Supplementary evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| Preserve frozen inputs and initial artifact | Owner preflights, final `-RunRoot` harness check, initial durable-tree digest | `done` | Initial and final artifact trees; this report | Command output | High |
| Keep search fixed and make only the remaining navigation list scroll | CSS structure assertion and build | `partial` | [src/harness.css](src/harness.css) | Overflow browser observation pending | High for source; unconfirmed for rendering |
| Expose a matching child without changing stored collapse | TSX state/render assertions, typecheck, and build | `partial` | [src/HarnessApp.tsx](src/HarnessApp.tsx) | Search interaction observation pending | High for source; unconfirmed for behavior |
| Distinguish selected type weight without changing exact selection bindings | CSS assertion plus visual-binding check | `partial` | [src/harness.css](src/harness.css), frozen binding copies | Selected capture pending | High for source; unconfirmed for rendering |
| Retain ordinary border and add separated outer focus halo | Positive-offset assertion plus build | `partial` | [src/harness.css](src/harness.css) | `focus-visible` capture pending | High for source; unconfirmed for rendering |
| Keep Header accessible names and tooltips dynamically identical | Shared-variable source assertion and typecheck | `partial` | [src/HarnessApp.tsx](src/HarnessApp.tsx) | Tooltip state observation pending | High for source; unconfirmed for browser UI |
| Prevent artifact-attributable favicon 404 | Source and built-HTML data-favicon assertions | `partial` | [index.html](index.html) | Console observation pending | High for artifact declaration; unconfirmed for console |
| Preserve exact visual and SVG authorities | Canonical asset copies, visual-binding check, SVG check | `done` statically | [reference-visual-bindings/](reference-visual-bindings/), [visual-binding-evidence.json](visual-binding-evidence.json) | Final rendered states pending | High for identity and integration |

## Correction counts and remaining gates

- Bounded implementation correction count for Attempt 2: `1`
- Correction-attributable implementation files changed: `3`
- Observation-tool correction count for Attempt 2: `0`
- Server processes started: `0`
- Browser captures created: `0`
- Human gate: none raised by this worker
- Required next action: orchestrator serial observation of the final artifact, including Dark + Drawer hidden, collapsed-parent child search, selection weight, keyboard focus, dynamic tooltips, and console output

The final artifact is ready for that evidence pass. It is not represented as browser-verified or ready for the human review gate until the orchestrator accepts the fresh serial results.
