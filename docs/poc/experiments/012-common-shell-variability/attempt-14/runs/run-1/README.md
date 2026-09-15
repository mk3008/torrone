# Run 1 common shell

This is a standalone local implementation of the requested Header, Drawer, and neutral scrolling workspace. Open `index.html` locally; query state accepts `?drawer=open`, `?drawer=hidden`, `?theme=light`, and `?theme=dark`.

`bindingState.currentDestination` and `disclosureState.group01Expanded` are independent. Selecting a fixture destination moves the single current-item treatment without changing its parent/child indentation. Collapsing the group only hides its children; it never changes or clears the selected destination, so re-expanding restores the same selected child.

All SVG icons and interactions are local. No external assets, fonts, CDN, or scripts are used.
