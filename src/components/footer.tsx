import Link from "next/link";
import { localPath, nav } from "@/data/content";
import type { Locale } from "@/data/types";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div>
          <div className="wordmark footer-wordmark"><span className="wordmark-mark">R</span><span>ROBO<span>TECH</span></span></div>
          <p>{locale === "ro" ? "Inginerie. Competiție. Impact." : "Engineering. Competition. Impact."}</p>
          <p className="muted">Chișinău, Moldova · FTC #25491</p>
        </div>
        <div className="footer-links">
          <strong>{locale === "ro" ? "Explorează" : "Explore"}</strong>
          <Link href={localPath(locale, "team")}>{nav[locale].team}</Link>
          <Link href={localPath(locale, "achievements")}>{nav[locale].achievements}</Link>
          <Link href={localPath(locale, "gallery")}>{locale === "ro" ? "Galerie" : "Gallery"}</Link>
        </div>
        <div className="footer-links">
          <strong>{locale === "ro" ? "Verifică echipa" : "Verify the team"}</strong>
          <a href="https://ftc-events.firstinspires.org/team/25491" target="_blank" rel="noreferrer">FIRST Event Web ↗</a>
          <a href="https://ftcscout.org/teams/25491" target="_blank" rel="noreferrer">FTC Scout ↗</a>
        </div>
        <div className="footer-links">
          <strong>Contact</strong>
          <a href="tel:+37368689606">+373 68 689 606</a>
          <Link href={localPath(locale, "partners")}>{locale === "ro" ? "Devino partener" : "Become a partner"}</Link>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© 2026 ROBOTECH</span>
        <span>{locale === "ro" ? "Participanți în programele FIRST®; fără a implica o afiliere sau susținere oficială." : "Participants in FIRST® programs; no official endorsement implied."}</span>
      </div>
    </footer>
  );
}
