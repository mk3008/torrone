---
id: icon-button
status: approved
approved_git_blob: b8e039b8dbee39ccd668d3936be60abffe1fa447
approval_evidence: https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948
responsibility: flat icon-only command buttons
reference: ../review/references/icon-button-draft.html
---

# Flat icon buttons

Adopted explicitly in [PR #19 review](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948) for flat icon-only command appearance and states. Approval identifies the exact Git blob above. The executable retains its reviewed draft labels and filename for byte identity; they are not its current curation status.

## Preserve

- A recognizable icon and an accessible action name; decorative SVGs stay hidden from assistive technology.
- No visible border or fill at rest; hover and active backgrounds reveal the same hit area without shifting layout.
- Visible keyboard focus independent of hover. Native button activation by Enter/Space and native disabled semantics; disabled controls have muted icons and no hover/pressed response.
- A 44 by 44 CSS pixel target in this candidate, independent of the smaller glyph. Focus stays inside the target to avoid clipping beside adjacent controls.
- The consumer owns order, action meaning, completion and focus return. This Reference does not define a toolbar arrow-key model or automatic focus movement.

## May vary and rationale

Colors, corner radius, glyph implementation and CSS organization may fit the consuming application while retaining state distinction and usable targets. Flat resting controls reduce competing boxes around the calendar title; explicit feedback and focus retain operability. Bordered controls are the existing alternative. This is a proposed visual choice, not a rule that all buttons should be flat. Reconsider if users cannot discover these actions in their context.

## Application and review

The example reports activation for demonstration; it does not pretend to implement calendar navigation. The [Date range Reference](date-range.md) applies the same treatment to previous/next month/year and Close. Its existing interaction policy, header, one-row navigation and focus return remain authoritative for that composition. Field Clear/calendar triggers and day cells are outside this change.

Review at narrow widths, with pointer and keyboard, including disabled controls. The adoption decision is the review linked above; verification limitations remain recorded. Verification and remaining limitations are in [the implementation notes](../docs/icon-button-review.md).
