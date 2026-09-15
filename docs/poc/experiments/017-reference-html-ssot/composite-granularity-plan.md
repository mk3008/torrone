---
type: PoC plan
title: Composite UI Reference Granularity Gate plan
status: complete; composite-granularity-beneficial
source: fixed PoC 017 evidence and noncanonical composite candidates
---

# Issue

Workspace-scale partial References are useful, but the next-smaller natural
authoring boundary is unconfirmed. A compound control is not automatically a
useful Reference: it must carry a complete operation from initiation through
state change, completion, and recovery without turning a small sample into a
second application.

# Customer

Reference Library authors, Target implementers, and reviewers deciding how to
store reusable business-application interaction knowledge without freezing a
Consumer component contract.

# Customer Value

Authors can choose a smaller review and correction surface for interaction-
dense UI only when it remains understandable, transferable, and mechanically
observable. Implementers can reuse the operation model without copying DOM,
CSS, fixture vocabulary, or application structure.

# Acceptance Criteria

1. Preserve canonical References, existing Target/Consumer evidence, CLI/Core,
   comparison semantics, Conformance rules, token ownership, and historical
   provenance.
2. Build noncanonical, directly openable DatePicker candidates covering one
   single-value model and one materially different multi-value model.
3. Build noncanonical Entity Selector candidates covering autocomplete and
   dialog lookup operation models with fixed local fixtures only.
4. Compare a same-file family presentation with separate-Reference ownership
   using actual source, interaction, maintenance, and review measurements
   rather than a predesigned variant schema.
5. Keep every selected Reference responsibility-complete from initiation to
   selection/confirmation and clear or reselection, including important
   keyboard/focus and no-result states where intrinsic to the family.
6. Produce at least one content-, fixture-, DOM-, class-, local-ID-, state-,
   and CSS-independent Target per family without a new framework or dependency.
7. Verify state, computed style, focus, relationships, interaction, bounded
   accessibility, and console/network health with current CLI/Core.
8. Retain one reversible interaction or relationship negative per family and
   prove that the existing comparison or Conformance boundary rejects it.
9. Measure HTML/CSS/JS lines, state/scenario/fixture/identity/harness metadata,
   correction touch points, Target interpretation burden, and Consumer
   identity interference for every retained candidate.
10. Run business-screen review, two cross-family self-review cycles, cleanup,
    and promote only findings reproduced across both families to long-lived
    knowledge.

# Verification Method

| Criterion | Repository verification |
| --- | --- |
| 1 | fixed source/hash audit and scoped diff; historical provenance hash unchanged |
| 2–5 | browser-openable HTML, source metrics, scenario snapshots, screenshots, and candidate comparison record |
| 6 | source independence/leakage scans plus Target provenance and DOM/CSS/JS metrics |
| 7 | current CLI snapshot/verify/preflight reports and health aggregation |
| 8 | isolated mutation/control/restore reports with byte-identical restoration |
| 9 | deterministic source/metadata counter and correction ledger |
| 10 | rendered evidence, business-screen review, two-cycle self-review, and boundary diff |

# Scope In

- single-date and date-range picker candidates;
- autocomplete and dialog-lookup entity selectors;
- one same-file DatePicker family sheet and separate responsibility-complete
  References for variant-maintenance comparison;
- one date-range Target and one autocomplete Target;
- PoC-local verification, metrics, negative probes, and evidence records.

# Scope Out

- canonical DatePicker or Entity Selector adoption;
- timezone, locale, calendar-system, asynchronous search, DB/API, and backend
  validation behavior;
- variant schema, generator, inheritance, component runtime, or atomic catalog;
- Consumer interference reduction as a product change;
- shared-token redesign, Diagnostic Presentation redesign, Evidence Harness
  research, CLI/API/Profile freeze, MCP, Manifest/OKF migration;
- responsive, other-browser, or real assistive-technology claims;
- stage, commit, or push.

# Risks

- A custom calendar can become a date library. Limit fixtures to one fixed
  month and only the interactions needed to expose selection/focus behavior.
- A combined family sheet can save CSS lines while coupling unrelated state
  and Target adoption. Measure both source reduction and local review cost.
- Dialog lookup and autocomplete may share fixture search code, tempting a
  runtime abstraction. Keep fixed arrays and local functions; treat repeated
  code as cost evidence.
- Programmatic focus can vary in `:focus-visible`. Compare fresh same-lineage
  baselines and preserve raw evidence; do not add tolerance or count contracts.
- Explicit identities can expand rapidly in dense widgets. Record the exact
  Consumer annotations and do not turn them into a permanent requirement.

# Required Docs / Tests / Changeset

- this plan;
- noncanonical candidate and Target HTML files under one new Variant;
- a PoC-local Gate entry point and machine-readable metrics/evidence;
- result with cost/identity measurements, verification, business-screen
  review, and two-cycle self-review;
- minimum cross-PoC knowledge update only for cross-family findings;
- changeset: not applicable; no package or public API.

# Repository Evidence Plan

Repository evidence is primary: fixed HTML/CSS/JS, current browser-observed
JSON, reversible probes, source hashes, screenshots, metrics, and review
records. The existing Core and CLI remain the analysis authority.

# Supplementary Evidence Plan

Rendered screenshots support human readability, realistic copy, hierarchy,
and visible state review. They do not prove keyboard or assistive-technology
behavior; focused scenarios, DOM inspection, and bounded accessibility reports
provide the repository evidence for those claims.

# Open Questions

- Same-file Date variants reduce duplicated source and two harness roots but
  couple one-variant Target adoption; separate operation References had the
  lower total cost under the current authority boundary.
- Date selection and entity lookup both transferred as complete operation
  models, establishing the bounded cross-family result.
- The two transferred Targets needed 12 explicit identities plus two
  relational semantic observations. Reduction remains a separate experiment.
- No candidate is promoted to canonical human review by this Gate.

# Ledger Snapshot

- **Goal:** determine whether responsibility-complete composite UI is a useful
  Reference granularity between workspace and atomic controls.
- **Now:** complete with `composite-granularity-beneficial` evidence.
- **Next:** if prioritized, test Consumer identity reduction without changing
  these fixed transfer results.
- **Blockers:** none.
- **Evidence Ready?:** yes; retained browser evidence, review, negatives, and
  source metrics support the bounded result.

# Stop Conditions

Stop if the experiment requires canonical design authority, a permanent
Consumer annotation contract, Profile freeze, a large runtime/DSL/generator,
comparison-semantics changes, or another authority change.
