"""Provision and run one agent against a single offline, writable project."""

from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import time
from uuid import uuid4

root = Path(__file__).resolve().parent
arm, trial = sys.argv[1:]
if arm not in {'prompt-only', 'torrone', 'storybook'} or not trial.isdecimal():
    raise SystemExit('Usage: trial.py prompt-only|torrone|storybook TRIAL_NUMBER')

run = root / 'runs' / trial / arm
run.mkdir(parents=True, exist_ok=False)
workspace = run / 'workspace'
workspace.mkdir()
app = workspace / 'app'
app.mkdir()
name = 'torrone68-' + arm + '-' + uuid4().hex[:8]
base_image = 'torrone-issue68-rebench:local' if arm == 'storybook' else 'torrone-issue68-rebench:runtime'
docker = shutil.which('docker.exe')
codex = Path(shutil.which('codex.cmd'))
native = next(codex.parent.glob('node_modules/@openai/codex/node_modules/@openai/codex-win32-x64/vendor/*/bin/codex.exe'))

def invoke(*arguments, **kwargs):
    return subprocess.run([docker, *arguments], check=True, **kwargs)

def timestamp():
    return datetime.now(timezone.utc).isoformat()

started = timestamp()
setup_begin = time.monotonic()
for item in ('BRIEF.md', 'fixture.json'):
    shutil.copy2(root / 'shared' / item, workspace)
shutil.copytree(root / 'shared/icons', workspace / 'icons')
(workspace / 'CLARIFICATIONS.md').write_text('# Shared product clarifications\n', encoding='utf-8')

repo = root.parent / 'torrone'
prior = repo / 'docs/poc/experiments/022-issue68-greenfield'
if arm == 'torrone':
    support = workspace / 'support'
    support.mkdir()
    for relative in ('catalog/README.md', 'docs/application-interaction.md', '.agents/skills/torrone-ui-implementation/SKILL.md'):
        source = repo / relative
        destination = support / ('UI-IMPLEMENTATION-SKILL.md' if source.name == 'SKILL.md' else relative)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
    shutil.copy2(prior / 'torrone/input/support/DESIGN-WIZARD-SKILL.md', support)
    for relative in ('components/flat-icon-button', 'components/anchored-popover', 'menus/one-level', 'dialogs/framed'):
        source = repo / 'catalog' / relative
        target = support / 'catalog' / relative
        target.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source / 'README.md', target)
        shutil.copytree(source / 'images', target / 'images')
if arm == 'storybook':
    for file in ('package.json', 'package-lock.json'):
        shutil.copy2(root / 'container/storybook' / file, app)
    config = app / '.storybook'
    config.mkdir()
    shutil.copy2(root / 'docker-probe/story/.storybook/main.js', config)
    shutil.copy2(root / 'docker-probe/story/vitest.config.js', app)
    skills = workspace / 'support'
    skills.mkdir()
    for item in ('ui-workflow.md', 'component-docs.md'):
        shutil.copy2(prior / 'storybook/input/support' / item, skills)

prompt_source = (root / 'ARM-PROMPTS.md').read_text(encoding='utf-8')
sections = dict(part.split('\n\n', 1) for part in prompt_source.split('\n## ')[1:])
labels = {'prompt-only': 'Prompt Only', 'torrone': 'Torrone', 'storybook': 'Storybook'}
prompt = '\n\n'.join([
    (workspace / 'BRIEF.md').read_text(encoding='utf-8'),
    sections['Common runner instructions'].strip(), sections[labels[arm]].strip(),
])
(run / 'prompt.txt').write_text(prompt + '\n', encoding='utf-8')
auth = subprocess.run([str(native), 'login', 'status'], capture_output=True, text=True, check=True)
if 'Logged in using ChatGPT' not in auth.stdout + auth.stderr:
    raise SystemExit('A ChatGPT-authenticated CLI is required. Do not use metered API authentication.')

metadata = {
    'arm': arm, 'trial': int(trial), 'setupStartedUtc': started,
    'model': 'gpt-5.6-sol', 'reasoningEffort': 'low',
    'imageId': invoke('image', 'inspect', base_image, '--format', '{{.Id}}', capture_output=True, text=True).stdout.strip(),
    'commonBriefSha256': hashlib.sha256((workspace / 'BRIEF.md').read_bytes()).hexdigest(),
}
try:
    invoke('run', '-d', '--name', name, '--network', 'none', '--cap-drop=ALL',
           '--security-opt=no-new-privileges', '--init', '--ipc=private', '--shm-size=256m',
           '--mount', f'type=bind,source={workspace},target=/bench',
           '-e', 'XDG_CONFIG_HOME=/tmp/bench-storybook-config',
           '-e', 'XDG_STATE_HOME=/tmp/bench-storybook-state',
           base_image, 'sleep', 'infinity', capture_output=True)
    if arm == 'storybook':
        invoke('exec', '-w', '/bench/app', name, 'ln', '-s', '/opt/storybook-tools/node_modules', 'node_modules')
    probe = {
        'jsonrpc': '2.0', 'id': 1, 'method': 'tools/call',
        'params': {'name': 'shell', 'arguments': {
            'command': '# ' + 'a' * 36000 + '\nprintf "%s\\n" "受注ワークスペース" > .encoding-probe\ncat .encoding-probe\n',
        }},
    }
    proof = subprocess.run(
        [sys.executable, str(root / 'container-bridge.py'), name, str(run / 'preflight-tools.jsonl'),
         str(root / 'runs' / trial / 'answers.json')],
        input=(json.dumps(probe, ensure_ascii=False) + '\n').encode('utf-8'),
        capture_output=True, timeout=30, check=True,
    )
    receipt = json.loads(proof.stdout.decode('utf-8'))
    if receipt.get('result', {}).get('content', [{}])[0].get('text', '').strip() != 'exit 0\n受注ワークスペース':
        raise RuntimeError('Isolated UTF-8 shell preflight failed')
    metadata['utf8ShellPreflight'] = 'passed'
    metadata['setupSeconds'] = time.monotonic() - setup_begin
    server = (
        'mcp_servers.isolated={command=' + json.dumps(sys.executable) +
        ',args=' + json.dumps([str(root / 'container-bridge.py'), name, str(run / 'tools.jsonl'),
                              str(root / 'runs' / trial / 'answers.json')]) +
        ',tool_timeout_sec=140,required=true,default_tools_approval_mode="approve"}'
    )
    flags = [
        'exec', '--ignore-user-config', '--ephemeral', '--skip-git-repo-check',
        '--sandbox', 'read-only', '--color', 'never', '--json', '-m', 'gpt-5.6-sol',
        '-c', 'model_reasoning_effort="low"', '-c', 'approval_policy="never"',
        '-c', 'web_search="disabled"', '-c', server,
    ]
    for feature in ('shell_tool', 'unified_exec', 'memories', 'apps', 'plugins', 'browser_use',
                    'browser_use_external', 'in_app_browser', 'multi_agent'):
        flags.extend(['--disable', feature])
    flags.extend(['--enable' if arm == 'torrone' else '--disable', 'image_generation'])
    flags.extend(['-c', 'tools.view_image=false'])
    metadata['modelStartedUtc'] = timestamp()
    start = time.monotonic()
    with (run / 'events.jsonl').open('wb') as out, (run / 'agent-stderr.txt').open('wb') as err:
        try:
            process = subprocess.run([str(native), *flags, '-'], input=prompt.encode('utf-8'), stdout=out,
                                     stderr=err, timeout=540, cwd=workspace, check=False)
            metadata['exitCode'] = process.returncode
        except subprocess.TimeoutExpired:
            metadata['exitCode'] = 124
    metadata['modelSeconds'] = time.monotonic() - start
finally:
    metadata['endedUtc'] = timestamp()
    (run / 'run.json').write_text(json.dumps(metadata, indent=2) + '\n', encoding='utf-8')
    subprocess.run([docker, 'rm', '-f', name], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
