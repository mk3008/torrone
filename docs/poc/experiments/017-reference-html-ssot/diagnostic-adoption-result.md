---
type: PoC experiment result
title: Diagnostic Presentation Adoption Gate result
status: diagnostic-adoption-confirmed
source: fresh third-responsibility comparisons, fixed reporting utility, reversible negative probe, and post-Gate adoption evidence
---

# Attainment status

- **Gate status:** `diagnostic-adoption-confirmed`
- **Workflow attainment:** `done`, with two pre-existing regression-harness
  limitations recorded below.
- **Decision scope:** PoC 017 reviewer presentation only. Raw comparison JSON
  remains authoritative.

# Outcome

The unchanged exact-observation reporter worked for a third responsibility: a
fixed read-only shipment-exception summary integrated into the fixed common
shell. The shell comparison produced 78 raw informational differences and six
reviewer entries. The detail comparison produced 48 raw informational
differences and 17 reviewer entries. All 126 raw indexes are represented once,
and 103 repetitions were folded without a cause inference or a
Reference-specific rule.

The result justifies limited PoC 017 adoption. A best-effort publisher and a
four-report post-Gate adapter now generate disposable JSON and Markdown from
the existing partial and form-heavy Gate raw outputs. They do not run a
browser, change the raw report, or affect comparison status. The fixed producer
scripts were deliberately not edited because they are members of later frozen
evidence packets.

# Reused Reference and comparison

- Common shell: Variant 04 `common-shell.html`.
- Responsibility-distinct part: Variant 08 Candidate A
  `detail-summary.html`.
- New artifact: one noncanonical integrated Target under Variant 10.
- Fresh comparison family: Target against shell, then Target against detail,
  with both Chrome 151 baselines captured before the comparisons in the same
  run.

The Target adds no new workflow or canonical design. It keeps main-content
scrolling on an outer container so the detail `main` retains the detail
Reference's observed semantics and styles. One initial Target-only mismatch in
status-badge spacing/color and `main` overflow was corrected without changing
either Reference or the comparator.

# Utility reuse and false grouping

`diagnostic-presentation.mjs` remained byte-identical at
`42C28A6BD2678AB20304469F5C1A8FC8496DECB0C40D34C8D75DFEAB45E65D4C`.
No grouping, taxonomy, raw-schema, CLI, Core, or tolerance change was required.

The new detail data independently reproduced the rejected field-only failure:
`semantic:role:main.box.height` had three occurrences but two different exact
expected/actual observations. Field-only grouping would have merged them;
exact observation signatures retained two entries. The fixture tests also
retain all four required distinctions: different values, different keys,
different properties, and equal observations repeated only across state/frame.

# Reviewer cost

| Evidence | Raw diagnostics | Exact entries | Repetitions folded | Raw JSON lines | Reviewer Markdown lines |
| --- | ---: | ---: | ---: | ---: | ---: |
| shell | 78 | 6 | 72 | 603 | 27 |
| detail | 48 | 17 | 31 | 366 | 38 |
| **new responsibility** | **126** | **23** | **103** | **969** | **65** |
| prior search + form | 820 | 79 | 741 | — | — |
| **all demonstrated families** | **946** | **102** | **844** | — | — |

The benefit is not the ratio alone. The 23 entries are the 23 distinct exact
observations supported by the raw data, and every omitted row is only a
state/frame repetition of one of them.

# Negative probe and traceability

A reversible light-focus-color defect produced two raw errors with one exact
signature plus the existing 48 informational differences.

- first raw error: difference 17;
- presentation error: entry 1;
- presentation-to-raw indexes: 17 and 34;
- raw CLI exit: 1;
- direct reporter exit: 1;
- raw status and presentation status: `fail`;
- Target, both baselines, and reporter restored to their pre-probe SHA-256.

Repeated JSON and Markdown output was byte-identical. Source SHA-256 and
one-based raw indexes are present in every presentation.

# Conditional adoption

Adoption adds two PowerShell files:

- a 91-line best-effort publisher around the fixed Node reporter;
- a 40-line adapter for the four existing part-to-integrated raw filenames.

The publisher writes temporary derived files, verifies that the raw hash did
not change, and promotes both outputs only after successful reporter execution.
For failing raw evidence, reporter exit 1 is the expected successful
publication outcome; the derived status remains `fail`. If the reporter is
missing or fails, the publisher returns `skipped`, exits 0, removes only the
specified derived outputs, and leaves the raw hash unchanged.

This is a post-Gate step rather than a change to the fixed producer scripts.
It preserved all four saved raw hashes and generated 79 reviewer entries from
their 820 diagnostics. Two runs produced eight byte-identical JSON/Markdown
pairs. Presentation can be omitted and the original Gates retain their
existing authority and behavior.

# Central-cost decision

The existing reporter, analysis helper, and tests remain 253, 133, and 73
lines. Applying them to the new responsibility required zero changes and zero
Reference-specific rules. The 131 adoption lines isolate publication failure
and map four existing outputs; they add no dependency or browser work.

That cost is justified at the current PoC scale: the unchanged central
implementation now covers six comparisons across search, form-heavy, shell,
and read-only-detail responsibilities and reduces 946 raw observations to 102
distinct observations with complete traceability. A public command, schema,
or permanent file layout is still not justified or frozen.

# Regression and authority evidence

- CLI/Core, canonical/partial References, existing Targets, Consumers,
  comparison semantics, tolerances, and raw schemas changed by zero.
- Existing saved Diagnostic and Token evidence packets remained digest-identical.
- Four fresh current search/form comparisons passed with 182, 199, 247, and
  192 diagnostics and zero errors.
- Full Reference Conformance passed in an isolated copy: eight positive shapes,
  nine reversible probe families, canary `pass/error/pass`, established CSS,
  historical, and semantic-only negatives, 51 attempts, zero timeout/retry.
- The third-responsibility snapshots and comparisons had zero console errors,
  failed requests, external requests, accessibility issues, or action errors.

Two existing harness limitations were not hidden or repaired:

1. The older partial and form-heavy Gate scripts stop before execution because
   they pin the superseded Core SHA `14BB…`, while the current fixed Core is
   `62F…`. Updating those frozen guards would cascade through later evidence
   packets, so this phase left them unchanged and used their saved raw plus
   fresh equivalent current comparisons.
2. The current Diagnostic Gate's focus probe now detects three errors across
   two signatures instead of its exact assertion of two errors/one signature.
   The extra `query-filter` focus-color error strengthens detection; all four
   positive comparisons passed and the Target restored byte-identically. The
   brittle count assertion was not weakened.

# Long-lived knowledge promoted

The cross-experiment boundary now records that exact-observation presentation
reproduced across a third, read-only-detail responsibility; that the
presentation is a regenerable nonauthoritative derivative; and that reporting
stays separate from Reference, Consumer, CLI/Core comparison, and Conformance
responsibilities. It also records same-lineage fresh baselines as a comparison
condition rather than a reporting tolerance.

# Still candidate or unconfirmed

Public CLI placement, report schema/versioning, compact index syntax,
long-term output layout, workspace-below composite References, Consumer
identity interference, responsive/other-browser/AT coverage, Reference
Profile freeze, and MCP remain unconfirmed. The token-ownership conclusion was
rechecked for presence and not duplicated or reopened.

# Human judgment and next phase

No human UI or diagnostic-importance judgment is required for this Gate. The
next phase should repair or replace stale frozen verification entry points as a
separate evidence-maintenance decision before considering any public reporting
command. Do not freeze the presentation schema or move it into CLI/Core from
this result alone.
