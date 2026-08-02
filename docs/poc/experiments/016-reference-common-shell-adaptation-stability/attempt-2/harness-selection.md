# Harness selection

## Selected harness

Browser-native static HTML, CSS, and JavaScript: `index.html`, `styles.css`,
and `app.js`, opened directly in a browser with `node --check app.js` as the
minimum executable check.

## Evidence and rationale

The approved Reference uses this exact file-level technology, and Attempt 1's
frozen application contract selected it before the preflight stopped. Earlier
common-shell experiments also preserve browser-readable static artifacts. It
requires no new dependency or build system and lets independent Runs implement
the Reference outcome without copying its source structure.

This is a harness choice, not a visual rule. Reference-owned visual and
interaction decisions stay outside the product contract.
