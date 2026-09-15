---
type: PoC canary record
title: Attempt 2 portable fixed-input preflight
status: passed
source: observed
---

# Canary record

## Environment

- Canary worktree: isolated temporary worktree from `a71fce7`.
- Candidate: the staged Attempt 2 preparation patch applied only to that
  worktree; no adaptation implementation was created.
- Approved baseline: `9cd19321e53f6279e956df8a6d1fe562c3360544`.

## Results

| Check | Command shape | Result |
| --- | --- | --- |
| Normal checkout | `check-fixed-input.ps1` | pass; 52 fixed files |
| CRLF-only rewrite | rewrite Reference `README.md` line endings only, then run the check | pass; `git diff --quiet` exit 0 |
| Text content mutation | append a canary sentence to the Reference `README.md` | fail; baseline and unstaged differences detected |
| Staged mutation | stage that same temporary Reference mutation | fail; staged difference detected |
| Binary mutation | flip one byte in approved PNG `docs/poc/experiments/001-workspace-shell/evidence/raw/source-expanded-1280x720.png`, passed as an additional target | fail; baseline and unstaged differences detected |
| Untracked path | add `canary-untracked-probe.txt` under the Reference root | fail; untracked fixed-target path detected |

The PNG is a canary-only binary probe from the approved baseline. It is not a
future common-shell input and is not added to the 52-file fixed Reference /
Manifest inventory.

## Interpretation

The normal and CRLF-only checks demonstrate that checkout representation is not
treated as a content change. The text, staged, binary, and untracked tests show
that the preflight is not disabled or weakened: Git's canonical baseline and
the clean/index/working-tree checks still reject substantive drift.

## Dispatch decision

**Not yet dispatched.** Attempt 2's Reference/Manifest identity condition is
ready for future Runs. Before dispatch, freeze the application-specific input
as a separate product-owned artifact and perform the normal three-Run setup.
Do not count Attempt 1 in that evaluation.
