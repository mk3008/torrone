# UI Design Manifest

UI Design Manifest is a docs-first starter for product teams that want reusable design knowledge to survive beyond screenshots, source code, and individual memory. Its intended deliverable is an authored, distributable standard knowledge pack for business applications: source-independent Markdown concepts and small YAML configuration definitions that a fresh implementer can apply without consulting an original UI.

## Problem and value

Visual and interaction decisions are often scattered across running code, tickets, and tacit team knowledge. This project explores whether a small, linked Markdown bundle can make the relevant decisions easier to discover, inspect, refine, and apply.

The repository provides an OKF-compatible UI profile, two small starter bundles, reusable prompts, and an experiment ladder. The business-app bundle is a Phase 1 vertical slice of a standard pack, not a complete design system. Product teams own the content and should revise it against observed implementation and human judgment.

A manifest records durable direction, not executable truth. It is an abstract intermediate representation of design intent, independent from the original UI. An application must not receive or consult the original UI, its URL, screenshots, source-specific explanation, or extraction trace. If an implementer needs any of those to apply a concept, that concept has not been abstracted sufficiently; record the gap instead. Concrete implementation values in the target product—such as CSS, component code, and runtime behavior—remain operational truth. A deliberate local deviation from manifest guidance is allowed and is not, by itself, a defect.

Applicable concepts may include a `Verification` section alongside their
guidance. It describes the observable rendered or interaction outcome that
shows the guidance was applied. It is neither a runtime contract nor a generic
validator: implementation mechanics remain owned by the consumer, and
product-specific facts remain in the prompt or binding.

## Operating model

Normal product use begins with a standard knowledge pack, target-product requirements, a local configuration override, and a product binding that evolves the Application Input Contract. It does not require a source UI. Teams may author a pack directly or refine it from prior source-independent knowledge.

The standard pack is authored guidance for recurring business-application work; it is authoritative within that pack but is not presented as a universal truth for every product or culture. It may contain components such as Header, Drawer, Search Conditions, Result Grid, and Pagination, as well as screen patterns and cross-screen flows. Phase 1 establishes the responsibility model and one search/list-to-detail slice, not the full catalog.

Repository calibration uses bounded, good-quality source UIs as probes and test oracles. Extraction dogfoods the observation method: failures reveal missing or misleading questions about roles, ownership, hierarchy, grouping, reading order, repetition, density, state, action priority, and region boundaries. Source-blind reconstruction and semantic re-extraction dogfood whether the Markdown preserves those relationships well enough to communicate them. Neither activity is a cloning or fidelity target.

An extracted Manifest is a useful distilled artifact and may become a candidate for shared knowledge. One source does not make a rule canonical. Promotion to a reusable observation question, authored principle, or context-dependent pattern requires its provenance and scope to remain explicit and needs corroboration through calibration, holdout evidence, independent review, and human judgment. See [Manifest authority and source independence](profile/manifest-authority.md#knowledge-lifecycle).

## Pack, configuration, and product responsibility

Keep these inputs separate:

- **Standard knowledge pack** — authored principles, components, screen patterns, flows, and finite configuration definitions. Its Markdown explains stable intent, hierarchy, responsibility, selection criteria, avoidances, and related concepts.
- **Configuration selection** — a small, named set of product-variable presentation choices, such as logical action-region placement, action order, pagination placement, count presentation, and row-action presentation. A local override is the recommended way to change these values without modifying the pack.
- **Product binding** — the product-owned evolution of the Application Input Contract: feature availability, routes, permissions, state, data sources, aggregate semantics, post-save or cancel destination, and displayed business language. A configuration value must never invent these facts.
- **Implementation constraints** — an optional, consumer-owned input for shared delivery decisions such as the render target, icon library, and asset policy. It remains outside the standard pack and cannot override Manifest guidance, resolved UI configuration, product binding, or repository requirements.
- **Extraction and evaluation material** — sources, screenshots, observations, comparisons, and promotion rationale. These remain calibration/test assets and are not part of the distributable pack or application input.

Teams may fork and edit the pack directly, but then own that fork. For ordinary product variation, keep a separate local override alongside a separate product binding so either can survive a later pack update.

## Precedence

When sources disagree, apply this order:

1. Current target-product implementation and repository guidance.
2. Explicit product requirements, including accessibility, security, and business constraints.
3. Local design-manifest guidance.
4. Explicit starter defaults, only when needed.

Implementation constraints participate only in implementation-owned delivery
decisions. Current target-product architecture and explicit requirements take
precedence over them; they have no authority to change Manifest guidance,
resolved UI configuration, product binding, or product meaning.

The original UI is not an application input or authority. Record unresolved conflicts or missing guidance instead of consulting it.

## Evaluation and application conditions

Use the profile's [evaluation vocabulary](profile/ui-profile.md#evaluation-vocabulary) to distinguish a claim that is preserved, partial, failed, or not exercised. `Not exercised` records a gap and its next condition; it is never evidence of preservation or failure. Before application, the application owner supplies the [application input contract](profile/ui-profile.md#application-input-contract) for state, primary-record value, identity context, aggregates, optional destinations, and unresolved behavior. A source-blind fixture may demonstrate only an already instructed semantic slot with declared provenance; it cannot invent product meaning, hierarchy, or source-derived copy.

This precedence avoids dual ownership. The project does not require code and manifest text to remain mechanically synchronized. Teams may update a manifest when that improves future guidance, but implementation correctness does not depend on doing so.

## Calibration and validation path

1. Read the [UI profile](profile/index.md).
2. Start with the [blank bundle](templates/blank/design-manifest/index.md) or inspect the restrained [business-app example](templates/business-app/design-manifest/index.md).
3. When calibrating from a bounded source UI, use the [extraction prompt](prompts/extract-from-existing-ui.md) and keep capture or evaluation evidence outside the Manifest.
4. Give the relevant standard-pack concepts, local overrides, product binding, optional implementation constraints, target-product inputs, and the [application prompt](prompts/apply-manifest.md) to a fresh implementer.
5. Use the [experiment ladder](docs/poc/experiment-ladder.md) to evaluate the observation method, source-independent handoff, and human usefulness before promoting any shared knowledge.
6. For a governed authoring-to-review loop, use the [Manifest quality workflow](docs/poc/experiments/manifest-quality-workflow.md) with the fixed-input [three-run protocol](docs/poc/experiments/three-run-reproducibility-protocol.md).

The workflow distinguishes a **library-quality experiment**, which preserves
three independent raw first-pass outputs to measure the Manifest itself, from a
**consumer delivery**, where the implementer may verify, repair, and re-verify
one artifact within a fixed limit. A consumer delivery with an unavailable
browser-dependent observation is `not verified`, not accepted by inference.

## Explicit non-goals

- A web editor, CLI, validator, schema registry, or runtime.
- A static conformance checker, drift detector, contradiction checker, or code-to-manifest synchronization system.
- An unbounded option catalog, UI-contract DSL, or implementation-configuration language.
- A replacement for code, accessibility rules, security controls, or business requirements.
- Guaranteed or numerically certified reproduction fidelity.
- Framework-specific implementation instructions.

## Repository map

- `profile/` — bundle structure, fields, provenance, precedence, and the source-independence boundary.
- `templates/blank/` — a minimal fill-in starting point.
- `templates/business-app/` — one small example across four concept categories.
- `prompts/` — model-agnostic extraction and application procedures.
- `docs/poc/` — observable experiment stages and stop conditions.
