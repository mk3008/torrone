# Common shell variability sample

Open `index.html` directly in a browser. This local, dependency-free fixture demonstrates a persistent Header, a Drawer with local search and hierarchy disclosure, and independently scrollable navigation and workspace regions.

Initial presentation is controlled with query parameters:

- `?drawer=open` or `?drawer=hidden`
- `?theme=light` or `?theme=dark`

The Drawer controller and theme controller update the corresponding URL parameters. Selecting a navigation item updates the in-memory current-destination binding and moves the single current-item treatment without navigating.
