# TEXT-BUTTON-001 — Primary and secondary text-button appearances

[View six independent images](index.html).

- Category: Component / text-labeled command button.
- Platform: Web-origin illustrations; native/browser rendering unverified.
- Status: **Human-accepted appearance examples; not merged or released.** [Visual acceptance](https://github.com/mk3008/torrone/pull/57#issuecomment-6206867682). Source Reference approval remains separate.
- Appearance: filled primary and bordered secondary examples, each at rest, with hover treatment and with a separate keyboard-focus outline.

| Image | Sample label | Appearance |
| --- | --- | --- |
| [Primary normal](images/primary-normal.png) | Search | Filled button at rest. |
| [Primary hover](images/primary-hover.png) | Search | Fill changes; label and geometry remain fixed. |
| [Primary focus](images/primary-focus.png) | Search | Resting fill with a separate focus outline. |
| [Secondary normal](images/secondary-normal.png) | Clear | Bordered button at rest. |
| [Secondary hover](images/secondary-hover.png) | Clear | Light fill changes; label and geometry remain fixed. |
| [Secondary focus](images/secondary-focus.png) | Clear | Resting fill with a separate focus outline. |

One button appears in each image. Search/Clear are source sample commands, not required labels or paired actions. The two roles are visual examples, not a form layout, required button order or product-wide hierarchy. Focus is independent of hover; neither is a selected/toggled value.

## Source and proposal boundary

The working draft [Access review workspace](../../../review/references/access-review.html), Git blob `0edb934a074285d36e3e2a89170ce8fc1ced08d6`, has primary Search and secondary Clear markup. `.primary-button`, `.secondary-button`, their `:hover` rules and shared `button:focus-visible` ground all six pictured appearances. [Review inventory](../../../review/examples.json) identifies it as a draft; no approved text-button curation exists.

All [SVG artwork](artwork/) and PNGs are new drawings, not browser captures or executed hover/focus evidence. Each appearance is source-supported; **generic extraction as a text-button entry is a new proposal**, accepted for visual use in the linked human decision. Existing [flat icon-only button approval](../../../references/icon-button.md) does not approve these text-button examples.

## Limits

Exact theme/color, type, outline shape, dimensions, padding and wording are illustrative. Pressed, disabled, loading, destructive, toggle and combined hover-plus-focus appearances are not pictured; no unsupported source state is invented. This is a bounded six-image set, not an exhaustive button lifecycle.

Search/Clear do not prescribe submit/reset/activation, validation, cancellation, focus return or action grouping for a consuming application. Those belong to its [interaction requirements](../../../docs/application-interaction.md). No executable Reference or application/shared policy is changed. Native pointer/keyboard interaction, focus delivery, browser rendering, responsive layout, contrast, real devices and assistive technology remain unverified.
