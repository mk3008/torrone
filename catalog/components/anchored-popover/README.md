# POPOVER-001 — Panel anchored below a trigger

[View the two state images](index.html).

- Category: Component / anchored popover.
- Platform: Web-origin illustration; native and real-device behavior unverified.
- Status: **Human-accepted appearance examples.** [Visual acceptance](https://github.com/mk3008/torrone/pull/41#issuecomment-6190373994). Source Reference approval remains separate.
- Appearance: a bounded panel below a small trigger, with their trailing edges aligned; contextual content above a separated action row.

| Image | Short caption | Evidence level |
| --- | --- | --- |
| [popover-closed.png](images/popover-closed.png) | Trigger only; no visible panel. | Observed state, newly generalized artwork |
| [popover-open.png](images/popover-open.png) | Panel below its trigger; contextual content separated from an action row. | Observed relationship, newly generalized artwork |

The two images are appearance specimens, not a transition sequence or executable interaction. Their neutral canvas is only a backdrop, not an application Shell. The trigger is retained in the open image because the panel alone cannot communicate anchoring.

## What may vary

Colors/Theme, typography, spacing, dimensions, exact placement and fixture labels are illustrative. Neither the ellipsis glyph nor the number or wording of contextual/action rows is a required product choice. The pictures do not define authentication, permissions, click/close semantics, focus return, keyboard behavior, persistence, collision handling, responsiveness or conditions for displaying either state. Hover, focus, disabled and other unpictured variants are not specified.

## Sources and new choices

- [PoC 017 HTML](../../../docs/poc/experiments/017-reference-html-ssot/reference/index.html), blob `836b66eb540156583804bf56780969a1f3ed5e23`: `.user-menu`, `.user-menu-popover`, its `[hidden]` rule, identity divider and action row.
- [Open source capture](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/user-menu-escape-01.png): a panel below/right-aligned to its account trigger with identity content above an action row.
- [Closed source capture](../../../docs/poc/experiments/017-reference-html-ssot/output/human-review/reference/user-menu-escape-02.png): trigger without a visible panel. Its focus ring is a separate visual property; this candidate does not portray or define it.
- [Historical PR #36](https://github.com/mk3008/torrone/pull/36), head `898c42b7ab3275b7e6c1ca95a1d2b0a861ea49c9`: source inventory only. Its full-screen account captures and interaction claims are not transferred here.

The historical source is account-specific. **Replacing the avatar/name/email/sign-out fixture with an ellipsis and neutral content is a new generalization proposal.** The original does not verify this generic design. Removing the surrounding header and simplifying the panel styling are also illustration choices, not an adopted redesign. These assets are newly drawn SVGs rendered to PNG, not cropped source screenshots.

There is no approved generic Popover entry in [curated References](../../../references/README.md). Existing approved icon-button guidance has its own scope; this contextual trigger illustration does not revise it or establish an approved icon-button variant. Static [SVG artwork](artwork/) is supplied for editing the pictures, not as a component runtime or implementation contract.
