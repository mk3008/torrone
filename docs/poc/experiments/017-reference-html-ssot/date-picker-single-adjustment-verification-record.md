# Single Date Human Adjustment Verification Record

## Result

`done` — the fourth adjusted Single date candidate is mechanically healthy,
directly operable through the repository CLI/Core, and was accepted by the
human reviewer on 2026-08-14 as the local basis for the Date range adjustment.
Direct input-value comparison, Target transfer, and the final Gate result
remain unconfirmed.

Fixed evidence: `output/date-picker-human-calibration-adjustment/20260814T025953Z/`.

## Repository verification

Command:

```powershell
& 'docs/poc/experiments/017-reference-html-ssot/verify-date-picker-single-adjustment.ps1'
```

| Acceptance criterion | Verification method | Result |
| --- | --- | --- |
| Baselines, CLI, and Core remain fixed | before/after SHA-256 assertions | pass |
| Editable integrated input | source contract plus browser scenarios | pass |
| Input focus opens without stealing typing focus | explicit state assertion | pass |
| Input `Tab` departure closes before focus leaves | explicit Tab scenario | pass |
| Inline Clear and calendar actions are not page Tab stops | source contract | pass |
| Calendar icon, visible Close, and Escape paths | independent scenarios | pass |
| Complete month rendering | six-week grid source contract and screenshots | pass |
| Previous/next month movement | intermediate heading and focus assertions | pass |
| Previous/next year movement | intermediate heading and focus assertions | pass |
| Pointer and keyboard date selection | completion/focus/pressed-state assertions | pass |
| Disabled future-date representation | native disabled state and visual evidence | pass |
| Disabled pointer attempt is inert | selection, popup, and focus-context assertion | pass |
| `yyyymmdd` acceptance and normalization | fill/commit state plus live status | pass, but direct input value is not in Core snapshot |
| Impossible-date and future-date rejection | distinct alert and recovery states | pass |
| Clear and reselection | complete scenario | pass |
| Stable field action geometry | exact initial/focus/valid/invalid box comparison | pass |
| Clear/calendar separator | adjacent action geometry plus calendar action's one-pixel left border | pass |
| Compact field geometry | exact observed field-group width | pass: 336 CSS pixels |
| Compact popup geometry | exact width and bounded rendered height | pass: 336 × 335.5 CSS pixels |
| Weekend orientation colors | restrained source contract plus rendered screenshots | pass; not a first-class keyed Core comparison |
| Fixed current-date state | source fixture/semantics plus rendered underline | pass: 2026-08-14; unkeyed day is not a first-class Core element |
| Reopen recovery | source contract resets the view to selection or fixed today | pass; no new visible Today action |
| Existing CLI/Core conformance | preflight 35 states and snapshot 15 scenarios | pass |
| Runtime and bounded accessibility | console/network/a11y/identity assertions | 0 issues |
| Harness isolation | every observed state | 1 excluded DOM and AX harness root |

The adjusted candidate hash is
`254E3BA5B2ECD1E2A1677DD5C4FC8FA95224FCB605A74387300E47BFA40102B7`.
The verifier also fixes both Phase 1 baseline hashes and the unchanged CLI/Core
hashes.

## Rendered evidence

The repository CLI drove the installed Chromium browser and captured every
scenario step. Representative screenshots were inspected for the input focus
ring, popup placement, month/year controls, keyboard day focus, disabled dates,
and error states.

Direct control of the already-open in-app `file://` tab was rejected by the app
browser safety policy, so it is not counted as supplementary evidence. The
local HTML remains available for the human to reload and review directly.

The unchanged Phase 1 baselines were also rerun successfully at
`output/date-picker-human-calibration/20260814T025821Z/`: both preflights pass,
both four-scenario snapshots complete, and bounded accessibility reports zero
issues.

## Evidence limit

The current Core snapshot omits the editable input's DOM `value`. Normalization
is therefore proven by the live status and rendered field, but it is not yet a
first-class comparative property. Real assistive technology, other browsers,
responsive behavior, locale/timezone policy, backend validation, and Target
equivalence remain unconfirmed.

Weekend column colors are intentionally not backed by new per-column stable
keys. Their presence and state precedence are verified by a small source
contract and rendered evidence. Cross-implementation comparison of this visual
cue remains unconfirmed rather than increasing Reference metadata for this
review-only adjustment.

The current-day cell likewise has no explicit stable key. The source contract
asserts its `aria-current="date"` and accessible `today` name, while rendered
evidence shows the underline. Direct cross-implementation comparison of this
individual cell remains unconfirmed without adding metadata.
