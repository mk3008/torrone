---
type: PoC invariant classification
title: Reference Conformance absolute invariant classification
status: completed; bounded experimental set
source: standards boundary, existing Core behavior, reversible probes, and form defect canary
---

# Classification rule

An absolute invariant is admitted only when one running Reference is enough to
prove a contradiction without choosing a design, interpreting product wording,
or comparing a Target. This is a Library authoring check, not a Consumer
frontend contract and not a quality score.

# Adopted by reuse

Preflight aggregates these existing observations instead of reimplementing
them:

| Existing observation | Preflight source | Why it is absolute |
| --- | --- | --- |
| missing `lang`, duplicate IDs, unnamed visible controls, missing image `alt`, unnamed dialogs, missing `aria-controls` targets, bounded whole-page `h1`, and bounded contrast | `bounded-accessibility` | The existing Core already returns a browser-derived issue. |
| unnamed exposed interactive accessibility-tree nodes | `accessibility-tree` | The browser exposes a control without a name. |
| duplicate explicit or resolved observation identity | `identity` | Two observed elements cannot occupy one comparison identity. |
| ambiguous semantic identity | `identity` | Existing fail-closed resolution has more than one candidate. |
| external/failed requests, console/uncaught errors, and scenario action errors | `runtime` | A buildless fixed-data Reference did not execute within its declared boundary. |

The duplicate-key probe exposed a pre-existing Core bug: duplicate detection
checked `elements` before that map was populated. A local `Set` now records
candidate keys during collection. No identity rule changed.

# Newly adopted absolute DOM invariants

| Code | Objective contradiction |
| --- | --- |
| `missing-aria-reference` | `aria-describedby`, `aria-labelledby`, or `aria-errormessage` names an ID that does not exist. |
| `aria-reference-enters-harness` | A product-observed element points into the explicitly excluded Reference harness. |
| `invalid-label-for-target` | An explicit `label[for]` does not resolve through the browser's `label.control` relationship. |
| `unsupported-aria-invalid-token` | A non-empty `aria-invalid` value is outside `false`, `grammar`, `spelling`, and `true`. |
| `observation-key-inside-harness` | A `data-ref` comparison identity is placed in the explicitly excluded harness. |

These checks use existing HTML/ARIA relationships. They require no Reference
annotation, wrapper, schema, DSL, or validation-only ARIA.

# Canary-only cross-state invariant

`contradictory-aria-invalid-state` is emitted only when all of the following
are browser-observed:

1. the initial control had no `aria-invalid` attribute;
2. a scenario introduces an empty or `false` value;
3. native constraint validation reports the control invalid; and
4. the same scenario newly associates a visible `aria-describedby` target.

This is deliberately narrower than “an error-looking message implies
`aria-invalid=true`.” It catches the reproduced form defect without inferring
message meaning or rejecting an untouched required control in its initial
state. The valid fixture deliberately contains `aria-invalid=""` and passes.

# Rejected or deferred candidates

| Candidate | Decision and reason |
| --- | --- |
| empty `aria-invalid` is always an error | Rejected. WAI-ARIA treats empty as the default false-equivalent state. |
| every `aria-invalid=true` needs a described error | Rejected. ARIA does not require one particular error-presentation design. |
| every visible description/error-looking element implies invalid state | Rejected. Message meaning would require wording, class, or design inference. |
| custom application validation must match native validity | Deferred. The canary proves native email/required validation only. |
| harness must occupy a prescribed DOM position or be visible | Rejected. Exclusion is observable; placement and reviewer presentation are authoring choices. |
| every Reference must contain `main` and one `h1` | Rejected for partial References. The existing bounded rule runs only when a product `main` exists. |
| every transferable element must have a stable key | Rejected. Transfer intent cannot be inferred from one Reference, and this would create a Consumer contract. |
| stable-key naming/profile rules | Rejected. No notation is frozen by this Gate. |
| spacing, action placement, workflow, visual fidelity, or aesthetic quality | Rejected. These require comparative or human design judgment. |
| malformed scenario JSON as a conformance report item | Deferred. It already fails closed as CLI/tool error (`2`); converting it to a Reference error was not necessary for the canary. |
| CSS/token synchronization and partial-to-whole diagnostic suppression | Out of scope. They remain separate recurring problem statements. |

# Status of this classification

This is the smallest set justified by the current evidence. It is not a
Reference Profile, an exhaustive accessibility validator, a stable-key
specification, or a frozen CLI API.
