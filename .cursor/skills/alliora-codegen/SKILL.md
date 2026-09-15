---
name: alliora-codegen
description: >-
  Alliora OpenAPI-first DDD codegen: never commit .codegen; new domains get full
  multi-layer generate; YAML edits regenerate packages/core only. Use when
  bundling OpenAPI, running zero-codegen, or scaffolding Alliora domains.
---

# Alliora — OpenAPI codegen

| Field | Value |
| --- | --- |
| Repo | `ai-fin-alliora` |
| Scope | `@alliora/*` |
| OpenAPI | `packages/openapi-core/src/` |
| Bundled | `packages/openapi-core/src/.bundled/{domain}.json` |
| Tool | `.codegen/codegen/` (gitignored — copy from scaffold locally) |
| Config | `.codegen/.zero-codegen-merged.json` (`pnpm codegen:paths`) |

## HARD RULE — never commit `.codegen`

`.codegen/` must never be committed or pushed to GitHub. It is local generator infrastructure. Copy it from `zero-apps-codegen-scaffold` when setting up a clone.

## Two modes

### Mode A — NEW domain

1. Author `{domain}.yaml` + `{domain}.schemas.yaml`.
2. Register in codegen JSON, Redocly, and bundle scripts.
3. Lint + bundle.
4. Full multi-layer generate for that domain (not `--layers core`).
5. Build core → services → adapters → api-server; hand-fit sandbox, DI, `domain-routes`.

### Mode B — EXISTING domain YAML edit

1. Lint + bundle.
2. Regenerate **core only**.
3. Handwrite services → adapters → api-server → webapp.
4. Never routine `generate --all` without `--layers core`.

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main generate \
  --domain capabilities --config .codegen/.zero-codegen-merged.json --skip-build
```
