---
type: PoC portable-preflight canary record
title: Attempt 3 visual-binding input freeze
status: passed
executed_on: 2026-08-03
baseline_commit: 1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff
---

# Attempt 3 portable-preflight canary

## Isolation

`run-preflight-canary.ps1` created a temporary detached Git worktree from
`1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`. It performed no application
implementation and removed only that temporary canary worktree after the
checks completed.

## Results

| Canary case | Result | What it proves |
| --- | --- | --- |
| Normal checkout | passed | All Reference-owned, product-owned, and Attempt 3 visual-binding-owned preflights accept the frozen inputs. |
| CRLF-only rewrite of `visual-tokens.css` | passed | Git canonical comparison does not treat checkout line endings as content drift. |
| Unstaged token mutation | rejected | A substantive palette-token change is detected. |
| Staged SVG mutation | rejected | A fixed icon asset and staged difference are detected. |
| Binding-map location mutation | rejected | Icon/state/location mapping is fixed, not advisory. |
| Validation-document mutation | rejected | The visual-binding validation input cannot drift silently. |
| Untracked file under `reference-owned/visual-bindings/` | rejected | Extra material inside a fixed visual-binding root is detected. |
| Restored canary | passed | The checker returns to a clean state after each intentional mutation. |

## Commands exercised

The canary ran:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File \
  docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/check-fixed-input.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File \
  docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/check-product-input.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File \
  docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/freeze/check-attempt-3-input.ps1
```

The first two checks keep the approved Reference/Manifest and product facts
separate from the third, which freezes the Attempt 3 visual-binding candidate.

## Dispatch decision

The fixed-input condition is ready. **No Attempt 3 Run has been started.** A
future three-Run dispatch still requires explicit human authorization and must
run all three preflights from each isolated worktree.
