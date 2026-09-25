# Entity Chooser Dialog — Issue #28 review record

The [draft Reference](../references/entity-lookup.md) is a standalone parent-and-dialog fixture, not a consuming application. It has no application-specific shared interaction record to claim. A consumer must apply its own navigation, form submission and cross-control requirements before asserting application coverage.

| Path | Browser evidence | Remaining boundary |
| --- | --- | --- |
| ID/name, region and type combined filtering; comparison and empty recovery | Real textbox/select changes and six visible fixture rows in Chromium, Firefox, WebKit and mobile Chromium | Local fixture only; no remote search, paging or latency |
| Pending choice, condition change, explicit Select and parent commitment | Native radio actions and disabled Select assertions | No persistence or host form submission |
| Cancel, Close, Escape, Clear and replacement | Modal exit paths, focus return and reopening reset | Host-specific focus policy needs composed-screen review |
| Tab/Shift+Tab, radio arrows/Space and action activation | Native desktop keyboard steps across the added conditions; when Firefox includes an overflowing result region as a Tab stop, the test checks that stop and the subsequent radio | Actual assistive technology and physical keyboard remain unverified |
| Desktop result-first allocation and stable geometry | Bounds across 6 → 2 → 0 → 6 actual results; compact header/conditions/footer stay fixed, several whole rows fit at 1280×800, result area uses remaining height and scrolls | Smaller desktop viewports may show fewer rows; this fixture does not define an exact pixel target |
| Mobile fullscreen allocation | Shell, conditions, result and action bounds at 390×640 and 390×400, with touch operation | Real phone keyboard, browser chrome and IME remain unverified |

`tests/browser/entity-lookup.spec.cjs` runs in the existing pinned browser Gate. `tests/check-entity-lookup.cjs` is a handler-only supplement. CI results belong to the exact commit; passing checks do not approve the design.

Issue #21 and PR #26 established the prior dialog operation and fixed its changing outer geometry. This candidate changes that dialog's responsibility to a multi-condition chooser under Issue #28. The owner's [layout finding](https://github.com/mk3008/torrone/pull/30#issuecomment-5832765741) calls for compact desktop chrome, a result-first region and separate mobile fullscreen allocation; the current draft makes that relationship visible without making incidental dimensions normative. Review whether the additional conditions and result columns justify a modal, whether comparison and explicit confirmation help the parent task, and whether the boundary with a full Search Screen is clear. Keep the curation entry draft until human review accepts this specific version.
