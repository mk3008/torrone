---
type: PoC reference contract candidate
title: Reference-first common shell contract with exact visual bindings
status: candidate for Attempt 3 human review
source: approved Reference `9cd1932` plus Attempt 2 evidence
---

# Reference-first common shell: Attempt 3 contract

## Scope

This contract covers the common shell only: Header, Drawer, visibility control,
navigation search and disclosure, current location, palette state, and neutral
workspace overflow. It does not define a Page Pattern, routes, persistence,
responsive policy, component API, framework, or product information beyond the
separately supplied product contract.

## Layer 1: exact visual bindings

The [visual binding assets](visual-bindings/) are the canonical source for the
following Reference-specific presentation. A consuming implementation reuses
these assets unchanged or preserves their normalized equivalent exactly; it
does not select a similar library icon or translate the palette.

- Light and Dark token values for the Header, Drawer, workspace, controls,
  selected row, active indicator, and focus treatment.
- Drawer open/hidden, theme-next-mode, disclosure-expanded/collapsed, and
  search icon assets.
- State-to-icon pairing and named placement for Header controls, parent
  disclosure, search adornment, selected-row surface, and active indicator.

The binding map, not this prose, is authoritative for token names, values,
asset paths, state mapping, and locations. The visual-token root attribute is
an asset integration hook; it does not prescribe the Reference's DOM tree.

## Layer 2: structural invariants

- Keep one application Header available while workspace content scrolls.
- Provide a labelled Header control that changes Drawer visibility and names
  the next available action.
- When hidden, remove the Drawer and its reserved track while retaining Header
  and workspace.
- Keep Drawer navigation and workspace vertical scrolling independently usable
  when both overflow.
- Represent the supplied current location as one full Drawer row with a
  non-colour cue and unchanged hierarchy alignment.
- Keep supplied controls keyboard-focusable with visible focus treatment.
- Keep parent disclosure separate from Drawer visibility and retain the current
  destination across parent collapse/re-expansion.

## Layer 3: intent and adaptation guidance

The intent is a durable, recognizable application shell whose navigation state
is easy to inspect and whose visible state does not depend on a framework.
Apply the exact visual binding layer only when this approved common-shell
Reference is selected. A product may record a reasoned deviation when a
product requirement, accessibility requirement, or platform constraint makes
one of these bindings unsuitable; that deviation is a new input and is not a
silent implementation choice.

DOM shape, component boundaries, state-management mechanism, CSS organization,
file layout, routing, data loading, responsive behavior, animation, local
focus-management details, and test tooling remain implementation freedom. A
product continues to own workspace identity, navigation labels and hierarchy,
available controls, permissions, and fixture data.
