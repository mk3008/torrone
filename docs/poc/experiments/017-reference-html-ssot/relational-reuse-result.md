---
type: PoC experiment result
title: Relational semantic identity reuse Gate result
status: mixed-beneficial
source: fixed inputs, browser observation, source audit, and human screen review
---

# Attainment status

- **Gate status:** `mixed-beneficial`
- **Workflow attainment:** `done`
- **Scope of the decision:** the existing single-controller
  `aria-controls` relation, plus naturally unique `banner` and `main`; not a
  general semantic-first identity system.

# Outcome

The unchanged mixed resolver identified a user-menu popover and a filter panel
on a second screen shape without a new heuristic, exception, metadata block, or
Reference-only structure. The Reference and Target also resolved `banner` and
`main`, replayed three scenarios and six actions, and compared with zero errors
or diagnostics.

This is sufficient for the bounded `mixed-beneficial` decision described by
the Gate: the central mixed-resolution cost now has evidence from more than one
business screen. It does not establish a Profile, key notation, CLI API, or
semantic conversion target.

# Experiment screen

The buildless Reference is a month-end close checklist with fixed tasks,
summary values, a naturally collapsible filter form, and a user account menu.
The content/implementation-different Target is a site readiness board with
different wording and fixtures.

Both are plain, self-contained HTML/CSS/JavaScript. They have no external
request, data layer, framework dependency, or product-facing scenario selector.
Their class token sets and local ID sets do not overlap. The Target uses a
different grouping structure and separately authored inline CSS while retaining
the observable design and interaction results.

# Relational identity reuse

| Prior relational candidate | New-screen result | Reason |
| --- | --- | --- |
| Controlled user-menu popover | Reused | A product-needed account button already uniquely controls one menu. |
| Controlled filter panel | Reused | A product-needed filter button already uniquely controls one form. |
| Controlled primary navigation | Not used | The checklist/board has no natural drawer or collapsible primary navigation. |
| Controlled navigation children region | Not used | Adding a parent/children navigation hierarchy would exist only to improve reuse count. |

Natural reuse was therefore two of four. No relation was added only for the
resolver.

# Core and authoring cost

The Gate added zero Core or CLI heuristics; their fixed hashes stayed unchanged.
Each screen contains two natural `aria-controls` relationships and six explicit
observation annotations. The two controlled regions need no separate
`data-ref`; the relational explicit-key alternative would require eight
annotations.

For one isolated screen, adding two explicit region keys remains easy and can
be more obvious to an unfamiliar reader. Across multiple References, however,
the mixed rule removes duplicate identity where the controller relationship is
already required and descriptive. The central implementation is now reused
without another inference branch. The net benefit is real but narrow: retain
explicit keys for anything that is not naturally unique.

# Ambiguity result

The probe gives one keyed controller two controlled forms. The existing Core
reports `semantic:controlled-by:filter-toggle` with candidate count two and
does not capture either form by position. This preserves the fail-closed
boundary without text, fixture, class, local-ID spelling, or DOM-order fallback.

# Corrections and scope control

The first Target comparison exposed one semantic design mismatch: the Target
used a generic `div` where the Reference used a named `section` for its summary.
Changing one opening and one closing tag in the Target removed the single
repeated signature across seven states. No Reference, Core, CLI, or threshold
changed.

Human screen review then removed one inert primary action from each experimental
screen. Those actions did not contribute to relational identity and would have
introduced undefined product behavior merely to make the screen look complete.
The final screen remains understandable without them.

# Fixed evidence and negatives

The accepted Reference, Core, CLI, Transferability packet, and Mixed packet
matched their fixed hashes/digests before and after the Gate. Existing negative
artifacts were not overwritten or regenerated. Their stored historical,
semantic-only, and style failure signatures were rechecked while the unchanged
Core/CLI hashes preserved their implementation input. The new ambiguity probe
was executed separately and failed closed as intended.

# DevTools reliability

Across development and final verification there were 19 browser-start/capture
attempts, one shell-level timeout, and one retry. The timeout occurred on the
first default-Chrome attempt. The retry and all subsequent runs used an explicit
installed Edge path. The final integrated Gate completed five of five attempts
with no timeout or retry.

No root-cause investigation or harness timeout change was made. Startup
reliability remains `UNCONFIRMED` as a separate harness concern; it did not
invalidate the successful final evidence run.

# Knowledge promotion

Cross-experiment principles were promoted to
[Reference HTML observation boundary](../../reference-html-observation-boundary.md).
Its authority is experimental guidance under `docs/poc`; it is not Manifest,
Profile, stable-key, CLI API, or application authority.

The durable addition is the narrow, corroborated controller-relationship
pattern and its fail-closed limit. Screen fixtures, hashes, line counts,
correction signatures, browser attempt counts, and Gate status remain only in
this PoC record.

# Next phase recommendation

Stop expanding semantic inference. Use the current mixed boundary only when a
future, independently motivated Reference naturally contains a unique native
landmark or single-controller relation; otherwise use explicit keys. Measure
author/reviewer correction cost during that work rather than opening another
semantic-reduction phase.

Before scaling browser runs substantially, address DevTools startup reliability
as a separate harness task if the observed timeout rate recurs. Do not proceed
automatically to MCP, Profile freeze, partial-Reference migration, or Manifest
replacement.
