# Shared Date range baseline reconciliation

Owner decision: [PR #14 review](https://github.com/mk3008/torrone/pull/14#pullrequestreview-5220133253).

The former Invoice-only curation was a scope error. Its original record remains in PoC 018 history; the active lookup now points to one shared Date range next-version candidate. The approved executable and original approval evidence are unchanged. The candidate is not approved by these checks.

The classification and design choices live in [the shared contract](../../../../references/date-range-recovery.md), including the comparison of header hierarchy and navigation expressions. The PoC's target is preserved as historical transfer evidence, not a custom product Reference. AGENTS and the curation entry point now require findings to return to the shared Reference or be corrected as target defects.

## Separable change layers

- `baseline.patch`: old approved HTML to reconciled baseline (Enter/Tab, entry visibility, pointer stability, header/navigation, Sunday cue and focus outline).
- `recovery.patch`: that baseline to the single next candidate, containing only Issue #13 dependent validation changes.
- Reconstruct with `cp review/references/date-range.html /tmp/approved.html`, then apply baseline.patch and recovery.patch in sequence to that copy using `patch /tmp/approved.html < PATCH_PATH`. Do not patch the approved repository file.
- [Identity](reconciliation-identity.json) records exact source and patch hashes. These patches are review evidence, not additional curated References.

`node tests/check-date-range-recovery.cjs` passes on the combined candidate. The same command with the reconstructed baseline path fails at `start must recover on opposite commit`, demonstrating the additional recovery behavior. `node tests/check-date-range-entry.cjs` executes the candidate's actual embedded entry handler and covers both fields, delayed keyboard opening, viewport changes, pointer activation and desktop isolation. No old test was weakened.

## Browser coverage against the final candidate

Chrome, local managed preview, 320/390/900 CSS-pixel iframe widths. [Captured observations](reconciled-observations.json) include DOM snapshots and read-only focus/value/geometry inspection.

| Shared contract path | Evidence / outcome | Limit |
| --- | --- | --- |
| Manual Enter in either field | 390px valid/invalid normalization and recovery retain active editor; desktop invalid and both-direction recovery retain active editor | Real IME composition not exercised; guarded in source |
| Sequential navigation | Start editor → Clear → calendar → End; reverse End → Start calendar observed | Full screen-reader navigation not tested |
| Typing → opposite calendar → day | End calendar opens from Start editing, selection commits and returns to End calendar action | Desktop browser pointer, not phone touch |
| Header/nav layout | Target and Close above chronological controls; 44px controls align on one row; September wraps within center cell at 320px; no document overflow | Enlarged system text not tested |
| Input visibility | Candidate entry-handler regression covers both fields, delayed resize/no-resize and cleanup | Actual phone keyboard/embedding host still requires owner review |
| Recovery after baseline | Both directions pass regression; final browser captures Start6 repair and desktop reverse repair | Full original PoC 020 matrix not repeated |
| Sunday/focus | Sunday class derived from date; disabled/selected rules override it, Saturday neutral; focused day uses raised inset outline | Contrast/assistive speech not independently audited |

During implementation the first 320px layout broke month words too narrowly; tighter outer spacing resolved it. A typing-to-opposite-calendar click also exposed premature scroll-space cleanup. The candidate now holds scroll space through click (with pointer-cancel/release fallback); its regression verifies that pointerup alone does not collapse it. These intermediate failures are not claimed as passing evidence.

![Shared candidate at 390px](reconciled-390.jpg)

The earlier README/identity/observations describe the pre-reconciliation draft only. Do not reuse their pass claims as proof of this revision. Human visual review and actual mobile keyboard behavior remain pending.
