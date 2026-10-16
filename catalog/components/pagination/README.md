# PAGINATION-001 — Previous/current/next appearances

[View four independent images](index.html).

- Category: Component / pagination control.
- Platform: Web-origin illustrations; native/browser rendering unverified.
- Status: **Human-accepted appearance examples; not merged or released.** [Visual acceptance](https://github.com/mk3008/torrone/pull/51#issuecomment-6206130758). Source Reference approval remains separate.
- Appearance: Previous and Next flank a current-page label; unavailable directions have a subdued button appearance.

| Image | Current label | Previous | Next | Provenance |
| --- | --- | --- | --- | --- |
| [First page](images/first-page.png) | Page 1 | Disabled appearance | Enabled appearance | Reconstructed from source markup/styles |
| [Middle page](images/middle-page.png) | Page 2 | Enabled appearance | Enabled appearance | New proposed combination |
| [Last page](images/last-page.png) | Page 3 | Enabled appearance | Disabled appearance | New proposed combination |
| [One page only](images/single-page.png) | Page 1 | Disabled appearance | Disabled appearance | New proposed combination |

Page numbers are examples. “Page 3” is the illustrated last page of a hypothetical three-page set; the control does not display or require that total. Only the two buttons and current-page label belong to this entry. The table, result count, search conditions, filter hint, page-size control and calling screen are outside it.

## Source and proposals

The working draft [Access review workspace](../../../review/references/access-review.html), Git blob `0edb934a074285d36e3e2a89170ce8fc1ced08d6`, supplies `.pagination-controls`, `.page-button`, `.page-status` and `.page-button:disabled`. Its markup shows Previous disabled, Page 1 and Next enabled. Its parent result-state logic shows/hides the pager, but **does not implement page navigation**. [Review inventory](../../../review/examples.json) identifies the workspace as a draft; there is no approved pagination curation entry.

All [SVG artwork](artwork/) and PNGs are new drawings, not screenshots or executed states. The first image reconstructs the source's visible combination. Middle, last and single-page combinations reuse that appearance as **new proposals**, not historical or approved source states. The source's approval cannot be inferred from these drawings.

## Limits

The catalog illustrates arrangement and visual availability differences, not page-boundary detection, total calculation, fetching, routing, filter reset, loading, error handling or empty-result policy. One page only is not a no-results example. Enabled/disabled glyphs in a picture do not establish native interaction or accessibility semantics.

Exact wording, colors, type, opacity, geometry and spacing are illustrative. Keyboard focus and hover/pressed button treatments are not pictured here; selection/current-page position is distinct from keyboard focus. No consuming-application navigation or focus policy is defined. Apply its [interaction requirements](../../../docs/application-interaction.md) when implementing a real pager. Browser operation, responsiveness, real devices and assistive technology remain unverified.
