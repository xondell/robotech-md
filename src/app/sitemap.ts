import type { MetadataRoute } from "next";
import { localPath, routes } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return (["ru", "ro", "en"] as const).flatMap((locale) => routes.map((slug) => ({
    url: `https://robotech.md${localPath(locale, slug)}`,
    lastModified: new Date("2026-09-23"),
    changeFrequency: slug === "" ? "weekly" as const : "monthly" as const,
    priority: slug === "" ? 1 : 0.8,
  })));
}
