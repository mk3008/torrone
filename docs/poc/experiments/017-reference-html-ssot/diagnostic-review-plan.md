---
type: PoC experiment plan
title: Diagnostic Review Signal / Noise Gate plan
status: active
source: fixed PoC 017 reports and a new presentation-only Variant
---

# Issue

Part-to-integrated comparisons preserve correct pass/fail behavior but expose
hundreds of repeated informational differences. A reviewer must scan raw
machine evidence to discover whether any actionable error is present. Removing
or suppressing diagnostics would weaken the evidence and is not acceptable.

# Customer

Reference Library authors and final Gate reviewers who need to decide whether
an integrated Target preserves an accepted partial Reference.

# Customer value

A reviewer can see distinct actionable information first, understand repeated
diagnostics without reading every occurrence, and trace every presentation
entry back to the unchanged complete report.

# Acceptance criteria

1. Collect current raw diagnostics directly from both search and form-heavy
   part-to-integrated evidence; do not assume historical totals.
2. Preserve every raw difference, raw report byte, comparison status,
   error count, diagnostic count, and pass/fail exit behavior.
3. Compare raw presentation with at least one deterministic grouped
   presentation derived only from existing report fields.
4. Do not infer diagnostic cause. Distinct key, property, expected value, or
   actual value must not be merged by the selected presentation.
5. Every grouped entry must contain complete one-based raw difference indexes
   and a source-report SHA-256.
6. A reversible focus-color defect injected into a noisy search workspace must
   remain a comparison error, appear first in the reviewer presentation, remain
   in the full raw report, and leave the fixed Target byte-identical afterward.
7. Presentation output must be byte-deterministic on a repeated run.
8. Current Conformance positives pass and retained Conformance negatives fail.
9. CLI/Core comparison code, References, Targets, Consumers, token ownership,
   geometry tolerance, and existing raw reports remain unchanged.

# Verification method

| Criterion | Verification |
| --- | --- |
| 1, 3 | Parse the four saved raw reports and write per-comparison classification and candidate metrics. |
| 2, 9 | Guard fixed file/tree hashes before and after; compare generated presentation status/counts with its source report. |
| 4 | Test same-key/different-property, same-property/different-key, and same-path/different-value fixtures; audit heterogeneous field-only groups. |
| 5 | Reconstruct every grouped occurrence from the indexed raw differences and require exact signature equality. |
| 6 | Copy the fixed Target to a temporary directory, change one light focus value, run unchanged CLI, present the failing report, then delete the copy and recheck hashes. |
| 7 | Generate every presentation twice and require byte-identical SHA-256. |
| 8 | Run positive preflight on shell/search/form and the three established negative Conformance probes. |

# Scope in

- Four saved passing reports: search shell/workspace and form shell/workflow.
- A new reporting-layer script that reads but never rewrites a complete report.
- Raw, exact-value, and field-only presentation cost comparison.
- One new disposable injected-defect report under this Gate's output.
- Repository-visible JSON/Markdown summaries, verification, cost, self-review,
  and result records.

# Scope out

- Raw diagnostic generation or comparison changes.
- Severity, tolerance, observation, scenario, identity, or Conformance changes.
- Scope/dependency metadata, suppression, allowlists, Target metadata, or
  Reference-specific rules.
- Reference, Target, Consumer, token, Profile, Manifest, MCP, responsive,
  other-browser, or real-AT work.
- Stage, commit, or push.

# Candidate presentations

- **A — raw:** one reviewer entry per complete difference.
- **B — exact observation signature:** severity/kind + state-independent path +
  canonical expected value + canonical actual value. Retain count, every state,
  every one-based raw index, and the source hash. Errors are listed before
  information; diagnostics use deterministic lexical order.
- **C — field-only:** kind + state-independent path. This is smaller but is
  rejected if one group contains multiple value pairs because the report
  cannot prove they have one cause.

The terms `extra-element`, `geometry`, and `other` describe raw diagnostic
shape only. They are not inferred root causes or importance levels.

# Risks

- Grouping by a plausible cause would exceed the raw evidence.
- A short summary could become a second incomplete evidence source.
- Sorting diagnostics by guessed importance could encode an undocumented human
  rule.
- Grouping errors too aggressively could hide a distinct injected failure.
- Harness timing could make a disposable browser run unreliable.

# Required docs / tests / changeset

- New plan, presentation candidate README, presentation script, deterministic
  fixture tests, Gate verification script, generated evidence, cost record,
  verification record, two-cycle self-review, and result.
- Minimal README and cross-experiment knowledge updates only if the result is
  reproduced across both noisy Gates.
- No changeset: this is a local PoC and no package is published.

# Repository evidence plan

The four fixed raw reports, generated reviewer presentations, trace audit,
candidate comparison, false-grouping fixtures, injected-defect report,
Conformance reports, hash guards, and harness log are repository evidence.

Fixed evidence at plan time:

| Evidence | SHA-256 or tree digest |
| --- | --- |
| CLI | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Core | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| canonical Reference | `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` |
| search shell report | `833DB640FC2C4AA6E4D8D16EC3F7298D4EE686AF38213B7F4E776C35A5A8E720` |
| search workspace report | `71C6B4BBB7A2E1D41651AC75F61938923DAADFBD982191B5A2C4AA6E2F0A6ADE` |
| form shell report | `E7A975CE96552851FD5D69DB5B4B3F880CD0C7AC7CA135A35558A11CB5E47213` |
| form workflow report | `D208532EFB4D812AB2AFA0897C39A2DEA085D8B67D95D4CC85559C98014F5923` |
| partial Variant tree (4 files) | `8DC5FFBC2F0CD00D240B4C99A868F0A751EC90E6FF6D2DEF2006AE1A908D94E1` |
| form-heavy Variant tree (3 files) | `79C69C17B2D549C8132B14C414A4D9F7D73D9272B92287ED3D5092D43DB66188` |
| Consumer tree excluding dependencies (20 files) | `B2B0E11CEC5F01725CEF1A490437A8D2E4B1DC2E1CC50B2306CABA0D0569F26A` |

# Supplementary evidence plan

None is required. This Gate changes no canonical visual design. Browser
screenshots or another human UI review would not prove diagnostic traceability
better than the report indexes and hashes.

# Open questions

- Does exact-value grouping materially reduce reviewer entries in both noisy
  comparison families?
- Does field-only grouping merge value-distinct observations in real data?
- Can an error introduced only in a late focus state be reached sooner without
  giving diagnostics guessed importance?
- Is a standalone reporting script simpler than changing the comparison CLI?

# Ledger snapshot

- **Goal:** reduce reviewer information volume without reducing machine
  evidence or changing comparison semantics.
- **Now:** presentation candidates, negative probe, full regression,
  Conformance, deterministic trace audit, and two-cycle self-review completed
  with `diagnostic-presentation-beneficial`.
- **Next:** reviewer handoff; do not freeze or integrate the report format
  automatically.
- **Blockers:** none.
- **Evidence ready?:** yes; the authoritative Gate passed with 18 browser
  invocations, zero timeouts, and zero retries.

# Stop conditions

Stop rather than adapting the evidence if the result requires scope metadata,
importance judgment, comparison semantics changes, Reference/Consumer edits,
new authority, or a large CLI/Core redesign.
