# Invoice desk application interaction record

This is a retrospective application of [the current handoff check](../../../application-interaction.md). It does not change the original experiment's read boundary or claim that the original input was sufficient.

## Inputs and status

- Application: the bounded Invoice desk candidate, not every Torrone consumer.
- Shared interaction proposal: [keyboard-policy.md](keyboard-policy.md), introduced in `63b80ed9e1981d0ca104af50a36263a27e7aaf61`. Its scope is both manual date boundaries and their transitions into/out of calendar selection. Other field types and other screens are outside this PoC.
- Reference: [Date range](../../../../references/date-range.md), approved executable blob `d2be91d512ac310cb306adfe0e9bfe556ec2bca8`.
- Decision source: owner feedback requested consistent focus behavior and then application-level ownership/omission prevention. The owner explicitly has not reviewed the latest candidate. Enter-in-place is an implementer proposal pending owner design review, not an accepted global policy.
- Known compatibility question: the Reference omits Clear/calendar buttons from sequential traversal; the candidate includes them. This difference still needs an explicit scope/transfer decision. See [handoff notes](handoff-notes.md). No approval transfers to the candidate.

## Coverage at candidate revision 63b80ed9e1981d0ca104af50a36263a27e7aaf61

All proposed expectations below derive from the shared keyboard proposal or the Reference's coherent entry/recovery requirement. Evidence and earlier failures are preserved in [verification.md](verification.md).

| Requirement / decision | Affected path and expected result | Evidence / conditions | Result / gap |
| --- | --- | --- | --- |
| Manual Enter proposal | Either boundary, after using the opposite calendar; valid, blank and invalid values retain the edited field; composing Enter is not intercepted | `tests/check-curated-handoff-calendar.cjs`, Node handler fixture | Fixture passed; native browser/IME delivery unverified; design pending |
| Sequential navigation proposal | Tab and Shift+Tab across both boundaries, visible Clear/calendar actions and Search; hidden Clear skipped; preserve expected order after popup dismissal | DOM/source inspection only; no completed native traversal run | Unverified; Reference tab-stop difference unresolved |
| Calendar entry/completion | Either boundary opens, selects and returns to its owner; change operation order and reopen | Calendar handler fixture, including focus-transition regression | Fixture passed; actual touch/browser flow unverified |
| Entry visibility | Focus either text field with the software keyboard visible; label/editor remain reachable; switch fields and input methods | `tests/check-curated-handoff-entry.cjs`, mocked focus/viewport timing | Fixture passed; phone retest pending |
| Recovery and completion | Invalid/reversed dates recover through editing or Clear; partial ranges remain valid; Search uses the committed range | `tests/check-curated-handoff-dates.cjs` covers date/range logic | Logic passed; composed browser recovery-to-Search path unverified |

Application interaction verification is incomplete. The next review must operate the forward/reverse composed focus path and both mobile Done actions, resolve the tab-stop difference, and judge the proposal's usability. This record neither scores design quality nor closes Issue #9.

## Applicability of this follow-up

The current change adds management and review guidance only; it changes no HTML, CSS, runtime handler, or approved Reference. The table above exposes existing gaps rather than reporting a new browser pass. The previously deployed candidate remains the review surface.

## Compact calendar navigation follow-up

The owner requested less unused vertical space in the month navigation. The candidate now places previous-year, previous-month, month heading, next-month and next-year in one grid row, in that DOM order. Buttons retain 44 by 44 CSS pixel minimum targets. At very narrow widths or enlarged text the heading may wrap inside its center cell rather than shrinking the controls or overflowing the calendar. No key handler or shared Enter policy changes. Native Tab order among these four buttons is unchanged.

Static source inspection confirms the visual/DOM order and target sizing; the calendar handler and static bundle checks pass. Browser rendering at phone widths and enlarged text remains unverified. This is a candidate layout change, not approval of the complete UI.

## Sunday orientation cue

At the owner's request, both boundary calendars mark the Sunday heading and ordinary Sunday dates in dark red as an orientation cue. The heading is also bold and retains its weekday text. This is an Invoice desk display choice, not an international convention, a holiday/non-working-day rule, or a universal Torrone requirement. Sunday is derived from each date, including adjacent-month dates, rather than from its column position. The existing Sunday-first layout is unchanged; no configurable week-start feature is introduced.

Selected endpoints retain their white-on-green state and unavailable dates retain their muted/hatch state, taking precedence over the Sunday color. Range and hover backgrounds retain readable red text. Navigation, focus, selection and Enter behavior are unchanged. The approved Reference is untouched. Existing calendar handler and static bundle checks pass; source inspection checks state precedence and computed contrast is above 4.5:1 on ordinary, range and hover backgrounds. Actual phone visual review remains pending.
