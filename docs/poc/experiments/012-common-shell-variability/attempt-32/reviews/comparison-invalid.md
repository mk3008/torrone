# Attempt 32 comparison decision

Status: invalid for comparison.

Run 3 reported removing a pre-existing repository `.playwright-cli` directory
during browser-check cleanup. The directory was outside the worker's assigned
output scope. Its contents cannot be reconstructed safely because the worktree
was already dirty, so no reset, restoration, or cleanup is attempted.

The three generated outputs remain preserved as evidence, but they are not used
for Manifest-quality judgment. Attempt 33 repeats every Run from the same
verified frozen input. Workers may write only their isolated output directory
and report and may not invoke browser, Playwright, server, or cleanup tools.
