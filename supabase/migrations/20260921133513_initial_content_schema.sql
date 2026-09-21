-- ROBOTECH public website content schema.
-- Public visitors may read published content. All writes remain restricted to
-- trusted project operators/service-role workflows.

create table public.programs (
  id text primary key,
  name text not null,
  founded_year integer,
  team_number text,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.team_members (
  id text primary key,
  name text not null,
  role jsonb not null default '{}'::jsonb,
  programs text[] not null default '{}',
  photo_path text not null,
  alumni boolean not null default false,
  mentor boolean not null default false,
  bio jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_member_programs check (programs <@ array['FTC', 'FLL']::text[])
);

create table public.awards (
  id text primary key,
  year_label text not null unique,
  season text,
  program text not null check (program in ('FTC', 'FLL', 'Other')),
  competition jsonb not null default '{}'::jsonb,
  award jsonb not null default '{}'::jsonb,
  stage jsonb,
  official_url text,
  photo_path text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id text primary key,
  program text not null check (program in ('FTC', 'FLL', 'Other')),
  name text not null,
  status jsonb not null default '{}'::jsonb,
  summary jsonb not null default '{}'::jsonb,
  problem jsonb,
  solution jsonb,
  result jsonb,
  hero_path text,
  document_path text,
  model_path text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.timeline_entries (
  id bigint generated always as identity primary key,
  year_label text not null,
  description jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id text primary key,
  name text not null,
  logo_path text not null,
  url text not null,
  tier text not null,
  description jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id text primary key,
  storage_path text not null,
  category text not null check (category in ('competition', 'robot', 'workshop', 'projects', 'awards', 'team')),
  alt_text jsonb not null default '{}'::jsonb,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index team_members_programs_idx on public.team_members using gin (programs);
create index awards_program_sort_idx on public.awards (program, sort_order);
create index gallery_category_sort_idx on public.gallery_items (category, sort_order);
create index partners_published_sort_idx on public.partners (published, sort_order);

alter table public.programs enable row level security;
alter table public.team_members enable row level security;
alter table public.awards enable row level security;
alter table public.projects enable row level security;
alter table public.timeline_entries enable row level security;
alter table public.partners enable row level security;
alter table public.gallery_items enable row level security;

create policy "Public can read published programs" on public.programs for select to anon, authenticated using (published);
create policy "Public can read published team members" on public.team_members for select to anon, authenticated using (published);
create policy "Public can read published awards" on public.awards for select to anon, authenticated using (published);
create policy "Public can read published projects" on public.projects for select to anon, authenticated using (published);
create policy "Public can read published timeline" on public.timeline_entries for select to anon, authenticated using (published);
create policy "Public can read published partners" on public.partners for select to anon, authenticated using (published);
create policy "Public can read published gallery" on public.gallery_items for select to anon, authenticated using (published);

-- New Supabase projects no longer expose public-schema tables to the Data API
-- automatically. Grant only the read access required by this public website.
grant usage on schema public to anon, authenticated;
grant select on public.programs, public.team_members, public.awards, public.projects,
  public.timeline_entries, public.partners, public.gallery_items to anon, authenticated;

comment on table public.partners is 'Only confirmed partners should be published. Draft proposals remain unpublished.';
