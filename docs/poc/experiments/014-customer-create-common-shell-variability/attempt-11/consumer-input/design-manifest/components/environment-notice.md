---
type: UI Component
title: Environment notice
description: A concise product-supplied indication that the current environment materially changes user risk or behavior.
status: draft
source: authored
scope: Product shells that must distinguish a non-production, preview, training, or similarly consequential environment.
requires:
  - foundations/accessible-work-surface
---

# Guidance

Use an environment notice only when the product binding declares that the
current environment changes user expectations, available behavior, or the risk
of an action. For example, a non-production or training environment may need a
concise, persistent textual indication so users do not mistake it for the
production workspace. Keep the notice in the product shell or other stable
context region; it must not obscure task content or become an unrelated page
heading.

This is not a generic watermark. Do not add a large background word, logo, or
"demo" label merely to decorate a page, label a fixture, or consume unused
space. PoC provenance belongs outside the product canvas. If a visual mark is
purely decorative, it must not carry the only environment meaning and should
be ignored by assistive technology. An environment that matters must have a
discernible text label and cannot rely on color, opacity, or a background image
alone.

# Product boundary

The product binding owns whether an environment notice exists, its supplied
label and meaning, affected capabilities, visibility conditions, and any
environment-specific requirements. This guidance does not decide a product's
environment model, header placement, visual emphasis, persistence, CSS, DOM,
or framework.

# Relationships

Use with the [accessible work surface](../foundations/accessible-work-surface.md)
and [Drawer](drawer.md) only when the binding declares the notice.
