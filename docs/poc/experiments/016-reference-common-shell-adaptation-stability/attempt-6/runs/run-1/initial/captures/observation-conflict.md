# Run 1 observation provenance record

## Result

No browser screenshot, snapshot, console result, or rendered-state assertion was
accepted for Run 1 during the Worker observation attempt.

## Evidence

- The Run 1 Vite process was started with the frozen host and port arguments:
  `127.0.0.1:4175 --strictPort`.
- Its stderr reported `Error: Port 4175 is already in use`; the attempted Run 1
  server process then exited.
- A subsequent HTTP readiness probe reached the process already occupying that
  port. The Playwright snapshot content did not match the Run 1 source, proving
  that the browser session was not observing this Run.
- The browser session was closed, its temporary session data was deleted, and
  no screenshots were retained.
- No process belonging to another Run was stopped or changed.

The discarded snapshot and console output are not Run 1 evidence. The
orchestrator's `OBSERVATION_CLARIFICATION` assigns serial per-Run HTTP
observation at `1440x900` after all three initial implementations are durable.

## Observation-tool corrections

1. Redirected the temporary `@playwright/cli@0.1.18` npm cache into the assigned
   Run directory after the default user cache failed with `EPERM`.
2. Rejected and removed the unproven browser session after the fixed-port
   collision proved that it was observing another process.

Observation-tool correction count: **2**. Implementation correction count:
**0**.
