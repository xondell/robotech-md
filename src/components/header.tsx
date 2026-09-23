"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { alternatePath, localPath, nav, type RouteSlug } from "@/data/content";
import type { Locale } from "@/data/types";

const navItems: Array<{ key: keyof (typeof nav)["ro"]; slug: RouteSlug }> = [
  { key: "home", slug: "" },
  { key: "team", slug: "team" },
  { key: "ftc", slug: "ftc" },
  { key: "fll", slug: "fll" },
  { key: "projects", slug: "projects" },
  { key: "achievements", slug: "achievements" },
  { key: "partners", slug: "partners" },
  { key: "contact", slug: "contact" },
];

export function Header({ locale, slug }: { locale: Locale; slug: RouteSlug }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    document.body.classList.toggle("menu-open", open);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href={localPath(locale)} aria-label="ROBOTECH — home">
          <span className="wordmark-mark" aria-hidden="true">R</span>
          <span>ROBO<span>TECH</span></span>
        </Link>

        <nav id="mobile-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label={locale === "ro" ? "Navigare principală" : "Primary navigation"}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              className={slug === item.slug || (item.slug !== "" && slug.startsWith(`${item.slug}/`)) ? "is-active" : ""}
              href={localPath(locale, item.slug)}
              onClick={() => setOpen(false)}
            >
              {nav[locale][item.key]}
            </Link>
          ))}
          <a href="https://ftcscout.org/teams/25491" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            FTC Scout <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="header-actions">
          <Link className="language-link" href={alternatePath(locale, slug)} hrefLang={locale === "ro" ? "en" : "ro"}>
            {locale === "ro" ? "EN" : "RO"}
          </Link>
          <button
            className={`menu-button ${open ? "is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? (locale === "ro" ? "Închide meniul" : "Close menu") : (locale === "ro" ? "Deschide meniul" : "Open menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
