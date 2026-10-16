# TEXT-BUTTON-001 image review evidence

Execution [#56](https://github.com/mk3008/torrone/issues/56), control [root #77](https://github.com/mk3008/root/issues/77). Date: 2026-10-16. [State/source matrix](../catalog/components/text-button/README.md).

## Responsibility and provenance

Six independent single-button images: primary and secondary, each normal/hover/keyboard-focus. Search/Clear are source sample labels, not a required pair or a search-screen specification. No form, calling screen, action ordering or submission/reset policy is included. The flat icon-only responsibility in ICON-BUTTON-001 remains separate and unchanged.

Working draft `review/references/access-review.html`, blob `0edb934a074285d36e3e2a89170ce8fc1ced08d6`, supplies primary Search and secondary Clear markup, `.primary-button`/`.secondary-button`, both `:hover` rules and shared `button:focus-visible`. Local/remote blob identity matched. No approved text-button curation exists. `review/examples.json` records the source workspace as a draft.

Every image is newly drawn, not a screenshot or browser-observed state. All six appearance combinations have source grounding; generic extraction is a new proposal with independent human adoption pending. Exact styling, wording and geometry remain illustrative. No unsupported disabled/pressed/loading/destructive/toggle or combined hover-plus-focus variant is added; this bounded set is not an exhaustive lifecycle.

Open Issue/PR inventory and local catalog showed no separate text-button candidate. Existing text controls in pagination/disclosure are composition examples, not duplicate text-button originals. Prior DISCLOSURE-001 acceptance does not approve this new set.

## Bounded verification

| Check | Result |
| --- | --- |
| Actual pixels | All six final PNGs visually inspected for legibility, enclosure/outline clipping and alignment; each contains one button only. |
| Integrity | Six distinct nonblank PNGs decode at 656×320. All SVGs parse and reproduce byte-identical PNGs with Sharp at 4× logical dimensions. |
| Geometry | Identical button rectangles and text anchors/baselines across states. Label fixed within each role. Hover changes fill only; focus keeps resting fill and adds a separate outline. |
| Appearance matrix | Primary: resting blue / darker hover / resting blue + focus outline. Secondary: white / light hover / white + focus outline. Source labels and CSS selectors match. |
| Links/descriptions | Six figures link independent full PNGs; gallery/index/stylesheet/navigation/fragments and README/evidence/source targets resolve; nonempty image alternative text. |
| Scope | New text-button entry, this evidence and additive index card only. Whitespace checks pass. No source, Shell, history, previous image, package/framework/generator changes. |

Temporary local raster/check helpers are not committed infrastructure. Published file blobs and full tree are compared with the locally verified set before handoff, with outcome in PR/root checkpoint. Historical source tests are not new image coverage.

## Application interaction applicability

No consuming application/shared interaction policy or executable Reference changed. The pictures do not execute hover, native focus or activation. Pointer/Enter/Space delivery, focus traversal/return, submit/reset, validation, cancellation and order across neighboring controls remain outside this evidence and require a consumer's [application interaction requirements](application-interaction.md).

Catalog links/descriptions were checked statically. A fresh executable-path check found no Chromium. Browser navigation, responsive gallery, native rendering, real devices, contrast compliance and assistive technology remain unverified. The pictured colors are not an accessibility-tested palette, and independent focus pictures do not prove focus can be delivered or retained in an implementation.

## Material GUI findings and disposition

| Finding | Outcome |
| --- | --- |
| Source Search/Clear could imply a fixed form or generic submit/reset contract. | Addressed: one button per image; wording is a sample, no screen/action grouping or operational policy. |
| Hover and keyboard focus could be conflated with selection or each other. | Addressed: separate states; focus retains resting fill with independent outline; no selected/toggle claim. |
| Icon-only approval could be incorrectly transferred to text buttons. | Addressed: separate ID and source, draft/proposal boundary explicit; earlier icon Reference untouched. |
| Missing states could invite invented disabled/pressed rules. | Not pursued: source has no such text-button treatment; omissions and bounded lifecycle explicit. |

Human appearance review pending. No merge/release/deployment or subsequent pattern production.
