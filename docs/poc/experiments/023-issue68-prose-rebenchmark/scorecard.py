import json
from pathlib import Path
from statistics import median
import sys

root = Path(__file__).resolve().parent
metrics = json.loads((root / 'metrics.json').read_text(encoding='utf-8'))
arms = ('prompt-only', 'torrone', 'storybook')
names = ('Prompt Only', 'Torrone', 'Storybook')
valid_trials = sys.argv[1:]
records = {arm: [metrics[trial][arm] for trial in valid_trials if arm in metrics.get(trial, {})] for arm in arms}
sections = {'desktop': 'Desktop fit', 'narrow': 'Narrow fit',
            'interaction': 'Interaction and state', 'visual': 'Visual geometry and state'}

def all_measured(arm, phase):
    runs = records[arm]
    return bool(runs) and len(runs) == len(valid_trials) and all(phase in run['phases'] for run in runs)

def fraction(arm, phase, group=None):
    if not all_measured(arm, phase):
        return None
    scores = [run['phases'][phase] for run in records[arm]]
    if group:
        scores = [score['groups'][group] for score in scores]
    return (sum(score['passed'] for score in scores), sum(score['cases'] for score in scores))

def display(f):
    return 'N/A' if f is None else f'{f[0]}/{f[1]}'

def line(label, values):
    print('| ' + ' | '.join([label, *values]) + ' |')

def header(label):
    line(label, names)
    print('| --- | ---: | ---: | ---: |')

header('Oracle')
line('First → final aggregate', [display(fraction(arm, 'first')) + ' → ' + display(fraction(arm, 'final')) for arm in arms])
for section, label in sections.items():
    finals = [fraction(arm, 'final', section) for arm in arms]
    best = max((score[0] for score in finals if score), default=0)
    stars = [' ★' if score and score[0] == best and best else '' for score in finals]
    line(label, [display(fraction(arm, 'first', section)) + ' → ' + display(value) + star
                 for arm, value, star in zip(arms, finals, stars)])
line('Final runs', [
    ', '.join(f"{run['phases']['final']['passed']}/{run['phases']['final']['cases']}"
              if 'final' in run['phases'] else 'N/A' for run in records[arm]) or 'N/A'
    for arm in arms
])
print()
header('Measured effort, median per trial')
for label, key, integer in [
    ('Arm preparation (s)', 'setupSeconds', False),
    ('Implementation to first snapshot (s)', 'timeToFirstSeconds', False),
    ('Autonomous review and repair (s)', 'autonomousReviewSeconds', False),
    ('Setup + model session + both evaluations (s)', 'measuredTotalSeconds', False),
    ('Model input + output (tokens)', 'totalTokens', True),
]:
    values = []
    for arm in arms:
        runs = records[arm]
        if not all_measured(arm, 'final'):
            values.append(None)
            continue
        samples = []
        for run in runs:
            if key == 'measuredTotalSeconds':
                sample = run['setupSeconds'] + run['modelSeconds'] + sum(p['seconds'] for p in run['phases'].values())
            elif key == 'totalTokens':
                sample = run['usage']['input_tokens'] + run['usage']['output_tokens'] if run['usage'] else None
            else:
                sample = run.get(key)
            if sample is not None:
                samples.append(sample)
        values.append(median(samples) if len(samples) == len(runs) else None)
    best = min((value for value in values if value is not None), default=None)
    line(label, [((f'{value:,.0f}' if integer else f'{value:,.1f}') + (' ★' if value <= best * 1.05 else '')) if value is not None else 'N/A'
                 for value in values])
line('Billed cost', ['N/A'] * 3)
