---
type: UI Component
title: Pagination
description: A continuation control for a product-declared result set.
status: draft
source: authored
scope: Result sets whose product binding declares a pageable state.
requires:
  - foundations/layout-panes
  - configuration/record-list-options
---

# Guidance

Place pagination with the result set it continues and keep its relationship to the current result context clear. A count presentation may summarize a product-declared aggregate, but does not define its meaning or calculate it. Preserve query and list context when the product supplies a pagination state.

For this pack's ordinary result-list pagination, show the current page as its
plain page number together with Previous and Next controls. Do not prefix that
number with `Current`, `現在`, or equivalent state copy. Do not render
neighboring page-number buttons or direct page jumps by default. Those controls
require a product-declared random-access page model, page range or total, and
available destinations; a static fixture must not invent them. Keep pagination
directly below its Grid as a full-width continuation footer of the same result
pane. Its outer inline width matches the Grid; the compact continuation controls
retain their natural width inside that footer. Use the existing
`pagination_region` setting only to resolve those controls' logical alignment
inside the footer.

# Selection conditions

Use only when the binding declares pageable results. Omit the control and any count presentation when the necessary aggregate or state is absent.
