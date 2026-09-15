# Attempt 6 Run 2 initial worker report

Status: `ready_for_review` for the orchestrator's serial HTTP observation. The implementation and repository checks are durable; browser captures and console evidence are explicitly not accepted yet.

## Identity and scope

- Task: `run-2`
- Attempt: `1`
- Worker thread: `019fe170-f2cf-7af2-9b9d-cecfeba39e43`
- Base commit: `04da0dfd30b0e9d26c3e7d98480ee35c4fc9b395`
- Assigned root: `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/runs/run-2/initial/`
- Changed paths: only the assigned root. `git status --short --untracked-files=all` reported no path outside it.
- Implementation correction count: `1`
- Observation-tool correction count: `2`

## Initial artifacts

- React implementation: [src/HarnessApp.tsx](src/HarnessApp.tsx)
- Plain CSS implementation: [src/harness.css](src/harness.css)
- Product fixture copy: [fixture.json](fixture.json)
- Frozen visual bindings: [reference-visual-bindings/](reference-visual-bindings/)
- Binding evidence: [visual-binding-evidence.json](visual-binding-evidence.json)
- Fixed harness configuration: [package.json](package.json), [package-lock.json](package-lock.json), [tsconfig.json](tsconfig.json), [tsconfig.app.json](tsconfig.app.json), [tsconfig.node.json](tsconfig.node.json), and [vite.config.ts](vite.config.ts)
- Observation conflict record: [output/playwright/observation-conflict.md](output/playwright/observation-conflict.md)
- Vite startup evidence: [output/playwright/vite.stdout.txt](output/playwright/vite.stdout.txt) and [output/playwright/vite.stderr.txt](output/playwright/vite.stderr.txt)

Generated `node_modules/`, `dist/`, and TypeScript build-info files remain ignored harness outputs and are not durable review artifacts.

## Verification results

### Owner preflights before implementation

All passed from the isolated worktree:

1. `attempt-2/check-fixed-input.ps1` — Reference static check and fixed-input preflight passed (`52` files).
2. `attempt-2/check-product-input.ps1` — product-input preflight passed (`1` file).
3. `attempt-3/freeze/check-attempt-3-input.ps1` — visual-binding provenance and input preflight passed (`24` files).
4. `attempt-4/freeze/check-attempt-4-input.ps1` — vNext input preflight passed (`11` files).
5. `attempt-5/freeze/check-react-harness-input.ps1` — React harness input preflight passed (`14` files).
6. `attempt-6/freeze/check-product-fixture-input.ps1` — approved product fixture preflight passed (`5` files).

### Owner preflights after the final implementation edit

The same checks all passed again. The React harness check was run with:

```text
check-react-harness-input.ps1 -RunRoot docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/runs/run-2/initial
```

It reported `files=14` and the assigned Run root, proving the derived package, lockfile, TypeScript configuration, Vite configuration, and local ignore file still match the canonical harness.

### Install, typecheck, and build

| Check | Result | Notes |
| --- | --- | --- |
| `node --version` | `done` | `v22.14.0` |
| `npm --version` | `done` | `10.9.2` |
| `npm ci` | `done` | The first sandboxed invocation hit `EPERM` on the user npm cache. The identical locked install passed after approved escalation: `65` packages installed, `66` audited. The frozen graph reports one moderate and one high audit finding; no dependency or lockfile was changed. |
| `npm run typecheck` | `done` | The first run found one TypeScript union-inference error in the destination list. A single typing-only implementation correction was applied; the final run passed. |
| `npm run build` | `done` | Vite `5.4.14`; `35` modules transformed; production build completed. |
| Test suite | `not done` | The fixed harness supplies no test script. The required typecheck, production build, and repository static checks were used. |

### Contract and asset checks

| Check | Result | Output |
| --- | --- | --- |
| vNext static check | `done` | `Reference contract vNext candidate static check passed.` |
| Attempt 3 visual-binding check | `done` | `Visual binding validation passed.` |
| SVG rendering contract check | `done` | `SVG rendering contract static check passed`; `themed-assets=7`. |
| `git diff --check` | `done` | No whitespace error reported. |

The implementation uses the permitted CSS-mask family. Each mask references the unchanged canonical SVG and paints it with `background-color: currentColor`; no canonical SVG is rendered through a direct external `<img>`.

## Browser and capture evidence

The fixed `127.0.0.1:4175` port was concurrently owned by another local process. Run 2 Vite exited under `--strictPort`. A Playwright session reached the already-running origin before the ownership mismatch was detected. Its visible structure did not match Run 2, so its snapshot and console output were rejected immediately and its temporary session artifacts were removed.

Per `[OBSERVATION_CLARIFICATION]`, the orchestrator will perform serial per-Run HTTP observation after all three initial implementations are durable. No implementation change was made for the port conflict.

| Required 1440x900 state | Result | Evidence / next action |
| --- | --- | --- |
| Light, Drawer open | `not done` | Pending orchestrator serial observation. |
| Dark, Drawer open | `not done` | Pending orchestrator serial observation. |
| Drawer hidden | `not done` | Pending orchestrator serial observation. |
| Workspace expanded | `not done` | Pending orchestrator serial observation. |
| Workspace collapsed | `not done` | Pending orchestrator serial observation. |
| Section 01 selected | `not done` | Pending orchestrator serial observation. |
| `focus-visible` | `not done` | Pending orchestrator serial observation. |
| Hover | `not done` | Pending orchestrator serial observation; if it cannot be sustained automatically there, apply the specified human gate. |
| Browser console | `not done` | The foreign-origin console result is not accepted. Pending orchestrator serial observation. |

## Acceptance matrix

| Acceptance criterion | Verification method | Result | Repository evidence | Supplementary evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| Frozen owner inputs remain unchanged | All six owner preflights before and after implementation | `done` | This report and the canonical preflight scripts | Recorded command output | High |
| Derived React harness configuration matches the freeze | Harness preflight with `-RunRoot` | `done` | Fixed configuration files in this Run | Recorded command output | High |
| React + TypeScript + Vite implementation builds | Locked install, final typecheck, production build | `done` | `src/`, package files, this report | Recorded command output | High |
| Header, Drawer, Main, independent scroll regions, and removed hidden Drawer track | Source inspection plus production build | `partial` | [src/HarnessApp.tsx](src/HarnessApp.tsx), [src/harness.css](src/harness.css) | Rendered transitions pending | Medium |
| Exact tokens, state-icon pairing, named locations, selection surface/foreground/indicator | Unchanged asset copy plus visual-binding static check | `partial` | [reference-visual-bindings/](reference-visual-bindings/), [visual-binding-evidence.json](visual-binding-evidence.json), CSS bindings | Rendered placement and cascade pending | Medium-high for static integration; unconfirmed for rendering |
| All seven fixed SVGs preserve geometry and themed `currentColor` output | SVG rendering static check plus CSS-mask integration | `partial` | Canonical icons and [src/harness.css](src/harness.css) | Light/dark perceptibility pending | Medium-high for static integration; unconfirmed for rendering |
| `Overview`, `Workspace`, exactly `Section 01–03`, then `Activity`; collapse hides only children and preserves selection state | Approved fixture, React hierarchy/state model, typecheck/build | `partial` | [fixture.json](fixture.json), [src/HarnessApp.tsx](src/HarnessApp.tsx) | Expanded/collapsed/selected browser evidence pending | Medium |
| Accessible names for Drawer, theme, search, and Workspace controls | React source attributes and successful typecheck/build | `partial` | [src/HarnessApp.tsx](src/HarnessApp.tsx) | Accessibility tree observation pending | Medium |
| Required captures, hover, focus-visible, and console evidence | Fixed-port Playwright observation | `not done` | [observation-conflict.md](output/playwright/observation-conflict.md) | Orchestrator serial observation required | High confidence in the stated gap |

## Finding taxonomy

No accepted browser artifact exists yet, so this worker does not claim that rendered `exact-binding-miss` or `structural-invariant-miss` findings are absent.

| Classification | Initial result |
| --- | --- |
| `exact-binding-miss` | None detected by the static binding and SVG checks; rendered result remains unconfirmed. |
| `structural-invariant-miss` | None identified in source/build verification; rendered behavior remains unconfirmed. |
| `reference-binding-gap` | None identified. |
| `adaptation-instruction-gap` | None identified. The missing local packet file was repaired through authoritative transport without changing the instructions. |
| `validation-gap` | None declared. The port conflict is recorded as an observation-tooling issue with a serial-observation recovery path, per orchestrator clarification. |
| `allowed-implementation-freedom` | React component/state structure, CSS organization, neutral workspace card treatment, CSS-mask integration, and non-canonical hover treatment described below. |

## Corrections and unlisted judgments

### Implementation correction count: 1

- Replaced an ambiguous `flatMap` union inference with an explicitly typed reduction after the first typecheck. No visual, interaction, fixture, asset, or harness configuration changed.

### Observation-tool correction count: 2

1. Re-ran the identical `npm ci` with approved escalation after the sandbox denied access to the user npm cache.
2. Rejected and removed the browser session evidence after the fixed-port owner mismatch was detected; retained only the Run 2 startup-conflict evidence.

### Unlisted implementation judgments

- Used CSS masks because the vNext SVG contract explicitly permits them and they apply the theme foreground through `currentColor` without changing canonical geometry.
- Treated `Workspace` as a disclosure-only parent control. `Overview`, `Activity`, and the three children are selectable destinations; parent collapse does not rewrite `currentDestination`.
- Kept the hidden Drawer in the React tree with the HTML `hidden` attribute while removing its grid track. This preserves the Header control relationship without reserving layout or exposing hidden navigation to accessibility APIs.
- Used a token-derived `color-mix()` hover background distinct from selection. It is an implementation-level response, not a claim that a canonical global hover token exists.
- Chose neutral workspace spacing, typography, and cards as adaptation freedom because no fixed input binds those details.

## Gates and next action

- Human gate: none raised by this worker.
- Observation gate: orchestrator serial HTTP observation is required for every capture state and browser console evidence before independent review.
- If serial automation cannot sustain hover, the orchestrator should convert hover to the specified human gate instead of claiming automated success.
- No initial Run repair or visual self-review was performed after the observation clarification.
