# DIALOG-001 — Dialog frame and regions

[View the two independent images](index.html).

- Category: Dialog frame / region composition.
- Platform: Web-origin layout examples.
- Status: **New image-catalog proposal; human visual adoption pending.**
- Reuse: a title and Close area above a bounded body, with a separate lower action area. Content overflow belongs to the body so the title and actions can remain visible.

| Image | Composition |
| --- | --- |
| [Desktop frame](images/desktop-frame.png) | Bounded dialog with a header, body scroll cue and lower actions. |
| [Narrow fullscreen](images/narrow-fullscreen.png) | The same region relationship fills a narrow canvas; the lower actions share the available width. |

The Name, Description and Notes fields are replaceable sample content. “Edit details”, “Cancel” and “Save” are example labels and actions, not required titles, fields or buttons for every dialog. The input controls are not being defined by this entry. The scrollbar is an illustrative overflow cue, not an operating control. The clipped body content demonstrates the region boundary.

## Scope and provenance

The [Entity Chooser curation](../../../references/entity-lookup.md) identifies an approved, specific chooser [executable](../../../review/references/entity-lookup.html), Git blob `b28487af5c464d119099fd7cf12a1432a2dae512`. Its header/body/actions separation and desktop/narrow allocation inform this proposal. The [source layout rationale](../../../docs/entity-lookup-review.md) remains scoped to that chooser.

These newly drawn [SVGs](artwork/) and PNGs adapt only the region relationships to neutral example content, following the owner's [scope correction](https://github.com/mk3008/torrone/pull/49#issuecomment-6205636219). **This generalization and the new sample body are proposals, not an approved generic dialog Reference or exact source exports.** The original chooser, its approval and its search/selection behavior remain unchanged.

The opening trigger, calling screen and returned parent value are outside this entry. Search rules, conditions, result rows, pending-choice resets and no-results states belong to particular screens; they are not dialog-frame states. A specific chooser can use the frame, but the frame does not define the chooser.

## Limits

Preserve the illustrated region hierarchy when choosing this pattern. Exact colors, type, dimensions, spacing, breakpoint, field arrangement and action wording are illustrative. Fullscreen on narrow screens is a layout option pictured here, not a universal rule for all dialogs or platforms.

These static images define no filtering, saving, validation, selection, disabled conditions, dismissal semantics, focus trapping/return, keyboard, background modality or consuming-application policy. Actual scrolling, responsive gallery behavior, software keyboards, safe areas, real-device and assistive-technology behavior remain unverified. Apply the consuming application's [interaction requirements](../../../docs/application-interaction.md) for an executable implementation.
