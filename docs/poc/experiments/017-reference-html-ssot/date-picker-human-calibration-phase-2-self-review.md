# DatePicker Human Calibration Phase 2 two-cycle self-review

## Outcome

`done` — two mandatory review cycles found one evidence-shape defect and no
remaining implementation or reporting blocker. The empty leakage result is now
serialized as `[]` rather than `null`, and the final Gate was regenerated at
`output/date-picker-human-calibration-phase-2/20260814T070736Z/`.

## Cycle 1 — coarse defect extraction

### Potential blockers

1. **A local-ID-independent Target initially could not pass
   `aria-describedby` comparison.** The approved Reference's unkeyed hint and
   keyboard-help relationships were recorded as literal Reference IDs. Reusing
   those IDs in the Target would have contradicted the transfer condition.
   The dedicated different-ID control and hidden/missing negatives justified
   the small general Core correction. All current regressions pass.
2. **Leakage evidence serialized an empty result as `null`.** The verifier did
   reject any leak, so behavior was correct, but `null` made “measured zero”
   less explicit to a reviewer. The summary now emits an empty array and the
   Gate was rerun.

Both potential blockers are resolved.

### Potential non-blockers

- The old DatePicker verifiers stop at their historical Core hash. That is
  correct provenance behavior, not a UI regression. Phase 2 reruns the same
  DatePicker sources with the current Core in a new output boundary.
- The first full maintenance invocation exceeded the caller timeout and left
  one owned child process in a Chrome/CDP preflight. The exact process and
  temporary root were cleaned up. The retained full rerun passed 99 browser
  attempts without timeout or retry.
- Final Target comparison retains 105 geometry/extra-element diagnostics.
  Geometry is intentionally informational across different product copy and
  workspace grouping; no comparison error is hidden.

### Evidence weaknesses

- The Core does not directly compare the live DOM `value` of the editable date
  inputs. Normalization, validation, selection announcement, visible state, and
  screenshots provide bounded evidence, but direct value comparison remains a
  separate candidate.
- Exact field/popup geometry, weekend colors on every unkeyed day, locale,
  timezone, responsive collision behavior, and real AT output remain outside
  automatic proof.
- The unkeyed description normalization checks target shape and visibility,
  not semantic equivalence of different product wording.

### Claim overreach check

The result does not claim a universal open-ended Date range, a universal
one-click completion model, a DatePicker component specification, production
date validation, Profile/API freeze, or removal of future human review. It
claims only that the approved observation transfers and that its reusable
self-review prompts can reduce review frequency for closely related drafts.

## Cycle 2 — blocker triage and evidence shape

### Merge blockers

None.

### Non-blockers

- Thirteen additional explicit identities and fifteen fixture overrides are a
  real Consumer/evidence cost. They are reported rather than optimized away.
- The one-file approved Reference grew from 107 to 642 lines. This is evidence
  of a custom-control complexity risk, not authorization to split files or add
  a framework.
- Responsive, other-browser product equivalence, and real AT remain
  `UNCONFIRMED` and outside the Gate.

### Evidence shape status

`pass`.

- Repository evidence contains the immutable Reference hash, preserved
  pre-followup failure, final pass, negative reports, source-independence audit,
  historical-tree digests, current DatePicker regressions, and the full current
  Evidence Harness run.
- Screenshots are supplementary evidence for visual hierarchy, state
  distinction, density, and copy. Keyboard/focus/a11y/network claims come from
  browser reports rather than screenshots.
- Historical and current evidence use separate output directories. No old
  output or verifier was relabeled as fresh.

### Reporting shape status

`pass`.

The result leads with capability gained, separates product decisions from
reusable observations, records the Core change and Consumer cost, and keeps
remaining uncertainty visible. It does not turn the human's accepted
DatePicker choices into long-lived universal guidance.

### Required questions

- **Which criteria are proven?** Approved Reference preservation, pre-followup
  detection, independent Target follow-up, final state/style/focus/interaction/
  bounded-a11y comparison, negative detection, fixture/CSS/DOM/local-ID
  independence, console/network health, and current regression.
- **Which are partial?** Direct input-value observation and automatic geometry/
  every-cell visual validation.
- **What still depends on human acceptance?** This Reference is accepted. New
  product semantics, exact density, colors, locale/week convention, shortcuts,
  and materially different operation models still require human judgment.
- **What wording would mislead?** Saying that one-click/open-ended range behavior
  is generally correct, that text semantics are machine-equivalent, or that
  human review is no longer needed.

### Ready for PR?

`yes` for repository review; no stage, commit, push, or PR was requested or
performed.

