---
id: date-range
status: approved
responsibility: filter-style date range with independently optional Start and End boundaries
reference: ../docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/adjusted/date-range.html
approved_sha256: 387ec789769de702263a802de27368ea2128a2f27c25002e494c00dc65cc5d86
approval_evidence: ../docs/poc/experiments/017-reference-html-ssot/date-picker-human-calibration-phase-2-result.md
---

# Date range filter

This entry promotes the existing human-approved Date range Reference into Torrone's current curated set. It does not create a new approval. The recorded Phase 2 result already identifies the executable file above as the human-approved Reference SSOT and records the approved byte hash.

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
- selected range, selected endpoints, unavailable dates, and ordinary dates remain meaningfully distinguishable; and
- the visible field model agrees with the completion model. Do not hide a two-click range operation behind two independently presented fields.

The reusable principle is that the visible control model, completion behavior, valid partial states, and state styling tell one coherent story.

## May vary

The consuming product owns its implementation and vocabulary. These are not transfer requirements unless separately required by the product:

- framework, component structure, DOM shape, CSS organization, classes, local IDs, and state-management approach;
- exact pixels, widths, spacing values, colors, shadows, and other incidental geometry;
- business copy, fixture values, fixed "today" date, and product-specific nouns;
- backend validation, cutoff rules, locale, timezone, and accepted textual date format, provided any changed product requirement still yields a coherent control; and
- other implementation details that do not change the preserved operation model.

If a product requirement changes the operation model itself, record the difference explicitly and use or create a more appropriate Reference rather than silently redefining this one.

## Not approved by this entry

Responsive behavior is **not** part of this approval. The responsive derivative at `review/references/date-range.html` remains a working draft pending separate human review. The historical approval must not be inferred to cover that derivative.

This entry also does not make the Date range choices universal DatePicker rules. It curates one bounded design original for the stated responsibility.

## Provenance

Human-approval evidence:

`docs/poc/experiments/017-reference-html-ssot/date-picker-human-calibration-phase-2-result.md`

Approved executable Reference:

`docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/adjusted/date-range.html`

Approved SHA-256:

`387ec789769de702263a802de27368ea2128a2f27c25002e494c00dc65cc5d86`

The historical evidence remains in place; curation points to it rather than rewriting or duplicating it.