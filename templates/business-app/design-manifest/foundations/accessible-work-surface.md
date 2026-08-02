---
type: UI Foundation
title: Accessible work surface
description: Cross-screen accessibility guidance for perceivable state, keyboard operation, focus, and recovery.
status: draft
source: authored
scope: Interactive business-app screens in this pack.
---

# Guidance

Use native semantic elements and a predictable heading and landmark structure.
Give every interactive control a discernible name, keep the visible label in
that name, and preserve a logical reading and focus order. All available
operations must be keyboard reachable without a trap.

Use one visible focus treatment across this pack. This focus indicator appears
on `:focus-visible`: retain the control's ordinary border and draw the resolved
`focus_ring` as a separate outer halo, with a visible gap between the border
and ring. Do not replace the border with the ring or draw the ring on top of
it. Apply this treatment to text inputs, buttons, icon-only controls,
navigation nodes, disclosure controls, and every other keyboard-reachable
control. Do not move the focused or triggering control when nearby validation,
selection, or progress feedback appears. Keep likely recovery actions close to
the error or state they resolve.

Do not communicate status, selection, validation, required state, progress, or
data meaning by color alone. Provide text, shape, position, or another
programmatically available cue. Keep text and controls usable under the
applicable zoom, reflow, contrast, target-size, and motion requirements.

Announce an asynchronous outcome when the product supplies one, without moving
focus merely to announce it. When navigation or a modal transition changes the
task context, move focus only according to the applicable transition or dialog
contract.

# Verification

Confirm that each keyboard-reachable control has a discernible name and shows
the shared focus treatment when focused without replacing its ordinary boundary
or moving the control. Confirm that a selected, validation, progress, or status
state has a visible cue in addition to color.

Keyboard traversal, focus movement after a transition, announcements, reflow,
and assistive-technology behavior require an available interactive browser or
equivalent execution environment. If that environment is unavailable, record
those outcomes as `not verified` rather than inferring them from static HTML or
a screenshot.

# Product boundary

The product binding owns business labels, validation rules, error messages,
status meanings, announcements, time limits, authentication, and any
task-specific accessibility requirement. The implementation owns semantic
markup, keyboard support, focus behavior, contrast verification, reflow,
reduced-motion behavior, and assistive-technology testing.

# Evidence limit

A static HTML fixture can demonstrate labels, reading order, visible focus,
non-color state cues, and error placement. A screenshot cannot prove keyboard,
focus movement, announcements, reflow, or assistive-technology behavior.
