# INLINE-LOOKUP-001 — Searchable entity-field appearances

[View the seven independent images](index.html).

- Category: Component / inline single-entity lookup.
- Platform: Web-origin illustrations. Browser, native/mobile and assistive-technology rendering unverified.
- Status: **Human-accepted appearance examples; not merged or released.** [Visual acceptance](https://github.com/mk3008/torrone/pull/47#issuecomment-6192564496). Source Reference approval remains separate.
- Appearance: one labeled field with an attached name-and-ID list; committed values show a Clear action and an ID below the field. The field surface stays the same through empty, searching and committed states.

| State image | Appearance | Provenance |
| --- | --- | --- |
| [empty](images/empty.png) | Empty field without suggestions or committed ID. | Source-supported reconstruction |
| [candidates-open](images/candidates-open.png) | Focused empty field with all local name-and-ID candidates. | Source-supported reconstruction |
| [filtered](images/filtered.png) | Query LC-044 and the matching candidate. | Source-supported reconstruction |
| [candidate-highlighted](images/candidate-highlighted.png) | Emphasized candidate row; not a committed value. | Source-supported reconstruction |
| [no-results](images/no-results.png) | Unmatched query and a message inside the local popup. | Source-supported reconstruction |
| [committed-focused](images/committed-focused.png) | Name, Clear and committed ID with ordinary focus outline; popup absent. | Source-supported reconstruction |
| [committed-unfocused](images/committed-unfocused.png) | Same committed name, Clear and ID without focus outline. | Source-supported reconstruction |

The field, list and committed ID form the minimum composition needed to distinguish searching, candidate emphasis and commitment. No page heading, research banner, modal or unrelated form control is included. Gallery layout and image canvas are not the UI design.

## Sources and fixture

[Inline Entity lookup curation](../../../references/entity-lookup-inline.md) identifies the approved [executable](../../../review/references/entity-lookup-inline.html), Git blob `0c0eb19a4dccf897d73dcdf8c26751215bbc8a97`, and the [human decision in PR #31](https://github.com/mk3008/torrone/pull/31). Its `.field`, `:focus-within`, `.popup`, `.option[data-active="true"]`, `.option-name`, `.option-id`, `.empty` and `.selected-id` styles ground these appearances. `renderCommitted`, `showMatches` and `setActive` ground the pictured fixture combinations.

The exact three source records are LC-031 North Distribution Center, LC-044 Riverside Depot and LC-052 Harbor Service Point. LC-044 matches only Riverside Depot; zzzz matches none. Names, IDs, queries and labels are illustrative records, not product requirements. Highlighting a result does not show commitment: only the committed images show Clear and an ID below the field. Commitment does not tint the field or change its border; the ordinary focus outline is separate.

[SVG artwork](artwork/) is newly drawn from those source relationships and rasterized to PNG. These are not original screenshots, observed browser states or automatically approved exports. No unsupported loading/server-error/permission/pagination/disabled state was added.

## Limits

Theme/colors, typography, geometry, dimensions, spacing and fixture wording are illustrative. These images do not define event handling, filtering rules, keyboard/focus movement, cancellation, clearing, validation, persistence or application policy. Those contracts remain in the approved executable/curation; the catalog does not replace or weaken them.

Above-field popup placement and narrow/scrolling variants are left to the executable Reference. Their viewport-clearance and overlay behavior are not defined by this seven-image set. Unpictured combinations, native text-selection appearance, mobile keyboards, touch, accessibility and responsiveness cannot be inferred from these static drawings.
