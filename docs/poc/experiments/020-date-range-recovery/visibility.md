# Conditional textbox visibility correction

Owner clarification: visible textboxes remain stationary; measured clipping permits the minimum scroll correction. This is an application-wide textbox rule, not a calendar feature. Earlier scroll-correction evidence remains historical; unconditional scrolling and dynamic padding remain removed.

The generic handler compares editable text input/textarea and associated-label geometry with the visual viewport, uses an 8px clearance, and scrolls only the missing distance. If the group cannot fit, the editor has priority. Viewport-taller editors are skipped to avoid oscillation. Focus/value never change. Pointerdown blocks correction; focusout cancels pending work. No timed retries or padding changes exist.

`node tests/check-text-entry-visibility.cjs` executes the actual helper with controlled geometry: visible no-op, 22px lower-edge correction, upper clipping, pointer no-op, stale focus cancellation and unknown embedding no-op. Existing date entry, recovery and static handoff checks pass. Standalone desktop browser evidence in visibility-browser.json records visible Start/End focus and outside click at scrollY=0 with no focus transfer. Actual phone software keyboard behavior remains unverified.

## Host limitation

The photographed ChatGPT viewer embeds the site. The child's own VisualViewport cannot reliably describe outer keyboard occlusion. The handler skips embedded windows rather than guessing. It therefore does not claim to fix the photographed overlap inside ChatGPT. Standalone opening can use the correction; embedded support requires an advertised host viewport/scroll integration unavailable in this repository. Standalone scrolling is also constrained by available document scroll range; no arbitrary padding is introduced. Viewport-taller textarea caret visibility is outside this bounded example.

Exact current identity: visibility-identity.json. Human review remains required.

## Direction follow-up

Owner reported unwanted backward scrolling. The execution guard now ignores negative/zero correction deltas regardless of visibility calculation, retaining positive lower-edge correction. The regression expects no movement for a negative upper-edge result and still verifies a positive 22px adjustment. Entry and recovery checks pass. This supersedes the earlier upper-clipping expectation; no new phone verification is claimed. Current identity: visibility-direction-identity.json.
