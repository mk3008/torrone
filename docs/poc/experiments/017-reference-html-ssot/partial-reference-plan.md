---
type: PoC gate plan and ledger
title: Partial Reference maintenance and composition Gate
status: completed; partial-reference-beneficial
source: accepted PoC 017 evidence and cross-PoC guidance
---

# Issue

The accepted integrated Reference is reviewable and locally correctable, but it
does not show whether reusable design responsibilities should be kept as smaller
executable References. Premature splitting could duplicate shell, theme, CSS,
fixtures, and harness code or require a composition runtime, while a useful
boundary could let reviewers and Target implementers read only the design area
they need.

# Customer

Reference authors, human reviewers, and AI implementers deciding whether a
small partial-Reference library lowers the total cost of creating, reviewing,
correcting, and transferring business-application UI design.

# Customer Value

An implementer can consult a bounded shell/navigation Reference and a bounded
search-workspace Reference, then build one coherent new screen without a new
whole-screen Reference, source-code composition, or a second application
runtime. Reviewers can correct one responsibility without rereading unrelated
screen behavior when the boundary is genuinely independent.

# Candidate boundaries

1. **Common shell and navigation.** Header controls, navigation disclosure,
   navigation filtering/selection, theme, and account menu form one visible and
   interaction-coupled responsibility. A clearly excluded content placeholder
   is the minimum standalone review harness.
2. **Search workspace.** Filter disclosure, Search/Clear, Initial/Results/Empty,
   result grid, pagination, and primary result action stay together because the
   actions and three result states are one observable workflow.

The experiment intentionally does not split filters from result states. Doing
so would put one interaction contract across two References and would require
either duplicated state description or an early composition rule.

# Acceptance Criteria

1. Two partial References are independently openable, understandable, and
   interactive with fixed local fixtures and no external request or build.
2. Harness-only content is marked and excluded from product observation.
3. One content-, fixture-, class-, local-ID-, and grouping-different Target uses
   both References without importing or concatenating their source.
4. The unchanged CLI/Core verifies the Target separately against both partial
   observation contracts, including state, style, focus, bounded accessibility,
   and interaction.
5. The final page is visually coherent as one business screen and has no
   explanatory Reference UI.
6. Source metrics compare the accepted whole Reference with the two partials:
   files, lines/bytes, explicit metadata, scenarios/actions, duplicated
   declarations/code, review surface, and synchronization points.
7. At least one local correction and one cross-part design-token maintenance
   probe have measured file/location cost. Artificial probes remain reversible
   and do not change canonical design.
8. No include syntax, template engine, component runtime, dependency graph,
   framework, package, Core heuristic, or CLI composition feature is added.
9. Accepted Reference, Core/CLI, Transferability/Mixed/Relational evidence, and
   existing negatives remain fixed.
10. The result is classified as `partial-reference-beneficial`, `no-benefit`,
    `partial`, or `blocked` from total cost rather than file count alone.

# Verification Method

| Criterion | Verification |
| --- | --- |
| 1–2 | Direct browser snapshots, scenario replay, source/network scan, harness-boundary assertions, rendered review. |
| 3 | Target leakage/import/class/ID scans and direct source inspection. |
| 4 | Two independent CLI baselines and two Target verify reports; exact expected key inventories and interaction outcomes. |
| 5 | Business-screen review of partials and integrated Target at the acceptance viewport. |
| 6–7 | Generated source/cost metrics plus disposable-copy maintenance probes; no accepted input edit. |
| 8 | File/dependency scan and fixed Core/CLI hashes. |
| 9 | Fixed hashes and deterministic aggregate packet digests before/after. |
| 10 | Evidence-backed result, verification record, two-cycle self review, and explicit uncertainty. |

# Scope In

- `variants/04-partial-reference/references/common-shell.html`
- `variants/04-partial-reference/references/search-workspace.html`
- `variants/04-partial-reference/target/index.html`
- Separate `output/partial-reference/` evidence.
- One Gate script and bounded result/cost/review records.
- Minimal update to cross-PoC knowledge only if evidence corroborates a durable
  boundary.

# Scope Out

- Accepted Reference edits or migration.
- A catalog beyond the two candidates.
- Filters/results split, form-heavy second Reference, responsive/other browser,
  real AT, Reference Profile/key/CLI API freeze, conformance CLI, MCP, Manifest
  replacement, stage, commit, or push.

# Risks

- Standalone References may duplicate base/theme CSS and make common changes
  more expensive than the whole-file baseline.
- A placeholder or scenario selector may leak into product observation.
- Independent partial baselines may produce noisy extra-element diagnostics
  when verified against one integrated Target.
- A visually coherent Target may depend on unwritten spacing decisions between
  parts, exposing a composition gap.
- Reusing stable keys across two contracts may create accidental collision or
  scenario interference.
- DevTools startup instability may affect evidence collection independently of
  the design result.

# Required Docs / Tests / Changeset

- Plan/ledger, reproducible Gate script, output metrics/reports/screenshots,
  maintenance-cost record, business-screen review, verification record,
  two-cycle self review, and final result.
- No Changeset: this is a docs-first experimental artifact and no package is
  published.

# Repository Evidence Plan

Use fixed hashes/digests, source scans, exact observation inventories,
deterministic browser capture, separate partial-to-Target verification,
reversible maintenance probes, and stored JSON/PNG artifacts. These can prove
source independence, interaction/state/style comparison, bounded accessibility,
duplication, and changed-file cost.

# Supplementary Evidence Plan

Rendered screenshots are required to judge whether each part is independently
reviewable and whether the Target reads as one coherent business screen.
Screenshots cannot prove keyboard or assistive-technology behavior; browser
state and focused checks provide that bounded evidence. Final product usefulness
still depends on human acceptance.

# Fixed evidence

- Accepted Reference SHA-256:
  `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056`
- Pre-experiment Core SHA-256:
  `D382601184DED6D351D2BBF5B6213013791AD4A59E0E9DB853B9E68754B59A76`
- CLI SHA-256:
  `7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837`
- Transferability packet digest:
  `96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF`
- Mixed packet digest:
  `819FBCD6FA157E033E72A3E45FF7ACD5A9CDA51C7DC5730066CB357643010658`
- Fixed Relational Gate packet: 39 files, digest
  `6FB20902AC306081B66B0170E99DF1DE786A7FA16E66380EE264A62BC24ED17E`.
  Living PoC indexes/knowledge are intentionally outside this fixed packet so
  this Phase can append corroborated guidance without rewriting prior evidence.

The shell fragment reproduced one whole-document assumption in bounded a11y:
an observed fragment with no product `main` was incorrectly required to contain
one `h1`. A one-condition Core change now scopes the h1-count check to inputs
that contain an observed product `main`; the missing-h1 full-page probe and
accepted full Reference preserve the old behavior. Post-change Core SHA-256 is
`14BB52C2C60B9DA9A27B7593C772B09E18A2DA2A79AD7C129827330C0D4077EA`.

# Open Questions

- Does the smaller review surface outweigh duplicated base/theme declarations?
- Can two independent CLI baselines remain useful despite integrated-Target
  extra-element diagnostics?
- Does search/filter/results need to remain one partial boundary?
- Is a common style dependency ever justified, or is duplication cheaper at
  this scale?
- Does the Target need any composition-specific instruction beyond reading two
  References and the screen request?

# Outcome against the plan

The Gate met the product outcome with two independently executable parts and
one integrated Target. No source/runtime composition mechanism was needed.
Combined source and responsibility-local review surface decreased, while shared
token synchronization and integrated theme review became explicit costs.

Acceptance Criteria 8 and 9 intentionally recorded Core as fixed. The shell
fragment then exposed a general whole-document h1 assumption. Following the
user's allowed minimal-Core-change boundary, the Gate made one conditional
change rather than adding fake product content to the Reference. A full-page
missing-h1 probe and accepted-Reference regression preserve the original rule.
CLI, accepted Reference, and prior evidence packets remained fixed.

# Ledger Snapshot

- **Goal:** Determine whether two executable partial References lower total
  maintenance cost and compose through AI interpretation without new runtime.
- **Now:** Gate completed as `partial-reference-beneficial`; two part contracts
  pass against the integrated Target and fixed negatives remain effective.
- **Next:** Reuse these boundaries only when a real screen need arises; measure
  repeated synchronization and diagnostic-noise cost before adding tooling.
- **Blockers:** None for this bounded Gate.
- **Evidence Ready?:** Yes; source metrics, browser reports, screenshots,
  reversible probes, review, and self-review are recorded.
