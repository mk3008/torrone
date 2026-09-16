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

When the executable Reference or a material preserved behavior changes, treat the change as a draft until a human reviewer explicitly accepts the new version. Keep the previous approval evidence intact. A new candidate may reuse the same responsibility, but approval does not transfer automatically.

Changes that only clarify wording without changing the approved design meaning should still be reviewed proportionally, but do not require inventing a new lifecycle state.

## Material UI design decisions

Preserve the reason for a human-adopted UI choice when losing it would make a future implementer unable to distinguish intended behavior from an incidental detail, or unable to judge its scope. Examples include completion/recovery semantics, focus return, scroll responsibility, valid partial states and responsive changes to the operation model. Routine reversible HTML/CSS cleanup, class names and incidental pixel values need no decision record. Do not document every implementation choice or retain an AI reasoning transcript.

Keep the explanation in the applicable curation entry, or link from that entry to an existing review/decision document when the explanation already lives there. One concise paragraph can suffice; a separate file, template, schema or registry is not required. Reference HTML and Preserve / May vary still define the design; the explanation supplies its rationale rather than a competing specification.

When proposing a material change, identify the choice, why it is needed and preferred, its bounded responsibility/conditions, and supporting evidence. Include a credible alternative or reconsideration condition only when needed to understand or revisit the choice. Mark proposals and inferences as such. AI may prepare the explanation, but only explicit human review establishes adoption; tests, browser observations and PR merge do not do so.

At curation or material revision, the author checks that a reader can follow the entry to the relevant rationale and human-approval evidence for the exact reviewed artifact and scope. Record the human decision faithfully, including partial acceptance and unverified conditions. An adopted individual choice does not approve an entire candidate. If the reason or approval evidence is missing, state that gap; do not invent retrospective rationale or claim approval to complete the record. Handle required unresolved work through [finding disposition](../docs/development-workflow.md#disposition-of-gui-findings).

When a choice is superseded, update the affected curation entry to point to the replacement and explain the changed scope or reason. Preserve prior approval identities and historical evidence; do not rewrite them to match the new policy. Check these links when changing the relevant design, not by synchronizing status tables elsewhere. Older records may remain in their existing form: add traceability where needed without bulk migration or fabricated evidence.

This rule lives with the Reference lifecycle because it governs explaining adopted design. The workflow governs what happens to findings, including rejection and deferral; it can link to the same explanation without requiring a duplicate record. Existing curation and review documents provide both roles with less maintenance than a new decision-record system.

## Using curated References

Before implementing a recurring UI responsibility, check this directory first.

Also identify the consuming application's shared interaction requirements using [Application interaction requirements](../docs/application-interaction.md). A bounded Reference is one input to the composed screen, not the complete application contract. Check compatibility before implementation and record cross-control coverage at handoff; do not infer a global keyboard policy from an isolated example.

Use an approved Reference only within its stated scope. Product requirements may override a Reference, but the difference should be explicit rather than silently interpreted as a new application-wide convention. If the required operation model materially differs, use or create a different Reference instead of stretching an existing one beyond its meaning.

Historical material under `docs/poc/` is research evidence. Working copies under `review/` are review surfaces. Neither is canonical merely because it exists. A curation entry makes the current design-original relationship explicit.

## Current curated References

- [Date range filter](date-range.md) — **approved** for a filter-style date range with independently optional Start and End boundaries.
- [Date range dependent recovery](date-range-recovery.md) — **draft next version** combining reconciled PoC 018 review requirements and opposite-boundary recovery; original approval remains unchanged.
- PoC 018 findings feed the shared Date range next version; [the former Invoice entry](invoice-date-range.md) is a historical redirect, not another design original.

This directory is a curation pilot. Its file layout and metadata are not a frozen Torrone profile or public API.

## Transfer PoC feedback

A transfer PoC has no independent product owner or product-specific preferences. Classify review findings as implementation departures from the Reference or gaps/ambiguities in the Reference. Fix departures in the target; return design findings to the shared Reference next version before using that baseline in later work. Record the classification and affected paths. Preserve original evidence, but do not create a PoC-specific Reference to isolate feedback. Explicit real-product requirements may justify a separate variant.
