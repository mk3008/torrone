# Development and Reference review

Use ChatGPT Work to edit a Git branch and return a PR. Use a browser to operate the exact Reference snapshot under review. A screenshot or passing comparison does not replace human design review.

## Minimal environment

For the review bundle, use Git and Python 3.10 or later on Linux, macOS, or Windows. No package installation, frontend build system, database, API key, or PowerShell is needed. Existing research tools keep their own dependencies; they are not setup requirements for this loop.

From the repository root:

```sh
python3 tools/build-review.py --serve
```

On Windows, use `py -3` instead of `python3` if appropriate. Open `http://127.0.0.1:8000/` on the execution machine. Stop with Ctrl+C. To package without starting a server:

```sh
python3 tools/build-review.py
```

The command prints a fresh directory below ignored `tmp/review/`. Each build gets a new directory; it never overwrites earlier previews or research evidence. It copies only the explicitly selected, self-contained HTML examples, adds the review index, and records source paths, content hashes, base commit, and whether the working tree was dirty in `review-build.json`.

`review/examples.json` is a small development entry list, not a Reference profile, discovery result, or approval registry. The active examples are responsive working copies in `review/references/`, derived from existing research samples. Historical sources remain untouched. The builder copies the selected files without rewriting them or wrapping them in an iframe. In particular, the date range sample preserves its historical fixed date fixture.

## Phone review

Loopback URLs refer to the execution machine; they are not shareable links for a phone. A cloud task's local server alone does not provide a durable mobile review surface.

For remote review, deploy only the generated directory to a static host with an HTTPS URL and the intended audience. ChatGPT Sites is a candidate for an owner-private review surface; publication is separate from building this bundle. Do not upload the entire research repository or assume that pushing a PR publishes a preview.

The owner approved a private Sites review surface on 2026-09-15. Reuse [Torrone Reference Review](https://torrone-reference-review.mssg-mobile2000.chatgpt.site) with owner-only access and update it from the requested branch. Keep Torrone's GitHub repository authoritative; any hosting-side source repository contains generated distribution only. Record the resulting URL and the exact Torrone revision in the PR or Work handoff. Verify access from the phone before calling the mobile loop complete.

1. Commit the candidate and build a clean snapshot so its base commit identifies the review source precisely.
2. Publish that generated directory through the approved hosting mechanism.
3. Open the URL on the phone, select an example, and operate it directly.
4. Return feedback in the Work thread or PR: example ID, revision, device/browser, actions, observed result, expected result, and optional screenshot.
5. Make the bounded correction on the working branch, regenerate, and repeat human review.

The index and active working copies adapt to narrow screens. Historical research References retain their authored layouts, including desktop assumptions. Phone review access and responsive product design are different questions; do not silently redesign an archived Reference to fit the review device. For a design change, create a clearly identified working copy outside historical evidence and point the entry list at it.

## Verification and preserved gaps

Check that generated HTML matches the selected source bytes, links resolve, the index works at phone width, and the relevant example interaction still operates. Inspect the diff to confirm historical sources and outputs were not modified. New previews do not need a rerun of all old experiments.

PoC 017 remains `partial`: the historical evidence incident and its recovery requirement in [the research handoff](poc/reference-html-program-summary.md) remain unresolved. This development entry point does not start Reference Discovery / Curation, repair that evidence, or accept its Gate. Do not run legacy conformance commands merely to launch a preview; some have a recorded history of overwriting evidence.

No new orchestration skill or model-specific framework is required. `AGENTS.md` remains the operating guidance; select the available model in Work. Add reusable automation only when a repeated task justifies it.

## Official Work guidance

The [official Work introduction](https://learn.chatgpt.com/docs/get-started-with-work) explains the product's execution modes. Check current availability and permissions in the active environment rather than assuming every Work surface exposes identical preview or hosting capabilities. This repository's portable static bundle does not depend on a specific Work UI or a continuously running personal computer.

## Current responsive draft

See [Mobile review decisions](mobile-review-decisions.md) for the bounded design choices, source provenance, and remaining validation. These drafts are not newly approved design originals.
