# Evaluation

## Status

`human review required`

## Input integrity

- Frozen Manifest snapshot: 45 files.
- Fixed prompt: unchanged across all three runs.
- Generator model: `gpt-5.6-terra`, reasoning effort `medium`.
- Run outputs were created in separate owned directories. No Run was repaired
  after generation.
- An earlier preliminary `attempt-4` was excluded because one generator had
  seen the evaluation contract, which is not consumer input. `attempt-5` is the
  first valid three-Run set for this change and is the only set evaluated here.

## Automated evidence

### Static composition

`tests/check-common-shell-navigation-scroll-variability-attempt5.ps1` passed.
It checked three Run directories, 45 frozen Manifest files, no external
dependencies, all four query-addressable initial states, a search input without
a submit control, filtering/no-match/clear source hooks, the `1`–`80` fixture,
and 15 fixed PNG captures.

### Fixed browser captures

Chrome `150.0.7871.187` captured all four Drawer/theme initial states at
`1440 x 1200` and the Light/Drawer-open state at `720 x 1200` for each Run.
The capture command used `--headless=new --disable-gpu`; SwiftShader was not
used because every initial capture succeeded on the first attempt. See
`capture-record.json` for the exact command template, raw-byte digests, sizes,
and dimensions.

### Runtime checks

Playwright checked each locally served Run with the real search field and real
wheel input. The runtime record captures a matching filter, a no-match filter,
and independent Drawer/workspace scroll positions. In all three Runs:

- filtering for `01-01` retained `グループ 01` with matching child
  `項目 01-01`;
- a `zzzz` filter displayed a no-match state;
- Drawer wheel input changed Drawer scroll while workspace remained at `0`;
- workspace wheel input changed workspace scroll while the Drawer position was
  retained; and
- the Header bounding-box top remained `0` after workspace scrolling.

See `runtime/runtime-record.json` and the runtime screenshots.

### Fresh-reader screen review

The visible shell is readable as a reusable workspace rather than a simulated
business screen: the Header supplies one workspace identity and two icon-only
controls, the Drawer supplies a labelled local search and a two-level current
location, and the workspace is intentionally limited to the required neutral
scroll fixture. No invented business data, routes, actions, or explanatory
product copy appeared. The necessary limitation is deliberate: this is only a
common-shell experiment, so keyboard/focus, Escape, assistive technology,
preference persistence, and responsive behavior beyond the narrow initial
capture are not accepted here.

The three generated designs vary in CSS/geometry but maintain the required
responsibility boundaries. The source-level and runtime evidence found no
contract contradiction that warrants changing either the Manifest or the fixed
product prompt before human review.

## Self-review

### Cycle 1 — contract and rendered states

Reviewed the five fixed captures per Run, the matching/no-match runtime
captures, and the workspace-scroll capture. Header availability, the absence of
a hidden Drawer track, local Drawer filtering, parent retention, and separate
scrolling all had direct evidence. The only visible variation is presentational
(for example, how the intentionally meaningless `1`–`80` fixture is framed),
which the Manifest deliberately leaves to the implementation.

### Cycle 2 — boundary and evidence review

Rechecked the frozen-input contract, static checker, runtime position record,
external-reference scan, and standard-pack/source-boundary checks. No Run was
edited after generation, no business-screen content was introduced, and no
Manifest-owned behavior was moved into the prompt. No revision or fresh retry
is warranted before the human visual review.

## Limits

Initial captures demonstrate rendered starting states only. Keyboard, focus,
Escape, assistive technology, persistent preference, and responsive behavior
beyond the fixed narrow capture remain `UNCONFIRMED` unless separately tested.
The local HTTP server emitted one expected `favicon.ico` 404 while Playwright
loaded the static files; no application resource failed.
