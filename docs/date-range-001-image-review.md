# DATE-RANGE-001 image review — 2026-10-15

Execution: [#44](https://github.com/mk3008/torrone/issues/44). Review: [eight images](../catalog/components/date-range/index.html), [state/source matrix](../catalog/components/date-range/README.md).

## Result and source

Eight independent PNGs reconstruct empty, Start-only, End-only, populated, invalid Start, Start calendar, End calendar and narrow Start-calendar appearances. They contain only the date-control responsibility, not the page, research banner or unrelated form. Open examples keep both fields to make calendar ownership understandable. The narrow example keeps the inline calendar between its Start field and the End field.

The approved executable is `review/references/date-range.html`, blob `4627e83666329c63cc1a45f53f36b35fde3391f4`; curation blob `2ddd9ccaa2041784ec3adbfcba46c82e14768746`. [Human approval](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948) identifies the adopted shared Date range version. That approval remains in its original scope; these new drawings are image candidates pending human adoption.

The SVG-to-PNG drawings use source-informed relationships, CSS state distinctions, fixture values and calendar rules. They are not original screenshots or actual browser states. Exact styling and geometry are illustrative. Calendar fixture: August 2026, Start 10, End 12, fixed today 14. Calendar cells run Sunday 2026-07-26 through Saturday 2026-09-05. Source `unavailableReason` makes dates after End unavailable to Start; dates before Start unavailable to End; dates after fixed today are unavailable to either. This is fixture consistency, not new product authorization/validation policy.

## Application interaction applicability

No consuming-application policy is supplied or changed. The applicable Date range Reference retains optional-boundary, normalization, commit/validation/recovery, completion, focus/keyboard, accessibility and narrow-layout operation contracts. The catalog is not a substitute for that executable contract.

| Responsibility / path | Coverage |
| --- | --- |
| Catalog index → gallery → images / sources | Local links/fragments and alt text checked statically; browser navigation/narrow gallery rendering unverified. |
| Empty, partial, populated and malformed input appearance | Separate images, field-value/invalid metadata checks and actual PNG inspection. |
| Calendar ownership, active-boundary header and narrow inline relationship | Source-informed static specimens inspected; not an executed responsive test. |
| Calendar fixture correctness | All 126 cells independently checked against Python dates/weekdays and source fixture constraints; endpoints/interior checked. |
| Entry normalization, dependent error recovery, calendar completion/Clear/dismissal, keyboard/focus and software keyboard | Not implemented or tested by these images; source contract preserved. |

## Validation

- Eight PNGs decode, are nonblank and uniquely identified. SVGs parse; Sharp 0.35.5 / librsvg 2.63.2 reproduces byte-identical PNGs. No reusable generator, dependency or framework was added.
- All image exports have their recorded dimensions. These are export facts, not UI requirements: ordinary field pairs 1240 × 168; invalid pair 1240 × 256; desktop calendar examples 1240 × 940; narrow example 720 × 1200.
- Field labels, values and invalid metadata match each specimen. Calendar fixture checks validate all 42 dates and weekday columns in each of the three calendar pictures, two selected endpoints, three interval cells, correct unavailable flags and day numbers.
- Source executable and curation Git blob identities match. Every gallery image has alt text; local links/fragments and README references resolve; exactly eight gallery images.
- Author inspected all eight actual PNGs. Selected endpoints/range, ordinary/unavailable dates, error text, active-boundary naming, single-row month/year navigation and the minimal narrow composition are visible. Range band outer edges were rounded to preserve the source distinction; final calendar images inspected after that refinement. This is self-checking, not independent design approval.
- `git diff --check` and bounded diff audit passed. Only the new Date range entry, its index card and this note change. Existing Shell, References, research history, prior catalog candidates and prior PR files remain unchanged.
- Browser execution remains unavailable from the session's established missing Chromium/download failure; no unchanged installation retry. Browser/mobile/accessibility/forced-colors/keyboard/touch/responsive/E2E passes are not claimed. The narrow drawing is not real-device evidence. Existing Entity lookup CI does not cover these images.

### PNG identities

| State | SHA-256 |
| --- | --- |
| empty | `ff8dd1998526e457fdb3b4a017e8019a8fe3892189aa658e6b067945754c9add` |
| start-only | `10285e069839f4f88541d1174d6e79ffe8d3f66cd1a7da4b857436f84583b3f8` |
| end-only | `335c990de9384e21510a90ac94084b4aab10575cb162b0d657d22719755a31f2` |
| range-populated | `e025dbb80659ffb30106ad2b9f66425b5eeaed846ca86f29dc4788f279f8ba3f` |
| invalid-start | `0a65eb6dc8604bb16ce3f497dcf6c05bbd18fad304931876de200808ac231d14` |
| calendar-start | `361986b2dc2dbec3caf097cb75f4d13c5ddb7fb5f416678eff048f352dd186a0` |
| calendar-end | `fe6b2a636fe7b49191b48e9a398012ba9a1912f513eb1a4f853fe5927607eb6a` |
| calendar-start-narrow | `aa2e178afd3d5ffa2af3973638129a89f8dc474e69865b2c42f89307a7a97222` |

## Material findings and disposition

| Finding | Outcome |
| --- | --- |
| Calendar alone would hide its owning boundary | Both date fields plus active-boundary header retained in the minimal component composition. |
| Invalid-state or partial-range pictures could silently redefine validation policy | Source fixture and appearance-only boundary explicit; original operation/recovery contract remains authoritative. |
| Calendar artwork could contain incorrect weekdays, selection or availability | All three grids checked independently against dates and the source fixture constraints. |
| Selected interval could show square outer band edges | Rounded source-like outer ends retained without fixing exact geometry. |
| Narrow drawing could be mistaken for a responsive/mobile pass | Labeled as source-informed static arrangement; browser/device/keyboard gaps retained. |

Human visual adoption of these eight images is pending. Merge/release/deployment remains separate; the next pattern is not included here.
