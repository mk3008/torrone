---
type: PoC verification-condition preparation
title: Reference common-shell adaptation stability — Attempt 2
status: completed; human review pending
source: authored
---

# Attempt 2 — portable fixed-input preflight

## Issue and value

Attempt 1 is closed as a `verification-condition-gap`. Its three preflight
failures came from checkout line-ending conversion, before any Run consumed the
Reference or implemented a shell. It is excluded from every stability,
invariant-coverage, correction-burden, and design-family measure.

Attempt 2 verifies the approved Reference and auxiliary Manifest through Git's
canonical objects. A future isolated Run can therefore distinguish a harmless
CRLF/LF checkout representation from a real source change.

## Canonical fixed inputs

[fixed-input-blobs.json](fixed-input-blobs.json) lists the 52 approved files
and their Git blob object IDs from `9cd1932` (`reference-common-shell-v0.1`).
The target roots are the approved Reference and the existing Manifest source;
they are not copied, edited, or normalized by this Attempt.

The application-specific facts used in Attempt 1 are not part of this list:
they did not exist in the approval commit and must be frozen separately before
any future Run dispatch. This preflight is intentionally a Reference/Manifest
identity guard, not a replacement for product-input freezing.

## Preflight guarantees

[check-fixed-input.ps1](check-fixed-input.ps1) verifies, for every target root:

1. each recorded object ID still resolves from the approved commit;
2. the working tree has no canonical Git difference from that commit;
3. there is no staged or unstaged difference; and
4. no untracked path exists inside a fixed target root.

Git comparison uses the repository's clean/smudge semantics, so a checkout-only
CRLF/LF conversion does not change the outcome. A substantive text or binary
edit does. The existing Reference semantic check remains invoked unchanged.

## Scope and outcome

This Attempt preserves the approved Reference, Manifest, guidance, validation,
and global `.gitattributes`. It contains three separately preserved
browser-native adaptations plus bounded implementation-only corrections. It does not alter
the frozen inputs, the Reference, or any other Pattern or framework.

See [canary-record.md](canary-record.md) and
[product-input-canary-record.md](product-input-canary-record.md) for fixed
input evidence. The reviewer records and the human decision packet are:

- [Run 1 review](runs/run-1/review.md)
- [Run 2 review](runs/run-2/review.md)
- [Run 3 review](runs/run-3/review.md)
- [three-Run comparison](comparison/attempt-2-comparison.md)
- [Manifest-method comparison](comparison/manifest-method-comparison.md)
- [human review packet](human-review.md)
