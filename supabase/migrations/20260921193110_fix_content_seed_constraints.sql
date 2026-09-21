-- Timeline entries are seeded by year label, while awards intentionally allow
-- several distinctions within the same year or season.
alter table public.timeline_entries
  add constraint timeline_entries_year_label_key unique (year_label);

alter table public.awards
  drop constraint awards_year_label_key;
