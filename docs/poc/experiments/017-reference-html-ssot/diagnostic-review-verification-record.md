---
type: PoC verification record
title: Diagnostic Review Signal / Noise Gate verification
status: pass
source: fixed reports, current browser regression, presentation trace audit, and reversible probes
---

# Authoritative run

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-diagnostic-review.ps1
```

The final authoritative result is recorded by
`output/diagnostic-review/gate-summary.json`. The Gate uses the browsers that
created each evidence family: Edge for search and Chrome for form-heavy.

# Acceptance evidence

| Acceptance criterion | Result | Repository evidence |
| --- | --- | --- |
| Current noisy evidence collected directly | pass; search 381, form-heavy 439 | `candidate-analysis.json` |
| Complete raw evidence preserved | pass; all 820 indexes appear exactly once and source hashes match | presentation JSON plus trace audit |
| Reviewer information reduced safely | pass; 820 raw diagnostics -> 79 exact observation entries | presentations and cost record |
| Status/count semantics unchanged | pass; all four fixed reports remain pass/0 errors, fresh comparisons reproduce the same counts | fixed hashes and `regression.*.report.json` |
| Deterministic output | pass; JSON and Markdown were byte-identical in repeated generation for all four positives and the negative | `presentation-generation.json` and repeat directory |
| Injected defect remains visible | pass; raw and presentation both fail; raw entry 162 -> reviewer entry 1 | `injected-focus.report.json`, presentation, and metrics |
| False grouping rejected | pass; three real field-only groups contain two exact observations; fixture tests cover key/property/value separation | `candidate-analysis.json` and reporter tests |
| Conformance retained | pass; three positives pass and three established negatives fail | preflight reports |
| Comparative negatives retained | pass; historical 15-signature and semantic-only combobox failures remain | negative reports |
| Fixed boundaries unchanged | pass | guarded hashes and tree digests before/after |

# Raw evidence and pass/fail semantics

The four source reports remained byte-identical:

| Raw report | SHA-256 |
| --- | --- |
| search shell | `833DB640FC2C4AA6E4D8D16EC3F7298D4EE686AF38213B7F4E776C35A5A8E720` |
| search workspace | `71C6B4BBB7A2E1D41651AC75F61938923DAADFBD982191B5A2C4AA6E2F0A6ADE` |
| form shell | `E7A975CE96552851FD5D69DB5B4B3F880CD0C7AC7CA135A35558A11CB5E47213` |
| form workflow | `D208532EFB4D812AB2AFA0897C39A2DEA085D8B67D95D4CC85559C98014F5923` |

The reporter validates report status and summary counts against the complete
`differences` array before generating output. It exits 0 for a passing source
and 1 for a failing source. It never invokes or alters comparison logic.

# Traceability and false-grouping proof

For each presentation entry, the Gate reconstructs the indexed raw
occurrences and requires one exact signature. Across the four positives and
the negative, indexed count equals raw count and every index is unique.

Fixture tests independently distinguish:

- same observation across multiple states: grouped;
- same key with different property: separate;
- same property with different key: separate;
- same path/property with different values: separate.

The real form report proves why field-only grouping is unsafe: three fields
have two distinct expected/actual pairs.

# Current regression and Conformance

Fresh baseline/Target runs reproduced all four passing part-to-integrated
comparisons with exactly 182, 199, 247, and 192 informational diagnostics.
Three Reference preflights passed with no errors. Semantic ambiguity,
relational ambiguity, and missing whole-page `h1` preflights remained failing.
The historical comparative negative remained 15 signatures and the semantic-
only negative retained the missing combobox signature.

# Harness reliability and browser boundary

The authoritative Gate made 18 browser invocations with zero timeouts and zero
retries. An intermediate check exposed that reusing an old snapshot or mixing
Edge and Chrome changes `:focus-visible` observations after scripted fill. The
final regression therefore captures a fresh baseline with the same browser as
its Target. This does not establish cross-browser equivalence; other-browser
testing remains out of scope. No timeout/retry or focus exception was added.

# Change boundary

- CLI/Core comparison changes: 0.
- Raw generation, status, severity, tolerance, observation, and Conformance
  changes: 0.
- Reference, Target, and Consumer changes: 0.
- Scope metadata, suppression, allowlists, dependencies, and packages: 0.
- Supplementary visual evidence: not required because canonical UI did not
  change and repository reports fully prove this presentation Gate.

