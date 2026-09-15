# Evaluation

## Result

`partial`

All three pages reuse the selected Run 1 shell assets byte-for-byte, implement
the supplied validation interactions, and produce the required captures. The
selected shell does not expose the Manifest's `error_foreground` semantic role,
so the three generated pages resolve validation color inconsistently.

## Evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Fixed shell reuse | pass | Each run's `shell.css` and `shell.js` matches the fixture SHA-256. |
| Required validation behavior | pass | All runs include blur, submission, and correction-time validation with associated message regions. |
| Capture | pass | 15 PNGs, Chrome `150.0.7871.187`; `1440x1200` plus `720x1200`; no SwiftShader fallback. |
| External dependency scan | pass | Each worker reported no external URL, CDN, or import. |
| Error semantic role | fail | The selected Run 1 shell exposes no `--error-foreground` token. Run 1 uses the selection indicator, Run 2 creates error tokens from page CSS by altering `#shell`, and Run 3 uses literal error colors. |

## Interpretation

The Manifest requires a muted helper role and an error-colored correction
message. This fixture lacks the declared error role, so a page cannot consume
the shared semantic role without extending or altering the shell. The generated
pages are retained unchanged; the result identifies a shell-fixture contract
gap for a subsequent common-shell/semantic-token decision.
