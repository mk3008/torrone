---
type: UI Design Manifest Profile
title: UI Design Manifest profile
description: A small OKF-compatible profile for locally owned UI design knowledge.
status: experimental
source: authored
---

# Purpose

This profile specializes Open Knowledge Format (OKF) v0.1 for UI design knowledge while retaining its permissive model. A bundle is a directory of linked Markdown concepts that a person or agent can discover progressively without a dedicated runtime.

Read [Manifest authority and use](manifest-authority.md) before applying a bundle. A manifest is an abstract intermediate representation of design intent, independent from the original UI that informed extraction. Manifest concepts describe direction and rationale; current target-product implementation and code remain the operational source of truth. For business-product work, use the separate [Business application lens](business-application-lens.md) as an authored evaluation perspective, never as fabricated observation.

# Compatibility subset

The profile adopts these OKF rules:

- A concept is a UTF-8 Markdown file whose identity is its bundle-relative path without `.md`.
- Every concept file starts with parseable YAML front matter delimited by `---` and has a non-empty `type`.
- `index.md` is reserved for progressive directory discovery and normally has no front matter.
- Relationships use ordinary Markdown links. Link meaning is explained by surrounding prose.
- Unknown types and extension fields must be preserved or tolerated rather than rejected.

The starter bundles do not use `log.md`. If a team adds it, it remains an OKF reserved update-history file and must follow the OKF structure.

# Discovery and layout

The bundle root is `design-manifest/` and contains `index.md`, a central `manifest.md` concept, and optional category directories. A standard pack may also use `configuration/` for finite configuration definitions and `flows/` for cross-screen guidance:

```text
design-manifest/
├── index.md
├── manifest.md
├── foundations/
│   └── index.md
├── components/
│   └── index.md
├── policies/
│   └── index.md
└── screen-patterns/
    └── index.md
├── configuration/
│   └── index.md
└── flows/
    └── index.md
```

Directory names are routing conventions, not closed taxonomy. Start at the root index, read `manifest.md` for scope and precedence, then open only categories and concepts relevant to the task. Every index entry should include a short description suitable for deciding whether to read the target.

# Front matter fields

## Required by OKF

- `type`: a non-empty, descriptive concept kind. Consumers must tolerate unfamiliar values.

## Recommended for this UI profile

- `title`: human-readable routing name.
- `description`: one-sentence routing summary.
- `status`: restrained lifecycle note such as `draft`, `active`, or `retired`. Omit when it adds no value.
- `source`: provenance class, preferably `observed`, `inferred`, `authored`, or `mixed`.
- `requires`: a YAML list of concept IDs or requirement references that must be considered with this concept.
- `scope`: a short statement of the screens, states, or interactions to which the guidance applies.
- `pack_version`: a pack-owned semantic version when the concept is the pack's root manifest.

These are profile recommendations, not additional OKF conformance requirements. Do not repeat a per-file priority: precedence is bundle-level policy. Do not add numerical confidence scores.

# Standard-pack configuration contract

Markdown concepts hold stable knowledge: intent, information hierarchy, responsibility boundaries, action priority, selection conditions, avoidances, state and flow principles, and relationships. Do not move these statements into YAML merely because a product may disagree.

YAML configuration definitions or configuration concepts hold only finite, machine-identifiable presentation choices. Each definition must state an `id`, `type`, `default`, allowed values or constraints, the meaning of each value, `scope`, and `owner`. State `relationships` only for a real dependency or conflict. The profile does not prescribe a runtime schema or a DSL.

Configuration IDs are profile-level vocabulary. Do not redefine the same ID with a different type, meaning, allowed values, or default in another concept. Prefer logical directions such as `start` and `end`, never physical `left` and `right`. Represent action ordering as an array of stable semantic IDs, not display strings. Do not expose CSS values, DOM shape, framework properties, routes, permissions, product copy, product data, or state models as configuration.

Adopt a configuration only when it describes a recurring, bounded product choice with more than one legitimate presentation and a clear owner. A one-off local difference should remain in a local override or product decision. Do not introduce compound conditional expressions or a new DSL to make options appear universal.

Local overrides are the recommended extension mechanism. They reference known IDs and use allowed values while remaining outside the pack; a direct pack edit is a fork. Resolve pack defaults, then the local override, then use only explicitly supplied fallback behavior. Product binding is separate and owns feature existence, destinations, permissions, state, data, aggregate meaning, and display language.

# Flows

Use `flows/` for cross-screen guidance. A screen pattern records only the transition roles it provides or requires, such as opening a record, beginning creation, beginning editing, returning to a list, or restoring list context. A flow concept owns the decision criteria and relationship across those roles. Product bindings, not a flow, decide whether a feature exists, where it navigates, and who may use it.

# Markdown body guidance

Use only sections that improve application. Useful headings include:

- `# Guidance` for the decision or invariant.
- `# Verification` for observable rendered or exercised interaction outcomes
  that show whether the applicable guidance was implemented.
- `# Provenance` for the non-identifying origin class of a statement.
- `# Inferences` for interpretations that need confirmation.
- `# Unresolved` for gaps, conflicts, or unavailable states.
- `# Relationships` for prose links to related concepts.

Keep statements reviewable and scoped. Describe user-visible intent and behavior rather than framework or CSS mechanics. Prefer relational language over measurements for typography, spacing, layout, and density. Do not include original UI names, URLs, screenshots, copied product vocabulary, capture paths, or extraction evidence links in a manifest. Provenance classes such as `observed`, `inferred`, and `authored` may remain only when they cannot identify or expose the original UI.

## Verification section

Use a `# Verification` section for each new or revised concept that supplies
rendered or interaction guidance. It states the observable outcome that an
implementer can confirm in the rendered result, and, when an interaction is in
scope, the visible before/action/after result. Verification belongs with the
guidance it checks; it does not become a generic validator, runtime contract,
or product test plan.

Write verification as affirmative, user-visible pass conditions. Name the
region, state, relationship, or change that must be observable, rather than a
CSS class, DOM structure, framework API, asset source, library, or literal
value. Keep product facts, supplied labels, destinations, permissions, data,
and state models in the application input contract or binding. When an outcome
cannot be observed in the available environment, record it as `not verified`;
do not infer a pass from source structure or an intended implementation.

A concept that only routes to another concept may link to that concept's
verification rather than duplicate it. Existing concepts may acquire this
section incrementally when they are revised; a consumer-delivery task freezes
the applicable verification sections with its other inputs.

For added user-visible product information, meaning, or state, preserve a reviewable allowed-provenance trace to a requirement, current target-product implementation, manifest guidance, or an explicitly named fallback. A state-bearing element also needs a binding model: data or source of truth, possible state meaning, display condition, and update trigger. If that model is not established, record it as unresolved rather than silently authoring a state.

An explicitly named fallback must pre-exist application in a requirement, current target-product implementation, local manifest, or task packet. An implementer may not invent, name, or promote a fallback during application to justify a chosen string, product meaning, control, or hierarchy slot.

Manifest design intent, scope prose, relationship descriptions, and explanatory prose do not authorize literal or paraphrased display copy. Original copy and its evidence belong only to extraction or test-only evidence outside the manifest. Each displayed string needs explicit intent from a requirement, current target-product implementation, or a pre-existing explicitly named display-copy fallback. Any unsupplied string is an out-of-band-declared fixture or unsupported copy; a fixture may fill only an already instructed semantic slot and may not create an uninstructed heading, caption, helper, legend, or other hierarchy slot.

## Source-blind fixtures

Use a fixture only when an application input contract already identifies the semantic slot that needs a value. A safe fixture is neutral: it demonstrates the slot's shape or state without introducing product meaning, a new hierarchy slot, a product-specific label, or source-derived copy. Record its provenance as the applicable requirement, current target-product implementation, pre-existing named fallback, or explicitly declared test fixture. Do not derive fixture values from an original UI, capture, evaluation material, remembered source vocabulary, or a source-specific data model.

A fixture cannot supply an identity, status, destination, aggregate, or other business meaning that the application inputs leave unresolved. Omit the dependent UI and report the gap instead.

# Provenance and uncertainty

Never present inference as observation. For mixed concepts, label individual statements under `Evidence`, `Inferences`, and `Unresolved`. Record the viewport, state, role, data condition, or interaction that bounded an observation. If evidence does not support a decision, leave a gap rather than filling it with a starter default.

Provenance and generalization status are separate. An **authored default** uses authored provenance and must be named as a fallback rather than observation. A **context-dependent pattern** states where a relationship is expected to apply and where it may differ; it is not a new provenance class or a universal rule. A **target-product decision** belongs to requirements, current implementation, or the Application Input Contract rather than being inferred from extraction. See the [knowledge lifecycle](manifest-authority.md#knowledge-lifecycle).

## Extraction source inputs and observation boundary

Extraction accepts a URL, one image, an image set, a recording, or a local build as formal `source_ui` input forms. Images are first-class inputs, not a fallback: when supplied images establish the needed declared screens, viewports, and states, extraction does not access a URL. A recording or local build may be observed only for the declared visual scope. A URL is observed only when supplied visual inputs are insufficient, and then only to the minimum extent needed for that scope.

URL use is not a standard permission to crawl, scrape, broadly traverse, bulk-capture DOM or CSS, or extract source values. Extraction does not inspect undeclared routes, roles, states, or data. It records the input modality, non-identifying provenance reference, declared visual scope, and requested additional input in extraction or evaluation evidence only; a source-blind manifest never retains these details.

Visual inputs establish only what they visibly show. An operation, focus behavior, update condition, responsive change, or transition not visibly established by the supplied scope remains unresolved. Request the smallest additional visual input—such as another viewport image, state image, or bounded recording—rather than inventing the missing behavior.

Small local decisions may select implementation mechanics, but they do not authorize new user-visible meaning. The profile does not judge completeness, exact reproduction, or missing requirements; current implementation and applicable requirements remain authoritative under the precedence policy below.

# Evaluation vocabulary

Evaluation findings use the following terms for an explicitly bounded claim:

- **Preserved**: the claimed behavior or relationship was exercised with the declared inputs and evidence supports that it remains present.
- **Partial**: the claim was exercised and evidence shows a bounded portion is present, with the missing or divergent portion named.
- **Failure**: the claim was exercised and evidence shows the expected behavior or relationship is absent or contradicted.
- **Not exercised**: the claim was not evaluated. This is neither preservation, partial preservation, nor failure, and it must not be summarized as a result for the claim.

A `not exercised` finding records the reason it was not run, the intended input or condition, the evidence available about non-execution, and the next owner or condition needed to evaluate it. It preserves the gap for later work; it is not evidence of product behavior.

# Application input contract

The application owner supplies a bounded input contract with the implementation task. The contract is distinct from the manifest and must state, when relevant:

- **State model**: the source of truth, allowed states, display conditions, and update triggers.
- **Primary-record value**: the record or value the screen is centered on and its allowed provenance.
- **Identity context**: the permitted actor, account, workspace, or record identity context and whether it may be displayed.
- **Aggregate information**: totals, counts, summaries, or derived values, including their source and update behavior.
- **Optional destinations**: routes, external targets, or action destinations, including whether each may be shown or invoked.

For every missing, conflicting, or intentionally absent field, the contract names the unresolved behavior: omit the dependent UI, render a pre-existing product-defined fallback, or stop for a decision. The application owner owns this contract and unresolved decisions; the implementer may apply it but may not invent product data, hierarchy, state, or destinations to complete it.

# Precedence

Resolve conflicts in this order:

1. Current target-product implementation and repository guidance.
2. Explicit product requirements, including accessibility, security, and business constraints.
3. Local manifest guidance.
4. Explicit starter defaults, only when needed.

The original UI is never an application input or authority. Surface unresolved conflicts or insufficient abstraction to the implementer or owner.

Manifest guidance is not a conformance target. A reviewer may reason about alignment or deviation, but a difference is not automatically an error or a mandatory correction. The profile defines no validator, drift detector, contradiction checker, or synchronization obligation. See [Manifest authority and use](manifest-authority.md).

# Extensions

Teams may add directories, concept types, front matter keys, or body sections. Extensions should:

- remain valid YAML and Markdown;
- use descriptive names rather than closed choice catalogs;
- preserve unknown fields during round trips;
- state semantics and ownership in a linked profile concept;
- avoid converting recommendations into universal OKF requirements.

# Citations

[1] [Open Knowledge Format v0.1 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
