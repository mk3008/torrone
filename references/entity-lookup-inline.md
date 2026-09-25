---
id: entity-lookup-inline
status: draft
responsibility: single-entity selection from an inline searchable candidate list
reference: ../review/references/entity-lookup-inline.html
decision_source: https://github.com/mk3008/torrone/issues/27
---

# Inline Entity lookup

This is a distinct, unapproved operation model for a simple ID/name selection. It does not replace or approve the [dialog lookup draft](entity-lookup.md). The candidate uses one labeled editable combobox and a local suggestion list, without a modal or a separate confirmation action.

## Proposed behavior to review

- Focusing an empty field shows all fixture candidates. Typing filters ID or name case-insensitively; surrounding whitespace is ignored. No matches appears in the same popup. Pointer click or Arrow keys and Enter choose one candidate; the selected name fills the field, its ID appears below it, and focus remains in the field. The popup closes.
- Focusing an already selected field selects its displayed name for replacement but does not open the popup. Typing starts a replacement search and hides the selected appearance. Arrow Down or Up opens suggestions for the displayed value without changing it; merely viewing suggestions is not an edit.
- Choosing a candidate commits it. Escape explicitly cancels an unfinished replacement and restores the previous Entity, unless the field was fully deleted first. Tab or leaving an **edited** field without choosing a candidate clears the Entity and the uncommitted query; Tab or blur without editing preserves a committed Entity. Deleting the entire field (including whitespace-only input) clears immediately. Enter without a highlighted candidate never commits arbitrary text. Clear (×) removes the commitment directly, focuses the empty input and opens all candidates.
- The popup scrolls inside a bounded region and stays attached to the field on narrow screens; it opens above the field when the visible viewport has insufficient space below. A real mobile keyboard and embedded host still need device review.

## Why this candidate

For a small searchable set with one ID/name field, inline suggestions can complete selection without a separate dialog and Select action. The alternative dialog operation remains a separate draft; richer comparison or multiple search conditions are outside this Reference and belong to [Entity Chooser Dialog](https://github.com/mk3008/torrone/issues/28) evaluation. Escape is an explicit cancellation; leaving an edited field is not, so it clears an unconfirmed Entity. Deleting to empty clears immediately. These choices respond to the owner's [empty-field finding](https://github.com/mk3008/torrone/pull/29#issuecomment-5831704929) and [Tab/blur follow-up](https://github.com/mk3008/torrone/pull/29#issuecomment-5831973423) and remain subject to rereview, not a product-wide preference.

## Boundaries and handoff

The three locations are one fixed local fixture. Filtering, popup state, selection, cancellation, clearing and reselection work locally. API/DB/auth, persistence, latency, server errors, pagination and large data sets are not modeled. The top REFERENCE FIXTURE note is review guidance, not product UI.

Preserve the observable relationship between field, suggestions, committed name/ID, Clear and focus transitions if the design is accepted. Exact text, fixture records, dimensions, DOM shape and framework are free to vary. No approved application-wide Enter/Tab policy is inferred from this standalone sample; apply [application interaction requirements](../docs/application-interaction.md) when composing it into an application. [Browser verification](../docs/entity-lookup-inline-review.md) covers bounded operation; actual device and human design review remain pending.
