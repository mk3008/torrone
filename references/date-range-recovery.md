---
id: date-range-recovery
status: draft
responsibility: opposite-boundary recovery for independently optional date filters
reference: ../review/references/date-range-recovery-draft.html
base_approved_git_blob: d2be91d512ac310cb306adfe0e9bfe556ec2bca8
draft_identity: ../docs/poc/experiments/020-date-range-recovery/visibility-trigger-identity.json
decision_source: https://github.com/mk3008/torrone/issues/13
---

# Date range — shared next-version candidate

This is a separate draft of the [approved Date range](date-range.md). Approval does not transfer. The original executable, curation and approval evidence remain unchanged. The owner must decide whether to approve this recovery policy and the exact candidate above.

## Proposed contract

On completion of a boundary operation, revalidate the opposite field **if its last committed validation failed because of the relationship between Start and End**. Apply this symmetrically, whether the operation uses manual entry, calendar selection, or Clear. Keep commit-time validation; do not validate on every keystroke. Apply the reconciled Enter/Tab baseline below.

- Start 10 → End 8 (invalid) → Start 6 produces a valid 6–8 range without requiring the user to recommit End. End 10 → Start 12 (invalid) → End 14 similarly produces 12–14.
- Recheck the opposite field's current text, including syntax, date validity and cutoff, before committing it. Recovery is not unconditional error dismissal.
- Clear or an invalid commit removes that boundary from the committed selection. A previously order-invalid opposite value can then become a valid partial selection. The newly invalid boundary retains its own error and raw text.
- If the relationship remains invalid, retain its error and exclude the invalid value from the committed selection. Never silently swap boundaries or change the user's intended date.
- Do not revalidate unrelated existing malformed-date or future-date errors merely because the opposite boundary changes.
- Successful recovery normalizes the recovered text, clears its visible error and `aria-invalid`, restores normal descriptive text, and updates the range display/calendar from committed values. Publish the final selection message once after both validations, without an intermediate partial-state message from the nested recovery.
- Recovery does not focus the opposite field. Preserve the initiating operation's existing completion/focus return behavior. Do not reopen a calendar or invoke a software keyboard solely to repair an error.

## Why this candidate

The selected proposal makes validation reflect the current committed dependency while keeping optional partial filters meaningful. Requiring the invalid field to be recommitted leaves a stale error after its cause has gone; validating continuously changes the existing completion model and introduces feedback during unfinished typing. Both are possible product policies, but neither is this candidate's proposal.

This is a bounded Date range decision, not a universal form-validation rule. Required two-ended booking ranges or applications that retain invalid last-good values need their own explicit contract.

## Application ownership and review

Apply [Application interaction requirements](../docs/application-interaction.md) when consuming this draft. This standalone filter has no new application-wide Enter policy. An application must reconcile dependency validation, commit timing, error feedback and focus with its own maintained interaction record. PoC 018 is transfer evidence, not an independent product policy. Its earlier Invoice-only scope was incorrect and is superseded by the contract below. Its historical implementation remains evidence, not the current design original.

Human review should confirm both directions, manual and calendar repair, Clear, valid partial selection, remaining reversal, and independent invalid dates. Review the [verification evidence and limits](../docs/poc/experiments/020-date-range-recovery/README.md). A successful test or merge does not promote this draft.

## Reconciled baseline (before Issue #13 recovery)

Source: [owner review](https://github.com/mk3008/torrone/pull/14#pullrequestreview-5220133253). These requirements apply to the shared optional date filter, not an Invoice customization. The executable is one next-version candidate, not a second product variant.

| PoC 018 finding | Classification | Required shared behavior |
| --- | --- | --- |
| Irregular Enter focus | Reference gap and target defect | Manual Enter normalizes/validates in place for either field, valid/invalid/empty. Composition Enter is untouched. Calendar completion has a separate return path. |
| Keyboard hides editor | Reference gap exposed by transfer | Keep manual entry in normal document flow: no unconditional scrolling, delayed retries or focus-dependent padding on editor focus/blur. Apply the shared measured-occlusion correction only when needed. The browser may perform its native keyboard accommodation. On calendar opening, reveal the owning label/editor followed by the calendar header, without transferring focus to the other editor. |
| Tapped day fails to commit | Target event-order defect | Available day activation completes its owning boundary before dismissal; preserve this across typing/calendar switches. |
| Clipped focus ring | Target rendering defect | A focused day remains visible above neighboring cells; preserve focus styling and verify actual rendering. |
| Month navigation wastes height | Reference layout gap | Previous year, previous month, month/year, next month, next year occupy one row at ordinary phone widths. Label may wrap inside its cell; controls retain usable targets. |
| Sunday orientation | Reference design decision | Sunday heading and ordinary Sunday dates are red; heading remains bold/textual. Derive date styling from weekday. Selected and disabled states take priority; Saturday is neutral. |
| Active-boundary label placement | Reference ambiguity | First row: active boundary name left, Close right. Second row: month/year navigation. Then weekday headings and days. DOM and visual order agree. |
| Different navigation expressions | Reference ambiguity | Bordered 44px single-chevron month buttons and double-chevron year buttons, in chronological order around the month heading, with explicit accessible names and titles. |

Navigation comparison: text labels (“Previous year/month”) are explicit but make four touch targets plus the month heading too wide. Font glyphs are compact but their weight and alignment vary. Fixed SVG single/double chevrons give consistent geometry; visible borders identify the touch area, while accessible names distinguish month/year. This retains a recognizable existing Reference expression with stronger affordance, rather than copying the PoC font glyphs. Human visual review is still required.

The old mobile header put the month first and target name after the controls. Target-first makes the scope clear before the user navigates; Close stays in the top-right header, outside chronological navigation. The hierarchy is required; exact colors, fonts and spacing remain flexible.

Tab/Shift+Tab traverse visible enabled controls in DOM/visual order: editor, conditional Clear, calendar action, then the next boundary. No positive tabindex. Opening by ArrowDown focuses a selectable day. On narrow screens calendar completion/Clear returns to the owning calendar action to avoid reopening the keyboard; manual Enter never uses that return routine. These are this filter's shared baseline, not a universal Enter policy for every app.

See [reconciliation verification](../docs/poc/experiments/020-date-range-recovery/reconciliation.md) for current evidence. Earlier PoC 020 evidence identifies the earlier candidate only and does not validate this revision.

## Follow-up: scroll only when opening the calendar

The owner clarified that tapping a visible text editor must not trigger application scrolling. Remove the former manual-entry scroll/padding workaround rather than postponing it. Outside taps must not select the other boundary. Calendar opening requests contextual scrolling on narrow screens, anchored at the owning boundary stack so its label/editor and the calendar header remain in sequence. Do not align the calendar alone and hide its editor. A tall calendar may still require normal user scrolling. Internal focus changes use preventScroll to avoid competing movements. This supersedes the earlier reconciliation visibility implementation, not the requirement that manual input remain usable. [Current verification](../docs/poc/experiments/020-date-range-recovery/scroll-correction.md).

## Measured text-entry occlusion

The owner's next clarification permits the minimum correction when keyboard occlusion actually clips the active editor. Follow [shared text-entry visibility](../docs/application-interaction.md#shared-text-entry-visibility). The candidate includes a generic handler for text inputs and textarea, independent of calendar state; it preserves native focus and makes no movement when the label/editor fit.

The current handler operates only in a top-level window with usable viewport geometry. In the ChatGPT embedded viewer it deliberately does not guess keyboard occlusion; open the review site as a standalone browser page to exercise the correction. A host integration is required to provide the same guarantee inside an opaque embedding. No such host contract is available in this repository. [Verification and limits](../docs/poc/experiments/020-date-range-recovery/visibility.md).

Textbox correction is one-directional: only positive scroll deltas may lift the editor above the keyboard. Ignore negative corrections; upper-edge/label clipping must not move the page backward automatically.

Only a decrease in visible viewport height may initiate textbox correction. Focusing/tapping an editor, switching fields, scrolling manually or increasing viewport height must not initiate it. Browser-native keyboard/focus scrolling remains outside this guarantee.
