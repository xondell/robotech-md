# Existing project audit

Audit date: 2026-09-21

## What the download contains

The download is a complete cPanel account backup, not a source-code repository. It includes server and account material that must never enter Git: private SSH and TLS keys, domain-key material, mailboxes, Roundcube databases, password/account files, DNS configuration, access logs, analytics files, temporary PHP output, and cPanel metadata.

The public website is isolated under `homedir/public_html`. The backup itself remains untouched and outside the new `website/` Git worktree. The repository also uses an explicit `.gitignore` allowlist as defense in depth.

## Current website stack

- Hand-authored static HTML with inline CSS and JavaScript.
- Apache/cPanel directory routing (`/ro/index.html`, `/members/index.html`, and similar).
- No package manifest, dependency lockfile, framework source, API, database client, tests, or build command.
- One third-party runtime dependency: Google-hosted `<model-viewer>` on the FLL pages.
- A separate `/ievi` static microsite, `/qr` utility, and `/oxford` redirect that are unrelated to ROBOTECH.

## Existing routes

- ROBOTECH home: `/`, `/ro`, `/ru`, `/bg`
- FTC-oriented member pages: `/members` plus language copies
- FLL/MuoVis: `/fll` plus language copies
- FLL member pages: `/fll/members` plus language copies
- PDFs: English, Romanian, and Russian MuoVis documentation
- Broken route: every FLL navigation variant points to a missing `/trophies` page
- Unrelated routes: `/ievi`, `/qr`, `/oxford`

## Assets

- 19 unique member portraits copied eight times across language/program folders.
- Five MuoVis expert portraits copied across language folders.
- Seven short 1024×768 FLL robot videos copied four times.
- One 6.4 MB MuoVis GLB copied three times.
- Three 33-page MuoVis documentation PDFs.
- No FTC robot photography, full-team competition photo, trophy-wall photo, sponsor logos, or ROBOTECH vector logo was found.
- Several files use a `.png` extension while containing JPEG data; one portrait is a 24 MB PNG.

## Content and quality findings

- The homepage shows a literal image placeholder and uses no ROBOTECH photography.
- It incorrectly says Team #25491 was formed in 2018. ROBOTECH/FLL began in 2018; the FTC direction began in 2020; the official FIRST team profile lists #25491's rookie year as 2023.
- The 2020–2025 timeline contains unsupported claims about CAD simulation, custom-machined parts, technical awards, mentoring, computer vision/PID, and carbon-fiber components.
- Member information is duplicated in many HTML files and includes inside jokes, meme quotes, vague roles, and weak alt text.
- Romanian and Russian pages contain untranslated English and awkward machine-like phrasing.
- The FLL page makes strong prototype claims without clearly separating concept, design, and validated result.
- The unrelated IEVI form only simulates success in the browser and sends no request.
- Existing pages lack canonical URLs, Open Graph data, a sitemap, robots metadata, structured data, and a consistent favicon.

## Mobile and accessibility findings

- Mobile navigation is JavaScript-driven but has no accessible button name, expanded state, focus management, or Escape handling.
- Several layouts impose a 350 px minimum child width, which can overflow a 320 px viewport once page padding is included.
- Inline styles and fixed-height media blocks create inconsistent responsive behavior.
- Focus styles, semantic landmarks, and reduced-motion handling are incomplete.
- Seven videos use autoplay on one page, creating avoidable bandwidth and performance costs.

## Migration decisions

- Romanian is the default language; English lives under `/en`.
- The new application uses a single typed content model and reusable page components.
- Existing photos, videos, GLB, and PDFs are deduplicated and retained once in optimized paths.
- PostgreSQL migrations provide normalized site-content tables with RLS and explicit public read grants.
- Supabase Storage is provisioned and populated through the API upload script, not by directly modifying Storage system tables.
- Local assets remain as a reliable build/development fallback until a real Supabase project is connected.
- The cPanel backup and all private account data remain outside Git.
