---
id: invoice-date-range
status: draft
responsibility: review refinements to independent Invoice desk date boundaries
reference: ../docs/poc/experiments/018-curated-reference-handoff/target/index.html
reviewed_revision: f46f9cc161f693c09559805d849d41d7a7afdb1c
---

# Invoice date range — review requirements

This entry makes the owner's review requirements discoverable at the normal Reference lookup point and governs continued work on this candidate. It does not replace the [approved Date range Reference](date-range.md) or establish universal keyboard/color conventions.

## Executable and application requirements

The linked HTML and its sibling `invoice.css`, `invoice.js`, `invoice-dates.js`, and `invoice-entry.js` together identify the executable. The reviewed snapshot is Git revision `f46f9cc161f693c09559805d849d41d7a7afdb1c`, private review surface version 12.

Read the [application interaction record](../docs/poc/experiments/018-curated-reference-handoff/application-interaction.md) and [keyboard policy](../docs/poc/experiments/018-curated-reference-handoff/keyboard-policy.md) alongside this entry and the base Reference. Both date boundaries are in scope. Application-wide completion/navigation decisions must remain application-owned.

## Preserve in subsequent revisions

| Requirement | Observable expectation | Status |
| --- | --- | --- |
| Manual entry visibility | Both labels/editors remain reachable with the phone keyboard open; switching input methods does not move a pending tap target away. | Owner-required correction; real-phone verification incomplete. |
| Calendar completion | An available date tap commits the active boundary; intermediate focus transfer must not dismiss the calendar before activation. | Owner-required correction; handler regression passed. |
| Consistent focus | Equivalent fields obey the same application policy; sequential movement follows meaningful visual order; completion never returns to a stale boundary owner. | Owner-required consistency; tab-stop compatibility with the base Reference remains unresolved. |
| Manual Enter proposal | Both fields validate/normalize and retain focus, with composition Enter left untouched; Tab/Shift+Tab navigate; calendar completion has its own return path. | Current implementer proposal, not an explicitly approved global policy. |
| Visible focus | The calendar focus indicator remains visible without clipping by adjacent cells. | Owner-reported defect; intermittent browser rendering remains unverified. |
| Compact navigation | Previous year, previous month, month/year label, next month, next year share one row at ordinary phone width, with usable hit areas and matching control order. The center label may wrap under constrained width/enlarged text. | Explicit owner layout request; browser coverage incomplete. |
| Sunday orientation | Sunday heading and ordinary Sunday dates are red; the heading is also bold and retains weekday text. Determine Sunday from the date, including adjacent-month cells, not the first column. Selected/unavailable state styling takes priority. | Owner accepted the latest Sunday-cue update on 2026-09-16. |

Sunday red is an intentional relationship for this candidate, not incidental styling or a holiday/non-working-day rule. Maintain readable contrast on ordinary, range and hover backgrounds, and textual weekday cues. Saturday blue and holiday coloring are not required.

## May vary

Framework, DOM/CSS organization, copy, exact red shade, dimensions and breakpoint may vary while preserving these relationships. The current 44px controls and Sunday-first layout do not establish worldwide calendar conventions. No configurable week-start feature is implied.

## Human review evidence and remaining boundary

In the Work review thread on 2026-09-16, the owner reported keyboard obstruction, failed date taps, irregular focus and intermittent drawing. They requested a researched consistent keyboard policy, application-level ownership, compact month navigation, and a red Sunday orientation cue. After the Sunday update was published, they replied that it was OK and requested that review instructions become Reference rules.

Record that acceptance for the Sunday cue; do not expand it into approval of every earlier unverified path. The complete candidate remains `draft`. These explicit review requirements must nevertheless be preserved during candidate work. Original observations and limits remain in the application record and [verification notes](../docs/poc/experiments/018-curated-reference-handoff/verification.md).

Full promotion requires explicit bounded approval and resolution of operation-model differences from the base Reference. Tests, this entry, and PR merge do not supply design approval.
