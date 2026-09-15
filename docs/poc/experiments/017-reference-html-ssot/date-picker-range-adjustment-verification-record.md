# DatePicker Date Range Adjustment Verification Record

## Result

`done` for mechanical review readiness. Human acceptance and independent Target
transfer were subsequently `CONFIRMED` by Human Calibration Phase 2. Responsive
behavior and real assistive-technology behavior remain `UNCONFIRMED`.

Evidence run:
[`20260814T061156Z`](./output/date-picker-human-calibration-range-adjustment/20260814T061156Z/)

## Acceptance evidence

| Acceptance Criterion | Verification Method | Result | Repository Evidence | Supplementary Evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| Preserve fixed inputs | SHA-256 before and after verification | pass | manifest freezes baseline Range, accepted Single, adjusted Range, CLI, and Core | none | high |
| Two explicit editable boundaries | source contract plus rendered evidence | pass | two labeled combobox inputs; no `readonly` | candidate review screenshots | high |
| Manual input and rejection | compact, invalid, future, reversed, and corrected scenarios | pass | snapshot states and visible local errors | screenshots | high |
| One-click boundary completion | independent Start and End pointer scenarios | pass | each single date click commits only its owning field, closes the popup, and restores that input's focus | screenshots | high |
| Open-ended period | Start-only and End-only pointer plus manual scenarios | pass | either boundary may remain blank without invalid state | screenshots | high |
| Completed range | separate Start/End pointer and keyboard scenarios | pass | both commit `2026-08-10` through `2026-08-12` through two explicit field operations | none | high |
| Range/unavailable distinction | reopened completed range plus disabled-date scenarios | pass | interior is `rgb(215, 235, 255)`; unavailable day has transparent background and muted text | screenshots | high |
| Boundary error prevention | opposite-boundary calendar state plus manual rejection | pass | out-of-order dates are disabled and concise availability copy identifies the allowed interval | screenshots | high |
| Focus and dismissal | focus-open, Tab, trigger toggle, Escape, Close | pass | all final focus and `aria-expanded` states asserted | screenshots | high |
| Calendar context | source contract and navigation scenarios | pass | six-week grid, month/year navigation, today, weekend, future-disabled rules | screenshots | high |
| Bounded accessibility | unchanged CLI `preflight` over every state | pass: 0 issues across 59 states | [`date-range.preflight.json`](./output/date-picker-human-calibration-range-adjustment/20260814T061156Z/date-range.preflight.json) | real AT not run | medium-high |
| Runtime and network health | preflight and snapshot summaries | pass: console 0, external requests 0, failed requests 0 | preflight and snapshot JSON | none | high |
| Identity and harness boundary | every captured state | pass: 0 duplicate keys, 0 semantic ambiguities, one excluded harness root | [`date-range.snapshot.json`](./output/date-picker-human-calibration-range-adjustment/20260814T061156Z/date-range.snapshot.json) | none | high |
| Accepted Single regression | existing frozen verifier | pass: 35 states, 15 scenarios, 0 bounded a11y issues | [`20260814T060610Z`](./output/date-picker-human-calibration-adjustment/20260814T060610Z/) | none | high |
| Phase 1 baseline regression | existing frozen verifier | pass: Single 12 states and Range 15 states | [`20260814T060630Z`](./output/date-picker-human-calibration/20260814T060630Z/) | none | high |

## Commands

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-date-picker-range-adjustment.ps1
& docs/poc/experiments/017-reference-html-ssot/verify-date-picker-single-adjustment.ps1
& docs/poc/experiments/017-reference-html-ssot/verify-date-picker-human-calibration-phase1.ps1
```

## Evidence limits

The current Core does not directly capture text inputs' live DOM `value`, nor
does it record every unkeyed calendar cell's range relationship. Normalized
values are exposed through the live selection sentence, and three enabled dates
plus two disabled dates are keyed for interaction and style evidence. Source
assertions and screenshots cover the remaining visual relationship. This was
preferred over keying all 42 cells.

The evidence uses local headless Chrome. Responsive/collision behavior, other
browsers, real assistive technologies, locale, timezone, and production date
logic were not tested and must not be inferred.
