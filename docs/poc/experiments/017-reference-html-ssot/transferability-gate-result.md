---
type: PoC gate result
title: Current Reference transferability gate result
status: meets
source: repository verification and rendered human review
---

# Goal

Determine whether the approved current Reference can guide a business-content-
different Target whose DOM, React components, reducer state, and CSS source are
independent, while the shared CLI/Core compares observable UI design.

# Attainment Status

- **Gate status:** `meets`
- **Workflow attainment:** `done`

The result meets the requested bounded Gate. It does not freeze a Reference
Profile, stable-key vocabulary, CLI API, file layout, or Manifest migration.

# Outcome

A new `Shipment exception queue` Target passes the approved Reference with zero
errors across 27 stable keys, 11 scenarios, and 19 actions. It uses different
business content, four Target-owned React components, reducer-managed state,
different DOM/class organization, and one independently authored layered CSS
file. The approved Reference file was not changed.

# Why It Matters

The prior React run could not separate framework independence from shared CSS.
This Gate shows that matching the observed state/style/focus/interaction result
does not require importing or copying the Reference or vanilla CSS source. It
also shows where the current CLI still couples to implementation or fixture
vocabulary, allowing those limits to be corrected or recorded before broader
adoption.

# What the Target shares

- The 27 stable matching keys and the observable semantics/state/style
  responsibilities attached to them.
- The same 11 scenario intents: shell, navigation, filters, theme, user menu,
  and three result states.
- Browser-observed values needed to reproduce the approved visual treatment.
- Existing React/Vite dependency versions already present in PoC 017.

# What the Target keeps independent

- Shipment/logistics business nouns, all `SX-*` fixtures, facilities, carriers,
  issues, status terms, user identity, and visible recovery copy.
- DOM grouping and class names.
- Four React components and `useReducer` state/actions.
- CSS selectors, token names, cascade layers, file, source hash, and build asset.
- Local ARIA target IDs.
- Product UI: no Reference scenario selector or visible verification control.

# CSS independence evidence

- Target imports only `./target.css`; prohibited Reference/old-Target paths and
  CSS `@import` references: `0`.
- Target CSS SHA-256 is
  `EE0F56102A9BBBC06DFC29F6219B86E35BCEE8F815DF22ECE1A75A4709208D0A`,
  distinct from Reference inline CSS and old vanilla CSS.
- Target has 94 unique selector expressions. Exact selector overlap is 10 with
  Reference and 8 with old vanilla, limited to generic HTML selectors such as
  `:root`, `body`, `button`, `table`, `th`, and row/cell selectors.
- A temporary Target-only `border-radius: 0 !important` mutation produced the
  single normalized signature
  `elements.filter-toggle.styles.borderRadius` across 20 states.

# Comparison disposition

## Must and did match

Keyed tag/role/visibility, ARIA/native state, selected computed styles, active
focus, interaction outcomes, bounded accessibility risks, local-only network,
and zero console/action errors.

## Must differ or stay out of comparison

Business copy and fixture values; product names; accessible-name literals;
component/reducer/DOM/class structure; CSS source organization; Target source
digest. Exact geometry remains diagnostic because content and the Reference-
only selector can change absolute positions without changing the design.

## Important but not directly expressible today

All-row link coverage, sticky first grid column, one-value-per-cell discipline,
pagination child composition, relative primary-action placement, and full
heading/landmark/AX-role equality. They were checked in source/rendered evidence,
not promoted to new Target-specific CLI gates.

# Stable-key result

All 27 keys were operationally used in explicit mode: 11 scenario targets and
16 comparison-only points. Nine have plausible semantic substitutes, but the
current Core would drop them entirely if their key were removed. Three names
retain Reference business nouns and are naming debt. No key was removed or
frozen; the complete audit is in `transferability-stable-key-audit.md`.

# Reference usefulness and gaps

## Helpful

- Executable Initial/Results/Empty states and action sequences.
- Browser-computed styles instead of a hand-maintained expected-value mirror.
- Stable cross-content identity for otherwise ambiguous/unroled elements.
- Rendered evidence for hierarchy, density, scrolling, grid, action, and
  pagination judgment.

## Excess or implementation-coupled

- Raw `aria-controls` ID strings were incorrectly compared; the Core now
  compares stable-key relationship targets while allowing Target-local ID
  spelling to differ. Broken local targets still fail bounded a11y checks.
- Repeated absolute geometry diagnostics report one content/harness-derived
  vertical offset but are not actionable errors.
- Some key names expose Reference nouns even though visible content does not.

## Missing and requiring judgment

- Content-independent scenario input values.
- Cell/link/sticky-column and pagination-composition gates.
- CSS source independence evidence, which required source-level checks in
  addition to browser output.

# Target correction cost

The implementation converged in four primary comparison runs: 109 errors/12
signatures, 9/7, 2/2, then 0/0. Post-pass visual review and the strengthened
relationship gate each caused one additional general correction and full
rerun. CLI signatures directed corrections to IDREF comparison, CSS layer
specificity, React native-input handling, and fixture-independent scenario
input. Product source totals 307 JSX and 409 CSS lines. The Reference required
zero changed files and stayed at its approved SHA-256.

# New problems found

1. Raw ARIA IDREF comparison couples equivalent DOM implementations.
2. Literal Reference fill values can leak fixture vocabulary into a Target.
3. The CLI's intermittent browser-start timeout still occurred once before a
   successful retry; the prior request-registration fix reduced but did not
   eliminate all environmental startup instability.
4. Current comparison does not capture form-control values; a post-pass visual
   review caught a React-controlled search value disappearing after submit.
5. Current comparison does not directly gate several approved grid/pagination
   composition facts.
6. Source independence is outside browser equivalence and needs explicit source
   provenance evidence.

# Actions Taken

- Added the independent React/CSS Target and product-external scenario override.
- Changed CLI IDREF comparison generally and added fill-value-only scenario
  overrides; neither feature can alter expected state/style or action targets.
- Added a reproducible Gate script, style mutation, source/leakage checks,
  stable-key audit, correction ledger, screen review, and evidence records.
- Reran the complete prior regression without weakening negative signatures.

# Code Changes

- `consumers/transferability-gate-react/`: new Target.
- `core/browser-core.js`: stable-key relationship-target observation.
- `cli/reference-ui.mjs`: implementation-independent IDREF comparison,
  structured-value comparison, and fill-value overrides.
- `cli/README.md`: override boundary documentation.
- `verify-transferability-gate.ps1`: fixed-input and full Gate verification.
- Gate reports and documentation under the existing experiment directory.
- `reference/index.html`: unchanged.

# Verification Methods

- Clean npm install and Vite production build.
- CLI initial snapshot and full verify against the approved browser snapshot.
- Exact source/path/leakage/external-reference scans.
- CSS hashes and selector-set comparison.
- Temporary independent CSS mutation with required CLI failure.
- Existing complete `verify.ps1` regression.
- Direct screenshot inspection and business-screen review.

# Repository Evidence

- `output/transferability-gate/target.report.json`
- `output/transferability-gate/target.snapshot.json`
- `output/transferability-gate/style-negative.report.json`
- `output/transferability-gate/source-independence.json`
- `transferability-verification-record.md`
- `transferability-stable-key-audit.md`
- `transferability-correction-record.md`

# Supplementary Evidence

Rendered Initial, Results, Empty, Dark, navigation, and user-menu screenshots
under `output/transferability-gate/target/` were visually inspected. This
supports realism and hierarchy but is not used to overclaim real AT or
responsive behavior.

# Review Triage

- **Blockers:** None for the bounded transferability Gate.
- **Non-blockers:** 24 repeated geometry diagnostics; one observed CLI startup
  timeout; Reference-noun key names; cell-level facts retained in human/source
  review.
- **Human dependence:** The Target realism/copy gate and visible composition
  were reviewed, but no new design choice or Reference change was required.

# Now / Next

- **Now:** Current-Reference transfer with independent content, implementation
  structure, state, and CSS is proven for one Target.
- **Next:** Choose a small follow-up that tests either mixed semantic/key
  matching or reusable partial References. Do not combine that with profile/API
  freeze or Manifest migration.

# Open Questions / Next-Phase Carryover

- Can mixed semantic/key capture reduce low-value keys without unstable
  content matching?
- Should scenario value overrides remain a CLI file option or move into a
  future thin orchestration layer? Do not freeze yet.
- Which grid/pagination composition facts justify general machine observation
  after another failure example?
- Does a second independently authored Target reproduce the same result without
  implementation hints from this run?
- Can partial References lower correction cost while preserving executable
  state and visual review?
- Responsive, other-browser, real-AT, MCP, file-layout, second Reference,
  profile/API freeze, and Manifest replacement remain out of scope.
