# Attempt 5 — human hover review request

## Decision requested

For each final React artifact, inspect one **unselected** navigation item in
both light and dark themes. Confirm that the visible hover treatment is
discernible from the normal row and does not impersonate the selected-row
treatment. Record a mismatch by Run and theme; do not infer an implementation
failure without that observation.

This is the only remaining human acceptance gate. Header, Drawer, main
workspace, theme switching, fixed SVG assets, currentColor visibility,
selection, active indicator, focus-visible, and independent scroll regions
have already been reviewed to the extent stated in the individual reports.

## Open the artifacts

Each is a Vite application and must be served over the fixed local HTTP origin,
not opened as a `file:` URL. Start **one Run at a time** from its artifact
directory with `npm run dev`, then open the relevant URL at
`http://127.0.0.1:4175`.

- [Run 1 corrected artifact](runs/run-1/initial/)
- [Run 2 artifact](runs/run-2/initial/)
- [Run 3 final artifact](runs/run-3/final/)

For each artifact, check both URLs:

- `/?theme=light&drawer=open&workspace=expanded&current=Overview`
- `/?theme=dark&drawer=open&workspace=expanded&current=Overview`

Hover a child item that is not the current page, for example `Section 01`
when `Overview` is selected. Do not use a selected item for this check.

## What to record

1. Run number and theme.
2. `pass` if the hover result is visible and distinguishable from both normal
   and selected states; otherwise `mismatch`.
3. A screenshot only if there is a mismatch or ambiguity.
4. Whether a mismatch appears to be a local React implementation defect or
   needs further contract/validation investigation. Do not change inputs
   during this review.

## Context

- [Final evaluation](final-evaluation.md)
- [State comparison material](comparison.md)
- [Run 1 correction review](reviews/run-1/correction-review-attempt-2.md)
- [Run 2 independent review](reviews/run-2/initial-review.md)
- [Run 3 final re-review](reviews/run-3/correction-review-attempt-4.md)
