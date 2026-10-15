"use client";

import Image from "next/image";
import { useState } from "react";
import { localize, pick } from "@/data/content";
import type { Locale, TeamMember } from "@/data/types";
import { assetUrl } from "@/lib/assets";

type Filter = "all" | "FTC" | "FLL" | "mentors" | "alumni";

export function TeamGrid({ locale, members }: { locale: Locale; members: TeamMember[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const labels: Record<Filter, string> = {
    all: locale === "ru" ? "Все" : locale === "ro" ? "Toți" : "All",
    FTC: "FTC",
    FLL: "FLL",
    mentors: locale === "ru" ? "Наставники" : locale === "ro" ? "Mentori" : "Mentors",
    alumni: "Alumni",
  };
  const filtered = members.filter((member) => {
    if (filter === "all") return !member.alumni;
    if (filter === "mentors") return member.mentor && !member.alumni;
    if (filter === "alumni") return member.alumni;
    return member.programs.includes(filter) && !member.alumni;
  });

  return (
    <>
      <div className="filter-bar" role="group" aria-label={pick(locale, "Filtrează membrii", "Filter team members")}>
        {(Object.keys(labels) as Filter[]).map((key) => (
          <button key={key} type="button" className={filter === key ? "is-active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {labels[key]}
          </button>
        ))}
      </div>
      <div className="team-grid" aria-live="polite">
        {filtered.map((member) => (
          <article className="member-card" key={member.id}>
            <div className="member-photo">
              <Image src={assetUrl(member.photo)} alt={`${member.name} — ${localize(member.role, locale)}`} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" />
            </div>
            <div className="member-copy">
              <div className="program-badges">
                {member.programs.map((program) => <span key={program}>{program}</span>)}
              </div>
              <h2>{member.name}</h2>
              <p>{localize(member.role, locale)}</p>
              {member.bio && <p className="member-bio">{localize(member.bio, locale)}</p>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
