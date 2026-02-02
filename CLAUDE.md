# CLAUDE.md

## Pre-commit

Always run `pnpm format` before committing changes. This runs Biome to format all source files.

```bash
pnpm format
```

## Build

```bash
pnpm build           # Build all packages
pnpm build:ssg       # Build with SSG pre-rendering (in apps/@www/app)
```

## Lint

```bash
pnpm lint            # Run linting across all packages
```
