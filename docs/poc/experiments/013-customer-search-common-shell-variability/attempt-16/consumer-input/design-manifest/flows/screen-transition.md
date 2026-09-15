---
type: UI Flow
title: Screen transition
description: Preserve task identity, context, focus, and outcome across an available destination change.
status: draft
source: authored
scope: Full-page and modal transitions in this pack.
requires:
  - foundations/accessible-work-surface
  - components/breadcrumb
---

# Guidance

Treat application hierarchy, visit history, task progression, and mutation as
different navigation responsibilities:

- A breadcrumb exposes supplied ancestors in a stable information hierarchy.
- Browser Back or an explicit return action revisits or restores a supplied
  task context.
- A Step indicator represents progress through a stable multi-step task.
- A button performs a mutation or other in-place action; a link navigates to a
  destination.

Do not turn a record-lifecycle example into the universal transition model.
Every initiated transition needs a supplied destination, triggering link or
action, and resulting task identity. An origin may be absent for direct entry,
a bookmark, or an external link. Do not invent routes or use presentation
settings as destinations.

On a full-page transition, update the screen title and main heading and place
focus at the start of the new task according to the implementation's
accessibility contract. When a stable hierarchy exists, place the Breadcrumb
below global Header/navigation and above the page title. Its linked ancestors
move up that hierarchy; they are not a list of visited screens.

Preserve query, page, selection, scroll, draft, or return context only when the
binding supplies it. Use an explicit return action when restoring that context
is part of the task, and do not show it beside Breadcrumb by default. Before a
breadcrumb or return action leaves create or edit with material unsaved state,
preserve a supplied draft or apply the abandonment confirmation contract.
Browser Back must not repeat a one-time mutation.

For a modal transition, follow the dialog focus and dismissal contract. After
an asynchronous mutation, keep the initiating geometry stable, announce the
supplied outcome, and move focus only when task continuation requires it.

# Product boundary

Hierarchy, ancestor labels and destinations, routes, permissions, context
tokens, mutation semantics, history behavior, titles, announcements, and
post-action destinations are product-owned.

# Implementation boundary

History API use, URL shape, breadcrumb separator and overflow, scroll
restoration mechanics, sticky page-header behavior, router, CSS, and framework
are implementation decisions. None of them authorizes a missing hierarchy or
destination.
