---
type: PoC experiment plan
title: Diagnostic Presentation Adoption Gate plan
status: active
source: fixed PoC 017 evidence and a new noncanonical integrated Target
---

# Issue

The exact-observation presentation reduced reviewer repetition for search and
form-heavy part-to-integrated reports, but it has not been exercised on a third
UI responsibility or called as an optional derived-artifact step by the Gates
that create those raw reports. Its central implementation cost is not justified
for adoption until both reuse and failure isolation are observed.

# Customer

PoC 017 Reference authors and final Gate reviewers who need a short diagnostic
view without losing complete machine evidence or changing comparison outcomes.

# Customer value

Reviewers can use one reusable, regenerateable presentation for multiple
partial-Reference responsibilities while raw JSON remains the sole authority.
Gate authors can add this view without browser reruns, Consumer requirements,
or a new failure mode for the underlying comparison.

# Acceptance criteria

1. Reuse the fixed read-only record-summary Reference and fixed common shell as
   baselines for one new noncanonical integrated Target; do not modify either.
2. Capture each baseline immediately before Target comparison with the same
   Chrome executable and retain that baseline throughout positive and negative
   comparison.
3. Apply the existing presentation utility byte-unchanged to both new noisy
   reports and to one reversible failing report.
4. Preserve exact-signature grouping, complete one-based raw indexes, source
   SHA-256, errors-first presentation, state counts, and byte-deterministic
   repeated output without Reference-specific rules.
5. Inject one focus-color defect into a temporary Target copy after baseline
   capture; raw and presentation must both fail, the error must precede
   diagnostics in the presentation, and the persistent Target must remain
   byte-identical.
6. Retain false-grouping coverage for same-path/different-value,
   same-property/different-key, same-key/different-property, and state-only
   repetition; report zero false groups for the adopted exact method.
7. Regress all previous search/form datasets through the unchanged utility.
8. Adopt only after criteria 1–7 pass. Adoption must generate optional,
   nonauthoritative JSON/Markdown after the existing raw report, use no browser,
   and never alter raw or Gate/comparison exit semantics when generation fails.
9. After adoption, verify generation and forced-failure isolation through both
   existing part-to-integrated Gate call sites without overwriting saved raw
   reports.
10. Preserve current Conformance positives and retained negatives; change no
    Reference, Consumer, CLI/Core, tolerance, raw schema, or token evidence.

# Verification method

| Criterion | Verification |
| --- | --- |
| 1–2 | Fixed hashes plus fresh baseline/Target browser bundles and recorded executable lineage. |
| 3–4 | Utility SHA guard, presentation trace audit, repeated JSON/Markdown hashes, and zero special rules. |
| 5 | Temporary Target mutation, fixed baseline hash before/after, raw/presentation exit codes, raw index trace, and Target hash guard. |
| 6 | Existing fixture tests plus exact-vs-field analysis on the new reports. |
| 7 | Regenerate presentations for all four fixed prior raw reports and compare prior semantics/counts. |
| 8–9 | Add one best-effort derived-report wrapper, call it after the two positive raw reports in each existing Gate, and test successful and forced-failure paths on disposable raw-report copies. |
| 10 | Fixed packet/tree guards, fresh Conformance, historical comparative negative, and semantic-only negative. |

# Scope in

- Fixed `common-shell.html` and fixed self-contained `detail-summary.html`.
- One new noncanonical integrated shipment-detail Target under Variant 10.
- Existing exact-observation reporter unchanged.
- One general best-effort presentation wrapper and four bounded Gate call sites.
- New browser/raw/presentation/probe/adoption evidence and result records.

# Scope out

- New canonical UI or Reference design.
- New Reference granularity, taxonomy, importance, cause inference, or compact
  index format.
- Raw schema, comparison, tolerance, diagnostic generation, Conformance,
  public CLI/API, profile, Consumer, token, MCP, responsive, other-browser, or
  real-AT changes.
- Stage, commit, or push.

# Selected reuse target

The third responsibility is a read-only shipment-exception record summary. It
already exists as the fourth token/theme specimen and has a complete native
disclosure interaction. The new Target integrates that unchanged workspace
with the unchanged common shell. It adds no workflow or canonical design and
naturally produces the other-part and integrated-geometry information this Gate
needs.

# Conditional adoption design

The raw comparison remains authoritative. A small PowerShell wrapper invokes
the fixed Node reporter into temporary derived files, promotes both files only
after successful generation, and catches every presentation failure. Existing
Gate scripts call it only after writing their passing part-to-integrated raw
reports. A missing or failing reporter emits a warning, removes no raw report,
and cannot change comparison/Gate status.

Adopted files are delete-and-regenerate artifacts under each Gate's existing
output namespace. No browser is invoked by the wrapper. The reporter and output
format remain experimental and unversioned.

# Risks

- The new integrated Target may accidentally create a new visual decision
  rather than combine approved specimens.
- Reusing the utility may reveal responsibility-specific assumptions hidden in
  path normalization or Markdown rendering.
- A best-effort hook may leave a stale derived report after failure.
- Testing adoption by rerunning old Gates would overwrite historical raw
  evidence; the Gate must instead exercise call sites against disposable raw
  copies and separately run fresh comparison regression.
- Central implementation size may still outweigh value if the third family has
  little safe repetition.

# Required docs / tests / changeset

- Plan, Variant README/Target, adoption wrapper and tests, Gate script,
  generated evidence, cost, verification, self-review, and result records.
- Minimal existing Gate hook changes only after reuse passes.
- Minimal README/cross-experiment update only for reproduced knowledge.
- No changeset because no package or external behavior is published.

# Repository evidence plan

Fixed evidence at plan time:

| Evidence | SHA-256 or tree digest |
| --- | --- |
| presentation utility | `42C28A6BD2678AB20304469F5C1A8FC8496DECB0C40D34C8D75DFEAB45E65D4C` |
| analysis utility | `914763B71A00841453CD52A9DBF794060ACC3B361F3C4120B6AD42D9D5459ED7` |
| presentation fixture tests | `2656BEDAAA1AA642E49E6C4208A82D7D844423E7CA36FAFD6D47B4D8185800C6` |
| common shell Reference | `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527` |
| record-summary Reference | `FD9DDD69570D420149A9904E5E05058423815C3AA8CA078FD5128E3206B2A9E3` |
| CLI | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Core | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| canonical Reference | `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` |
| prior Diagnostic Gate output (44 files) | `588346FE69B002478E131672CB3527A0D106B00BAA43C246C9F3CA32F1CC2E69` |
| prior Token Gate output (132 files) | `5C977C617C2A5A7B8B0163F1B53ED2FFBCC09822BDFAEEBE10341501EC110E5F` |
| partial Variant tree (4 files) | `8DC5FFBC2F0CD00D240B4C99A868F0A751EC90E6FF6D2DEF2006AE1A908D94E1` |
| form-heavy Variant tree (3 files) | `79C69C17B2D549C8132B14C414A4D9F7D73D9272B92287ED3D5092D43DB66188` |
| Consumer tree excluding dependencies (20 files) | `B2B0E11CEC5F01725CEF1A490437A8D2E4B1DC2E1CC50B2306CABA0D0569F26A` |
| partial Gate script before adoption | `D68C733C3EFC94A511AA1CB1FF2E9B436FF6662132DA0852FE8C5BD74B677B1A` |
| form-heavy Gate script before adoption | `80EEC72277BAF57D7CFAA9B0109FEF5B5A7E87FCB1FAC680509D34259D938501` |

# Supplementary evidence plan

None. Canonical visual design does not change. Browser observations and
repository reports are stronger evidence for this reporting/adoption boundary
than an additional UI screenshot review.

# Open questions

- Does the fixed utility safely reduce distinct entries in this third
  responsibility without any source change?
- Does the third family contain field-only false groups or new raw shapes?
- Can a best-effort derived hook avoid stale artifacts and preserve existing
  Gate status under forced reporter failure?
- Is the central 459-line implementation/test cost justified after a third
  responsibility and four adopted call sites?

# Ledger snapshot

- **Goal:** decide whether exact-observation presentation is reusable and safe
  for limited PoC 017 adoption.
- **Now:** target, authority, acceptance, fixed evidence, and adoption boundary
  selected.
- **Next:** create the integrated Target and run utility-unchanged reuse.
- **Blockers:** none.
- **Evidence ready?:** no; browser, negative, and adoption evidence pending.

# Stop conditions

Stop if adoption requires new design judgment, canonical/Consumer changes, raw
or comparison semantics, tolerance, scope metadata, public schema/API, or
authority reassignment.

