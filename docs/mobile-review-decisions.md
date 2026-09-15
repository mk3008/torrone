# Mobile review decisions

Status: working draft for human review; not a repository-wide responsive contract.

The first hosted review made the existing desktop-only samples accessible from a phone, but their 720–760 px body minimum widths made them difficult to use. The requested correction is implemented in `review/references/`; historical originals and evidence remain unchanged.

## Chosen behavior

| Surface | At widths up to 800 px | Wider screens |
| --- | --- | --- |
| Workspace navigation | Closed initially; opens as a modal side drawer over the workspace, leaving a visible scrim. Explicit Close, Escape, scrim tap, or destination selection dismiss it and restore focus to the menu button. | Existing inline sidebar and toggle. |
| Entity search | Full-screen dialog with a visible title and Close action, search field, scrolling results, and persistent Cancel / Select actions. Initial focus goes to the title so opening does not immediately summon the software keyboard. Visual viewport changes resize the dialog. | Centered dialog with bounded height and scrolling body; existing search focus. |
| Date range | Stacked, labeled boundaries and an inline calendar immediately below the active boundary. Larger calendar/navigation controls; independent boundary selection, validation, clearing, and dismissal remain intact. | Existing side-by-side fields and anchored popup. |
| Results table | Local horizontal scroll rather than shrinking text or silently hiding columns. A labeled focusable region makes the scroll area identifiable. | Existing table. |

The 800 px threshold is a local layout choice, not a device detector or a product-wide breakpoint. A short confirmation dialog does not need to become full-screen merely because it is on a phone. Full-screen is chosen here because entity search combines query entry, result selection, and confirmation. A bottom sheet is also possible for short choices, but is not needed for this bounded correction.

The drawer uses a native modal dialog so background interaction and keyboard focus remain bounded. The search dialog is also native. No swipe-only dismissal is introduced. The date calendar stays non-modal and in normal flow on narrow screens, avoiding a second full-screen operation for one date boundary.

## Provenance

Copies were made from commit `af5f5d75a7d7e6084e418cd0e2eab4e8c093d6b5`:

- Date range: `docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/adjusted/date-range.html`.
- Entity search: `docs/poc/experiments/017-reference-html-ssot/variants/11-composite-granularity/references/entity-dialog-lookup.html`.
- Workspace: `docs/poc/experiments/017-reference-html-ssot/reference/index.html`.

Historical approval applies to the original date range sample, not automatically to this responsive derivative. The fixed today fixture remains 2026-08-14. Existing demonstration-only destinations and data are not expanded into production functionality.

## Review and verification

Static checks cover HTML structure, inline JavaScript syntax, generated-file hashes, and untouched historical originals. Browser geometry, native focus containment, touch interaction, orientation changes, and software-keyboard behavior still need browser / real-device review; static checks do not prove them.

On a phone, open navigation and try each dismissal path; open the search and check that Cancel and Select remain reachable with the keyboard visible; select and clear each date boundary; and scroll the results table without shifting the whole page. On a desktop, check that navigation and popups retain their original layout. Repeatedly crossing the 800 px breakpoint must not leave a backdrop or a hidden focused control behind.

## Design references

- [Material Design: navigation drawers](https://m3.material.io/components/navigation-drawer/guidelines) — temporary modal navigation.
- [Material Design: dialogs](https://m3.material.io/components/dialogs/guidelines) — basic versus full-screen dialog responsibilities.

These inform the choices; they do not require Torrone or its consumers to adopt Material components or a particular framework.

## Follow-up: keyboard and calendar collision

Phone feedback showed that the inherited focus-open behavior displayed the software keyboard and calendar together. On narrow screens, input focus now closes the calendar and is reserved for typing. The calendar button moves focus off the input before opening the calendar. Selecting, clearing, or dismissing restores focus to that boundary's calendar button instead of its editable input, so programmatic focus does not request the keyboard again. Wider-screen focus-open behavior is preserved. A breakpoint change closes the calendar to avoid carrying the previous input mode across layouts.

This separates two input methods without making the text field read-only or changing validation and independent-boundary semantics. Software-keyboard dismissal still needs real-device confirmation.

## Follow-up: calendar ownership

The single calendar is moved into the active boundary stack on narrow screens, immediately after that boundary's input/error area. Start selection therefore appears before the End field; End selection appears below End. The existing heading/status identifies which boundary is being selected. Wider screens retain the shared anchored popup. Breakpoint changes close the calendar and relocate it without retaining focus inside hidden content. Focus-policy regression checks also cover repeated Start/End switching and the desktop parent.
