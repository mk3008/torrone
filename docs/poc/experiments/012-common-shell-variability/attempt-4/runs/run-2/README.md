# Run 2 — common shell

This static implementation consumes only the frozen Manifest snapshot and the
fixed Japanese user prompt for Attempt 4.

- `index.html` contains the Header, Drawer navigation fixture, and neutral
  scroll workspace.
- `styles.css` contains local semantic-role CSS for Light and Dark modes.
- `app.js` initializes Drawer and theme state from query parameters, toggles
  those local states, and filters only the supplied Drawer fixture.

Supported initial-state parameters are `drawer=open|hidden` and
`theme=light|dark`. No network, external asset, persistence, business data, or
screen transition is included.
