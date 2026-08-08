# Run 2 observation conflict

- The Run 2 Vite command was started with the fixed `127.0.0.1:4175` strict-port configuration.
- The command exited because port `4175` was already owned by another local process.
- A browser session reached the already-running origin before the conflict was detected. Its snapshot and console result did not match Run 2 and were rejected immediately.
- No screenshot, snapshot, console output, hover result, or focus result from that session is accepted as Run 2 evidence.
- The rejected session artifacts and temporary npm cache were removed; only the Run 2 Vite startup logs are retained beside this note.
- Per the orchestrator's observation clarification, serial per-Run HTTP observation at `1440x900` remains pending after all three initial implementations are durable.
