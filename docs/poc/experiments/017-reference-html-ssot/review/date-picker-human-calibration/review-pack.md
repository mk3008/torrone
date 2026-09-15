# DatePicker Human Review Pack

Status: Single date and adjusted Date range accepted by the human reviewer on
2026-08-14. They remain separate because they have different completion models.

## Human decision

The adjusted Date range is accepted as the bounded business-filter example.
This acceptance does not make its open-ended policy, exact visual expression,
or DatePicker implementation universal.

## Open the references

- [Accepted adjusted Single date](./adjusted/single-date.html)
- [Adjusted Date range candidate](./adjusted/date-range.html)
- [Original Date range baseline](./baseline/date-range.html)

The adjusted pages use a fixed review fixture: August 14, 2026 is shown as
**today**. It is not a production clock or date policy.

## Try them normally first

For Date range, select Start once and confirm that the popup closes. Repeat for
End. Then try Start-only, End-only, a completed range, an invalid or reversed
manual range, clearing End, and resuming. Try keyboard and pointer operation
independently.

After that free-form review, use these as coverage reminders only:

- visual density and the relationship between the field and picker;
- popup position and size;
- distinction among today, selected, and keyboard focus;
- clarity of open/close, completion, clear, and reselection;
- clarity of Start-only, End-only, completed, and unavailable states.

## Representative states

Start-only period after one click:

![Start-only period](../../output/date-picker-human-calibration-range-adjustment/20260814T061156Z/date-range-artifacts/single-click-start-selection-02.png)

Date range completed and reopened:

![Date range completed and reopened](../../output/date-picker-human-calibration-range-adjustment/20260814T061156Z/date-range-artifacts/completed-range-reopen-05.png)

## Current boundary

This review covers the visible and operable DatePicker example: field/picker relationship, open and closed states, focus, selection, completion, clear, and reselection.

It does not decide locale, timezone, responsive behavior, production date
policy, canonical adoption, or a permanent CLI/Profile contract. Target
transfer is recorded separately in the Phase 2 result.
