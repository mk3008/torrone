---
id: date-range
status: approved
responsibility: filter-style date range with independently optional Start and End boundaries
reference: ../review/references/date-range.html
approved_git_blob: 4627e83666329c63cc1a45f53f36b35fde3391f4
approval_evidence: https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948
---

# Date range filter

This is the single canonical Date range Reference. The owner explicitly adopted the shared next version, including flat icon buttons, in the [PR #19 review](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948). Approval covers the exact executable Git blob `4627e83666329c63cc1a45f53f36b35fde3391f4`, promoted byte-for-byte from commit `6861d5e2e21a765755778cdb46ee8ff501444b44`. Its embedded candidate banner is retained to preserve the exact reviewed bytes; this curation and the review index record its adopted status.

## Use this Reference when

The product needs a **filter-style** date range where Start and End are independently meaningful boundaries:

- either boundary may be blank;
- choosing one boundary completes that boundary immediately;
- the other boundary does not need to be selected in the same operation; and
- manual date entry and calendar selection are two ways to operate the same control.

Do not treat this as the design original for a materially different operation model, such as a reservation-style range that requires two calendar clicks to define one contiguous interval or a workflow where both boundaries are always required.

## Preserve

Implementations should preserve the design relationships and operation model demonstrated by the Reference:

- each boundary reads as one integrated control: editable value, clear action, calendar action, validation, and focus path belong together;
- Start and End can be completed independently, including valid Start-only and End-only states;
- manual input has explicit normalization, invalid-state feedback, recovery, and a credible calendar context;
- entry and exit paths are coherent, including opening, closing, Escape/Tab behavior, completion, and focus return;
- month and year navigation provide a complete usable calendar rather than a visually plausible but artificially bounded sample;
- the active selection boundary is discoverable;
- selected range, selected endpoints, unavailable dates, and ordinary dates remain meaningfully distinguishable;
- the visible field model agrees with the completion model; and
- on narrow screens, typing and calendar operation remain separate enough that the software keyboard and calendar do not compete for the same interaction space.

For the approved narrow-screen behavior, the boundaries stack vertically and the shared calendar appears inline immediately below the active boundary. Calendar controls remain comfortably tappable, and completion, clearing, dismissal, invalid-input recovery, and focus/keyboard behavior remain coherent with the desktop operation model.

The reusable principle is that the visible control model, completion behavior, valid partial states, responsive presentation, and state styling tell one coherent story.

## May vary

The consuming product owns its implementation and vocabulary. These are not transfer requirements unless separately required by the product:

- framework, component structure, DOM shape, CSS organization, classes, local IDs, and state-management approach;
- exact pixels, widths, spacing values, colors, shadows, and other incidental geometry;
- business copy, fixture values, fixed "today" date, and product-specific nouns;
- backend validation, cutoff rules, locale, timezone, and accepted textual date format, provided any changed product requirement still yields a coherent control; and
- other implementation details that do not change the preserved operation model.

The current 800 px responsive threshold is a local implementation choice demonstrated by this Reference, not a universal Torrone breakpoint or device taxonomy.

If a product requirement changes the operation model itself, record the difference explicitly and use or create a more appropriate Reference rather than silently redefining this one.

## Dependent recovery contract

On completion of a boundary operation, revalidate the opposite field **if its last committed validation failed because of the relationship between Start and End**. Apply this symmetrically, whether the operation uses manual entry, calendar selection, or Clear. Keep commit-time validation; do not validate on every keystroke. Apply the reconciled Enter/Tab baseline below.

- Start 10 → End 8 (invalid) → Start 6 produces a valid 6–8 range without requiring the user to recommit End. End 10 → Start 12 (invalid) → End 14 similarly produces 12–14.
- Recheck the opposite field's current text, including syntax, date validity and cutoff, before committing it. Recovery is not unconditional error dismissal.
- Clear or an invalid commit removes that boundary from the committed selection. A previously order-invalid opposite value can then become a valid partial selection. The newly invalid boundary retains its own error and raw text.
- If the relationship remains invalid, retain its error and exclude the invalid value from the committed selection. Never silently swap boundaries or change the user's intended date.
- Do not revalidate unrelated existing malformed-date or future-date errors merely because the opposite boundary changes.
- Successful recovery normalizes the recovered text, clears its visible error and `aria-invalid`, restores normal descriptive text, and updates the range display/calendar from committed values. Publish the final selection message once after both validations, without an intermediate partial-state message from the nested recovery.
- Recovery does not focus the opposite field. Preserve the initiating operation's existing completion/focus return behavior. Do not reopen a calendar or invoke a software keyboard solely to repair an error.

## Recovery rationale

The adopted policy makes validation reflect the current committed dependency while keeping optional partial filters meaningful. Requiring the invalid field to be recommitted leaves a stale error after its cause has gone; validating continuously changes the existing completion model and introduces feedback during unfinished typing. Both are possible product policies, but neither is this Reference's policy.

This is a bounded Date range decision, not a universal form-validation rule. Required two-ended booking ranges or applications that retain invalid last-good values need their own explicit contract.

## Application ownership and review

Apply [Application interaction requirements](../docs/application-interaction.md) when consuming this Reference. This standalone filter has no new application-wide Enter policy. An application must reconcile dependency validation, commit timing, error feedback and focus with its own maintained interaction record. PoC 018 is transfer evidence, not an independent product policy. Its earlier Invoice-only scope was incorrect and is superseded by the contract below. Its historical implementation remains evidence, not the current design original.

Human review should confirm both directions, manual and calendar repair, Clear, valid partial selection, remaining reversal, and independent invalid dates. Review the [verification evidence and limits](../docs/poc/experiments/020-date-range-recovery/README.md). Human approval is recorded below; verification limits remain as originally reported.

## Reconciled baseline (before Issue #13 recovery)

Source: [owner review](https://github.com/mk3008/torrone/pull/14#pullrequestreview-5220133253). These requirements apply to the shared optional date filter, not an Invoice customization. These decisions are integrated into the canonical Reference.

| PoC 018 finding | Classification | Required shared behavior |
| --- | --- | --- |
| Irregular Enter focus | Reference gap and target defect | Manual Enter normalizes/validates in place for either field, valid/invalid/empty. Composition Enter is untouched. Calendar completion has a separate return path. |
| Keyboard hides editor | Reference gap exposed by transfer | Keep manual entry in normal document flow: no application scrolling, delayed retries or focus-dependent padding on editor focus/blur or keyboard viewport changes. The browser may perform its native keyboard accommodation. On calendar opening, reveal the owning label/editor followed by the calendar header, without transferring focus to the other editor. |
| Tapped day fails to commit | Target event-order defect | Available day activation completes its owning boundary before dismissal; preserve this across typing/calendar switches. |
| Clipped focus ring | Target rendering defect | A focused day remains visible above neighboring cells; preserve focus styling and verify actual rendering. |
| Month navigation wastes height | Reference layout gap | Previous year, previous month, month/year, next month, next year occupy one row at ordinary phone widths. Label may wrap inside its cell; controls retain usable targets. |
| Sunday orientation | Reference design decision | Sunday heading and ordinary Sunday dates are red; heading remains bold/textual. Derive date styling from weekday. Selected and disabled states take priority; Saturday is neutral. |
| Active-boundary label placement | Reference ambiguity | First row: active boundary name left, Close right. Second row: month/year navigation. Then weekday headings and days. DOM and visual order agree. |
| Different navigation expressions | Reference ambiguity | 44px single-chevron month buttons and double-chevron year buttons, in chronological order around the month heading, with explicit accessible names and titles. |

Navigation comparison: text labels (“Previous year/month”) are explicit but make four touch targets plus the month heading too wide. Font glyphs are compact but their weight and alignment vary. Fixed SVG single/double chevrons give consistent geometry; accessible names distinguish month/year. Flat button styling is adopted through the icon-button Reference. This retains a recognizable existing Reference expression with stronger affordance, rather than copying the PoC font glyphs. The adoption evidence is recorded below.

The old mobile header put the month first and target name after the controls. Target-first makes the scope clear before the user navigates; Close stays in the top-right header, outside chronological navigation. The hierarchy is required; exact colors, fonts and spacing remain flexible.

Tab/Shift+Tab traverse visible enabled controls in DOM/visual order: editor, conditional Clear, calendar action, then the next boundary. No positive tabindex. Opening by ArrowDown focuses a selectable day. On narrow screens calendar completion/Clear returns to the owning calendar action to avoid reopening the keyboard; manual Enter never uses that return routine. These are this filter's shared baseline, not a universal Enter policy for every app.

See [reconciliation verification](../docs/poc/experiments/020-date-range-recovery/reconciliation.md) for current evidence. Earlier PoC 020 evidence identifies the earlier candidate only and does not validate this revision.


## Keyboard-scroll withdrawal and owner review

On 2026-09-16 the owner explicitly agreed to withdraw the independent keyboard-following scroll correction and stated that the remaining behavior had no problems. Preserve that bounded acceptance. The [withdrawal decision](../docs/decisions/2026-09-16-withdraw-keyboard-scroll.md) supersedes the earlier visibility policies and their test claims. The Reference uses normal textbox behavior; only calendar disclosure explicitly reveals its owning input/calendar context.

Flat icon-button definition and its application to these controls are tracked in [Issue #15](https://github.com/mk3008/torrone/issues/15), separately from #13. That issue owns implementation scope, responsibility and the adoption decision.

## Flat icon-button adoption

The navigation and Close controls apply the [flat icon-button Reference](icon-button.md). This changes visual states only; Date range retains placement, order and focus semantics. The treatment was adopted in the approval below; see [verification and limits](../docs/icon-button-review.md).

## Approval and historical evidence

The [explicit human review](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948) adopts both the flat treatment and the complete shared Date range next version. This is the approval authority, not PR merge or test results. Existing browser/phone verification limitations are not retroactively changed by adoption.

The previous approved Git blob `d2be91d512ac310cb306adfe0e9bfe556ec2bca8` is preserved byte-for-byte in [historical HTML](../docs/history/date-range-before-pr19/date-range.html), alongside its [unaltered curation](../docs/history/date-range-before-pr19/curation.md). Relative paths inside that archived curation describe its original repository location; use the [history note](../docs/history/date-range-before-pr19/README.md) to resolve them. The [candidate curation](../docs/history/date-range-before-pr19/candidate-curation.md) preserves the pre-adoption proposals and evidence chain. Neither is a current Reference.

Earlier responsive rationale and approval remain in [mobile review decisions](../docs/mobile-review-decisions.md); later PoC 018 reconciliation, #13 recovery, keyboard-scroll withdrawal and #15 evidence are linked above. Historical reports apply only to their recorded artifact and conditions.
