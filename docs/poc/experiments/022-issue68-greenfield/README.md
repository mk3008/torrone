# Issue 68 — Greenfield document-tab comparison

[Issue #68](https://github.com/mk3008/torrone/issues/68) compares Prompt Only, Torrone and Storybook on the same document-tab workspace. This directory contains the frozen oracle, the submitted source and evidence, and the inputs for all three trials.

## Results

The original tab control passed all 15 checks in both replay modes. Each approach started in its own empty project with a fresh session using the same model and common brief. Each received one round of feedback on its own failing checks.

| Oracle outcome | Prompt Only | Torrone | Storybook |
| --- | ---: | ---: | ---: |
| First → final total | 9/15 → 10/15 | 8/15 → 13/15 | 6/15 → 6/15 |
| Desktop fit, overflow and restore | 2/5 → 2/5 | 5/5 → **5/5 ★** | 3/5 → 3/5 |
| Mobile fit, overflow and restore | 5/7 → 6/7 | 3/7 → **7/7 ★** | 3/7 → 3/7 |
| Desktop scroll retains selection | 0/1 → 0/1 ★ | 0/1 → 0/1 ★ | 0/1 → 0/1 ★ |
| Mobile selection fills the available width | 1/1 → **1/1 ★** | 0/1 → 0/1 | 0/1 → 0/1 |
| Document switch recalculates the child row | 1/1 → **1/1 ★** | 0/1 → **1/1 ★** | 0/1 → 0/1 |

Stars mark the highest final score or a tie. The desktop scroll row is a tie with all three failing. The original strict script stopped at the first failure for every candidate. The per-check totals come from the continuation runner, which preserves the existing expectations and records failures before continuing.

| Effort and quality | Prompt Only | Torrone | Storybook |
| --- | ---: | ---: | ---: |
| Arm-specific preparation | 0.0 s ★ | 0.1 s | 29.2 s |
| Time to first submission | 196.8 s | **145.6 s ★** | 248.7 s |
| Repair rounds | 1 ★ | 1 ★ | 1 ★ |
| Time in repair session | 191.8 s | **164.0 s ★** | 227.8 s |
| Timed preparation, implementation, repair, build and evaluation | 397.9 s | **318.9 s ★** | 507.5 s |
| Model input plus output | 220,763 tokens | **139,974 tokens ★** | 379,928 tokens |
| Final implementation quality checklist | **5/6 ★** | 4/6 | **5/6 ★** |
| Billed cost and human effort | N/A | N/A | N/A |

The [raw metrics](./metrics.json) contain results by case, model usage and the timing breakdown. The time total adds measured intervals. It excludes unmeasured common preparation, human effort and the historical cost of creating the Torrone catalog. Storybook's post-submission tool and play checks bring its recorded intervals to 550.9 s.

## Review findings

- **Torrone** used the catalog, design wizard guidance and implementation guidance. No matching approved executable Reference was identified. The result stayed closest to the reference's stacked visual hierarchy and improved by five oracle checks after repair. Its final parent-row gap measured 7 px where the oracle expects 6 px. Both choosers closed on Escape but failed to return focus to the trigger. The submission drew its icons with CSS and characters despite having official icon files.
- **Prompt Only** scored highest on the initial run, used the available width beside the count buttons and passed all three supplementary interaction checks. It used the supplied Lucide assets. Desktop exact fit and one narrow boundary case remained incorrect. Its parent tab was taller than the reference because it added a visible affiliation line.
- **Storybook** used official Storybook 11.0.0-beta.1 guidance and created five new stories. Both revisions built, and the CLI discovered five stories and created a local review. Both play runs recorded one success, two missing controls and two exceptions when clicking. No component documentation entries were discovered. The narrow screen clipped both tab rows without providing the chooser buttons. The official play checks and review were executed after submission, which limited their role in self-repair. [Storybook 11 beta](https://storybook.js.org/blog/storybook-11-beta/)
- The desktop scroll oracle reads `scrollLeft` on the element with `role=tablist`. A supplementary browser check measured a 220 px scroll for Prompt Only and a 280 px scroll for Torrone on internal scroll elements, with selection preserved. Storybook showed no arrow at the supplementary check's width. The frozen scores remain as recorded.

The six quality checks cover startup, no external runtime libraries, fixture-driven layout, readable separation of rendering and state, executable authored tests, and passing the scoped interaction checks. The scoped interaction checks cover manual keyboard activation, Escape and focus return for both choosers, and focus after closing a selected document. All three passed the first four quality checks. Only Storybook supplied executable authored tests. Only Prompt Only passed all three supplementary interaction checks.

The separate requirements audit examined narrow chooser controls, Escape focus return and official icon references. It confirmed zero omissions for Prompt Only, two for Torrone and one for Storybook. Storybook's Escape return and chooser icon references could not be checked because the controls did not appear. The audit confirmed zero invented behaviors within that limited scope. The screenshots document observations and carry no human visual approval.

## Scope and conclusion

For this control, Torrone produced the highest final reproduction score and used the least measured time and tokens. The first run and supplementary interactions favor Prompt Only. Storybook made the states and failures easier to revisit through its stories and play functions. This trial supplies no estimate for projects that start with an existing Storybook component library.

The Torrone workflow should check the rendered control before submission, including the label, use of official icon files, Escape focus return and measured alignment in both normal and overflow states. The fixed oracle should remain available for replay. The scroll probe illustrates why a separate behavioral observation is useful when a test also encodes an implementation structure.

There was one trial per approach. The separate projects and sessions did not enforce filesystem isolation on the shared host. The agent sessions used a read-only CLI and returned structured source submissions. The coordinator materialized the files and ran the common checks. No human edited the submitted implementations.

## Evidence and replay

| Approach | First submission | Final submission | Inputs |
| --- | --- | --- | --- |
| Prompt Only | [Source and evidence](./prompt-only/first/) | [Source and evidence](./prompt-only/final/) | [Inputs](./prompt-only/input/) |
| Torrone | [Source and evidence](./torrone/first/) | [Source and evidence](./torrone/final/) | [Inputs](./torrone/input/) |
| Storybook | [Source and evidence](./storybook/first/) | [Source and evidence](./storybook/final/) | [Inputs](./storybook/input/) |

The [frozen oracle](./oracle/) includes the exact original source and its [SHA-256 manifest](./oracle/SHA256.txt). The [frozen protocol](./PROTOCOL.md) defines the common brief, grouping and tie policy. Each submission directory includes checkpoints, screenshots and build or startup receipts. The Storybook directories include the story sources, play results and the built story index.

With Node.js 22.23.4, run these commands from this directory. The trial used Playwright 1.65.0 and Chromium 158.0.8127.18.

```sh
npm ci --prefix tooling
npm exec --prefix tooling -- playwright install chromium
node tooling/issue68-eval.mjs strict oracle/preview tmp/baseline
node tooling/issue68-eval.mjs continue torrone/final tmp/torrone-final
node tooling/issue68-quality.mjs torrone/final tmp/torrone-quality
```

Replace `torrone/final` with another approach or phase to replay its submission. To rebuild and exercise the final Storybook from this directory, run:

```sh
(cd storybook/final && npm ci && npx storybook build --disable-telemetry)
node tooling/issue68-stories.mjs storybook/final/storybook-static tmp/storybook-plays
```
