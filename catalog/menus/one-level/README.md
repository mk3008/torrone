# MENU-001 — Navigation item appearances

[View the image gallery](index.html).

- Category: Menu items inside a left navigation drawer, separate from the Shell.
- Platform: Web-origin illustration. No native-platform or real-device validation.
- Status: **Human-accepted appearance examples; not merged or released.** [Visual acceptance](https://github.com/mk3008/torrone/pull/39#issuecomment-6188915992). Source Reference approval remains separate.
- Appearance: selected rows have emphasis and a leading accent; child labels are indented; parent rows have rightward or downward arrows.

These images describe approximate appearance only. Theme/colors, typography, spacing, dimensions, exact placement and fixture labels are illustrative. They do not prescribe routing, permissions, click semantics, keyboard behavior, persistence, transitions or any conditions for entering a state. A disabled picture is an appearance proposal, not a rule that such an item must exist.

Each target state has an independent PNG. Child pictures include one parent row solely to make relative indentation visible. The gallery layout and its captions are not UI design requirements. [SHELL-001](../../shells/workspace/index.html) retains the whole-drawer view.

## State index

| State image | Appearance | Provenance |
| --- | --- | --- |
| [leaf-unselected](images/leaf-unselected.png) | Plain row without selection emphasis. | Source-supported reconstruction |
| [leaf-selected](images/leaf-selected.png) | Row emphasis and a leading accent. | Source-supported reconstruction |
| [child-unselected](images/child-unselected.png) | Child indented relative to the parent above. | Source-supported reconstruction |
| [child-selected](images/child-selected.png) | Indented child with row emphasis and a leading accent. | Source-supported reconstruction |
| [parent-closed](images/parent-closed.png) | Parent with right-pointing arrow. | Source-supported reconstruction |
| [parent-open](images/parent-open.png) | Parent with downward-pointing arrow. | Source-supported reconstruction |
| [leaf-disabled](images/leaf-disabled.png) | Subdued item. | **New proposal; no historical Menu evidence** |
| [child-disabled](images/child-disabled.png) | Subdued child; ordinary parent provides alignment context. | **New proposal; no historical Menu evidence** |
| [parent-disabled](images/parent-disabled.png) | Subdued parent and right-pointing arrow. | **New proposal; no historical Menu evidence** |

The three disabled proposals apply the same subdued appearance to the three represented item roles. Only a closed parent is illustrated as disabled; open-disabled and selected-disabled combinations are not defined. These proposals may be accepted or rejected independently of the six source-supported states.

## Sources

Source-supported means that the visual relationship is present in historical research; it does **not** mean these new pictures are original captures, verified runtime behavior or accepted designs.

- [PoC 017 HTML](../../../docs/poc/experiments/017-reference-html-ssot/reference/index.html), Git blob `836b66eb540156583804bf56780969a1f3ed5e23`: `.nav-link`, `.nav-link[aria-current="page"]`, `.nav-children .nav-link`, `.nav-parent` and its arrow orientation for `aria-expanded`. The parent is not given a selected-destination accent.
- [Initial capture](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/00-initial.png), blob `6a856e9d4c90f3b5f9479fa7739b69004e49c3c1`: open parent, indented selected and unselected children, unselected leaf.
- [Closed-parent capture](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/navigation-parent-round-trip-01.png), blob `a82d951bd79b245001e5e440ca702a91e359fa21`: right-pointing arrow. Its hover fill is not adopted as a closed-state requirement.
- [Selected-leaf capture](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/navigation-selection-round-trip-01.png), blob `5d06f995d0f758a88a5fe5beb8001ad6ab0a520d`: selected top-level row emphasis.
- [Historical PR #36](https://github.com/mk3008/torrone/pull/36), head `898c42b7ab3275b7e6c1ca95a1d2b0a861ea49c9`: source inventory only. Its full screenshots are not these independent assets and its adoption is not inferred.

The historical Menu contains no dedicated disabled treatment. Disabled styles on unrelated controls are not Menu evidence. The subdued disabled illustrations above are newly proposed here.

## Artwork and limits

[Static SVG artwork](artwork/) reconstructs only the relevant item shapes and hierarchy, with neutral fixture labels. The PNGs are rasterizations of those drawings, not crops or browser captures. Fonts and incidental geometry differ from the historical screenshots. SVG source is supplied for editing these pictures; it is not a component API or prescribed implementation.

The item illustrations do not model interactions. [Curated References](../../../references/README.md) keep their separate executable contracts and approval evidence. Missing Menu interaction requirements must be decided in the consuming application; these pictures do not fill that gap.
