import type { GalleryItem, Locale, Partner } from "./types";

export const routes = [
  "",
  "team",
  "ftc",
  "fll",
  "projects",
  "achievements",
  "partners",
  "gallery",
  "contact",
] as const;

export type RouteSlug = (typeof routes)[number];

export const timeline = [
  {
    year: "2018",
    ro: "ROBOTECH își începe parcursul în ecosistemul FIRST prin FIRST LEGO League Challenge.",
    en: "ROBOTECH begins its FIRST journey through FIRST LEGO League Challenge.",
  },
  { year: "2019", ro: "Robot Performance Award — locul II.", en: "Robot Performance Award — 2nd Place." },
  {
    year: "2020",
    ro: "În cadrul ROBOTECH începe direcția FIRST Tech Challenge.",
    en: "The FIRST Tech Challenge direction begins within ROBOTECH.",
  },
  {
    year: "2023",
    ro: "Este lansată direcția FIRST LEGO League Explore. ROBOTECH obține locul III la SumoBot Challenge Moldova.",
    en: "The FIRST LEGO League Explore direction launches. ROBOTECH places third at SumoBot Challenge Moldova.",
  },
  {
    year: "2023–2024",
    ro: "Innovation Project Award în semifinală și Motivate Award la finala națională.",
    en: "Innovation Project Award at the semifinal and Motivate Award at the National Final.",
  },
  {
    year: "2024–2025",
    ro: "Două Innovation Project Awards și selecție ca prima echipă în alianța câștigătoare FTC.",
    en: "Two Innovation Project Awards and selection as the first team in an FTC Winning Alliance.",
  },
  {
    year: "2025–2026",
    ro: "Champion’s Award, Coach/Mentor Award, Innovation Project Award și Sustain Award la Campionatul Național FTC.",
    en: "Champion’s Award, Coach/Mentor Award, Innovation Project Award, and the Sustain Award at the FTC National Championship.",
  },
  {
    year: "2026–2027",
    ro: "Începe noul sezon FTC BIOBUZZ™ presented by RTX. Continuă dezvoltarea echipei FTC #25491.",
    en: "The new FTC season, BIOBUZZ™ presented by RTX, begins. Development of FTC #25491 continues.",
  },
] satisfies Array<{ year: string; ro: string; en: string }>;

export const programs = [
  {
    id: "ftc",
    label: "FIRST Tech Challenge",
    meta: { ro: "Echipa #25491", en: "Team #25491" },
    description: {
      ro: "Robotică competitivă, mecanică, electronică, software și sisteme autonome.",
      en: "Competitive robotics, mechanics, electronics, software, and autonomous systems.",
    },
    href: "ftc",
  },
  {
    id: "fll-challenge",
    label: "FIRST LEGO League Challenge",
    meta: { ro: "Activă din 2018", en: "Active since 2018" },
    description: {
      ro: "Robot Game, cercetare și dezvoltarea unui proiect de inovație.",
      en: "Robot Game, research, and development of an Innovation Project.",
    },
    href: "fll",
  },
  {
    id: "fll-explore",
    label: "FIRST LEGO League Explore",
    meta: { ro: "Din 2023", en: "Since 2023" },
    description: {
      ro: "Introducerea elevilor mai tineri în STEM, construcție și lucru în echipă.",
      en: "Introducing younger students to STEM, building, and teamwork.",
    },
    href: "fll",
  },
];

export const partners: Partner[] = [];

export const gallery: GalleryItem[] = [
  ...Array.from({ length: 7 }, (_, index) => ({
    id: `fll-robot-${index + 1}`,
    src: `/images/gallery/video${index + 1}.webp`,
    alt: {
      ro: `Vedere ${index + 1} a robotului FLL ROBOTECH din sezonul UNEARTHED`,
      en: `View ${index + 1} of the ROBOTECH FLL robot from the UNEARTHED season`,
    },
    category: "robot" as const,
    width: 960,
    height: 720,
  })),
  {
    id: "muovis-diagram",
    src: "/images/projects/muovis-diagram.webp",
    alt: {
      ro: "Schemă tehnică din documentația MuoVis",
      en: "Technical diagram from the MuoVis documentation",
    },
    category: "projects",
    width: 1060,
    height: 1400,
  },
  {
    id: "competition-lev",
    src: "/images/team/lev.webp",
    alt: {
      ro: "Membru ROBOTECH la o competiție de robotică",
      en: "ROBOTECH member at a robotics competition",
    },
    category: "competition",
    width: 800,
    height: 960,
  },
];

export const experts = [
  { name: "Stepan Filatov", role: { ro: "Fizician nuclear", en: "Nuclear physicist" }, photo: "/images/experts/filatov.webp" },
  { name: "Vitalii Bubulici", role: { ro: "Arheolog", en: "Archaeologist" }, photo: "/images/experts/bubulici.webp" },
  { name: "Alexei Harjevschii", role: { ro: "Arhitect electronic", en: "Electronic architect" }, photo: "/images/experts/alexei.webp" },
  { name: "Zurab Manvelov", role: { ro: "Inginer de sisteme de radiație", en: "Radiation systems engineer" }, photo: "/images/experts/zurab.webp" },
  { name: "Nicolai Budiko", role: { ro: "Dezvoltator software senior", en: "Senior software developer" }, photo: "/images/experts/nicolai.webp" },
];

export const nav = {
  ro: {
    home: "Acasă",
    team: "Echipă",
    ftc: "FTC",
    fll: "FLL",
    projects: "Proiecte",
    achievements: "Rezultate",
    partners: "Parteneri",
    contact: "Contact",
  },
  en: {
    home: "Home",
    team: "Team",
    ftc: "FTC",
    fll: "FLL",
    projects: "Projects",
    achievements: "Achievements",
    partners: "Partners",
    contact: "Contact",
  },
} satisfies Record<Locale, Record<string, string>>;

export function localPath(locale: Locale, slug = "") {
  const clean = slug.replace(/^\//, "");
  if (locale === "en") return clean ? `/en/${clean}` : "/en";
  return clean ? `/${clean}` : "/";
}

export function alternatePath(locale: Locale, slug = "") {
  return localPath(locale === "ro" ? "en" : "ro", slug);
}

export function pick(locale: Locale, ro: string, en: string) {
  return locale === "ro" ? ro : en;
}
