# Evaluation

`valid three-run set — fixture gap and non-conformance found`

All three outputs were generated once from frozen consumer inputs and all
twelve Light/Dark × Drawer-state captures completed. No output was edited or
selectively regenerated.

The focused check rejects the set for two independently observed reasons:

- Run 2 falls back from the canonical `action_*` and `table_header_*` roles
  because the immutable common-shell fixture does not expose the full required
  role-variable set. This is a **fixture gap**: the next valid experiment must
  update and hash the fixture, then regenerate all three runs.
- Run 1 does not meet the already-declared leading record-identity operation
  assertion. This is an **output non-conformance**, not a per-run repair task.

The new Manifest rule is retained: canonical semantic variables belong on the
shared theme root and page CSS consumes them directly. Attempt 13 cannot prove
that rule's reproducibility until a new fixture version is supplied and a new
three-run attempt is generated.
