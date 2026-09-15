# DatePicker Human Calibration Phase 2 cost record

## Reference correction

The human-approved Reference remained a one-file executable SSOT. From the
Phase 1 AI draft to the approved Date range it changed as follows:

| Measure | AI draft | Human-approved | Delta |
| --- | ---: | ---: | ---: |
| HTML file count | 1 | 1 | 0 |
| total lines | 107 | 642 | +535 net |
| no-index source diff | — | — | 603 additions / 68 deletions |
| CSS lines inside the file | 28 | 68 | +40 |
| JavaScript lines inside the file | 32 | 426 | +394 |
| explicit stable identities | 7 | 20 | +13 |
| scenarios | 4 | 22 | +18 |
| actions | 14 | 58 | +44 |
| CLI/Core files changed during correction | 0 | 0 | 0 |

Each human correction stayed local to the adjusted HTML. Evidence, verifier,
and review records changed to freeze or explain the new observation; they did
not duplicate expected UI values as another SSOT. The large JavaScript increase
is concrete evidence that a complete custom DatePicker Reference can become a
small application and should not be generalized or split without a separate
maintenance experiment.

## Target follow-up

The frozen 101-line Composite Target was not edited. Its experimental successor
uses one independent HTML file plus one product-external scenario-value file.

| Measure | Historical Target | Phase 2 Target | Delta |
| --- | ---: | ---: | ---: |
| Target files | 1 | 2 | +1 override file |
| HTML lines | 101 | 333 | +232 net |
| no-index HTML diff | — | — | 302 additions / 70 deletions |
| CSS lines | 29 | 70 | +41 |
| JavaScript lines | 28 | 186 | +158 |
| explicit stable identities | 7 | 20 | +13 |
| fixture-value overrides | 0 | 15 | +15 values |
| Reference harness/scenario roots | 0 | 0 | 0 |

The larger Target cost came from the approved behavior, not source sharing:
editable independent boundaries, validation/recovery, six-week rendering,
navigation, disabled-boundary logic, open-ended states, and focus/dismissal.
Reference and Target style hashes differ; shared class tokens and local IDs are
both zero.

## Tooling and verification

The first Target implementation passed every design comparison except seven
unkeyed `aria-describedby` relationship signatures. The general Core correction
changed one file by seven added and one replaced line, plus four small browser
fixtures. The CLI and its command surface did not change.

| Activity | Cost evidence |
| --- | --- |
| pre-followup comparison | about 5 seconds; one preserved fail report |
| first independent Target comparison | about 11 seconds; isolated the seven relationship signatures |
| final Phase 2 Gate with DatePicker current regressions | 85 seconds |
| full isolated current Gate regression | 314.6 seconds retained run |
| development reliability loss | one five-minute caller timeout and owned-process cleanup before clean rerun |

No package, framework, build step, server dependency, network client, stage,
commit, or push was added.

