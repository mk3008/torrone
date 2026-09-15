---
type: UI Design Manifest variability map
title: Fixed and variable responsibility map
description: A discoverable summary of fixed guidance, product-owned variables, and implementation decisions.
status: draft
source: authored
scope: All foundations, components, screen patterns, and flows in this standard pack.
---

# Reading the map

Fixed guidance expresses the stable task or interaction responsibility supplied
by this pack. Product-owned variables must come from product binding,
requirements, or running implementation; a fixture cannot invent them.
Implementation decisions may vary without changing the semantic contract.

The five IDs in
[Record-list options](configuration/record-list-options.md) remain the complete
record-list configuration vocabulary. [Theme colors](configuration/theme-colors.md)
is a separate bounded configuration: it allows concrete values for the fixed
Light and Dark semantic roles to change without adding roles, modes, or product
capabilities. No other row below creates a setting.

# Foundations

| Area | Fixed guidance | Product-owned variables | Implementation decisions |
| --- | --- | --- | --- |
| Layout panes and alignment | Use two pane behaviors: bounded for coherent reading/entry tasks and fluid for dense collection work. Resolve every `start`/`center`/`end` inside the pane owning the task; toolbars are full-width rows of that pane while their control groups retain natural width. Compose a search screen from bounded conditions followed by a fluid result pane. | Which task regions exist, their content, and the existence/scope of their actions. | Grid span, maximum measures, gutters, breakpoints, CSS, DOM, framework. |
| Compact work surface | Preserve scanability with a supplied importance hierarchy, bounded reading measure, alignment, and restrained spacing before borders or containers; keep single-line controls aligned. | Applicable density needs, content priority, user tasks. | Spacing scale, typography, reading width, control-height token, concrete breakpoints. |
| Accessible work surface | Semantic names, keyboard reachability, visible focus, non-color cues, recovery. | Labels, errors, status meaning, time limits, task-specific requirements. | Markup, key handling, focus logic, contrast/reflow/AT verification. |
| Color and theme | Both light and dark modes are required; page/surface, result-grid header, primary/muted text, subtle/interactive border, action, link, selection, visible focus, success, information, warning, and error roles keep stable meaning; concrete `#RRGGBB` defaults are locally editable; brand and status remain separate; color is not the only cue. The supported mode policies are `light-only`, `dark-only`, and `selectable`; the selectable default is Light. | Theme identity, selected mode policy, user-selection capability, initial-preference source when it differs from Light, persistence, brand constraints, additional requirements. | CSS variable names, theme loading, system preference integration. |

# Components

| Area | Fixed guidance | Product-owned variables | Implementation decisions | Formal configuration |
| --- | --- | --- | --- | --- |
| Header | Use the default shared-shell region to identify the product/workspace; keep an available Drawer controller in its leading area and do not duplicate the page title. Consume `surface_background`, `text_primary`, and `border_subtle` on the Header itself, rather than an invented Header color or inherited cross-mode foreground. Put an available two-state theme command at its logical end without a visible `Theme` caption. | Workspace identity, approved alternative shell, available global controls, Drawer availability/state, theme-selection capability and preference. | Height, sticky behavior, responsive treatment, control geometry, icon shape, CSS, DOM, framework. | None |
| Drawer | Separate navigation from workspace; distinguish visibility from hierarchy; omit hidden residual space. | Existence, items, hierarchy, routes, current destination, permissions, visibility, persistence. | Width, animation, CSS, DOM, breakpoint treatment. | None |
| Page header | Use one page title for the current task/destination; use a description only when it adds supplied task context; do not manufacture a decorative category line. | Title, description, actual classification, page actions, record identity, hierarchy, destinations, permissions. | Title size, action alignment, sticky behavior, CSS, DOM, framework. | None |
| Environment notice | Show a persistent textual environment indication only when it changes user expectations or action risk; do not use a decorative watermark as the only cue. | Existence, label, meaning, affected capabilities, visibility conditions, environment requirements. | Shell placement, visual emphasis, persistence, CSS, DOM, framework. | None |
| Breadcrumb | Show supplied ancestors in stable hierarchy order below global navigation and above the page title; do not represent visit history or wizard progress. | Hierarchy availability, ancestor identities, labels, order, destinations, current page, separate return context. | Separator, overflow, truncation, compact-width and sticky-header mechanics, CSS, DOM. | None |
| Search conditions | Bound one search task in a bounded condition pane; show a concise unboxed group caption, add a description only when it supplies needed context, and keep Search/Clear responsibilities explicit in a separate full-width condition-pane action row. By default align this in-page form action group at the pane's logical start and apply its resolved order. | Fields, values, validation, action capability, labels, query behavior. | Control layout, bounded-pane measure, CSS, framework. | Action region and complete action order |
| Result grid | Support dense comparison in its fluid result pane; use a tone-distinct header with horizontal row separators and the resolved table-header roles above a `surface_background` body, omit vertical cell dividers and decorative frames by default, and keep one declared attribute per ordinary cell. Keep the title and product aggregate count adjacent on the first summary line; omit a query summary unless the binding supplies an applied-query meaning, then place it below. Keep sort in its column header; distinguish selection without synthetic status copy; prefer a leading primary-identity link for one frequent record-opening operation. When horizontal scroll is necessary, pin only the minimal leading selection/identity context strip (one or two columns) and separate it with the same row-separator token and thickness; add a subtle shadow only while content scrolls behind it. Pin one logical-end action column only when the binding requires it to remain available. A collection-scoped Add action belongs at the logical end of a Grid-width result toolbar and uses lower emphasis when Search is already primary; page-scoped actions belong in the page header. | Columns, values, sort/select capabilities and state, row identity, row destination, exact pinned column members, always-available end-action requirement, result-action scope and hierarchy, applied-query summary meaning. | Column widths, result-pane maximum, filler columns, sticky CSS mechanics, DOM. | Row-action presentation; shared result count and pagination placement |
| Result card | Support identity-oriented summaries; separate selection from detail; do not stretch an incomplete final row. | Identity, title, summary, metadata, selection, destination, media, status, actions. | Card width, column count, gap, CSS, DOM. | None |
| Pagination | Continue one declared result set with a plain current-page number plus Previous and Next controls by default; do not invent a page range, direct page jumps, or `Current`/`現在` state copy. Keep a Grid's continuation footer the Grid width; resolve the compact controls within it. | Paging capability, current position, totals, labels, destinations, random-access page model, loading state. | Concrete control composition and CSS. | Pagination region |
| Status badge | Add a concise non-color state cue only when a state is supplied. | State inventory, label, meaning, severity, transition source. | Shape, icon, color, CSS. | None |
| Record fields | Read-only desktop details use compact left-caption rows when captions are short and stack on narrow or long-caption surfaces; create/edit labels sit above controls; full-page field flows remain directly on the host surface, with unboxed groups expressed by spacing rather than panel fills or rules; format help is concise, persistent, and action-oriented; selectively required fields use one per-label error-colored textual Required token and no asterisk legend; read-only values are content; only explicitly related editable fields may share a row; single-line controls align. | Field inventory, labels, order, importance, related-field groups, types, required state, values, validation, permissions, sensitivity. | Read-only caption width and reading measure, concrete control height, widths, breakpoints, CSS, framework. | None |
| Dialog | Contain one bounded blocking task with explicit entry, dismissal, and return-focus responsibilities. | Modal availability, title, content, actions, dismissal, pending/failure state, affected object. | Dimensions, overlay, animation, focus implementation, CSS, DOM. | None |
| Confirmation | Name the action and material consequence; provide a safe alternative; keep pre-action confirmation separate from outcome. | Consequence, impact, reversibility, identity, action availability, outcome. | Concrete container and visual treatment. | None |
| Step indicator | Orient a stable linear task of three or more pre-submit user steps without becoming implicit navigation; do not predict post-submit success as a pending `Complete` step. | Steps, labels, order, current state, revisitability, branching meaning, per-step completion. | Orientation, connectors, CSS, DOM. | None |
| Dashboard panel | Answer one operational question with clear unit, time, freshness, state, and destination. | Metric/queue/trend data, calculation, threshold, filters, priority, destination, states. | Chart type within supplied meaning, dimensions, CSS, framework. | None |

# Screen patterns and flows

| Area | Fixed guidance | Product-owned variables | Implementation decisions | Formal configuration |
| --- | --- | --- | --- | --- |
| Search with grid | Combine search and dense comparison; keep list context when opening a record. | Search schema, result data, capabilities, destinations, empty/loading/failure states. | Screen composition within linked component contracts. | Uses the five record-list options |
| Search with cards | Combine search and identity-oriented browsing; do not treat cards as a grid display mode. | Search schema, record summaries, capabilities, destinations, states. | Screen composition within linked component contracts. | None |
| Record read | Present one supplied identity and compact read-only key/value groups without spreading unrelated fields across equal-width cells; keep one restrained summary-card-like surface when the workspace needs separation, use left captions for short-caption desktop scanning and stacked captions when space or content requires them, and keep supplied non-finalizing actions in a reachable page header; do not imply Edit or Delete. | Identity, fields, values, importance, promoted facts, visibility, freshness, available actions, return destination. | Caption width, reading measure, secondary-metadata treatment, responsive stacking, sticky/collapsing header mechanics, CSS. | None |
| Record create | Start from supplied empty/default values; use the single-column default; keep unboxed field groups and a dedicated bottom form-action toolbar; align Create then safe cancellation at the bounded form pane's logical start in source/visual/Tab order. | Schema, defaults, related-field groups, validation, permissions, persistence, outcome, destinations. | Toolbar persistence/scroll mechanics, physical edge in bidirectional layouts, form width, CSS. | None |
| Record edit | Preserve identity and current values without an ambiguous banner; use the single-column default; keep unboxed field groups and a dedicated bottom form-action toolbar; align Save then cancellation at the bounded form pane's logical start in source/visual/Tab order; expose conflicts. | Editable schema, values, related-field groups, validation, permissions, concurrency, persistence, destinations. | Toolbar persistence/scroll mechanics, physical edge in bidirectional layouts, form width, CSS. | None |
| Record delete | Confirm one identifiable destructive action and supplied consequence. | Availability, permission, consequence, impact, reversibility, execution, outcome, destination. | Confirmation presentation and CSS. | None |
| Wizard | Use only for a stable linear task; keep ordinary Back/advance, pre-submit Review, explicit final action, and post-submit Result distinct. | Steps, questions, validation, branching, persistence, review and Change destinations, advance/final action labels, submission, pending state, outcome, recovery, destinations. | Step layout and CSS. | None |
| Dashboard | Prioritize supplied exceptions and next tasks; keep metrics, queues, and trends distinct. | Purpose, panels, priority, data, freshness, filters, relationships, states, destinations. | Grid, chart rendering, CSS, framework. | None |
| List/Card to detail | Connect an available record-opening role to a supplied detail destination. | Capability, destination, return context. | Navigation mechanism. | None |
| Record lifecycle | Keep read, create, edit, and delete as separate task states. | Available transitions, permissions, state, outcomes, destinations. | Routing mechanism and state transport. | None |
| Screen transition | Distinguish hierarchy, history/return, step progress, navigation, and mutation; preserve only supplied context. | Origin, destination, hierarchy, ancestor labels, history, focus target, context restoration, failure recovery. | Router, URL shape, breadcrumb overflow, scroll restoration, animation, framework. | None |
| Wizard progress | Preserve values and validation across supplied steps; treat Review as the final numbered step when supplied, final submission as its action, and Result as a separate post-submit state. | Step graph, validation, persistence, final action, pending state, outcome, recovery, completion destination. | State and routing implementation. | None |

# Change boundary

Changing a fixed responsibility changes the guidance contract. Changing a
product-owned value changes the application input. Changing only an
implementation decision does not authorize a semantic change. Moving any item
between these columns requires explicit compatibility and migration review;
local overrides cannot perform that move.
