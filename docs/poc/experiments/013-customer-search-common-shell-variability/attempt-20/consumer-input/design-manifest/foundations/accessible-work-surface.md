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

Show a visible focus indicator that remains distinguishable and unobscured.
Do not move the focused or triggering control when nearby validation, selection,
or progress feedback appears. Keep likely recovery actions close to the error
or state they resolve.

Do not communicate status, selection, validation, required state, progress, or
data meaning by color alone. Provide text, shape, position, or another
programmatically available cue. Keep text and controls usable under the
applicable zoom, reflow, contrast, target-size, and motion requirements.

Announce an asynchronous outcome when the product supplies one, without moving
focus merely to announce it. When navigation or a modal transition changes the
task context, move focus only according to the applicable transition or dialog
contract.

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
