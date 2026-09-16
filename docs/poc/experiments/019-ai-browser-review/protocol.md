# Replay protocol

Read the curation entry and experiment README first. Record any changed source identity or execution conditions as a new run; never overwrite the retained evidence.

## Prepare

From the repository root:

```sh
python3 docs/poc/experiments/019-ai-browser-review/prepare.py tmp/browser-review-new
```

Python 3 and Node are sufficient; no npm install is required. For a local browser, run `node serve.mjs --host 127.0.0.1 --port 4173` from that generated directory. For the managed cloud-browser environment used here, start the generated directory with its supported supervised preview service and use that service's documented browser address. Do not substitute a live production deployment. Stop the preview after the review.

The unframed link serves unchanged Reference bytes. The outer page offers 320/390/900-width buttons around the same document. That frame is a width/scroll fixture only. Use normal browser actions; do not set application variables, call its internal functions, or alter its DOM to make expectations pass.

## Desktop sequence (D00–D18)

1. Open the unframed page (D00); click Start (D01), select Aug 10 (D02), click End (D03), select Aug 12 (D04).
2. Fill Start with `20260230`, Enter (D05); replace with `20260810`, Enter (D06).
3. Fill End with `20260808`, Enter (D07); replace Start with `20260806`, Enter (D08). Observe both displayed values, End error/invalid attribute and selection announcement. Capture the visible discrepancy before continuing.
4. Press Enter in End without changing its value (D09); click Clear start date (D10).
5. Press Tab on Start (D11), Shift+Tab on End (D12), ArrowDown on Start (D13), ArrowLeft on the focused date (D14), Enter (D15).
6. Open End calendar and click Close (D16); open Start calendar and press Escape (D17).
7. Reload. Repeat Start=`20260810` + Enter, End=`20260808` + Enter, Start=`20260806` + Enter. Capture the same stale error (D18). This repetition intentionally omits the earlier calendar setup.

## Narrow and interruption sequence (N00–N14)

1. Open the outer fixture with its fresh 390px frame. Click Start text (N00), open Start calendar (N01), select Aug 10 (N02), open End calendar (N03), Close (N04).
2. Reopen End (N05), click the outer 900px button (N06), then 320px (N07). The outer button takes focus: do not interpret this as a device-rotation focus test.
3. Open Start calendar (N08), click End text directly (N09), fill `20260812` and Enter (N10).
4. Clear End (N11), open End calendar and select Aug 12 (N12), fill End=`20260818` and Enter (N13), Clear End (N14).

At each checkpoint retain the rendered snapshot and actual focus, values, invalid/expanded state. For frame checks, inspect the frame document, not the outer page. Keep a screenshot when visual evidence changes the conclusion. Labels and exact fixture dates are replay aids, not new product contracts.
