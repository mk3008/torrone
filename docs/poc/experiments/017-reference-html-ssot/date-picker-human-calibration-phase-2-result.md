---
type: PoC result
title: DatePicker Human Calibration Phase 2 result
status: meets
source: human-approved Date range Reference, preserved pre-followup comparison, independent Target, and current browser evidence
---

# DatePicker Human Calibration Phase 2 result

## Attainment

**`meets`**

The complete maintenance cycle was demonstrated without changing the approved
Reference:

`AI draft → human correction → human-approved Reference SSOT → Target difference detection → Target follow-up → comparative validation`

The approved Date range Reference remains byte-identical at
`387EC789769DE702263A802DE27368EA2128A2F27C25002E494C00DC65CC5D86`.
The previous Composite Target and all fixed historical evidence also remain
unchanged.

## What the human observed

The human did not merely request more DatePicker features. The corrections
repeatedly resolved mismatches between what the visible control implied and
what one action actually did.

- A field, picker trigger, Clear action, validation, and focus path needed to
  read as one control rather than several adjacent demonstrations.
- Editable date input needed explicit normalization, rejection, recovery, and
  a complete calendar context before it was credible as a business input.
- Tab, Escape, Close, pointer departure, and restored focus needed a coherent
  dismissal model; a clipped ring made that model visibly unreliable.
- The fixed current-date underline had to agree with the declared review
  fixture. A technically present cue with the wrong date was misleading.
- Fixed-format inputs and the popup were reduced to task-proportionate sizes.
- For the range, two visible inputs combined with a hidden two-click mode made
  the first click look incomplete. The approved business-filter model instead
  completes one boundary per click and lets the other boundary remain empty.
- Moving the popup from Start to End during one operation broke stable
  activation geometry and orientation.
- Selected-range fill and unavailable-date fill were too similar. The approved
  design uses a connected range band and unfilled muted unavailable dates.
- Availability wording made the active selection boundary discoverable without
  requiring the user to infer it from disabled cells alone.

## Observation classification

The categories below describe where the observation should be handled next.
They do not turn the approved product choices into universal DatePicker rules.

| Human correction | Machine comparison after approval | AI Reference self-review | Human design authority | DatePicker-local decision |
| --- | --- | --- | --- | --- |
| integrated editable field, Clear, and picker action | state, focus, style, visibility, and relationships compare | review control proximity and one coherent entry path | exact action order and visual treatment | manual date parsing and calendar trigger |
| invalid, future, reversed, and corrected input | `aria-invalid`, alert visibility, styles, and recovery compare | include failure and correction states | error wording and product validation policy | accepted formats and date-order rules |
| focus-open and Tab/Escape/Close dismissal | actions, expanded state, visibility, and active focus compare | trace every entry and exit path | whether focus-open is desirable in the product | DatePicker keyboard model |
| complete month and month/year movement | heading/state/actions compare | avoid samples that imply an unusably bounded control | exact navigation density | month/year calendar navigation |
| disabled dates and availability sentence | disabled state, note visibility/style, and interaction compare | explain non-obvious availability near its cause | exact explanation and cutoff policy | future-date fixture and boundary calculation |
| compact field and popup geometry | geometry is observed as diagnostic, not an error | compare footprint with the value domain and task | exact width, density, and target size | date-string width and calendar-grid size |
| weekend orientation colors | keyed styles can compare only where explicitly observed; current coverage is mainly source/screenshot | check that week orientation is unambiguous | exact colors and week convention | Sunday/Saturday styling |
| correct current-date underline | semantics and keyed state can compare; the unkeyed day still needs source/screenshot evidence | cross-check declared fixtures against rendered meaning | underline styling | fixed `today` date |
| independent one-click Start/End completion | action, popup, focus, partial-state, and selection observations compare | ensure visible field count agrees with the completion model | choose filter-style versus reservation-style range semantics | this product allows independent boundaries |
| Start-only and End-only states | scenario state and selection announcement compare | enumerate product-valid partial states | decide whether partial boundaries are valid | this business filter allows either side blank |
| connected range versus unavailable treatment | computed styles, disabled state, pressed endpoints, and negatives compare | compare opposing states side by side | exact band and color expression | calendar range rendering |
| no Today shortcut | no invariant to validate | avoid adding actions without demonstrated need | retain or add the shortcut based on product use | DatePicker convenience action |

The reusable observation is not “all ranges should allow an empty side” or
“all pickers should close after one click.” It is: **the visible control model,
completion behavior, valid partial states, and state styling must tell one
coherent story.** Product requirements choose the story.

## Target transfer

Before the Target was changed, the approved baseline rejected the historical
Target with `1,384` errors across `110` normalized signatures. Missing editable
boundaries, actions, navigation, disabled states, validation, one-click
completion, focus, and computed styles were all exposed. The `92` geometry and
extra-element observations remained informational.

| Pre-followup difference family | Signatures | Occurrences | What it exposed |
| --- | ---: | ---: | --- |
| missing observed element | 20 | 460 | editable inputs, local actions/errors, popup, navigation, grid, note, and disabled example absent |
| computed style | 37 | 578 | old week-button and status styling did not reproduce the approved control |
| state or relationship | 11 | 214 | disabled/pressed/selected/described-by differences |
| visibility | 4 | 52 | old popup/status/day exposure differed by state |
| action execution | 1 | 22 | every approved scenario encountered unavailable actions in the old Target |
| focus | 1 | 22 | approved active-focus outcomes were not reproduced |
| scenario step failure | 36 | 36 | the expanded manual, navigation, one-click, partial, error, and dismissal flow could not run |

The new experimental Target changes the task from transaction filtering to
outbound shipment scheduling. It uses October fixtures, different visible copy,
DOM grouping, classes, local IDs, state organization, JavaScript, and CSS. It
has no Reference harness. Fifteen supported fill-value overrides keep October
fixture values outside product UI while replaying the same scenario contract.

The final comparison passed with `25` observed elements, `22` scenarios, `58`
actions, zero comparison errors, zero bounded accessibility issues, zero
console errors, zero external requests, and zero failed requests. Its `105`
geometry/extra-element observations are expected cross-content diagnostics.

## CLI/Core finding

The first Target follow-up matched all design observations but still failed
`403` times across seven signatures because unkeyed `aria-describedby` targets
were compared by local ID spelling. Reusing the Reference IDs would have
violated the established local-ID independence condition.

The Core now normalizes an unkeyed description target by tag, inferred role,
and visibility instead of its local ID. This is a general relationship
comparison correction, not a DatePicker exception. A dedicated control with
different local IDs passes; hidden and missing targets still fail, and a
missing ID reference still fails Reference Conformance. The CLI interface did
not change.

This normalization does not prove that different product wording has the same
meaning. It preserves structural/visibility comparison while content remains a
human and product responsibility.

## Consumer impact

The approved range operation expanded the Target-observed contract from seven
to twenty explicit identities. The additional thirteen keys identify the two
editable boundaries, their local errors/actions, popup/navigation/grid/note,
and the direct disabled-boundary example. Five fixture-day identities continue
to be generated at runtime rather than annotating every calendar cell.

No Consumer CSS, class, DOM, local-ID, framework, component, or state-management
contract was added. The Target has zero shared class tokens, zero shared local
IDs, a different style-source hash, and no shared stylesheet.

## Human review frequency

This calibration gives a defensible reason to reduce—not eliminate—human review
for a closely related DatePicker draft. AI self-review can now proactively
check control integration, complete entry/exit paths, coherent completion,
valid partial states, stable geometry, fixture meaning, state distinction, and
task-proportionate density before presenting a draft.

Human review remains necessary when deciding the product's range semantics,
optional boundaries, exact density, visual expression, shortcut actions,
locale/week convention, validation policy, or whether an unfamiliar control
still feels natural. A first example in a materially different product context
or operation model still needs human calibration.

## Scope retained

Responsive behavior, other browsers as a product claim, real assistive
technology, locale/timezone/calendar systems, production cutoff policy,
backend validation, Profile/API freeze, MCP, canonical adoption, and partial
Reference migration remain outside this result.
