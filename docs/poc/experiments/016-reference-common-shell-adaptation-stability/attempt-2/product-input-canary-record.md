# Product-input canary record

The canary is run from the product-input freeze commit in an isolated worktree.
It checks normal checkout and CRLF-only success, then verifies failure for a
substantive contract edit, a staged edit, and an untracked file inside
`product-input/`. No adaptation implementation is created.

## Observed result

All checks behaved as required in an isolated worktree from the freeze commit:
normal checkout and a CRLF-only rewrite passed (exit 0); a substantive edit
failed as unstaged (exit 1); staging it failed for canonical blob and staged
drift (exit 1); and an added untracked probe was reported (exit 1).

## Dispatch decision

The product-owned input is unique and portable-preflight ready. The three Runs
remain **not dispatched** pending human review of this freeze.
