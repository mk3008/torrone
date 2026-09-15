# Fresh Agent D report: Human Calibration replay boundary

## Attainment

**done** — The isolated retest produced adjusted Single date and Date range
References, passed Reference Conformance, captured browser snapshots, validated
an independently structured vendor-insurance Target, and proved a material
completion-state negative. All authored and generated files are contained below
`test-d/`. CLI/Core, accepted inputs, dependencies, authority, and long-lived
knowledge were not changed.

The result demonstrates observable transfer for this fixture. It does not claim
that the local operation model is the unseen approved implementation or that
browser comparison establishes design correctness.

## Outputs

- `reference-single.html` — Maintenance log date Reference.
- `reference-range.html` — Compliance activity period Reference.
- `target/index.html`, `target/target.css`, `target/target.js` — independent
  vendor insurance coverage period Target.
- `target-overrides.json` — Target-only substitutions for the different fixture.
- `negative/index.html` — intentional completion defect using the Target
  implementation plus a bounded mutation.
- `evidence/single.preflight.json` and `evidence/range.preflight.json` —
  Reference Conformance reports.
- `evidence/single.snapshot.json` and `evidence/range.snapshot.json` — browser
  baselines.
- `evidence/target.report.json` — positive comparative validation.
- `evidence/negative-completion.report.json` — expected-failing negative.
- `evidence/*-snapshots/` — 12 Single, 18 Range, 18 Target, and 18 Negative PNGs.

## Explicit correction outcomes

### Single date

- The editable text input is the primary control. It opens the calendar on
  focus, accepts `yyyy-mm-dd` and `yyyymmdd`, normalizes compact input, and
  rejects invalid or future values with `aria-invalid="true"` and a visible
  message.
- Escape closes the calendar and retains input focus. Tab departure closes it
  without adding a product action as a focus destination. Pointer interaction
  with a disabled in-widget future date does not accidentally trigger the
  focus-departure close behavior.
- The calendar shows the full fixed month rather than one week. The fixed review
  date `2026-10-20` is the actual underlined today value, and `2026-10-21`
  onward is disabled.
- Sunday and Saturday have opposing text colors. Disabled future days use a
  diagonal neutral treatment that remains distinct from selection.
- Clear and calendar icon affordances are integrated with the input and have a
  separator. The typing area is sized for a date rather than stretched to the
  card width. A visual review caught and fixed an initial value-clipping defect.
- The open calendar is 316 px wide and visually compact in the 1440 x 900
  evidence. This is a local sample size, not a researched universal value.

### Date range

- Start and end are independently operable boundaries. Focusing either opens a
  shared calendar for that named boundary; one date click completes that
  boundary and closes the calendar. There is no unexplained two-click draft in
  one popup.
- Start-only, end-only, complete, reversed-invalid, clear-back-to-partial,
  keyboard close, and future-unavailable states are directly replayable.
- Open start or end is treated as a valid partial state in this fixture.
- Completed boundaries use the dark accent, the inclusive middle uses a solid
  light-blue fill, and unavailable future dates use neutral diagonal striping.
  Hover cannot overwrite a selected boundary.

## Suggested hypotheses not promoted to requirements

The feedback's alternative-pattern suggestions were not treated as accepted
authority:

- Month/year navigation was not added merely because it was suggested as an
  example response to the one-week draft.
- A “Today” or “return to current month” action was not added. The sample never
  leaves the fixed current month, so that action would add an unneeded mode.
- The hotel-stay pattern was not assumed to be the selected Date range model.
  The smallest correction was to make each active boundary complete in one
  click while preserving manual entry and valid partial states.
- No claim about a generally standard calendar size was made. Web research was
  explicitly outside this retest's allowed inputs.
- A calendar icon and clear affordance remain local, redundant pointer
  conveniences; their presence is not proposed as a general accessibility rule.

## Unresolved product decisions

These are explicitly **unresolved**, not answered by Conformance or Target
validation:

1. Whether a production Single date control should expose the redundant clear
   button in the Tab sequence. This sample keeps clear and calendar icon buttons
   out of sequential Tab order because the input itself supports keyboard clear
   and opens the calendar; a product accessibility review may choose otherwise.
2. Whether a production calendar needs month/year navigation and a “return to
   current month” action. The fixed one-month responsibility cannot decide it.
3. Whether the actual Compliance product should use two endpoint inputs, one
   combined input, or a hotel-style staged overlay. The feedback identified the
   ambiguity but did not select one model.
4. Whether open start and open end boundaries are valid business states for the
   real Compliance and vendor-insurance products. They are local fixtures used
   to make partial-state behavior observable.
5. Whether 316 px is an appropriate calendar width in other layouts,
   viewports, locales, or typography systems.

## Reusable observation principles

- Review the first activation, valid partial states, completion close behavior,
  focus return/departure, validation, availability, and opposing visual states
  as one coherent operation model.
- A disabled in-widget target must not be mistaken for focus departure merely
  because it cannot become `document.activeElement`.
- An opposing state such as hover must not erase a stronger selected state, and
  an unavailable-range treatment must remain distinguishable from an included
  range.
- Suggested interface patterns remain hypotheses until product requirements or
  human selection resolve them. The smallest coherent correction is preferable
  to inventing modes or completion actions.
- Running scenarios plus negative evidence are more useful than a second file of
  expected state. Human approval remains separate from Conformance and
  comparison.

These principles are proposals from this bounded replay, not a new Profile,
Manifest rule, or Consumer contract.

## Local choices

- Fixed review date and future boundary: `2026-10-20`.
- Single selection fixture: `2026-10-05`.
- Reference range fixture: `2026-10-05` through `2026-10-16`.
- Target fixture: `2026-10-03` through `2026-10-18`.
- `yyyy-mm-dd` is the visible format, and eight digits are accepted input.
- Product scenarios do not depend on a harness-only focus destination. The only
  harness nodes are noninteractive fixture labels outside product observation.

## Verification results

Final runs used installed Chrome
`C:\Program Files\Google\Chrome\Application\chrome.exe` at a 1440 x 900
viewport. `REFERENCE_UI_DEBUG=1` only emitted connection progress. Earlier
concurrent browser launches and two isolated launches timed out at
`Page.enable`; the final serialized runs below completed and produced the cited
reports.

| Check | Result |
| --- | --- |
| Single Reference Conformance | pass; 0 errors, 0 signatures, 12 states |
| Single snapshot | 10 observed elements, 7 scenarios, 0 accessibility issues, 12 PNGs |
| Range Reference Conformance | pass; 0 errors, 0 signatures, 18 states |
| Range snapshot | 8 observed elements, 8 scenarios, 0 accessibility issues, 18 PNGs |
| Target comparison | pass; 0 errors, 0 signatures, 0 diagnostics, 18 PNGs |
| Completion negative | expected fail; 24 errors, 8 signatures, 0 diagnostics, 18 PNGs |
| Runtime isolation | 0 external requests and 0 console errors in both baselines; Negative also had 0 failed/external requests and 0 console errors |
| Target JavaScript syntax | `node --check target/target.js` passed |

Observed state assertions from the final JSON:

- Single open: dialog visible, input expanded, `date-input` active.
- Single Escape: dialog hidden, input collapsed, `date-input` active.
- Single Tab departure: dialog hidden, input collapsed, no product `activeRef`.
- Single invalid: input `aria-invalid="true"`, dialog visible, clear hidden.
- Single future click: future key disabled and visible; dialog remains visible.
- Range start-only: start boundary pressed, end absent, dialog hidden.
- Range end-only: end boundary pressed, start absent, dialog hidden.
- Range complete: both boundaries pressed, middle background
  `rgb(219, 238, 255)`, dialog hidden.
- Reversed range: end input `aria-invalid="true"`, dialog visible.
- Range future click: future key disabled and visible; dialog remains visible.

The Negative reopens the dialog after a complete range. Its 8 signatures are:
the end input's expanded state; visibility of the four keyed calendar dates;
and dialog visibility, hidden attribute, and display. Each occurs in exactly
three completion states (`manual range completion` step 2,
`one-click boundary selection` step 4, and `clear one boundary returns to
partial` step 2), yielding 24 errors. Partial states do not fail.

### Commands

The paths below are relative to the repository root; `<base>` denotes
`docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-d`.

```powershell
$env:REFERENCE_UI_DEBUG='1'; node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs preflight <base>/reference-single.html --out <base>/evidence/single.preflight.json --browser 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_DEBUG='1'; node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot <base>/reference-single.html --out <base>/evidence/single.snapshot.json --artifacts <base>/evidence/single-snapshots --browser 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_DEBUG='1'; node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs preflight <base>/reference-range.html --out <base>/evidence/range.preflight.json --browser 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_DEBUG='1'; node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot <base>/reference-range.html --out <base>/evidence/range.snapshot.json --artifacts <base>/evidence/range-snapshots --browser 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_DEBUG='1'; node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify <base>/target/index.html --baseline <base>/evidence/range.snapshot.json --scenario-overrides <base>/target-overrides.json --out <base>/evidence/target.report.json --artifacts <base>/evidence/target-snapshots --browser 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_DEBUG='1'; node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify <base>/negative/index.html --root <base> --baseline <base>/evidence/range.snapshot.json --scenario-overrides <base>/target-overrides.json --out <base>/evidence/negative-completion.report.json --artifacts <base>/evidence/negative-completion-snapshots --browser 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node --check <base>/target/target.js
```

The Negative command's exit code `1` is the expected verification difference.
All other final commands exited `0`.

## Identity and Consumer annotation counts

| Artifact | Explicit `data-ref` identities | Natural semantic identities | Observed total |
| --- | ---: | ---: | ---: |
| Single Reference | 9 | 1 unique dialog | 10 |
| Range Reference | 7 | 1 unique dialog | 8 |
| Range Target | 7 | 1 unique dialog | 8 |

The Target contains exactly 7 transferable `data-ref` annotations, 1
`data-reference-harness` boundary on a noninteractive fixture label, and no
scenario contract or other comparison metadata. Its product ARIA is required by
the UI's own relationships and is not counted as Consumer verification
annotation.

## Source metrics and independence audit

| Source | Lines | Bytes | SHA-256 |
| --- | ---: | ---: | --- |
| `reference-single.html` | 232 | 15,942 | `42a05e36b27e52ffb487d50438f913440c505087fbbc5a5238807babf3467aa1` |
| `reference-range.html` | 227 | 17,042 | `e9211b3924a15ad39efcffddf0e98001cc2f81ea4eeba93772ef0614c83c754b` |
| `target/index.html` | 46 | 4,685 | `6a86e15cf6d8f98d6b1ce655ae00ad2ad26665f7e26db6b6ef7f3ce18093426d` |
| `target/target.css` | 93 | 3,225 | `7fade6298db40c8d766dffdc38d6101a623f798026774b44266f8f48651e6d8c` |
| `target/target.js` | 149 | 6,672 | `8ab9ac11cd49edb83957b7ad46e832d5ea6442b5fe3a5de6cafcb5600a399040` |
| `negative/index.html` | 52 | 5,313 | `070395604da01a1dd43902eaae6065db351428b726438f467c67f0ae2d715985` |
| `target-overrides.json` | 12 | 680 | `5cf56cca80b8e091f5e1f9b0563b1fff1f224f1b0ad77da95713baaaaeb70c35` |

The independence audit inspected organization rather than relying on hashes or
renaming alone:

- Reference Range is a single inline document using root tokens, external
  labels, sibling boundary wrappers, free functions, and listeners attached per
  control.
- Target is split into HTML/CSS/JS, nests each input in its label, uses an
  article/header structure, direct CSS values with Target-scoped selectors, and
  a `CoveragePeriodEditor` class with root event delegation.
- Reference Range has 17 unique markup class tokens and 7 local IDs; Target has
  13 class tokens and 5 local IDs. Their component class-token intersection and
  local-ID intersection are both empty. This is evidence for this audit, not a
  proposed similarity threshold.
- The only transferred source identities are the 7 explicit observation keys.
  Required computed values reproduce, while product wording, date fixtures,
  DOM grouping, classes, IDs, CSS organization, and JavaScript organization are
  independent.

Conclusion: the Target does not systemically rename the Reference's CSS or
source organization.

## Two-cycle self-review

### Cycle 1

Conformance and screenshot review found: ambiguous semantic identity caused by
putting `aria-pressed="false"` on every unselected day; insufficient disabled-day
contrast; clipped Single input value/message; and hover overriding a selected
boundary when the Negative kept the popup visible. All were fixed in scope and
all evidence was regenerated.

### Cycle 2

State extraction found disabled future-day clicks were being mistaken for
focus departure because disabled buttons do not become active. Pointer-within-
widget handling was added independently to Reference and Target. Final evidence
was regenerated again. Conformance, positive comparison, exact state checks,
visual review, JavaScript syntax, runtime isolation, negative localization, and
source-independence inspection then produced the final results above. No
remaining in-scope implementation defect was found.
