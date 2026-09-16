# Candidate keyboard policy — manual completion versus navigation

This supersedes the earlier Enter-as-Tab candidate behavior. It is a local consuming-product decision requested after inconsistent real-phone behavior, not a change to the approved Reference or a universal Torrone rule.

## Sources checked on 2026-09-16

- [WCAG 2.2 Understanding 2.4.3: Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html): sequential focus must preserve meaning and operability; matching the implied reading order is good practice. This does not mandate Enter as a navigation key or a universal Z-shaped path.
- [WAI-ARIA APG Date Picker Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/): distinguishes Tab navigation, explicit calendar opening, and Enter selection inside the calendar. It does not prescribe an Enter-to-calendar-button transfer from a typed date. Its modal combobox example is not identical to this candidate's non-modal calendar.
- [WAI-ARIA APG Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/): returning to the calendar-opening button is appropriate after selecting from that dialog. That return path should not be reused for completion of manual typing.
- [HTML Standard: enterkeyhint](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-enterkeyhint-attribute): this attribute requests a virtual keyboard action label. `done` signals input completion; `next` signals moving to another text field. Unspecified presentation is chosen by the user agent. This is a hint, not a guarantee of event delivery, focus behavior or keyboard dismissal.

## Decision and rationale

Manual Enter confirms the currently edited boundary without programmatically moving focus. Both boundaries are independently optional; completion must not force another boundary or switch to an alternative input method. Moving to Clear would also place a destructive action immediately after confirmation. Keeping focus in place avoids both effects and removes dependence on which calendar was last used.

This is an inference/design decision informed by the sources, not a claim that WCAG requires this exact Enter behavior.

| Context | Behavior |
| --- | --- |
| Enter in either text field | Normalize/validate; keep focus in the same field; close any open calendar on successful completion; do not search or open another calendar. |
| Invalid text or composing IME text | Invalid text stays editable; composition Enter is not intercepted as completion. |
| Tab / Shift+Tab | Native forward/backward DOM order, matching left-to-right and top-to-bottom controls; hidden Clear actions are skipped. |
| Calendar button / Arrow Down | Explicitly enter calendar selection for that boundary. |
| Calendar selection / dismissal | Preserve the existing owning-boundary return path; on narrow screens return to that boundary's calendar button to avoid reopening the keyboard. |
| Phone action label | Both text fields request `enterkeyhint="done"`; neither requests Next. Actual IME behavior requires device testing. |

The observed start-to-end movement may include the phone's own text-field navigation because neither field previously specified an enter-key hint. That mechanism has not been reproduced on the owner's device and is not asserted as the sole cause. The implementation removes application-driven Enter focus transfers and aligns both hints, while leaving native Tab behavior intact.

## Verification

The actual-handler fixture checks valid, blank and invalid Enter in both boundaries after using the opposite calendar, plus composition Enter. Static checks verify both fields request Done. Existing calendar activation, input visibility, date and bundle checks pass. Browser/IME behavior on the owner's phone remains unverified; these checks are not a device-level pass.
