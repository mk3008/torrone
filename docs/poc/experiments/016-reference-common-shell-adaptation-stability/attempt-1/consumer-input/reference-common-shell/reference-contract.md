---
type: PoC reference contract
title: Reference-first common shell contract
status: proposed for human review
source: authored from selected reference evidence
---

# Reference-first common shell contract

## Purpose and boundary

This is a minimal test of whether an approved, runnable reference plus a small
set of named decisions can communicate a reusable application shell. It does
not alter or supersede the Design Manifest. A consuming product still owns its
requirements, accessibility obligations, product data, permissions,
destinations, and implementation choices.

The reference covers only:

- an application Header;
- a Drawer with representative navigation;
- the Drawer-visible and Drawer-hidden states and their Header control;
- a main workspace region; and
- enough current-location, disclosure, palette, focus, and scroll states to
  make the shell observable.

It does not define a screen pattern, real navigation, route model, business
content, responsive policy, persistence, animation, a component API, or a
framework integration.

## Provenance and selection rationale

The source is [Attempt 23 Run 1](../012-common-shell-variability/attempt-23/runs/run-1/index.html?drawer=open&theme=light), the product-owner-selected common-shell reference. Its selection record preserves the source file digests and states that the selection is not a retroactive change to the frozen Manifest or experiment output.

| Source evidence | Why it is adopted here | Reference mapping |
| --- | --- | --- |
| Attempt 23 Run 1 Header | Selected evidence shows a persistent shell owner and a directionally meaningful Drawer control. | Header with a labelled open/close control and the palette demonstration control. |
| Attempt 23 Run 1 Drawer | Selected evidence shows a normal navigation field, hierarchy, full-row current treatment, and a leading selection indicator. | Representative Drawer fixture with search, disclosure, and current location. |
| Attempt 23 Run 1 scroll states | The completed check and capture record establish separate Drawer and workspace scrollports. | Independently scrollable navigation and workspace regions with deliberately long fixture content. |
| Attempt 23 Run 1 hidden state | Selected captures show that hiding the Drawer removes its track. | Drawer is absent from layout while hidden; the workspace fills the body. |

Attempts 29–34 are intentionally not merged into this Reference. The checkpoint
records them as incomplete evidence: Attempt 29 preserved a missing independent
scroll behavior, Attempts 30–33 exposed incomplete capture or evidence paths,
and Attempt 34 had missing Dark Header glyphs in Run 2. None has a final
human-review approval. They remain diagnostic history, not an adoption source.

## Decision classes

The classes describe the intended outcome, not a prescribed implementation.

| Class | Decisions for this reference |
| --- | --- |
| **Invariant** | Keep an identifiable application Header available while the workspace scrolls. Provide a perceivable, labelled control that changes Drawer visibility and communicates the next action. When hidden, the Drawer must not leave a blank navigation track. Keep Drawer navigation and workspace vertical scrolling independently usable when both need overflow. Represent the supplied current location with a full-row treatment, a non-colour cue, and the same hierarchy alignment as peers. Keep interactive controls keyboard-focusable with a visible focus indication. |
| **Default** | Prefer a Header above a left-side Drawer and a remaining workspace pane. Prefer a compact, ordinary search field before navigation when navigation search is supplied. Prefer semantic Light and Dark palettes for the whole shell. Prefer a disclosure control that preserves the current destination while a group is collapsed and re-expanded. |
| **Parameter** | The initial Drawer state; whether a palette chooser is available; the active palette; workspace name; supplied navigation hierarchy, labels, icons, and current destination; whether search is supplied; and neutral content used to demonstrate overflow are explicit product or reference inputs. This page exposes `drawer` and `theme` URL parameters only to make two state dimensions directly viewable. |
| **Freedom** | HTML element choices, DOM shape, CSS architecture, dimensions, breakpoints, animations, icon source, framework, routing, state storage, query-string handling, focus management details, screen-reader wording, data loading, and test tooling remain with the implementation and product. |

## Rational deviations

Deviation is reasonable when a product requirement, accessibility need,
platform convention, or operational constraint makes one of the defaults less
effective. Preserve the relevant invariant or record why it cannot apply. For
example, a responsive product may use an overlay or a different Drawer edge;
a product without a selectable palette may omit the palette control; and a
flat navigation model may omit disclosure. Do not treat this fixture's labels,
numbered workspace cards, query parameters, or literal geometry as a reason to
override product evidence.

## Verification guide

Use the browser and this document together. The Reference is successful only
when a reviewer can state the outcome to retain without treating its source as
a copy-paste specification.

| Verification area | Check |
| --- | --- |
| Structure | One application Header, one complementary navigation region when open, a navigation landmark, and one main workspace are identifiable. Hiding the Drawer removes the complementary region from the layout without removing the Header or main workspace. |
| Visual | With the Drawer open, Header, Drawer, and workspace are distinct surfaces. With it hidden, the workspace uses the former Drawer area. The current row is distinguishable by full-row surface and a leading indicator, rather than colour alone. Palette changes cover the whole shell. |
| Operation and meaning | The Drawer control has a meaningful next-action label and toggles visible/hidden state. Navigation search filters the fixture without a submit action and shows a no-match state. Disclosure preserves the stored current destination. Header remains in view while workspace content scrolls; Drawer and workspace can retain different scroll positions. Keyboard focus is visible. |

The local check script provides a repeatable static floor. Browser review is
still necessary for the visible and interactive checks. This PoC makes no
claim about assistive-technology announcements, responsive quality, persisted
preferences, actual navigation, or production readiness.
