# Test B agent report

## Goal

Replay the supplied human calibration from the AI drafts without seeing an
approved answer, produce adjusted Single date and Date range References, prove
their observable contracts, and transfer the Date range contract to an
independently structured Consumer Target.

## Attainment Status

`done`

The replay deliverables and repository checks are complete. Human design
acceptance, responsive behavior, other browsers, and real assistive-technology
behavior remain explicitly unconfirmed.

## Outcome

The test directory now contains two directly operable, scenario-bearing
References and a content-different Date range Target. The References cover
manual and calendar input, dismissal and focus behavior, completion and valid
partial states, validation, availability, navigation, today, and opposing
visual states. The Target reproduces those observations with different
business content, fixture input vocabulary, DOM grouping, classes, local IDs,
state organization, and CSS selectors.

## Why It Matters

The replay demonstrates that the human feedback can be reconstructed from the
allowed inputs as an observable operation model rather than as hidden-answer
or DOM identity matching. Reviewers can inspect the running sources, raw JSON,
and state screenshots, and can see six isolated regressions fail for the
intended reason.

## Now / Next

- Now: the replay is ready for reviewer inspection inside `test-b`.
- Next: a human may accept, reject, or further calibrate the local operation
  choices. No generated Run is promoted automatically.

## Code Changes

- [`references/single-date.html`](references/single-date.html): calibrated
  Single date Reference.
- [`references/date-range.html`](references/date-range.html): calibrated Date
  range Reference based on the Single date interaction model.
- [`target/maintenance-window.html`](target/maintenance-window.html):
  independent Consumer Target for a maintenance-history business context.
- [`target/scenario-overrides.json`](target/scenario-overrides.json): alternate
  formatted input fixtures for Target replay; no action or expected-state
  overrides.
- [`tools/check-html.cjs`](tools/check-html.cjs): syntax/contract parser used by
  verification.
- [`tools/make-negatives.cjs`](tools/make-negatives.cjs): deterministic producer
  for six single-mutation negative Targets.
- [`tools/source-metrics.cjs`](tools/source-metrics.cjs): deterministic source
  and annotation metrics producer.
- `negative/*.html`: generated single-mutation Targets. They are evidence
  derivatives, not maintained expected-state sources.
- `evidence/*.json` and evidence PNG directories: raw Conformance, snapshot,
  comparison, negative, source-metric, and screenshot evidence.

No CLI or Core source was modified. No dependencies, framework, network/data
layer, canonical family, or long-lived knowledge file was added.

## Actions Taken

1. Converted the five Single date feedback rounds into an integrated text
   entry, clear action, divider, calendar action, compact calendar, true
   2026-08-14 today marker, month/year movement, Go to today, unavailable future
   dates, manual normalization, validation, Tab/Escape dismissal, and focus
   return behavior.
2. Reused that local interaction model for a one-entry Date range control with
   explicit Start/End phases, an explicit Apply responsibility, complete and
   open-boundary partial states, and clearly different selected-span and
   unavailable treatments.
3. Added scenarios for focus, dismissal, Enter and Tab commit, pointer and
   keyboard completion, start-only and end-only partials, invalid/reversed and
   unavailable input, range visualization, navigation/today, and clear.
4. Produced and verified a differently structured maintenance-history Target.
5. Generated and ran six isolated negative comparisons, then reran the
   byte-unmodified Target as a post-negative control.
6. Performed two self-review cycles and fixed all in-scope defects found.

## Product-local Date range choices

These choices belong to this sample and are not proposed as universal
Reference requirements:

- one combined `start / end` text entry rather than two text boxes;
- `Start date` and `End date` phase buttons inside the popup;
- an explicit `Apply dates` action, including for partial completion;
- either boundary may be open;
- future dates are unavailable for this fixture;
- Sunday red, Saturday blue, a 310 px popup, exact colors, exact spacing, and
  the clear/divider/calendar order;
- `Go to today` returns the calendar view and focus to 2026-08-14 without
  selecting it;
- the clear button remains a keyboard-reachable action.

## Candidates for reuse across References

These are bounded proposals from this replay, not promoted rules:

- manual entry and popup selection should commit through one validation and
  normalization model;
- the first activation, valid intermediate states, completion, cancellation,
  and focus return should form one coherent operation story;
- when a selection does not immediately complete an operation, expose the next
  responsibility or an explicit completion action;
- valid partial business states should be presented as intentional states, not
  as malformed complete values;
- selected and unavailable states should differ through more than a subtle
  shade change;
- a today marker must identify the actual configured fixture date, while a
  return-to-today action should have a separately testable responsibility;
- scenario and negative evidence should retain focus, validation, completion,
  partial, availability, and visual responsibilities after human calibration.

## Scenario evidence map

| Responsibility | Single date evidence | Date range evidence |
| --- | --- | --- |
| Focus/open/dismiss | `input focus and tab dismissal`, `escape returns to invoker` | `range input focus and tab dismissal`, `range escape dismissal` |
| Tab commit | `compact input tab commit` | `compact range tab commit` |
| Completion | compact manual, pointer, keyboard | complete pointer, compact manual |
| Partial | not applicable | start-only, end-only, manual start-only, manual end-only |
| Validation | invalid calendar date | reversed range, invalid range date |
| Availability | unavailable manual date plus striped disabled days | unavailable range date plus `range-unavailable-day` |
| Visual state | selected day, today underline, weekday color | endpoints, selected span, today underline, striped unavailable days |
| Navigation/recovery | month movement and today return, clear | month movement and today return, clear |

The raw snapshots contain initial state plus every post-action state. Screenshot
directories use the scenario names shown above.

## Verification Methods

Commands were run from the repository root with explicit Edge lineage:

```powershell
$env:REFERENCE_UI_DEBUG='1'
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs preflight docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/single-date.html --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/single-date.preflight.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/single-date-preflight --browser 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs preflight docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/date-range.html --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/date-range.preflight.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/date-range-preflight --browser 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/single-date.html --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/single-date.snapshot.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/single-date-snapshot --browser 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/date-range.html --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/date-range.snapshot.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/date-range-snapshot --browser 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/target/maintenance-window.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/date-range.snapshot.json --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/target/scenario-overrides.json --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/target.verify.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/target-verify --browser 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
node docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/tools/make-negatives.cjs docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/target/maintenance-window.html docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/negative
node docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/tools/check-html.cjs docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/single-date.html docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/date-range.html docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/target/maintenance-window.html
node docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/tools/source-metrics.cjs docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/evidence/source-metrics.json docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/single-date.html docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/references/date-range.html docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-b/target/maintenance-window.html
```

Each negative used the same `verify` command, baseline, overrides, and browser,
with only `negative/<name>-regressed.html` and its output report changed. The
post-negative control was written to
[`evidence/target.control-after-negatives.verify.json`](evidence/target.control-after-negatives.verify.json).

## Repository Evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Single Reference Conformance | pass; 0 errors, 0 warnings, 28 checked states | [`evidence/single-date.preflight.json`](evidence/single-date.preflight.json) |
| Date range Reference Conformance | pass; 0 errors, 0 warnings, 48 checked states | [`evidence/date-range.preflight.json`](evidence/date-range.preflight.json) |
| Single snapshot | 16 observed elements, 10 scenarios, 0 initial accessibility issues | [`evidence/single-date.snapshot.json`](evidence/single-date.snapshot.json) |
| Date range snapshot | 22 observed elements, 15 scenarios, 0 initial accessibility issues | [`evidence/date-range.snapshot.json`](evidence/date-range.snapshot.json) |
| Independent Target comparison | pass; 0 errors, 0 error signatures | [`evidence/target.verify.json`](evidence/target.verify.json) |
| Post-negative unmutated control | pass; 0 errors, 0 error signatures | [`evidence/target.control-after-negatives.verify.json`](evidence/target.control-after-negatives.verify.json) |
| HTML script/contract syntax | pass for both References and Target | `tools/check-html.cjs` command output |
| Scenario overrides JSON | parsed successfully | [`target/scenario-overrides.json`](target/scenario-overrides.json) |
| Source metrics | generated successfully | [`evidence/source-metrics.json`](evidence/source-metrics.json) |

The successful Target report contains 96 informational diagnostics only: 48
extra `semantic:role:form` observations from the Target's different grouping
and 48 `semantic:role:main.box.height` geometry observations from different
business content. There are no other diagnostics and no errors. These are not
suppressed or relabeled as equality.

Key reviewer screenshots include:

- `evidence/single-date-snapshot/compact-input-tab-commit-03.png`;
- `evidence/single-date-snapshot/invalid-calendar-date-03.png`;
- `evidence/date-range-snapshot/range-visual-before-apply-03.png`;
- `evidence/date-range-snapshot/reversed-range-validation-03.png`;
- `evidence/target-verify/range-visual-before-apply-03.png`;
- `evidence/target-verify/compact-range-tab-commit-03.png`.

## Negative Evidence

All negative reports have status `fail` as required. Counts are complete raw
comparison counts, not quality scores.

| Isolated mutation | Errors | Signatures | Required detected path(s) |
| --- | ---: | ---: | --- |
| Focus color | 3 | 2 | `range-clear.styles.outlineColor`, `range-trigger.styles.outlineColor` |
| Completion leaves picker open | 98 | 14 | `range-picker.attributes.hidden`, `range-picker.visible`, `range-trigger.attributes.aria-expanded` |
| Partial completion disabled | 99 | 27 | `range-apply.attributes.disabled`, focus, picker visibility, clear visibility |
| Validation removed | 30 | 10 | `range-input.attributes.aria-invalid`, `range-message.visible`, `range-message.attributes.hidden` |
| Availability enabled | 180 | 5 | `range-unavailable-day.attributes.disabled`, background/color/cursor/outline styles |
| Selected-span background | 3 | 1 | `range-middle-day.styles.backgroundColor` |

Raw reports are `evidence/negative-<name>.verify.json`. The generator asserts
that every mutation source string exists before writing an output, preventing
silent no-op negatives.

## Source and Annotation Metrics

| Source | Bytes | Lines | CSS bytes | JS bytes | Static `data-ref` keys | Logical explicit keys | Harness annotations | Scenarios / steps |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Single Reference | 17,976 | 277 | 5,160 | 7,450 | 12 | 15 | 1 | 10 / 27 |
| Date range Reference | 24,323 | 309 | 6,446 | 10,565 | 16 | 21 | 1 | 15 / 47 |
| Consumer Target | 22,664 | 250 | 6,719 | 11,544 | 16 | 21 | 0 | 0 / 0 |

`Logical explicit keys` is the union of static `data-ref` attributes and the
calendar keys assigned during element generation. The Target therefore has 21
Consumer identity annotations: 16 static and 5 generated. The running Date
range snapshot contains those 21 explicit elements plus one naturally unique
`main` semantic identity. The Target has no harness or scenario annotation.

## Independent Target evidence

- Business content: audit coverage versus maintenance-history export for asset
  CL-204 / Cooling loop.
- Raw input fixtures: the Reference scenarios use compact numeric dates; six
  Target overrides use dashed ISO input and normalize to the same committed
  state.
- DOM grouping: Reference content is direct under `main`; Target adds an intro
  section, asset aside, form, header, and footer.
- Classes: Reference uses `range-control`, `picker`, `day-cell`, and related
  names; Target uses `window-widget`, `window-flyout`, `calendar-number`, and
  different surrounding classes.
- Local IDs: `audit-range`, `range-error`, and `range-picker` versus
  `maintenance-window-input`, `maintenance-range-problem`, and
  `maintenance-window-calendar`.
- JavaScript: Reference closure variables and functions versus a
  `MaintenanceWindowPicker` class with an encapsulated state object.
- CSS: different variable names, selectors, and organization with equivalent
  observed results on explicit identities.

The comparison proves observable transfer only. It does not prove that either
implementation is universally correct.

## Supplementary Evidence

Manual inspection of the repository PNGs confirmed that:

- validation messages are visible rather than hidden behind the popup;
- Tab commits compact input, closes the popup, and leaves a complete focus
  ring on the next clear action;
- 2026-08-14 is the underlined today fixture after month return;
- endpoints use a solid treatment, the selected span a pale continuous
  treatment, and unavailable dates a striped plus line-through treatment;
- the 310 px popup is materially smaller than the original draft and the input
  shells no longer leave unnecessary trailing width.

This visual interpretation still requires human review; the PNGs themselves
remain repository evidence.

## Self-review Cycle 1: Coarse Defect Extraction

### Potential Blockers

None remain. The following in-scope blocker candidates were found and fixed:

- completion focus initially reopened the popup;
- Tab dismissal initially skipped manual commit and validation;
- the today key initially collided with the end-day key;
- validation text initially sat behind the absolutely positioned popup;
- hover specificity initially removed the selected background while retaining
  white selected text;
- disabled and outside-month date text initially failed Conformance contrast;
- the integrated field initially retained unnecessary trailing width.

### Potential Non-Blockers

- 96 Target information diagnostics are retained and explained above.
- Generated negative HTML duplicates the Target bytes, but the copies are
  deterministic evidence derivatives produced from one checked source.
- Early browser launches intermittently timed out before `Page.enable`; final
  evidence uses explicit Edge `151.0.4129.78` and all required commands
  completed.

### Evidence Weaknesses

- only the fixed 1440 x 900 Edge viewport is observed;
- no real assistive technology, responsive viewport, or second browser is
  tested;
- no external convention or trend research was performed because the task
  forbade web browsing;
- comparative pass cannot detect a defect shared by Reference and Target.

### Claim Overreach

The evidence does not support calling this control a general standard,
production-ready, fully accessible, canonical, trend-validated, or human
approved. Those claims are not made.

## Self-review Cycle 2: Blocker Triage and Shape Check

### Merge Blockers

None for this isolated replay handoff.

### Non-Blockers

- human aesthetic and operation acceptance remains independent;
- the clear button's Tab stop and the explicit Apply model are local choices;
- informational geometry and extra-form observations remain in the raw report.

### Evidence Shape Status

`pass`: a reviewer can reproduce Conformance, snapshots, the independent
comparison, six negative failures, and the post-negative control from files in
this directory. Raw JSON and PNGs are separate from this narrative.

### Reporting Shape Status

`pass`: proven, partial, and unconfirmed claims are separated; repository and
supplementary evidence are separate; no failure count is presented as a design
score.

### Ready For PR?

`yes` for reviewer handoff. No staging, commit, push, or PR action was performed.

### Required Questions

- Proven: both Reference Conformance checks, every declared scenario execution,
  independent Target comparison, six required negative detections, syntax and
  metrics generation, and post-negative control.
- Partially proven: broader accessibility and portability beyond the observed
  Edge viewport; generalized knowledge candidates.
- Human-dependent: design acceptance, whether the clear action should remain a
  Tab stop, and whether explicit Apply is the preferred product completion
  model.
- Misleading wording to avoid: “general standard,” “production ready,” “fully
  accessible,” “canonical,” “trend validated,” and “human approved.”

## Review Triage

- Blockers: none in the requested replay scope.
- Non-blockers: 96 retained information diagnostics, fixed browser/viewport,
  and deterministic generated negative copies.
- Human review gate: required before treating either Reference as accepted
  design guidance.

## Open Questions

- `UNCONFIRMED`: Is a keyboard-reachable clear button preferred for the
  consuming product, or should clearing be represented only through text-entry
  editing?
- `UNCONFIRMED`: Does the consuming product prefer explicit Apply for complete
  and partial ranges, or a different completion model?
- `UNCONFIRMED`: Should open start/end boundaries and future-date unavailability
  apply to other products? They remain local here.
- `UNCONFIRMED`: How should this model behave responsively and with real screen
  readers across browsers?
- `UNCONFIRMED`: Does a human reviewer accept the visual size and operation
  model? Conformance and comparison do not answer that question.
