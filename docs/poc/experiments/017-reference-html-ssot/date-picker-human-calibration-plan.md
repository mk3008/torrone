---
type: PoC plan
title: DatePicker Human Calibration / Observation Extraction Gate plan
status: complete; meets
source: fixed Composite UI granularity evidence and noncanonical DatePicker drafts
---

# Issue

Composite granularity proved that date selection transfers as a complete
operation model, but it did not measure whether an AI-authored DatePicker is a
design a human would choose as a Reference. The missing evidence is the human
delta: what a reviewer notices, how locally it can be corrected, and whether
the corrected executable Reference can remain the comparison SSOT.

# Customer

Reference Library authors and reviewers deciding when AI and CLI evidence is
sufficient and where scarce human design review adds unique value.

# Customer Value

A reviewer receives two directly operable, technically sound drafts instead of
raw evidence or a new review application. Later feedback can be measured from a
fixed baseline rather than reconstructed from memory, and only repeated human
observations need to influence future authoring guidance.

# Acceptance Criteria

1. Preserve the accepted PoC Reference, Composite candidates and evidence,
   existing Targets, CLI/Core, and historical provenance.
2. Create a noncanonical human-calibration baseline from the existing single-
   date and date-range candidates without combining their operation models.
3. Change only objective defects or state-exposure gaps required for human
   review; retain subjective density, popup placement, size, and visual choices
   as the AI draft.
4. Let a reviewer directly exercise closed/open, focus/keyboard, selection,
   completed value, clear, and reselection for both References, plus range
   intermediate state and a visible fixed `today` fixture.
5. Keep any review-only labeling outside product observation using the existing
   harness marker; add no scenario selector unless normal interaction is
   insufficient.
6. Pass current Reference Conformance, snapshot scenarios, bounded
   accessibility, focus/interaction completion, console, and network checks.
7. Freeze source hashes, browser evidence, CLI/Core hashes, accepted Reference
   hash, Composite source hashes, and the Phase 1 adjustment record.
8. Provide a concise Review Pack with two direct links, scope boundaries, and
   the minimum human question, then stop before human correction.

# Verification Method

| Criterion | Verification |
| --- | --- |
| 1 | before/after SHA-256 assertions for fixed sources and the existing Composite output tree |
| 2–5 | source inspection, direct browser operation, harness exclusion, and screenshots |
| 6 | current CLI `preflight` and `snapshot`; explicit final-state assertions; Playwright CLI keyboard/pointer spot checks |
| 7 | machine-readable baseline manifest and timestamped evidence directory |
| 8 | Review Pack link/scope audit and Phase 1 stop report |

# Scope In

- single-date and date-range AI drafts copied into a new, noncanonical Phase 1
  baseline boundary;
- objective HTML/ARIA, keyboard, completion, and review-state exposure fixes;
- one directly readable Review Pack;
- Phase 1 browser evidence, adjustment record, screen review, verification,
  and two-cycle self-review.

# Scope Out

- human approval, corrected Target transfer, and final Gate classification;
- Entity Selector calibration, new DatePicker variants, locale, timezone,
  async behavior, responsive behavior, or production date logic;
- Consumer identity reduction, `aria-activedescendant` Core work, Profile/API,
  variant schema, MCP, Manifest/OKF, stage, commit, or push.

# Risks

- Fixing subjective design before review would erase the AI-to-human delta.
  Limit Phase 1 edits to objective defects and required observable states.
- A fixed `today` example can be mistaken for the actual system date. Label it
  in the harness boundary as a fixed review fixture and keep product markup
  semantically coherent within that scenario.
- A custom calendar can imply features that were never reviewed. Phase 2 now
  includes a complete month view, month/year movement, and one fixed future-date
  constraint because the human explicitly requested those review states. Do not
  infer locale, timezone, responsive, or production date policy from them.
- Action success alone may not prove completion. Assert the final value,
  selection visibility, popup closure, expanded state, and focus return.
- Baseline duplication could become a second maintained source. Treat it as
  immutable evidence; Phase 2 corrections must be a separate file boundary.

# Required Docs / Tests / Changeset

- this plan;
- two baseline HTML files and one short Review Pack;
- a PoC-local Phase 1 verification entry point;
- baseline manifest, adjustment record, verification record, business-screen
  review, and two-cycle self-review;
- changeset: not applicable; no package or public API.

# Repository Evidence Plan

Repository evidence is primary: source hashes, current CLI/Core reports,
screenshots, scenario states, harness boundaries, and fixed-source assertions.
The executable HTML remains the baseline SSOT; no parallel expected-style file
will be created.

# Supplementary Evidence Plan

The human's free-form visual and interaction judgment is intentionally not
available in Phase 1. Rendered screenshots support readiness only. Phase 2 must
record the human's own observations and cannot infer approval from this pack.

# Open Questions

- The fourth adjusted Single date candidate was accepted by the human reviewer
  on 2026-08-14 as the basis for the Date range adjustment.
- The human reviewer accepted the adjusted Date range candidate on 2026-08-14.
  Independent one-click boundaries, Start-only/End-only states, connected range
  band, unavailable-date treatment, compact geometry, and boundary validation
  are therefore `CONFIRMED` for this business-filter Reference.
- Human correction cost, observation classification, pre-followup failure, and
  corrected independent Target transfer are recorded in the Phase 2 result.

# Ledger Snapshot

- **Goal:** prepare and freeze an objective-error-free DatePicker AI draft for
  one human calibration cycle.
- **Now:** the accepted Single and Date range References remain fixed. The
  Date range Target follow-up and current full regression pass.
- **Next:** use the extracted observation prompts for closely related drafts;
  do not freeze a DatePicker Profile or remove human judgment for new product
  semantics.
- **Blockers:** none.
- **Evidence Ready?:** yes for the bounded Human Calibration Gate. Direct
  input-value comparison, real AT, responsive behavior, and product-wide
  DatePicker adoption remain outside the evidence.

# Stop Condition

The former human-confirmation stop condition was satisfied. Further work still
stops if it requires changing the approved Reference, a new product-design
decision, a broad CLI/Core redesign, Profile freeze, or canonical adoption.
