"""Expose only an isolated benchmark container to an implementation session."""

import base64
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess
import sys
import time

sys.stdin.reconfigure(encoding='utf-8', errors='strict')
sys.stdout.reconfigure(encoding='utf-8', errors='strict')
container, log_arg, question_arg = sys.argv[1:]
log_path, question_path = Path(log_arg), Path(question_arg)

tools = [
    {
        "name": "shell",
        "description": "Run a Bash command in this trial's writable isolated project at /bench. Node, npm, git and Playwright are available. This is the shell for implementing, running and testing the app.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "command": {"type": "string"},
                "timeoutSeconds": {"type": "integer", "minimum": 1, "maximum": 120},
            },
            "required": ["command"],
        },
    },
    {
        "name": "view_image",
        "description": "Read a PNG screenshot or permitted asset from /bench and return the image for visual inspection.",
        "inputSchema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]},
    },
    {
        "name": "checkpoint",
        "description": "Seal the current application directory. Call once with first before reviewing the first runnable screen and with final after self-testing and repair.",
        "inputSchema": {"type": "object", "properties": {"stage": {"enum": ["first", "final"]}}, "required": ["stage"]},
    },
    {
        "name": "ask_product",
        "description": "Ask a product question if the written requirements leave a material implementation choice unclear. Answers that affect requirements will be shared with every trial.",
        "inputSchema": {"type": "object", "properties": {"question": {"type": "string"}}, "required": ["question"]},
    },
]

def note(data):
    with log_path.open('a', encoding='utf-8') as log:
        log.write(json.dumps({'utc': datetime.now(timezone.utc).isoformat(), **data}, ensure_ascii=False) + '\n')

def command(args, timeout=30, stdin=None):
    return subprocess.run(
        ['docker.exe', 'exec', *(['-i'] if stdin is not None else []), '-w', '/bench', container, *args],
        input=stdin,
        capture_output=True,
        timeout=timeout,
        check=False,
    )

def text(value, error=False):
    return {'content': [{'type': 'text', 'text': value}], 'isError': error}

def call(name, arguments):
    if name == 'shell':
        cmd = arguments['command']
        timeout = max(1, min(arguments.get('timeoutSeconds', 45), 120))
        start = time.monotonic()
        try:
            process = command(['timeout', '--kill-after=2', str(timeout), 'bash', '-s'],
                              timeout + 8, stdin=cmd.encode('utf-8'))
        except subprocess.TimeoutExpired:
            note({'tool': name, 'command': cmd, 'timeout': timeout})
            return text('Command timed out.', True)
        output = (process.stdout + process.stderr).decode('utf-8', errors='replace')
        note({'tool': name, 'command': cmd, 'exitCode': process.returncode, 'seconds': time.monotonic() - start,
              'outputTail': output[-5000:]})
        return text('exit ' + str(process.returncode) + '\n' + output[-20000:], process.returncode != 0)
    if name == 'view_image':
        path = PurePosixPath(arguments['path'])
        if path.is_absolute() or '..' in path.parts or path.suffix.lower() != '.png':
            return text('Use a relative PNG path under /bench.', True)
        image = command(['bash', '-c', 'p=$(realpath -- "$1") && [[ "$p" == /bench/* ]] && head -c 3000001 -- "$p"', 'safe-view', path.as_posix()])
        if image.returncode or not image.stdout.startswith(b'\x89PNG\r\n\x1a\n') or len(image.stdout) > 3000000:
            return text('The PNG was unavailable or exceeded 3 MB.', True)
        note({'tool': name, 'path': path.as_posix(), 'sha256': hashlib.sha256(image.stdout).hexdigest()})
        return {'content': [{'type': 'image', 'mimeType': 'image/png', 'data': base64.b64encode(image.stdout).decode('ascii')}]}
    if name == 'checkpoint':
        stage = arguments['stage']
        if stage not in {'first', 'final'}:
            return text('Unknown checkpoint.', True)
        target = log_path.with_name(stage + '.tar')
        if target.exists():
            return text('That checkpoint is already sealed.', True)
        if stage == 'final' and not log_path.with_name('first.tar').exists():
            return text('Seal the first runnable checkpoint before the final checkpoint.', True)
        packed = command(['tar', '--exclude=node_modules', '--exclude=storybook-static',
                          '--exclude=.git', '-cf', '-', 'app'])
        if packed.returncode or len(packed.stdout) > 20000000:
            return text('The app directory could not be packed or exceeded 20 MB.', True)
        with target.open('xb') as archive:
            archive.write(packed.stdout)
        digest = hashlib.sha256(packed.stdout).hexdigest()
        note({'tool': name, 'stage': stage, 'sha256': digest})
        return text(stage + ' source snapshot sealed at SHA-256 ' + digest)
    if name == 'ask_product':
        question = arguments['question']
        key = hashlib.sha256(question.encode()).hexdigest()[:16]
        note({'tool': name, 'question': question, 'id': key})
        for _ in range(40):
            if question_path.is_file():
                answers = json.loads(question_path.read_text(encoding='utf-8'))
                if key in answers:
                    note({'tool': name, 'id': key, 'answer': answers[key]})
                    return text(answers[key])
            time.sleep(0.5)
        return text('The question is recorded. Follow the shared brief for now and record any unresolved product choice in the handoff.')
    return text('Unknown tool', True)

for line in sys.stdin:
    try:
        request = json.loads(line)
        if 'id' not in request:
            continue
        method = request.get('method')
        if method == 'initialize':
            result = {
                'protocolVersion': request['params']['protocolVersion'],
                'capabilities': {'tools': {}},
                'serverInfo': {'name': 'isolated-benchmark', 'version': '1.0'},
            }
        elif method == 'tools/list':
            result = {'tools': tools}
        elif method == 'tools/call':
            result = call(request['params']['name'], request['params'].get('arguments', {}))
        elif method == 'ping':
            result = {}
        else:
            result = None
        response = {'jsonrpc': '2.0', 'id': request['id']}
        if result is None:
            response['error'] = {'code': -32601, 'message': 'Method not found'}
        else:
            response['result'] = result
    except Exception as error:
        response = {'jsonrpc': '2.0', 'id': request.get('id'), 'error': {'code': -32603, 'message': str(error)}}
    print(json.dumps(response), flush=True)
