# Initial Worker Report — Run 3

- task_id: adaptation-run-3
- attempt: 1
- observed base commit: `b36cb1937a1f433661e2c94493b709494c6a9d40`
- status: blocked

## Changed paths

None. No implementation files were created or modified.

## Initial acceptance matrix

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| Native HTML, CSS, and JavaScript common shell | not done | Blocked before implementation by frozen-input integrity failure. |
| Reference invariants | not done | Blocked before implementation by frozen-input integrity failure. |
| Supplied application parameters | not done | The application input contract failed its digest check and was not used. |
| Initial verification record preserved | done | This report records the blocking verification result. |

## Verification

- `git rev-parse HEAD` → `b36cb1937a1f433661e2c94493b709494c6a9d40` (matches the required base commit).
- `powershell -ExecutionPolicy Bypass -File docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-1/check-frozen-input.ps1` → failed: `Frozen input digest mismatch: application-input-contract.md`.
- `node --check`, browser observation, and `git diff --check` were not run because the frozen-input failure is an explicit stop condition.

## Unverified limits

All implementation and behavioral acceptance criteria remain unverified. No
implementation commit was created.

## Implementation commit

None.
