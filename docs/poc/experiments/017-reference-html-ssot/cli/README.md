# Reference UI PoC CLI

The CLI is the only analysis and comparison entry point in this experiment.
Its browser-side Core reads the live DOM and computed styles. A future MCP
adapter, if justified, should call the same command/Core and return these JSON
records rather than reimplementing parsing or comparison.

The CLI uses Node.js built-ins and an installed Chrome or Edge browser. It has
no package install or build step.

## Commands

```powershell
node cli/reference-ui.mjs snapshot reference/index.html `
  --out output/reference.snapshot.json `
  --artifacts output/reference

node cli/reference-ui.mjs verify consumers/vanilla/index.html `
  --baseline output/reference.snapshot.json `
  --out output/vanilla.report.json `
  --artifacts output/vanilla
```

Use `--root <directory>` when an entry intentionally loads local files from a
sibling directory. The CLI rejects paths outside that explicit serving root.

Use `--scenario-overrides <json>` only when a content-different Target needs a
different value for a Reference `fill` action. The file can replace string
input values by scenario name and one-based step; it cannot replace actions,
targets, expected states, styles, or comparison rules. This keeps Target
fixture vocabulary out of product UI without creating a second expected-state
source.

`snapshot` records the initial browser state and every state after each
Reference-declared action. `verify` replays the Reference actions in the target
and compares stable-key semantics, state, selected computed styles, focus, and
bounded accessibility observations. Visible copy and DOM/class/component
structure are not compared.

For an unkeyed `aria-describedby` target, comparison records the target tag,
inferred role, and visibility rather than its local ID spelling. Local IDs are
implementation details and may differ between a Reference and Target. A
missing target still fails comparison and Reference Conformance, and a visible
versus hidden target still differs. This bounded normalization does not claim
that different product wording has the same meaning.

For `aria-activedescendant`, the Core records whether the relation is present
in each observed state and resolves its target through the same existing
explicit/semantic identity map used for elements, actions, and focus. Different
Reference and Target local IDs can therefore resolve to the same option
identity. A wrong existing option, missing target, or duplicate identity fails
without using option text, fixture values, DOM order, or local ID spelling.
This does not require the attribute in states where the Reference omits it, and
an unresolved option is not promoted to a transferable identity.

The experimental mixed mode also observes an unannotated element when a native
role, `aria-live` state, or `aria-pressed` control identifies exactly one
product element. The generated key starts with `semantic:` and the same resolver
is used for scenario actions and focus. If a descriptor matches multiple
elements, the Core records the ambiguity and does not select by DOM order,
visible text, class name, or local ID. This is a PoC capability, not a frozen
Reference Profile or semantic-key catalog.

When a baseline has no explicit keys at all, the comparator also checks native
role counts for important semantic elements. This prevents a semantic-only
comparison from passing merely because the resolver ignored an unmatched form
control. Mixed baselines do not compare whole-page role counts because product
content may legitimately add unkeyed controls or links.

The JSON intentionally keeps geometry differences as diagnostics. This PoC has
not established that exact cross-content geometry is a safe automatic gate.

Exit codes:

- `0`: command completed and verification passed;
- `1`: verification completed and found a difference;
- `2`: usage, browser, file, or execution failure.

Set `REFERENCE_UI_BROWSER` or pass `--browser` when Chrome or Edge is not in a
known Windows installation path.
