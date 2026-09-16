# Entity lookup correction — Issue #21

Based on main `26baca8` including PR #23's removal of historical PoC 018 from the active review surface. That boundary and the owner's Reference lifecycle edits are retained. Exact changed sources are identified by the implementation PR commit and generated review-build.json; earlier mobile review evidence is not evidence for this new version.

## Coverage

Policy source: [Entity lookup draft](../references/entity-lookup.md), proposed under Issue #21. Shared rules: [Application interaction requirements](application-interaction.md). No existing approved Entity entry was found. No application-wide policy is inferred from this fixture.

| Path and expected result | Evidence | Limit |
| --- | --- | --- |
| ID/name filter, empty and whitespace/case handling | `node tests/check-entity-lookup.cjs` passes | Deterministic handler fixture |
| Either record commits its own ID/name; changing pending choice replaces it | Same regression | Native radio exclusivity supplied by HTML; fixture models it |
| Query changes clear pending choice and disable Select | Same regression, including attempted disabled confirmation | Browser event delivery not established |
| Cancel/Close/Escape retain committed selection, reopen resets pending selection | Same regression, all three paths | Focus calls checked; native modal focus containment unverified |
| Clear then reopen/reselect; focus returns to trigger | Same regression | Actual Tab/Shift+Tab traversal unverified |
| Native radio arrows/Space and action Enter/Space; title-first mobile opening; fullscreen footer/results | Source uses native controls and retained mobile layout | Browser/phone verification pending |

The active Cloud browser previously explicitly blocked the local-preview URL by security policy during Issue #5. No workaround or alternate browser route is attempted. These handler checks are not browser or phone tests. Before adoption, operate both results by pointer and keyboard, reverse Tab across controls, cancel a replacement via each exit, filter to zero then back, and confirm mobile footer/results remain reachable with the keyboard visible.

## General policy finding

This example supports a bounded rule: cheap local interaction semantics must work even when external I/O is mocked. A single two-record fixture suffices; no API or simulation framework is needed. The authoritative wording is proposed in references/README.md and remains subject to this PR's review. Harness guidance is conditional; no state-injection harness was needed or validated here. A harness-only transition must never stand in for this example's real filtering/confirmation.

No new unrelated GUI findings were opened. Native browser verification and human adoption remain explicit review limits of Issue #21, not claims of completion.
