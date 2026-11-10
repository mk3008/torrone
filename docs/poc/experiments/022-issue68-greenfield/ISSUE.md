## Goal

Run a greenfield, oracle-based head-to-head comparison of **three independent AI UI implementation workflows** for the same bounded document-tab screen:

1. **Prompt Only** — a carefully engineered implementation prompt, without a dedicated design system/Skill.
2. **Full Torrone** — its available catalog images/Markdown, relevant approved executable References, applicable Skill-guided workflow, and implementation prompt.
3. **Full Storybook** — official agent Skills (e.g. `ui-workflow`, `component-docs` when applicable), stories/docs, CLI, tests, review workflow, and implementation prompt.

Determine not just which output best reproduces the accepted design, but what each approach costs to prepare, implement, verify, and correct. **Figma is excluded** (account prerequisite). The test oracle **already exists**; do not create or rewrite it for this study.

## Fixed setup — before running any arm

1. **Locate and verify the existing oracle and its associated accepted design/requirements.** Record its actual location, revision/checksum, evaluation cases, and scope; keep it read-only and inaccessible to the implementing agents. The oracle's current location has not yet been established in this issue: verify it before any scored run, and do **not** silently replace it with #67 draft images or generate new expectations. Classifying existing cases for reporting is allowed without changing expected outcomes.
2. Freeze one **common user-facing brief**, target platform/framework, fixture data, viewport sizes, quality requirements, grading rubric, tool/agent model, and available general development environment. The brief may convey legitimate user requirements, but must not reveal hidden oracle test cases/answers. Resolve ambiguous requirements against the existing source **before** running and record any remaining gaps.
3. Define scoring and winner/tie thresholds before seeing results. The frozen oracle is the sole source of pass/fail expectations; human visual review covers observable design intent that cannot be reliably machine checked, separately from automated tests.

## Arms and greenfield boundaries

- Start **each run from an independent clean project and fresh agent session**, with no existing target app code, pre-built target UI components, finished Storybook stories, or prior solution. No cross-arm sharing of generated files, learned answers, private evaluator feedback, or hidden oracle content.
- Allow the strongest available **supported workflow** in each arm, using the same underlying coding agent/model and common tools wherever possible. Prompt Only may invest in a strong prompt and ordinary coding/testing tools, but not Torrone/Storybook-specific assets or Skills. Torrone may leverage its reusable **design** catalog/approved References (not target application code) and Skill. Storybook may install its official tools/Skills and author its component code/stories **during its own run**. Self-tests and autonomous corrections provided by each approach are part of the arm, not prohibited. Log setup, versions, prompts, assets, and capabilities actually used (and unsupported ones).
- Use a common acceptance target and implementation brief; do not require equally long prompts or identical internal steps, which would disable actual advantages. Account for **all arm-specific preparation effort** (including asset creation, Skill/tool installation, Storybook story creation) and implementation effort. Note that from-zero Storybook does not get the benefit of a preexisting component library; do not extrapolate the result to reuse-heavy brownfield environments.
- Storybook 11 Skills are beta as of 2026-11-10: verify availability/version and separate preview/setup defects from design-transfer failures. Official reference: https://storybook.js.org/blog/storybook-11-beta/

## Evaluation process

1. Capture a **first submitted result** for each arm after its own normal build/self-check cycle, **before revealing oracle feedback**. Run the same independent oracle and record test-by-test pass/fail/not-evaluated with evidence (tests and screenshots), including any critical failures.
2. If corrections are tested, provide the **same type and granularity of evaluator feedback** and the same number/limits of feedback opportunities to each arm; record revisions and a **final** oracle result. Never alter/weaken oracle tests to improve results. Keep human visual feedback/approval distinct from mechanical evaluation.
3. Report both overall oracle conformance and breakdowns, using existing oracle cases: (a) visual hierarchy/layout/relationships, (b) meaningful state appearances (notably selected vs keyboard-focused), (c) interaction/keyboard/focus and independent parent/child overflow, (d) responsive/mobile document and child chooser behavior. Do not create artificial expected cases; classify only supported coverage. Count omitted and invented requirements, and clearly note untested dimensions.
4. Record **human corrections/interventions**, AI retry cycles, time-to-first-result, time-to-final-result, setup effort, and available tokens/costs. Evaluate code quality with a consistent checklist: unnecessary dependencies/complexity, tests, maintainability and functional defects. Costs with unavailable telemetry are "unknown", not zero. One run per arm is the first experiment; repeat in independent runs only if explicitly in scope/resources and disclose `n` (one run does not demonstrate stability).
5. Produce a **star/win table**: rows for independent outcome dimensions, columns Prompt Only / Torrone / Storybook, with measured values and a `★` for the best verified result or documented tie. Show raw oracle numerators/denominators, critical failures and measured effort beside marks; mark unmeasured items `N/A`, not a loss. Overall first/final oracle pass rates may be shown as headline aggregates but **must not be counted again** as independent wins if their categories already contribute. No manufactured total ranking when differences are too small or non-comparable.

## Done

- Verified and preserved the **existing**, frozen oracle and common task brief; recorded evaluation protocol and reproducible three-arm setup.
- Three isolated greenfield implementations completed (or exact per-arm blockers documented), with prompts, Skills/versions, tool usage, artifacts, tests and visual evidence saved, and first-pass scores against the same oracle.
- Breakdown of first/final reproduction, requirement misses, revision effort, elapsed/human effort, setup costs, code quality, and scope limitations. Produce a clearly labeled star/win table with explicit tie/unknown handling.
- Explain **which capabilities caused observable differences**, distinguish Storybook's agent workflow vs reuse of existing code, and recommend whether Torrone should change (including a supported **no change** outcome). Do not infer human design approval from passing tests.

## Current

2026-11-10: Three-way **greenfield** comparison and reuse of an **already-prepared** test oracle agreed. Existing oracle's concrete path/revision still needs verification. Figma excluded. No scored executions/results yet.

## Next

Verify the oracle reference and freeze the evaluation rubric/input; then execute the three arms in isolated sessions and report the scoreboard. Preserve source artifacts/approval boundaries and do not merge/deploy or make unapproved paid/external changes.

## Next actor

work

