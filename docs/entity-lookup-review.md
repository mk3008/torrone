# Entity Chooser Dialog — Issue #28 review record

The [draft Reference](../references/entity-lookup.md) is a standalone parent-and-dialog fixture, not a consuming application. It has no application-specific shared interaction record to claim. A consumer must apply its own navigation, form submission and cross-control requirements before asserting application coverage.

| Path | Browser evidence | Remaining boundary |
| --- | --- | --- |
| ID/name, region and type combined filtering; comparison and empty recovery | Real textbox/select changes and six visible fixture rows in Chromium, Firefox, WebKit and mobile Chromium | Local fixture only; no remote search, paging or latency |
| Pending choice, condition change, explicit Select and parent commitment | Native radio actions and disabled Select assertions | No persistence or host form submission |
| Cancel, Close, Escape, Clear and replacement | Modal exit paths, focus return and reopening reset | Host-specific focus policy needs composed-screen review |
| Tab/Shift+Tab, radio arrows/Space and action activation | Native desktop keyboard steps across the added conditions; no injected focus | Actual assistive technology and physical keyboard remain unverified |
| Stable desktop outer geometry and internally scrolling results; mobile fullscreen layout | Bounds across 6 → 2 → 0 → 6 actual results, overflow measurement and mobile touch at two heights | Real phone keyboard, browser chrome and IME remain unverified |

`tests/browser/entity-lookup.spec.cjs` runs in the existing pinned browser Gate. `tests/check-entity-lookup.cjs` is a handler-only supplement. CI results belong to the exact commit; passing checks do not approve the design.

Issue #21 and PR #26 established the prior dialog operation and fixed its changing outer geometry. This candidate changes that dialog's responsibility to a multi-condition chooser under Issue #28. Review whether the additional conditions and result columns justify a modal, whether comparison and explicit confirmation help the parent task, and whether the boundary with a full Search Screen is clear. Keep the curation entry draft until human review accepts this specific version.
