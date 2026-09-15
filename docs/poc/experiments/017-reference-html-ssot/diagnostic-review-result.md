---
type: PoC experiment result
title: Diagnostic Review Signal / Noise Gate result
status: diagnostic-presentation-beneficial
source: four fixed raw reports, deterministic presentation comparison, negative probe, and two-cycle self review
---

# Attainment status

- **Gate status:** `diagnostic-presentation-beneficial`
- **Workflow attainment:** `done`
- **Decision scope:** experimental reviewer presentation over complete PoC 017
  machine reports; no comparison, CLI API, or Reference contract change.

# Outcome

A deterministic, read-only presentation layer reduced 820 raw informational
occurrences to 79 distinct exact observation entries across both search and
form-heavy part-to-integrated comparisons. Every raw occurrence remains in the
unchanged report and is addressable from exactly one presentation entry.

An injected keyboard-focus defect remained a failing comparison with two raw
errors and 199 diagnostics. Its first raw occurrence was item 162; the reviewer
presentation put its one exact error signature first and linked raw items 162
and 182. Detection and pass/fail semantics were preserved while review effort
fell.

# Noisy comparisons investigated

| Family | Comparisons | Raw diagnostics | Reviewer entries |
| --- | ---: | ---: | ---: |
| search partial | shell + workspace | 381 | 39 |
| form-heavy partial | shell + workflow | 439 | 40 |

Other saved nonzero reports were audited. The 24-item mixed/transferability
reports are whole-Reference transfer comparisons, not independent part-to-
integrated evidence. The Conformance canary and existing negative reports reuse
the same form/search families and are retained as regression evidence rather
than counted as additional independent noise cases.

# Raw diagnostic classification

The raw fields support only shape-level classification:

- extra annotated element;
- structural geometry property (`x`, `y`, `width`, or `height` with delta);
- other informational difference.

Shell comparisons contained only extra-element repetition from the other
integrated responsibility. Workspace/form comparisons also contained repeated
geometry observations from integrated layout. Presentation labels do not claim
that equal shapes share a root cause.

# Presentation decisions

| Approach | Decision | Reason |
| --- | --- | --- |
| A — raw | Retain as complete machine authority | Complete but requires 820 review entries and over 5,500 JSON lines across four reports. |
| B — exact observation signature | Adopt for this experimental reviewer layer | Folds only state/frame repetition with equal key/property/value; preserves complete indexes and hash trace. |
| C — field-only | Reject | Saves three additional entries by merging value-distinct geometry observations in three real form fields. |

B sorts existing errors before information and uses deterministic lexical
ordering inside each severity. It adds no importance score, suppression,
allowlist, cause inference, or Reference-specific rule.

# Evidence and semantics

- Four fixed raw reports remained hash-identical.
- Four fresh comparisons passed with zero errors and reproduced exactly 182,
  199, 247, and 192 diagnostics.
- All 820 positive raw indexes and all 201 negative raw indexes occur exactly
  once in their presentations; source SHA-256 values match.
- JSON and Markdown presentations were byte-identical on repeated generation.
- The raw CLI and presentation both exited 1 for the injected defect.
- Three Conformance positives passed; three established Conformance negatives
  and two comparative negatives retained their failures.
- Browser invocations: 18; timeouts: 0; retries: 0.

# Change and ownership boundary

CLI/Core, References, Targets, Consumers, raw reports, geometry tolerance,
Conformance rules, and token ownership changed by 0. The experiment adds one
standalone reporting utility plus analysis and tests. It reads raw JSON and
never participates in comparison.

The prior token result was inspected and remains unchanged: canvas, surface,
and focus color share Library ownership across four light/two complete dark
References; selectors, component styles, focus geometry, and false-sharing
status accents remain local. Nothing was duplicated in long-lived knowledge.

# Problems found and corrected

- Field-only grouping falsely merged three value-distinct form geometry groups;
  exact-value identity replaced it.
- Initial current regression mixed browser/baseline execution conditions and
  exposed `:focus-visible` differences. Fresh same-family baselines fixed the
  evidence method without changing expectations.
- The first human table omitted the folded state count; it now shows the count
  while JSON retains every state name.
- Reporting complexity is disclosed: 253 implementation, 133 analysis, and 73
  fixture-test lines. This Gate does not promote the format into the CLI.

# Long-lived knowledge promoted

The cross-experiment note now records only what reproduced across both noisy
families:

- complete machine evidence and reviewer presentation are separate duties;
- aggregation does not delete raw evidence;
- comparison generation and pass/fail semantics must not be weakened for a
  shorter report;
- when cause cannot be proven, group exact repeated observations rather than
  inventing a cause;
- part-to-integrated extra-element and geometry information is distinct from a
  Reference defect or Target comparison error;
- reviewer cost is the amount of distinct actionable information, not only the
  raw diagnostic total.

# Human judgment and next phase

No human design or diagnostic-importance judgment is required for this bounded
Gate. Adopting a public CLI command or freezing the presentation schema would
be a later product decision and was not made.

Keep the standalone reporter as experimental evidence and exercise it on the
next responsibility-distinct partial Reference. If the same boundary remains
useful, run a separate Report Adoption Gate to decide command placement,
schema/versioning, and compact raw-index rendering. Investigate browser/fresh-
baseline focus reproducibility separately; do not mix it into reporting or use
it to justify a tolerance or suppression rule.

