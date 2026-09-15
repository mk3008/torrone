---
type: PoC correction and maintenance-cost record
title: Mixed semantic and stable-key maintenance cost
status: measured; benefit limited
source: source metrics, comparison iterations, and ambiguity probes
---

# Author-maintained Reference cost

| Measure | Explicit accepted Reference | Mixed Variant | Change |
| --- | ---: | ---: | ---: |
| HTML `data-ref` attributes | 27 | 21 | -6 (-22.2%) |
| Scenario target entries | 18 | 18 | no change |
| JavaScript queries containing `data-ref` | 17 | 13 | -4 |
| Reference HTML lines | 979 | 979 | no change |
| Product DOM added for matching | 0 | 0 | no change |

The conversion removed six attributes. Four existing Reference JavaScript
lookups changed locally to native relationship/role/ID lookups because those
elements also participate in the sample's interaction implementation. No new
HTML wrapper, ARIA attribute, metadata block, DSL, or JavaScript abstraction was
added to the Reference Variant.

The three business-noun key renames do not reduce metadata count. They improve
Target readability but require coordinated edits in the Variant Reference
attribute/action JSON and Target attribute. The accepted Reference and stored
evidence were intentionally not migrated.

# Shared CLI/Core cost

The pre-experiment audit observed the Core at 325 lines; mixed capture ends at
413 lines. The increase introduces four named concerns: semantic descriptor
generation, uniqueness indexing, shared action resolution, and pure-semantic
role inventory. The CLI action path uses the same resolver and adds no second
selector language.

This is a material central complexity increase for six removed author
annotations. It may amortize across many References, but one integrated screen
does not prove that. Therefore the experiment records a local authoring benefit
without claiming lower total system maintenance cost.

# Comparison and correction loops

| Step | Observation | Decision/correction |
| --- | --- | --- |
| Eight-candidate Variant | Reference captured 27 points as 19 explicit + 8 semantic. | Proceeded to a content/DOM-different Target rather than accepting local uniqueness. |
| First Target comparison | `semantic:role:banner` missing in 20 states because a Target `main`-scoped `header` was inferred as a second banner. | Corrected general role inference; did not change Target grouping. |
| Ambiguity probe | Two navigation landmarks, tables, menuitems, live regions, pressed buttons, and expanded buttons all failed closed. | Restored four role-only candidates to explicit keys; used two controller relationships instead. Final mix: 21 + 6. |
| Old semantic-only negative | Initially passed because unpaired form controls were omitted from observation. | Added native role-count comparison only for a pure-semantic baseline; negative now fails on `semanticInventory.combobox`. |
| Final integrated Gate | Target passed with 0 errors; historical, semantic-only, and style negatives failed. | No comparison threshold or expected state was weakened. |

# AI interpretation cost

The six generated keys are deterministic but less obvious from source than a
literal `data-ref`. Relationship keys are understandable because they name the
explicit controller. Role keys are understandable only while native landmark
semantics are correctly inferred. The scoped-header defect shows that AI or a
reviewer cannot safely assume tag name equals landmark role.

Explicit keys remained simpler for scenario controls, conditional unroled
regions, representative style samples, and any role that normally appears more
than once. The experiment did not introduce author syntax to disambiguate those
cases; it retained `data-ref` instead.

# Browser startup observation

Seven pre-Gate attempts timed out during `Page.enable` before page comparison.
Runs with the existing `REFERENCE_UI_DEBUG=1` setting and the final integrated
Gate completed. No retry, longer timeout, or new browser-control abstraction was
added because this is not a mixed-matching requirement. Startup stability
remains `UNCONFIRMED` and is separate from the zero-error UI result.

# Reference-complexity and future-conformance signal

The Reference HTML did not become more application-like. The Core did become
more complex, and adding a second same-role element can remove a generated key.
The exact-key/zero-ambiguity assertions in this experiment catch that drift.
This is concrete evidence that a future lightweight Reference conformance check
may be useful before broader adoption. It does not justify implementing a score
or profile in this phase.

