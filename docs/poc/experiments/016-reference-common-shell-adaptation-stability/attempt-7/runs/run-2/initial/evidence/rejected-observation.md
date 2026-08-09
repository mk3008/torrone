---
type: rejected browser observation
title: Run 2 fixed-port collision before valid capture
status: rejected; not comparison evidence
---

# Rejected observation

The first Playwright open against
`http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview`
is not Run 2 evidence.

Run 2's strict-port development-server process exited with
`Error: Port 4175 is already in use`. A listener check identified PID `29608`;
the orchestrator subsequently confirmed that PID belonged to Attempt 7 Run 1.
The Playwright open, which occurred before that ownership was known, reported
the page title `Operations workspace` and one console error with zero warnings.
No screenshot was taken.

The temporary Playwright snapshot and console files were deleted as invalid
Run 2 artifacts before the orchestrator requested that the rejected first page
be retained. This durable record preserves the observed facts and that evidence
limit without reopening or inspecting Run 1. None of the first-open metadata
may be used in the Run 2 before/hover comparison or its console counts.

Valid capture resumes only after Run 1 releases the fixed port and Run 2 starts
successfully at that origin.
