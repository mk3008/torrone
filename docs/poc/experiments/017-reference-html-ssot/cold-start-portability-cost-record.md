# Cold-start / Portability cost record

## Packet cost

| Measure | Baseline | Final candidate | Delta |
| --- | ---: | ---: | ---: |
| packet files | 7 | 7 | 0 |
| human-readable documents | 3 | 3 | 0 |
| human-readable lines | 357 | 372 | +15 |
| human-readable bytes | 21,032 | 21,941 | +909 |
| accepted References | 2 | 2 | 0 |
| CLI/Core files | 2 | 2 | 0 |
| PoC history files | 0 | 0 | 0 |
| whole packet | 2,409 lines / 110,816 bytes | 2,424 lines / 111,725 bytes | +15 lines / +909 bytes |

The experimental additions were two 10-line notes totaling 1,101 bytes before
promotion. Editing them into the existing cross-PoC knowledge reduced the
durable delta to 15 lines and 909 bytes; no new guide or formal package was
added.

Rule count added:

- source-independence authoring/proof boundary: 1;
- Human Calibration interpretation boundary: 1;
- knowledge-elevation-specific rule: 0;
- task-specific DatePicker rule: 0.

## Fresh Agent reading and command cost

The search/shell authoring agents read two accepted References. The calibration
agents read two pre-calibration drafts; they did not read the approved final.
Each route also needed two authority documents and the CLI usage note.

Final observation command counts recorded by the Agents were:

| Run | CLI observation commands | Reason |
| --- | ---: | --- |
| A | 5 | preflight, snapshot, positive, negative, after-control |
| B | 12 | two preflights, two snapshots, positive, six negatives, after-control |
| C | 4 | preflight, snapshot, positive, negative |
| D | 6 | two preflights, two snapshots, positive, negative |

Syntax and source-audit commands are additional read-only checks, not CLI/Core
surface area.

## Experimental source cost

These are isolated evidence artifacts, not canonical Reference changes.

| Run | New Reference source | New Target source | CLI/Core change |
| --- | --- | --- | ---: |
| A | 3 files, 24,643 bytes | 3 files, 22,136 bytes | 0 |
| B | Single 17,976 bytes; Range 24,323 bytes | 1 file, 22,664 bytes | 0 |
| C | 1 file, 26,727 bytes | 3 files, 23,086 bytes | 0 |
| D | Single 15,942 bytes; Range 17,042 bytes | 3 files, 14,582 bytes | 0 |

Agent evidence, reports, screenshots, and evaluator reruns intentionally make
the experiment directory much larger (approximately 54 MiB across A–D). That
is audit evidence cost, not a proposed author packet or runtime dependency.

## Maintenance interpretation

The Baseline was already capable of producing operable References and passing
Targets. The added knowledge did not reduce implementation work; it prevented
two false success claims. This is a favorable cost only because 1,101 bytes of
experimental guidance were enough to change the outcome for two different
Fresh Agents without adding an API, parser rule, metadata field, dependency,
or task-specific answer.
