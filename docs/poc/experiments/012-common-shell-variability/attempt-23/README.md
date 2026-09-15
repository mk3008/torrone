# Common shell navigation search — single-field rerun

This independent three-run test uses the default Manifest snapshot and the
unchanged Japanese request in [the frozen consumer input](consumer-input/user-prompt-ja.md).
It evaluates whether the Manifest makes Drawer navigation search render as a
single ordinary watermark text field, without repairing or reusing a prior
generated run. The workspace's meaningless numbered content exists solely to
make independent scrolling visible.

The comparison report is added after generation and verification.

## Selected common-shell reference

The product owner selected [Run 1](runs/run-1/index.html?drawer=open&theme=light)
as the reusable common-shell reference after reviewing the three independent
outputs. The selection, covered files, and their raw-byte digests are recorded
in [selected-common-shell.md](selected-common-shell.md).

This is a downstream selection from the three-run result, not an edit to the
frozen Manifest and not a repair of any Run. Future experiments that explicitly
reuse the selected common shell must copy this Run as a frozen consumer input;
they must not alter this historical Run or replace the other two results.
