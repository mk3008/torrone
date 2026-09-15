---
type: product-owned fixture candidate
status: human-reviewed candidate; not frozen; no adaptation Run authorized
---

# Product fixture vNext candidate

## Issue

Attempt 5 could not make parent, child, and top-level non-parent navigation
roles clear from the rendered Drawer. See the preserved
[fixture-coverage gap record](../attempt-5/fixture-coverage-gap.md).

## Customer and value

Before another adaptation experiment is frozen, a human reviewer can verify
that the supplied product facts expose all three hierarchy roles in one Drawer.
An implementation agent can receive one unambiguous hierarchy fixture without
being given a second visual specification.

## Candidate contents

- [Product input candidate](product-input-candidate.md) explains ownership and
  scope only.
- [Fixture data](fixture.json) is the product-owned candidate source for
  labels, hierarchy, order, initial state, and neutral main content.
- [Browser preview](preview/index.html) renders that data using the approved
  Reference's existing visual language. It is an observation aid, not a new
  Reference, contract, or implementation target.
- [Focused human review](human-review-request.md) asks one question only.
- [Human approval record](human-approval-record.md) records the completed
  hierarchy-observability decision.

## Scope in

- one top-level non-parent item before the group;
- one expandable parent group;
- several children belonging to that group; and
- one top-level non-parent item after the group.

## Scope out

- no change to the frozen product input, Reference, Manifest, vNext contract,
  tokens, SVGs, or Attempt 5 artifacts;
- no new visual/navigation design;
- no freeze, preflight, canary, adaptation implementation, or three-Run
  experiment; and
- no claim about framework neutrality or adaptation stability.

## Evidence plan

The repository can prove that the candidate fixture has all required hierarchy
roles and that the preview obtains its data from the one candidate JSON file.
A human must still inspect the browser preview and decide whether the three
roles can be distinguished from the screen alone.

## Ledger snapshot

| Field | State |
| --- | --- |
| Goal | Prepare an observable next fixture candidate only. |
| Now | Candidate data, browser preview, and focused human review are complete. |
| Next | Await separate authorization before freezing the candidate. |
| Blockers | No freeze or new Run is authorized by this approval alone. |
| Evidence ready? | Technical and human hierarchy-observability evidence is ready. |
