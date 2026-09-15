---
type: PoC self review
title: Diagnostic Presentation Adoption Gate two-cycle self review
status: completed
source: requirements, diff, raw evidence, and regression output
---

# Cycle 1 — correctness and scope

1. **Finding:** the first integrated Target put scrolling on semantic `main`,
   conflicting with the detail Reference's observable overflow.
   **Fix:** moved scrolling to an unobserved outer content container and kept
   `main` semantically and stylistically equivalent.
2. **Finding:** status color and spacing differed from the fixed detail
   Reference.
   **Fix:** changed only the noncanonical Target. No Reference, comparator, or
   tolerance changed.
3. **Finding:** editing the fixed producer Gate scripts would change evidence
   packet digests and cascade through Conformance/Visual/Token evidence.
   **Fix:** adopted a post-Gate adapter that consumes the same raw filenames
   without modifying producers or saved evidence.
4. **Finding:** a plain reporter invocation could leave a stale half-published
   reviewer pair or expose reporter failure as Gate failure.
   **Fix:** added temporary outputs, two-file promotion, raw-hash checking, and
   a non-throwing skip path that removes only derived outputs.

# Cycle 2 — overclaim and regression risk

1. **Finding:** calling the old partial/form scripts a complete pass would be
   false; both pin a superseded Core hash.
   **Fix:** recorded the exact guard failure and used saved raw plus fresh
   current equivalent comparisons. The old expectations were not edited.
2. **Finding:** the current Diagnostic Gate did not reach its final summary
   because its negative expected exactly two focus errors; the current browser
   found a third legitimate error.
   **Fix:** retained the failing raw, verified all four positives and source
   restoration, and reported the brittle assertion rather than weakening it.
3. **Finding:** field-only grouping looked one entry smaller in the new detail
   data.
   **Fix:** inspected the values and confirmed it merged two different main
   heights. Exact grouping remains the selected rule.
4. **Finding:** a public command or schema could be implied by the word
   adoption.
   **Fix:** kept adoption local, optional, standalone, and derived; README and
   result explicitly leave CLI/API/schema/layout unfrozen.
5. **Finding:** the first publisher cleanup path detected a raw/derived path
   alias but could then delete that aliased raw path.
   **Fix:** final-output cleanup is now enabled only after all three paths are
   proven distinct. A dedicated alias probe verifies `skipped`, exit 0, and an
   unchanged, still-present raw report.

# Final review judgment

The claimed result is supported: unchanged exact grouping generalized to a
third responsibility, caught the negative, preserved traceability and status,
and was safely adopted as post-Gate presentation. The legacy harness issues
are evidence-maintenance problems, not hidden passes and not reasons to change
comparison semantics in this phase.
