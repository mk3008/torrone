---
type: PoC correction and maintenance-cost record
title: Relational semantic identity reuse maintenance cost
status: measured
source: source metrics and correction loops
---

# Author-maintained cost

| Measure | Reference | Target | Relational explicit-key alternative |
| --- | ---: | ---: | ---: |
| Explicit `data-ref` attributes | 6 | 6 | 8 per screen |
| Natural `aria-controls` relationships | 2 | 2 | 2 per screen |
| Semantic-only ARIA/metadata added | 0 | 0 | not applicable |
| Product-facing scenario harness | 0 | 0 | not applicable |

The `aria-controls`, expanded state, menu semantics, and local IDs express
actual product relationships and interaction state. They were not added solely
to feed the resolver. Using explicit keys for the two controlled regions would
be valid, but would add two independently maintained annotations without
removing the existing accessibility relationship.

# Central tooling cost

Core and CLI changes were zero. The prior mixed implementation cost is now used
by a second screen shape, which is the evidence needed to move from a one-screen
candidate to the narrow `mixed-beneficial` judgment. The generated identity is
still less immediately visible than a literal region key, so the benefit ends
when the controller relation is not unique and natural.

# Correction loops

| Loop | Finding | Cost | Boundary preserved |
| --- | --- | --- | --- |
| First Target comparison | Named summary `section` was implemented as a generic `div`; one tag signature repeated across seven states. | One Target file; opening and closing tag only. | Reference and comparison rules unchanged. |
| First integrated script run | Repeat JSON differed because only one capture recorded artifact filenames. | One Gate-script argument addition. | UI, Core, and expected values unchanged. |
| Human business-screen review | Unspecified primary actions were unnecessary for relational testing. | One local removal in each experimental screen plus metric update. | No invented workflow remained. |

The Reference required one scope-reduction correction during human review; its
relational markup required no correction. The Target required one semantic-tag
correction plus the same action removal. No meaning was synchronized across a
second expectation file.

# AI interpretation cost

The controller key makes `semantic:controlled-by:<controller>` understandable
once the shared rule is known, and changing business wording, fixture data,
class tokens, or local IDs required no identity edit. Target grouping and
JavaScript organization also differed without a resolver change.

The ambiguity probe demonstrates the stopping point: once a controller names
two targets, adding an explicit key is simpler than teaching the Core to guess.
No author-facing disambiguation syntax was introduced.
