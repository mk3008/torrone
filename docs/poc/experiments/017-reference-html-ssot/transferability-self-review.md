---
type: Two-cycle self review
title: Current Reference transferability gate self review
status: complete after final verification
source: post-implementation evidence review
---

# Cycle 1: Coarse Defect Extraction

## Potential Blockers

| Finding | Resolution |
| --- | --- |
| A zero-error Target screenshot showed the filled reporter value disappearing after React submit. The Core did not capture form values. | Changed the controlled Target field to handle the native input event used by the CLI, visually retained the value, and recorded form value as an important current comparison gap. |
| Replacing raw `aria-controls` ID equality with relationship presence allowed a controller to point to the wrong existing element. | Added stable-key relationship observation to the Core. The Gate now creates a new Reference snapshot and compares relationship targets. Old baselines remain backward compatible and unchanged. |
| The Reference fill value `policy` forced Target product vocabulary/location to match the Reference scenario. | Removed the Target workaround. Added a general fill-value-only override file outside product UI; it cannot alter actions, targets, states, styles, or comparison rules. Target uses native `Routing holds`. |
| CSS source independence could not be inferred from a computed-style pass. | Added import/path scans, source hashes, selector-set evidence, and a Target-only style mutation. |

All four blockers were resolved without changing the approved Reference or
weakening the required state/style failures.

## Potential Non-Blockers

- The final pass retains 24 geometry diagnostics, normalized to three paths and
  one approximately 5.2 px vertical offset repeated across states. Geometry is
  explicitly diagnostic and visual composition was reviewed.
- One browser startup attempt timed out at `Page.enable`; the next run and the
  complete scripted Gate passed. This remains a CLI stability observation, not
  evidence of Target mismatch.
- Three key names contain Reference business nouns. They match content-different
  elements successfully but remain naming debt.
- The product-external override file adds one maintenance point. It replaces
  only a fixture input value and does not duplicate expected outcomes.

## Evidence Weaknesses

- One independently authored Target is not enough to freeze a profile or prove
  repeatability across independent AI runs.
- Source hashes/selectors and manual organization review strongly support CSS
  independence but cannot mathematically prove author intent.
- Cell-level link/sticky/value discipline, pagination composition, relative
  placement, and form values are not direct CLI gates.
- Chrome at one desktop viewport remains the only runtime environment.

## Claim Overreach

The report uses `meets` only for this bounded Gate. It does not claim universal
framework independence, complete accessibility, pixel identity, responsive
support, canonical keys, frozen scenario overrides, or readiness for MCP/
Manifest replacement.

# Cycle 2: Blocker Triage And Shape Check

## Merge Blockers

None for the bounded experiment after relationship-target and form-value fixes.
The final scripted Gate passed after both fixes and this review were added; its
result is recorded in `transferability-verification-record.md`.

## Non-Blockers

- Geometry diagnostics are reviewer information, not suppressed failures.
- The one observed browser-start timeout is reported rather than hidden.
- Current stable-key names and count are audited, not normalized or frozen.
- Scenario override syntax is experimental and narrowly constrained.

## Evidence Shape Status

`pass` — repository evidence contains the fixed-input hash, Target source and
lockfile, gate/current/historical JSON, screenshots, source-independence record,
style negative, stable-key audit, correction ledger, and one reproducible Gate
command. Supplementary visual evidence is separated from mechanical proof.

## Reporting Shape Status

`pass` — the result leads with capability gained, separates shared observable
design from independent source, classifies comparison exclusions and gaps, and
keeps next-phase uncertainty visible.

## Required Questions

- **Which criteria are proven?** Fixed Reference, different business content,
  independent React/component/reducer/DOM/CSS source, full current scenario
  pass, zero bounded errors, harness absence, negative style detection, no
  fixture leak, and preserved old regression.
- **Which are partial?** General transferability beyond one Target, semantic-key
  reduction, complete a11y, CLI startup stability, and machine coverage of
  unkeyed grid/pagination/form-value facts.
- **What still depends on human acceptance?** Business realism, hierarchy,
  sticky-column/link/cell discipline, pagination composition, and whether the
  approximately 5.2 px geometry offset is acceptable. These were reviewed for
  this Target but remain human gates generally.
- **What wording would mislead?** “Profile validated,” “all 27 keys required,”
  “CSS implementation independent in general,” “full accessibility compared,”
  or “ready for MCP/Manifest replacement.” None is used as a completion claim.

## Ready For PR?

`yes` as an uncommitted experimental Gate packet with status `meets`. `no` for
profile/API freeze, MCP implementation, large partial-Reference migration, or
Manifest replacement.
