# React + TypeScript + Vite

## Local development

This project uses Bun, React, Tailwind CSS, and Drizzle ORM with Bun's built-in SQLite driver (`bun:sqlite`). The SQLite file stays server-side; the React app accesses it through the local API.

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_PATH` to the path of your existing SQLite database file. Relative paths are resolved from the project root.
3. Run `bun install`, then `bun run dev`.

The Vite app runs on its default port and proxies `/api` requests to the Bun API on port `3001` (`API_PORT` in `.env`). Available endpoints:

- `GET /api/health`
- `GET /api/products?q=search-term&limit=50`
- `GET /api/products/count`

The connection is read/write and checks foreign keys. No migrations are run automatically, so the existing database schema is left untouched. Drizzle Kit can introspect the configured database with `bun run db:pull`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
