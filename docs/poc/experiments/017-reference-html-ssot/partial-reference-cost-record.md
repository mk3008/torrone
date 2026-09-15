---
type: PoC maintenance evidence
title: Partial Reference maintenance and composition cost record
status: completed
source: source audit, correction history, and disposable-copy probes
---

# Baseline comparison

| Measure | Accepted whole Reference | Two partial References | Observation |
| --- | ---: | ---: | --- |
| Files | 1 | 2 | Part discovery and shared edits now cross files. |
| Lines | 979 | 609 | 37.8% fewer across both parts. |
| Bytes | 34,889 | 27,713 | 20.6% fewer across both parts. |
| Explicit `data-ref` annotations | 27 | 21 | Six semantic observations are reused from the earlier mixed experiment; the split did not cause this reduction. |
| Total observations | 27 | 27 | Verification coverage is unchanged. |
| Scenarios | 11 | 11 | State coverage is unchanged. |
| Scenario actions | 19 | 21 | Standalone contracts add two replay steps. |
| Harness roots | 1 | 2 | Each standalone document needs one small excluded harness. |
| Per-part review surface | 979 | 354 / 255 | Local reviewers can read one responsibility. |

# Duplicate source proxy

The figures below compare unique normalized source lines or CSS declarations.
They are a maintenance proxy, not an exact duplicated-line count.

| Source kind | Shell unique | Workspace unique | Shared |
| --- | ---: | ---: | ---: |
| CSS declarations | 127 | 126 | 50 |
| Design-token declarations within shared CSS | — | — | 8 |
| JavaScript lines | 60 | 32 | 3 |
| Markup lines | 62 | 65 | 13 |

Most interaction JavaScript stays local. Base typography, surfaces, focus,
border, and theme values are the main synchronization cost. No shared CSS file
was introduced because that would make individual References depend on another
source and would turn this experiment into a file-layout decision.

# Correction history

Natural implementation corrections were local and small:

- the first search-workspace capture exposed insufficient contrast on a
  disabled pager; one color declaration was corrected in that Reference;
- initial Target comparison exposed inherited form-control typography and
  dark-theme contrast mismatches; Target-only CSS declarations were corrected;
- the shell fragment exposed a full-page h1 assumption; one general Core
  condition was corrected and guarded by a full-page negative probe.

The theme correction is the important composition cost. Separate light parts
did not by themselves guarantee a coherent dark integrated screen.

# Reversible maintenance probes

The Gate copied sources to a unique temporary directory, made the changes, and
removed the copies. Canonical inputs were unchanged.

| Probe | Whole Reference | Partial References | Result |
| --- | --- | --- | --- |
| Empty-state wording correction | 1 file, 2 locations, 979 review lines | 1 file, 2 locations, 255 review lines | Partial is cheaper for responsibility-local copy. |
| Shared light focus token | 1 file, 1 location | 2 files, 2 locations | Whole is cheaper for common design changes. |

The local copy exists once in markup and once in the small fixed-state script
in both models. Partialization did not remove that synchronization; it reduced
the unrelated review surface.

# Find and combine cost

The implementer needed to locate two plainly named files and read both complete
documents. The contracts were disjoint and their union exactly matched the
Target, so no key collision resolution, dependency order, include syntax, or
composition manifest was needed. This is a low cost for two parts, not evidence
that flat discovery remains sufficient for a large library.

Search/filter/results were easier to understand as one workflow than as
separate visual fragments. Keeping them together avoided an unwritten rule
about which part owns Search-to-Results and Clear-to-Initial transitions.

# Stable-key maintenance

The shell owns 13 observations and the workspace owns 14. There is no overlap.
Across both files, authors maintain 21 explicit annotations; six observations
come from already natural landmarks or single-controller relationships. No
composition-specific key, namespace, dependency annotation, or metadata block
was required.

The lower explicit count must not be attributed to file splitting. If the same
mixed identity boundary were applied to the whole Reference, its authoring cost
could be similar.

# Total-cost conclusion

For these two interaction-complete responsibilities, smaller local review
surface and lower combined source size outweigh the second harness and bounded
CSS duplication. The advantage reverses for shared-token changes, and
integration review remains an additional required step. The result therefore
supports selective parts, not universal splitting.

