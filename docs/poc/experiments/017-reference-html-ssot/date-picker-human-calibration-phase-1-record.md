# DatePicker Human Calibration Phase 1 Record

## Status

`done` — the human-calibration baseline and Review Pack are ready. Phase 2 has not started and no final Gate classification is made.

## Baseline used

- `review/date-picker-human-calibration/baseline/single-date.html`
- `review/date-picker-human-calibration/baseline/date-range.html`

They are minimal derivatives of the frozen Composite UI candidates. The accepted Reference, Composite candidates, fixed evidence, CLI, and Core were not edited.

## Objective pre-review adjustments

Only issues needed to make the AI draft coherent and reviewable were changed:

1. Trigger activation now closes an open picker as well as opening a closed picker, matching `aria-expanded` and the expected open/close review.
2. `aria-selected` was removed from native day buttons because that state is unsupported for their native role. Selected days alone receive supported `aria-pressed="true"` state.
3. All dates received full accessible date labels, and September 14 became a fixed, labelled today fixture so today/selected/focus can be reviewed separately.
4. A small toggle scenario was added to each existing scenario block so open-to-close behavior is part of mechanical evidence.
5. The review-only label is explicitly marked with `data-reference-harness`; no scenario-selector UI was needed.

The source delta from each Composite candidate was small: Single date `15` added / `13` removed lines; Date range `16` added / `14` removed lines. Explicit product identity remained at `5` Single date and `7` Date range `data-ref` occurrences; no identity was added for the today fixture, and the origin's runtime `data-range-role` annotation was preserved unchanged.

## Human-reviewable states

- Single date: closed, opened, keyboard focus before selection, pointer/keyboard selection, selected value, clear, and reselection.
- Date range: closed, opened, range start, intermediate instruction/state, pointer/keyboard completion, completed value, clear, and reselection.
- Both: visible distinction among fixed today, selected state, and keyboard focus.

## Excluded decisions

Month navigation, reverse-range behavior, locale, timezone, disabled dates, responsive and other-browser behavior, real assistive-technology testing, canonical adoption, Target transfer, observation-point classification, Consumer identity changes, `aria-activedescendant`, CLI/Core changes, Profile/schema work, MCP, and Manifest migration remain outside Phase 1.

## Mechanical result and freeze method

The fixed run at `output/date-picker-human-calibration/20260814T003809Z/` passed existing CLI/Core conformance and snapshot observation for `27` total states and `8` scenarios with zero console errors, external requests, failed requests, bounded accessibility issues, duplicate keys, or semantic ambiguities. A separate real-browser spot check reproduced the key Single and Range flows with zero page console errors.

The baseline is frozen by SHA-256 constants in `verify-date-picker-human-calibration-phase1.ps1` and a generated `baseline-manifest.json`. The verifier also protects origin files, accepted Reference, CLI/Core, historical provenance, and the fixed Composite evidence tree before and after the run.

## Human decision requested

Would you want to keep each baseline DatePicker as an example for your own business application? If not, what would you change?

No Reference correction, Target transfer, observation extraction, long-lived knowledge promotion, or Gate classification will occur until that feedback is received.
