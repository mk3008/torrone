---
type: PoC verification record
title: Diagnostic Presentation Adoption Gate verification
status: completed with recorded legacy-harness limitations
source: repository commands and browser-backed raw evidence
---

# New responsibility

| Check | Result |
| --- | --- |
| fresh common-shell baseline | Chrome 151, 13 elements, 6 scenarios, 0 a11y issues |
| fresh detail baseline | Chrome 151, 6 elements, 1 scenario, 0 a11y issues |
| Target preflight | pass, 0 errors |
| Target vs shell | pass, 0 errors, 78 diagnostics |
| Target vs detail | pass, 0 errors, 48 diagnostics |
| console/network/action errors | 0 / 0 / 0 |
| external source scan | no external transport or import added |

Both baseline snapshots were captured before the accepted Target comparisons
with `C:\Program Files\Google\Chrome\Application\chrome.exe`. The baseline
hashes stayed fixed through the negative probe.

Harness reliability for the new responsibility was nine browser-backed
development/Gate attempts, zero timeouts, and zero retries. This includes the
first informative Target mismatch, the reversible negative, and restored
positive; the accepted comparisons themselves are the final zero-error shell
and detail reports.

# Presentation

- reporter fixture test: pass;
- reporter and analysis syntax: pass;
- reporter SHA before/after: `42C28…`;
- JSON/Markdown repeat pairs: 4/4 byte-identical for the new family;
- trace audit: 126/126 unique raw indexes, no missing/duplicate index or
  signature mismatch;
- field-only false groups: 1; exact false groups: 0;
- Reference-specific rules: 0.

# Negative and publication isolation

- focus defect raw: fail, 2 errors, 1 signature, 48 diagnostics;
- first raw error: 17; presentation error position: 1;
- raw indexes from presentation: 17 and 34;
- CLI/direct reporter exits: 1/1;
- best-effort publisher result for failing raw: `written`, derived status
  `fail`, publisher exit 0, raw unchanged;
- forced missing reporter: `skipped`, publisher exit 0, raw unchanged, derived
  outputs absent;
- raw/derived path alias: `skipped`, publisher exit 0, raw still present and
  hash-identical;
- persistent Target hash restored exactly.

# Existing datasets and adoption

The post-Gate adapter read the four saved partial/form reports without changing
their hashes. It produced 4 JSON and 4 Markdown files twice; all eight pairs
were byte-identical. Counts remained 182→14, 199→25, 247→19, and 192→21.

Fresh current comparisons in an isolated copy reproduced 182, 199, 247, and
192 diagnostics with zero errors. The subsequent existing negative assertion
stopped because the current browser exposed one additional focus-color error;
the raw negative remained failing and the Target restored exactly.

# Conformance and established negatives

The unmodified Conformance Gate ran fully in an isolated copy:

- eight positive Reference shapes passed;
- nine reversible probe families failed and restored as expected;
- form canary: comparative pass, preflight error, restored pass;
- style, historical, and semantic-only comparative negatives failed;
- 51 browser attempts, 0 timeouts, 0 retries.

The older partial/form Gate entry points were also invoked unmodified. Both
stopped at their before-Gate Core hash guard (`14BB…` expected, current
`62F…`). No hash, expectation, or fixed evidence packet was edited to force a
pass.

The prior Diagnostic packet remained 44 files at digest
`588346FE69B002478E131672CB3527A0D106B00BAA43C246C9F3CA32F1CC2E69`;
the prior Token packet remained 132 files at digest
`5C977C617C2A5A7B8B0163F1B53ED2FFBCC09822BDFAEEBE10341501EC110E5F`.

# Changed authority

| Artifact class | Change |
| --- | ---: |
| CLI/Core | 0 |
| Reference, existing Target, Consumer | 0 |
| raw schema/semantics/tolerance | 0 |
| fixed reporter | 0 |
| noncanonical experiment Target | 1 |
| optional publication scripts | 2 |
| saved authoritative raw reports overwritten | 0 |

Repository evidence is sufficient for the Gate. There is no supplementary
user-provided verification evidence.
