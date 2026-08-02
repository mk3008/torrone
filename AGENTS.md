# Repository Guidance

- Keep this repository docs-first. Do not add an editor, runtime, validator, or package ecosystem without an explicit product decision.
- Write repository artifacts in English.
- Treat manifests as locally owned, evolving guidance. Running implementation and applicable requirements remain authoritative.
- Prefer small, observable experiments over fidelity claims or broad catalogs.
- Keep examples illustrative and restrained; product teams should refine them from their own evidence.

## Manifest change workflow

- Use the `manifest-review` skill before and after changing a file under `templates/business-app/design-manifest/`.
- Keep universal design guidance in the manifest, individual screen requirements in the consuming prompt, product facts in bindings, and runtime or CSS mechanics in implementation.
- When a manifest or fixed prompt changes, regenerate every run in a variability comparison from those same inputs. Do not repair an individual generated run as evidence of manifest quality.

## Manifest quality workflow

- Use `manifest-quality-workflow` for a governed Manifest authoring, frozen three-run generation, artifact-review, and human-review loop; use `codex-app-orchestration` as its control plane.
- Use `manifest-artifact-review` only after frozen outputs exist. It checks applicable Manifest guidance, resolved OKF-compatible YAML values and visible effects, and focused evidence without editing outputs.
- Route generic guidance gaps to Manifest authoring and `manifest-review`; route product facts to the fixed prompt or product binding; route fixture identity to the fixture contract; keep runtime mechanics in implementation.
- A human review follows mechanical generation, capture, static verification, and artifact review. Passing evidence never promotes a generated Run automatically.
