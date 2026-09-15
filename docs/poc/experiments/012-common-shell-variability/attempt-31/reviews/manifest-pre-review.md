# Manifest pre-review — Attempt 31

Status: done

## Finding route

Attempt 30 preserved two generated-output failures as evidence. A selected
Drawer child did not consistently paint its full row from the physical left
edge, and a parent disclosure could also update the current destination. These
are cross-screen navigation treatments, not product facts or a fixture choice.
They therefore return to the Drawer Manifest rather than to the fixed prompt
or an individual generated Run.

## Proposed change

Clarify two observable outcomes in `components/drawer.md`:

- the selection surface and leading indicator occupy the complete row while
  hierarchy indentation remains inside the row; and
- parent disclosure changes only that parent's expansion state, separately from
  activating a destination.

## Boundary review

The proposal adds no configuration, numeric value, library, asset source, CSS
selector, DOM shape, route, permission, or product-owned item. It uses ordinary
layout and interaction language and is observable in a rendered Drawer.

