# Inline Entity lookup — Issue #27 review record

This is a standalone draft Reference, not a consuming application. Its proposed local interaction policy is in [curation](../references/entity-lookup-inline.md). There is no application-specific shared interaction source or approved Entity lookup contract to claim. A consumer must supply its own application policy and verify cross-control navigation, form submission, scroll and mobile keyboard behavior.

| Path | Browser evidence | Remaining boundary |
| --- | --- | --- |
| Empty focus, ID/name filtering, no results and recovery | Native input and popup assertions in Chromium, Firefox, WebKit and mobile Chromium | Fixed three-record fixture; no remote search or loading |
| Pointer selection, committed name/ID and clear/reselection | Real pointer/touch actions and focus checks | Touch emulation does not reproduce a physical software keyboard |
| Arrow keys, Enter, Escape, Tab, committed replacement and outside dismissal | Native keyboard and focus assertions in desktop engines | Application-specific form and neighboring controls require composed-screen review |
| Narrow popup visibility and scrolling | Mobile viewport bounds at two heights, including the above-field placement when below space runs out | Real phone/browser chrome and IME remain unverified |

The browser Gate runs `tests/browser/entity-lookup-inline.spec.cjs` with the existing pinned Playwright setup. A passing Gate establishes these observable paths for its commit, not accessibility coverage with assistive technology or human design acceptance. The owner should review both this inline candidate and the separate dialog model, particularly the tentative-search restore behavior and whether the name plus ID presentation is sufficiently clear. Record acceptance, rejection or follow-up on Issue #27; keep the curation entry draft until explicit approval.
