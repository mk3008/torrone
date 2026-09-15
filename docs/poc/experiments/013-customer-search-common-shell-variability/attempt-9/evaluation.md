# Evaluation

## Status

`valid three-run set — prompt-gap found`

## Input integrity

All three runs preserve the frozen shell assets and markup outside the declared
page slot. The capture script produced twelve `1440x1200` PNGs with Chrome
`150.0.7871.187`, without a SwiftShader fallback. No run was edited or
regenerated after the three-run generation phase.

## Observed deviations

| Observation | Runs | Classification | Evidence | Next action |
| --- | --- | --- | --- | --- |
| The result presentation is a Grid. | 1, 2 | expected | Captures and `index.html` | None. |
| The result presentation is cards, not a Grid. | 3 | `prompt-gap` | Run 3 has no `tbody`/six result rows; the focused static check rejects it. | Add the product-specific result-format requirement to the prompt, then start a new three-run attempt. |
| Search conditions are the four supplied fields. | 1, 2 | expected | `index.html` and captures | None. |
| A Customer ID search field is added although it is not one of the supplied search targets. | 3 | `non-conformance` | Run 3 `index.html` adds `customer-id` in the conditions region. | Retain this observation; do not repair Run 3. The next attempt keeps the existing four-field requirement. |

## Interpretation

The Manifest deliberately contains both Search with Grid and Search with Cards.
Choosing between them is therefore a product requirement, not a default the
Manifest can safely invent. The fixed prompt named a customer search and its
fields but did not say `Grid`; this is the primary cause of the Run 3 pattern
choice. The subsequent prompt correction is permitted because it adds a
screen-specific fact, rather than a generic visual rule.

The focused static check exits non-zero for this attempt because it correctly
detects the Run 3 Grid requirement failure. That is a test result, not a reason
to alter the output. Attempt 10 will freeze the corrected prompt and generate
three new independent runs.
