# Torrone visual catalog (pilot)

The catalog gives humans and AI **approximate visual examples** of UI patterns and their named appearance states. Use it to recognize what a part or pattern should look like, not as a pixel-accurate specification or an executable behavior contract.

Browse the [catalog index](index.html) and [SHELL-001 — Header-controlled, fully hideable left drawer](shells/workspace/index.html).

## What this catalog defines

- **Visual subject and scope:** what the example represents (Shell, Menu, Screen or Component), excluding incidental surrounding UI in a source screenshot.
- **State-specific appearance:** one independent image per represented state where possible, with a short state name and caption (for example, ON/OFF, enabled/disabled, selected/unselected, expanded/collapsed). The images show visual differences, not the conditions or operations that produce them.
- **Coarse visual relationships:** recognizable shape and relative arrangement needed to identify a pattern, such as the position of a switch thumb or the nesting of a menu item. These are illustrative, not exact measurements.
- **Provenance and adoption scope:** the source, target platform where known, and whether the example is a candidate, research reference or explicitly accepted within its stated scope. A catalog ID identifies a pattern; it is not an approval status.

Keep images of individual parts focused on those parts. A full-page screenshot may provide historical context for a Shell or Screen, but unrelated controls and sample business content do not become part of the pattern. Do not infer unpictured states or behavior.

## What this catalog does not define

- **Theme and colors:** palettes, color tokens, exact colors or theme variants. Any colors in a picture are illustrative; the consuming product's Theme decides their actual values.
- **Typography and geometry:** font family, font size, type scale, text metrics, spacing, padding, margins, dimensions, density or pixel-level placement. Those are determined by the consuming product's styling and platform guidance.
- **Functionality:** event handling, state changes, business logic, persistence, authorization, validation, navigation rules or other implementation behavior. A state label describes the picture; it is not a runtime contract.
- **Implementation or complete quality requirements:** DOM/CSS/framework structure, platform-native control choice, keyboard behavior, accessibility, responsiveness or test acceptance criteria. These must come from their respective design and requirements sources where needed.

Each state image remains a separate asset. Markdown (`index.md`/`README.md`) or a lightweight HTML gallery may index images and supply short captions; the gallery layout is not part of the design being transferred. Avoid deriving the entire application UI from a component image.

## Relationship to other design sources

This is an **image-first discovery surface**, not a new approval registry, specification language, component runtime or UI-testing system. The catalog is deliberately less specific than a curated Reference: [curated References](../references/README.md) retain their own review and approval process for bounded executable interaction designs. Historical experiments remain historical material and do not become approved simply because they are cataloged.

SHELL-001 is a research-selected example of a header-controlled drawer that can hide completely. Its purpose is the relationship between the header, drawer and workspace; the menu content inside the screenshot is not the Shell specification. Other patterns (including menu contents and individual components) have separate scopes.

New entries should be added only as grounded, independently understandable visual subjects. Do not add empty categories, a runtime generator or new specification machinery merely to expand the catalog.
