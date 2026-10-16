# BADGE-001 — Text badge appearances

[View the two independent images](index.html).

- Category: Component / noninteractive text badge.
- Platform: Web-origin illustrations; browser/native rendering unverified.
- Status: **Human-accepted appearance examples.** [Visual acceptance](https://github.com/mk3008/torrone/pull/53#issuecomment-6206299372). Source Reference approval remains separate.
- Appearance: short bold text inside a rounded, filled enclosure with a thin border. Text remains the visible meaning; color is supplementary.

| Image | Appearance | Provenance |
| --- | --- | --- |
| [Standard example](images/standard.png) | Wider enclosure around the word Standard. | Source-supported appearance reconstruction |
| [High example](images/high.png) | Shorter enclosure around the word High, using the source's contrasting treatment. | Source-supported appearance reconstruction |

These are two example variants, not a progression or a state machine. Their widths follow their labels; height and text alignment remain consistent. They are labels, not buttons, links, filters or selected controls. No hover, focus, pressed, disabled, counter or dismiss action is pictured.

## Source and proposal boundary

The working draft [Access review workspace](../../../review/references/access-review.html), Git blob `0edb934a074285d36e3e2a89170ce8fc1ced08d6`, contains both literal labels in `span.status-badge` and `span.status-badge.high`. Its `.status-badge` styles supply rounded shape, bold text, border and fill; `.high` provides the alternate treatment. The source uses these labels for example risk values in a table. [Review inventory](../../../review/examples.json) identifies that workspace as a draft. No approved badge curation exists.

All [SVG artwork](artwork/) and PNGs are newly drawn from those appearances, not source screenshots or executed browser states. **Extracting them as a reusable text-badge entry is a new proposal.** The two appearances have source grounding; source approval and a universal risk/status classification cannot be inferred.

## Limits

Standard/High, their meanings, colors and mapping are replaceable samples. This entry does not define business risk, success/error/warning categories, classification rules, transitions, record counts or table placement. Exact color, type, dimensions, padding and geometry are illustrative. A consuming product must supply its own meaningful labels and accessible treatment; these images do not prove contrast or assistive-technology support.

No consuming application's shared interaction policy is changed. This noninteractive label has no activation or focus contract. Dynamic announcements, responsive layout, long/localized labels, browser/native rendering, real devices and accessibility remain unverified. Refer to the consuming application's [interaction requirements](../../../docs/application-interaction.md) when placing it into an executable screen.
