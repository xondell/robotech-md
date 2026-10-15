import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FllArchivePage, FllCurrentPage, FllSeasonSelectPage } from "@/components/fll-pages";
import { AchievementsPage, ContactPage, FtcPage, GalleryPage, HomePage, PartnersPage, ProjectsPage, TeamPage } from "@/components/pages";
import { localPath, routes, type RouteSlug } from "@/data/content";
import type { Locale } from "@/data/types";
import { getPublicContent } from "@/lib/content";

type PageProps = { params: Promise<{ path?: string[] }> };

function resolvePath(path: string[] = []): { locale: Locale; slug: RouteSlug } | null {
  const locale: Locale = path[0] === "en" ? "en" : path[0] === "ro" ? "ro" : "ru";
  const parts = locale === "en" || locale === "ro" ? path.slice(1) : path;
  const slug = parts.join("/") as RouteSlug;
  if (!routes.includes(slug)) return null;
  return { locale, slug };
}

const titles: Record<RouteSlug, Record<Locale, string>> = {
  "": { ro: "ROBOTECH Moldova | Echipa FTC #25491", en: "ROBOTECH Moldova | FTC Team #25491", ru: "ROBOTECH Молдова | Команда FTC #25491" },
  team: { ro: "Echipa", en: "Team", ru: "Команда" },
  ftc: { ro: "FIRST Tech Challenge #25491", en: "FIRST Tech Challenge #25491", ru: "FIRST Tech Challenge #25491" },
  fll: { ro: "Sezoanele FIRST LEGO League", en: "FIRST LEGO League Seasons", ru: "Сезоны FIRST LEGO League" },
  "fll/2025-2026": { ro: "FLL 2025–2026 | UNEARTHED și MuoVis", en: "FLL 2025–2026 | UNEARTHED & MuoVis", ru: "FLL 2025–2026 | UNEARTHED и MuoVis" },
  "fll/2026-2027": { ro: "FLL 2026–2027 | BIOGLOW", en: "FLL 2026–2027 | BIOGLOW", ru: "FLL 2026–2027 | BIOGLOW" },
  projects: { ro: "Proiecte inginerești", en: "Engineering Projects", ru: "Инженерные проекты" },
  achievements: { ro: "Rezultate și premii", en: "Achievements & Awards", ru: "Достижения и награды" },
  partners: { ro: "Parteneriate", en: "Partnerships", ru: "Партнёрство" },
  gallery: { ro: "Galerie", en: "Gallery", ru: "Галерея" },
  contact: { ro: "Contact", en: "Contact", ru: "Контакты" },
};

const descriptions: Record<RouteSlug, Record<Locale, string>> = {
  "": { ro: "Echipă de robotică din Moldova, activă în FTC #25491 și FIRST LEGO League din 2018.", en: "Moldovan robotics team competing in FTC #25491 and FIRST LEGO League since 2018.", ru: "Команда робототехники из Молдовы — FTC #25491 и FIRST LEGO League с 2018 года." },
  team: { ro: "Membrii activi, mentorii și alumni ROBOTECH.", en: "Active ROBOTECH members, mentors, and alumni.", ru: "Участники команды ROBOTECH, наставники и выпускники." },
  ftc: { ro: "ROBOTECH #25491 — robot, software, autonomie și rezultate FTC.", en: "ROBOTECH #25491 — FTC robot, software, autonomous systems, and results.", ru: "ROBOTECH #25491: робот, программы, автономные системы и достижения FTC." },
  fll: { ro: "Alege un sezon FIRST LEGO League ROBOTECH și explorează robotul, proiectul și rezultatele.", en: "Choose a ROBOTECH FIRST LEGO League season and explore its robot, project, and results.", ru: "Выберите сезон FIRST LEGO League команды ROBOTECH и узнайте о роботах, проектах и результатах." },
  "fll/2025-2026": { ro: "Arhiva completă UNEARTHED 2025–2026: robotul FLL, proiectul MuoVis, documentația, experții și rezultatele.", en: "Complete UNEARTHED 2025–2026 archive: FLL robot, MuoVis, documentation, experts, and results.", ru: "Архив сезона UNEARTHED 2025–2026: робот FLL, проект MuoVis, документация, эксперты и результаты." },
  "fll/2026-2027": { ro: "Sezonul curent FLL BIOGLOW 2026–2027 al echipei ROBOTECH.", en: "ROBOTECH’s current FLL BIOGLOW 2026–2027 season.", ru: "Текущий сезон FLL BIOGLOW 2026–2027 команды ROBOTECH." },
  projects: { ro: "Proiectele inginerești dezvoltate de ROBOTECH.", en: "Engineering projects developed by ROBOTECH.", ru: "Инженерные проекты ROBOTECH." },
  achievements: { ro: "Cronologia verificată a rezultatelor ROBOTECH.", en: "The verified chronology of ROBOTECH achievements.", ru: "Хронология достижений ROBOTECH." },
  partners: { ro: "Susține robotica competitivă și educația inginerească în Moldova.", en: "Support competitive robotics and engineering education in Moldova.", ru: "Поддержите соревновательную робототехнику и инженерное образование в Молдове." },
  gallery: { ro: "Fotografii și materiale reale din arhiva ROBOTECH.", en: "Real photography and media from the ROBOTECH archive.", ru: "Фотографии и оригинальные видеоматериалы из архива ROBOTECH." },
  contact: { ro: "Contactează ROBOTECH din Chișinău, Moldova.", en: "Contact ROBOTECH in Chișinău, Moldova.", ru: "Свяжитесь с командой ROBOTECH из Кишинёва, Молдова." },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { path } = await params;
  const resolved = resolvePath(path);
  if (!resolved) return {};
  const { locale, slug } = resolved;
  const canonical = localPath(locale, slug);
  return {
    title: slug === "" ? { absolute: titles[slug][locale] } : titles[slug][locale],
    description: descriptions[slug][locale],
    alternates: { canonical, languages: { ru: localPath("ru", slug), ro: localPath("ro", slug), en: localPath("en", slug), "x-default": localPath("ru", slug) } },
    openGraph: { title: titles[slug][locale], description: descriptions[slug][locale], url: canonical, locale: locale === "ru" ? "ru_MD" : locale === "ro" ? "ro_MD" : "en_US" },
  };
}

export function generateStaticParams() {
  return [
    { path: [] },
    ...routes.filter(Boolean).map((slug) => ({ path: slug.split("/") })),
    { path: ["ro"] },
    ...routes.filter(Boolean).map((slug) => ({ path: ["ro", ...slug.split("/")] })),
    { path: ["en"] },
    ...routes.filter(Boolean).map((slug) => ({ path: ["en", ...slug.split("/")] })),
  ];
}

export default async function Page({ params }: PageProps) {
  const { path } = await params;
  const resolved = resolvePath(path);
  if (!resolved) notFound();
  const { locale, slug } = resolved;
  const content = await getPublicContent();
  const page = {
    "": <HomePage locale={locale} members={content.team} achievementData={content.awards} />,
    team: <TeamPage locale={locale} members={content.team} />,
    ftc: <FtcPage locale={locale} achievementData={content.awards} />,
    fll: <FllSeasonSelectPage locale={locale} />,
    "fll/2025-2026": <FllArchivePage locale={locale} achievementData={content.awards} />,
    "fll/2026-2027": <FllCurrentPage locale={locale} />,
    projects: <ProjectsPage locale={locale} />,
    achievements: <AchievementsPage locale={locale} achievementData={content.awards} />,
    partners: <PartnersPage locale={locale} />,
    gallery: <GalleryPage locale={locale} />,
    contact: <ContactPage locale={locale} />,
  }[slug];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ROBOTECH",
    url: "https://robotech.md",
    address: { "@type": "PostalAddress", addressLocality: "Chișinău", addressCountry: "MD" },
    contactPoint: { "@type": "ContactPoint", name: "Boris Colesov", telephone: "+37368689606", contactType: "partnerships" },
    sameAs: ["https://ftc-events.firstinspires.org/team/25491", "https://ftcscout.org/teams/25491", "https://instagram.com/robotech.md"],
  };
  return <><script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(locale)}` }} /><a className="skip-link" href="#main">{locale === "ru" ? "К содержимому" : locale === "ro" ? "Sari la conținut" : "Skip to content"}</a><Header locale={locale} slug={slug} /><main id="main">{page}</main><Footer locale={locale} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}
