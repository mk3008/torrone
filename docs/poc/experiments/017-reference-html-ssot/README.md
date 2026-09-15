---
type: PoC experiment
title: Reference HTML as a UI design source of truth
status: Consumer Identity Interference Gate partial
source: authored and browser-observed
---

# Reference HTML as a UI design source of truth

This experiment tests whether one small, buildless, interactive Reference HTML
can carry reusable business-application UI decisions into implementations with
different product content and different implementation technology.

It does not define a repository-wide Reference format or replace the current
Manifest. The experiment keeps all candidates, failures, browser observations,
and conclusions local to this directory until the evidence supports a smaller
durable decision.

## Experiment loop

1. Compare semantic-only identification with a minimal stable-key candidate.
2. Capture the Reference in a real browser through a shared Core and CLI.
3. Apply the Reference to a different vanilla implementation.
4. Apply the same Reference to a different React implementation.
5. Verify initial and interaction states, computed styles, accessibility
   observations, and deliberately introduced defects.
6. Separate machine-verifiable facts from the final human review.

## Working documents

- [Plan](plan.md)
- [Prior evidence carried forward](prior-evidence.md)
- [Notation hypotheses](notation-hypotheses.md)
- [Business screen review](screen-review.md)
- [Experiment result](experiment-results.md)
- [Verification record](verification-record.md)
- [Two-cycle self review](self-review.md)
- [Human review decision](human-review.md)
- [Human-review adjustment record](human-review-adjustment-record.md)
- [Transferability gate plan](transferability-gate-plan.md)
- [Transferability gate result](transferability-gate-result.md)
- [Transferability verification](transferability-verification-record.md)
- [Transferability stable-key audit](transferability-stable-key-audit.md)
- [Transferability correction cost](transferability-correction-record.md)
- [Transferability business-screen review](transferability-screen-review.md)
- [Transferability two-cycle self review](transferability-self-review.md)
- [Mixed semantic/stable-key plan](mixed-semantic-plan.md)
- [Mixed semantic/stable-key result](mixed-semantic-result.md)
- [Mixed key classification](mixed-semantic-key-classification.md)
- [Mixed maintenance cost](mixed-semantic-cost-record.md)
- [Mixed verification](mixed-semantic-verification-record.md)
- [Mixed two-cycle self review](mixed-semantic-self-review.md)
- [Relational reuse plan](relational-reuse-plan.md)
- [Relational reuse result](relational-reuse-result.md)
- [Relational reuse verification](relational-reuse-verification-record.md)
- [Relational reuse maintenance cost](relational-reuse-cost-record.md)
- [Relational reuse business-screen review](relational-reuse-screen-review.md)
- [Relational reuse two-cycle self review](relational-reuse-self-review.md)
- [Partial Reference plan](partial-reference-plan.md)
- [Partial Reference result](partial-reference-result.md)
- [Partial Reference maintenance cost](partial-reference-cost-record.md)
- [Partial Reference verification](partial-reference-verification-record.md)
- [Partial Reference business-screen review](partial-reference-screen-review.md)
- [Partial Reference two-cycle self review](partial-reference-self-review.md)
- [Form-heavy partial plan](form-partial-plan.md)
- [Form-heavy partial result](form-partial-result.md)
- [Form-heavy partial maintenance cost](form-partial-cost-record.md)
- [Form-heavy partial verification](form-partial-verification-record.md)
- [Form-heavy partial business-screen review](form-partial-screen-review.md)
- [Form-heavy partial two-cycle self review](form-partial-self-review.md)
- [Reference Conformance plan](conformance-plan.md)
- [Reference Conformance invariant classification](reference-conformance-invariant-classification.md)
- [Reference Conformance result](reference-conformance-result.md)
- [Reference Conformance verification](reference-conformance-verification-record.md)
- [Reference Conformance two-cycle self review](reference-conformance-self-review.md)
- [Visual synchronization plan](visual-synchronization-plan.md)
- [Visual synchronization result](visual-synchronization-result.md)
- [Visual synchronization maintenance cost](visual-synchronization-cost-record.md)
- [Visual synchronization verification](visual-synchronization-verification-record.md)
- [Visual synchronization two-cycle self review](visual-synchronization-self-review.md)
- [Token ownership/theme plan](token-ownership-theme-plan.md)
- [Token ownership/theme result](token-ownership-theme-result.md)
- [Token ownership/theme maintenance cost](token-ownership-theme-cost-record.md)
- [Token ownership/theme verification](token-ownership-theme-verification-record.md)
- [Fourth Reference business-screen review](token-ownership-theme-screen-review.md)
- [Token ownership/theme two-cycle self review](token-ownership-theme-self-review.md)
- [Diagnostic review plan](diagnostic-review-plan.md)
- [Diagnostic review result](diagnostic-review-result.md)
- [Diagnostic reviewer cost](diagnostic-review-cost-record.md)
- [Diagnostic review verification](diagnostic-review-verification-record.md)
- [Diagnostic review two-cycle self review](diagnostic-review-self-review.md)
- [Diagnostic adoption plan](diagnostic-adoption-plan.md)
- [Diagnostic adoption result](diagnostic-adoption-result.md)
- [Diagnostic adoption cost](diagnostic-adoption-cost-record.md)
- [Diagnostic adoption verification](diagnostic-adoption-verification-record.md)
- [Diagnostic adoption two-cycle self review](diagnostic-adoption-self-review.md)
- [Diagnostic adoption evidence audit](verify-diagnostic-adoption.ps1)
- [Evidence Harness maintenance plan](evidence-harness-maintenance-plan.md)
- [Evidence Harness maintenance result](evidence-harness-maintenance-result.md)
- [Evidence Harness maintenance decision and cost](evidence-harness-maintenance-decision-record.md)
- [Evidence Harness maintenance verification](evidence-harness-maintenance-verification-record.md)
- [Evidence Harness maintenance two-cycle self review](evidence-harness-maintenance-self-review.md)
- [Evidence Harness current-regression entry point](verify-evidence-harness-maintenance.ps1)
- [Partial CSS negative-contract audit plan](partial-css-negative-contract-plan.md)
- [Partial CSS negative-contract audit result](partial-css-negative-contract-result.md)
- [Partial CSS negative-contract audit verification](partial-css-negative-contract-verification-record.md)
- [Partial CSS negative-contract audit two-cycle self review](partial-css-negative-contract-self-review.md)
- [Partial CSS negative-contract audit entry point](verify-partial-css-negative-contract.ps1)
- [Composite granularity plan](composite-granularity-plan.md)
- [Composite granularity result](composite-granularity-result.md)
- [Composite granularity verification](composite-granularity-verification-record.md)
- [Composite granularity business-screen review](composite-granularity-screen-review.md)
- [Composite granularity two-cycle self review](composite-granularity-self-review.md)
- [Composite granularity entry point](verify-composite-granularity.ps1)
- [DatePicker human-calibration plan](date-picker-human-calibration-plan.md)
- [DatePicker Human Review Pack](review/date-picker-human-calibration/review-pack.md)
- [DatePicker Phase 1 record](date-picker-human-calibration-phase-1-record.md)
- [DatePicker Phase 1 verification](date-picker-human-calibration-verification-record.md)
- [DatePicker Phase 1 business-screen review](date-picker-human-calibration-screen-review.md)
- [DatePicker Phase 1 two-cycle self review](date-picker-human-calibration-self-review.md)
- [DatePicker Phase 1 entry point](verify-date-picker-human-calibration-phase1.ps1)
- [Adjusted Single date review](review/date-picker-human-calibration/single-date-adjustment-review.md)
- [DatePicker human delta record](date-picker-human-delta-record.md)
- [Adjusted Single date verification](date-picker-single-adjustment-verification-record.md)
- [Adjusted Single date business-screen review](date-picker-single-adjustment-screen-review.md)
- [Adjusted Single date two-cycle self review](date-picker-single-adjustment-self-review.md)
- [Adjusted Single date entry point](verify-date-picker-single-adjustment.ps1)
- [Adjusted Date range review](review/date-picker-human-calibration/date-range-adjustment-review.md)
- [Adjusted Date range verification](date-picker-range-adjustment-verification-record.md)
- [Adjusted Date range business-screen review](date-picker-range-adjustment-screen-review.md)
- [Adjusted Date range two-cycle self review](date-picker-range-adjustment-self-review.md)
- [Adjusted Date range entry point](verify-date-picker-range-adjustment.ps1)
- [DatePicker Human Calibration Phase 2 result](date-picker-human-calibration-phase-2-result.md)
- [DatePicker Human Calibration Phase 2 verification](date-picker-human-calibration-phase-2-verification-record.md)
- [DatePicker Human Calibration Phase 2 cost](date-picker-human-calibration-phase-2-cost-record.md)
- [DatePicker Human Calibration Phase 2 business-screen review](date-picker-human-calibration-phase-2-screen-review.md)
- [DatePicker Human Calibration Phase 2 two-cycle self review](date-picker-human-calibration-phase-2-self-review.md)
- [DatePicker Human Calibration Phase 2 entry point](verify-date-picker-human-calibration-phase2.ps1)
- [`aria-activedescendant` observation plan](active-descendant-observation-plan.md)
- [`aria-activedescendant` observation result](active-descendant-observation-result.md)
- [`aria-activedescendant` observation verification](active-descendant-observation-verification-record.md)
- [`aria-activedescendant` observation cost](active-descendant-observation-cost-record.md)
- [`aria-activedescendant` observation two-cycle self review](active-descendant-observation-self-review.md)
- [`aria-activedescendant` observation entry point](verify-activedescendant-observation.ps1)
- [`aria-activedescendant` pre-change canary](capture-activedescendant-canary.ps1)
- [Cold-start / Portability plan](cold-start-portability-plan.md)
- [Cold-start / Portability result](cold-start-portability-result.md)
- [Cold-start / Portability verification](cold-start-portability-verification-record.md)
- [Cold-start / Portability cost](cold-start-portability-cost-record.md)
- [Cold-start / Portability business-screen review](cold-start-portability-screen-review.md)
- [Cold-start / Portability two-cycle self review](cold-start-portability-self-review.md)
- [Consumer Identity Interference plan](consumer-identity-interference-plan.md)
- [Consumer Identity Interference result](consumer-identity-interference-result.md)
- [Consumer identity baseline inventory](variants/14-consumer-identity-interference/baseline-inventory.md)
- [Consumer Identity Interference cost](consumer-identity-interference-cost-record.md)
- [Consumer Identity Interference verification](consumer-identity-interference-verification-record.md)
- [Consumer Identity Interference two-cycle self review](consumer-identity-interference-self-review.md)
- [Consumer Identity Interference evidence incident](consumer-identity-interference-evidence-incident.md)
- [Consumer Identity Fresh Agent report](variants/14-consumer-identity-interference/fresh-agent/agent-report.md)
- [Historical independent-CSS phase instruction](next-poc-instruction.md)

The original vanilla/React transfer evidence is frozen under `output/`. The
current human-review Reference and its evidence are under
`output/human-review/`; the old consumers have intentionally not been updated
to the current Reference. That phase required an explicit human decision. A
passing CLI report does not make this notation, file layout, or CLI contract
canonical.

The bounded transferability Gate now has a content-, structure-, state-, and
CSS-independent Target. Its `meets` result permits another experiment, not a
profile/API freeze, MCP implementation, or Manifest migration.

The relational reuse Gate reached `mixed-beneficial` for a narrow existing
rule: naturally unique landmarks and one region controlled by one explicitly
identified controller. It does not authorize broader semantic inference or any
Profile/API freeze.

The partial Reference maintenance/composition Gate reached
`partial-reference-beneficial` for two responsibility-complete parts. It found
smaller local review surfaces and successful AI composition without a runtime,
while retaining common-style synchronization cost, integrated-screen review,
and noisy partial-to-whole CLI diagnostics as explicit limits.

The form-heavy reuse Gate reached `form-partial-beneficial`. It reused the
fixed common shell without modification and carried a complete input,
validation, correction, review, and edit-return workflow into an independent
credit-adjustment Target. Cross-file visual-token synchronization and noisy
part-to-integrated diagnostics recurred, so they remain explicit costs rather
than silently accepted infrastructure problems.

The Reference Conformance Gate reached `conformance-beneficial`. A Library-side
preflight reproduced and rejected the exact shared `aria-invalid` defect that
comparative validation passed, while eight existing Reference shapes remained
zero-error positives. It adds no Reference metadata or Consumer requirement,
does not score design quality, and does not freeze an invariant catalog,
Reference Profile, or CLI API.

The Visual Rule Synchronization Gate reached `token-sharing-only`. Across the
fixed shell, search, and form References, one small Library-local static token
file reduced a reproduced common edit from three locations to one without a
build, runtime, CLI/Core change, or Consumer requirement. Selector/primitive
sharing added hidden element-scope coupling without improving the tested
maintenance work, so it was rejected.

The Shared Token Ownership / Theme Independence Gate reached
`token-ownership-confirmed`. A responsibility-distinct read-only detail
workspace reproduced the same canvas, surface, and focus-color ownership in a
fourth light Reference and a second complete dark Reference. The thin token
file reduced a reversible light/dark edit from four files and six locations to
one file and two locations while selectors, focus geometry, component theme
rules, and equal-but-independent status accents stayed local. This confirms a
narrow Library authoring boundary, not canonical migration or Consumer token
distribution.

The Diagnostic Review Signal / Noise Gate reached
`diagnostic-presentation-beneficial`. A read-only reporting layer folded 820
raw informational occurrences into 79 exact observation entries across the
search and form-heavy part-to-integrated families. All raw reports, indexes,
status decisions, and comparison behavior remain complete and unchanged. A
focus defect moved from raw entry 162 to the first reviewer error while both
layers remained failing. The presentation is experimental; no CLI schema,
cause taxonomy, suppression, or public command is frozen.

The Diagnostic Presentation Adoption Gate reached
`diagnostic-adoption-confirmed`. The same unchanged reporter folded 126 raw
observations from a responsibility-distinct read-only detail/common-shell
composition into 23 exact entries, retained all indexes, and put an injected
focus error first. A PoC-local post-Gate adapter now produces optional,
regenerable reviewer JSON/Markdown for the four existing part-to-integrated raw
reports without changing producer Gates, raw status, CLI/Core, or browser work.
Public command placement, schema/versioning, and long-term layout remain
unfrozen.

The Evidence Harness Maintenance Gate reached `evidence-harness-maintained`.
It reproduced the old relational/partial/form Core-SHA stops and the old focus
negative's rejection of a saved stronger observation. Historical entry points,
records, and output trees now remain fixed separately from timestamped current
regressions. Six isolated Gate audits passed against the current CLI/Core, with
99 fresh browser attempts and no timeout or retry. A bounded focus contract
keeps the required historical signature while allowing only additions with the
same property, exact mutation values, and complete raw-to-presentation trace.
This does not freeze a provenance format or general negative-test API. A fresh
partial CSS negative exposed two incidental focus signatures outside its
border-radius mutation; their meaning remains a focused follow-up rather than
an assumed general rule.

The Partial CSS Negative Contract Audit reached `historical-drift-confirmed`.
Exact unmutated controls showed that the two added focus signatures can appear,
reverse, or disappear independently of the border-radius mutation under the
same Edge lineage and source bytes. The complete raw 22/four observation is
retained, while the mutation contract requires only the exact `6px -> 20px`
radius failures for elements actually affected by the selector. A second full
six-family current regression passed with 99 fresh browser attempts, zero
timeout, and zero retry. No structural Harness, fixture, comparison, or design
issue remains, so this maintenance line is closed and Composite UI Reference
granularity returns as the recommended next experiment.

The Composite UI Reference Granularity Gate reached
`composite-granularity-beneficial`. Across Date selection and entity lookup, a
complete operation model transferred below workspace scale without shared
business content, DOM, class, local ID, state implementation, or CSS. A
same-file Date family sheet reduced duplicated source but could not serve a
range-only Target without requiring an unproven slicing mechanism. Keep
materially different operation models in separate References; this result does
not adopt a canonical component, variant schema, Profile, API, or Consumer
identity contract.

DatePicker Human Calibration Gate Phase 2 is `meets`. The frozen Composite
Single date and Date range candidates were copied into a separate review
baseline and then human-calibrated. Both adjusted References were accepted on
2026-08-14. The approved Date range remains byte-identical while a separate,
content/fixture/DOM/class/local-ID/state/JavaScript/CSS-independent shipment
Target now passes its 22-scenario comparative contract.

Phase 2 now has four human-feedback rounds for Single date. The final adjusted
Single candidate was accepted on 2026-08-14 as the local basis for a separate
Date range adjustment. After further human review, the range candidate now
treats its editable boundaries as independent one-click DatePickers and permits
Start-only or End-only filters. A completed range is shown as a connected blue
band, while unavailable dates have no filled background. It retains manual
validation, clearing/resumption, month/year movement, pointer use, and the real
input-to-`ArrowDown` keyboard path. Current CLI/Core checks pass 59 states and
22 scenarios with zero bounded
accessibility, console, or network issues. Phase 2 preserved the Phase 1
baseline, accepted Single, historical Target, and historical evidence. The CLI
remains unchanged; one general Core correction removes local-ID spelling from
unkeyed `aria-describedby` comparison while retaining hidden/missing negatives.
Direct input-value comparison, real AT, responsive behavior, canonical
adoption, and Profile/API decisions remain outside the result.

The `aria-activedescendant` Relational Observation Gate is `partial`. A
preserved pre-change canary proved that the old comparison passed when only the
active descendant moved from the visibly selected primary option to an
existing secondary option. The current Core resolves the relation through the
existing explicit/semantic identity map, so different Reference/Target local
IDs pass while wrong, missing, and duplicate targets fail without text, fixture,
class, ID-string, or DOM-position inference. The fixed Composite Reference and
Target remain unchanged, Consumer annotations did not increase, and the full
Composite current regression passes. Three all-family Evidence Harness runs
stopped at a known, unrelated `:focus-visible` Diagnostic Review positive; a
direct same-Edge control passed and Diagnostic Adoption passed independently.
The relation gap is closed, but a clean all-six-family current run is not
claimed.

The Cold-start / Portability Gate is
`portable-after-minimal-externalization`. Baseline Fresh Agents could author,
execute, and transfer accepted operation families, but independent evaluation
rejected one systematically renamed CSS implementation and one Date range
replay with an invented Apply workflow. Two 10-line experimental knowledge
supplements exposed the missing boundaries. Different Fresh Agents and
different fixtures then reproduced independently organized Consumer source and
the approved Date range responsibilities without changing CLI/Core or fixed
References. The two general boundaries were added to the experimental
cross-PoC knowledge; this does not create a public packet, Profile, CLI API, or
canonical UI family.

The Consumer Identity Interference Gate is `partial`. Its bounded comparative
result is `hybrid-preferred`: the existing mixed boundary retained all 27
workspace observations while reducing explicit Consumer metadata from 27 to 21
through six product-natural landmark/control relationships. Stable identity
survived local-ID, class, grouping, and unrelated-element maintenance without
identity changes; a Fresh Agent reproduced the same result with zero added
knowledge. External selector mapping moved five identities into a 24-line
mapping/loader and added selector synchronization, while conditional build-time
instrumentation retained all 21 source sites and added artifact-lineage cost.
No CLI/Core change or Consumer contract was adopted. Final attainment is held
at `partial` because a legacy Reference Conformance entry point was run directly
and regenerated its fixed historical output tree. The unchanged provenance
guard rejects that tree; the manifest was not rewritten. Restore the original
tree from an authoritative backup before treating the otherwise supported
hybrid result as a completed Gate or advancing to Reference Discovery / Curation.
