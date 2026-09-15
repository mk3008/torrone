---
type: PoC application input contract
title: Neutral operations workspace common shell
status: frozen
source: authored
---

# Application input contract

## Product facts and state model

Implement a neutral browser-based **Operations workspace** shell. The content
is an explicit test fixture, not a real product screen.

| Area | Supplied fact |
| --- | --- |
| Workspace identity | Display `Operations workspace` in the application Header. |
| Header actions | Provide one accessible control for the next Drawer action and one accessible control for the next palette action. The initial state is Drawer visible and Light palette. |
| Navigation | Provide group `Workspace` with children `Overview` and `Activity`, plus `Section 01` through `Section 29`. `Overview` is initially current. |
| Search | Provide one labelled navigation search control with placeholder `Find an item`. It filters the supplied navigation immediately, has no submit or clear action, and exposes `No matching navigation items.` when nothing matches. |
| Disclosure | The `Workspace` group is initially expanded. Collapsing and expanding it must not change the stored current destination. |
| Workspace | Display heading `Neutral workspace content`, the provided one-sentence fixture explanation, and numbered fixture items `1` through `80` so that vertical overflow is observable. |
| Drawer state | `open` and `hidden` are allowed states. The Header action changes them. When hidden, the workspace has no reserved Drawer track. |
| Palette state | `light` and `dark` are allowed states. The Header action changes the active palette for the whole shell. |
| Destination behavior | Selecting a navigation item changes only the visible current-location treatment. It does not navigate. |

## Implementation constraints

Use local `index.html`, `styles.css`, and `app.js` files. Inline SVG or simple
text symbols may represent controls. Do not use an external asset, font, script,
stylesheet, package, or a network request. URL state, in-memory state, or
another native browser mechanism may hold the supplied Drawer and palette state.

The Reference and Manifest own the reusable relationships. This contract owns
only the fixture labels, available states, fixtures, and exclusions above.

## Non-goals

- Real navigation, routes, backend data, persistence, or user accounts.
- Any screen pattern beyond the neutral common shell.
- Responsive-policy evaluation beyond avoiding a broken narrow view.
- A requirement to reuse Reference DOM, CSS, JavaScript, dimensions, or icon
  paths.
