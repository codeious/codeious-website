# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: Next.js 15.4.4 (App Router)
- **CMS**: PayloadCMS 3.58.0 with Lexical rich text editor
- **Database**: Cloudflare D1 (SQLite) via `@payloadcms/db-d1-sqlite`
- **Storage**: Cloudflare R2 via `@payloadcms/storage-r2`
- **Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Styling**: Tailwind CSS 4.1.13 with shadcn/ui components
- **UI Components**: Radix UI primitives, Embla Carousel
- **Testing**: Vitest (integration), Playwright (e2e)
- **TypeScript**: 5.7.3 with strict mode (strictNullChecks: false)
- **Package Manager**: pnpm 9/10, Node.js ≥18.20.2 or ≥20.9.0

## Development Commands

```bash
# Development
pnpm dev                    # Start Next.js dev server (Wrangler auto-binds D1/R2 locally)
pnpm devsafe                # Clean restart (removes .next and .open-next)

# Type Generation
pnpm generate:types         # Generate both Cloudflare and Payload types
pnpm generate:types:cloudflare  # wrangler types --env-interface CloudflareEnv
pnpm generate:types:payload     # payload generate:types
pnpm generate:importmap     # Generate Payload admin import map

# Database
pnpm payload migrate:create # Create new database migration
pnpm payload migrate        # Run pending migrations locally
pnpm seed                   # Seed database locally with default content (includes media upload)
pnpm seed:remote            # Seed REMOTE Cloudflare D1 (text only - upload media to R2 first)

# Testing
pnpm test                   # Run all tests (int + e2e)
pnpm test:int               # Run integration tests with Vitest
pnpm test:e2e               # Run end-to-end tests with Playwright

# Build & Lint
pnpm build                  # Build Next.js app (8GB memory allocated)
pnpm lint                   # ESLint via Next.js

# Cloudflare Deployment
pnpm preview                # Build and preview with opennextjs-cloudflare
pnpm deploy                 # Deploy to Cloudflare (runs deploy:database + deploy:app)
pnpm deploy:database        # Run migrations on remote D1 + optimize
pnpm deploy:app             # Build and deploy to Cloudflare Workers

# Wrangler (Cloudflare CLI)
pnpm wrangler login         # Authenticate with Cloudflare (required first time)
pnpm wrangler help          # See all Wrangler commands
```

## Authentication with Cloudflare

Before deploying or working with remote Cloudflare services:
```bash
pnpm wrangler login
```

Use environment variable `CLOUDFLARE_ENV` to target specific environments (e.g., `staging`).

## Architecture Overview

### Deployment Model
This is a **Cloudflare Workers** application built with Next.js App Router, deployed via `@opennextjs/cloudflare`. The architecture is edge-first:
- Next.js app compiles to `.open-next/worker.js` (worker entry point)
- Static assets served from `.open-next/assets` (Cloudflare Assets binding)
- D1 SQLite database for Payload CMS data
- R2 bucket for media storage

### PayloadCMS Integration
PayloadCMS runs **server-side** within the Next.js app. The configuration (`src/payload.config.ts`) dynamically determines Cloudflare context:
- **Production**: Uses `getCloudflareContext({ async: true })` for remote bindings
- **Local/Migration**: Uses `getCloudflareContextFromWrangler()` to get Wrangler proxy bindings
- The `cloudflare` object provides `cloudflare.env.D1` (database) and `cloudflare.env.R2` (storage)

### Collections
Payload collections defined in `src/collections/`:
- **Users** (`Users.ts`): Auth-enabled admin users
- **Media** (`Media.ts`): Uploads stored in R2 bucket
- **ContactMessages** (`ContactMessages.ts`): Form submissions with status tracking (new, in-progress, replied, closed)
- **PageContent** (`PageContent.ts`): Multi-locale CMS content for website sections (hero, about-us, shopen, team, technology, faq, contact, footer)

### App Structure
```
src/
  app/
    (frontend)/          # Public-facing pages
      layout.tsx         # Main layout with Navigation
      page.tsx           # Homepage with all sections
    (payload)/           # PayloadCMS admin routes
      admin/[[...segments]]/
        page.tsx         # Admin panel
      layout.tsx         # Admin layout
    api/
      contact/route.ts   # POST endpoint for contact form
  collections/           # PayloadCMS collection configs
  components/
    home/                # Landing page sections (HeroSection, AboutUsSection, etc.)
    common/              # Shared components (LocaleProvider, LanguageSwitcher, AppCarousel)
    ui/                  # shadcn/ui components
  lib/
    content.ts           # Payload CMS content fetching utilities
    locale.ts            # i18n helpers (en/pl)
    seed.ts              # Database seeding script
    seedData.ts          # Default content data
    utils.ts             # cn() utility
```

### Localization
- Supports English (`en`) and Polish (`pl`)
- `PageContent` collection fields are `localized: true` for multilingual content
- Server-side: `getServerLocale(request)` from Accept-Language header
- Client-side: `getBrowserLocale()` from navigator.language
- Content fetched with `locale` parameter in `getPageContent(sectionId, locale)`

### Content Management Pattern
Sections fetch content server-side using:
```typescript
import { getPageContent } from '@/lib/content'
const content = await getPageContent('hero', 'en')
```
Fallback content available via `getFallbackContent(sectionId, locale)` from seedData.

### Styling
- Tailwind CSS 4 with PostCSS plugin (`@tailwindcss/postcss`)
- Global styles in `src/app/globals.css`
- Custom Payload admin styles in `src/app/(payload)/custom.scss`
- shadcn/ui components use `class-variance-authority` and `tailwind-merge`
- Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`

### Known Limitations
- **GraphQL**: Not fully supported on Cloudflare Workers ([upstream issue](https://github.com/cloudflare/workerd/issues/5175))
- **Bundle Size**: Requires **Paid Workers plan** due to 3MB limit (current bundle exceeds free tier)
- **Logs**: Disabled by default (opt-in via Cloudflare dashboard to avoid quota usage)

## Testing

### Integration Tests (Vitest)
- Config: `vitest.config.mts`
- Command: `pnpm test:int`
- Uses `@vitejs/plugin-react` and `jsdom`

### E2E Tests (Playwright)
- Config: `playwright.config.ts`
- Command: `pnpm test:e2e`
- Runs in headless mode by default

## Environment Variables

Required for production:
- `PAYLOAD_SECRET`: Generate with `openssl rand -hex 32` (configured in `wrangler.jsonc` bindings)
- `NODE_ENV`: Set to `production` for deployments
- `CLOUDFLARE_ENV`: Environment name for multi-environment deployments (optional)

## Migrations

PayloadCMS uses migrations for schema changes:
1. Modify collection config in `src/collections/`
2. Run `pnpm payload migrate:create` to generate migration
3. Deploy with `pnpm deploy` (auto-runs migrations on remote D1)

Local development migrations auto-sync via Wrangler proxy.

## Seeding Data to Remote Cloudflare

**Important**: The standard `pnpm seed` script only works locally because it requires file system access to upload media files.

### For Remote Cloudflare Deployment:

**Option 1: Use seed:remote (Text Content Only)**
```bash
# 1. Set your Payload secret
export PAYLOAD_SECRET=your-secret-here

# 2. Seed text content to remote D1
pnpm seed:remote

# 3. Upload media files to R2 manually
pnpm wrangler r2 object put codeious-website/logo.png --file=./assets/logo.png
pnpm wrangler r2 object put codeious-website/hero-bg.jpg --file=./assets/hero-bg.jpg

# 4. Link media in Payload admin panel at /admin
# 5. Deploy the app
pnpm deploy
```

**Option 2: Use Payload Admin Panel**
1. Deploy the app first: `pnpm deploy`
2. Log into `/admin` panel
3. Manually create content entries via the UI
4. Upload media directly through the admin interface

**Note**: `seed:remote` creates content without media references. Media must be uploaded to R2 separately and linked via the admin panel.

## Deployment Notes

- **Only deploy on Paid Workers** (bundle size exceeds free tier 3MB limit)
- Deployment steps handled by `pnpm deploy`:
  1. Runs `deploy:database`: Executes migrations + `PRAGMA optimize` on remote D1
  2. Runs `deploy:app`: Builds with `opennextjs-cloudflare` and deploys to Workers
- Configure additional environments in `wrangler.jsonc` under `env` key
- Deploy to staging: `CLOUDFLARE_ENV=staging pnpm deploy`

## Important Files

- `wrangler.jsonc`: Cloudflare configuration (D1, R2, compatibility flags)
- `src/payload.config.ts`: PayloadCMS configuration (database, storage, collections)
- `next.config.ts`: Next.js config with Payload integration
- `src/lib/content.ts`: Content fetching utilities
- `src/collections/PageContent.ts`: Main CMS collection for website content