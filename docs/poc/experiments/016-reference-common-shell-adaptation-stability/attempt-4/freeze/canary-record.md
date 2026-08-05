---
type: portable preflight canary record
title: Attempt 4 vNext input freeze
status: passed
verified_on: 2026-08-06
baseline_commit: a3ef3fa680314a3b2721076698b13dbe97d0ead4
---

# Attempt 4 portable preflight canary

## Isolation method

The canary created a detached Git worktree from
`a3ef3fa680314a3b2721076698b13dbe97d0ead4` at a short path under `C:\tmp`.
The portable preflight was executed from the preparation directory while its
repository root was the isolated worktree. The worktree was removed after the
canary completed.

## Results

| Case | Expected outcome | Result |
| --- | --- | --- |
| Normal checkout | pass | pass |
| CRLF-only representation of `reference-contract.md` | pass | pass |
| Unstaged substantive contract edit | reject | rejected |
| Unstaged token edit | reject | rejected by the Attempt 3 visual-binding preflight |
| Unstaged fixed SVG edit | reject | rejected by the Attempt 3 visual-binding preflight |
| Staged substantive contract edit | reject | rejected |
| Untracked file under the vNext fixed root | reject | rejected |
| Restored clean canary | pass | pass |

The normal and restored-pass checks also invoked the unchanged Reference,
product-owned, and Attempt 3 preflights. The CRLF-only case changed checkout
representation only; it was not treated as a content change.

## Boundary

This canary created no application implementation, selected no framework,
and dispatched no Run. It validates input identity and change detection only;
technology neutrality and reproducibility remain evidence questions for the
next framework-adaptation artifacts.
