from pathlib import Path
from datetime import datetime
import json
import sys

root = Path(__file__).resolve().parent
arms = ('prompt-only', 'torrone', 'storybook')
groups = {'desktop': 5, 'narrow': 8, 'interaction': 7, 'visual': 5}

def data(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))

def events(path):
    for line in path.read_text(encoding='utf-8-sig').splitlines() if path.is_file() else ():
        try:
            yield json.loads(line)
        except json.JSONDecodeError:
            continue

def seconds(start, end):
    return (datetime.fromisoformat(end) - datetime.fromisoformat(start)).total_seconds()

report = {}
for trial in sys.argv[1:]:
    report[trial] = {}
    for arm in arms:
        folder = root / 'runs' / trial / arm
        if not (folder / 'run.json').is_file():
            continue
        run = data(folder / 'run.json')
        tool_log = list(events(folder / 'tools.jsonl'))
        session = list(events(folder / 'events.jsonl'))
        usage = [event.get('usage', {}) for event in session if event.get('type') == 'turn.completed']
        run['usage'] = {key: sum(u.get(key, 0) for u in usage) for key in
                        ('input_tokens', 'cached_input_tokens', 'output_tokens', 'reasoning_output_tokens')} if usage else None
        run['toolCalls'] = {}
        for entry in tool_log:
            kind = entry['tool']
            run['toolCalls'][kind] = run['toolCalls'].get(kind, 0) + 1
        run['sessionItemTypes'] = sorted({event.get('item', {}).get('type') for event in session
                                          if event.get('item', {}).get('type')})
        run['toolErrors'] = [
            event['item']['error']['message'] for event in session
            if event.get('item', {}).get('error') and isinstance(event['item']['error'], dict)
        ]
        stamps = {entry['stage']: entry['utc'] for entry in tool_log if entry['tool'] == 'checkpoint'}
        run['timeToFirstSeconds'] = seconds(run['modelStartedUtc'], stamps['first']) if 'first' in stamps else None
        run['autonomousReviewSeconds'] = seconds(stamps['first'], stamps['final']) if all(k in stamps for k in ('first', 'final')) else None
        run['phases'] = {}
        for phase in ('first', 'final'):
            evidence = folder / phase / 'evaluation'
            if not (evidence / 'results.json').is_file():
                continue
            measured = data(evidence / 'results.json')
            run['phases'][phase] = {
                'passed': measured['passed'],
                'cases': measured['cases'],
                'groups': {group: {
                    'passed': sum(r['section'] == group and r['status'] == 'pass' for r in measured['results']),
                    'cases': denominator,
                } for group, denominator in groups.items()},
                'failed': [r['id'] for r in measured['results'] if r['status'] == 'fail'],
                'pageErrors': len(measured['pageErrors']),
                **data(evidence / 'receipt.json'),
            }
        report[trial][arm] = run
        print(trial, arm, run.get('timeToFirstSeconds'), run.get('autonomousReviewSeconds'),
              run['toolCalls'], {phase: measured['passed'] for phase, measured in run['phases'].items()})
(root / 'metrics.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
