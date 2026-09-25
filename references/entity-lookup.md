---
id: entity-lookup
status: draft
responsibility: choose one Entity from combined search conditions and comparable results in a parent-dependent modal
reference: ../review/references/entity-lookup.html
decision_source: https://github.com/mk3008/torrone/issues/28
---

# Entity Chooser Dialog

This is an unapproved candidate for choosing one service location as part of a parent task. The [inline Entity lookup](entity-lookup-inline.md) is the separate draft for a compact ID/name search. The original one-field dialog and its correction history remain in [Issue #21](https://github.com/mk3008/torrone/issues/21) and [PR #26](https://github.com/mk3008/torrone/pull/26). This redesign does not transfer approval from that history.

## Proposed responsibility

- Open from the parent; search by ID/name, region and facility type. Conditions combine, and empty conditions include all six fixture locations. A result shows name, ID, region and type for comparison. Filtering is local and immediate; an empty result follows from the conditions.
- Native radios make one pending choice explicit. Select commits the exact chosen Entity to the parent and closes the dialog. Changing any search condition clears the pending choice, even when its row would still match; Select remains disabled until a new choice. Reopening resets all conditions and the pending choice.
- Cancel, Close and Escape discard pending changes without changing the committed parent value. Clear removes the committed value. Completion, cancellation and Clear return focus to the parent trigger. Desktop opening focuses ID/name; narrow opening focuses the title to avoid invoking the keyboard immediately. Enter in ID/name alone does not select or advance focus.
- The desktop dialog retains its fixed outer height and footer while the results scroll inside. Narrow screens retain a fullscreen dialog, compact paired conditions, readable labeled result details and persistent actions. The earlier geometry correction remains observable under a larger real fixture.

## Why a dialog here

Combined independent conditions narrow a candidate set, while region and facility type in each row support comparison before an explicit confirmation. These are the proposed reasons to use a modal chooser instead of the one-field inline lookup. The dialog remains subordinate to the parent task and returns one Entity. If the task requires paging, substantial sorting, navigating to details, editing, export or bulk actions, evaluate a Search Screen instead of extending this modal. These boundaries follow [Issue #28](https://github.com/mk3008/torrone/issues/28) and await human judgment on whether the richer chooser is genuinely useful.

## Fixture and handoff

Six locations, condition filtering, pending/committed selection, confirmation, cancellation, clearing and empty results execute locally. The records and labels are examples. API/DB/auth, persistence, latency, loading, server errors, pagination and large data sets are outside the fixture. The REFERENCE FIXTURE note is review guidance, not product UI. JSON scenario descriptions are replay hints, not an implementation or design approval.

Preserve the local relationship between conditions, comparable results, pending radio choice, explicit confirmation, cancellation, parent value and focus return if accepted. Exact records, styling, DOM and framework may vary. The [flat icon-button Reference](icon-button.md) applies to Close and parent Clear. A consuming application must supply its own shared navigation and submission policy; see [application interaction requirements](../docs/application-interaction.md) and the [browser verification notes](../docs/entity-lookup-review.md). Keep this Reference `draft` until explicit human approval of this redesigned version.
