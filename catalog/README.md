# Torrone visual catalog

Choose a UI pattern by its responsibility, then compare its independent state images. Each entry supplies a stable ID, a recognizable name, a short explanation, source platform, provenance, visual-acceptance record and limits. Humans and AI use the same images and descriptions as design inputs.

## Available examples

Open an entry below to read its state list and view the PNGs directly on GitHub. These eleven entries contain 52 images. Their appearance examples have recorded human acceptance; executable behavior has its own review scope.

| Entry | Responsibility | Images |
| --- | --- | --- |
| [SHELL-001 — Fully hideable left drawer](shells/workspace/README.md) | Header, drawer and workspace relationships. | 5 |
| [MENU-001 — Navigation items](menus/one-level/README.md) | Selection emphasis, child indentation and parent arrow direction. | 9 |
| [POPOVER-001 — Anchored panel](components/anchored-popover/README.md) | Trigger alone or with a panel below it. | 2 |
| [ICON-BUTTON-001 — Flat icon commands](components/flat-icon-button/README.md) | Normal, hover, pressed, focus and disabled appearances. | 5 |
| [DATE-RANGE-001 — Optional date boundaries](components/date-range/README.md) | Start/End values, local calendars and an invalid-value appearance. | 8 |
| [INLINE-LOOKUP-001 — Searchable entity field](components/inline-entity-lookup/README.md) | Input, candidate list, emphasis and committed value. | 7 |
| [DIALOG-001 — Dialog frame and regions](dialogs/framed/README.md) | Header, replaceable body and action area; desktop and narrow fullscreen examples. | 2 |
| [PAGINATION-001 — Previous/current/next](components/pagination/README.md) | First, middle, last and single-page availability. | 4 |
| [BADGE-001 — Text badges](components/text-badge/README.md) | Two example labels in rounded enclosures. | 2 |
| [DISCLOSURE-001 — Collapsible section](components/disclosure/README.md) | Persistent heading/action with the body hidden or visible. | 2 |
| [TEXT-BUTTON-001 — Text commands](components/text-button/README.md) | Primary/secondary examples in normal, hover and keyboard-focus appearances. | 6 |

For the HTML galleries, download and extract the repository ZIP or use a local checkout, then open `catalog/index.html` in a browser. The gallery needs no build or package installation. Its layout and captions organize the pictures; they are not the design being transferred. On GitHub, an HTML link opens its source view; use the entry READMEs above for direct browsing.

## What the images communicate

- **Subject and responsibility:** the part or pattern being shown. A Shell's menu content does not define a Menu pattern. A dialog frame does not define its sample fields, search rules or launching screen.
- **Named visual states:** each pictured state has its own image and short caption. Selection emphasis, focus, disabled appearance and expansion belong to distinct states where represented. A state name does not define how the application enters that state.
- **Coarse visual relationships:** recognizable shapes, grouping, region hierarchy and relative arrangement, such as a child's indentation below its parent. Exact geometry is illustrative.
- **Provenance and acceptance:** source-supported reconstruction, adaptation or new proposal, with links to supporting material and the human decision. A stable ID such as `MENU-001` identifies a pattern independently of its display name, directory or gallery order; the ID itself is not an approval status.

A part image stays focused on that part. Some relationships need minimal context: child-menu images include a parent row to show indentation. The Shell uses the complete region to show how header, drawer and workspace relate. Incidental business content in either example remains replaceable.

## Apply a pattern

For a selected navigation child, open [MENU-001](menus/one-level/README.md), compare [unselected](menus/one-level/images/child-unselected.png) and [selected](menus/one-level/images/child-selected.png), and read the provenance for those rows. If that relationship fits your screen, reference the ID and images in the design brief. Decide the actual destinations, available items and navigation behavior in the consuming product.

Use the same process for another entry: check the responsibility and platform, select the needed pictured states, read the limits, then specify the relationships your product adopts. Keep an unpictured state or missing interaction requirement explicit instead of inferring it from nearby examples.

The following remain with the consuming product and its design sources:

| Decision | Image-catalog boundary |
| --- | --- |
| Theme/colors | Palettes, tokens and actual color values are illustrative here. |
| Typography and geometry | Font family/size, text metrics, spacing, padding, margins, dimensions, density and exact placement are not fixed. |
| Behavior and business rules | Events, state transitions, validation, authorization, persistence and navigation rules are not executed or specified by these pictures. |
| Platform and quality | Native-control choice, keyboard operation, focus policy, accessibility, responsive behavior and test acceptance criteria require their own requirements and verification. |
| Implementation | SVG artwork supports editing the pictures; HTML/CSS/DOM/framework structure is not a required component API. |

## When you need an interaction model

[Curated References](../references/README.md) retain executable examples, bounded preserved behavior and separate human-approval evidence. Check that responsibility and the consuming application's [interaction requirements](../docs/application-interaction.md) before implementing behavior. An accepted image does not approve a generic executable Reference, and approval of a source Reference does not automatically approve an extracted image.

Source-supported pictures may be newly drawn rather than source screenshots. New proposals remain identified as proposals by origin even after visual acceptance. Historical experiments stay historical evidence. Read each entry's source and limits rather than treating a merged PR or a passing check as design approval.

The list above covers the examples registered in this repository. It is not an exhaustive UI library. The previously reviewed Watch Switch images are not included because their original files have not yet been recovered for registration.
