# DISCLOSURE-001 — Collapsible section appearances

[View the two independent images](index.html).

- Category: Component / single section disclosure.
- Platform: Web-origin illustrations; browser/native rendering unverified.
- Status: **Human-accepted appearance examples.** [Visual acceptance](https://github.com/mk3008/torrone/pull/55#issuecomment-6206673160). Source Reference approval remains separate.
- Appearance: a persistent heading and Show/Hide button, with the section body absent or visible below them.

| Image | Header action | Body | Grounding |
| --- | --- | --- | --- |
| [Collapsed](images/collapsed.png) | Show details | Absent; section ends below the header. | Source-supported closed relationship; new sample wording |
| [Expanded](images/expanded.png) | Hide details | Visible below a separator. | Source-supported open relationship; new sample wording/body |

The heading, button and optional body are the minimum composition needed to show this responsibility. Details, Example item and the sentence below it are replaceable examples, not a particular business screen or required content. The pair does not specify a multi-section accordion, navigation tree, selection or form.

## Source and proposal boundary

The working draft [Access review workspace](../../../review/references/access-review.html), Git blob `0edb934a074285d36e3e2a89170ce8fc1ced08d6`, supplies `.section-heading`, `.disclosure-button`, `.filter-panel[hidden]` and the filter-toggle handler. Its real example uses Filters and Show filters/Hide filters, with a form as the body. The handler synchronizes body visibility, `aria-expanded` and button wording. [Review inventory](../../../review/examples.json) identifies it as a working draft; there is no approved generic section-disclosure curation.

These [SVGs](artwork/) and PNGs are newly drawn illustrations, not source screenshots or executed browser states. The open/closed relationship and layout have source grounding. **Generic extraction, Details/Show details/Hide details wording and the neutral text body are new adaptations**, accepted for visual use in the linked human decision. Source-specific search fields, values, result behavior and screen structure are not carried over. No source approval is inferred.

## Limits

Exact color, type, spacing, geometry, labels and example body are illustrative. This entry shows no hover/focus/disabled/loading state, transition animation or multiple-section rule. It does not define whether hidden controls retain values, how other sections respond or how a consuming application navigates/submits.

The pictures do not execute the button or establish native focus, keyboard activation, hidden-content accessibility, announcements, animation, scrolling or responsive behavior. Those require a consuming application's [interaction requirements](../../../docs/application-interaction.md) and actual verification. No application/executable Reference is changed; browser, real-device and assistive-technology coverage remains unperformed here.
