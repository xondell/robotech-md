-- Verified public content. Re-running this seed is safe.
insert into public.programs (id, name, founded_year, team_number, title, description, sort_order) values
  ('ftc', 'FIRST Tech Challenge', 2020, '25491', '{"ro":"Echipa #25491","en":"Team #25491"}', '{"ro":"Robotică competitivă, mecanică, electronică, software și sisteme autonome.","en":"Competitive robotics, mechanics, electronics, software, and autonomous systems."}', 1),
  ('fll-challenge', 'FIRST LEGO League Challenge', 2018, null, '{"ro":"Activă din 2018","en":"Active since 2018"}', '{"ro":"Robot Game și proiect de inovație.","en":"Robot Game and Innovation Project."}', 2),
  ('fll-explore', 'FIRST LEGO League Explore', 2023, null, '{"ro":"Din 2023","en":"Since 2023"}', '{"ro":"Introducerea elevilor mai tineri în STEM.","en":"Introducing younger students to STEM."}', 3)
on conflict (id) do update set name = excluded.name, founded_year = excluded.founded_year, team_number = excluded.team_number, title = excluded.title, description = excluded.description, sort_order = excluded.sort_order;

insert into public.projects (id, program, name, status, summary, problem, solution, result, hero_path, document_path, model_path, sort_order) values
  ('ftc-competition-robot', 'FTC', 'FTC Competition Robot', '{"ro":"În dezvoltare","en":"In development"}', '{"ro":"Robotul ROBOTECH #25491 pentru sezonul 2026–2027.","en":"ROBOTECH #25491 robot for the 2026–2027 season."}', null, null, null, null, null, null, 1),
  ('muovis', 'FLL', 'MuoVis', '{"ro":"Concept documentat","en":"Documented concept"}', '{"ro":"Concept de tomografie cu muoni pentru investigarea nedistructivă a structurilor mari.","en":"Muon-tomography concept for non-destructive investigation of large structures."}', '{"ro":"Structurile mari sunt dificil de inspectat intern fără intervenții distructive.","en":"Large structures can be difficult to inspect internally without destructive intervention."}', '{"ro":"Arhitectură modulară de detector, electronică și reconstrucție.","en":"Modular detector, electronics, and reconstruction architecture."}', '{"ro":"Documentație tehnică, scheme, estimări și model 3D.","en":"Technical documentation, schematics, estimates, and a 3D model."}', 'images/projects/muovis-diagram.webp', 'documents/muovis-documentation-en.pdf', 'models/muovis-concept.glb', 2)
on conflict (id) do update set status = excluded.status, summary = excluded.summary, problem = excluded.problem, solution = excluded.solution, result = excluded.result, hero_path = excluded.hero_path, document_path = excluded.document_path, model_path = excluded.model_path, sort_order = excluded.sort_order;

insert into public.timeline_entries (year_label, description, sort_order) values
  ('2018', '{"ro":"ROBOTECH își începe parcursul FIRST prin FIRST LEGO League Challenge.","en":"ROBOTECH begins its FIRST journey through FIRST LEGO League Challenge."}', 1),
  ('2019', '{"ro":"Robot Performance Award — locul II.","en":"Robot Performance Award — 2nd Place."}', 2),
  ('2020', '{"ro":"Începe direcția FIRST Tech Challenge în cadrul ROBOTECH.","en":"The FIRST Tech Challenge direction begins within ROBOTECH."}', 3),
  ('2023', '{"ro":"Este lansată direcția FLL Explore; locul III la SumoBot Challenge Moldova.","en":"FLL Explore launches; third place at SumoBot Challenge Moldova."}', 4),
  ('2023–2024', '{"ro":"Innovation Project Award și Motivate Award.","en":"Innovation Project Award and Motivate Award."}', 5),
  ('2024–2025', '{"ro":"Două Innovation Project Awards și Winning Alliance — 1st Team Selected.","en":"Two Innovation Project Awards and Winning Alliance — 1st Team Selected."}', 6),
  ('2025–2026', '{"ro":"Champion’s, Coach/Mentor, Innovation Project și Sustain Awards.","en":"Champion’s, Coach/Mentor, Innovation Project, and Sustain Awards."}', 7),
  ('2026–2027', '{"ro":"Sezonul FTC BIOBUZZ și dezvoltarea continuă a echipei #25491.","en":"FTC BIOBUZZ season and continued development of Team #25491."}', 8)
on conflict (year_label) do update set description = excluded.description, sort_order = excluded.sort_order;

insert into public.team_members (id, name, role, programs, photo_path, alumni, mentor, sort_order) values
  ('boris-colesov', 'Boris Colesov', '{"ro":"Coordonator de echipă","en":"Team lead"}', array['FTC','FLL'], 'images/team/boris.webp', false, false, 1),
  ('natasha-avornicita', 'Natasha Avornicita', '{"ro":"Căpitan de echipă","en":"Team captain"}', array['FTC','FLL'], 'images/team/natasha.webp', false, false, 2),
  ('rostik-pasetchnik', 'Rostik Pasetchnik', '{"ro":"Pilot & comunicare","en":"Driver & communications"}', array['FTC','FLL'], 'images/team/rostic.webp', false, false, 3),
  ('lev-krupenenkov', 'Lev Krupenenkov', '{"ro":"Strategie","en":"Strategy"}', array['FTC','FLL'], 'images/team/lev.webp', false, false, 4),
  ('iulia-guc', 'Iulia Guc', '{"ro":"Media & comunicare","en":"Media & communications"}', array['FTC','FLL'], 'images/team/iulia.webp', false, false, 5),
  ('anton-mincioglo', 'Anton Mincioglo', '{"ro":"Mentor","en":"Mentor"}', array['FTC','FLL'], 'images/team/anton.webp', false, true, 6),
  ('andrei-duca', 'Andrei Duca', '{"ro":"Programare","en":"Programming"}', array['FLL'], 'images/team/andrei.webp', false, false, 7),
  ('artem-bubulici', 'Artem Bubulici', '{"ro":"Construcție robot","en":"Robot construction"}', array['FLL'], 'images/team/artem.webp', false, false, 8),
  ('egor-polcanov', 'Egor Polcanov', '{"ro":"Cercetare","en":"Research"}', array['FLL'], 'images/team/egor.webp', false, false, 9),
  ('ilia-binzaru', 'Ilia Binzaru', '{"ro":"Cercetare","en":"Research"}', array['FLL'], 'images/team/ilia.webp', false, false, 10),
  ('olga-kryuchkova', 'Olga Kryuchkova', '{"ro":"Mentor FLL","en":"FLL mentor"}', array['FLL'], 'images/team/olga.webp', false, true, 11),
  ('bogdan-jigalco', 'Bogdan Jigalco', '{"ro":"Programare","en":"Software"}', array['FTC'], 'images/team/bogdan.webp', false, false, 12),
  ('yarik-arseniev', 'Yarik Arseniev', '{"ro":"Construcție & comunicare","en":"Build & communications"}', array['FTC'], 'images/team/yarik.webp', false, false, 13),
  ('sanya-kopitko', 'Sanya Kopitko', '{"ro":"Construcție robot","en":"Robot construction"}', array['FTC'], 'images/team/sanya.webp', false, false, 14),
  ('vadim-dragnev', 'Vadim Dragnev', '{"ro":"Construcție robot","en":"Robot construction"}', array['FTC'], 'images/team/vadim.webp', false, false, 15),
  ('polina-silvestru', 'Polina Silvestru', '{"ro":"Design","en":"Design"}', array['FTC'], 'images/team/polina.webp', false, false, 16),
  ('iulia-zaharevici', 'Iulia Zaharevici', '{"ro":"Mentor FTC","en":"FTC mentor"}', array['FTC'], 'images/team/iuko4ka.webp', false, true, 17),
  ('andrei-grigorita', 'Andrei Grigorita', '{"ro":"Alumn","en":"Alumnus"}', array['FTC','FLL'], 'images/team/griga.webp', true, false, 18),
  ('tania-drobca', 'Tania Drobca', '{"ro":"Alumnă","en":"Alumna"}', array['FTC','FLL'], 'images/team/drobka.webp', true, false, 19)
on conflict (id) do update set name = excluded.name, role = excluded.role, programs = excluded.programs, photo_path = excluded.photo_path, alumni = excluded.alumni, mentor = excluded.mentor, sort_order = excluded.sort_order;

insert into public.awards (id, year_label, season, program, competition, award, stage, official_url, sort_order) values
  ('2019-robot-performance', '2019', null, 'FLL', '{"ro":"FIRST LEGO League","en":"FIRST LEGO League"}', '{"ro":"Robot Performance Award — locul II","en":"Robot Performance Award — 2nd Place"}', null, null, 1),
  ('2023-sumobot', '2023', null, 'Other', '{"ro":"SumoBot Challenge Moldova","en":"SumoBot Challenge Moldova"}', '{"ro":"Locul III","en":"3rd Place"}', null, null, 2),
  ('2023-24-innovation-semifinal', '2023–2024', '2023–2024', 'FLL', '{"ro":"FIRST LEGO League Challenge","en":"FIRST LEGO League Challenge"}', '{"ro":"Innovation Project Award","en":"Innovation Project Award"}', '{"ro":"Semifinală","en":"Semifinal"}', null, 3),
  ('2023-24-motivate-final', '2023–2024', '2023–2024', 'FTC', '{"ro":"FIRST Tech Challenge","en":"FIRST Tech Challenge"}', '{"ro":"Motivate Award","en":"Motivate Award"}', '{"ro":"Finala națională","en":"National Final"}', null, 4),
  ('2024-25-innovation-semifinal', '2024–2025', '2024–2025', 'FLL', '{"ro":"FIRST LEGO League Challenge","en":"FIRST LEGO League Challenge"}', '{"ro":"Innovation Project Award","en":"Innovation Project Award"}', '{"ro":"Semifinală","en":"Semifinal"}', null, 5),
  ('2024-25-innovation-final', '2024–2025', '2024–2025', 'FLL', '{"ro":"FIRST LEGO League Challenge","en":"FIRST LEGO League Challenge"}', '{"ro":"Innovation Project Award","en":"Innovation Project Award"}', '{"ro":"Finala națională","en":"National Final"}', null, 6),
  ('2024-25-winning-alliance', '2024–2025', '2024–2025', 'FTC', '{"ro":"FIRST Tech Challenge Moldova","en":"FIRST Tech Challenge Moldova"}', '{"ro":"Winning Alliance — 1st Team Selected","en":"Winning Alliance — 1st Team Selected"}', null, 'https://ftc-events.firstinspires.org/2024/MDCHS2/awards', 7),
  ('2025-26-champions', '2025–2026', '2025–2026', 'FLL', '{"ro":"FIRST LEGO League Challenge","en":"FIRST LEGO League Challenge"}', '{"ro":"Champion’s Award","en":"Champion’s Award"}', '{"ro":"Semifinală","en":"Semifinal"}', null, 8),
  ('2025-26-coach', '2025–2026', '2025–2026', 'FLL', '{"ro":"FIRST LEGO League Challenge","en":"FIRST LEGO League Challenge"}', '{"ro":"Coach/Mentor Award","en":"Coach/Mentor Award"}', null, null, 9),
  ('2025-26-innovation', '2025–2026', '2025–2026', 'FLL', '{"ro":"FIRST LEGO League Challenge","en":"FIRST LEGO League Challenge"}', '{"ro":"Innovation Project Award","en":"Innovation Project Award"}', '{"ro":"Finala națională","en":"National Final"}', null, 10),
  ('2025-26-sustain', '2025–2026', '2025–2026', 'FTC', '{"ro":"Campionatul Național FTC","en":"FTC National Championship"}', '{"ro":"Sustain Award","en":"Sustain Award"}', null, null, 11)
on conflict (id) do update set year_label = excluded.year_label, season = excluded.season, program = excluded.program, competition = excluded.competition, award = excluded.award, stage = excluded.stage, official_url = excluded.official_url, sort_order = excluded.sort_order;

insert into public.gallery_items (id, storage_path, category, alt_text, width, height, sort_order) values
  ('fll-robot-1', 'images/gallery/video1.webp', 'robot', '{"ro":"Vedere 1 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 1 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 1),
  ('fll-robot-2', 'images/gallery/video2.webp', 'robot', '{"ro":"Vedere 2 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 2 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 2),
  ('fll-robot-3', 'images/gallery/video3.webp', 'robot', '{"ro":"Vedere 3 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 3 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 3),
  ('fll-robot-4', 'images/gallery/video4.webp', 'robot', '{"ro":"Vedere 4 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 4 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 4),
  ('fll-robot-5', 'images/gallery/video5.webp', 'robot', '{"ro":"Vedere 5 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 5 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 5),
  ('fll-robot-6', 'images/gallery/video6.webp', 'robot', '{"ro":"Vedere 6 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 6 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 6),
  ('fll-robot-7', 'images/gallery/video7.webp', 'robot', '{"ro":"Vedere 7 a robotului FLL ROBOTECH din sezonul UNEARTHED","en":"View 7 of the ROBOTECH FLL robot from the UNEARTHED season"}', 960, 720, 7),
  ('muovis-diagram', 'images/projects/muovis-diagram.webp', 'projects', '{"ro":"Schemă tehnică din documentația MuoVis","en":"Technical diagram from the MuoVis documentation"}', 1060, 1400, 8),
  ('competition-lev', 'images/team/lev.webp', 'competition', '{"ro":"Membru ROBOTECH la o competiție de robotică","en":"ROBOTECH member at a robotics competition"}', 800, 960, 9)
on conflict (id) do update set storage_path = excluded.storage_path, category = excluded.category, alt_text = excluded.alt_text, width = excluded.width, height = excluded.height, sort_order = excluded.sort_order;

-- Partners intentionally remain empty until a partnership is confirmed.
