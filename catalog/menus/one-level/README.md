# MENU-001 — One-level expandable navigation with selected-row accent

- Category: Navigation menus (independent of Application Shell drawer visibility)
- Platform: Web desktop
- Status: historical PoC 017 research example; NOT a newly approved Reference
- Distinction: a disclosure-only parent with one level of children; only selected destinations take row fill and left accent

| Gallery file | Original research screenshot | Git blob |
| --- | --- | --- |
| [expanded-child.png](images/expanded-child.png) | [00-initial.png](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/00-initial.png) | `6a856e9d4c90f3b5f9479fa7739b69004e49c3c1` |
| [collapsed.png](images/collapsed.png) | [navigation-parent-round-trip-01.png](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/navigation-parent-round-trip-01.png) | `a82d951bd79b245001e5e440ca702a91e359fa21` |
| [reexpanded.png](images/reexpanded.png) | [navigation-parent-round-trip-02.png](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/navigation-parent-round-trip-02.png) | `53398a9d180b4612fb432244e67b0956dffecd5e` |
| [top-level-selected.png](images/top-level-selected.png) | [navigation-selection-round-trip-01.png](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/navigation-selection-round-trip-01.png) | `5d06f995d0f758a88a5fe5beb8001ad6ab0a520d` |
| [search-child.png](images/search-child.png) | [navigation-filter-round-trip-01.png](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/navigation-filter-round-trip-01.png) | `b8a6465eabf0ca0da6322bd7db92e8a29db455c7` |

All images are unchanged copies of 1440 × 900 source captures. The HTML clips the menu visually through CSS, not by changing underlying bytes. Open the full image for context.

A parent's hover/focus treatment does not mean it is the selected destination. The examples do not establish deeper nesting, universal color tokens, actual routes, mobile or native operation. See [SHELL-001](../../shells/workspace/index.html) for the distinct whole-drawer show/hide pattern.
