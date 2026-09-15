# Single Date Human Adjustment Business-Screen Review

## Verdict

`human-accepted-local-reference` — the fourth adjusted Single date is a
coherent business-app example and was accepted by the human reviewer on
2026-08-14 as the source design for the Date range adjustment. This local
decision does not establish a universal DatePicker rule.

## Screen and states reviewed

- empty closed field and input-focused open calendar;
- input Tab departure;
- complete current, previous/next month, and previous/next year views;
- fixed today, selected date, keyboard focus, and unavailable future dates;
- pointer and keyboard date selection;
- compact manual entry normalized to `yyyy-mm-dd`;
- impossible-date and future-date errors with corrected recovery;
- calendar toggle, visible Close, Escape, Clear, and reselection.

Acceptance viewport: 1440 × 900 in the repository CLI. The open popup renders
at 336 × 335.5 CSS pixels; its grid is 310 × 244 pixels. The field group is
336 pixels wide rather than filling the 660-pixel sample surface.

## Copy inventory

| Visible sentence/caption | Type | Disposition |
| --- | --- | --- |
| `Expense transaction date` | task identity | keep; makes the past-only example coherent |
| `Record the date on which the expense occurred.` | task help | keep |
| `Transaction date` | field label | keep |
| `Format: yyyy-mm-dd. You can also enter yyyymmdd.` | required input instruction | keep |
| invalid/future-date messages | validation and recovery | keep |
| month heading | current picker data and live navigation feedback | keep |
| future-date availability note | visible explanation of disabled dates | keep |
| top draft label | review harness | keep outside product observation |

There is no Contract, implementation, acceptance-process, or UI-teaching copy
inside the product boundary.

## Action inventory

| Action | Keyboard treatment | Rationale |
| --- | --- | --- |
| Editable date input | page Tab stop; `ArrowDown` opens | single primary keyboard entry point |
| Inline Clear | not a page Tab stop | value can be cleared by normal editing; named native button remains available to pointer and assistive-technology navigation |
| Inline calendar icon | not a page Tab stop | matches the editable-combobox single-stop model; named native button remains available outside sequential Tab navigation |
| Month/year controls | normal popup Tab stops | explicit navigation after the user enters the calendar |
| Popup Close | normal popup Tab stop | discoverable dismissal in addition to Escape |
| Enabled day | one roving grid Tab stop plus arrow movement | direct selection without 42 sequential Tab stops |
| Disabled future day | disabled and excluded from focus | visibly unavailable and inert |

No visible Today action is added. Current official patterns vary: some expose
Today as an optional value-selection action, while other desktop examples omit
it. A navigation-only button with the same caption would be ambiguous. Reopen
already restores the selected date's month or the fixed current month when the
field is empty.

The visual `Clear → calendar` order is defensible rather than universal: the
value-local action sits nearer the value and the popup indicator stays at the
outer edge. The Reference should not promote this exact order as an invariant
from one calibration.

The visible separator is the calendar action's existing one-pixel border. It
clarifies two adjacent actions without adding a new color token or a decorative
DOM node.

## Interaction and accessibility risks

- Focus-triggered expansion remains an explicit human requirement. The popup
  does not steal typing focus, and `Tab` closes it before normal page movement.
- The clipped inline-icon focus state is removed from ordinary keyboard use by
  making the composite one page Tab stop. An inset fallback outline remains for
  programmatic or assistive-technology focus.
- The grid uses only one roving Tab stop; arrows move by day/week and Page Up/
  Page Down move by month, with Shift adding year movement.
- Unavailable dates use native disabled semantics plus a distinct surface and
  border. A visible rule explains why they are unavailable.
- Today, selection, disabled state, and focus use different combinations of
  underline, fill, border, and focus outline rather than color alone.
- Red Sunday and blue Saturday text supplement the Sunday-first column order
  and full weekday names. Disabled dates remain neutral gray and selected dates
  remain white, so weekend color does not override stronger state semantics.
- The underlined August 14 cell is the current-date state and exposes
  `aria-current="date"`; the harness fixes today to 2026-08-14. It is distinct
  from the filled selected-date state.
- Invalid state uses border plus text and `aria-invalid`; correction removes
  the visible and programmatic error state consistently.

## Contract boundary

Manual editability, normalized display, explicit invalid recovery, Tab-leave
closure, complete calendar context, month/year movement, and disabled-date
observation are useful Reference candidates. The exact accepted formats,
focus-open preference, inline-action order, fixed future-date rule, icon style,
weekend palette, 336-pixel field/popup width, omission of a Today action, and
six-week visual treatment are not universalized from this one sample.

## Remaining verification limits

Screenshot inspection cannot prove real screen-reader behavior. Other browsers,
zoom/reflow, responsive behavior, locale/timezone policy, IME and paste edges,
backend validation, and Target transfer remain outside this adjustment.
