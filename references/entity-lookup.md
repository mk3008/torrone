---
id: entity-lookup
status: approved
responsibility: choose one Entity from combined search conditions and comparable results in a parent-dependent modal
reference: ../review/references/entity-lookup.html
decision_source: https://github.com/mk3008/torrone/issues/28
---

# Entity Chooser Dialog

This Reference covers choosing one service location as part of a parent task. The [inline Entity lookup](entity-lookup-inline.md) covers a compact ID/name search. The original one-field dialog and its correction history remain in [Issue #21](https://github.com/mk3008/torrone/issues/21) and [PR #26](https://github.com/mk3008/torrone/pull/26). Approval applies to this redesigned chooser, not to the superseded one-field dialog.

## Preserved responsibility

- Open from the parent; search by ID/name, region and facility type. Conditions combine, and empty conditions include all ten fixture locations. A result shows name, ID, region and type for comparison. Filtering is local and immediate; an empty result follows from the conditions.
- Native radios make one pending choice explicit. Select commits the exact chosen Entity to the parent and closes the dialog. Changing any search condition clears the pending choice, even when its row would still match; Select remains disabled until a new choice. Reopening resets all conditions and the pending choice.
- Cancel, Close and Escape discard pending changes without changing the committed parent value. Clear removes the committed value. Completion, cancellation and Clear return focus to the parent trigger. Desktop opening focuses ID/name; narrow opening focuses the title to avoid invoking the keyboard immediately. Enter in ID/name alone does not select or advance focus.
- The desktop dialog has compact fixed header, conditions and footer; the result region receives the remaining space, shows a meaningful batch of complete rows for comparison and scrolls internally without resizing the outer dialog. Name and ID share a desktop line for scan density, while taller desktop viewports can give more room to results without making the dialog fullscreen. Narrow screens use a fullscreen dialog with a compact top bar, reachable paired conditions, internally scrolling results and persistent actions. Its height follows the visible viewport. This allocation responds to the owner's [layout finding](https://github.com/mk3008/torrone/pull/30#issuecomment-5832765741) and [density finding](https://github.com/mk3008/torrone/pull/30#issuecomment-5833146457); the accepted scope preserves this relationship rather than incidental dimensions.

## Why a dialog here

Combined independent conditions narrow a candidate set, while region and facility type in each row support comparison before an explicit confirmation. These are the reasons to use a modal chooser instead of the one-field inline lookup. The dialog remains subordinate to the parent task and returns one Entity. Allocating space to results first keeps a bounded desktop modal useful; a mobile viewport calls for fullscreen allocation instead. If the task requires paging, substantial sorting, navigating to details, editing, export or bulk actions, evaluate a Search Screen instead of extending this modal. These boundaries follow [Issue #28](https://github.com/mk3008/torrone/issues/28) and define the accepted chooser's scope.

## Fixture and handoff

Ten locations, condition filtering, pending/committed selection, confirmation, cancellation, clearing and empty results execute locally. The records and labels are examples. API/DB/auth, persistence, latency, loading, server errors, pagination and large data sets are outside the fixture. The REFERENCE FIXTURE note is review guidance, not product UI. JSON scenario descriptions are replay hints, not an implementation or design approval.

Preserve the local relationship between conditions, comparable results, pending radio choice, explicit confirmation, cancellation, parent value and focus return. Exact records, styling, DOM and framework may vary. The [flat icon-button Reference](icon-button.md) applies to Close and parent Clear. A consuming application must supply its own shared navigation and submission policy; see [application interaction requirements](../docs/application-interaction.md) and the [browser verification notes](../docs/entity-lookup-review.md). Material changes to this approved executable or preserved behavior return the changed version to draft.

## Approval and exact artifact

The repository owner explicitly accepted the Torrone screen review on 2026-10-05 and authorized the review-finalization merge. Approval is bounded to the responsibility and preserved behavior above.

- Approved executable: [review/references/entity-lookup.html](https://github.com/mk3008/torrone/blob/5574ba4f8f6007f81ca7c1d7dac394fc5cd82acc/review/references/entity-lookup.html)
- Git blob: `b28487af5c464d119099fd7cf12a1432a2dae512`
- This curation does not change executable bytes or claim new browser verification. Existing real-device, assistive-technology and consuming-application coverage limits remain.
