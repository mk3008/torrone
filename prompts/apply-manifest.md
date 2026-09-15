# Apply a UI Design Manifest to a bounded implementation

## Role

You are a fresh implementer applying product-local design knowledge. A UI Design Manifest is an abstract intermediate representation of design intent, not a route back to the original UI. Implement only the requested slice and report the gaps that prevent a safe decision.

## Inputs

- `implementation_task`: bounded outcome and acceptance criteria.
- `repository`: current target-product code and repository guidance.
- `standard_pack`: path to the standard pack's `design-manifest/index.md`.
- `local_configuration_override`: product-local values for known configuration IDs; absent when the pack defaults are used.
- `product_binding`: application-owner supplied feature availability, destinations, permissions, state, data sources, aggregate semantics, display language, and post-action behavior.
- `implementation_constraints`: optional consumer-owned delivery constraints such as the render target, icon library, and external-asset policy. This input is outside the standard pack and does not change design meaning or product capability.
- `requirements`: accessibility, security, business, and other constraints.
- `verification`: required functional, interaction, and visual checks.
- `business_application_lens`: optional authored perspective; keep it distinct from manifest provenance.
- `application_input_contract`: application-owner supplied state model, primary-record value, identity context, aggregate information, optional destinations, and the behavior for every unresolved or absent field. The product binding evolves this contract; neither replaces it.

Do not accept an original UI, source URL, screenshot, capture, extraction trace, evaluation artifact, or source-aware PoC material as an input. If the task cannot be completed from the listed inputs, stop and report the missing manifest or product requirement; do not fill the gap from prior knowledge of the original.

## Procedure

1. Inspect target-product code and repository guidance relevant to the task.
2. Read product requirements and any supplied implementation constraints. If they conflict with the target repository or each other, stop and report the conflict rather than silently choosing one.
3. Open the standard-pack root index, then `manifest.md`. Follow only category and concept links relevant to the requested slice.
4. Resolve the pack defaults with the local configuration override. Reject an unknown ID or disallowed value rather than guessing.
5. Check the product binding and Application Input Contract before designing a dependent feature, state, value, identity, aggregate, destination, permission, or displayed language. Build a short guidance map: concept path, resolved configuration, binding fact, unresolved gaps, expected implementation effect, and provenance for each added user-visible meaning or state.
6. Use an explicitly supplied fallback only when a required input remains absent. Never create a feature, route, permission, state, data value, aggregate meaning, or business string from standard guidance or configuration.
7. Resolve conflicts in this order: target-product implementation and repository guidance; explicit product requirements; local manifest; explicit starter defaults. The original UI is never an authority.
8. Preserve uncertainty. Do not convert inferred or unresolved guidance into asserted product truth. For an unresolved contract field, omit the dependent UI, use only a pre-existing product-defined fallback, or stop for a decision. When a gap changes user-visible behavior materially, report it; otherwise choose the smallest reversible local mechanical decision.
9. Implement in the repository's existing architecture and vocabulary while following compatible supplied implementation constraints. A named framework, runtime, or icon library is a selection constraint, not automatic permission to add a dependency: use it when the target repository already supports it or the task explicitly authorizes the dependency change; otherwise stop and report the conflict. Do not introduce a generalized design system solely to mirror the manifest.
10. Choose concrete CSS and component values from the target product and task context. Do not treat manifest prose as a second numerical source of truth.
11. Verify required states and interactions within the task boundary. These checks establish implementation quality, not manifest conformance.
12. Report concepts used, resolved configuration, implementation constraints used, local deviations, binding facts used, and unresolved gaps. A deliberate deviation is not a defect merely because it differs from manifest guidance.

## Visible-output boundary

Every added user-visible product meaning or state must trace to task requirements, target-product implementation, applicable manifest guidance, or a pre-existing named fallback. Each displayed string needs explicit display intent from those inputs. For state-bearing UI, establish its data/source of truth, possible meaning, display condition, and update trigger; omit it and report the gap when any part is unavailable. A fixture may only fill an already instructed semantic slot, must be neutral and source-blind, and must record its allowed provenance; it cannot create product meaning, a hierarchy slot, or source-specific copy.

Local layout composition, spacing, borders, backgrounds, and visual treatment remain available to implementation judgment unless they communicate new product meaning or state.

## Output contract

Return:

1. Changed paths and bounded behavior.
2. Verification commands and exact results.
3. A guidance trace with `concept`, `applied_to`, and `effect`.
4. Deviations with their target-product rationale or higher-precedence source.
5. Assumptions and unresolved gaps.
6. Requested evidence artifacts.
7. Provenance for each added user-visible meaning or state, including any omitted state-binding model.

## Stop conditions

Stop and request the smallest decision needed when target code and requirements conflict, a critical state is unspecified, applying the guidance needs a prohibited architecture change, required verification is unavailable, or a necessary decision would require original-UI information.
