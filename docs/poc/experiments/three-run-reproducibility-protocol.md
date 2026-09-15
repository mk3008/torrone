---
type: PoC experiment protocol
title: Three-run Manifest reproducibility protocol
status: draft
source: authored
scope: Static HTML experiments that measure what a fixed Manifest and a fixed product brief communicate to independent implementations.
---

# Purpose

This protocol measures the communication quality of a UI Design Manifest. It
does **not** optimize one generated page until it looks correct. A three-run
set asks whether the same fixed input produces three outputs that preserve the
same required responsibilities while leaving only explicitly permitted
implementation variation.

The maintained product is the Manifest. A generated HTML page, PNG, capture
script, static check, and evaluator note are experiment evidence only.

This protocol does not govern a consumer delivery in which an implementer may
repair and re-verify one product artifact. That separate bounded loop is defined
in the [Manifest quality workflow](manifest-quality-workflow.md#consumer-delivery-loop).
Keep its repaired output separate from this protocol's untouched first-pass
three-run evidence.

## What the three runs test

The test subject is the fixed **Manifest plus product prompt** (and, for a
`composition-with-fixed-shell` experiment, the separately declared fixture).
It is not a test of whether an evaluator can manually improve one generated
page. The purpose of three independent runs is to measure the stability of the
Manifest's communication: comparable requirements should recur across three
fresh implementations, while only intentionally unowned implementation detail
may vary.

Use this responsibility split when preparing the input set:

| Input owner | Put here | Do not put here |
| --- | --- | --- |
| Manifest | Cross-screen, reusable screen-pattern, component, layout, hierarchy, interaction-presentation, and token rules — for example, the structure of a search screen or a Grid's overflow behavior. | Customer-, record-, domain-, or task-specific facts that are not reusable design guidance. |
| Product prompt | The named product task and its supplied capabilities, data, labels, fields, actions, and constraints — for example, a customer search screen and its particular customer fields. | Generic visual rules that a normal consumer should obtain from the Manifest. |
| Declared fixture | Exact pre-existing artifact that is explicitly reused, with an immutable boundary. | Unstated visual examples or an implied replacement Manifest. |

This distinction is deliberate: a Manifest consumer supplies the product
requirements; a Manifest-library developer uses three-run evidence to improve
the Manifest itself when generic guidance is missing or ambiguous.

# Fixed input set

Before any run starts, record and freeze all consumer-visible inputs:

1. the complete Manifest snapshot and its file inventory/digests;
2. the exact user prompt, limited to product-specific facts and requirements;
3. every explicit reusable implementation artifact, such as a fixed common
   Header/Drawer shell, with its path and digest; and
4. the model, reasoning effort, run count, viewport, and capture command.

The user prompt must not repeat general presentation rules that the Manifest
is intended to communicate. Conversely, an implementation artifact that the
prompt says to reuse is not silently part of the Manifest: its reuse boundary
must be stated in the experiment contract.

## Experiment type

Declare one type before generation:

| Type | Consumer-visible input | What it measures |
| --- | --- | --- |
| `greenfield-manifest` | Manifest snapshot and product-specific prompt only | Whether the Manifest can guide a new screen without an implementation exemplar. |
| `composition-with-fixed-shell` | Manifest snapshot, product-specific prompt, and an identified pre-existing shell fixture | Whether a new page can follow the Manifest while integrating into that exact existing shell. |

Do not call a composition-with-fixed-shell experiment Manifest-only. The fixed
shell is an additional input, and its visual identity is not evidence that the
Manifest alone produced it.

For `composition-with-fixed-shell`, give the fixture a marked page slot and
state the allowed edit boundary. Keep the Header, Drawer, shell CSS, shell
JavaScript, navigation binding, and theme/drawer state behavior byte-identical
across all runs unless the product prompt supplies a particular change. A
screen-only CSS or JavaScript file may be added only when the fixture contract
names it. Check the immutable files and the DOM outside the page slot against
the fixture before visual comparison.

# Valid run set

Generate all three runs independently from the same fixed input set. Each run
may write only its own output directory and must not inspect another run's
output. Capture may be retried only when the HTML/CSS/JS bytes are unchanged;
a capture retry repairs the observation mechanism, not the generated output.

An output is never edited, regenerated, or selectively replaced after the
three-run generation phase. If any output is changed after generation, the
entire set is **invalid for reproducibility comparison**. Retain it as a
protocol-learning record, but do not present it as a passing, failing, or
mixed three-run result.

This includes a seemingly obvious CSS, HTML, JavaScript, or screenshot fix to
one run. A direct edit hides the signal that the fixed inputs did not produce a
stable result. Classify that signal first; improve the Manifest, prompt, or
fixture only when the classification calls for it, then use a new numbered
attempt with all three runs generated afresh.

# Evaluation and triage

Evaluate the frozen outputs against the frozen inputs before proposing any
repair. For every material deviation, record the observable evidence and make
one of these classifications:

| Classification | Meaning | Next action |
| --- | --- | --- |
| `manifest-gap` | The fixed Manifest does not state the responsibility strongly enough to guide a reasonable implementation. | Revise the Manifest, then start a new three-run attempt. |
| `prompt-gap` | A product-specific fact, capability, or reusable-artifact boundary is missing or ambiguous. | Revise the prompt or experiment contract, then start a new three-run attempt. |
| `fixture-gap` | A supplied reusable artifact is not sufficiently identified or its reuse relationship is unclear. | Revise the experiment contract/fixture identification, then start a new three-run attempt. |
| `non-conformance` | The fixed input states a requirement clearly enough, but one or more outputs do not follow it. | Record the deviation; do not repair individual runs. Decide whether the observed rate is acceptable or whether stronger Manifest wording is warranted, then start a new three-run attempt if inputs change. |
| `allowed-variance` | Outputs differ only in an area the Manifest deliberately leaves to product binding or implementation. | Record the variance; no input change or rerun is required. |
| `observation-gap` | The capture or static evidence cannot determine whether the output follows the input. | Improve only the evidence mechanism, then re-observe unchanged outputs. |

Do not use a successful static check as proof that a visible requirement was
communicated by the Manifest. Static checks prove the narrow properties they
inspect. Visual evidence and a recorded evaluation are necessary for visible
shell, hierarchy, density, and alignment claims.

# Rerun rule

Change the Manifest only for a `manifest-gap`; change the prompt only for a
`prompt-gap`; change a reusable artifact contract only for a `fixture-gap`.
After any such input change, create a new numbered attempt, freeze a new input
set, and regenerate **all three** runs. Never repair only the outlying run and
compare it with two outputs from an earlier input set.

If the classification is `non-conformance` or `allowed-variance`, retain the
unchanged three-run set as the result. A later exploratory improvement must be
a separate attempt, not a retroactive replacement.

# Required evidence

Each attempt records:

- the fixed-input inventory and relevant SHA-256 digests;
- the full prompt text;
- the three untouched run directories;
- capture commands, browser version, viewport, exit codes, and raw PNG hashes;
- focused static-check results and their limits;
- a deviation ledger with the classification above; and
- a final statement of whether the set is valid, invalid, or awaiting visual
  review.

Human review remains a decision about whether the demonstrated result is useful
or acceptable. It is not a substitute for freezing inputs or for preserving
the three independent outputs.

## Interaction observation contract

When a fixed prompt exercises a visible state-changing control, freeze a
short, observable interaction contract with the input set. The contract names
the starting state, the user action, the visible result, and the state that
must remain stable. A self-review records the observed before state, the action
actually performed, and the observed after state for each run; it must not only
list the intended HTML structure or handler.

For a common-shell Drawer controller, the contract observes the visible Drawer
body before and after activation, the absence of reserved Drawer space while
hidden, the unchanged workspace task content, and the controller's updated
available-action meaning. For a themed icon-only control, the contract observes
the rendered glyph, its button surface, and its visible focus treatment in
every exercised theme. These checks observe the result; they do not prescribe
an icon library, CSS selector, DOM shape, or framework.

## Fixed human-review report format

Every human-review comparison uses one concise HTML report format. It contains:

1. the attempt status and experiment type;
2. the frozen Manifest snapshot identity and file count;
3. a local link to the complete frozen-input inventory;
4. the complete fixed product prompt as readable text and a local link;
5. the generation model and reasoning effort;
6. three equivalent Run cards, each linking to its HTML and each required
   fixed-state PNG; and
7. a short Japanese decision request that asks only about the visible screen,
   without requiring claim IDs, YAML, digests, or evaluator vocabulary.

The same report may link to mechanical evidence and review limits, but it must
keep those separate from the human decision request. Do not add Run-specific
editorial commentary to the cards: the comparison is the evidence, and the
report format stays stable across attempts.
