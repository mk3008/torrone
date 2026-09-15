---
type: PoC verification record
title: Relational semantic identity reuse verification
status: passed with harness reliability unconfirmed
source: verify-relational-reuse.ps1 and rendered evidence
---

# Verification result

| Claim | Result | Evidence |
| --- | --- | --- |
| Accepted inputs stayed fixed | `pass` | Accepted Reference, Core, CLI, Transferability packet, and Mixed packet hashes/digests asserted before/after. |
| Buildless/no external runtime | `pass` | Variant contains three HTML files; external-reference and network/data-layer API scans returned no match. |
| Business content differs | `pass` | Target leakage scan passed; visual/source review confirmed separate close and site-readiness fixtures. |
| DOM/CSS/local identity differs | `pass` | Shared class tokens `0`, shared local IDs `0`, different style-source hashes, and different non-observed grouping. |
| Mixed identity inventory | `pass` | 10 observations: 6 explicit, 2 native semantic, 2 relational semantic. |
| Existing resolver reuse | `pass` | Two controlled regions resolved in both screens; Core/CLI hashes unchanged; added heuristic count `0`. |
| State/style/focus/interaction | `pass` | Target report `pass`, 0 errors, 0 diagnostics, 3 scenarios, 6 actions. |
| Console/network | `pass` | Console errors `0`, external requests `0`, failed requests `0`. |
| Bounded accessibility | `pass` | All Reference states and Target comparison contained no bounded issues or unnamed interactive controls. |
| Harness isolation | `pass` | No product-facing scenario harness; excluded harness roots `0`. |
| Ambiguity fails closed | `pass` | Two controlled forms produced one ambiguity with count `2`; no relational key was captured. |
| Existing negatives preserved | `pass` | Fixed Mixed packet unchanged; stored historical/semantic-only/style reports retained their expected failure signatures. |
| Repeated capture | `pass` | Two Reference captures with equal artifact conditions were byte-identical. |
| Rendered business-screen review | `pass` | Initial, filter-open, and menu-open screenshots inspected; no experimental control leaked into product UI. |

# Commands

The reproducible Gate command is:

```powershell
& 'docs/poc/experiments/017-reference-html-ssot/verify-relational-reuse.ps1'
```

It writes only to `output/relational-reuse/`. It does not overwrite the accepted
Reference, prior Target sources, prior Gate outputs, or prior negatives.

# Browser evidence

The final run used Edge `151.0.4129.78` at `1440 x 900`. Its five DevTools
attempts all succeeded without retry. Across the complete development phase,
19 attempts included one first-attempt shell timeout and one retry. This is
recorded separately from the design Gate and remains an `UNCONFIRMED` harness
reliability concern.

# Negative-evidence qualification

The three prior negative pages were intentionally not re-executed into their
fixed output paths. The Gate instead asserted the complete Mixed packet digest,
the unchanged Core/CLI hashes, and the exact stored failure signatures. A new
separate relational ambiguity probe was executed in the current output path.
This proves preservation and current fail-closed behavior without claiming a
fresh environment rerun of every historical negative.
