# Generated common-shell self-review contract

Each Run reviews only its own generated files before reporting. It records the
observed before state, action actually performed, and observed after state for
every check below. A failure remains evidence for the comparison; the Run must
not rewrite a previous Run or inspect another Run.

1. Starting with the Drawer visible, activate the complete supplied parent row.
   Record the expanded child region and trailing chevron before and after.
   Record that disclosure changes only the parent expansion state and does not
   create, remove, or transfer the supplied current-item treatment. Then
   activate one supplied leaf item. Record that its full-row selection surface
   reaches from the Drawer’s physical left edge through the available row width,
   while the leaf label retains the same hierarchy start as its peer.
2. Observe the Header identity, each available Header icon-only control, and
   the workspace title and dummy-content text in Light and Dark, including
   every Drawer and theme glyph state exercised by the fixture. Record the
   theme, text region, control, glyph state, and observed result separately
   from the clickable boundary and focus treatment. Confirm that each visible
   text region and resting glyph is recognizable against its resolved surface
   without relying on hover, focus, tooltip, an inherited document foreground,
   or a shared style declaration.
3. Starting with the Drawer visible, activate `Close navigation`; record the
   Drawer region, supplied navigation content, boundary, reserved space,
   controller glyph, accessible name, tooltip, and workspace response before
   and after. Then activate `Open navigation` and record the same evidence.
   Pass only when the Drawer is clearly the region shown or hidden, the
   workspace remains the task region, and any workspace resize follows from
   the Drawer state.
4. Focus the Drawer search field and record its ordinary field boundary and
   visible outer focus treatment. Enter a supplied match, record the filtered
   hierarchy, then clear it and record the restored hierarchy.
5. Confirm top-level bounded workspace content starts at the logical start edge
   of the workspace page grid, while the Header remains the shared fluid band.
   Record Drawer-navigation scrolling separately from workspace dummy-content
   scrolling.
6. Confirm external images, fonts, scripts, and stylesheets are absent.

Record every observation, command, and limitation in `self-review.md` inside
the assigned output directory. Do not treat this self-review as human approval.
