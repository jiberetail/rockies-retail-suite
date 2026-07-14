# Colorado Rockies Jibe Retail Suite

Rockies-only retail analytics, reporting, inventory management, podium management, and the existing Rockies store survey. The application is isolated from all other Jibe projects and contains only Rockies-specific sample data.

- Public site: https://jiberetail.github.io/rockies-retail-suite/
- GitHub repository: https://github.com/jiberetail/rockies-retail-suite

## Source

- Original Figma project: https://www.figma.com/design/ZbdCih2ELnD4C8lnobwwUO/The-Rockies-Suite
- Original archive: `../The Rockies Suite.zip`
- Original archive SHA-256: `8a5909424159aa54e4f22a6d570a2e4225886521ebb7166635236ce86236b955`

## Routes

- `/` — primary Rockies store dashboard
- `/dashboard-v2` — alternate Rockies dashboard
- `/dashboard-v3` — alternate Rockies dashboard
- `/reports` — report library
- `/reports/:reportId` — full report view
- `/settings` — Rockies inventory and podium management
- `/v3` — existing Rockies store survey; portrait-kiosk redesign is a separate later phase

## Local development

```sh
pnpm install
pnpm dev
```

## Production verification

```sh
pnpm build
pnpm preview
```
