# SHELL-001 — Header-controlled, fully hideable left drawer

- Catalog ID: SHELL-001 (stable across display-name and layout changes)
- Category: Application Shell
- Source platform: Web; desktop and one narrow viewport screenshot
- Status: Research-selected example; catalog display is a draft and is **not** a newly approved Reference
- Pattern summary: The header button toggles the left navigation drawer. When closed, the drawer disappears completely (including icons and navigation), and the main workspace expands into the available space. This is **not** the compact/icon-rail variant.
- Responsibility: Header, left navigation drawer, main workspace, and the effect of drawer visibility
- Excluded: business content, routes, user permissions, real-device validation, platform-specific implementation

Each state has its own image in the images directory. Captures are exact Git-blob copies from the [owner-selected source](../../../docs/poc/experiments/012-common-shell-variability/attempt-23/selected-common-shell.md):
- drawer-open-light.png ← shell-open-light.png
- drawer-hidden-light.png ← shell-hidden-light.png
- drawer-open-dark.png ← shell-open-dark.png
- drawer-hidden-dark.png ← shell-hidden-dark.png
- drawer-open-light-narrow.png ← shell-open-light-narrow.png

The source's placeholder navigation and numbered workspace content are demonstration fixtures. The screenshots do not require their exact colors, dimensions or DOM. Use the [bounded PoC contract](../../../docs/poc/experiments/015-reference-first-common-shell/reference-contract.md) only as supporting research, not proof of product acceptance. The original historical files are not changed.
