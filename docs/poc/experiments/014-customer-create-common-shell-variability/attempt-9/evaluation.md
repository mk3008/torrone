# Evaluation

## Outcome

`invalid observation set — manifest clarification required` — the three
untouched outputs remain evidence for the frozen Attempt 9 inputs, but they
are not accepted as a passing three-run result. Static inspection found a
native fieldset with its default visible border in Run 1. The previous guidance
required unboxed groups but did not explicitly say to reset browser-default
fieldset border, padding, and margin. No generated output is repaired. A new
attempt must use the clarified Manifest and all three fresh implementations.

## Fixed inputs

- Baseline commit: `ad1127b3cce6ebd0f4e65c26aee4edce13aa78f9`
- Model and reasoning effort: `gpt-5.6-terra`, `medium`
- Runs: `3`, independently authored once
- Manifest snapshot: `45` files
- Prompt SHA-256:
  `FCEA798C64880A88024A17BF45D7DCDED365086F7CE7E61BFBFD329B061E4874`
- Common-shell template SHA-256:
  `764E870E5DC584BAB41EF07220653AD98ACBC3A9769D31F678BDBF3A9AB7C21F`

## Observed supplied responsibilities

| Requirement | Run 1 | Run 2 | Run 3 |
| --- | --- | --- | --- |
| Customer ID omitted as a control | pass | pass | pass |
| Field-associated validation source | pass | pass | pass |
| Reserved helper-or-error region | pass | pass | pass |
| Native fieldset remains unboxed | fail | pass | pass |
| Fixed shell asset hashes and page-slot boundary | pass | pass | pass |
| Captures produced | pass | pass | pass |

## Deviation ledger

| Observable deviation | Classification | Evidence | Consequence |
| --- | --- | --- | --- |
| Run 1 uses a native `fieldset` without resetting its default border. | `manifest-clarification` | `runs/run-1/index.html` and `runs/run-1/page.css`; `tests/check-customer-create-common-shell-variability-attempt9.ps1` fails at the unboxed-fieldset check. | Clarify the cross-screen Record fields contract, then perform a fresh three-run attempt. |

## Capture evidence

- Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Chrome version: `150.0.7871.187`
- Desktop: `12` PNGs at `1440x1200`
- Narrow: `3` PNGs at `720x1200`
- Normal capture exit code: `0` for `15/15` captures
- SwiftShader fallback: `0` uses
- Raw PNG SHA-256, byte counts, dimensions, commands, and exit codes:
  [capture-record.json](capture-record.json)

Visual review is not used to override the failed structural check. The next
attempt, not a direct repair to these outputs, is the appropriate response.

## Verification

| Command | Exit | Result |
| --- | ---: | --- |
| `tests/check-customer-create-common-shell-variability-attempt9.ps1` | 1 | Detected the unreset native fieldset border in Run 1 |

## Protocol review

| Check | Result |
| --- | --- |
| Output changed after the three-run generation phase | No |
| Previous generated output reused | No |
| Manifest, prompt, or fixture changed after generation | No |
| Validity for reproducibility comparison | Invalid; clarification required |
| Final status | Not accepted |
