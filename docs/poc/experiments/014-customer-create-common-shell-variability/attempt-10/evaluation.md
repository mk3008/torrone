# Evaluation

## Outcome

`valid observation set` — all three untouched implementations satisfy the
Attempt 10 static composition checks against the same frozen Manifest snapshot,
unchanged product prompt, and immutable fixed shell. This is evidence about
the shared form contract, not a manually harmonized page set.

## Fixed inputs

- Baseline commit: `ad1127b3cce6ebd0f4e65c26aee4edce13aa78f9`
- Manifest state: uncommitted frozen 45-file snapshot with the Attempt 9
  native-fieldset clarification
- Model and reasoning effort: `gpt-5.6-terra`, `medium`
- Runs: `3`, independently authored once
- Prompt SHA-256:
  `FCEA798C64880A88024A17BF45D7DCDED365086F7CE7E61BFBFD329B061E4874`
- Common-shell template SHA-256:
  `764E870E5DC584BAB41EF07220653AD98ACBC3A9769D31F678BDBF3A9AB7C21F`
- Common-shell CSS SHA-256:
  `7913120EB305AA155A5F530AB7EEFDB31B944AC7AC819831A8F1594FCEDEB6C8`

## Observed shared contract

| Requirement | Run 1 | Run 2 | Run 3 |
| --- | --- | --- | --- |
| Customer ID omitted as an editable control | pass | pass | pass |
| Five required fields and optional Notes | pass | pass | pass |
| One reserved message region immediately below every field | pass | pass | pass |
| Format help only for date, telephone, and email | pass | pass | pass |
| Helper and error use the same region, not stacked regions | pass | pass | pass |
| Muted helper and canonical error role consumption | pass | pass | pass |
| Blur, submit, and correction validation source | pass | pass | pass |
| Native fieldset remains unboxed | pass | pass | pass |
| Fixed shell assets and page-slot boundary | pass | pass | pass |
| Save then Cancel in a logical-start action toolbar | pass | pass | pass |
| Local-only assets and non-persistent Save | pass | pass | pass |

## Visual review

The initial Light/Drawer-open captures show a bounded single-column form with
the same vertical message track after every input. The three supplied
format-dependent fields display muted completion help; Name, Address, and
Notes reserve their track without redundant instruction copy. The 720px
Drawer-hidden captures keep controls within the available width. Screenshots
show initial layout only; they do not prove keyboard, assistive-technology, or
post-error interaction behavior.

## Capture evidence

- Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Chrome version: `150.0.7871.187`
- Desktop: `12` PNGs at `1440x1200`
- Narrow: `3` PNGs at `720x1200`
- Normal capture exit code: `0` for `15/15` captures
- SwiftShader fallback: `0` uses
- Raw PNG SHA-256, byte counts, dimensions, commands, and exit codes:
  [capture-record.json](capture-record.json)

## Verification

| Command | Exit | Result |
| --- | ---: | --- |
| `tests/check-customer-create-common-shell-variability-attempt10.ps1` | 0 | 3 sources, 45-file snapshot, immutable shell, semantic helper/error roles, fieldset reset, 15 captures, and local-only boundaries |
| `tests/check-business-workflow-standard-pack.ps1` | 0 | 26 concepts, 23 index links, 5 settings, 23 theme roles, 2 modes, 10 overrides, 8 negative cases, 72 contrast assertions, 2 binding fixtures |
| `tests/check-source-boundaries.ps1` | 0 | Source Independence preserved |
| `git diff --check` | 0 | No whitespace errors; Git reported line-ending conversion warnings only |
| Playwright direct interaction | blocked | Its CLI blocks the `file:` protocol; static validation-source checks remain the available automated evidence |

## Protocol review

| Check | Result |
| --- | --- |
| Output changed after the three-run generation phase | No |
| Previous generated output reused | No |
| Manifest, prompt, or fixture changed after generation | No |
| Validity for reproducibility comparison | Valid observation set |
| Final status | Valid observation set |
