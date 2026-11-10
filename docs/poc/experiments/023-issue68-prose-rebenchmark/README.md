# Issue 68 — Prose-first rebenchmark

Two independent trials per workflow reproduced the same Japanese document-tab workspace from a common natural-language specification. The final scored deliveries passed **42/50 for Torrone, 36/50 for Prompt Only and 18/50 for Storybook**. Storybook's second final build failed to deliver its fixture. The unchanged source scored 9/25 in a separate diagnostic. The frozen delivery score remains 0/25 for that submission.

## Scorecard

Each trial has 25 checks. The first value is the first sealed snapshot and the second follows each agent's own verification and repairs. The final values combine two trials. Stars mark the highest comparable result or a tie. Time and token ties use a 5% band. An all-fail row has no star. The aggregate is descriptive and carries no additional win.

| Oracle | Prompt Only | Torrone | Storybook |
| --- | ---: | ---: | ---: |
| First → final aggregate | 19/50 → 36/50 | 40/50 → 42/50 | 14/50 → 18/50 |
| Desktop fit | 5/10 → 9/10 ★ | 9/10 → 9/10 ★ | 0/10 → 5/10 |
| Narrow fit | 8/16 → 14/16 ★ | 14/16 → 14/16 ★ | 2/16 → 8/16 |
| Interaction and state | 2/14 → 5/14 | 8/14 → 10/14 ★ | 5/14 → 3/14 |
| Visual geometry and state | 4/10 → 8/10 | 9/10 → 9/10 ★ | 7/10 → 2/10 |
| Final runs | 19/25, 17/25 | 19/25, 23/25 | 18/25, 0/25 |

| Measured effort, median per trial | Prompt Only | Torrone | Storybook |
| --- | ---: | ---: | ---: |
| Arm preparation (s) | 0.5 ★ | 0.7 | 0.7 |
| Implementation to first snapshot (s) | 191.6 | 121.9 ★ | 168.0 |
| Autonomous review and repair (s) | 108.6 ★ | 158.3 | 178.6 |
| Setup + model session + both evaluations (s) | 335.0 | 304.5 ★ | 399.4 |
| Model input + output (tokens) | 479,600 ★ | 701,436 | 692,404 |
| Billed cost | N/A | N/A | N/A |

| Further quality evidence | Prompt Only | Torrone | Storybook |
| --- | ---: | ---: | ---: |
| Final delivery starts and shows the workspace | 2/2 ★ | 2/2 ★ | 1/2 |
| Executable authored browser or interaction checks | 2/2 ★ | 2/2 ★ | 2/2 ★ |
| Standalone implementation has no unnecessary runtime library | 2/2 ★ | 2/2 ★ | 2/2 ★ |
| Fixture-driven responsive implementation | 2/2 ★ | 2/2 ★ | 2/2 ★ |
| Readable separation of view, events and state | 0/2 | 0/2 | 0/2 |
| All scoped manual activation, Escape and close-focus checks | 0/2 | 2/2 ★ | 0/2 |

The readability review found named functions or methods in all six final submissions, with state, rendering and event handling still grouped into dense files. Their longest `app.js` lines range from 760 to 1,774 characters. The scoped focus row covers I04 through I06. The other quality observations combine the delivery replay with the saved source and execution receipts.

| Workflow | Trial 4 | Trial 5 | Final range |
| --- | ---: | ---: | ---: |
| Prompt Only | 19 → 19 | 0 → 17 | 17–19 |
| Torrone | 18 → 19 | 22 → 23 | 19–23 |
| Storybook | 5 → 18 | 9 → 0 | 0–18 |

The measured effort table reports the median of two observations per arm. Setup covers arm-local provisioning, including the isolation check, against already built images. Shared browser provisioning and image preparation are separate. Total adds setup, agent session, and both oracle evaluations. Model input includes cached input. Billed amounts and consumption credits are unverified. The excluded infrastructure attempts and their available usage receipts appear in [metrics.json](./metrics.json).

## Findings by workflow

**Prompt Only.** Both trials independently wrote and executed browser checks. The first trial's extra visible row labels introduced 21 px between the tab surfaces, and its hidden interaction score stayed unchanged after repair. The second trial's first snapshot failed because the fixture was outside the packaged app. The agent copied it into the app, restoring startup and 17 checks. Focus return after the child chooser and last close remained incomplete. The two final scores differed by two cases. [Trial 4 handoff](./runs/4/prompt-only/final/app/HANDOFF.md) · [Trial 5 handoff](./runs/5/prompt-only/final/app/HANDOFF.md)

**Torrone.** Both trials actually read the generic POPOVER-001 and ICON-BUTTON-001 guidance and inspected rendered screenshots. Both repaired chooser focus independently and gained one hidden-oracle check. Both final submissions passed the scoped manual activation, Escape and close-focus checks. Trial 4 initially missed the resize observations because it used an 80 ms debounce. The second trial passed them and all five visual probes. The two runs still placed the child chooser's first row 6 px below the trigger. Fresh image generation was enabled for this arm. Neither run invoked it, so its contribution is unmeasured. [Trial 4 handoff](./runs/4/torrone/final/app/HANDOFF.md) · [Trial 5 handoff](./runs/5/torrone/final/app/HANDOFF.md)

**Storybook.** Both trials created stories and ran Storybook's Vitest browser project. The first trial used the official CLI for docs lookup, story discovery and local review, and passed three interaction stories. It found the displaced desktop arrows in a screenshot, fixed the clipped track and improved from 5/25 to 18/25. The second passed two stories after re-querying elements that the component had replaced. Its standalone development view ran, while the sealed `dist/` omitted the JSON fixture and the four icon files. This led to 0/25 on the delivery replay. Serving the same sealed app source with the same oracle yielded 9/25, with all five visual probes passing and all five desktop fit probes failing. Its fit rule used the custom-element host's client width instead of the inner width of the rendered workspace. Neither the component test suite nor the development browser checks validated the final distribution. [Trial 4 tool receipt](./runs/4/storybook/tools.jsonl) · [Trial 5 handoff](./runs/5/storybook/final/app/HANDOFF.md) · [Source-only diagnosis](./runs/5/storybook/final/source-replay/results.json)

## Visual observations and scoring limits

The reference shows the header action beside the title at 390 px, two adjacent rows and a compact panel. The first Prompt Only version preserved the right controls but stacked the header and inserted visible row labels. Both Torrone results kept the tab rows adjacent, with the header action on a second line at 390 px. The first Storybook result looked close to the reference in the 390 px screenshot and kept the header on one line. It still failed three quantitative visual checks, including a sampled desktop selection underline and the narrow vertical-center comparison. The second Storybook source looked close on the five measured relationships, and the distributed build displayed no workspace. [Reference at 390 px](./reference-linux/M07.png) · [Prompt Only](./runs/4/prompt-only/final/evaluation/M07.png) · [Torrone](./runs/5/torrone/final/evaluation/M07.png) · [Storybook](./runs/4/storybook/final/evaluation/M07.png)

All final deliveries failed the complete item-list interaction and long-tab hover/close checks. The detailed failure records distinguish absence of the app, visible list offsets, missing visible hover text and incorrect post-close focus. The hover text assertion measures content that can be observed by the page automation. Native browser chrome tooltips were not separately verified. The screenshots and pixel checks provide bounded visual observations. Human visual approval, assistive technology and physical mobile devices were outside the measurements.

Three width-change cases sample after two animation frames, following the historic sequence. The prose calls for prompt recalculation without giving a frame limit. A separate 180 ms probe found that both Prompt Only trial 5 and Torrone trial 4 had transitioned to the expected parent-row state by the later sample. The original results remain fixed. This timing limitation matters when interpreting those failures. [Prompt Only probe](./runs/5/prompt-only/final/resize-probe.json) · [Torrone probe](./runs/4/torrone/final/resize-probe.json)

## Fairness and improvement decision

Each trial received the same prose, data, icons, agent model and Chromium. Prior target code and images and all grading material were unavailable to the implementation commands. None of the six agents submitted a product question. No hidden result was given as repair feedback. The independent workflows differed in their assistance and in which capabilities they chose to use. See [method and provenance](./METHOD.md) and [the fixed protocol](./PROTOCOL.md).

Torrone led on final interaction and visual measures and produced the highest final total in this experiment. Prompt Only tied on the desktop and narrow groups and used fewer reported tokens. Storybook demonstrated that its interaction and review tools can reveal repairable problems, while the second submission exposed a gap between story tests and distributable output. Two trials per arm do not establish a general ranking or isolate the effect of an individual skill. The published benchmark excludes the three infrastructure attempts from scores and preserves their receipts.

**A bounded Torrone workflow improvement is warranted.** Its two independent runs fixed focus through browser self-review and still missed the same anchored-list placement and long-label behavior. Add one observable composition check for attached overlays and one pointer/keyboard path that verifies label disclosure before handoff. Verify the final packaged entry point when a build is produced. The catalog examples supported appropriate composition choices here. The evidence does not call for tab-specific defaults or a product-wide catalog redesign.

[Replay commands](./REPLAY.md) · [Per-run metrics](./metrics.json) · [Common prose](./shared/BRIEF.md) · [Case definitions](./evaluator/run.mjs)
