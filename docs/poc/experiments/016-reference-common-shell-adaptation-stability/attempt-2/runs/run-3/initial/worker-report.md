---
type: isolated worker report
experiment: reference common-shell adaptation stability
attempt: 2
run: 3
status: ready_for_review
---

# Run 3 initial worker report

## Delivery

- Implementation commit: `803759c` (`poc: add Run 3 shell adaptation`)
- Base supplied by the orchestrator: `c44c997`
- Changed implementation paths:
  - `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/runs/run-3/initial/index.html`
  - `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/runs/run-3/initial/styles.css`
  - `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/runs/run-3/initial/app.js`

## Verification

- `powershell -NoProfile -ExecutionPolicy Bypass -File docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/check-fixed-input.ps1` — passed.
- `powershell -NoProfile -ExecutionPolicy Bypass -File docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/check-product-input.ps1` — passed.
- `node --check docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/runs/run-3/initial/app.js` — passed.
- `git diff --cached --check -- docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/runs/run-3/initial` — passed before the implementation commit.

## Scope note

This report records an independently authored, browser-native adaptation of the approved Reference using only the frozen product inputs. It does not claim pixel equality or completed human review.
