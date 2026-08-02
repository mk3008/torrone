# Initial worker report — Run 1

- task_id: adaptation-run-1
- attempt: 1
- observed base: `b36cb1937a1f433661e2c94493b709494c6a9d40`
- status: blocked

## Changed paths

- `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-1/runs/run-1/initial-worker-report.md`

## Initial acceptance matrix

| Criterion | Status | Evidence |
| --- | --- | --- |
| Frozen inputs validate | not done | `check-frozen-input.ps1` reported `Frozen input digest mismatch: application-input-contract.md`. |
| Native initial artifact | not done | Not created; stop condition was reached before implementation. |
| Required shell states and interactions | not done | Not implemented or observed. |
| Initial verification record | done | This report records the blocking verification result. |

## Verification results

- `git rev-parse HEAD`: `b36cb1937a1f433661e2c94493b709494c6a9d40`
- `powershell -ExecutionPolicy Bypass -File docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-1/check-frozen-input.ps1`: failed with `Frozen input digest mismatch: application-input-contract.md`.

## Unverified limits

No implementation, JavaScript syntax check, browser observations, diff check, or
Run 1 implementation commit was performed, because the frozen-input digest
check failed. Implementation commit: not created.
