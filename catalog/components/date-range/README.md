# DATE-RANGE-001 — Optional date-boundary appearances

[View the eight state images](index.html).

- Category: Component / filter-style date range.
- Platform: Web-origin illustrations, including one narrow arrangement. Real browser/mobile rendering is unverified.
- Status: **Human-accepted appearance examples.** [Visual acceptance](https://github.com/mk3008/torrone/pull/45#issuecomment-6191945674). Source Reference approval remains separate.
- Appearance: two labeled date controls, each combining value, contextual Clear and calendar action; a shared calendar identifies its active boundary.

| Image | Appearance | Provenance |
| --- | --- | --- |
| [empty](images/empty.png) | Both boundaries blank. | Source-supported reconstruction |
| [start-only](images/start-only.png) | Start populated; End blank. | Source-supported reconstruction |
| [end-only](images/end-only.png) | End populated; Start blank. | Source-supported reconstruction |
| [range-populated](images/range-populated.png) | Both dates visible, each with separate Clear/calendar actions. | Source-supported reconstruction |
| [invalid-start](images/invalid-start.png) | Distinct invalid Start field and nearby error text. | Source-supported reconstruction |
| [calendar-start](images/calendar-start.png) | Calendar below Start, with Start named above month navigation. | Source-supported reconstruction |
| [calendar-end](images/calendar-end.png) | Calendar below End, with End named above month navigation. | Source-supported reconstruction |
| [calendar-start-narrow](images/calendar-start-narrow.png) | Stacked boundaries; calendar inline below Start, before End. | Source-supported reconstruction of the narrow arrangement |

The calendar pictures distinguish selected endpoints, the interval interior, ordinary dates and unavailable dates. Month/year controls remain on one row; the active boundary and Close appear above them. Both date fields are retained in open-calendar examples to make ownership and alignment understandable. No application Shell, research banner or unrelated form is included.

## Source and fixture

[Date range curation](../../../references/date-range.md) identifies the approved [executable Reference](../../../review/references/date-range.html), Git blob `4627e83666329c63cc1a45f53f36b35fde3391f4`, and [human approval](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948). Its `.date-field`, `.clear-action`, `.picker`, calendar/day selectors, `renderCalendar`, `unavailableReason` and narrow-layout rules ground these reconstructions. No new visual state is proposed beyond that source; the new artwork still needs its own adoption.

The fixed August 2026 calendar, example dates and cutoff are source fixtures, not current business rules. Calendar drawings use Start 2026-08-10, End 2026-08-12 and the source's fixed today 2026-08-14. The Start-owned picture subdues dates later than End; the End-owned picture subdues dates earlier than Start or later than fixed today. These choices keep the pictured fixture consistent with the source; the catalog does not prescribe availability rules. The invalid date/error copy is also illustrative source content.

[SVG artwork](artwork/) is newly drawn from the source relationships and rendered to PNG. These are not original screenshots, actual browser captures, proof of responsive behavior or executable controls. Export geometry/fonts differ from the source; the original remains unchanged.

## Boundaries

Theme/colors, typography, spacing, dimensions, exact placement, dates, labels, cutoff and locale are illustrative. State combinations or errors not pictured are not newly specified. The narrow specimen illustrates the stacked relationship; it does not set a breakpoint or prove mobile touch/keyboard behavior.

The original Reference retains its optional-boundary, normalization, validation/recovery, completion, focus/keyboard, accessibility and responsive operation contracts. These pictures do not replace or weaken them, define new business rules or model any transition. In particular, the empty/partial pictures are not new decisions about which fields a consuming application requires.
