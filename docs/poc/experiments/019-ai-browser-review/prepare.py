#!/usr/bin/env python3
"""Prepare an isolated, buildless browser fixture without editing the Reference."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[4]
SOURCE = ROOT / 'review/references/date-range.html'
EXPECTED_BLOB = 'd2be91d512ac310cb306adfe0e9bfe556ec2bca8'


def prepare(destination):
    content = SOURCE.read_bytes()
    blob = hashlib.sha1(b'blob ' + str(len(content)).encode() + b'\0' + content).hexdigest()
    if blob != EXPECTED_BLOB:
        raise SystemExit('Reference identity changed; select and document a new review before preparing.')
    destination.mkdir(parents=True, exist_ok=False)
    (destination / 'date-range.html').write_bytes(content)
    (destination / 'package.json').write_text(json.dumps({
        'private': True, 'type': 'module', 'scripts': {'dev': 'node serve.mjs'}
    }, indent=2) + '\n')
    (destination / 'serve.mjs').write_text('''import http from 'node:http';
import { readFile } from 'node:fs/promises';
const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const port = Number(option('--port', '4173'));
const host = option('--host', '127.0.0.1');
const files = new Map([['/', 'index.html'], ['/date-range.html', 'date-range.html']]);
http.createServer(async (req, res) => {
  const name = files.get(new URL(req.url, 'http://localhost').pathname);
  if (!name) { res.writeHead(404); res.end(); return; }
  try {
    const body = await readFile(new URL(name, import.meta.url));
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store'});
    res.end(body);
  } catch { res.writeHead(500); res.end(); }
}).listen(port, host);
''')
    (destination / 'index.html').write_text('''<!doctype html><html lang="en"><head>
<meta charset="utf-8"><title>Issue 9 width fixture</title></head><body>
<p>Width fixture, not phone emulation</p>
<button onclick="document.querySelector('iframe').style.width='320px'">320 CSS pixels</button>
<button onclick="document.querySelector('iframe').style.width='390px'">390 CSS pixels</button>
<button onclick="document.querySelector('iframe').style.width='900px'">900 CSS pixels</button>
<p><a href="/date-range.html">Unframed Reference</a></p>
<iframe title="Approved Date range" src="/date-range.html" style="width:390px;height:760px;border:1px solid #777"></iframe>
</body></html>''')
    (destination / 'fixture.json').write_text(json.dumps({
        'source': str(SOURCE.relative_to(ROOT)), 'git_blob': blob,
        'sha256': hashlib.sha256(content).hexdigest(),
        'checkout': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
        'note': 'Width fixture only; not phone/IME or touch emulation.'
    }, indent=2) + '\n')
    print(destination.resolve())


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=Path, help='A new directory; existing output is never overwritten')
    prepare(parser.parse_args().destination)
