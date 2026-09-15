# Evaluation

Status: done

Attempts 17–20 remain historical. This attempt does not repair a prior Run. It
tests a narrowed rendering-integrity rule: the panel outline, divider, and
directional chevron are independent shapes or paths, and the chevron stays
inside the viewBox. The rule intentionally does not specify an icon library,
catalog, or path-command style.

Review uses the Drawer-visible and Drawer-hidden fixed captures at normal
button size, source inspection, and the attempt-limited static checks.

## Result

All three independent `gpt-5.6-terra` / `medium` Runs passed the limited
common-shell check and produced the 15-image fixed capture matrix in Chrome.
The three Light / Drawer-hidden captures were visually inspected at normal
display size. Each has a complete left-panel outline, divider, and readable
right-pointing opening chevron; no run shows the off-canvas downward fragment
that made Attempt 17 Run 3 malformed.

The check also passed local-link validation (25 references, 0 broken), the
standard-pack static check, Source Independence, and `git diff --check`.
No generated Run was repaired after creation.
