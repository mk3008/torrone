---
type: PoC decision record
title: Evidence Harness maintenance boundary
status: selected for this experiment
---

# Evidence Harness maintenance boundary

## Selected

Keep historical scripts and evidence byte-immutable. Run current regressions in
disposable copies, replace only implementation-hash guards needed to admit the
current CLI/Core, and record the transient script and current implementation
hashes in a separate timestamped evidence family.

For the reproduced focus negative, replace the transient exact-count assertion
with a required historical signature plus a bounded exact-mutation contract.
Do not change the historical Diagnostic script or its historical result.

## Rejected

| Option | Reason |
| --- | --- |
| Require the current Core to equal the historical Core | Preserves only replay of the old implementation and cannot answer current regression. |
| Delete SHA checks | Loses implementation provenance and hides drift. |
| Rewrite historical output with current output | Destroys the evidence boundary and makes old decisions unauditable. |
| Edit every historical entry point in place | Cascades through later packet digests and mixes two responsibilities. |
| Accept any nonzero error count | Does not protect the required failure and admits unrelated regressions. |
| Require only one historical path and allow all additions | Makes strengthened detection indistinguishable from unrelated errors. |
| Reduce the current three-error saved result to the historical two | Weakens detection and discards valid evidence. |

## Maintenance cost

- original Gate, Reference, Target, Consumer, Core, and CLI files changed: 0;
- author-maintained provenance: one small PoC-local JSON record;
- new executable maintenance code: one PowerShell entry point and one focused
  JavaScript contract with seven fixtures;
- current run: six isolated Gate audits, 99 fresh browser attempts, and four
  regenerated reviewer presentations;
- repeated evidence meaning: none; the manifest stores provenance/digests, not
  expected UI observations.

The cost is higher than deleting stale SHA checks, but it preserves authority
and makes stale versus fresh evidence machine-distinguishable. No larger
provenance framework was justified.
