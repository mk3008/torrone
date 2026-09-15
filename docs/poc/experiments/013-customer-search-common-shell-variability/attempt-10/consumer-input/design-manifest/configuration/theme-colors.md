---
type: UI Configuration Definition
title: Theme colors
description: Editable concrete Light and Dark values for the pack's fixed semantic color roles.
status: draft
source: authored
scope: foundations/color-and-theme and every component or screen pattern that consumes a semantic color role.
---

# Source of truth

[`theme-colors.default.yaml`](theme-colors.default.yaml) is the canonical
default palette. It defines the same required semantic roles for `light` and
`dark`; every value is an opaque six-digit hexadecimal color.

These values are intentionally editable by a manifest consumer. They are
maintainable defaults for this business-app pack, not claims that one palette
is universally correct. Editing the manifest is distinct from giving every
application user an arbitrary color picker.

# Semantic roles

| Role ID | Stable meaning |
| --- | --- |
| `page_background` | Base work-surface layer behind contained content. |
| `surface_background` | Raised or grouped content surface. |
| `table_header_background` | Distinct result-grid column-header surface. |
| `table_header_foreground` | Readable result-grid column-header content. |
| `text_primary` | Primary readable content on page and surface layers. |
| `text_muted` | Supporting readable content on page and surface layers. |
| `border_subtle` | Decorative separation that is not required to identify a control. |
| `border_interactive` | Boundary required to identify an interactive control. |
| `action_background` | Filled primary-action surface. |
| `action_foreground` | Content shown on the primary-action surface. |
| `link` | Text link and navigation action content. |
| `selection_background` | Selected-item surface. |
| `selection_foreground` | Content shown on the selected-item surface. |
| `selection_indicator` | Non-text accent that reinforces a selected item. |
| `focus_ring` | Visible keyboard-focus indicator. |
| `success_foreground` | Success text or required non-color cue. |
| `success_background` | Supporting success surface. |
| `information_foreground` | Informational text or required non-color cue. |
| `information_background` | Supporting informational surface. |
| `warning_foreground` | Warning text or required non-color cue. |
| `warning_background` | Supporting warning surface. |
| `error_foreground` | Error text or required non-color cue. |
| `error_background` | Supporting error surface. |

Role IDs and meanings remain identical in both modes. Components reference
roles, never mode-specific literal colors.

# Local editing and resolution

Start with the complete canonical palette, then apply zero or one selected
theme-color override such as
[`theme-colors.example.yaml`](../../local-overrides/theme-colors.example.yaml).
Each supplied leaf replaces one complete scalar value. An omitted role retains
the canonical default.

Reject an unknown mode or role, a missing canonical role, a duplicate role, an
empty value, `null`, a value outside `#RRGGBB`, or more than one selected
theme-color override before application. A record-list override and one
theme-color override may coexist because they resolve against separate
definitions; multiple overrides for the same definition conflict.

The local override may change values only. It cannot add a palette, role,
state, action, product capability, or theme-selection control. It also cannot
change fixed Markdown guidance or product binding.

# Verification

After resolution, verify at least:

- primary and muted text against every page or surface on which they appear:
  `4.5:1`;
- action foreground against action background: `4.5:1`;
- link against its page and surface backgrounds: `4.5:1`;
- selection foreground against selection background: `4.5:1`;
- every status foreground/background pair: `4.5:1`;
- interactive borders against adjacent page and surface layers: `3:1`;
- selection indicator against selection background: `3:1`; and
- focus ring against adjacent page and surface layers: `3:1`.

`border_subtle` may be lower contrast only where the boundary is decorative.
Do not use it where a control or state would become unidentifiable. Color alone
must not carry selection, focus, status, validation, or action meaning.

# Compatibility

Clarifying a role description without changing its meaning is compatible.
Changing a concrete default requires review because it changes the visual
baseline. Adding, removing, renaming, or repurposing a role, changing the
allowed notation, or changing a contrast obligation is a contract change that
requires an explicit migration or rejection instruction.

The current `theme_color_contract_version` is `2`: version `2` adds the
result-grid header roles. Consumers updating from version `1` must supply both
new roles for every supported mode, or retain the canonical defaults.

# Responsibility boundary

The product binding owns whether users may choose a mode, which preferences are
available, the initial preference source, persistence, and brand constraints.
The Header or host shell owns whether and where a selection control appears,
its caption or icon, and its interaction model. The implementation owns CSS
variable names, loading, and system-preference integration. None of those
layers may silently replace these resolved color values.
