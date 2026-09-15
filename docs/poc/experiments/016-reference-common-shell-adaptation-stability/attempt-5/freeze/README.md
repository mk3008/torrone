---
type: PoC React harness freeze
title: React framework-adaptation harness integrity boundary
status: prepared; no adaptation Run has started
---

# React harness freeze

[react-harness-input-blobs.json](react-harness-input-blobs.json) is the
canonical blob inventory for the empty React harness and its shared experiment
condition. [check-react-harness-input.ps1](check-react-harness-input.ps1)
requires those blobs in `HEAD` and the index, rejects staged and unstaged
differences, and rejects untracked files below the two fixed roots.

When called with `-RunRoot`, it additionally compares a derived Run's package
definition, lockfile, TypeScript configuration, Vite configuration, and local
ignore rules against the canonical harness. It intentionally does not compare
the derived application's implementation source: that is the future Run's
assigned work, not part of this empty template.

The checker invokes the Attempt 4 portable preflight unchanged, which in turn
invokes the Reference, product, and Attempt 3 preflights. It therefore keeps
the four input owners separate rather than copying their content here.

The canary script is observation tooling, not a common-shell implementation.
It starts Vite only on `127.0.0.1`, uses a task-local npm cache and temporary
browser captures, then removes the server process tree, worktree, cache, logs,
and captures.
