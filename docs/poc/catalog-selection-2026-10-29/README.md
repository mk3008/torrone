# Visual-catalog selection pilot

Date: 2026-10-29. Execution: [Issue #63](https://github.com/mk3008/torrone/issues/63).

## Finding

**Additional validation is required to measure selection improvement. Do not introduce a permanent guide or required per-entry selection fields on this evidence.** All twelve recorded decisions remain unchanged when the experimental aid is added. Existing descriptions already supply the distinctions needed for these cases.

This is a bounded same-agent desk comparison. It shows that the proposed aid duplicates decision-relevant information already present in the source. It does not demonstrate that the aid has no effect on a fresh reader, that readers reliably find the source limits, or that selection errors are reduced. No human correction count, search-time improvement or statistical effect was measured.

## Fixed materials and sequence

1. Read the catalog index and all eleven entry READMEs at Torrone commit `581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0`. Inspect six representative original PNGs as recorded in [the baseline](baseline.md).
2. Save requirements, source-derived checks and A answers in baseline commit `2a446a56fa87de9514d982c5046cba39de52741b`.
3. Write the [experimental aid](experimental-aid.md), 117 whitespace-separated words including its title, in commit `baf33f32af0269d5d1f5192809e95ae9ae781f03`.
4. Re-evaluate the same cases with the same source plus that aid. The following table is the recorded B output, with the adoption status, scope and unresolved questions retained.

No isolated sessions, external model API, independent evaluator or human trial were used. No extra API spending was introduced. The author knows both conditions and the checks. The case set is synthetic and source-informed; it is suitable for a feasibility exercise, not an unbiased estimate of real-world failures.

## Recorded B decisions

| Case | B decision | B rationale / explicit gap | Difference from A |
| --- | --- | --- | --- |
| C01 | Suitable: SHELL-001 | Complete hiding and expanding content match. Menu content, routing and permissions stay outside the Shell responsibility. | None |
| C02 | No registered match | Permanent icon rail contradicts this Shell's complete hiding. Do not create a registered rail ID. | None |
| C03 | Suitable: INLINE-LOOKUP-001 | Single entity and candidate/commit distinction match. Use committed images for Clear/ID; do not interpret highlighting as commitment. | None |
| C04 | No registered match for whole request | Single-entity appearances do not supply multiple selected entities or removable chips. An adaptation would require its own design. | None |
| C05 | Partial: INLINE-LOOKUP-001 | Represented field/list visuals may be reused. Server loading, timeout and retry remain unpictured; local no-results does not cover them. | None |
| C06 | Suitable for regions: DIALOG-001 | Header/body/action hierarchy matches. Operational scrolling, focus, saving and approval are separate; frame appearance acceptance is not generic executable approval. | None |
| C07 | Partial: DISCLOSURE-001 | Local open/closed appearances are usable. Exactly-one-open and unsaved-value retention remain unspecified by the pattern. | None |
| C08 | Suitable: DATE-RANGE-001 | Empty/partial boundaries and active-calendar ownership match. Optionality comes from the request; fixed August dates and cutoff are fixtures. | None |
| C09 | No registered match for selectable-filter responsibility | BADGE-001 is noninteractive. Shape alone cannot establish a toggled filter; any reused visual treatment needs a separately designed control. | None |
| C10 | Clarification required | Ask one/many and inline/separate task. INLINE-LOOKUP-001 and DIALOG-001 remain conditional appearance candidates; the frame is not a chooser contract. | None |
| C11 | No registered match | The index says Watch images are unrecovered. Do not invent WATCH-001 or treat pressed appearance as persistent on/off state. | None |
| C12 | Partial: TEXT-BUTTON-001 | Normal/focus are pictured. Disabled/loading are missing; icon-button approval does not supply text-button variants. | None |

These are candidate reuse decisions, not new design approvals.

## What was and was not observed

| Dimension | Desk-comparison observation | Limit |
| --- | --- | --- |
| Adoption and scope | 12/12 records unchanged between A and B: four suitable, three partial, four without a registered whole-request match and one requiring clarification. | Counts describe these authored records, not a general correctness rate. |
| Invented registered IDs | Neither answer table adopts an ID absent from the fixed catalog. WATCH-001 appears only as an explicit rejected invention. | Checked against the fixed index; not an adversarial model trial. |
| Unpictured states | C05 and C12 retain state gaps; C07 retains coordination/retention gaps. | No independent grader or executable implementation. |
| Forced application | C02, C04, C09 and C11 retain no-match conclusions; C10 retains conditional candidates. | Source-informed cases may favor correct abstention. |
| Unsupported inference | Source inspection found no new behavior, approval or business-rule claim in either table. | Same-author assessment; not independent verification of semantic correctness. |
| Human corrections | Not measured: no human has evaluated these answers in this pilot. | Do not report zero corrections. |
| Reader effort / speed | Not measured. The aid gathers four reminders in one place. | A possible retrieval benefit is a hypothesis, not an observed improvement. |
| Maintenance | One additional 117-word aid, four bullets, zero new fields in eleven entries. | Structural surface only; authoring/review time and future synchronization cost were not timed. |

## Incremental information and maintenance

| Aid statement | Existing source | Additional decision information |
| --- | --- | --- |
| Match responsibility, allow partial coverage | Catalog index, “What the images communicate” and “Apply a pattern”; individual responsibility limits | None identified |
| Keep missing states explicit | Index, “Apply a pattern”; lookup and text-button limits | None identified |
| Separate appearance, behavior and approval | Index, boundary table and “When you need an interaction model”; individual provenance | None identified |
| Preserve no-match and missing requirements | Index, non-exhaustive list and unrecovered Watch note; entry scope restrictions | Makes the response wording explicit; no new pattern boundary |

A short central reminder has less duplication than adding selection tables to all eleven entries, but it still introduces text to review and keep aligned. Per-entry Do/Don't fields would create eleven additional maintenance locations without demonstrated need. Neither approach is adopted here.

No source-description defect requiring correction was identified by this case set. If a future reader consistently misses a specific existing limitation, first test a local clarification or better placement at that source. If errors instead recur across entries despite clear sources, a small central aid is a reasonable next candidate. These are contingent options, not current product policy.

## Proposed independent follow-up

A later clean-session comparison can reuse the frozen cases as pilot cases. Keep the case-derived checks and both answer tables hidden from selectors. Give A the original index, entry text and the same image access; give B exactly those materials plus the aid. Keep task instructions, model/settings, tools and output fields identical. Ask for candidate IDs, appearance scope, source, uncovered states, clarification questions and remaining application decisions. Do not make “return no match” a special instruction only in B.

Use independent selectors with no cross-condition memory, balance order or assignment, and have an evaluator judge anonymized answers against the requirements and sources before seeing the condition label. Separate errors of selection, missing-state coverage, unsupported inference and absent requirements; record actual human corrections and reader effort only if observed. More than one independent sample is needed before generalizing. The current source-informed cases should not be the only final evaluation set.

Predeclare the decision: a guide is worth a bounded product trial only if it reduces material errors or necessary human correction without adding errors or materially increasing unresolved decisions. If both conditions have no material errors, report no demonstrated need; do not change the cases until B wins. If only one entry causes errors, compare a local source edit before imposing catalog-wide structure. No benchmark engine, registry, new Skill or new pattern is needed.

This clean-session trial was not executed in this Work turn. An independent execution is needed because the current author has seen the cases, checks and aid; repeating here cannot restore independence. No unavailable capability or permission failure is claimed.

## Verification and boundaries

This PR adds only three research Markdown files under this directory. No catalog image, SVG, entry README, executable Reference, curation status, historical output, application UI, product guidance or dependency is changed. Application interaction verification and GUI operation review are not applicable to these research documents; they do not implement a control or change an approved design. No E2E or historical experiment rerun is claimed.

Checks at handoff: read back the exact saved Markdown; compare baseline bytes to its freeze commit; verify twelve A/B case IDs and their unchanged decision classes; check adopted IDs against the eleven-entry index; verify pinned source targets and local research links; inspect the base-to-head changed-file list. Exact results and candidate head are recorded in the PR/Issue so this document does not pretend that a future head was already checked.

## Retrospective

The main methodological risk is treating a self-authored comparison as evidence that guidance works. This pilot preserved A before writing the aid, kept negative/partial/underspecified examples, reported no change and left human corrections unmeasured. Those measures improve traceability but do not create independence. The next evidence must come from a fresh trial, not stronger success language.

No new global rule or Skill is justified. The product hypothesis remains open; this report is research evidence, not adoption.
