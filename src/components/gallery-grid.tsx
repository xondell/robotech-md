"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery } from "@/data/content";
import type { GalleryCategory, Locale } from "@/data/types";
import { assetUrl } from "@/lib/assets";

type Filter = "all" | GalleryCategory;

export function GalleryGrid({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const labels: Record<Filter, string> = locale === "ro" ? {
    all: "Toate",
    competition: "Competiție",
    robot: "Robot",
    workshop: "Atelier",
    projects: "Proiecte",
    awards: "Premii",
    team: "Echipă",
  } : {
    all: "All",
    competition: "Competition",
    robot: "Robot",
    workshop: "Workshop",
    projects: "Projects",
    awards: "Awards",
    team: "Team",
  };
  const filtered = filter === "all" ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <>
      <div className="filter-bar" role="group" aria-label={locale === "ro" ? "Filtrează galeria" : "Filter gallery"}>
        {(Object.keys(labels) as Filter[]).map((key) => (
          <button key={key} type="button" className={filter === key ? "is-active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {labels[key]}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="gallery-grid" aria-live="polite">
          {filtered.map((item) => (
            <figure key={item.id} className={`gallery-item gallery-${item.category}`}>
              <Image src={assetUrl(item.src)} alt={item.alt[locale]} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              <figcaption>{item.alt[locale]}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>{locale === "ro" ? "Arhiva locală nu conține încă fotografii verificate pentru această categorie." : "The local archive does not yet contain verified photos for this category."}</strong>
          <p>{locale === "ro" ? "Categoria este pregătită pentru încărcări viitoare din Supabase Storage." : "The category is ready for future uploads from Supabase Storage."}</p>
        </div>
      )}
    </>
  );
}
