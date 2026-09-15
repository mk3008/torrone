# Run 1 common shell

Standalone local HTML/CSS/JS implementation of the requested Header, Drawer, and neutral scrolling workspace. Open `index.html` locally; initial shell states accept `?drawer=open`, `?drawer=hidden`, `?theme=light`, and `?theme=dark`.

## Current destination fixture

Current navigation state is product-binding input. In this comparison fixture, `productBinding.currentDrawerItem` supplies `item-01-01`, which renders `項目 01-01` as current. It is an input sample, not a common Drawer default: a binding can supply another item or no current destination.

The selected child retains the same nested label start as its sibling. Its full-row surface and `selection_indicator` begin at the physical left edge of the Drawer.

All controls and local SVG icons run without external assets, fonts, CDN, or runtime dependencies.
