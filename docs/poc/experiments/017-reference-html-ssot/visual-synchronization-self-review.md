---
type: PoC self review
title: Reference visual rule synchronization two-cycle self review
status: completed
source: requirements, source diff, generated evidence, and rerun verification
---

# Cycle 1 — abstraction and evidence defects

## Findings

1. The first B draft created `--focus-width` and `--focus-offset`. Exact equality
   existed, but the prior correction evidence concerned the existing focus
   color token. The new names increased abstraction without a reproduced edit.
2. The first screenshot assertion treated every PNG byte hash as authoritative.
   A shell chevron transition differed by 55 pixels while the state/style
   comparison passed. A later baseline repeat moved byte noise to a form
   interaction frame, proving that a fixed filename allowlist would encode
   harness timing rather than a visual contract.
3. C's union selector hides per-Reference element scope. It currently produces
   equal output but would automatically style newly added element types that
   the original Reference did not opt into.

## Corrections

- Removed both invented B tokens and restored literal width/offset declarations
  beside each local selector. B now shares only three existing tokens.
- Replaced screenshot-hash pass/fail exceptions with complete mismatch
  recording. Kept exact repeated observation bundles and CLI comparison as the
  deterministic authority, then inspected the three final PNG differences at
  decoded-pixel level without adding a repository dependency.
- Retained C as evidence but rejected it from the recommendation. No
  Reference-specific classes, selectors, wrappers, or metadata were added to
  rescue it.

# Cycle 2 — false sharing, scope, and claim audit

## False-sharing audit

- Close text, muted, border, and muted-surface values remain local.
- Typography, primary/accent, danger, layout, theme overrides, and component
  declarations remain local.
- Canvas, surface, and focus color have exact equality, shared application-level
  meaning, and recorded synchronization pressure across shell, search, and
  form. The recommendation does not generalize from equal hex values alone.

## Cost and dependency audit

- B makes one Reference a two-file read instead of one. The shared file is five
  lines and linked directly; this is disclosed rather than counted as free.
- Common edits fall from three files/locations to one, but validation remains
  three References. The result does not claim test-cost reduction.
- Local edits remain one HTML and do not touch the shared layer.
- A missing shared file is a real dependency failure; existing browser network
  and computed-style checks expose it. No dependency graph is justified.
- B/C add no build, package, framework, generator, runtime, CLI/Core change, or
  Consumer contract.

## Authority and regression audit

- Fixed input hashes and the 62-file Conformance packet digest match before and
  after the final run.
- Nine candidate preflights passed; three established negative families failed.
- No Conformance rule was added without a new defect.
- The existing 381/439 diagnostic-noise evidence is reported and left out of
  scope.
- Canonical migration, Profile/API freeze, MCP, Consumer distribution,
  responsive work, other browsers, and real AT remain unclaimed.

# Final review conclusion

No remaining correctness issue blocks the bounded decision. The justified
status is `token-sharing-only`: B reduces a reproduced synchronization cost
with the smallest static dependency; C adds selector coupling without reducing
either tested probe; A remains the boundary for values without shared ownership.

