---
id: entity-lookup
status: draft
responsibility: single-selection dialog lookup with explicit confirmation
reference: ../review/references/entity-lookup.html
decision_source: https://github.com/mk3008/torrone/issues/21
---

# Entity dialog lookup

This branch revises the existing executable in place for human review. Issue #21 specifies the proposed operation model; implementation and tests do not approve it.

## Preserve

- Open a modal lookup; filter the local records by ID or name (case-insensitive substring, surrounding whitespace ignored). Empty query shows all fixture records; no matches is derived from the data.
- Native radios make one pending choice explicit. Select is enabled only after a choice; it commits that exact ID/name and closes the dialog. Picking another radio replaces the choice.
- Editing the query clears the pending choice, even if it would still match, so invisible or stale selection cannot be confirmed. Enter in the query does not commit or advance focus; native radio arrows/Space choose, and Enter/Space on action buttons activate them.
- Cancel, Close and Escape discard pending changes and leave the committed parent value intact. Reopening starts with an empty filter and no pending choice; the previously committed value remains unchanged until explicit confirmation.
- Clear removes the committed value. Completion, cancellation and Clear return focus to Find location. Desktop opening focuses the query; narrow opening focuses the title to avoid summoning the keyboard immediately.
- Narrow screens retain the existing fullscreen dialog, scrolling results and persistent actions. No independent textbox scrolling is added.
- On desktop, the dialog keeps a bounded, stable outer height while filtering; the result area absorbs 2/1/0 result changes and scrolls internally when full. The empty state occupies that same area, leaving Select and Cancel in place.

## Real behavior, mocks and limits

Filtering, pending/committed selection, confirmation, cancellation, clearing and empty results execute locally. The two locations are a single fixed fixture; API/DB/auth, persistence across reload, latency, server errors and pagination are outside this responsibility. No visible production action stands in for an unimplemented search.

The top REFERENCE FIXTURE note is review guidance, not required consuming-product UI. The JSON scenario descriptions are replay metadata, not state injection or evidence that a browser path passed. There are no scenario buttons or injected result states: reviewers reach results/empty through normal filtering.

## Rationale and freedom

A native radio group communicates single selection and supplies standard keyboard behavior without a custom listbox framework. The parent value and pending dialog choice are distinct so cancellation has a stable meaning. These are proposals for this bounded lookup, not global application conventions. Labels, records, styling and implementation may vary; a required multi-selection or immediate-commit lookup needs a different operation model.

Apply [application interaction requirements](../docs/application-interaction.md). The policy and coverage for this standalone fixture are recorded above and in [verification notes](../docs/entity-lookup-review.md). Human review must decide whether to adopt it; preserve the draft until explicit acceptance.

## Review scope clarification

This example demonstrates a dialog lookup operation, not a recommendation that every entity search must first open a dialog. The owner explicitly retained this sample's operation model while noting that a textbox-integrated autocomplete may better fit simple ID/name selection. No autocomplete implementation is requested here. Close and parent selection Clear apply the [approved flat icon-button Reference](icon-button.md), retaining distinct accessible action names, 44px targets and their existing cancellation/clearing and focus-return semantics. Both use a flat × icon; their placement identifies the affected dialog or selected value.

The owner removed explanatory copy that repeated the radio group and Select/Cancel controls. This applies the [interaction-before-instructions principle](../docs/product-foundation.md#communicate-through-interaction-before-instructions); the radio group and Select/Cancel controls carry that operation meaning.

## Pending geometry review

The owner's [human finding](https://github.com/mk3008/torrone/issues/21#issuecomment-5831053714) identified the desktop dialog resizing as a material design problem. This correction keeps the dialog and footer stable across 2 → 1 → 0 → 2 results, with internal overflow and the mobile fullscreen model retained. Browser checks verify geometry and operation, but the corrected design still needs a new human review. Status remains draft.
