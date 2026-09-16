---
id: icon-button
status: draft
responsibility: flat icon-only command buttons
reference: ../review/references/icon-button-draft.html
---

# Flat icon buttons

Candidate for [Issue #15](https://github.com/mk3008/torrone/issues/15). The requested direction is flat calendar navigation and Close controls; this executable treatment still requires human acceptance or rejection with a reason. No approval is inferred from implementation or merge.

## Preserve

- A recognizable icon and an accessible action name; decorative SVGs stay hidden from assistive technology.
- No visible border or fill at rest; hover and active backgrounds reveal the same hit area without shifting layout.
- Visible keyboard focus independent of hover. Native button activation by Enter/Space and native disabled semantics; disabled controls have muted icons and no hover/pressed response.
- A 44 by 44 CSS pixel target in this candidate, independent of the smaller glyph. Focus stays inside the target to avoid clipping beside adjacent controls.
- The consumer owns order, action meaning, completion and focus return. This Reference does not define a toolbar arrow-key model or automatic focus movement.

## May vary and rationale

Colors, corner radius, glyph implementation and CSS organization may fit the consuming application while retaining state distinction and usable targets. Flat resting controls reduce competing boxes around the calendar title; explicit feedback and focus retain operability. Bordered controls are the existing alternative. This is a proposed visual choice, not a rule that all buttons should be flat. Reconsider if users cannot discover these actions in their context.

## Application and review

The example reports activation for demonstration; it does not pretend to implement calendar navigation. The [Date range candidate](date-range-recovery.md) applies the same treatment to previous/next month/year and Close. Its existing interaction policy, header, one-row navigation and focus return remain authoritative for that composition. Field Clear/calendar triggers and day cells are outside this change.

Review at narrow widths, with pointer and keyboard, including disabled controls. Human decision is pending on Issue #15; the implementing task must record the review result there. Verification and remaining limitations are in [the implementation notes](../docs/icon-button-review.md).
