---
type: PoC experiment result
title: Reference Visual Rule Synchronization Gate result
status: token-sharing-only
source: fixed References, A/B/C Variants, browser regression, reversible probes, and two-cycle self review
---

# Attainment status

- **Gate status:** `token-sharing-only`
- **Workflow attainment:** `done`
- **Decision scope:** experimental Reference-Library-internal authoring only;
  no canonical migration, Profile/API freeze, or Consumer distribution.

# Outcome

A thin, static token file reduced the demonstrated common-change edit cost from
three Reference files/locations to one while preserving direct browser use,
local-change isolation, canonical observations, and Reference Conformance.

The broader visual-primitive candidate did not improve either maintenance
probe beyond token-only sharing. It hid selector scope and applied a union of
element types to every Reference, creating future coupling for four fewer
declaration occurrences. It is retained as rejected evidence.

# Compared and selected approaches

| Approach | Decision | Reason |
| --- | --- | --- |
| A — self-contained | Retain as a boundary, not the preferred answer to recurring global tokens | Best one-file readability; common token correction requires three independent edits and restores. |
| B — shared tokens only | Recommend experimentally inside the Reference Library | One five-line relative CSS dependency; common edit is one location; selectors/component rules remain visible and local. |
| C — shared visual primitives | Reject for this evidence | Same file/import and validation cost as B; no probe improvement; selector union increases hidden scope and coupling. |

# Shared meaning boundary

B contains only canvas, surface, and focus color. These are exact across the
three References and have a common application-level change reason supported by
prior surface/focus synchronization records. It does not share similar-but-
different text/border/muted values, responsibility-specific accent/danger
values, typography, layout, theme overrides, selectors, focus geometry, or
component styling.

This boundary is not a rule that any three matching values must be shared. A
value needs both common ownership and recurring maintenance evidence.

# Maintenance cost

- **Common focus-color probe:** A = 3 files/3 locations/3 validations; B and C
  = 1 file/1 location/3 validations. Restore writes were 3 versus 1.
- **Form-local danger probe:** every approach = 1 file/1 location/1 negative
  validation/1 restore; shared-layer edits = 0.
- **Per-Reference understanding:** A = 1 file; B/C = HTML plus one small CSS
  file. All open directly in a browser; none needs a build or runtime.
- **Static declarations:** A 510, B 504, C 500. The selection is based on edit,
  scope, and coupling cost, not these reductions.

# Canonical and Conformance evidence

- Six B/C-to-A comparisons passed with zero errors and zero geometry/extra
  diagnostics across state, computed style, focus, interaction, and bounded
  accessibility.
- Three repeated A observation bundles were byte-identical.
- Final screenshots were byte-identical for 65 of 68 candidate frames. The
  remaining interaction frames differed by at most four pixels and one color-
  channel level; repeated runs moved the noise, while computed observations
  remained exact.
- All nine A/B/C References passed current preflight; three established
  Conformance negatives continued to fail.
- Console errors, action errors, external requests, and failed requests: 0.
- Fixed Conformance packet: 62 files and unchanged aggregate digest.

# Tooling and responsibility boundary

CLI/Core changes, thresholds, Conformance rules, dependencies, packages, build
steps, and runtime additions were all zero. The shared CSS is a Reference
Library authoring asset only. Consumer Frontends continue to own their DOM,
components, state, CSS, architecture, and framework, and receive zero new
requirements.

# Problems found and corrected

The first B draft invented focus-width/offset tokens. Self-review removed them.
The first screenshot check overclaimed byte-hash determinism and then tempted a
filename allowlist. It was replaced by complete supplemental recording plus
exact deterministic observation-bundle checks; no CLI exception was added.

C exposed a more important design risk: a currently equal selector is not a
safe shared primitive when each Reference owns a different applicable element
set. No metadata or Reference-specific shared selector was introduced to hide
that problem.

# Diagnostic noise

This like-for-like Variant comparison emitted zero information diagnostics. It
does not change or resolve the established 381-item search composition and
439-item form composition noise. That work remains separate.

# Long-lived knowledge promoted

The cross-experiment note now records only the reproducible boundary:

- share Library-internal visual values only when they have common ownership and
  a common change reason, not merely equal output;
- a very small static token dependency can reduce common-edit synchronization
  while selectors and component rules stay local;
- primitive sharing is not beneficial when it broadens hidden element scope
  without reducing demonstrated maintenance work;
- Reference-Library sharing never implies Consumer CSS/token distribution.

Concrete values, selectors, hashes, and probe counts remain in this Gate.

# Human judgment and next phase

No new human design judgment is required for this bounded Gate. Applying B to
approved canonical References would be a separate Library migration decision
and was not authorized here.

Preserve all three candidates. Exercise the token-only boundary on one future,
responsibility-distinct Reference before considering canonical refactoring,
file-layout freeze, a package, or broader primitives. Specifically observe
whether a fourth Reference shares ownership rather than just values, and whether
dark/theme evolution remains local. Do not proceed automatically to MCP,
Consumer distribution, Profile/API freeze, or diagnostic suppression.

