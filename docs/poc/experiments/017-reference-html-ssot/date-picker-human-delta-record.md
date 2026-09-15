# DatePicker Human Delta Record

## Status

`done` — the fourth Single date candidate and the adjusted Date range candidate
were accepted by the human reviewer on 2026-08-14. Phase 2 classified the human
observations, preserved the approved Reference, detected the old Target delta,
and transferred the accepted operation to an independent Target.

## Human observation and response

| Human observation | Before | Current adjusted candidate | Provisional observation class |
| --- | --- | --- | --- |
| Field and calendar felt disconnected | Read-only field plus separate `Choose date` text button | One bordered editable control with integrated Clear and calendar actions | interaction/hierarchy; likely B and C |
| Manual entry was unavailable | Read-only input | Editable input accepting `yyyy-mm-dd` and `yyyymmdd` | interaction; likely B |
| Non-date input had no rejection state | No manual input path | Real-date parser, visible error, `aria-invalid`, and recovery | validation/accessibility; likely A |
| Input focus should expose the calendar | External button only | Focus opens without moving focus away from typing | focus/interaction; likely A and C |
| Calendar could not be explicitly dismissed | Trigger toggle only | Visible Close, Escape, Tab departure, outside pointer, and toggle | interaction/accessibility; likely A |
| Tab departure from the input should dismiss | Popup remained while focus moved inside the composite | Input `Tab` closes before normal page focus movement | interaction/focus; likely A |
| Inline X and calendar focus order was questionable | Both could become sequential Tab stops | Visual `Clear → calendar` order retained; both excluded from page Tab order | accessibility/interaction; likely A and C |
| Tab focus ring could be clipped | action outline crossed and was overlapped at the composite edge | input is the sole normal Tab stop; inset fallback remains for nonsequential action focus | focus/style; likely A and B |
| Calendar exposed only one week | Seven fixed day buttons | Complete six-week month grid | state/context; likely B |
| Month/year movement was absent | Static month label | explicit previous/next month and year controls plus keyboard movement | interaction; likely A and B |
| Unavailable dates were not demonstrated | every shown date selectable | fixed future dates use native disabled state and distinct visual treatment | state/accessibility; likely A and B |
| Adjacent field actions needed clearer separation | actions met at an ambiguous edge | existing one-pixel calendar-action border is visible between Clear and calendar | hierarchy/style; likely B |
| Week start was easy to misread | weekday labels and column position only | Sunday red and Saturday blue, with selected/disabled states taking precedence | orientation/style; likely C |
| Calendar felt too large | approximately 404 × 397.5 CSS pixels | 336 × 335.5 pixels with 34-pixel date targets | density/geometry; likely C |
| Field was too wide for a fixed-format date | field filled the sample width | field group is limited to 336 pixels and aligned with the popup | density/geometry; likely C |
| Current-date underline pointed to the wrong review date | fixed fixture marked 2026-09-14 as today on 2026-08-14 | fixed review clock, default view, fixtures, and validation boundary use 2026-08-14 | state/fixture correctness; likely A |
| Returning to today after navigation might need a shortcut | no dedicated shortcut; reopen resets the view | no button added because common Today actions often select a value; reopen recovery retained | interaction; likely C, pending use evidence |

The Single and Date range directions are human-accepted for these samples. The
final multi-axis classification is recorded in
`date-picker-human-calibration-phase-2-result.md`; no product-specific choice is
promoted as a universal DatePicker rule.

## Pattern cross-check

- [W3C APG Date Picker Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/)
  demonstrates an editable combobox, a graphical open action outside the Tab
  sequence, a dialog grid, month/year buttons, and arrow/Page Up/Page Down
  keyboard movement.
- [W3C APG Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
  places the combobox in the page Tab sequence while excluding its popup
  indicator and popup descendants from that page sequence.
- [USWDS Date Picker](https://designsystem.digital.gov/components/date-picker/)
  recommends retaining manual entry and an associated visible format hint.
- The APG example uses a 320-pixel dialog and 40-pixel date cells. USWDS caps
  the calendar at its 320-pixel
  [`mobile` width token](https://designsystem.digital.gov/design-tokens/spacing-units/).
  [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
  requires pointer targets to be at least 24 by 24 CSS pixels, subject to its
  listed exceptions.

These sources support a single keyboard entry point, manual editing, a complete
calendar context, and explicit navigation. They do not establish this
candidate's exact visual order, focus-open preference, accepted formats, or
future-date business rule as universal.

## Correction cost

| Measure | Phase 1 baseline | First adjustment | Second adjustment | Current candidate |
| --- | ---: | ---: | ---: | ---: |
| Reference files touched | 1 | 1 separate candidate | same 1 candidate | same 1 candidate |
| Total lines | 96 | 271 | 487 | 493 |
| Net line delta from previous round | — | +175 | +216 | +6 |
| Diff against baseline | — | 216 additions / 42 deletions | 444 additions / 53 deletions | 450 additions / 53 deletions |
| Explicit stable identities | 5 | 10 | 14 | 14 |
| Scenarios | 4 | 10 | 15 | 15 |
| Scenario actions | 11 | 23 | 34 | 34 |
| Harness roots | 1 | 1 | 1 | 1 |
| CLI/Core files | 0 | 0 | 0 | 0 |
| Consumer/Target files | 0 | 0 | 0 | 0 |

The feedback remained local to one HTML file and required no duplicate expected
style document, framework, dependency, or build step. However, complete month
rendering, navigation, disabled-date rules, roving focus, and pointer/focus edge
handling added 216 lines in one round. This is concrete evidence that a custom
DatePicker Reference can become a small application. The result does not yet
justify file splitting or abstraction, but it argues against promoting this
implementation wholesale as a simple universal Reference pattern.

The third feedback round was substantially cheaper: the divider reused an
existing border, compact sizing changed local CSS values, and weekend
orientation required four selectors plus four color variables. It changed no
JavaScript, scenario, stable identity, CLI/Core file, or duplicate expectation.

The fourth round also remained local to the same HTML candidate. It changed the
fixed fixture values and one CSS declaration, while retaining 493 lines, 14
explicit stable identities, 15 scenarios, and 34 actions. The verifier and
human-review records changed because they freeze the corrected evidence; no
CLI/Core file or Target changed.

The Date range adjustment also remained local to one separate HTML candidate.
After the latest review it is 642 lines versus the 107-line Phase 1 baseline,
with 603 additions and 68 deletions. Source-authored stable identities increased
from 7 to 20, scenarios from 4 to 22, and actions from 14 to 58. The CLI
observes five additional generated date identities, for 25 observed elements.
No CLI/Core, baseline, accepted Single date, Consumer, or Target file changed.

This cost is materially higher than a visual restyle. It came from carrying the
accepted Single behaviors into two editable boundaries, adding range ordering
validation, preserving a partial selection, rendering endpoint and interior
states, and keeping one shared popup anchored to the field that opened it. A
rejected intermediate version moved the popup from Start to End immediately
after the first date was chosen; rendered evidence showed that this made the
control jump during one operation.

The next human review found a deeper interaction problem: even without the
geometry jump, two visible inputs plus a hidden two-click range mode made the
first click appear incomplete. It also identified a missing Start-only/End-only
case and visual similarity between the range interior and unavailable dates.
The candidate now treats each boundary as an independent one-click DatePicker,
closes after each selection, permits either side to stay blank, and shows a
connected blue range only after both values exist. Unavailable dates changed
from filled gray tiles to unfilled muted text. This round removed 6 net lines
but added 1 authored state identity, 4 scenarios, and 10 actions because the
new open-ended and independent-completion states required direct evidence.

The range candidate also exposed a CSS interaction defect: a hovered selected
endpoint inherited the general hover background while retaining white selected
text. Bounded contrast correctly failed. Excluding pressed dates from the hover
rule restored the selected fill and the unchanged preflight then passed.

## New observation details

The existing CLI/Core could observe the added heading state, focus, disabled
attribute, popup visibility, error/recovery, geometry, accessibility, and
interaction completion without changes. Four stable keys were added for
month/year navigation and the month heading; the 42 date buttons did not receive
individual keys. Only the two enabled scenario dates and one disabled example
retain explicit date keys.

The current Core still does not capture an editable input's actual DOM `value`.
The normalized value is visible in screenshots and mirrored in the live status,
but it is not a direct comparative property. This general gap remains deferred
until the design is confirmed.

The Core also does not compare the weekend column colors without adding new
element identities. The PoC deliberately retains source-contract and screenshot
evidence rather than adding seven column/day keys. Whether this cue belongs in
a transferable partial Reference remains unconfirmed.

For Date range, the Core does not directly capture either input's live DOM
`value` or all unkeyed cells' range relationships. The candidate therefore
uses one live selection sentence, one keyed availability sentence, three keyed
enabled dates, two keyed disabled dates, source-contract checks, and screenshots.
Adding a key to every calendar cell was rejected as unnecessary authoring cost.

## Preserved boundaries

Phase 1 baselines, accepted Single date, the accepted Reference, Composite
evidence, and the historical Target remain unchanged. Phase 2 added a separate
Target, one general `aria-describedby` comparison correction, current evidence,
and a bounded long-lived observation update. Locale, timezone, responsive,
real-AT, canonical adoption, and Profile/API decisions remain outside scope.
