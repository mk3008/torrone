"""Package current review targets; historical evidence stays in docs/poc."""
import argparse
import hashlib
import html
import json
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args], text=True).strip()


def build():
    entries = json.loads((ROOT / 'review/examples.json').read_text(encoding='utf-8'))
    revision = git('rev-parse', 'HEAD')
    dirty = bool(git('status', '--porcelain'))
    prepared = []
    ids = set()
    for entry in entries:
        key = entry['id']
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', key) or key in ids:
            raise ValueError(f'Invalid or duplicate example ID: {key}')
        ids.add(key)
        for field in ('source', 'evidence'):
            path = (ROOT / entry[field]).resolve()
            if not path.is_relative_to(ROOT) or not path.is_file():
                raise ValueError(f'Invalid {field}: {entry[field]}')
        data = (ROOT / entry['source']).read_bytes()
        assets = []
        for name in entry.get('assets', []):
            # Explicit sibling assets only; no dependency discovery or repository upload.
            if Path(name).name != name or not re.fullmatch(r'[a-zA-Z0-9_-]+\.(css|js)', name):
                raise ValueError(f'Invalid asset name: {name}')
            path = (ROOT / entry['source']).parent / name
            if not path.resolve().is_relative_to(ROOT) or not path.is_file():
                raise ValueError(f'Invalid asset: {name}')
            assets.append((name, path.read_bytes()))
        prepared.append((entry, data, assets))

    parent = ROOT / 'tmp/review'
    parent.mkdir(parents=True, exist_ok=True)
    output = Path(tempfile.mkdtemp(prefix=revision[:12] + '-', dir=parent))
    cards, candidate_cards, records = [], [], []
    for entry, data, assets in prepared:
        filename = entry['id'] + '/index.html' if assets else entry['id'] + '.html'
        (output / filename).parent.mkdir(parents=True, exist_ok=True)
        (output / filename).write_bytes(data)
        asset_records = []
        for name, asset_data in assets:
            asset_file = entry['id'] + '/' + name
            (output / asset_file).write_bytes(asset_data)
            asset_records.append({'file': asset_file, 'sha256': hashlib.sha256(asset_data).hexdigest()})
        digest = hashlib.sha256(data).hexdigest()
        records.append({**entry, 'file': filename, 'sha256': digest, 'asset_hashes': asset_records})
        esc = html.escape
        evidence = f"https://github.com/mk3008/torrone/blob/{revision}/{entry['evidence']}"
        group = candidate_cards if entry.get('implementation_candidate') else cards
        group.append(f'''<article id="{entry['id']}">
<h2>{esc(entry['title'])}</h2><p>{esc(entry['guidance'])}</p>
<p class="note">{esc(entry['status'])}</p>
<p><a class="open" href="{filename}">Open example</a> <a href="{evidence}">Review notes at base commit</a></p>
<details><summary>Review identity</summary><p>Example: {entry['id']}</p>
<p>Source: <code>{esc(entry['source'])}</code></p><p>SHA-256: <code>{digest}</code></p></details>
</article>''')
    manifest = {'revision': revision, 'dirty': dirty, 'examples': records}
    (output / 'review-build.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    template = (ROOT / 'review/index.template.html').read_text(encoding='utf-8')
    sections = '<section aria-labelledby="references-heading"><h2 id="references-heading">References and working drafts</h2>' + '\n'.join(cards) + '</section>'
    if candidate_cards:
        sections += '<section aria-labelledby="candidates-heading"><h2 id="candidates-heading">Active implementation candidates</h2><p>Temporary consuming-product examples with an unfinished review purpose. Remove completed, integrated or discarded candidates from <code>review/examples.json</code>; preserve historical evidence under <code>docs/poc/</code>.</p>' + '\n'.join(candidate_cards) + '</section>'
    page = template.replace('{{cards}}', sections).replace('{{revision}}', revision)
    page = page.replace('{{state}}', 'Uncommitted working-tree snapshot' if dirty else 'Committed snapshot')
    (output / 'index.html').write_text(page, encoding='utf-8')
    return output


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--serve', action='store_true', help='Build and serve on loopback for local browser checks')
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    output = build()
    print(output, flush=True)
    if args.serve:
        from functools import partial
        from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
        handler = partial(SimpleHTTPRequestHandler, directory=str(output))
        print(f'Local review: http://127.0.0.1:{args.port}/ (not a mobile sharing URL)', flush=True)
        with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                pass
