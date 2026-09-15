# Test A: fresh Reference authoring task

Use only the files listed under **Allowed input** plus this task. Do not inspect
other repository paths, prior PoC results, output, plans, reviews, or chat
history. Do not browse the web. The CLI/Core executables may be run without
reading their source. Write only below this task's `test-a` directory and do
not modify any allowed input.

## New business requirement

Create a directly reviewable Reference for a **supplier onboarding review
queue**. This is a business search workspace inside a common application shell,
not a new UI family.

The product screen must provide navigation, navigation filtering, theme and
user-menu behavior, a supplier-review filter/search area, and Initial, Results,
and Empty result states. Results use different fixed dummy suppliers and expose
a linked Supplier ID, supplier name, region, risk, submitted date, and owner,
one value per column. Provide lightweight Previous/current-page/Next
pagination without a total count, and place `New supplier review` as the main
action. Its destination and the Supplier ID destination are unspecified; do
not invent destination UI or business actions.

Create a separate Target for an **equipment inspection finding queue** with
different wording, fixtures, DOM grouping, classes, local IDs, JavaScript state
organization, and independently written CSS. It must reproduce the Reference's
observable design and interactions without importing or copying Reference CSS.

## Required work

1. Identify the governing authority from the packet.
2. Select the applicable accepted Reference responsibilities.
3. Author the new Reference with only necessary HTML/CSS/JavaScript and a
   clearly excluded scenario harness when one is needed.
4. Run Reference Conformance before comparison.
5. Add meaningful scenarios and at least one non-destructive negative that
   proves a material observation can fail. Do not weaken comparison rules.
6. Create and verify the content- and implementation-independent Target.
7. Self-review the result for business-app naturalness, architecture boundary,
   maintenance cost, identity/metadata excess, and invented interactions.
8. Fix in-scope defects autonomously and write `agent-report.md` containing
   commands, evidence paths, files/line counts, explicit identity counts,
   Consumer annotation observations, limitations, and knowledge candidates.

Do not modify CLI/Core unless a reproducible, generally applicable observation
defect makes the task otherwise impossible. Do not add dependencies, a build
system, a data layer, network behavior, a framework, a global rule, or
long-lived knowledge.

## Allowed input

- `AGENTS.md`
- `docs/poc/reference-html-observation-boundary.md`
- `docs/poc/experiments/017-reference-html-ssot/cli/README.md`
- `docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs`
- `docs/poc/experiments/017-reference-html-ssot/core/browser-core.js`
- `docs/poc/experiments/017-reference-html-ssot/variants/04-partial-reference/references/common-shell.html`
- `docs/poc/experiments/017-reference-html-ssot/variants/04-partial-reference/references/search-workspace.html`

