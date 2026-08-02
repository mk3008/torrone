# Self-review

Scope: this review covers only this generated Run 1 output.

1. **Disclosure row — pass.** `グループ 01` is a complete button; its trailing chevron changes between down/right, controls only the child region, and never gains current-item styling.
2. **Header icon controls — pass.** The Drawer and theme controls are icon-only native buttons with 38px bounded surfaces, `border_interactive` borders, and the same implementation in both palettes.
3. **Search focus — pass.** The labelled search input is opaque, has its ordinary `border_interactive` boundary, and uses a separated `:focus-visible` outer outline.
4. **Workspace alignment — pass.** Header is a fluid shell band. The page grid is contained solely in the workspace and the bounded content begins at its logical start edge.
5. **Fixture interaction — pass.** Leaf activation transfers one current destination; input filtering includes the group and child context; the Drawer list and workspace each own independent vertical scrollports.
6. **External resources — pass.** `index.html` refers only to `styles.css`, `app.js`, and local `icons/` files. No external images, fonts, scripts, or stylesheets are referenced.

Limitations: this static self-review does not certify browser assistive-technology behavior, visual contrast measurements, or human approval.
