# ROBOTECH Moldova

Sponsor-ready website for ROBOTECH, a robotics team from Chișinău, Moldova. The site is built with Next.js App Router and TypeScript, prepared for Vercel, and includes Supabase PostgreSQL/Storage migrations.

## Local setup

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` only after a Supabase project exists.
4. Run `npm run dev` for local development, or `npm run check` for the full quality gate.

The site has a verified local-data fallback, so production builds do not require database credentials. Once Supabase is configured, public team, award, partner, project, timeline, program, and gallery records are read from PostgreSQL.

## Platform setup

- Apply the SQL in `supabase/migrations` and `supabase/seed.sql` to a new Supabase project.
- Set the three environment variables from `.env.example` locally. Add only the two public values to the Vercel runtime; the service-role key is for the local media upload script.
- Run `npm run storage:upload` once to create and populate the public `site-media` bucket.
- Import the GitHub repository into Vercel, then attach `robotech.md` after the preview deployment is approved.

See `docs/AUDIT.md` for the source-backup audit and migration decisions.

## Website content

The interface supports Romanian, Russian and English, with team, FTC/FLL programs, achievements, partners and contact sections. Navigation and shared layouts are responsive.

## Source guide

| Area | Location |
|---|---|
| Page routing | [src/app/[[...path]]/page.tsx](src/app/%5B%5B...path%5D%5D/page.tsx) |
| Page components | [src/components](src/components) |
| Local content and translations | [src/data](src/data) |
| Database-backed content loading | [src/lib/content.ts](src/lib/content.ts) |
| Media resolution | [src/lib/assets.ts](src/lib/assets.ts) |
| Database schema and seed | [supabase/migrations](supabase/migrations) · [supabase/seed.sql](supabase/seed.sql) |
| Migration audit | [docs/AUDIT.md](docs/AUDIT.md) |

## Commands

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run check` runs these three commands in order. After a successful build, `npm start` serves the production application locally. The media upload command is a separate setup operation and requires its server credential.
