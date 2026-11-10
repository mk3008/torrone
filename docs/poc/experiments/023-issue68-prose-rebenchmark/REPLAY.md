# Reproduce the Issue 68 rebenchmark

The evaluation is a read-only replay of the sealed candidates. It does not invoke a model or use credentials. The reference input and evaluator were unavailable to all implementers while their sessions were active.

## Docker replay

From this directory, build the pinned browser image.

```sh
docker build --target runtime -t torrone-issue68-rebench:runtime container
```

Use PowerShell from this directory. The example runs one final candidate. Replace the application path to score another trial or phase. A candidate that provides `dist/index.html` should be served from `dist`.

```powershell
$oracle = (Resolve-Path evaluator/run.mjs).Path
$app = (Resolve-Path runs/4/torrone/final/app).Path
$dest = (New-Item -ItemType Directory -Force tmp/torrone-replay).FullName
docker run --rm --network none --cap-drop=ALL --security-opt=no-new-privileges --init --shm-size=256m `
  --mount "type=bind,source=$oracle,target=/opt/bench-tools/run.mjs,readonly" `
  --mount "type=bind,source=$app,target=/candidate,readonly" `
  --mount "type=bind,source=$dest,target=/evidence" `
  torrone-issue68-rebench:runtime node /opt/bench-tools/run.mjs /candidate /evidence
```

The script writes `results.json` and one screenshot per completed case. Exit 1 means at least one scored case failed. Use `reference` as the app path for the positive control and `calibration-negative` for the mutation control. The positive control uses the original executable HTML and the same six-item fixture extension used in the previous oracle. The mutation control disables arrow movement, changes keyboard navigation to auto-activate, and increases the count-button gap from 6px to 10px.

## Local replay

Node.js and Chromium can run the suite without Docker. Use Playwright 1.65.0 and record browser and OS. The benchmark used Chromium 158.0.8127.18 on Linux. Browser fonts can affect visual comparisons.

```sh
npm ci --prefix evaluator
npm exec --prefix evaluator -- playwright install chromium
node evaluator/run.mjs reference tmp/reference
node evaluator/run.mjs runs/4/torrone/final/app tmp/torrone-final
```

## Record layout

- `shared` and `ARM-PROMPTS.md` contain the prose, synthetic fixture, common icons and treatment instructions.
- `runs/<id>/<arm>/prompt.txt` is the actual implementation request. `tools.jsonl` records isolated command, image-view, question and checkpoint events. Tool outputs are bounded tails. Account and transient model transport state are excluded.
- `runs/<id>/<arm>/<phase>/app` contains the sealed source. `evaluation/results.json` records each case verdict and its prose IDs. Representative and failing screenshots are committed. Replaying generates the full screenshot set.
- `reference-linux` and `calibration-negative-evidence` record the pre-run calibration. `FREEZE-SHA256.txt` records the input and evaluator digests.
- `trial.py`, `container-bridge.py`, `score.py` and `summarize.py` record the orchestration used in the original task workspace. A fresh model run additionally requires an existing ChatGPT-authenticated Codex CLI and the published support assets. The archived source replay above is independent of those credentials.
