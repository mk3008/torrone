---
type: PoC stable-key classification
title: Mixed semantic and stable-key result for all 27 observation points
status: observed; not frozen
source: mixed Variant, ambiguity probe, and transferability regression
---

# Outcome

Six observation points transferred safely to generated semantic identities.
Eighteen retain their existing explicit identity. Three retain explicit identity
but use business-neutral names in the Variant. This is a bounded classification,
not a stable-key or semantic-key Profile.

# Final classification

| Original key | Final class | Variant identity | Evidence and reason |
| --- | --- | --- | --- |
| `app-header` | Semantic | `semantic:role:banner` | One document-level banner survives different copy/classes; a `header` nested in Target `main` is correctly not a banner. |
| `navigation-toggle` | Explicit | unchanged | Scenario target among several header buttons; controller identity also anchors the navigation relationship. |
| `theme-toggle` | Explicit | unchanged | Two native pressed buttons make `role=button` plus `aria-pressed` ambiguous in the probe. |
| `user-menu-toggle` | Explicit | unchanged | Scenario/focus target among several buttons; anchors its controlled menu. |
| `user-menu-popover` | Semantic | `semantic:controlled-by:user-menu-toggle` | Stable controller relationship survives different menu role copy, grouping, class, and local ID. |
| `sign-out-action` | Explicit | unchanged | A normal menu can contain multiple menuitems; the probe rejected positional selection. |
| `primary-navigation` | Semantic | `semantic:controlled-by:navigation-toggle` | Two navigation landmarks are normal, but the shell controller relationship is unambiguous. |
| `navigation-filter` | Explicit | unchanged | Scenario target among multiple textboxes; label text differs across products. |
| `navigation-parent` | Explicit | unchanged | Scenario target among potentially multiple expanded controls; anchors one child region. |
| `navigation-children` | Semantic | `semantic:controlled-by:navigation-parent` | Controlled-region identity survives `ul` grouping, class, local ID, and child copy changes. |
| `navigation-access-review` | Explicit, rename | `navigation-child-action` | Link text and fixture href change; scenario needs one specific child action. Original business noun is unnecessary. |
| `navigation-audit-exports` | Explicit, rename | `navigation-leaf-action` | Several leaf links share role; scenario needs one specific alternative selection. Original business noun is unnecessary. |
| `navigation-empty` | Explicit | unchanged | Unroled conditional message with product-specific copy. |
| `workspace` | Semantic | `semantic:role:main` | One main landmark survives content, wrapper, class, and copy changes. |
| `filter-toggle` | Explicit | unchanged | Scenario target among multiple expanded buttons; anchors the filter form. |
| `filter-panel` | Semantic | `semantic:controlled-by:filter-toggle` | The controlled form survives different DOM grouping, class, form ID, and labels. |
| `requester-filter` | Explicit, rename | `free-text-filter` | Scenario needs one textbox among navigation and search inputs. Product-specific requester/reporter noun is unnecessary. |
| `filter-actions` | Explicit | unchanged | Unroled layout group whose style is observed. Adding a role only for matching would be artificial. |
| `search-action` | Explicit | unchanged | Scenario target among several buttons; action copy is not a cross-product identity. |
| `clear-action` | Explicit | unchanged | Scenario target among several buttons; action copy is not a cross-product identity. |
| `new-request-action` | Explicit | unchanged | Product-specific primary action with no executed destination; role alone is ambiguous. |
| `result-summary` | Explicit | unchanged | Two polite live regions made this descriptor ambiguous in the probe. |
| `result-initial` | Explicit | unchanged | Unroled conditional state with intentionally different copy. |
| `result-empty` | Explicit | unchanged | Unroled conditional state with intentionally different copy. |
| `result-table` | Explicit | unchanged | Multiple result/summary tables are plausible; two tables failed closed in the probe. |
| `status-badge` | Explicit | unchanged | Unroled representative style point with fixture-specific text. |
| `result-pagination` | Explicit | unchanged | The page already has another navigation landmark, and accessible labels differ by product. |

# Counts

- Semantic identities: `6`
- Explicit identities retained unchanged: `18`
- Explicit identities retained with business-neutral Variant names: `3`
- Total observation points: `27`

# Semantic boundary discovered

The useful rule was narrower than “a role is currently unique.” A candidate is
acceptable here when either:

1. document semantics make it structurally singular (`banner`, `main`); or
2. an already necessary explicit scenario controller points to exactly one
   target through `aria-controls`.

Role-only candidates for pressed buttons, expanded buttons, menuitems, tables,
navigation landmarks, and live regions failed as soon as a second normal
instance was present. Display text, fixture values, class names, DOM indexes,
and local ID spelling were never used as generated identity.

# Naming debt result

The Variant removes all three Reference-business key names. The replacement
names describe interaction position/purpose rather than the access-review or
shipment domain. They remain experimental because renaming the accepted input
would also migrate scenarios, Targets, and stored evidence.

