---
type: PoC review contract
title: Per-Run common-shell adaptation review
status: frozen
source: authored
---

# Per-Run review contract

## Review procedure

An independent reviewer inspects only the frozen inputs and one assigned Run's
`initial/` artifact. It records its first review before any correction. The
reviewer does not inspect another Run, edit frozen inputs, or accept its own
finding as a change to the Reference or Manifest.

The reviewer exercises at least:

1. Light/Drawer-visible initial state;
2. the Drawer control to reach hidden state and verify no reserved Drawer area;
3. the palette control in both Drawer states;
4. navigation filtering with a matching and no-match query;
5. disclosure collapse/re-expand while retaining the current destination; and
6. independent vertical scrolling of Drawer navigation and workspace content.

## Decision matrix

For every material observation, classify both its relationship to the
Reference and its problem type.

| Reference relationship | Meaning |
| --- | --- |
| `invariant-satisfied` | A required outcome is visibly and semantically present. |
| `parameter-applied` | A supplied product fact or allowed state is represented correctly. |
| `rational-default-deviation` | A default differs for a stated product/accessibility/platform reason while invariants remain intact. |
| `freedom-variance` | DOM, CSS, icon, state-storage, or other implementation freedom differs without changing the intended outcome. |
| `design-family-divergence` | A material visual or behavioral difference changes the common-shell design family. |
| `code-structure-only` | Source organization differs with no user-visible or semantic consequence. |

| Problem classification | Use when |
| --- | --- |
| `implementation-translation-error` | The fixed inputs are clear and this Run fails to apply them. |
| `adaptation-instruction-gap` | The application input does not provide a necessary product fact or adaptation boundary. |
| `verification-condition-gap` | Available evidence cannot establish the required observation. |
| `reference-or-manifest-gap` | Frozen reusable guidance is insufficient or contradictory. Do not change it in this Attempt. |
| `rational-implementation-variance` | A difference is allowed and justified. |
| `incidental-generation-failure` | The artifact is broken or incomplete for a non-design reason. |

## Correction rule

Only `implementation-translation-error` or `incidental-generation-failure`
findings may receive one bounded correction cycle in the assigned Run. Preserve
the initial artifact and its review. Record the correction count, changed files,
and re-verification outcome. All other finding types remain evidence for the
final synthesis; they do not authorize a Reference, Manifest, guidance, or
validation change during this Attempt.

## Final synthesis

After all Runs reach a final reviewed state, compare the three final artifacts
for design-family membership, initial and final invariant coverage, correction
burden, shared misunderstandings, and the decision questions named in the user
request. The comparison report must distinguish mechanical evidence from the
human decision request.
