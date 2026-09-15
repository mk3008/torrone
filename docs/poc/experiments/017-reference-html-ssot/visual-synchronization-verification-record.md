---
type: PoC verification record
title: Reference visual rule synchronization verification
status: pass
source: Chrome browser execution through the unchanged PoC 017 CLI/Core
---

# Authoritative run

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-visual-synchronization.ps1
```

The final run completed with exit `0` in 130.2 seconds. It made 42 browser
invocations with zero timeouts and zero retries.

# Fixed evidence guard

| Evidence | Result after the Gate |
| --- | --- |
| common shell SHA-256 | `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527` |
| search workspace SHA-256 | `3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B` |
| form workflow SHA-256 | `A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4` |
| Core SHA-256 | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| CLI SHA-256 | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| fixed Conformance packet | 62 files; `E318076A90555C11D9D678F6BB5FF57B311982552A86D59548A44433AC0BF7BF` |

No fixed Reference, Target, negative artifact, or prior Gate packet was written.

# Canonical observation regression

The A baseline captured 13 elements/6 scenarios for shell, 14/5 for search,
and 19/3 for form. Repeated baseline observation JSON was byte-identical for
all three.

| Candidate comparisons | Status | Errors | Geometry/extra diagnostics |
| --- | --- | ---: | ---: |
| B against A: shell, search, form | 3 × pass | 0 | 0 |
| C against A: shell, search, form | 3 × pass | 0 | 0 |

The comparisons cover state, computed style, focus, interaction, bounded
accessibility, observation identity, console, and network observations. Every
snapshot had zero accessibility, console, action, external-network, and failed-
request errors. Harness exclusion remained one product-external root in both
DOM and accessibility observations.

The final run produced 68 candidate screenshot files; 65 were byte-identical
to A. The three differing PNGs were interaction frames. A supplementary decoded
pixel check found one or four affected pixels per file, with maximum channel
delta 1. Preliminary runs moved these tiny differences between baseline repeats
and candidates, so file hashes are recorded as supplementary timing evidence,
not candidate exceptions. Exact repeated observation bundles and six zero-error
computed comparisons remain the deterministic proof. No allowlist was added to
the CLI/Core.

# Reference Conformance

All nine A/B/C documents passed current preflight with zero errors and zero
warnings (102 checked states in total). Existing semantic ambiguity,
relational ambiguity, and bounded missing-`h1` probes still failed. No
Conformance rule or threshold changed.

# Maintenance probe evidence

- The common focus probe failed all nine A/B/C Reference comparisons at
  observed `outlineColor` paths. A required three edits; B and C each required
  one. All three still required three validations.
- The form-local danger probe failed each candidate as expected (155
  occurrences across 21 style paths), while the common layer, shell, and search
  source hashes stayed unchanged.
- Every disposable probe restored to a byte-identical source tree. No probe
  value remains in a Variant or fixed Reference.

# Static and boundary checks

- Candidate source added no `http`, `https`, `@import`, fetch, XHR, WebSocket,
  or EventSource use.
- B/C use one relative static stylesheet and remain directly browser-loadable.
- Dependencies, package files, generators, schemas, build steps, and runtimes
  added: 0.
- Consumer/Target requirements and changes: 0.
- CLI/Core changes: 0.

# Diagnostic noise

Candidate-to-baseline comparisons emitted zero geometry/extra-element
diagnostics because these Variants intentionally preserve the same product DOM.
This does not resolve the established part-to-integrated totals of 381 and 439;
no scope metadata, suppression, or diagnostic behavior changed.

