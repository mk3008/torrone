# Date range opposite-boundary recovery

Issue: [#13](https://github.com/mk3008/torrone/issues/13). Date: 2026-09-16.

## Decision and scope

The [draft curation](../../../../references/date-range-recovery.md) proposes commit-time revalidation of an opposite field's existing order error. Human approval is pending. The approved executable and its approval evidence are preserved byte-for-byte; PoC 019's failing observations remain historical evidence.

The exact draft, base commit and captured evidence hashes are in [identity.json](identity.json). The test surface used PoC 019's isolated local server/width fixture, with only its served `date-range.html` replaced by exact draft bytes. Its generated `fixture.json` initially described the original; it was corrected to the recorded draft identity after capture. That metadata was not used as evidence of source equivalence. No application source instrumentation was added.

## Verification

`node tests/check-date-range-recovery.cjs` passes. Running that same check with `review/references/date-range.html` fails at the opposite-commit recovery assertion, demonstrating that the regression check distinguishes the old behavior. The test executes extracted real handlers in a minimal state fixture; it does not prove browser event delivery or accessibility.

Actual Chrome browser interaction used Enter, calendar clicks and Clear on the draft. [observations.json](observations.json) records DOM snapshots, input values, invalid attributes and focus. Desktop viewport was 1363 × 936; R11 used a 320 CSS-pixel iframe, not phone emulation.

| Requirement / source | Affected path | Evidence | Result / gap |
| --- | --- | --- | --- |
| Draft symmetric dependent recovery | Start10 → invalid End8 → Start6; End10 → invalid Start12 → End14 | R01–R04; handler regression | Both recover, normalized values and full selection message agree |
| Same policy for calendar completion | Invalid End8 repaired by calendar Start6; invalid Start12 repaired by calendar End14 | R05 desktop, R11 at 320 px | Both recover; popup closes |
| Optional boundaries / Clear | Invalid Start10 with End8 → Clear End | R06–R07; symmetric Clear handler cases | Start-only valid state; cleared End empty |
| Independent errors remain errors | Invalid Feb30 or future Aug18 → change Start | R08–R09; handler cases | Raw invalid text retained, invalid boundary uncommitted |
| Current text and operation order | Replace invalid End then complete Start; still-reversed range; unfinished text | R10; handler cases | Final valid range recovers; remaining reversal stays invalid; text alone does not recover |
| Invalid commit releases its bound | Commit malformed opposite boundary after order error | Symmetric handler cases | Previous order error becomes valid partial; malformed source remains invalid; not separately browser-tested |
| Application focus policy stays unchanged | Enter repair, calendar completion, Clear across both boundaries | R02/R04 focus initiating input; R05 Start input; R07 End input; R11 End calendar button active | Matches base desktop/narrow return distinction; no opposite-field focus jump |
| Error and selection feedback | Recovery updates visible error, `aria-invalid`, range message | All recovery snapshots | DOM feedback agrees with final state; screen-reader speech not tested |

No new traversal code or DOM order was introduced. Full forward/reverse Tab traversal, actual mobile touch/IME, and assistive-technology announcements were not retested in this bounded change. Narrow layout evidence does not establish real software-keyboard behavior. Existing application records remain authoritative for their consumers; this draft is not an Invoice desk application coverage claim.

![Recovered range at 320 CSS pixels](narrow-recovered.jpg)

## Human decision still required

Accept or revise the proposed commit-time policy, especially the valid-partial result after Clear/invalid opposite input, then review the exact draft before any promotion. Build success, automated regression checks and this browser pass are supporting evidence only.
