# Application interaction requirements

This operationalizes the Product Foundation's existing application-wide consistency goal. It does not prescribe one Enter behavior for every application or introduce a new Manifest, runtime, or exhaustive UI specification.

## Ownership and source

The consuming application owns shared usability and interaction decisions. Keep them in one concise, maintained application design record, with links to working examples where behavior is easier to understand by operating it. Reuse an existing product document rather than duplicate it per component. Torrone handoffs must identify that record and its revision, scope, decision status, and responsible human reviewer or decision source.

Keep three responsibilities distinct:

| Level | Owns |
| --- | --- |
| Application | Shared navigation and action semantics, consistency across screens, and justified context-specific exceptions. |
| Bounded Reference | The approved local operation model within its recorded responsibility and scope. |
| Composed screen | Applying both inputs to real entry, completion, recovery, and exit paths across controls. |

For example, Tab order and whether Enter confirms, submits, or advances must be decided in the application's context. Calendar-grid keyboard behavior is a local interaction, but entering and leaving that calendar must fit the application policy. Consistency does not mean treating multiline text, form submission, grid selection, and manual field completion as the same action.

An explicit application requirement can override a Reference only with the difference recorded. If that materially changes the operation model, use or create an appropriate draft Reference. Preserve any conflict for a decision; silently choosing whichever source is convenient is not resolution. A missing material policy blocks a claim of conforming implementation; an explicitly scoped PoC may propose a reversible candidate, clearly pending human review.

## Before implementation

1. Identify the application requirement source and applicable approved Reference, including their scope and revision. If no application record exists, record that gap and the decisions needed; do not treat the absence as implementation freedom.
2. Identify shared interactions affected by this change. Consider navigation/activation, focus return, validation/recovery, visibility/scrolling and mobile keyboard behavior where relevant. Select by impact rather than filling an exhaustive catalog.
3. Record expected behavior across affected controls and contexts, including exceptions and conflicts. Reuse the application policy by link. Keep a proposed decision separate from accepted requirements; name what a human still needs to decide.

The implementation handoff must include these inputs even when its allowed reading set is deliberately small. A fresh-context experiment that omits them tests an incomplete contract; preserve that limitation rather than silently importing historical knowledge.

## Before handing off for review

Use a small coverage table in the existing application record or verification notes:

| Requirement / decision source | Affected path and expected result | Evidence and execution conditions | Result / remaining gap |
| --- | --- | --- | --- |
| Link to shared policy, including candidate status | Concrete start, action, destination/state; relevant counterpart or exception | Exact implementation revision, test or browser/device run | Passed within stated scope, failed, unverified, or not applicable with reason |

Cover transitions across component boundaries, not just each component separately. For focus changes, include forward and reverse traversal through neighboring controls, both equivalent fields, conditional/hidden actions, and the path after a popup closes or invalid input recovers when affected. Include one discriminating operation-order change when prior state may affect the result. Use desktop and mobile contexts where their interaction differs; do not assume a narrow viewport reproduces a software keyboard.

Automate deterministic regressions when useful. Use actual browser operation for claims about native focus traversal, visibility, or event delivery; handler fixtures and screenshots alone do not establish those claims. When execution is unavailable, record the blocked condition and the exact pending path. A review candidate may still be delivered, but application interaction verification remains incomplete. Human design approval remains separate from all verification.

When a shared policy changes, identify affected consumers and evidence that must be revisited. Do not silently retain approval or stale passing results. No fixed test framework, all-screen retest, or new orchestration is required: select checks by the affected responsibility and risk.

## Why this check exists

PoC 018 exposed a handoff gap: the Foundation named application consistency, but the implementation entry point asked only for a bounded Reference. Enter behavior was then corrected locally more than once, and component checks did not establish browser-level navigation across the composed form. The owner's request makes application-level applicability and coverage explicit at both entry and handoff.

The corrective controls are the required AGENTS entry, the curation/workflow links, and the PR applicability/evidence section. They expose an omission for review; a filled table is not proof of usability and cannot guarantee that no defect escapes. [Issue #9](https://github.com/mk3008/torrone/issues/9) separately evaluates the value of AI browser review; this policy neither assumes its result nor selects its tooling.

The [PoC 018 application record](poc/experiments/018-curated-reference-handoff/application-interaction.md) applies this check retrospectively. Its current Enter choice is still a candidate, not a Torrone-wide convention or a human-approved design.

## Shared text-entry visibility

Use ordinary browser text-entry behavior. Do not add application scrolling on editor focus, field switching or keyboard viewport changes as a default Reference requirement. Preserve manual scrolling, reachable editors and focus. Calendar disclosure may reveal its owning input and calendar context; this is a separate responsibility.

The attempted generic keyboard-following correction was withdrawn by the owner on 2026-09-16 after repeated unwanted movement. See the [decision, evidence and reopening conditions](decisions/2026-09-16-withdraw-keyboard-scroll.md). This does not reject input visibility as a usability goal or guarantee that native keyboard behavior is identical across hosts. Environment-specific treatment belongs to a bounded consuming-product decision with actual device verification.
