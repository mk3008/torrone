---
type: PoC review contract candidate
title: Attempt 3 common-shell visual-binding review
status: candidate for human review
source: authored from Attempt 2 findings
---

# Attempt 3 review contract

## Two separate gates

Review structural invariants and exact visual bindings separately. Passing the
structural gate or looking like the same design family never passes the visual
binding gate.

| Gate | Pass condition |
| --- | --- |
| Structural invariant | The structural invariants in the Reference contract are visibly and semantically present. |
| Exact visual binding | The token stylesheet, icon assets, state pairing, named locations, selected-row treatment, and both theme states match the Reference-owned binding map. |
| Adaptation freedom | DOM, components, state model, CSS organization, and files differ without changing either prior gate. |

## Finding classifications

| Classification | Use when |
| --- | --- |
| `exact-binding-miss` | A fixed token, icon, state pairing, location, or selected-row binding differs. |
| `structural-invariant-miss` | A required Header/Drawer/workspace relationship or behavior differs. |
| `reference-binding-gap` | The fixed binding map lacks a necessary exact visual decision. Do not repair it during the Run. |
| `adaptation-instruction-gap` | A Run cannot determine the required reuse or implementation boundary. Do not repair the input during the Run. |
| `validation-gap` | The specified check cannot establish an exact binding. Do not weaken the check. |
| `allowed-implementation-freedom` | An implementation choice is outside the binding map and preserves both gates. |

## Required review states

Review Light and Dark with Drawer visible; Light and Dark with Drawer hidden;
expanded and collapsed parent disclosure; the current row; and the normal
search field. Confirm exact bindings from source/static evidence first, then
use browser review for rendered placement and state visibility.

## Human threshold

The reviewer must not accept a different palette, icon, indicator, or named
placement merely because it is recognizable or aesthetically similar. A human
approval asks whether the intentionally narrow exact visual subset is correct,
not whether a regenerated shell generally looks plausible.
