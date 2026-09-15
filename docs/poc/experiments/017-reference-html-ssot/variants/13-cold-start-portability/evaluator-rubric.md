# Cold-start evaluator rubric

This rubric is evaluator-only and was recorded before the fresh-agent outputs
were inspected. It is not part of either agent's packet.

## Test A acceptance

- The result is a human-readable, directly operable shell/search Reference,
  not a data-processing application, framework project, DSL, or metadata
  catalog.
- The shell and search responsibilities are complete enough to review their
  bounded state flow. Harness controls are excluded from product observation.
- Initial, Results, and Empty are represented; filters, search/clear, result
  grid, primary action placement, lightweight pagination, navigation filtering,
  navigation state, theme, user menu, and focus paths are observable.
- Destinations and unspecified business actions are not completed with modal,
  routing, approval, or persistence behavior.
- Reference Conformance passes. A material negative fails without weakening the
  comparator.
- The independent Target uses different business content and fixtures and does
  not share Reference CSS, class names, local IDs, DOM grouping, or JavaScript
  state implementation. Comparative validation passes for required observation
  paths.
- Explicit identity is selective; the Target does not receive annotations that
  exist only to mirror fixture text, DOM order, or incidental structure.
- CLI/Core and long-lived knowledge remain unchanged unless a generally
  reproducible defect is demonstrated.

## Test B semantic oracle

Byte, DOM, local-ID, class, and exact CSS equality are not required. The replay
must reproduce the following human-approved operation responsibilities.

### Single date

- one editable field group with integrated Clear and calendar affordances;
- `yyyy-mm-dd` display, `yyyymmdd` normalization, invalid/future rejection and
  correction;
- input focus opens without stealing typing focus; input `Tab`, Escape, visible
  Close, toggle, and outside pointer provide coherent dismissal;
- Clear/calendar remain named native actions but are not extra page Tab stops;
- a complete six-week calendar, month and year movement, disabled future dates,
  and a visible availability explanation;
- Sunday/Saturday orientation colors are supplemental and lose precedence to
  selected/disabled states;
- compact field/popup proportions suitable for the fixed-format value;
- the current-date cue agrees with the fixed 2026-08-14 fixture and is distinct
  from selection;
- no ambiguous navigation-only `Today` action is invented without need.

### Date range

- Start and End are independently labeled editable boundaries using the
  locally calibrated Single-date control model;
- selecting the active boundary is a one-click completion that closes the
  popup; it does not silently switch to a two-click opposite-boundary mode;
- Start-only and End-only are valid observable states;
- a completed range has distinguishable endpoints and connected interior;
  unavailable dates are muted/disabled without range-like fill;
- opposite-boundary ordering constrains calendar choice and is explained near
  the control; manual unreal/future/reversed values reject and recover;
- clearing one side preserves the other and allows the operation to resume;
- focus, open/close, navigation, pointer, and keyboard paths remain coherent.

## Test C knowledge oracle

Correctly generalized candidates should express observation/review boundaries,
not one DatePicker design. Expected reusable candidates include:

- visible control model, completion behavior, valid partial states, focus
  return, and opposing visual states should tell one coherent story;
- review initial activation and every important exit/recovery path, not only
  the final selected state;
- compare valid partial, invalid, correction, selected, unavailable, and focus
  states when they are part of the responsibility;
- cross-check fixed fixtures against rendered semantic meaning;
- keep task-proportionate control density in AI self-review;
- feed human correction into scenarios, negatives, and self-review;
- human calibration is most valuable for a new family or materially new
  operation model.

Expected local decisions include exact formats, future-date cutoff, week
colors/convention, widths, target sizes, month/year header layout, action order,
focus-open choice, single page Tab stop, absence of a Today action, independent
Start/End, one-click boundary completion, open-ended periods, exact range band,
and exact availability/error wording.

Classification:

- correctly generalized: reusable observation principle with no product rule;
- correctly local: product or DatePicker choice deliberately not generalized;
- over-generalized: any local choice promoted to a universal/library rule;
- under-generalized: an expected reusable observation principle omitted.

## Harness separation

The known focus-sensitive all-family Evidence Harness result is not part of the
fresh artifacts' semantic acceptance. Direct fresh conformance/comparison is
required. A failure attributable only to the already recorded Harness focus
variation is reported separately and must not trigger retry/tolerance/severity
changes.

