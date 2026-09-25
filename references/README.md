# Curated References

This directory answers a practical Torrone question: **which UI design original should a human or AI follow for this responsibility?**

Curation is intentionally small. It is not a component catalog, a schema platform, or a second design system.

## Lifecycle

A Reference has one of two useful states:

- **draft** — a candidate under review. It is not a design original and must not be treated as product-wide precedent.
- **approved** — a bounded Reference explicitly accepted by a human reviewer. Humans and AI may use it as the design original for the responsibility and scope recorded in its curation entry.

Only an explicit human decision can make a Reference `approved`. Passing tests, browser comparison, a successful build, or merging a pull request does not approve a design.

An approved design original is the combination of:

1. the exact executable Reference identified by the entry;
2. the concise guidance that defines what should be preserved and what may vary; and
3. the recorded human-approval evidence.

The executable example shows what the design looks and feels like. The guidance prevents incidental HTML, CSS, fixture data, or geometry from becoming accidental requirements.

## Changing an approved Reference

Do not silently edit an approved design original and keep calling it approved.

When the executable Reference or a material preserved behavior changes, treat the change as a draft until a human reviewer explicitly accepts the new version. Approval does not transfer automatically.

For ordinary revisions with the same responsibility and operation model, edit the canonical Reference and its curation entry on a branch/PR. The unapproved PR changes are the candidate; do not maintain a second curated “next-version candidate” alongside the approved Reference on main. After explicit human adoption, update the canonical Reference and its exact approval identity/evidence. Preserve prior approval identity and evidence so the previous approved artifact remains traceable; Git history is sufficient when it provides that traceability. Do not create archival copies solely to preserve an old version.

Splitting an issue does not split a Reference. Return a separate issue's result to the original PR/Reference when it belongs to the same responsibility. Create a separate Reference when there is a material difference in responsibility, operation model or conditions of use that justifies keeping both after approval; the icon-button responsibility is distinct from Date range composition.

A large, long-running or staged change may exceptionally need a temporary candidate on main. Before creating it, record why branch/PR review is insufficient, the integration/discard exit conditions and the tracking issue or PR. Integrate or discard it when those conditions are met; do not let the exception become a permanent second Reference.

Changes that only clarify wording without changing the approved design meaning should still be reviewed proportionally, but do not require inventing a new lifecycle state.

## Executable behavior and mock boundaries

A Reference should execute the user-observable operation model of its bounded responsibility. External systems may use fixed local fixtures; do not mock away cheap-to-model local interactions that communicate the design. Production completeness is not required: state in guidance and the review surface what works, what is deliberately simplified and what is not modeled. A visible affordance must perform its implied action unless its limitation is explicitly part of the reviewed design.

Review-only scenario controls may inject otherwise expensive states, but must be visibly or structurally separated and identified as review aids, not required product UI. They do not replace ordinary interactions that can be modeled locally; injected states obey the same visible invariants, and harness-only transitions do not verify product paths. Keep this lightweight: no mock framework or scenario schema is required.

## Material UI design decisions

Preserve the reason for a human-adopted UI choice when losing it would make a future implementer unable to distinguish intended behavior from an incidental detail, or unable to judge its scope. Examples include completion/recovery semantics, focus return, scroll responsibility, valid partial states and responsive changes to the operation model. Routine reversible HTML/CSS cleanup, class names and incidental pixel values need no decision record. Do not document every implementation choice or retain an AI reasoning transcript.

Keep the explanation in the applicable curation entry, or link from that entry to an existing review/decision document when the explanation already lives there. One concise paragraph can suffice; a separate file, template, schema or registry is not required. Reference HTML and Preserve / May vary still define the design; the explanation supplies its rationale rather than a competing specification.

When proposing a material change, identify the choice, why it is needed and preferred, its bounded responsibility/conditions, and supporting evidence. Include a credible alternative or reconsideration condition only when needed to understand or revisit the choice. Mark proposals and inferences as such. AI may prepare the explanation, but only explicit human review establishes adoption; tests, browser observations and PR merge do not do so.

At curation or material revision, the author checks that a reader can follow the entry to the relevant rationale and human-approval evidence for the exact reviewed artifact and scope. Record the human decision faithfully, including partial acceptance and unverified conditions. An adopted individual choice does not approve an entire candidate. If the reason or approval evidence is missing, state that gap; do not invent retrospective rationale or claim approval to complete the record. Handle required unresolved work through [finding disposition](../docs/development-workflow.md#disposition-of-gui-findings).

When a choice is superseded, update the affected curation entry to point to the replacement and explain the changed scope or reason. Preserve prior approval identities and historical evidence; do not rewrite them to match the new policy. Check these links when changing the relevant design, not by synchronizing status tables elsewhere. Older records may remain in their existing form: add traceability where needed without bulk migration or fabricated evidence.

This rule lives with the Reference lifecycle because it governs explaining adopted design. The workflow governs what happens to findings, including rejection and deferral; it can link to the same explanation without requiring a duplicate record. Existing curation and review documents provide both roles with less maintenance than a new decision-record system.

## Using curated References

Before implementing a recurring UI responsibility, check this directory first. Apply the Product Foundation’s [interaction-before-instructions principle](../docs/product-foundation.md#communicate-through-interaction-before-instructions) when authoring and reviewing product UI copy and controls.

Also identify the consuming application's shared interaction requirements using [Application interaction requirements](../docs/application-interaction.md). A bounded Reference is one input to the composed screen, not the complete application contract. Check compatibility before implementation and record cross-control coverage at handoff; do not infer a global keyboard policy from an isolated example.

Use an approved Reference only within its stated scope. Product requirements may override a Reference, but the difference should be explicit rather than silently interpreted as a new application-wide convention. If the required operation model materially differs, use or create a different Reference instead of stretching an existing one beyond its meaning.

Historical material under `docs/poc/` is research evidence. Working copies under `review/` are review surfaces. Neither is canonical merely because it exists. A curation entry makes the current design-original relationship explicit.

## Current curated References

- [Entity dialog lookup](entity-lookup.md) — draft single-selection lookup with explicit confirmation.
- [Inline Entity lookup](entity-lookup-inline.md) — draft searchable single-entity field without a dialog.

- [Flat icon buttons](icon-button.md) — approved for icon-only command appearance and states.

- [Date range filter](date-range.md) — **approved** for a filter-style date range with independently optional Start and End boundaries.
- PoC 018 findings feed the canonical Date range Reference; [the former Invoice entry](invoice-date-range.md) is a historical redirect, not another design original.

This directory is a curation pilot. Its file layout and metadata are not a frozen Torrone profile or public API.

## Transfer PoC feedback

A transfer PoC has no independent product owner or product-specific preferences. Classify review findings as implementation departures from the Reference or gaps/ambiguities in the Reference. Fix departures in the target; return design findings to the shared Reference next version before using that baseline in later work. Record the classification and affected paths. Preserve original evidence, but do not create a PoC-specific Reference to isolate feedback. Explicit real-product requirements may justify a separate variant.
