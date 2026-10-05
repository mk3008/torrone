---
id: entity-lookup-inline
status: approved
responsibility: single-entity selection from an inline searchable candidate list
reference: ../review/references/entity-lookup-inline.html
decision_source: https://github.com/mk3008/torrone/issues/27
---

# Inline Entity lookup

This Reference covers simple ID/name selection. Use the separate [Entity Chooser Dialog](entity-lookup.md) when multiple conditions and richer comparison justify a modal. The inline lookup uses one labeled editable combobox and a local suggestion list, without a modal or a separate confirmation action.

## Preserved behavior

- Focusing an empty field shows all fixture candidates. Typing filters ID or name case-insensitively; surrounding whitespace is ignored. No matches appears in the same popup. Pointer click or Arrow keys and Enter choose one candidate; the selected name fills the field, its ID appears below it, and focus remains in the field. The popup closes.
- Focusing an already selected field selects its displayed name for replacement but does not open the popup. Typing starts a replacement search and hides the selected ID and Clear action. Arrow Down or Up opens suggestions for the displayed value without changing it; merely viewing suggestions is not an edit. The textbox surface and border stay the same for empty, searching and committed values; focus retains its normal outline. The value, ID and Clear action indicate commitment, following the owner's [visual review finding](https://github.com/mk3008/torrone/pull/29#issuecomment-5832080348).
- Choosing a candidate commits it. Escape explicitly cancels an unfinished replacement and restores the previous Entity, unless the field was fully deleted first. Tab or leaving an **edited** field without choosing a candidate clears the Entity and the uncommitted query; Tab or blur without editing preserves a committed Entity. Deleting the entire field (including whitespace-only input) clears immediately. Enter without a highlighted candidate never commits arbitrary text. Clear (×) removes the commitment directly, focuses the empty input and opens all candidates. The × is a named pointer/touch convenience, outside sequential Tab order; keyboard users can clear by deleting the textbox value. Tab traverses the lookup as one form control, following the owner's [keyboard review finding](https://github.com/mk3008/torrone/pull/29#issuecomment-5832160026).
- The popup scrolls inside a bounded region and stays attached to the field on narrow screens; it opens above the field when the visible viewport has insufficient space below. A real mobile keyboard and embedded host still need device review.

## Applicability and rationale

For a small searchable set with one ID/name field, inline suggestions can complete selection without a separate dialog and Select action. Richer comparison or multiple search conditions are outside this Reference and belong to the separate [Entity Chooser Dialog](entity-lookup.md). Escape is an explicit cancellation; leaving an edited field is not, so it clears an unconfirmed Entity. Deleting to empty clears immediately. These choices respond to the owner's [empty-field finding](https://github.com/mk3008/torrone/pull/29#issuecomment-5831704929) and [Tab/blur follow-up](https://github.com/mk3008/torrone/pull/29#issuecomment-5831973423) and are accepted within this Reference's scope, not as a product-wide preference.

## Boundaries and handoff

The three locations are one fixed local fixture. Filtering, popup state, selection, cancellation, clearing and reselection work locally. API/DB/auth, persistence, latency, server errors, pagination and large data sets are not modeled. The top REFERENCE FIXTURE note is review guidance, not product UI.

Preserve the observable relationship between field, suggestions, committed name/ID, Clear and focus transitions. Exact text, fixture records, dimensions, DOM shape and framework are free to vary. No approved application-wide Enter/Tab policy is inferred from this standalone sample; apply [application interaction requirements](../docs/application-interaction.md) when composing it into an application. [Browser verification](../docs/entity-lookup-inline-review.md) covers bounded operation; actual device verification remains outside the recorded browser coverage.

## Approval and exact artifact

The repository owner explicitly accepted the Torrone screen review on 2026-10-05 and authorized the review-finalization merge; see the [human decision record in PR #31](https://github.com/mk3008/torrone/pull/31). Approval is bounded to the responsibility and preserved behavior above.

- Approved executable: [review/references/entity-lookup-inline.html](https://github.com/mk3008/torrone/blob/5574ba4f8f6007f81ca7c1d7dac394fc5cd82acc/review/references/entity-lookup-inline.html)
- Git blob: `0c0eb19a4dccf897d73dcdf8c26751215bbc8a97`
- This curation does not change executable bytes or claim new browser verification. Existing real-device, assistive-technology and consuming-application coverage limits remain.
