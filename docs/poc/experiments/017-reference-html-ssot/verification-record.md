---
type: PoC verification record
title: Reference HTML SSOT verification
status: passed mechanically
source: reproducible repository commands
---

# Verification outcome

`passed mechanically` — the current human-review Reference is deterministic,
all 11 product scenarios complete without action/console errors, the harness is
excluded from product observation, both intended negative experiments still
fail, and the frozen transfer reports remain internally consistent.

# Reproducible command

```powershell
& .\docs\poc\experiments\017-reference-html-ssot\verify.ps1
```

The script checks Node syntax, local-only Reference source, absence of the
undecided detail interaction, a clean historical React build, repeated current
Reference capture, the current three-state outcomes, harness exclusion, every
state's keys/a11y/action/console result, frozen positive-report integrity, the
negative fixture, the semantic-only candidate, and required failure signatures.

# Observed results

| Check | Result |
| --- | --- |
| Browser | `Chrome/151.0.7922.109`, `1440 x 900` |
| Current Reference | 27 keys, 11 scenarios, 19 action steps, 0 bounded accessibility issues, 0 external/failed requests, 0 console/action errors |
| Harness boundary | 1 marked root excluded by Core and from the CLI accessibility tree in every captured state |
| Repeated current Reference JSON | Byte-identical; SHA-256 `0FBDCBA1BEC6E76EB09D68082D2C99BD60E947A823F7C9B6D9758F04FF52186A` |
| Repeated current initial PNG | Byte-identical; SHA-256 `BBA7B5F923E061FAB6C5D6FDA365143AF720BB805F8364D103A1B280B391B0B6` |
| Frozen vanilla/React reports | Both `pass` and both baseline digests still match the frozen four-scenario Reference; not current-Reference conformance evidence |
| Deliberate negative consumer | expected `fail`; 32 occurrences across 15 normalized signatures |
| Semantic-only cross-content comparison | expected `fail`; 8 missing-key errors and 9 extra/geometry diagnostics |

# Rendered inspection

The CLI captured the current Initial, Results, Empty, Dark, user-menu, and other
interaction states in a real Chrome instance. Initial/Results/Empty screenshots
were inspected directly. The first visual pass found that Search changed the
product state but left the harness selector on Initial; the selector was then
synchronized and the complete verification reran. In-app automation of the
already-open `file:` page was unavailable because of the browser safety policy;
no bypass was attempted.

# What the checks prove

- The current Reference exposes three mutually exclusive result-region states,
  stable focus, selected styles, and bounded accessibility observations without
  observing the harness as product UI.
- The frozen Reference-observed contract was replayed against two different
  task contents and two implementation organizations.
- The CLI rejects demonstrated state, style, and accessible-name defects.
- The action-only contract is enough for the 11 current interaction paths
  exercised without a second expected-style/state artifact.
- Repeated capture is deterministic in the observed browser/environment.

# What the checks do not prove

- Human preference or final design approval.
- Complete accessibility, screen-reader output, responsive behavior, other
  browsers, animation, real data behavior, production security, or a thin MCP
  adapter.
- Independent CSS re-authoring in React; the React consumer intentionally
  shares the vanilla implementation stylesheet to isolate framework mechanics.
- Current Reference transfer to any Target; that work is intentionally deferred
  until the Reference itself is human-reviewed.
