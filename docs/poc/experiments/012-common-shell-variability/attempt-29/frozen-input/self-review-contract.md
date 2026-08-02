# Generated common-shell self-review contract

Each Run reviews only its own generated files before reporting. It must record
the result of every check below. A failure remains evidence for the comparison;
the Run must not rewrite a previous Run or inspect another Run.

1. Confirm the full supplied parent row toggles its child region, the state
   chevron stays at the row's trailing edge, and the parent does not receive
   current-item treatment merely by expanding or collapsing.
2. Confirm each available Header icon-only control has a visibly bounded
   clickable surface in both Light and Dark themes.
3. Confirm the Drawer search field retains its ordinary field boundary and has
   a visible outer focus treatment when focused.
4. Confirm top-level bounded workspace content starts at the logical start edge
   of the workspace page grid, while the Header remains the shared fluid band.
5. Confirm the fixed fixture can select a leaf current destination, filter the
   supplied Drawer items, and scroll Drawer navigation separately from the
   workspace dummy content.
6. Confirm external images, fonts, scripts, and stylesheets are absent.

Record each observation, command, and limitation in `self-review.md` inside
the assigned output directory. Do not treat this self-review as human approval.
