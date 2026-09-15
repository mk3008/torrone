# Run 1 common shell

Standalone local Header, Drawer, and neutral scrolling workspace. Open `index.html`; supported initial query state is `drawer=open|hidden` and `theme=light|dark`.

`binding.currentDestination` is the single semantic current navigation item (`aria-current="page"`). Its selection is a paint layer only: background, weight, and a physical-left indicator. Same-level rows retain identical padding and label start; leaf selection never adopts child indentation. `disclosure.expanded` only hides or restores children and never changes the current destination.

No external assets, fonts, CDN, or scripts are used.
