---
task_id: review-run-1
attempt: 1
role: reviewer
run: React Run 1 initial
base_commit: 8244166e40e3884a24e0c5773ca89ff3078b77ce
status: ready_for_review
gate_recommendation: rework required before a human acceptance gate
---

# React Run 1 initial review

## Scope and result

Reviewed only `attempt-5/runs/run-1/initial/` against the immutable Attempt 5
condition, Attempt 3 visual bindings, and Attempt 4 contract. No other Attempt
5 Run output, report, review, or comparison material was used.

**Result: not ready for acceptance.** The source cannot establish the required
independently scrollable Drawer and workspace regions: `.shell-body` has only a
`min-height`, so its auto-height grid row expands to its Drawer content. The
Drawer's `overflow: auto` therefore has no bounded block size at the fixed
viewport; the page, rather than the Drawer, is the scroll container. This is a
`React implementation omission`.

The fixed port's existing application could not be attributed to Run 1: its
visible semantic content and accessible control names did not match Run 1's
frozen source/captures. Per scope, it was not investigated further. Consequently
this review does not claim live interaction, computed-style, hover, or
focus-visible observations for the target; that is a `harness/observation-tool
issue`, not an implementation defect.

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Harness boundary | pass | `attempt-5/freeze/check-react-harness-boundary.ps1` |
| Frozen owners and Run configuration | pass | `check-react-harness-input.ps1 -RunRoot .../runs/run-1/initial`; includes Reference, product, Attempt 3, and Attempt 4 preflights |
| Fixed visual binding static validation | pass | `attempt-3/validation/check-visual-bindings.ps1 -TargetRoot .../runs/run-1/initial` |
| SVG rendering static validation | pass | `check-svg-rendering-contract.ps1 -TargetRoot .../runs/run-1/initial`; seven themed assets; no prohibited direct image use |
| TypeScript / production build | pass | Run 1 worker report records locked `npm ci`, `npm run typecheck`, and `npm run build`; reviewer did not modify the artifact |

## Acceptance matrix

| Criterion | Status | Evidence and limit |
| --- | --- | --- |
| Header, Drawer, and Main retain distinct shell roles | done | `HarnessApp.tsx`; light and dark captures show the required relationship. |
| Drawer can hide without removing Main | done | `drawerOpen` state and conditional `<aside>`; `captures/drawer-hidden.png` retains Main. |
| Parent disclosure exposes/hides children with discernible state | done | `aria-expanded`, mapped disclosure masks, and `captures/light.png` / `workspace-collapsed.png`. |
| Selected navigation is distinguishable | done | `aria-current="page"`, selected tokens, 0.25rem physical-start indicator, and `captures/section-01.png`. |
| Drawer and workspace are independently scrollable | not done | `harness.css` lines 33-35 and 51: neither the grid container nor its row has a bounded height. Drawer overflow cannot become its own viewport scroll region. |
| Theme, Drawer, disclosure, and selection transitions are coherent | partial | React state wiring is direct and complete in source; target-live transitions were not attributable at the fixed port. |
| Frozen token stylesheet and theme-root hook | done | Unchanged Run copy, `data-reference-visual-theme`, and static binding validation. |
| Header/Drawer/workspace/selection/indicator token bindings | done | `harness.css`; Run 1 light, dark, and selected captures visibly use the prescribed surfaces and indicator location. |
| All seven fixed assets retain state, direction, size, and semantic placement | partial | CSS mask references every asset at the binding-map sizes; captures cover the open/hidden Drawer, both themes, expanded/collapsed disclosure, search, and selection. Target-live computed placement was unavailable. |
| `currentColor` result, dark contrast, and no external `img` misuse | partial | All SVGs use `currentColor`; masks apply `background-color: currentColor`; static SVG contract passes; dark capture shows perceptible icons. The target-live computed colors could not be attributed. |
| Accessible control names remain independent of icons | done | Header `aria-label`s, search label, navigation labels, and `aria-hidden` icon spans in `HarnessApp.tsx`. |
| Hover treatment | partial | CSS defines a distinct hover background. No reliable target hover observation exists; **human gate required**. |
| Focus-visible treatment | partial | Source defines a 3px tokenized outline with 2px offset. No target focus-visible capture or target-live observation; **human gate required**. |

## Finding ledger

| Finding | Classification | Evidence | Route |
| --- | --- | --- |
| Independent Drawer/workspace scrolling is absent | React implementation omission | Auto-height grid analysis above; 29 navigation rows exceed the 840px body minimum but no fixed row/container height constrains `.drawer`. | Correct only the Run 1 React/CSS implementation, then regenerate its Run evidence. |
| Fixed-port application cannot be proven to be Run 1 | harness/observation-tool issue | Its rendered semantic fingerprint diverged from Run 1 source/captures; fixed port was already occupied. | Provide an attributable Run 1 observation endpoint or capture record; do not alter frozen inputs. |
| Actual hover rendering unavailable | harness/observation-tool issue | Static rule exists; no reliable attributable target hover state. | Human visual gate or a bounded observation-only capture path. |
| Actual focus-visible rendering unavailable | harness/observation-tool issue | Static focus rule exists; no attributable target keyboard capture. | Human visual/accessibility gate or a bounded observation-only capture path. |

## Business-screen review notes

The fixture copy is task/fixture identity and necessary state information; no
prohibited demo, Contract, process, or UI-explanation copy was found. Icon-only
actions have concise accessible names (`Hide/Show navigation`, `Switch to dark/
light theme`), and selection is not color-only because it also has a physical
start indicator and `aria-current`. No contract, product-input, or adaptation-
instruction change is indicated. The material defect belongs to the React
implementation; the remaining evidence gaps belong to the observation surface.

## Evidence limits and next gate

Run 1's saved captures were inspected for light, dark, open, hidden, expanded,
collapsed, and selected states. They support the visible static-state findings
but cannot prove keyboard behavior, assistive-technology behavior, hover, or
computed styles. A static pass is not treated as proof of an Exact binding.

After the independent-scroll implementation omission is corrected and fresh
Run 1 evidence is captured, request a human review for hover and focus-visible
rendering if a target-attributable browser observer is still unavailable.
