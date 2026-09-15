# Alliora

Alliance-and-capability OS for incumbent financial institutions. OpenAPI-first DDD monorepo cloned from the codegen scaffold. Product specs: [PRODUCT.md](PRODUCT.md), [WEBAPP.md](WEBAPP.md), [USER_STORIES.md](USER_STORIES.md).

Package scope: **`@alliora/*`**.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp        →  React console (features + generated clients)
```

Contracts live in `packages/openapi-core/src/` (one YAML per domain). The root `openapi.yaml` is a pointer only.

## Quick start

```bash
# Local: copy .codegen/ from zero-apps-codegen-scaffold if missing
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
PORT=4010 pnpm dev:api   # default is 4000; use another port if occupied
# Health: curl http://127.0.0.1:4010/health  → {"status":"ok","service":"alliora-api"}
# Demo key: X-API-Key: alliora_demo_local_dev_key
# Demo operator: admin@demo.local / sandbox-admin-8
```

Web console: `pnpm dev:web` (Vite 5173; proxies `/v0`, `/v1`, `/health` to the API). If the API is not on 4000, match `platform/webapp/vite.config.ts` proxy targets.

## Codegen

`.codegen/` is **never committed**. Copy it from the scaffold, then `pnpm codegen:paths`.

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).

See `.cursor/skills/alliora-codegen/` and `docs/CODEGEN.md`.
