---
id: date-range
status: approved
responsibility: filter-style date range with independently optional Start and End boundaries
reference: ../review/references/date-range.html
approved_git_blob: d2be91d512ac310cb306adfe0e9bfe556ec2bca8
approval_evidence: ../docs/mobile-review-decisions.md
historical_reference: ../docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/adjusted/date-range.html
historical_approved_sha256: 387ec789769de702263a802de27368ea2128a2f27c25002e494c00dc65cc5d86
historical_approval_evidence: ../docs/poc/experiments/017-reference-html-ssot/date-picker-human-calibration-phase-2-result.md
---

# Date range filter

This entry is Torrone's current human-approved design original for a filter-style Date range control. It builds on the earlier human-approved desktop Reference and now includes the responsive derivative that was reviewed on a phone on 2026-09-16.

The current approved executable is `review/references/date-range.html`. Approval applies to the exact content identified by Git blob `d2be91d512ac310cb306adfe0e9bfe556ec2bca8`. The earlier desktop-only approval remains preserved as provenance and evidence rather than being rewritten.

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

## Approval history

The original desktop Reference was human-approved during PoC 017 and recorded as the Reference SSOT with SHA-256:

`387ec789769de702263a802de27368ea2128a2f27c25002e494c00dc65cc5d86`

The responsive derivative was then reviewed on a phone on 2026-09-16. The reviewer first confirmed the narrow-screen calendar behavior, then separately confirmed manual entry, invalid-input recovery, Clear, software-keyboard/focus behavior, and the remaining responsive Date range flow. No issues were reported in those review passes.

That explicit human review promotes the responsive derivative from working draft to the current approved Reference. Static checks and browser comparison remain supporting verification only; they did not make the approval decision.

This entry does not make these choices universal DatePicker rules. It curates one bounded design original for the stated responsibility.

## Provenance

Current approved executable:

`review/references/date-range.html`

Approved Git blob:

`d2be91d512ac310cb306adfe0e9bfe556ec2bca8`

Responsive human-review record:

`docs/mobile-review-decisions.md`

Historical desktop approval evidence:

`docs/poc/experiments/017-reference-html-ssot/date-picker-human-calibration-phase-2-result.md`

Historical approved executable:

`docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/adjusted/date-range.html`

The historical evidence remains in place; curation points to it rather than rewriting or duplicating it.