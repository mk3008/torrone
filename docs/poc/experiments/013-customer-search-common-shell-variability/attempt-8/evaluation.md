# Evaluation

## Status

`invalidated — not a reproducibility result`

## Why this attempt is invalid

The run set was intended to compare three independent implementations against
one frozen Manifest snapshot, one fixed product-facts prompt, and one shared
shell input. During visual inspection, Run 2 was edited and re-captured after
generation. This changes one member of the sample while the other two still
represent the earlier input/output event.

The generation task also contained supplementary HTML/CSS implementation
directions beyond the consumer-visible input packet. Consequently this attempt
does not isolate what the declared Manifest and prompt communicated.

## What this record establishes

It establishes a protocol defect, not a result about Manifest quality:

- the shared shell fixture did not state whether it was immutable, what could
  change, or where page content could be inserted;
- the product prompt did not supply navigation values even though navigation is
  product binding; and
- the static check did not establish visible Header/Drawer equivalence across
  its four capture states.

The original pre-repair observation was not preserved as a separately fixed
artifact, so this attempt must not be treated as a reliable negative visual
example either.

## Next attempt

The next attempt is `composition-with-fixed-shell` under the
[three-run reproducibility protocol](../../three-run-reproducibility-protocol.md).
It will freeze an immutable common-shell fixture with a declared page slot,
use a product-facts-only prompt, generate all three runs without later edits,
and classify the untouched outputs before proposing any new input change.
