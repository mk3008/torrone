---
type: PoC result
title: aria-activedescendant relational observation Gate result
status: partial
source: preserved false-pass canary, current Core comparison, independent Target, negative probes, and current regression evidence
---

# `aria-activedescendant` relational observation Gate result

## Attainment

**`partial`**

The relational capability is beneficial and the Composite Autocomplete gap is
closed in the bounded experiment. A previously invisible wrong-active-option
defect now fails while the unchanged, local-ID-independent Target passes.

The overall Gate is not labeled `active-descendant-observation-beneficial`
because three unchanged Evidence Harness current-regression attempts stopped at
the known focus-sensitive Diagnostic Review positive. The failure contains no
active-descendant path, but a clean all-six-family Harness run was not obtained.

## Observation-hole canary

The preserved pre-change Core/CLI canary adds a Target-local ID to the existing
secondary carrier option, leaves the primary option visibly selected and
styled, and changes only `aria-activedescendant` to point at the secondary
option. The comparison incorrectly passed with zero errors.

The final canary is stored under
`output/active-descendant-observation-canary/20260814T073329Z/`, including the
exact mutated Target and the pre-change Core/CLI bytes. The first development
canary is retained but not used because its secondary option lacked an ID; the
two-cycle review caught that it did not represent a valid ARIA target.

## Logical identity

The approved Composite sources remain unchanged:

- Reference local ID: `account-option-primary`;
- Target local ID: `carrier-option-primary`;
- shared observation identity: `entity-option-primary`.

The Core resolves the relation target through the existing element identity
map. That map already contains unique explicit and naturally resolved semantic
identities. It does not compare the ID strings and adds no option-text,
fixture-value, DOM-index, or class-name fallback.

An unkeyed secondary option resolves to `unresolved`, which differs from the
Reference's `entity-option-primary`. A duplicated explicit identity is already
reported through `duplicateKeys`; the active relation also fails instead of
choosing one duplicate.

## State-aware observation

The unchanged existing scenarios produced the same relation states in the
Reference and independent Target:

| State | `aria-activedescendant` observation |
| --- | --- |
| initial | absent |
| popup open after text entry | absent |
| after `ArrowDown`, before selection | `entity-option-primary` |
| after `Enter` completion | absent |
| after pointer completion | absent |
| no results | absent |
| after clear | absent |

The comparison records attribute presence separately from the logical target.
It therefore does not require the attribute in every state, but a Target cannot
retain it where the Reference has removed it.

## Negative probes

| Probe | Result |
| --- | --- |
| Existing wrong active target | fail: one `elements.entity-query.relationships.activeDescendant` signature |
| Missing active target | Reference Conformance error: one `missing-aria-reference` signature naming `aria-activedescendant` |
| Duplicate active-option identity | fail: 11 occurrences across `duplicateKeys` and active-descendant relation signatures |

The wrong-target negative preserves popup visibility, primary
`aria-selected="true"`, primary styling, and all fixture content. The new
failure is therefore attributable to the relation target rather than another
visible state.

## Reference and Consumer impact

- Composite Reference changes: **0**;
- Composite Target changes: **0**;
- Consumer annotation increase: **0**;
- existing Reference/Target explicit annotations: five each;
- shared local IDs/classes: **0 / 0**;
- new Reference or Consumer metadata: **0**;
- new CLI option or public command: **0**.

No canonical visual or interaction design changed. No human design judgment was
required.

## CLI/Core change

The Core adds `aria-activedescendant` to observed state and relation handling,
adds it to the existing missing-ID Reference Conformance inspection, and uses
only the already resolved element identity for the relation target. The CLI's
existing ID-reference presence comparison now includes the attribute.

Compared with the preserved canary implementation:

- Core: 508 to 514 lines, `+10 / -4`;
- CLI: 929 lines, `+1 / -1`;
- public CLI interface: unchanged.

## Regression result

- Composite UI current regression: pass, including both independent Targets
  and all existing Composite negatives;
- Relational reuse, Partial Reference, Form-heavy Partial, and Reference
  Conformance current regressions: pass in each retained full-Harness attempt;
- Diagnostic Adoption isolated current control: pass;
- targeted Conformance, historical, semantic-only, CSS, interaction, missing-
  relationship, wrong-target, and ambiguity negatives: retained;
- console errors, external requests, and failed requests in the targeted Gate:
  zero.

The all-six-family Evidence Harness is not clean. Three runs stopped at
Diagnostic Review because `query-filter` had Reference-only `:focus-visible`
outline color/style in one state. A direct same-Edge control immediately passed
with zero errors. This matches the existing execution-sensitive focus evidence
and is unrelated to `aria-activedescendant`, but the required full pass remains
unproven rather than waived.

## Long-lived knowledge

The observation boundary now records two bounded points:

1. human calibration for a new family/model should feed corrections into
   scenarios, negatives, and AI self-review, permitting lower review frequency
   for closely related models without generalizing product choices;
2. `aria-activedescendant` should compare a resolvable relation-target identity,
   not its local ID string, while missing and ambiguous targets fail closed.

This does not define all ARIA relations or make an unresolved option a valid
transferable identity.

## Composite closure and next phase

The specific Composite UI correctness gap can be closed once: the fixed
Autocomplete Reference/Target now prove local-ID-independent active-option
comparison, and the complete Composite Gate passes. The broader claim that all
current Evidence Harness families are green remains unavailable.

Consumer Identity Interference work may proceed if it carries this explicit
Harness reliability note and does not relabel this Gate as fully green. No new
Consumer annotation is required by this result, so there is no relation-driven
interference to remove first.

## Human judgment

None for this Gate. Future Entity Selector visual approval, unfamiliar
operation models, and product-specific selection behavior remain separate
human-design concerns.

