---
type: PoC maintenance cost record
title: Reference visual rule synchronization cost
status: completed comparison
source: fixed References, new Variants, static source audit, and reversible probes
---

# Scope

This record compares three Reference-Library-internal authoring choices. It does
not propose that a Consumer import Reference CSS, tokens, classes, DOM, or a
runtime.

- **A — self-contained:** the three fixed existing References.
- **B — token only:** one five-line static stylesheet containing three existing
  values; selectors and all component styling remain in each HTML file.
- **C — visual primitive:** one static stylesheet containing the same values
  plus a union focus selector and its declaration block.

# Meaning audit

The audit did not equate matching text with shared ownership.

| Classification | Values or rules | Reason |
| --- | --- | --- |
| Share candidate | canvas, surface, focus color | Exact across shell, search, and form; prior records identify surface/focus synchronization, and a focus-token correction already required edits in every part. |
| Keep local | text, muted text, border, muted/selected surfaces | Names recur, but approved values differ. Similarity is not one contract. |
| Keep local | accent/primary, danger, typography, layout, component rules | Different responsibilities and independent change reasons. |
| Keep local in B | focus selector, width, and offset | Current output matches, but the observed maintenance problem was the existing focus token. New width/offset tokens would add abstraction without a reproduced correction. |

The common-shell dark overrides remain local. Sharing the light token does not
turn theme implementations into one rule.

# Static authoring cost

The counts describe authored CSS declaration occurrences across the three HTML
files plus a shared file once where applicable. They are not a quality score.

| Measure | A | B | C |
| --- | ---: | ---: | ---: |
| Authored files in the three-Reference set | 3 | 4 | 4 |
| Files needed to resolve one Reference's complete style source | 1 | 2 | 2 |
| Static stylesheet imports across the set | 0 | 3 | 3 |
| CSS declaration occurrences | 510 | 504 | 500 |
| Exact duplicate declaration occurrences | 254 | 248 | 244 |
| Custom-property definition occurrences | 43 | 37 | 37 |
| New build/runtime/dependency requirements | 0 | 0 | 0 |
| CLI/Core changes | 0 | 0 | 0 |

B removes six repeated definitions without inventing token names. C removes
four more declaration occurrences, but line reduction alone is not its decision
case.

# Common maintenance probe

The disposable probe changed the already recurring light focus color. Every
changed Reference failed computed-style comparison on `outlineColor`, and each
probe tree was restored byte-for-byte.

| Cost | A | B | C |
| --- | ---: | ---: | ---: |
| Changed files | 3 | 1 | 1 |
| Changed locations | 3 | 1 | 1 |
| Restore writes | 3 | 1 | 1 |
| Required fan-out validation commands | 3 | 3 | 3 |

Sharing reduces author edits and missed-synchronization risk. It does not
reduce the review or validation breadth: all three dependent References still
need observation.

# Local maintenance probe

The disposable probe changed only the form workflow danger color.

| Cost | A | B | C |
| --- | ---: | ---: | ---: |
| Changed files and locations | 1 / 1 | 1 / 1 | 1 / 1 |
| Shared-layer edits | 0 | 0 | 0 |
| Negative validation commands | 1 | 1 | 1 |
| Restore writes | 1 | 1 | 1 |

For B and C, the shared file, shell HTML, and workspace HTML hashes remained
unchanged. Thin sharing therefore did not make this local correction global.

# Understanding and review cost

A remains strongest for isolated reading: one file explains one Reference. B
adds one predictable five-line lookup and keeps the selector beside the element
types and component CSS it affects. It remains directly browser-loadable from
`file://`, with no command or build step.

C has the same file/import cost as B but moves element scope out of every HTML.
Its union selector applies `a` to form pages and `textarea` to shell/search pages
even though those element types are not currently present there. The current
output is equal, but future element additions acquire a hidden cross-Reference
rule. Avoiding that coupling would require Reference-specific selectors,
classes, or metadata in the shared file, which is a worse boundary.

AI and human reviewers therefore pay one small additional lookup for B. C pays
the same lookup while also hiding scope. A common change requires review of the
shared file and all three rendered consumers under B/C; a local change requires
only the changed HTML and its rendered Reference under every candidate.

# Cost conclusion

B has the lowest demonstrated total cost for the recurring problem. A remains
appropriate for values without common ownership or recurrence. C's additional
four-declaration reduction did not reduce either tested maintenance probe and
introduced a concrete prediction/coupling cost.

