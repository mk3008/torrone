---
type: reference contract candidate
status: proposed; not canonical
---

# Reference common-shell contract vNext candidate

## Scope and authority

This contract applies to a shared application shell: Header, Drawer,
navigation, and workspace. Product facts remain product-owned. Exact visual
facts are owned by the approved Reference visual-binding sources. An
implementation may choose its own technology and code structure only while
preserving the declared output.

## Exact visual bindings

The following are exact. Their authority is the named canonical source, not
this prose.

| Binding responsibility | Canonical source |
| --- | --- |
| Theme values and theme switching | `attempt-3/reference-owned/visual-bindings/visual-tokens.css` |
| Fixed icon assets | `attempt-3/reference-owned/visual-bindings/icons/` |
| Icon IDs, state mapping, locations, and basic sizes | `attempt-3/reference-owned/visual-bindings/binding-map.json` |
| Header, Drawer, selection, and active-indicator treatment | `attempt-3/reference-owned/visual-bindings/visual-tokens.css` and `binding-map.json` |

Consumers reuse those assets and preserve the bindings they define. An exact
binding cannot be substituted merely because another result has similar
meaning or appearance.

## Structural invariants

- Header, Drawer, and Main content have distinct responsibilities and retain
  the Reference's shell relationship.
- Drawer visibility can change without removing the workspace.
- Parent navigation exposes and hides its children through a discernible
  state transition.
- Drawer navigation and workspace content preserve their intended scroll
  regions.
- Theme, Drawer visibility, parent expansion, and selected navigation state
  have observable, coherent transitions.

## Adaptation freedoms

Implementations remain free to select DOM structure, component boundaries,
state-management approach, CSS authoring style, file layout, and framework.
Those choices do not authorize a change to an exact visual binding or a
structural invariant.

## Intent and reasonable deviation

The Reference makes a shared operational shell predictable across products.
A deviation requires a product, accessibility, or platform reason and must
identify the affected contract layer. A change to an exact asset or token is
not a local implementation deviation; it requires a new approved authority.

## Natural-language reduction

This candidate deliberately does not repeat token values, SVG paths, or
dimensions. It names the source-of-truth files and retains prose only for
scope, responsibility, adaptation boundary, and exception handling. It also
does not use design-family language for exact items.
