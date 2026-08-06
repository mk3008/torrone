---
task_id: run-1
attempt: 2
role: worker
status: ready_for_review
base_commit: e54d05742b7097bfe1e4670ebc1a8c83b2155e14
correction_commit: 0109f0a
---

# Run 1 attempt 2 correction report

## Correction

Changed only Run 1's React CSS implementation. The shell is now a
viewport-height flex column with a fixed-height Header and an overflow-hidden,
flex-bounded body. The Drawer and workspace retain their own `overflow: auto`
regions. The fixture grid uses four columns so the supplied 80 items provide a
reliable workspace-overflow proof at the fixed viewport.

Frozen inputs, harness configuration, initial report, and initial captures were
not changed. Exact tokens, all seven fixed SVGs, binding map, state behaviour,
and product fixture remain intact.

## Verification

All five preflights passed after the correction:

| Check | Result |
| --- | --- |
| Reference fixed input | passed |
| Product input | passed |
| Attempt 3 visual bindings | passed |
| Attempt 4 vNext input | passed |
| React harness with Run-root configuration equality | passed |

`npm run typecheck` and `npm run build` both passed. The Attempt 3 visual
binding validator and vNext SVG rendering-contract validator also passed.

## HTTP capture and scroll proof

An attributable Run 1 Vite server on `127.0.0.1:4175` served the fixed URLs at
1440 x 900. It returned HTTP 200 before capture and was stopped after capture.
The five resulting screenshots are in `correction-attempt-2-captures/`:

- `light.png`
- `dark.png`
- `drawer-hidden.png`
- `workspace-collapsed.png`
- `section-01.png`

The browser DOM measurement is recorded in
`correction-scroll-metrics.json` and proves both independent regions overflow:

| Region | scrollHeight | clientHeight |
| --- | ---: | ---: |
| Drawer | 1374 | 840 |
| Workspace | 1247 | 840 |

## Commit

Correction and evidence commit: `0109f0a fix(poc): bound React common shell scroll regions`.
