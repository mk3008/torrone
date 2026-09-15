# Test B oracle evaluation

This evaluation was performed only after Fresh Agent B completed. It compares
meaning and observation responsibility against the frozen human-approved
Reference and Phase 2 classification; it does not require byte, DOM, class,
local-ID, or exact CSS equality.

## Result

`partial`

The replay recovered most Single-date responsibilities, valid open-boundary
range states, opposing-state distinction, strong scenarios/negatives, and a
transferable independent Target. It did not recover the human-approved Date
range completion model.

## Correct semantic reproduction

- editable date entry, dashed display and compact input normalization;
- invalid and unavailable input rejection with correction;
- focus-open, Tab/Escape dismissal, calendar navigation, a complete month,
  disabled future dates, weekend orientation, and correct 2026-08-14 today;
- valid Start-only and End-only range states;
- completed-range endpoint/interior treatment that is clearly different from
  striped, disabled unavailable dates;
- focus, completion, partial, validation, availability, and visual negative
  responsibilities;
- content/fixture/DOM/class/local-ID/state/JavaScript/CSS-independent Target
  transfer for the replayed model.

## Material meaning differences from the human-approved oracle

| Responsibility | Human-approved oracle | Fresh replay | Evaluation |
| --- | --- | --- | --- |
| range field model | directly labeled Start and End inputs | one combined range input | product meaning difference |
| pointer completion | one click completes the active boundary and closes | phase remains open and requires `Apply dates` | contradicts the explicit first-click concern |
| boundary operation | each visible field owns its picker operation | popup phase buttons own Start/End | new operation mode |
| partial completion | selecting one active field is complete | selecting one date then Apply is required | extra completion responsibility |
| Single page Tab path | field is the single normal Tab stop; inline actions excluded | Clear remains a Tab stop | plausible local alternative, but not oracle-equivalent |
| Today recovery | no extra action; close/reopen recovers | `Go to today` added | local alternative, not oracle-equivalent |
| surrounding product action | no new workflow action | `Continue` added to both samples | unspecified interaction invented for focus evidence |

The byte-independent Target pass proves transfer of Fresh Agent B's different
design. It cannot turn that design into a replay of the human-approved one.

## Knowledge elevation classification

### Correctly generalized

- initial activation, intermediate states, completion, cancellation, and focus
  return should form one coherent operation story;
- manual and popup input should share validation and normalization;
- valid partial states should appear intentional;
- selected and unavailable states need clearly opposing treatments;
- configured fixture meaning and current-date cues must agree;
- human correction should be retained in scenario and negative evidence.

### Correctly kept local

The report explicitly kept combined input, popup phase buttons, Apply,
open-boundary policy, future cutoff, weekend colors, popup size, Today action,
clear Tab stop, exact colors, and exact spacing local.

### Over-generalized

No product-local choice was promoted to long-lived knowledge. The candidates
remain proposals. The phrase about exposing an explicit completion action is
reasonable as a review prompt but would become over-generalized if treated as
permission to invent Apply in every incomplete operation.

### Under-generalized

- suggested human alternatives must be separated from accepted requirements;
- calibration replay should prefer the smallest change that resolves the
  explicit observation and should not invent workflow actions for evidence;
- if feedback leaves multiple coherent product models, exact human-approved
  replay is unresolved rather than mechanically proven;
- task-proportionate footprint was applied but not retained as a reusable
  self-review candidate.

## Cause classification

- Primary: Human Calibration protocol insufficient. The packet did not state
  that a human's suggested comparison pattern is a hypothesis rather than an
  accepted product decision.
- Secondary: Fresh Agent implementation/self-review error. The first-click
  complaint and the prohibition on invented interaction should have prevented
  the added Apply/Continue responsibilities even without an oracle.
- Task ambiguity: the supplied feedback allowed more than one coherent range
  field convention and did not include the unseen final acceptance artifact.
- Not a CLI/Core defect: Conformance, comparison, and negatives behaved as
  designed.
- Not Harness variability: direct accepted JSON was obtained.

