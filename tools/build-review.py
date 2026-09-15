"""Package selected research References for review; never modify their sources."""
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
        prepared.append((entry, data))

    parent = ROOT / 'tmp/review'
    parent.mkdir(parents=True, exist_ok=True)
    output = Path(tempfile.mkdtemp(prefix=revision[:12] + '-', dir=parent))
    cards, records = [], []
    for entry, data in prepared:
        filename = entry['id'] + '.html'
        (output / filename).write_bytes(data)
        digest = hashlib.sha256(data).hexdigest()
        records.append({**entry, 'file': filename, 'sha256': digest})
        esc = html.escape
        evidence = f"https://github.com/mk3008/torrone/blob/{revision}/{entry['evidence']}"
        cards.append(f'''<article id="{entry['id']}">
<h2>{esc(entry['title'])}</h2><p>{esc(entry['guidance'])}</p>
<p class="note">{esc(entry['status'])}</p>
<p><a class="open" href="{filename}">Open example</a> <a href="{evidence}">Research record at base commit</a></p>
<details><summary>Review identity</summary><p>Example: {entry['id']}</p>
<p>Source: <code>{esc(entry['source'])}</code></p><p>SHA-256: <code>{digest}</code></p></details>
</article>''')
    manifest = {'revision': revision, 'dirty': dirty, 'examples': records}
    (output / 'review-build.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    template = (ROOT / 'review/index.template.html').read_text(encoding='utf-8')
    page = template.replace('{{cards}}', '\n'.join(cards)).replace('{{revision}}', revision)
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
