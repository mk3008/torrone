---
type: verification record
title: Composite UI Reference Granularity Gate verification
status: pass; composite-granularity-beneficial
source: repository commands, browser-backed JSON, screenshots, and source inspection
---

# Composite UI Reference Granularity Gate verification

## Fixed implementation and retained evidence

| Item | Evidence |
| --- | --- |
| Accepted Reference SHA-256 | `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056`; unchanged |
| CLI SHA-256 | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Core SHA-256 | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| Browser | Chrome `151.0.7922.109`, viewport `1440 × 900` |
| Browser executable SHA-256 | `B24F7C774A5485E65DAE2C88EB0014C3482795BF8A8A37FC6A637B40D23CBC13` |
| Final run | `output/composite-granularity/20260813T235448Z/` |
| Summary | `output/composite-granularity/20260813T235448Z/gate-summary.json` |

The runner verifies every historical entry point, verification record, and
output-tree digest against the existing provenance manifest before and after
the Gate. It also checks that CLI/Core hashes are unchanged.

## Reproduction

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-composite-granularity.ps1
git diff --check
```

The runner creates timestamped evidence, uses only an isolated temporary root
for negative mutations, validates the exact temporary path before removal, and
does not edit a Reference or Target during execution.

## Positive browser checks

| Input | Scenarios / checked states | Observed elements | Result |
| --- | ---: | ---: | --- |
| single date Reference | 3 / 10 | 6 | preflight and snapshot pass |
| date range Reference | 3 / 13 | 8 | preflight and snapshot pass |
| Date family sheet | 6 / 22 | 14 | preflight and snapshot pass |
| entity autocomplete Reference | 4 / 10 | 6 | preflight and snapshot pass |
| entity dialog lookup Reference | 5 / 18 | 9 | preflight and snapshot pass |
| independent date-range Target | inherited 3 / 13 | 8 required observations | verify pass |
| independent autocomplete Target | inherited 4 / 10 | 6 required observations | verify pass |

Every retained positive report has zero comparison/Conformance errors, console
errors, external requests, failed requests, and bounded accessibility issues.

## Negative checks

| Probe | Expected and observed result |
| --- | --- |
| whole Date sheet versus range-only Target | fail, 108 errors / 14 signatures; unrelated variant is not silently sliced |
| date completion without popup dismissal | fail, 39 errors / 13 signatures across state, focus, visibility, and controlled-region observations |
| entity option `border-radius: 5px -> 18px` | fail, 10 errors / one exact `borderRadius` signature |
| missing entity-dialog `aria-controls` target | Conformance error in 18 states / one `missing-aria-controls-target` signature |

The negative criteria require a failing report and at least one error; they do
not require a historical incidental count. Raw reports retain every occurrence
and exact value.

## Source-independence checks

Both Target pairs have different style-block hashes, zero shared stylesheet
imports, zero shared class tokens, zero shared local IDs, zero harness/scenario
roots in the Target, and zero selected Reference business-term leaks. Each
Target adds a `main` workspace that its standalone Reference does not contain.

The Date Target uses an object-backed range model and delegated day clicks; the
Reference uses local variables and per-day handlers. The entity Target uses a
parts/state object and different classes, IDs, copy, and fixtures. These source
inspections support, but do not replace, the browser comparison evidence.

## Supplementary real-browser check

Playwright CLI opened the date-range Target through a temporary localhost-only
static server. Its semantic snapshot exposed `main`, level-one and level-two
headings, the labeled read-only textbox, expanded controlled dialog, active
date button, completed value, summary, and Clear action. Pointer selection of
October 5 through 9 completed successfully. Playwright reported zero console
messages and no non-static request. The session and local server were stopped;
temporary Playwright snapshots were removed.

One later non-retained rerun hung after a DevTools `Page.enable` launch failure
while starting the final Conformance negative. Its owned Node process,
temporary profile, mutation root, and incomplete output were removed. The
retained final run had already completed all positives and negatives. This is
recorded as execution reliability evidence, not reclassified as a Reference
granularity defect or used to weaken a check.
