---
type: PoC review cost record
title: Diagnostic reviewer presentation cost
status: completed comparison
source: four fixed raw reports, deterministic presentations, and a reversible negative probe
---

# Scope

This record compares review presentation only. The unchanged comparison report
remains complete machine evidence and the authority for status, counts, and
every individual difference.

- **A — raw:** one review entry per `differences` item.
- **B — exact observation signature:** remove the state/frame prefix, then
  group only equal severity/shape/path/expected/actual/delta observations.
- **C — field-only:** group by shape/path and ignore observation values.

# Current raw evidence

| Comparison | Status | Errors | Raw diagnostics | Raw JSON lines |
| --- | --- | ---: | ---: | ---: |
| search Target vs shell | pass | 0 | 182 | 1,227 |
| search Target vs workspace | pass | 0 | 199 | 1,381 |
| form Target vs shell | pass | 0 | 247 | 1,617 |
| form Target vs workflow | pass | 0 | 192 | 1,315 |

The directly observed totals are 381 for search and 439 for form-heavy. Shell
reports contain only extra annotated-element shapes. Workspace/form reports
also contain structural geometry shapes. The shape classification comes from
existing fields; it does not claim root cause or importance.

# Presentation comparison

| Comparison | A raw entries | B exact entries | C field entries | B Markdown lines |
| --- | ---: | ---: | ---: | ---: |
| search shell | 182 | 14 | 14 | 35 |
| search workspace | 199 | 25 | 25 | 46 |
| form shell | 247 | 19 | 19 | 40 |
| form workflow | 192 | 21 | 18 | 42 |
| **Total** | **820** | **79** | **76** | **163** |

B summarizes 741 repeated occurrences. The reduction is accepted because every
collapsed item has the same observable path and exact values and differs only
by state/frame occurrence. Each B entry retains its state count, full raw
indexes, and raw report hash.

# Rejected field-only grouping

C saves three additional entries only in the form-workflow report. Those three
groups each mix two exact observations:

- `semantic:role:form.box.x`;
- `semantic:role:main.box.height`;
- `semantic:role:main.box.x`.

The raw report cannot prove that the value-distinct observations have one
cause. C therefore trades three lines for false explanatory confidence and is
rejected. B deliberately does not use a cause label.

# Injected-defect review cost

A temporary copy changed the light focus color. The unchanged comparison CLI
returned `fail` with two errors and the existing 199 diagnostics.

| Measure | Raw | B exact presentation |
| --- | ---: | ---: |
| First defect entry | 162 | 1 |
| Total items/entries to enumerate | 201 | 26 |
| Defect occurrences/signatures | 2 | 1 |
| Informational items/signatures | 199 | 25 |

The presentation error points back to raw indexes 162 and 182. Both layers
return a failing exit status. The persistent Target hash is unchanged after the
probe.

# Tooling and understanding cost

- Presentation implementation: 253 lines.
- Analysis helper: 133 lines.
- Deterministic fixture tests: 73 lines.
- Required runtime or dependency additions: 0; all use repository Node.js.
- CLI/Core, Reference, Target, Consumer, Conformance, tolerance, and metadata
  changes: 0.
- Reference-specific presentation rules, suppression entries, and allowlists:
  0.

B introduces a second reviewer artifact, but not a second authority. Its header
links the complete report and records its SHA-256. The implementation size is
not free; it is acceptable for this experiment because it reproduced a large
review reduction across two independent noisy families and improved an actual
error's position without changing evidence. It is not yet justification for a
CLI API or output-format freeze.

# Cost conclusion

B has the best demonstrated total review cost. A remains the complete evidence
and must always be retained. C is simpler in output count but unsafe in meaning.
The selected boundary is deterministic repetition folding, not diagnostic
suppression, inferred cause analysis, or importance ranking.

