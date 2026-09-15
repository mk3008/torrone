---
type: two-cycle self review
title: Evidence Harness Maintenance Gate self review
status: pass with one unconfirmed follow-up
---

# Evidence Harness Maintenance Gate self review

## Cycle 1 — correctness and evidence integrity

1. **Finding:** the first historical-output check calculated relative names
   from each output directory, while the recorded digests used the experiment
   root. It stopped before any browser action, but the message looked like
   evidence drift.
   **Fix:** made the digest-relative root explicit, reran the historical audit,
   and removed only the incomplete new run. No historical file changed.
2. **Finding:** the historical record initially fixed entry points and output
   trees but did not bind the human verification records that explain their
   provenance.
   **Fix:** added the six verification-record paths and hashes before fixing the
   manifest hash in the current-regression entry point.
3. **Finding:** a first current provenance field reported that a hash value was
   substituted whenever the entry point supported transient substitution, even
   when the current and historical values were equal.
   **Fix:** split this into guard preparedness, actual implementation-value
   change, and transient entry-point byte change, then performed another full
   six-Gate run.
4. **Finding:** current output could recursively enter later disposable copies
   as the run accumulated evidence.
   **Fix:** excluded the entire maintenance-output family from every copy and
   verified zero temporary roots remained.
5. **Finding:** accepting the new focus result by count containment alone would
   also accept unrelated failures.
   **Fix:** bounded every error by path shape, property, exact values, severity,
   required historical path, and presentation trace. Negative fixtures prove
   the rejection cases.

## Cycle 2 — overclaim, scope, and future regression risk

1. **Finding:** the saved strengthened canary has three focus errors, while the
   final live Diagnostic run produced the historical-strength two errors. A
   report saying the live run reproduced three would be false.
   **Fix:** report the two observations separately. The same contract accepts
   both, which is the maintenance property this Gate proves.
2. **Finding:** the Diagnostic Adoption script audits saved browser evidence;
   it does not add nine new browser executions to this run.
   **Fix:** the result and provenance distinguish its historical nine attempts
   from the 99 fresh browser attempts.
3. **Finding:** the fresh partial CSS negative grew from 20 errors/two
   signatures to 22/four. Its two added focus observations are not naturally
   explained by the border-radius mutation.
   **Fix:** preserve the complete raw evidence and the unchanged existing Gate,
   but do not claim a bounded mutation contract. Record a separate audit as the
   next recommendation.
4. **Finding:** several other current scripts still use exact historical counts
   or minimum required paths. Rewriting all of them from one focus experiment
   would be an unsupported generalization.
   **Fix:** keep them unchanged. Only the reproduced focus assertion receives a
   new contract; broader adoption remains unconfirmed.
5. **Finding:** a timestamped provenance layout could be mistaken for a public
   evidence schema.
   **Fix:** label every new record PoC-local and leave schema/versioning, CLI
   placement, Profile, and MCP unfrozen.

No authority, UI design, comparison semantics, tolerance, raw schema, or public
API issue was found that requires human judgment for this Gate.
