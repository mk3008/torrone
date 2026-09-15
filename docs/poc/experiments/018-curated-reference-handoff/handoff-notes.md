# PoC 018 — curated Reference handoff notes

## Implementation context and read boundary

The implementation started from main at `db063d03709e3cdcd02a95f01c61986f349eefe7`, in a fresh task context. No previous DatePicker implementation, Target, comparison report, Manifest/OKF material, or research archive was read to build the target.

The complete product input was Issue #8 (no comments) and these current files:

- `AGENTS.md`
- `docs/product-foundation.md`
- `references/README.md`
- `references/date-range.md`
- `review/references/date-range.html`, approved Git blob `d2be91d512ac310cb306adfe0e9bfe556ec2bca8`

The executable was inspected as source, including its CSS and interaction handlers. Its historical links and approval evidence were not opened. The initial three target files were authored before inspecting review-surface infrastructure or existing verification. This is an otherwise fresh implementation context, not a claim that a second agent was run. General project background was present in the conversation, but no historical DatePicker behavior or results informed the implementation.

## Clear guidance

The curated entry identifies both the exact design original and its scope. Independent optional boundaries, immediate completion of a single boundary, integrated editing/clear/calendar/error controls, invalid-input recovery, active-boundary indication, month/year navigation, and distinct range/endpoint/unavailable states were clear. The phone layout explicitly requires stacking and an inline calendar below its owner while separating keyboard entry from calendar operation.

The executable supplied the detailed focus, dismissal, keyboard navigation, normalization and calendar-context examples that prose alone did not specify. No historical research was needed.

## Implementation-local judgments

- Invoice desk uses earliest/latest issue dates, a small search-preview form, green styling, flex sections and a generated button group. HTML, CSS and event-delegated JavaScript are separate files; Reference DOM, classes, IDs and fixture hooks are not reused.
- ISO and compact numeric dates are accepted; whitespace is trimmed and committed on change/Enter. Blank values remain unbounded. Dates use UTC calendar arithmetic; the fixed review date is 2026-09-16. Future invoice issue dates are unavailable locally, not a Torrone-wide rule.
- At 720 px or below the calendar is inline and completion/clear/dismiss returns focus to the calendar button, avoiding editable-field focus. Desktop input focus opens the calendar and completion returns to the input without reopening. Actions are keyboard-tab reachable. Tab from an input closes the calendar; tabbing through calendar controls is allowed and leaving the owning section dismisses it.
- A reversed manually entered window reports the conflict on the latest boundary. Both raw fields are revalidated together, so editing or clearing either boundary can recover without losing the other field's text. Invalid raw text remains editable; calendar context comes from a valid boundary or the review date.
- Month/year navigation is not fixture-bounded; the local textual format supports years 0001–9999. Arrow/Home/End and Page Up/Down navigation use one tabbable date. A month with no available date retains navigation and dismiss controls.

## Ambiguities to review separately

The curation says to preserve coherent Escape/Tab/focus behavior without identifying every executable detail as either intentional or incidental. In particular, the executable removes clear/calendar buttons from the tab sequence, whereas this candidate makes them reachable. Human review should decide whether this is acceptable transfer freedom or a curation clarification is needed.

The curation permits product-specific cutoff rules but does not specify how errors on the opposite boundary should recover after a dependent value changes. This candidate revalidates both boundaries. That is a local recovery policy, not a proposed global convention.

No material gap prevented implementation. That observation does not establish handoff quality, design approval or general sufficiency of curation. In particular, visual recognition without a side-by-side original, actual phone software-keyboard behavior and usability require human operation of the candidate.

Focused verification later extracted date-only arithmetic and input assessment into `invoice-dates.js` for executable boundary/recovery tests; it did not introduce another design source.

## Review boundary

This is an implementation candidate, not a curated Reference. The approved executable and curation are unchanged. Review-surface integration and focused checks follow the initial implementation; their files and results are recorded separately in `verification.md`. No historical research had to be consulted.

## Post-implementation owner feedback

The first phone review exposed keyboard obstruction during manual entry, especially at the latest boundary. This is a candidate defect against the existing responsive/coherent-entry requirement, not evidence for a new Torrone-wide rule. A local focus/scroll correction was added after the initial handoff experiment. The original implementation checkpoint remains available, and the observed failure plus verification limits are retained in `verification.md`.

The subsequent manual-Enter policy is documented in [keyboard-policy.md](keyboard-policy.md). It replaces the earlier Enter-as-Tab correction after owner feedback and primary-source research. This local decision does not rewrite the initial handoff evidence or approved Reference.

The later application-level review in [application-interaction.md](application-interaction.md) qualifies the earlier "No material gap" observation: the initial handoff did not explicitly carry an application interaction policy, and component verification did not establish cross-control browser behavior. The current Enter proposal remains unreviewed. The original observation above is retained as evidence, not the final assessment of handoff completeness.
