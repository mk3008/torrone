---
type: product-owned frozen application input
title: Neutral operations workspace
status: frozen candidate
source: product-owned
---

# Application input contract

## Technology and execution

Use the repository's established browser-native static harness: local
`index.html`, `styles.css`, and `app.js`, opened directly in a modern browser.
Use `node --check app.js` for syntax validation. No framework, package, build
step, external asset, font, script, stylesheet, or network request is allowed.

## Product facts

| Area | Product-owned input |
| --- | --- |
| Application name | `Operations workspace` |
| Header facts | Display the application name and accessible controls for the next Drawer and palette action. |
| Navigation | Group `Workspace`; children `Overview`, `Activity`; then `Section 01` through `Section 29`, in that order. `Overview` is initially current. |
| Search | Label `Search navigation`; placeholder `Find an item`; filter supplied navigation immediately; show `No matching navigation items.` when empty. |
| Disclosure | `Workspace` starts expanded; collapse/re-expand does not change the current destination. |
| Main fixture | Heading `Neutral workspace content`; one sentence explaining it is a fixture; numbered items `1` through `80`. |
| Explicit parameters | Initial Drawer `open`; initial palette `light`; allowed Drawer states `open`/`hidden`; allowed palettes `light`/`dark`. |
| Destination behavior | Selecting a supplied item changes current-location treatment only; it does not navigate. |

## Required implementation surface

Implement only the Header, Drawer, Drawer control, navigation search and
disclosure, theme control, and the minimal main fixture above. Support both
light and dark palettes for the whole supplied shell.

## Non-goals and product constraints

Do not add real routes, persistence, backend data, accounts, result screens,
record creation, framework adapters, or another Pattern. The supplied labels,
ordering, states, and fixture content are product facts. Layout, dimensions,
visual hierarchy, Drawer responsibility, semantic relationships, and the
meaning of Reference parameters remain owned by the Reference and are not
restated here.
