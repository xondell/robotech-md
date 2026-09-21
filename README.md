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
