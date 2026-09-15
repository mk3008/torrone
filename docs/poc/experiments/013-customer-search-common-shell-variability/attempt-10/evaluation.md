# Evaluation

## Result

`valid three-run set — observation-gap found`

All three runs were generated once from the frozen attempt-10 inputs. No run
was edited, selectively regenerated, or replaced after generation. All twelve
captures completed with the same Chrome invocation and viewport.

The prompt-gap found in attempt 9 is resolved for this input set: all three
runs render a result Grid with six fixture rows. The focused structural check
also confirms the expected search fields, result action, ID-leading detail
link, and pagination structure.

The fixed-shell source boundary is preserved in all three runs: the template
matches byte-for-byte outside `PAGE_SLOT`, and `shell.css` and `shell.js`
match the immutable fixture digests. However, visual inspection of the
captured open states finds that Run 2 does not visibly display the fixed
Drawer navigation, while Runs 1 and 3 do. The Run 2 source contains the same
Drawer markup and immutable assets, so the present evidence does not establish
whether this is a capture/rendering observation issue or a boundary condition
the fixture check does not yet observe.

Per the [three-run reproducibility protocol](../../three-run-reproducibility-protocol.md),
this evidence is not corrected by rerunning Run 2. It is classified as an
`observation-gap`. A later change to the fixture or its verification would
create a new numbered attempt and regenerate all three runs.

## Frozen inputs

- Manifest snapshot: 45 files under
  [`consumer-input/design-manifest`](consumer-input/design-manifest/manifest.md)
- Fixed shell fixture: [template](consumer-input/common-shell-fixture/shell-template.html),
  [CSS](consumer-input/common-shell-fixture/shell.css), and
  [JavaScript](consumer-input/common-shell-fixture/shell.js)
- Product prompt: [full Japanese prompt](consumer-input/user-prompt-ja.md)
- Model: `gpt-5.6-terra`; reasoning effort: `medium`
- Capture viewport: `1440×1200`

Only the product-specific `Grid` result fact changed from attempt 9. The
Manifest snapshot and fixed shell fixture are unchanged.

## Capture and checks

- Browser: Chrome `150.0.7871.187` at
  `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Capture mode: `--headless=new --disable-gpu`; SwiftShader fallback: not used
  (all 12 normal captures exited `0`)
- Capture record: [capture-record.json](capture-record.json)
- Focused composition check: pass — 3 runs, 45 Manifest files, immutable
  fixture template plus 2 assets, 12 captures at `1440×1200`, 0 external
  dependencies
- `git diff --check`: pass

## Classification

| Observation | Classification | Consequence |
| --- | --- | --- |
| All three outputs use a six-row Grid after the prompt explicitly names the result pattern. | resolved prompt gap | The product-facts prompt is sufficiently specific for this pattern choice in this test. |
| Run 2 omits the visibly populated Drawer in the captured open state despite matching immutable shell source. | observation-gap | Do not repair Run 2. Strengthen the shell fixture/visual-boundary verification only in a new attempt, then regenerate all three runs. |
| Row content, precise widths, and spacing differ across the three outputs. | allowed variance | No change unless a product requirement needs to constrain it. |
