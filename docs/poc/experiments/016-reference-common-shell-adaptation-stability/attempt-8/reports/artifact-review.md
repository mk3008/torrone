---
type: Manifest artifact review
title: Attempt 8 interactive Reference behavior transmission
status: ready for human review
source: mechanical cross-run review
---

# Outcome

All three independently generated Runs satisfy the frozen, observable Drawer
visibility and parent-disclosure sequence. No scoped `manifest-gap`,
`prompt-gap`, `fixture-gap`, or `non-conformance` was found. The three Runs
have intentionally different layout mechanics, but the frozen Manifest leaves
those mechanics implementation-owned.

This is a mechanical review, not an approval. Meaningful behavioral
equivalence and acceptance remain a human decision.

# Inputs and comparison validity

| Check | Result | Evidence |
| --- | --- | --- |
| One frozen prompt, viewport, and ten-step interaction contract | `done` | [fixed prompt](../freeze/fixed-prompt.md), [interaction contract](../freeze/interaction-contract.md) |
| Three independently authored Runs | `done` | [Run 1](../runs/run-1/initial/worker-report.md), [Run 2](../runs/run-2/initial/worker-report.md), [Run 3](../runs/run-3/initial/worker-report.md) |
| Frozen product fixture and visual-binding identities | `done` | [input inventory](../freeze/input-inventory.json) and each Run's binding evidence |
| Generated implementation unchanged while browser evidence was captured | `done` | Each Run's before/after implementation digest in its worker report |
| Capture viewport and named evidence | `done` | Six `1440 x 900` PNGs per Run, with SHA-256 values in the three worker reports |
| Model/effort policy | `done` for the frozen policy | All tasks used `configured-default`; the Codex task metadata did not expose a more specific resolved identity, so none is claimed. |

No Run was edited or replaced to make this review pass. Run 1's port conflict
was resolved by an observation-only retry on unchanged bytes. Run 2's
same-thread correction normalized a raw evidence log only. Run 3 completed
without a Run-source correction.

# Cross-run review matrix

| State / responsibility | Applicable owner and frozen product fact | Expected observable effect | Run 1 evidence | Run 2 evidence | Run 3 evidence | Finding | Classification / limit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Initial shared shell | Header, Drawer; Light, Drawer visible, `Workspace` expanded, `Overview` current | Header and Drawer are visible; supplied labels/order, three children, current treatment, and workspace task appear. | `01-initial-expanded.png`, capture record | `01-initial-expanded.png`, observation record | `01-initial-expanded.png`, serial observation | All three show the supplied initial state. | None. |
| Parent disclosure collapse | Drawer; supplied `Workspace` parent | Activating the complete parent row hides `Section 01`-`03`, changes the available disclosure direction, and leaves Drawer/current/task stable. | `02-parent-collapsed-before.png` | `02-parent-collapsed-before.png` | `02-parent-collapsed-before.png` | Observed in all three. | None. |
| Leaf boundary | Drawer; supplied `Activity` leaf | `Activity` has no disclosure affordance, expansion state, child region, or parent-row behavior. | capture record step 3 | observation record step 3 | serial observation step 3 | Observed in all three accessibility snapshots. | Screenshots alone cannot establish broad assistive-technology behavior. |
| Drawer hidden | Header and Drawer; supplied Drawer controller | `Close navigation` removes the Drawer region, boundary, navigation, and reserved track while preserving workspace task, current destination, and collapsed disclosure state. | `03-drawer-hidden.png` | `03-drawer-hidden.png` | `03-drawer-hidden.png` | Observed in all three. | None. |
| Drawer restored | Header and Drawer; supplied Drawer controller | `Open navigation` returns the supplied Drawer body with `Workspace` still collapsed and `Overview` still current. | `04-drawer-visible-collapsed.png` | `04-drawer-visible-collapsed.png` | `04-drawer-visible-collapsed.png` | Observed in all three. | None. |
| Parent disclosure round trip | Drawer; supplied hierarchy/current destination | Activating `Workspace` again expands then collapses only the parent, preserves Drawer visibility/current/task, and restores the disclosed child visibility exactly. | `05-parent-expanded.png`, `06-parent-collapsed-after.png` | `05-parent-expanded.png`, `06-parent-collapsed-after.png` | `05-parent-expanded.png`, `06-parent-collapsed-after.png` | Observed in all three; each final collapsed-state image matches its post-step-2 image byte-for-byte. | None. |
| Implementation freedom | Manifest variability and frozen boundary | No Reference DOM, CSS, fixture shape, state storage, or file layout is required. | Run-owned `OperationsShell` source and three-column task grid | Run-owned `HarnessApp` source and single-column task list | Run-owned `HarnessApp` source and narrow task list | Layout and source organization differ while the scoped behavior remains stable. | `allowed-variance`: width, grid/list mechanics, DOM, CSS, and framework organization are implementation-owned. |

# Business-screen review

## Reviewed states

The initial, Drawer-hidden, restored-collapsed, parent-expanded, and final
collapsed states were inspected at the frozen `1440 x 900` viewport for all
three Runs. The focused non-happy path is hiding and restoring the Drawer
after the parent is collapsed.

## Copy and actions

| Visible content | Disposition |
| --- | --- |
| `Operations workspace`, navigation labels, search label, and workspace title | Product identity, fixture labels, or task identity. |
| `This content is only an overflow fixture for observing the common shell.` | Fixture description; acceptable in this PoC evidence surface, not product policy. |
| `Open navigation`, `Close navigation`, and `Workspace` | Concise actions with a clear outcome. |
| Process, acceptance, or UI-explanation copy in persistent chrome | None found. |

The main action geometry remains stable: the Header controller persists in
place across the Drawer transition, and the parent-row control remains in the
same navigation position across its own disclosure states. `Overview` has a
full-row selection surface plus a physical-left indicator, so current state is
not communicated by color alone. The parent disclosure is additionally
communicated by children appearing/disappearing and a directional chevron.

# Deviation ledger

| Finding | Classification | Decision / route |
| --- | --- | --- |
| Historical Attempt 2/4/5 composite checks report the already-frozen current-Manifest identity mismatch. | `allowed-variance` in this review context | Retained exactly as historical evidence; focused owner and Run checks pass. No check was weakened. |
| Run 1's initial fixed-port browser attempt addressed an unrelated server and accepted no screenshots. | resolved `observation-gap` | User-authorized, observation-only retry captured the full sequence with unchanged implementation digest. |
| Runs 2 and 3 record one `/favicon.ico` 404; Run 1 records none. | `allowed-variance` / implementation-owned runtime defect | Retain counts. It does not invalidate the focused interaction evidence, but it is undesirable and should be addressed only by a newly frozen harness decision, not an individual Run repair. |
| Task-pane width and item arrangement differ across Runs. | `allowed-variance` | The frozen owners bind the interaction and visual tokens, not task-grid/list geometry. Human review should judge usability, but this is not a scoped behavior failure. |

# Remaining limits and gate recommendation

- Pointer hover, broad keyboard traversal, focus behavior, assistive
  technology, responsive layout, animation, route semantics, and production
  readiness were not exercised by the frozen contract. They are `not verified`,
  not inferred from these screenshots.
- The interactive Reference demonstrated the scoped behavior, but the review
  does not claim that it caused the stability; it establishes only that the
  three independent Runs reproduced the frozen observable rules.

Request human review of the live Reference and all three live Runs. The human
gate should decide whether the interaction is meaningfully equivalent and
whether the permitted layout variation is acceptable for the PoC's purpose.
