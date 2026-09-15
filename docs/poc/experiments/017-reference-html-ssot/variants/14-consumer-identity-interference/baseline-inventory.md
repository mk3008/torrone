# Consumer identity baseline inventory

This inventory freezes the pre-experiment subjects and measurement boundary. It
is evidence, not a Consumer contract.

## Workspace responsibility

- Explicit baseline Reference:
  `reference/index.html` — 27 explicit observation identities.
- Explicit independent React Target:
  `consumers/transferability-gate-react/src/main.jsx` — 27 explicit identities.
- Existing mixed Reference:
  `variants/02-mixed-semantic/reference/index.html` — 21 explicit and 6 natural
  semantic/relational identities.
- Existing mixed React Target:
  `variants/02-mixed-semantic/target-react/src/main.jsx` — 21 explicit and 6
  natural semantic/relational identities.

The React component does not query `data-ref`; its observation attributes are
validation-only. Product state, event handling, DOM grouping, and CSS are
independent of those attributes.

## Composite responsibility

- Reference:
  `variants/11-composite-granularity/references/entity-autocomplete.html`.
- Target:
  `variants/11-composite-granularity/targets/entity-autocomplete/index.html`.
- Observed Reference identity: 5 explicit and 1 natural semantic identity.

The Target's five `data-ref` values are also used as JavaScript query hooks.
They are dual-use in the existing sample rather than purely validation-only.
Removing them therefore requires a runtime-hook refactor as well as validation
work; that cost must not be hidden.

## Existing Core boundary

The current Core has a direct explicit lookup plus the already corroborated
mixed resolver for unique document landmarks and single-controller
relationships. It fails closed on duplicate explicit identities and semantic
ambiguity. This Gate will not add wording, fixture, class, DOM-index, or new
role heuristics.

## Baseline interpretation

- Lightweight identity annotation: 27 explicit workspace keys, 5 Composite
  keys.
- Natural semantic/accessibility identity: 6 workspace, 1 Composite.
- Validation-only Consumer annotations: 27 in explicit workspace, 21 in mixed
  workspace.
- Dual-use Consumer annotations: 5 in Composite.
- Architecture/runtime interference: none for the workspace attributes;
  Composite runtime queries reuse the attributes locally.
- External mapping/build-mode assets: none.

