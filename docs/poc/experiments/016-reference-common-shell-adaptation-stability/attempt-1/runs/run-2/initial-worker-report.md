# Initial Worker Report — Run 2

- task_id: adaptation-run-2
- attempt: 1
- observed base: `b36cb1937a1f433661e2c94493b709494c6a9d40`
- status: blocked

## Changed paths

- `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-1/runs/run-2/initial-worker-report.md`

No implementation files were created or changed.

## Initial acceptance matrix

| Criterion | Status | Evidence |
| --- | --- | --- |
| Native initial common-shell artifact | not done | Implementation was not started. |
| Reference invariants | not done | Implementation was not started. |
| Supplied application parameters | not done | Implementation was not started. |
| Initial verification record | done | This record preserves the pre-implementation stop condition. |

## Verification results

- `git rev-parse HEAD`: passed — `b36cb1937a1f433661e2c94493b709494c6a9d40`, matching the required base.
- `powershell -ExecutionPolicy Bypass -File docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-1/check-frozen-input.ps1`: failed — `Frozen input digest mismatch: application-input-contract.md`.

## Unverified limits

The frozen-input failure is a stop condition. No frozen contract was read, no
application implementation was created, and no syntax, browser, diff, or
commit verification was run.

## Implementation commit

None. No implementation commit was created.
