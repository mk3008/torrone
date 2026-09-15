---
type: two-cycle self review
title: Form-heavy partial Reference reuse self review
status: completed
source: requirements, sources, Gate evidence, and rendered-state inspection
---

# Cycle 1: correctness and regression risk

## Findings corrected

1. **Validation summary did not appear.** Both implementations treated
   `aria-invalid` as a toggle attribute, creating an empty value, while summary
   logic selected the literal value `true`. Both helpers now write the string
   value and remove it on correction. Final screenshots and state assertions
   confirm the summary and cleanup.
2. **Independent form styles leaked into the fixed shell.** The first Target
   comparison exposed typography, landmark, hidden-state, active-navigation,
   and theme mismatches. Target-only shell and form scopes now reproduce the
   fixed shell contract without sharing source.
3. **Integrated dark primary action missed contrast.** The first dark Target
   used a color producing 4.32 contrast against the existing 4.5 threshold.
   One Target declaration was corrected; the final comparison has zero errors.
4. **Scenario overrides used the wrong root shape.** The CLI rejected the file
   before replay. It now uses the supported `overrides` container; no parser or
   comparison behavior changed.
5. **Repeat determinism initially compared captures without matching artifact
   arguments.** Repeat calls now receive their own artifact directories, so
   snapshot JSON is byte-identical rather than differing only in artifact path
   fields.
6. **Target source metrics overstated explicit keys.** The record now derives
   explicit, semantic, and total counts from source and the observed inventory
   rather than hard-coded assumptions.
7. **Nested PowerShell launches stopped at the initial CDP command.** Edge and
   Chrome nested runs each exercised and exhausted the existing one-retry
   boundary, while direct probes and the final one-level Gate succeeded. The
   authoritative evidence fixes Chrome 151 as its single browser. The cause was
   not pursued further, and no browser-support claim or CLI/Core behavior was
   added.

## Regression conclusion

Fixed hashes and packet digests are asserted before and after the Gate. The
accepted Reference, prior partial sources and outputs, Core, CLI, historical
negative, and semantic-only negative are unchanged. The current relationship
negative fails on both intended paths. No existing criterion was relaxed.

# Cycle 2: scope, evidence, and reporting claims

## Scope audit

- No accepted/prior artifact was edited or overwritten.
- No shared CSS, runtime composition, dependency, framework, build, scope
  metadata, diagnostic suppression, conformance CLI, MCP, responsive behavior,
  other browser, real AT, stage, commit, or push was added.
- The form boundary contains one causal workflow and was not split into fields,
  errors, or actions.
- Final create/cancel/backend/navigation behavior remains unspecified.

## Evidence audit

The `form-partial-beneficial` claim is supported by a direct-browser standalone
Reference, independent integrated Target, exact union contract, two zero-error
comparisons, deterministic captures, preserved negatives, source-independence
checks, fixed-evidence guards, maintenance metrics, and visual review.

The result does not claim that 440 lines is universally small, that the form
boundary is canonical, that shared tokens should be introduced, or that the
CLI diagnostics require a particular fix. Historical whole-screen and current
Target size comparisons are labelled as proxies because they are not
content-equivalent form References.

## Remaining risks

- Differential comparison cannot detect a defect shared by Reference and
  Target.
- Raw information diagnostics are increasingly costly to read.
- Global visual tokens now recur in three standalone files.
- Date presentation and final action behavior remain product decisions.
- Bounded accessibility observation is not real AT evidence.

# Final self-review decision

No remaining issue blocks the bounded Gate. The evidence supports
`form-partial-beneficial`, with recurring CSS synchronization and diagnostic
noise explicitly carried forward as separate, unresolved concerns.
