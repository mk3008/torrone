---
type: UI Configuration Definition
title: Record-list options
description: Finite presentation choices for the authored searchable record-list pattern.
status: draft
source: authored
scope: components/search-conditions, components/result-grid, components/pagination, and screen-patterns/record-list.
configuration:
  - id: search_actions_region
    type: enum
    default: start
    allowed_values: [start, center, end]
    meaning:
      start: Place the search action group at the logical start of its region.
      center: Place the search action group in the visual center of its region.
      end: Place the search action group at the logical end of its region.
    scope: search conditions action group
    owner: product_design
    relationships: []
  - id: search_action_order
    type: semantic_id_array
    default: [search, clear]
    allowed_values:
      - [search, clear]
      - [clear, search]
    meaning:
      search: The semantic action that applies an already declared query.
      clear: The semantic action that clears an already declared query.
    scope: search conditions action group
    owner: product_design
    relationships: []
  - id: pagination_region
    type: enum
    default: end
    allowed_values: [start, end]
    meaning:
      start: Place pagination at the logical start of the result continuation region.
      end: Place pagination at the logical end of the result continuation region.
    scope: compact pagination controls within the pageable result-pane footer
    owner: product_design
    relationships: []
  - id: result_count_presentation
    type: enum
    default: summary
    allowed_values: [hidden, summary]
    meaning:
      hidden: Do not display a count presentation.
      summary: Display the product-declared aggregate in a result summary.
    scope: result summary
    owner: product_design
    relationships: []
  - id: row_action_presentation
    type: enum
    default: link
    allowed_values: [link, button, overflow_menu]
    meaning:
      link: Represent an available row operation as an inline link treatment.
      button: Represent an available row operation as an explicit button treatment.
      overflow_menu: Group multiple low-frequency available row operations in an overflow menu.
    scope: available row operations
    owner: product_design
    relationships:
      - overflow_menu requires multiple low-frequency operations already declared by product binding.
---

# Guidance

These definitions are the only configuration vocabulary for this Phase 1 slice. They change placement, ordering, and presentation without changing the Markdown guidance. The stable action IDs `search` and `clear` are semantic identifiers, not display copy.

# Resolution

This file is the sole definition authority for record-list options. Start with
its defaults, then apply zero or one selected record-list override. An omitted
override key retains the default; an override replaces a whole scalar or array
value, never appends to an array. `null` and an empty array are not permitted
values unless this definition explicitly allows them. Do not layer overrides
for this definition: a consumer that needs a second local policy must create
one reviewed, resolved record-list override file with provenance outside this
pack. A separately selected theme-color override may coexist because it
resolves against a different definition.

Reject an undefined ID, a value outside its allowed set, a duplicate ID in one override, or a conflict from multiple override files before application. A deprecated or renamed ID is a breaking pack change until a documented migration maps it to a supported ID.

Resolution does not authorize rendering. After resolution, check the product binding: `search_actions_region` needs an available search action group; `search_action_order` is filtered to its matching available semantic actions while preserving the selected relative order; `pagination_region` needs pageable results; `result_count_presentation: summary` needs an available aggregate and meaning; and `row_action_presentation` needs an available row operation. If no action remains after filtering, the action group is **not exercised**. `overflow_menu` additionally needs multiple low-frequency operations. When any other prerequisite is absent, retain the resolved value as **not exercised**, omit the dependent UI, and report the missing binding fact; do not invent a fallback feature.

`open_record: true` requires a product binding with both a non-empty `destination_reference` and `destination_available: true`. A missing, blank, unresolved, or unavailable destination rejects the binding before configuration resolution. `row_action_presentation` never supplies or infers a destination. When `open_record: false`, the row-action presentation is **not exercised**, its dependent UI is omitted, and no configuration value may make `open_record` effectively true. These are opaque product references; this pack does not standardize a URL, route format, or destination implementation.

# Default rationale

These are maintainable defaults for this illustrative business-app pack, not universal design rules. Product bindings continue to own feature availability, destinations, permissions, state, data, aggregate meaning, and display language; configuration cannot change any of those concerns.

| Setting | Default and reason | Representative condition for another allowed value | Binding-owned / not configurable |
| --- | --- | --- | --- |
| `search_actions_region` | `start`, keeping the already-declared search actions aligned with the beginning of their bounded in-page form task. | A product has an established end or centered convention for the same search group. | Whether a search group exists, its actions, state, permissions, and copy. |
| `search_action_order` | `[search, clear]`, placing the apply action before the optional reset action in this pack's common list task. | A product convention needs reset before apply and both actions are available. | Action existence, behavior, labels, state changes, and availability. |
| `pagination_region` | `end`, keeping compact continuation controls at the logical end of the full-width result-pane footer. | A product has a documented leading continuation-control convention. | Whether results are pageable, page state, totals, cursors, and data access. |
| `result_count_presentation` | `summary`, so an available product-defined aggregate may be shown beside the list context. | The aggregate is not useful for the task and should be `hidden`. | Aggregate availability, meaning, calculation, value, and displayed business language. |
| `row_action_presentation` | `link`, a compact treatment for the common single record-opening operation. | An available operation needs stronger emphasis (`button`) or several low-frequency operations qualify for `overflow_menu`. | Operation existence, destination, destination availability, permission, behavior, and row data. |

# Compatibility

`pack_version` identifies this vocabulary. For this 0.x pack, **compatible** means exact string equality of both `pack_id` and `pack_version` across the manifest, selected override, and binding; version ranges and implicit pre-1.0 compatibility are not supported. Reject a mismatch before resolution unless a separately published migration explicitly converts it to the target exact version. A wording clarification or added allowed value is backward-compatible only when existing defaults and values retain their meaning. A default change, ID rename/removal, allowed-value removal, or moving responsibility to binding/guidance is breaking and requires a new pack version plus an explicit migration or rejection instruction.

# Non-goals

Do not add CSS, DOM, framework properties, routes, permissions, data values, displayed business language, conditional expressions, or local one-off differences to this contract.

# Relationships

Use with [search conditions](../components/search-conditions.md), [result grid](../components/result-grid.md), [pagination](../components/pagination.md), and the [searchable record list](../screen-patterns/record-list.md).
