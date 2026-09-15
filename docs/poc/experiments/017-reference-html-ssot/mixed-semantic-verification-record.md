---
type: PoC verification record
title: Mixed semantic and stable-key experiment verification
status: passed mechanically with bounded uncertainty
source: reproducible repository command and rendered evidence
---

# Verification outcome

The bounded mixed Variant passed mechanically. It preserved all 27 observation
points as 21 explicit and six semantic identities, replayed 11 scenarios/19
actions against the independent shipment Target, and retained all requested
negative detections. The accepted Reference and fixed Transferability packet
remained byte-identical.

# Reproducible command

```powershell
& .\docs\poc\experiments\017-reference-html-ssot\verify-mixed-semantic.ps1
```

The script sets the existing debug environment switch because non-debug browser
startup timed out repeatedly in this environment. It does not retry, lengthen
timeouts, or change comparison tolerances.

# Acceptance evidence

| Acceptance criterion | Result | Repository evidence |
| --- | --- | --- |
| Accepted Reference fixed | `pass`; SHA-256 `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` before/after | Gate output and script assertion |
| Prior Transferability packet fixed | `pass`; 124-file digest `96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF` before/after | Gate script assertion |
| Explicit metadata reduction | `pass`; 27 to 21 attributes, 27 observed points retained | `source-metrics.json`, Variant snapshot |
| Cross-content/DOM/class/local-ID transfer | `pass`; both Variant snapshots expose the same six generated keys; source leakage `0` | Reference/Target snapshots and source scans |
| State/style/focus/interaction | `pass`; Target 0 errors, 24 geometry diagnostics, 11 scenarios, 19 actions | `target.report.json` |
| Bounded a11y/runtime | `pass`; duplicate/ambiguity/DOM-a11y/unnamed-AX/console/external/failed-request counts all `0` | Variant snapshots and Target report |
| CSS independence retained | `pass`; Variant CSS equals the previously proven independent Target CSS, not Reference/vanilla CSS; no import/external reference | `source-metrics.json`, fixed Transferability evidence |
| Semantic ambiguity resistance | `pass`; six ordinary duplicate descriptors recorded and not selected by order | `semantic-ambiguity.snapshot.json` |
| Historical negative | expected `fail`; 32 errors/15 signatures | `historical-negative.report.json` |
| Semantic-only negative | expected `fail`; `semanticInventory.combobox` | `semantic-only-consumer.report.json` |
| Independent CSS negative | expected `fail`; 20 occurrences/one `filter-toggle.styles.borderRadius` signature | `style-negative.report.json` |
| Accepted Reference regression | `pass`; explicit mode, 27 keys, 11 scenarios, no bounded/runtime errors | `accepted-reference-regression.snapshot.json` |
| Determinism | `pass`; repeated Mixed Reference JSON byte-identical | `reference.snapshot.json`, `reference.repeat.snapshot.json` |

# What the result proves

- Six native/relationship identities can replace explicit annotations in this
  screen without relying on text, fixture, class, DOM index, or local ID.
- The same resolver supports capture, actions, focus, and ARIA relationship
  comparison; there is no action-only selector dialect.
- Ambiguous role candidates fail closed rather than selecting the first match.
- Existing explicit and independent-CSS transfer evidence remains effective.

# What remains partial or unconfirmed

- The total maintenance benefit after adding shared-Core complexity.
- Whether the six semantic identities stay useful across another Reference
  shape or independently authored Target.
- Browser startup stability without the existing debug timing effect.
- Responsive, other-browser, real-AT, partial-Reference, profile/API, MCP, and
  Manifest claims.

# Supplementary evidence

The mixed Target Initial screenshot was inspected. Its product UI is visually
unchanged from the accepted independent shipment Target and exposes no harness.
The screenshot supports the no-visible-regression claim but does not prove
keyboard, AT, or source independence.

