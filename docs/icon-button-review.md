# Flat icon-button candidate verification

Source: PR for Issue #15, based on main d342848. Candidate source files are `review/references/icon-button-draft.html` and `review/references/date-range-recovery-draft.html`; the PR commit identifies the exact version.

## Application coverage

The Date range application's existing contract is in `references/date-range-recovery.md`, with shared text-entry policy in `docs/application-interaction.md`. This change affects presentation of navigation/Close only; no DOM, event handler, action order or application policy changes.

| Path | Evidence | Limit |
| --- | --- | --- |
| Manual entry, Enter, IME and calendar context | Existing entry regression passed | Handler fixture, not actual mobile keyboard |
| Symmetric recovery and calendar/Clear completion | Existing recovery regression passed | Does not establish native browser focus or geometry |
| Navigation and Close | Source comparison preserves markup and scripts; only scoped icon-button styles change | Native browser and actual phone review pending |

Human acceptance/rejection of this treatment is pending in Issue #15. The draft is not promoted. No keyboard-following scrolling is restored.

Browser attempt: Chrome could not connect to the local review server (`ERR_CONNECTION_REFUSED`). Native pointer/keyboard, hover/pressed/focus visuals, forced colors and 320px/390px layout remain unverified; use the published review candidate for human review before adoption.

## Subsequent human adoption

The owner [explicitly adopted the flat treatment and complete Date range next version](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948). The candidate HTML was promoted byte-for-byte to `review/references/date-range.html`; the earlier paths/statuses above describe the original verification attempt. Adoption does not turn its unverified browser paths into test passes. See [canonical curation](../references/date-range.md).
