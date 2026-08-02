---
type: PoC blocked experiment assessment
title: Reference common-shell adaptation stability — Attempt 1
status: blocked before implementation
source: observed
---

# Blocked experiment assessment

## Outcome

**Status: not done.** The adaptation-stability question was not tested. All
three isolated native-browser Runs stopped at the mandatory frozen-input check,
before reading the application contract or producing an application shell.

This Attempt did not change the fixed Reference, its auxiliary Manifest
snapshot, the adaptation guidance, the validation script, or any target
implementation. That preserves the requested fixed-input condition, but means
there are no browser artifacts to compare.

## Shared finding

| Run | Base commit | Initial artifact | Stop condition | Problem classification |
| --- | --- | --- | --- | --- |
| Run 1 | `b36cb1937a1f433661e2c94493b709494c6a9d40` | not created | `Frozen input digest mismatch: application-input-contract.md` | `verification-condition-gap` |
| Run 2 | `b36cb1937a1f433661e2c94493b709494c6a9d40` | not created | `Frozen input digest mismatch: application-input-contract.md` | `verification-condition-gap` |
| Run 3 | `b36cb1937a1f433661e2c94493b709494c6a9d40` | not created | `Frozen input digest mismatch: application-input-contract.md` | `verification-condition-gap` |

The root worktree file matches the inventory hash:
`FBFEB90F8FE3079CCDD68ACFB31B20F4C74A2D327AC8D48B8C655114D8BFB951`
(2,564 bytes). In an isolated worker worktree the same text has CRLF line
endings (2,607 bytes) and hash
`158CAA261FCCD1C7E00839FECCEFA72E4DDE153685BC3E48B0031A9003732F65`.
After CRLF-to-LF normalization, the two texts compare equal. Sampling the
Reference and Manifest snapshot files showed the same worktree line-ending
conversion, so the check deterministically stops at the first listed file.

This is not evidence of an invariant failure, a parameter error, a default
deviation, a freedom variance, or a design-family divergence. Those categories
are **unconfirmed**, because no target implementation existed.

## Requested synthesis

| Requested measure | Result |
| --- | --- |
| Three Runs in one design family | unconfirmed — no shells were produced |
| Initial invariant satisfaction | not measurable (0 of 3 implementation artifacts) |
| Final invariant satisfaction | not measurable (0 of 3 implementation artifacts) |
| Corrections per Run | 0; no correction was eligible because no implementation existed |
| Common misunderstanding | none observed; all Runs encountered the same harness condition before consuming the inputs |
| Reference approach improved stability | unconfirmed |
| Safe to expand to the next Pattern | no |
| Fix Reference or Manifest and rerun | no; they were not implicated |
| Stop this direction permanently | no evidence for that conclusion |

## Boundary-respecting next action

Close this Attempt as a verification-condition failure. If the experiment is to
be rerun, start a **new** frozen Attempt after making the integrity check
portable across the repository's declared checkout line-ending behavior (for
example, hash Git blob bytes or define a canonical line-ending normalization).
Re-freeze the inventory and repeat all three independent Runs from the same
fixed Reference. Do not repair a single Run or use these reports as Reference
quality evidence.

## Evidence

- [Run 1 report](runs/run-1/initial-worker-report.md)
- [Run 2 report](runs/run-2/initial-worker-report.md)
- [Run 3 report](runs/run-3/initial-worker-report.md)
- [Frozen input check](check-frozen-input.ps1)
- [Frozen inventory](input-inventory.json)
