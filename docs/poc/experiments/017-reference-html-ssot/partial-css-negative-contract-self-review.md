---
type: two-cycle self review
title: Partial CSS Negative Contract Audit self review
status: pass
---

# Partial CSS Negative Contract Audit self review

## Cycle 1 — causality and contract correctness

1. **Finding:** the first audit entry point required a saved-baseline control
   to have exactly two focus errors. A real run instead passed, proving that a
   fixed control count would encode the same instability being audited.
   **Fix:** replaced control shape assertions with multiple complete raw
   controls and a mutation-only semantic delta.
2. **Finding:** two consecutive fresh Reference snapshots did not always have
   the same hash despite identical source, executable, version, viewport, and
   scenarios. Retrying until equal would have hidden the finding.
   **Fix:** retained both snapshots, recorded their focus observations, and
   removed snapshot-hash equality from success criteria.
3. **Finding:** exact expected/actual tuple subtraction failed when the
   focus-color delta reversed direction between baseline and mutation runs.
   **Fix:** classify a secondary only by a normalized property signature that
   was directly observed in exact unmutated controls. The affected radius
   paths are forbidden in controls, and mutation-only paths and values remain
   exact.
4. **Finding:** a broad secondary-signature allowance could hide a new error.
   **Fix:** derive the only affected radius keys from the mutated selector,
   preserve every raw error, and reject any mutation-only signature outside
   the exact affected paths. Fixture tests cover an unexplained focus addition
   when controls are clean.
5. **Finding:** the initial focus contract in the complete maintenance run
   assumed the expected computed color must always be the focus token. The
   same programmatic-focus condition produced the immutable source foreground
   color and stopped Diagnostic Review.
   **Fix:** permit only those two source-backed expected colors while retaining
   exact mutated color, outlineColor-only scope, required historical signature,
   and raw/presentation index equality. An unexplained expected color fails.

## Cycle 2 — evidence integrity, scope, and overclaim

1. **Finding:** the audit can prove execution-condition drift but cannot prove
   a browser-engine internal cause beyond focus-visible modality varying
   across isolated launches.
   **Fix:** classify the boundary as Harness/baseline/browser condition and do
   not label it a browser bug or a CLI comparison bug.
2. **Finding:** updating the previous maintenance result and verification text
   would make the prose current but would violate its fixed historical
   provenance.
   **Fix:** leave those records byte-identical and place the current contract,
   fixture count, and regression evidence only in this new audit record.
3. **Finding:** a passing causal contract could be misreported as removing the
   focus differences from raw evidence.
   **Fix:** verify that the complete current CSS negative still reports 22/4
   and state explicitly that raw comparison behavior was not changed.
4. **Finding:** failed development runs could be confused with the retained
   final evidence.
   **Fix:** name `20260813T131903Z` as the final audit and
   `20260813T132628Z` as the final complete regression; earlier runs remain
   transparent evidence of why fixed shapes were rejected.
5. **Finding:** closing the Evidence Harness line could be read as freezing a
   failure-contract API or solving focus determinism.
   **Fix:** close only this investigation boundary. Keep the evaluator
   PoC-local and leave Profile, CLI API, report schema, MCP, and broader
   negative-contract generalization unfrozen.

No canonical UI, authority, comparison-semantics, or human failure-meaning
decision remains. The recommended next work is the already-deferred Composite
UI Reference granularity experiment.
