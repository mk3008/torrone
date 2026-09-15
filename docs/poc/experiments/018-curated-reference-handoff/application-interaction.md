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
