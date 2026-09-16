---
id: date-range-recovery
status: draft
responsibility: opposite-boundary recovery for independently optional date filters
reference: ../review/references/date-range-recovery-draft.html
base_approved_git_blob: d2be91d512ac310cb306adfe0e9bfe556ec2bca8
draft_git_blob: f0fc7afa5e719891ac291e5a69ce5a579d69717f
decision_source: https://github.com/mk3008/torrone/issues/13
---

# Date range dependent recovery — proposed decision

This is a separate draft of the [approved Date range](date-range.md). Approval does not transfer. The original executable, curation and approval evidence remain unchanged. The owner must decide whether to approve this recovery policy and the exact candidate above.

## Proposed contract

On completion of a boundary operation, revalidate the opposite field **if its last committed validation failed because of the relationship between Start and End**. Apply this symmetrically, whether the operation uses manual entry, calendar selection, or Clear. Keep the base Reference's completion events; do not validate on every keystroke or introduce new Enter/Tab navigation.

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

Apply [Application interaction requirements](../docs/application-interaction.md) when consuming this draft. This standalone filter has no new application-wide Enter policy. An application must reconcile dependency validation, commit timing, error feedback and focus with its own maintained interaction record. The Invoice desk candidate is not changed or approved by this work; revisit its validation and cross-control coverage before adopting this policy there.

Human review should confirm both directions, manual and calendar repair, Clear, valid partial selection, remaining reversal, and independent invalid dates. Review the [verification evidence and limits](../docs/poc/experiments/020-date-range-recovery/README.md). A successful test or merge does not promote this draft.
