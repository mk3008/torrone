# DIALOG-001 revision evidence

Execution [#48](https://github.com/mk3008/torrone/issues/48), [Draft PR #49](https://github.com/mk3008/torrone/pull/49), control [root #77](https://github.com/mk3008/root/issues/77). Date: 2026-10-16.

## Review decision and resulting scope

The owner's [scope correction](https://github.com/mk3008/torrone/pull/49#issuecomment-6205636219) found that the previous CHOOSER-001 set mixed the dialog, calling screen and a particular search/selection specification. The owner authorized correcting the candidate to the dialog frame and its regions.

Current candidate: **DIALOG-001 — Dialog frame and regions**, two independent PNGs and SVGs under `catalog/dialogs/framed/`. They show bounded desktop and narrow fullscreen-shaped compositions: header with title/Close, a body with an overflow boundary, and a separate lower action region. A neutral edit form supplies replaceable sample content. Cancel/Save are example actions, not a universal pair.

The former eight-image candidate is unaccepted and removed from the current gallery/tree. Its images and notes remain recoverable at commit `2a739d2ef13d71fdabd86080735722e3380e4155`; [prior evidence](chooser-001-image-review.md) is explicitly marked superseded, with its former asset link pinned to that commit. Its verification observations are not reused as new-image passes. The approved specific chooser source is unchanged.

## Provenance

Source curation `references/entity-lookup.md`, blob `8c9ad171d3585364577ff808c616c3d8f01347ae`; executable `review/references/entity-lookup.html`, blob `b28487af5c464d119099fd7cf12a1432a2dae512`. Both match the approved identity. The source's `.dialog-heading`, `.dialog-body`, `.dialog-actions`, bounded desktop dialog, narrow fullscreen allocation and internal scrolling inform the region relationship. The source approval remains scoped to that specific chooser.

**The generic frame extraction and new sample form are new proposals.** The owner's agreement to make the correction does not approve the resulting images. No generic dialog interaction contract or new approved Reference is created.

## Bounded verification

| Check | Result |
| --- | --- |
| Actual images | Both final PNGs visually inspected: legible title, Close, example fields and actions; overflow clips inside the body and does not cover the footer. |
| Image/artwork integrity | Two unique nonblank PNGs decode. Desktop 1424×1104, narrow 780×1280. Both SVGs parse and rasterize byte-identically at 2× logical size with Sharp. |
| Region structure | Both artworks contain one header, one clipped body, one footer and a body-only scrollbar cue. Clip bounds sit between header and footer; sample Notes extends below the body to make the cue coherent. |
| Responsibility boundary | No opening trigger, parent value, location ID, search conditions, result rows, radios or selection-reset state in the current entry/artwork. Fields/actions are explicitly replaceable samples. |
| Links and descriptions | Gallery image targets, stylesheet, navigation, local fragments, README and evidence links resolve. Both figures link to their independent full PNG; all images have nonempty alternative text. |
| Scope audit | Changes confined to this PR's old candidate removal, new frame entry, catalog index replacement and evidence. Main's Shell, References, historical sources and other PR branches unchanged; `git diff --check` passes. |

Temporary local raster/validation helpers are not repository infrastructure. Published blobs and full tree are compared against the locally verified files at handoff, with the result recorded in the PR/Issue checkpoint.

## Application interaction applicability and limits

No consuming application's shared policy, production GUI or executable Reference is changed. This is a static image proposal, not a new dialog implementation. The catalog links are checked statically. Native focus, trapping/return, Escape/Close, cancellation, saving, validation, background modality, actual body scrolling and cross-control paths are unverified and must be supplied/tested by a consuming application under [application interaction requirements](application-interaction.md). No policy is inferred from the sample actions.

A fresh check found no Chromium executable. No browser, responsive-gallery, physical-device, software-keyboard, safe-area or assistive-technology pass is claimed. The narrow image illustrates a layout option only; there is no demonstrated viewport-fitting implementation or universal fullscreen requirement. Exact styling, field arrangement, dimensions and breakpoint are illustrative.

## Material GUI findings and disposition

| Owner finding | Outcome |
| --- | --- |
| Launch button and committed parent output are outside the dialog. | Addressed: removed both parent images and all parent semantics from the current entry. Old assets remain in pinned history. |
| Detailed search/selection conditions describe a particular screen. | Addressed: removed the chooser's result/selection state series. New body is replaceable sample content with no search contract. |
| Reusable responsibility was unclear. | Addressed: DIALOG-001 explicitly owns frame/region composition, is classified under Dialog frames, and distinguishes inherited layout inspiration from proposed generalization. |
| Sample contents/actions should not become universal dialog rules. | Addressed: README and gallery explicitly describe them as examples; no extra empty/loading/disabled states are invented. |

The existing approved chooser is retained as a specific composition example. No source semantics are generalized through approval status. Human visual review of the two replacement images remains pending. No merge/release/deployment or subsequent pattern production.
