# Evaluation

Status: done

Three independent `gpt-5.6-terra` / `medium` Runs were generated from the
same 46-file Manifest snapshot and the same fixed Japanese request. No earlier
Run or generated output was reused or repaired.

The attempt-limited static check passed. It verified one local Drawer search
input with a watermark placeholder in each Run, no separate submit or clear
control, immediate filtering, no-match text, separate Drawer/workspace
scrollports, the supplied fixtures, no external references, and the 15-image
capture matrix. Chrome `150.0.7871.187` captured the matrix at `1440 x 1200`
and `720 x 1200` with `headless=new` and `disable-gpu`; no fallback was used.

The Light Drawer-visible and Drawer-hidden captures were visually reviewed.
Each Run presents one normal Drawer search input rather than a bordered field
containing another input. The static review does not claim keyboard, assistive
technology, persistence, responsive quality, or destination behavior.

## Selection outcome

The product owner selected Run 1 as the reusable common-shell reference. The
selection is traceable to its source assets and raw-byte SHA-256 values in
[selected-common-shell.md](selected-common-shell.md). Runs 2 and 3 remain
unchanged evidence of this three-run test; they are not discarded or repaired.
