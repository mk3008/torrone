# Business-app standard pack

`design-manifest/` is the distributable, versioned standard pack. It contains authored Markdown guidance, finite configuration definitions, and flow concepts; it contains no source UI, screenshot, extraction trace, or product-specific binding.

`local-overrides/` demonstrates the recommended update-safe extension
mechanism. The record-list examples resolve the same fixed Markdown guidance
while changing only the five existing presentation settings. The
[theme-color example](local-overrides/theme-colors.example.yaml) changes
concrete Light and Dark values while preserving every semantic role. Editing
`design-manifest/` directly is a pack fork.

`product-bindings/` demonstrates a separate Application Input Contract input. It supplies only safe semantic references, not real routes, permissions, data, counts, or business copy. It declares available search, record-lifecycle, guided-task, and monitoring capabilities; without such a binding, an implementer must not invent the related feature, state, or destination.

`implementation-constraints.example.yaml` demonstrates a separate, optional
consumer input for delivery choices such as the render target, icon library,
and asset policy. It is outside `design-manifest/`, is not a UI configuration
override, and cannot change Manifest guidance or create product capability.
Its values are consumer-owned identifiers rather than a pack-maintained catalog.
Omit an unspecified field and resolve it from the target repository and task;
the example supplies no implicit default.
The example uses only `render_target`, `icon_library`, and `asset_policy` as
explicit implementation inputs. A named library does not authorize dependency
installation by itself; the target repository must already support it or the
task must explicitly authorize adding it. Explain any additional key in the
consumer task instead of treating this example as an extensible pack DSL.

## Phase 2 calibration cases

All cases use the same Markdown concepts. Case A uses no override and the supported binding: defaults are `start`, `[search, clear]`, `end`, `summary`, and `link`. Case B uses `local-overrides/record-list-alternate.yaml`: only placement, order, count visibility, and row-action treatment change. Case C uses the default resolution with `product-bindings/record-list-limited.example.yaml`: Clear, pagination, aggregate summary, and row operation are **not exercised** and their dependent UI is omitted; configuration does not recreate them.

An override is a value-only replacement against `configuration/record-list-options.md`; do not combine override files or add unknown IDs. Scalars and arrays replace whole values; `null` and an empty array are invalid. Check the selected binding after resolving values. A binding and override must identify the same `pack_id` and exact `pack_version`; a pack default/ID/allowed-value removal is breaking and needs an explicit migration or rejection instruction. Configuration cannot add a feature or supply a detail destination.

Distribute only `design-manifest/` as a ZIP or release artifact. Keep local overrides and implementation constraints beside a consuming product, retain product bindings with the product, and leave PoC/extraction material in `docs/poc/`.

See [Phase 2 configuration calibration](calibration.md) for the three-case comparison, setting classifications, capability omissions, and compatibility rules.

Record lifecycle, Dialog, Confirmation, Wizard, Dashboard, and accessibility
are fixed guidance plus product-binding responsibilities. Color and theme also
supplies one bounded local configuration:
[`theme-colors.default.yaml`](design-manifest/configuration/theme-colors.default.yaml).
Manifest consumers may replace its concrete `#RRGGBB` values through one
theme-color override. Role IDs and meanings, required Light/Dark modes, and
contrast obligations are not locally variable.

Use the [fixed and variable responsibility map](design-manifest/variability.md)
for a single cross-pack view of invariants, product-owned variables,
implementation decisions, the five existing record-list configuration IDs,
and the separate semantic theme-color values.

## Version 0.3.0 adoption

Version `0.3.0` changes the default `search_actions_region` from `end` to
`start` for bounded in-page search conditions. It also fixes in-page Create and
Save action groups at the logical start of their bounded form pane, while
retaining logical-end placement for actions in a fluid Grid result toolbar. For
pinned Grid columns, the boundary now uses the same token and thickness as the
row separator, with a subtle shadow only during horizontal scroll. The five
record-list setting IDs and allowed values remain unchanged.

Because this pre-1.0 pack requires exact identity, a consumer must review the
new guidance and then update its selected override and binding from `0.2.0` to
`0.3.0`. A consumer that relied on the former default must explicitly override
`search_actions_region: end` before moving to this version; otherwise the new
logical-start default applies. Consumers that accept the pack palette need no
theme override; consumers that change colors must review and validate one
explicit theme-color override. A capability that the product does not bind
remains unavailable or not exercised; the new guidance does not create it.
