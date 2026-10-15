"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { localPath, nav, pick, type RouteSlug } from "@/data/content";
import type { Locale } from "@/data/types";

const navItems: Array<{ key: keyof (typeof nav)["ro"]; slug: RouteSlug }> = [
  { key: "home", slug: "" },
  { key: "team", slug: "team" },
  { key: "ftc", slug: "ftc" },
  { key: "fll", slug: "fll" },
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
        <Link className="wordmark" href={localPath(locale)} aria-label={locale === "ru" ? "ROBOTECH — главная" : "ROBOTECH — home"}>
          <Image className="brand-wordmark" src="/brand/robotech-logo.svg" width={126} height={69} alt="" aria-hidden="true" />
        </Link>

        <nav id="mobile-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label={pick(locale, "Navigare principală", "Primary navigation")}>
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
          <a href="https://instagram.com/robotech.md" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a href="https://ftcscout.org/teams/25491" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            FTC Scout <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="header-actions">
          <div className="language-options" aria-label={pick(locale, "Alege limba", "Select language")}>
            {(["ru", "ro", "en"] as const).map((language) => (
              <Link key={language} className={`language-link ${locale === language ? "is-current" : ""}`}
                href={localPath(language, slug)} hrefLang={language}
                aria-current={locale === language ? "page" : undefined}>
                {language.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            className={`menu-button ${open ? "is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? pick(locale, "Închide meniul", "Close menu") : pick(locale, "Deschide meniul", "Open menu")}
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
