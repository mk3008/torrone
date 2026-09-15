# DatePicker Human Calibration Phase 1 Verification Record

## Result

`done` — the AI draft baseline is mechanically healthy and ready for human review. This record does not claim human approval or a final Gate result.

Fixed repository evidence: `output/date-picker-human-calibration/20260814T003809Z/`.

## Baseline and provenance

| Artifact | SHA-256 |
| --- | --- |
| `review/date-picker-human-calibration/baseline/single-date.html` | `7FB5D151B48FEDC64CF6839EFC5B87C2D4BE0D77B3264F2FE2958CAA65F41E10` |
| `review/date-picker-human-calibration/baseline/date-range.html` | `DA068C8BB35EC3B0AF8108DF4EB72A17201886BF56B6CDFCB4B0EA58A18A9C94` |
| Composite origin: Single date | `B8F4FEC9B02D96769D139DCE77AC424C7F51063C0B43550B3409D5588E2EA6CE` |
| Composite origin: Date range | `82E6769E5A75ED8E86205164BC857030FB7484D57950DE1558B039095A0EFA64` |
| accepted Reference | `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` |
| CLI | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Core | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |

The Phase 1 verifier checks these hashes before and after execution. It also verifies the historical provenance manifest and the fixed Composite evidence tree (`113` files, tree SHA-256 `99BDD8BC4C702E2C78509AD2120332D69B09609AA77D7FE906DBA49944BF00BB`). The baseline is a review artifact, not a new experimental variant, and the Composite sources remain unchanged.

## Repository verification

Command:

```powershell
& 'docs/poc/experiments/017-reference-html-ssot/verify-date-picker-human-calibration-phase1.ps1'
```

Observed result:

| Check | Single date | Date range |
| --- | ---: | ---: |
| Conformance states | 12 pass | 15 pass |
| Scenarios | 4 | 4 |
| Snapshot elements | 6 | 8 |
| Console errors | 0 | 0 |
| External requests | 0 | 0 |
| Failed requests | 0 | 0 |
| Bounded accessibility issues | 0 | 0 |
| Duplicate keys | 0 | 0 |
| Semantic ambiguities | 0 | 0 |
| Harness roots excluded per observed state | 1 | 1 |

State assertions cover open/close, focus before selection, pointer and keyboard completion, selected value, clear/reselection, Date range start/intermediate/completion, and focus return. The Review label is excluded from both DOM observations and the bounded accessibility tree.

The first ad-hoc CLI probe encountered two transient `Page.loadEventFired` startup timeouts. A frozen Composite source then passed as a control, the baseline probes passed on rerun, and the fixed verifier passed without retry. This is environment/startup noise already tolerated by the existing one-retry harness policy, not evidence of a baseline defect.

## Real-browser spot check

The two pages were served from `127.0.0.1` and exercised through a real Chromium browser independently of the Core scenario runner.

- Single date: opened, moved focus with `ArrowRight`, completed with `Enter`, and exposed the selected value and Clear action.
- Date range: opened, selected a start, exposed the intermediate instruction, completed the range, cleared it, and reopened for reselection.
- Browser console errors: `0` on both pages.
- External network: none; only the local static document request was present.

The temporary server and browser session were closed after the check. Playwright's transient YAML snapshots were removed; the repository CLI screenshots remain the fixed visual evidence.

## What this proves

The baseline is reviewable without a new application or scenario-selector UI, the required states are both operable and observable, and the existing CLI/Core can use it without changes. It does not prove that the visual or interaction design is human-approved, nor does it prove Target transfer or reusable observation rules; those belong to Phase 2 after feedback.
