from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tarfile
import time

root = Path(__file__).resolve().parent
arms = ('prompt-only', 'torrone', 'storybook')
trial = root / 'runs' / sys.argv[1]
for arm in arms:
    folder = trial / arm
    if not (folder / 'run.json').is_file():
        raise SystemExit(f'{arm} is still active. Do not open the oracle before final handoff.')
    if not (folder / 'final.tar').is_file():
        print(f'{arm} has no sealed final submission.')

def assess(arm, phase):
    folder = trial / arm
    archive = folder / f'{phase}.tar'
    if not archive.is_file():
        return
    artifact = folder / phase
    evidence = artifact / 'evaluation'
    evidence.mkdir(parents=True, exist_ok=False)
    with tarfile.open(archive) as source:
        source.extractall(artifact, filter='data')
    app = artifact / 'app'
    if (app / 'dist/index.html').is_file():
        app = app / 'dist'
    begin = time.monotonic()
    command = [
        'docker.exe', 'run', '--rm', '--network', 'none', '--cap-drop=ALL',
        '--security-opt=no-new-privileges', '--init', '--shm-size=256m',
        '--mount', f'type=bind,source={root / "evaluator/run.mjs"},target=/opt/bench-tools/run.mjs,readonly',
        '--mount', f'type=bind,source={app},target=/candidate,readonly',
        '--mount', f'type=bind,source={evidence},target=/evidence',
        'torrone-issue68-rebench:runtime', 'node', '/opt/bench-tools/run.mjs', '/candidate', '/evidence',
    ]
    result = subprocess.run(command, capture_output=True, timeout=180)
    (evidence / 'log.txt').write_bytes(result.stdout + result.stderr)
    (evidence / 'receipt.json').write_text(json.dumps({
        'archiveSha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
        'exitCode': result.returncode,
        'seconds': time.monotonic() - begin,
    }, indent=2) + '\n', encoding='utf-8')
    print(arm, phase, result.stdout.decode(errors='replace').strip(), flush=True)

with ThreadPoolExecutor(max_workers=3) as workers:
    jobs = [workers.submit(assess, arm, phase) for arm in arms for phase in ('first', 'final')]
    for job in jobs:
        job.result()
