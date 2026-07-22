# Colorado Rockies Jibe Retail Suite

Rockies-only retail analytics, reporting, inventory management, podium management, and a 1080×1920 portrait kiosk survey. The application is isolated from all other Jibe projects and contains only Rockies-specific data and assets.

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
- `/v3` — Rockies Dugout Store portrait-kiosk survey

## Kiosk survey

The survey mirrors the approved MLB kiosk flow while remaining a separate Rockies implementation. It uses Colorado branding and Coors Field imagery, a cinematic Hunter Goodman splash, a fixed Rockies merchandise path, product search and incremental loading, online-product QR codes, and Rockies/Denver-specific response choices.

The checked-in merchandise snapshot contains only Colorado Rockies products from the four survey categories on Fanatics: jerseys, hats, sweatshirts, and T-shirts. Refresh it with:

```sh
pnpm catalog:sync
```

The Hunter Goodman splash currently streams an official MLB-hosted preview. Confirm production display and derivative-use clearance before unattended commercial deployment.

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
