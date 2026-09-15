---
type: PoC Gate plan
title: Shared Token Ownership and Theme Independence Gate plan
status: active
source: fixed PoC 017 evidence and new reversible Variants
---

# Issue

The prior Gate showed that one small Reference-Library token file reduced a
real three-Reference synchronization cost. It did not establish that the same
tokens have natural ownership in a fourth responsibility or that light/dark
values can remain separate from Reference-specific component styling.

# Customer

Reference authors, reviewers, and Target implementers who need directly
readable business-application samples without inheriting a design-system
runtime or a Consumer CSS contract.

# Customer value

The Gate will show whether a thin Library-only dependency can remove repeated
theme-value edits while each Reference remains independently understandable
and locally changeable. A negative result is equally useful because it prevents
an attractive but incorrectly owned shared layer from becoming infrastructure.

# Fourth Reference selection

The new specimen is a **read-only record summary workspace** for a shipment
exception. Its responsibility is record identity, current status, key facts,
recent activity, and one native details disclosure. It is distinct from:

- application shell and navigation;
- filtering, search results, grid, and pagination;
- input, validation, correction, review, and confirmation workflow.

It adds no save/approve/navigation workflow, data layer, or custom widget. The
theme is selected by the existing `body[data-theme]` convention. Dark-state
verification uses a disposable copy rather than inventing a product theme
control for a workspace that does not own one.

# Compared candidates

1. **A — self-contained:** the three fixed References plus a new self-contained
   record summary. Each theme-aware Reference owns light and dark values.
2. **B — existing token-only boundary:** copies of all four References import
   one static Library-local stylesheet. Only canvas, surface, and focus color
   move. Selectors, focus geometry, component styles, and component/theme
   overrides remain local.

Canonical References and prior evidence are read-only. Candidate B is not a
Consumer asset and is not a canonical migration.

# Acceptance criteria and verification method

| Acceptance criterion | Repository verification |
| --- | --- |
| The fourth Reference is a small, distinct, readable business screen with no invented workflow. | Source inspection, rendered light/dark screenshots, business-screen review, and scenario inventory. |
| B reproduces A in light and dark without changing canonical observations. | CLI snapshots and zero-error verify reports for the three prior References, the fourth light state, and a disposable fourth dark state; supplementary screenshot hash/pixel evidence. |
| Canvas, surface, and focus color are classified by ownership rather than equality. | Source/usage matrix, light/dark computed observations, and correction-history trace. |
| Common theme maintenance becomes cheaper without hidden local impact. | Reversible focus-color probe changes both light and dark values; record files, locations, validations, diff paths, and byte-identical restoration. |
| A Reference-specific theme/style correction stays local. | Reversible fourth-Reference status-color probe; verify the shared stylesheet and three prior References remain hash-identical. |
| False sharing is actively rejected. | Keep a status value equal to an existing shell accent local; use the local probe and ownership analysis to demonstrate independent change reason. |
| Reference Conformance and prior negative capability remain intact. | Preflight every persistent A/B document and retain existing semantic, relational, and missing-heading negative failures. No rule change. |
| No Consumer, CLI/Core, build, package, runtime, or external communication is added. | Fixed hashes, source scans, dependency inventory, and Consumer-tree/reference scans. |
| Two self-review cycles expose over-abstraction and reporting overreach. | Persisted self-review record after the final mechanical run. |

# Scope in

- Existing token and theme ownership audit.
- One new experimental read-only workspace Reference.
- A/B static-file Variants.
- Light/dark observation and reversible common/local/false-sharing probes.
- Existing comparative and Conformance regression.
- Minimal cross-experiment knowledge update only for reproduced results.

# Scope out

- Canonical Reference migration.
- Consumer CSS/token/theme requirements.
- Shared selector/primitive reconsideration.
- Diagnostic suppression, scope metadata, or composition APIs.
- Profile, CLI API, stable-key, or file-layout freeze.
- Composite UI catalog work, Consumer-interference work, MCP, responsive,
  other-browser, or real-AT testing.
- Manifest/OKF migration and all Git stage/commit/push operations.

# Risks

- Reusing equal dark values could be mistaken for shared ownership; every token
  needs a role and change-reason argument.
- A fourth specimen could silently become a new canonical design. It remains a
  test sample and must not introduce unresolved product actions.
- A shared dark selector could imply unsupported dark completeness for the
  light-only search/form parts. Dark values will be observed only where the
  Reference owns a complete dark state; absence elsewhere is reported.
- Screenshot transitions may have byte noise. Deterministic state/computed
  observations remain authoritative, with PNGs as supplementary evidence.
- Sharing can lower edit count without lowering fan-out validation count. The
  cost record must keep those measures separate.

# Required docs / tests / changeset

- This plan, A/B Variant sources, one Gate script, generated JSON/PNG evidence,
  cost record, verification record, business-screen review, result, and two-
  cycle self-review.
- Update the experiment index and the cross-experiment boundary only for
  corroborated or explicitly unconfirmed knowledge.
- No Changeset: this is repository-local PoC documentation and tooling.

# Fixed evidence

| Evidence | Gate-start value |
| --- | --- |
| common shell | `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527` |
| search workspace | `3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B` |
| form workflow | `A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4` |
| Core | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| CLI | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Visual Synchronization packet | 197 files; `9D35977A710AF47C2AAAC1E209A33A097BA92371D5F6C173E4AB0005F7CEB99E` |

# Repository evidence plan

Repository evidence can confirm the bounded result: source ownership, direct
browser execution, computed observations, scenarios, screenshots, preflight,
negative probes, fixed hashes, and maintenance edit/restore cost are all local.

# Supplementary evidence plan

No external system is required. Decoded pixel comparison may supplement PNG
hash analysis if browser timing causes a mismatch; it cannot replace the
browser observation bundle or business-screen review.

# Open questions

- Do all three current tokens retain one ownership reason across the fourth
  responsibility, or should the shared set narrow?
- Is dark ownership confirmed only for the two theme-complete References, and
  does that limitation change the Gate status?
- Does any new value satisfy the full cross-responsibility ownership test?

# Ledger snapshot

- **Goal:** decide whether thin token ownership survives a fourth responsibility
  and theme variation.
- **Now:** A/B, probes, full regression, screen review, and two-cycle self
  review completed with `token-ownership-confirmed`.
- **Next:** human review of the bounded result; do not migrate canonical
  References automatically.
- **Blockers:** none.
- **Evidence ready?:** yes; final mechanical Gate passed with 47 browser
  invocations, zero timeouts, and zero retries.

# Stop conditions

Stop rather than adapting evidence if canonical design, a subjective product
choice, a Consumer requirement, build/package/runtime infrastructure, large
CLI/Core work, or authority reassignment becomes necessary.
