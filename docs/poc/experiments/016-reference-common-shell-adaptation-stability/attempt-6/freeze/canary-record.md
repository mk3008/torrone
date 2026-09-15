---
type: portable preflight canary record
status: passed
---

# Attempt 6 product fixture preflight canary

## Method

The canary created an isolated detached Git worktree under `C:\tmp` from the
current repository state. It used
[check-product-fixture-input.ps1](check-product-fixture-input.ps1) with the
Attempt 6 inventory and removed the temporary worktree after the checks.

## Results

- Normal checkout: passed.
- CRLF-only representation of `fixture.json`: passed.
- Child-to-top-level hierarchy mutation: rejected.
- Item-label mutation: rejected.
- Top-level item order mutation: rejected.
- Staged `fixture.json` difference: rejected.
- Untracked file under the fixed candidate root: rejected.
- Clean restoration: passed.

The test changed only the isolated canary worktree. The candidate source,
fixed input inventory, and repository working tree were not changed by it.
