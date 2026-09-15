# Common-shell sample

Open `index.html` in a browser. The initial shell state is controlled by query parameters:

- `?drawer=open` or `?drawer=hidden`
- `?theme=light` or `?theme=dark`

The sample keeps Header, Drawer navigation, and workspace in their own layout and scroll regions. Drawer search filters only its fixed fixture, retains the matching child’s parent context, and provides filtered, no-match, and clear states. Selecting an item updates the in-memory current-destination binding without navigation.
