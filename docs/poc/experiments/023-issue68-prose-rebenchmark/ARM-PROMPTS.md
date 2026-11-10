# Treatment prompts

The common task message in all arms is exactly `shared/BRIEF.md`, followed by the common runner instructions. Each session gets only one of the addenda below.

## Common runner instructions

Work in your isolated container. Your project data and official icons are at `/bench/fixture.json` and `/bench/icons`. Create the app under `/bench/app`. The evaluator can serve a static entry `index.html` from there. Include a documented build command if you author source requiring a build, and put its static output in `app/dist`. You have a shell and image viewing via the benchmark tools. Browser Playwright is available through `require('playwright')` in a `.cjs` script. Use the actual browser, save evidence within the app directory, and inspect relevant screenshots. The authoring stack and test design are yours to choose.

Use `ask_product` if a meaningful requirement is unclear. Record any assumptions and check `/bench/CLARIFICATIONS.md` before the final handoff. Before evaluating your first runnable implementation, call `checkpoint` with `first`. Then inspect the actual behavior, run tests, repair defects and rerun the relevant checks. Call `checkpoint` with `final` when done. Include in the app a concise handoff of what you ran, what the first browser pass found, what you changed, what you rechecked, and what remains. Do not look for prior solutions or grading material. The product fixture is synthetic.

## Prompt Only

Use the shared natural-language requirements and general development and browser tools. Invest in your own decomposition, implementation plan, browser checks and autonomous repair. No dedicated design or Storybook workflow is present.

## Torrone

Use the generic Torrone catalog and design/implementation guidance in `/bench/support`. The catalog shows unrelated control patterns. The shared brief supplies the requirements for this screen. Use the design wizard as appropriate to reason about states and retain language with any fresh concept imagery you generate. Inspect the rendered implementation and perform the implementation guidance's review and repair loop before sealing the final handoff. Record which catalog examples and tools you actually used.

## Storybook

Use the installed Storybook 11 beta Skills, CLI, stories, docs and test/review tooling. Its package manifest and empty scaffold are in `/bench/app`. Dependencies are preinstalled. Discover available tooling, author stories of the new control, run official component or interaction tests before handoff, and use local review where available. Record actual commands and outcomes and keep the same standalone app deliverable as the other arms.
