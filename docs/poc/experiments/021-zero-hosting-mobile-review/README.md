# Zero-hosting mobile review in Work — Issue #5

## Result

**does-not-meet in the observed Work environment.** Cloud browser access to the local Reference was blocked by its URL policy. Phone takeover was not reached. Do not adopt zero-hosting takeover as the default review loop on this evidence. This is an environment-scoped result, not a claim that every Work environment lacks local preview support.

No hosting infrastructure, frontend toolchain or runtime dependency was added. The repository already had a separately authorized private Sites review loop before this experiment; it was neither used as evidence of zero-hosting success nor modified here. Any new fallback evaluation is separate work, as required by Issue #5.

## Source and environment

- Checked-out main: `7012c70e7e0bd45894815e05deb7c1d5d2872295` (including the owner's wording adjustment).
- Existing artifact: `review/references/date-range.html`, 39,899 bytes.
- SHA-256: `9461cecf6081c4b1bdb037afda4174a701ba6b5d39fbee1c239a2da5951c6987`.
- Installed runtime: Python 3.12.14; built-in `http.server` only.
- Browser: Work Cloud Chrome through the provided browser capability.
- Server log timestamp: 17 September 2026, 06:54:44, as emitted by the runtime; not evidence of the phone's timezone.

## Steps and observations

1. Fetch `origin/main`, check out its exact revision above, and use the existing Reference directory without modifying it.
2. From the repository root run `python3 -m http.server 4185 --bind 0.0.0.0 --directory review/references`. The first plain-pipe session yielded without output. A later PTY attempt printed `Serving HTTP on 0.0.0.0 port 4185`. Separate command executions requesting `http://127.0.0.1:4185/date-range.html` returned connection refused. The cause of cross-execution reachability was not established; a running session handle alone did not prove shared networking.
3. Navigate the Cloud browser to `http://terminal.local:4185/date-range.html`. It returned `net::ERR_BLOCKED_BY_CLIENT`. A subsequent visible-state inspection reported `chrome-error://chromewebdata/` and an explicit Cloud browser URL-policy rejection. The tool prohibited workaround paths. No alternate browser route, tunnel or hosting bypass was attempted.
4. Independently check static serving entirely inside one Python execution using the code below. It returned HTTP 200, 39,899 bytes, identical to the source with the SHA-256 above. This verifies only local HTTP delivery, not browser access or JavaScript execution.
5. Stop both server sessions. Do not request phone takeover of an inaccessible page.

```python
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
from threading import Thread
import urllib.request
import hashlib

server = ThreadingHTTPServer(
    ('127.0.0.1', 0),
    partial(SimpleHTTPRequestHandler, directory='review/references'),
)
Thread(target=server.serve_forever, daemon=True).start()
try:
    with urllib.request.urlopen(
        f'http://127.0.0.1:{server.server_port}/date-range.html'
    ) as response:
        data = response.read()
        assert data == Path('review/references/date-range.html').read_bytes()
        print(response.status, len(data), hashlib.sha256(data).hexdigest())
finally:
    server.shutdown()
    server.server_close()
```

## Coverage and decision boundary

| Layer | Observed result | Limit |
| --- | --- | --- |
| Work execution and static HTTP | Same-execution HTTP 200 and exact source bytes | Cross-command endpoint requests refused; cause unknown |
| Cloud browser HTTP access | URL-policy block | No Reference rendered |
| CSS, JavaScript, states, keyboard/focus, relative assets | Not verified in Cloud browser | Receiving HTML is not executing it; the chosen Reference embeds CSS/JS and does not exercise sibling assets |
| Phone takeover | Not attempted | Browser access prerequisite failed; no phone usability conclusion |

No UI semantics, application interaction policy, curation or approval identity changed. This experiment neither weakens prior regression tests nor converts earlier hosted-phone reviews into takeover evidence. Reopen this bounded experiment only when the environment supplies an explicitly supported local-preview route; repeat browser and actual phone operation before changing the verdict. No new recurring GUI finding or untracked implementation request arose: the negative Gate ends this task's experiment under Issue #5.
