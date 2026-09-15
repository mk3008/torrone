# Attempt 5 — React comparison material

> Historical comparison material. Attempt 5 is stopped for
> [fixture-coverage-gap](fixture-coverage-gap.md), so this material is not a
> current adaptation success/failure decision input.

## How to use this material

This is a comparison aid, not a fourth implementation. All evidence below was
captured or reviewed at the frozen `1440 × 900` viewport. The Reference images
are the approved Reference capture set; the Run images are each Run's own
captured evidence. A missing retained PNG is explicitly marked rather than
being represented as a visual pass.

## State matrix

| State | Approved Reference | Run 1 (corrected) | Run 2 (final) | Run 3 (final) |
| --- | --- | --- | --- | --- |
| Light / Drawer open | [image](../attempt-3/reference-captures/light-drawer-open.png) | [image](runs/run-1/correction-attempt-2-captures/light.png) | [image](runs/run-2/final/captures/light-drawer-open.png) | Browser-observed; retained PNG not supplied. See [final evidence](runs/run-3/final/verification-evidence-attempt-3.json). |
| Dark / Drawer open | [image](../attempt-3/reference-captures/dark-drawer-open.png) | [image](runs/run-1/correction-attempt-2-captures/dark.png) | [image](runs/run-2/final/captures/dark-drawer-open.png) | Browser-observed; retained PNG not supplied. See [final review](reviews/run-3/correction-review-attempt-4.md). |
| Drawer hidden | [image](../attempt-3/reference-captures/drawer-hidden.png) | [image](runs/run-1/correction-attempt-2-captures/drawer-hidden.png) | [image](runs/run-2/final/captures/light-drawer-hidden.png) | Browser-observed: canonical `drawer-show.svg`. See [final review](reviews/run-3/correction-review-attempt-4.md). |
| Parent expanded | [image](../attempt-3/reference-captures/parent-expanded.png) | [light image](runs/run-1/correction-attempt-2-captures/light.png) | [light image](runs/run-2/final/captures/light-drawer-open.png); see [alignment record](runs/run-2/parent-disclosure-alignment-report.md). | Browser-observed. See [final evidence](runs/run-3/final/verification-evidence-attempt-3.json). |
| Parent collapsed | [image](../attempt-3/reference-captures/parent-collapsed.png) | [image](runs/run-1/correction-attempt-2-captures/workspace-collapsed.png) | [image](runs/run-2/final/captures/parent-collapsed.png); see [alignment record](runs/run-2/parent-disclosure-alignment-report.md). | Browser-observed: canonical `disclosure-collapsed.svg`. See [final review](reviews/run-3/correction-review-attempt-4.md). |
| Navigation selected | [image](../attempt-3/reference-captures/selection-section-01.png) | [image](runs/run-1/correction-attempt-2-captures/section-01.png) | [image](runs/run-2/final/captures/selected-section-01.png) | Browser-observed. See [final review](reviews/run-3/correction-review-attempt-4.md). |
| `focus-visible` | Not retained in the approved Reference capture set. | Source/evidence only; human gate. | Browser-observed; see [review](reviews/run-2/initial-review.md). | Browser-observed; see [final review](reviews/run-3/correction-review-attempt-4.md). |
| Hover | Human gate. | Human gate. | Human gate. | Human gate. |

## Comparison reading order

1. Compare the light and dark rows for header, Drawer, workspace, selection,
   active indicator, and all visible fixed icons.
2. In the hidden-Drawer row, confirm that the header-leading control changes
   from `drawer-hide.svg` to `drawer-show.svg`; Run 3's initial mismatch and
   later correction are intentionally both retained in its review history.
3. Compare expanded/collapsed disclosure icon direction and selected-row
   physical-start indicator.
4. Treat the hover row as an explicit human gate. It is not an automated pass
   and not an implementation defect without an observed mismatch.

## Artifact entry points

The derived Vite artifacts are intentionally not file-URL documents. To open
one, run its fixed `npm run dev` command from the relevant directory and use
the fixed `http://127.0.0.1:4175` origin one Run at a time.

- [Run 1 corrected source](runs/run-1/initial/)
- [Run 2 final source](runs/run-2/final/)
- [Run 3 final source](runs/run-3/final/)
- [Approved Reference](../015-reference-first-common-shell/)
