# Common shell navigation and scroll repeat — Drawer-controller legibility correction

This is an independent three-run test of the default Manifest and the unchanged
Japanese request in [the frozen consumer input](consumer-input/user-prompt-ja.md).
It will contain three fixed Light / Drawer-visible initial PNGs for comparison.
The workspace's meaningless numbered content exists solely to make independent
scrolling visible. Attempt 16 exposed a clipped, malformed local SVG despite a
semantically correct icon name. This retry removes all icon-library and
icon-name references from the Manifest and instead requires a legible,
unclipped panel action with the correct visible/hidden direction. The current
destination remains binding-owned and independent of
parent disclosure: activating a leaf transfers a paint-only treatment without
changing its label geometry or hierarchy indentation, while collapsing and
re-expanding a parent retains the current destination and restores that child's
treatment. The comparison presents both Drawer states for every run so the
controller can be reviewed directly.

The comparison report is added after generation and verification.
