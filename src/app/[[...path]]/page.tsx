import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AchievementsPage, ContactPage, FllPage, FtcPage, GalleryPage, HomePage, PartnersPage, ProjectsPage, TeamPage } from "@/components/pages";
import { localPath, routes, type RouteSlug } from "@/data/content";
import type { Locale } from "@/data/types";
import { getPublicContent } from "@/lib/content";

type PageProps = { params: Promise<{ path?: string[] }> };

function resolvePath(path: string[] = []): { locale: Locale; slug: RouteSlug } | null {
  const locale: Locale = path[0] === "en" ? "en" : "ro";
  const parts = locale === "en" ? path.slice(1) : path;
  if (parts.length > 1) return null;
  const slug = (parts[0] ?? "") as RouteSlug;
  if (!routes.includes(slug)) return null;
  return { locale, slug };
}

const titles: Record<RouteSlug, Record<Locale, string>> = {
  "": { ro: "ROBOTECH Moldova | Echipa FTC #25491", en: "ROBOTECH Moldova | FTC Team #25491" },
  team: { ro: "Echipa", en: "Team" },
  ftc: { ro: "FIRST Tech Challenge #25491", en: "FIRST Tech Challenge #25491" },
  fll: { ro: "FIRST LEGO League & MuoVis", en: "FIRST LEGO League & MuoVis" },
  projects: { ro: "Proiecte inginerești", en: "Engineering Projects" },
  achievements: { ro: "Rezultate și premii", en: "Achievements & Awards" },
  partners: { ro: "Parteneriate", en: "Partnerships" },
  gallery: { ro: "Galerie", en: "Gallery" },
  contact: { ro: "Contact", en: "Contact" },
};

const descriptions: Record<RouteSlug, Record<Locale, string>> = {
  "": { ro: "Echipă de robotică din Moldova, activă în FTC #25491 și FIRST LEGO League din 2018.", en: "Moldovan robotics team competing in FTC #25491 and FIRST LEGO League since 2018." },
  team: { ro: "Membrii activi, mentorii și alumni ROBOTECH.", en: "Active ROBOTECH members, mentors, and alumni." },
  ftc: { ro: "ROBOTECH #25491 — robot, software, autonomie și rezultate FTC.", en: "ROBOTECH #25491 — FTC robot, software, autonomous systems, and results." },
  fll: { ro: "Direcția FLL ROBOTECH, robotul și proiectul de inovație MuoVis.", en: "ROBOTECH FLL, the competition robot, and the MuoVis Innovation Project." },
  projects: { ro: "Proiectele inginerești dezvoltate de ROBOTECH.", en: "Engineering projects developed by ROBOTECH." },
  achievements: { ro: "Cronologia verificată a rezultatelor ROBOTECH.", en: "The verified chronology of ROBOTECH achievements." },
  partners: { ro: "Susține robotica competitivă și educația inginerească în Moldova.", en: "Support competitive robotics and engineering education in Moldova." },
  gallery: { ro: "Fotografii și materiale reale din arhiva ROBOTECH.", en: "Real photography and media from the ROBOTECH archive." },
  contact: { ro: "Contactează ROBOTECH din Chișinău, Moldova.", en: "Contact ROBOTECH in Chișinău, Moldova." },
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
    alternates: { canonical, languages: { ro: localPath("ro", slug), en: localPath("en", slug), "x-default": localPath("ro", slug) } },
    openGraph: { title: titles[slug][locale], description: descriptions[slug][locale], url: canonical, locale: locale === "ro" ? "ro_MD" : "en_US" },
  };
}

export function generateStaticParams() {
  return [
    { path: [] },
    ...routes.filter(Boolean).map((slug) => ({ path: [slug] })),
    { path: ["en"] },
    ...routes.filter(Boolean).map((slug) => ({ path: ["en", slug] })),
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
    fll: <FllPage locale={locale} achievementData={content.awards} />,
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
    sameAs: ["https://ftc-events.firstinspires.org/team/25491", "https://ftcscout.org/teams/25491"],
  };
  return <>{locale === "en" ? <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='en'" }} /> : null}<a className="skip-link" href="#main">{locale === "ro" ? "Sari la conținut" : "Skip to content"}</a><Header locale={locale} slug={slug} /><main id="main">{page}</main><Footer locale={locale} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}
