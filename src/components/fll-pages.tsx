import Image from "next/image";
import Link from "next/link";
import { awards } from "@/data/awards";
import { experts, localPath, pick } from "@/data/content";
import type { Award, Locale } from "@/data/types";
import { assetUrl } from "@/lib/assets";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function FllHero({ locale, eyebrow, title, description, children }: { locale: Locale; eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <section className="page-hero technical-grid fll-page-hero">
      <div className="shell page-hero-inner">
        <div>
          <span className="section-index">03</span>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children ?? <div className="identity-card"><span>FIRST LEGO LEAGUE</span><strong>2018</strong><p>{pick(locale, "Începutul parcursului FIRST", "FIRST journey began")}</p></div>}
      </div>
    </section>
  );
}

function SeasonBackLink({ locale }: { locale: Locale }) {
  return <Link className="season-back-link" href={localPath(locale, "fll")}><span aria-hidden="true">←</span> {pick(locale, "Toate sezoanele FLL", "All FLL seasons")}</Link>;
}


const documentationLanguages = [
  { code: "ro", label: "Română" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
] as const;

function FllDocumentationLinks({ locale }: { locale: Locale }) {
  return (
    <div className="fll-documentation" id="documentation">
      <div className="fll-documentation-heading">
        <span className="eyebrow">MUOVIS · FLL 2025–2026</span>
        <h3>{pick(locale, "Documentație în trei limbi", "Documentation in three languages")}</h3>
      </div>
      <div className="fll-documentation-links">
        {documentationLanguages.map(({ code, label }) => (
          <a
            key={code}
            className="button button-secondary"
            href={`/documents/muovis-documentation-${code}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            hrefLang={code}
            aria-label={`${pick(locale, "Documentație PDF", "PDF documentation")} — ${label}`}
          >
            {label} <Arrow />
          </a>
        ))}
      </div>
    </div>
  );
}

export function FllSeasonSelectPage({ locale }: { locale: Locale }) {
  return (
    <>
      <FllHero
        locale={locale}
        eyebrow="FIRST LEGO LEAGUE"
        title={pick(locale, "Alege sezonul.", "Choose a season.")}
        description={pick(locale, "Fiecare sezon păstrează separat robotul, proiectul de inovație, documentația și rezultatele echipei.", "Each season keeps the team’s robot, Innovation Project, documentation, and results in one dedicated archive.")}
      />
      <section className="section shell">
        <div className="season-selector-grid">
          <Link className="season-choice season-choice-current" href={localPath(locale, "fll/2026-2027")}>
            <div className="season-choice-top"><span className="eyebrow">{pick(locale, "SEZON CURENT", "CURRENT SEASON")}</span><span>02</span></div>
            <strong className="season-year">2026—27</strong>
            <h2>BIOGLOW™</h2>
            <p>{pick(locale, "Direcția FLL actuală: biodiversitate, cercetare și dezvoltarea următorului robot și proiect de inovație.", "The current FLL direction: biodiversity, research, and development of the next robot and Innovation Project.")}</p>
            <div className="season-tags"><span>BIOGLOW</span><span>{pick(locale, "ÎN DEZVOLTARE", "IN DEVELOPMENT")}</span></div>
            <span className="season-open">{pick(locale, "Deschide sezonul", "Open season")} <Arrow /></span>
          </Link>
          <Link className="season-choice" href={localPath(locale, "fll/2025-2026")}>
            <div className="season-choice-top"><span className="eyebrow">{pick(locale, "ARHIVĂ COMPLETĂ", "COMPLETE ARCHIVE")}</span><span>01</span></div>
            <strong className="season-year">2025—26</strong>
            <h2>UNEARTHED™</h2>
            <p>{pick(locale, "Pagina completă a sezonului trecut: proiectul MuoVis, robotul modular, șapte demonstrații video, experți, documentație și rezultate.", "The complete previous-season page: MuoVis, the modular robot, seven video demonstrations, experts, documentation, and results.")}</p>
            <div className="season-tags"><span>MUOVIS</span><span>ROBOT</span><span>7 VIDEO</span></div>
            <span className="season-open">{pick(locale, "Deschide arhiva", "Open archive")} <Arrow /></span>
          </Link>
        </div>
        <div className="fll-documents-index"><FllDocumentationLinks locale={locale} /></div>
      </section>
    </>
  );
}

export function FllCurrentPage({ locale }: { locale: Locale }) {
  return (
    <>
      <div className="shell season-back-wrap"><SeasonBackLink locale={locale} /></div>
      <FllHero
        locale={locale}
        eyebrow="FLL · CURRENT SEASON · 2026–2027"
        title="BIOGLOW™"
        description={pick(locale, "Sezonul FIRST LEGO League 2026–2027 explorează biodiversitatea. ROBOTECH se află în etapa de cercetare și dezvoltare a robotului și a proiectului de inovație.", "The 2026–2027 FIRST LEGO League season explores biodiversity. ROBOTECH is in the research and development phase for its robot and Innovation Project.")}
      >
        <div className="identity-card"><span>{pick(locale, "STARE SEZON", "SEASON STATUS")}</span><strong>{pick(locale, "Activ", "Active")}</strong><p>{pick(locale, "Conținut actualizat pe măsură ce este verificat", "Updated as work is verified")}</p></div>
      </FllHero>

      <section className="section shell">
        <div className="season-card fll-season">
          <span className="eyebrow">CURRENT SEASON · 2026–2027</span>
          <h2>BIOGLOW™</h2>
          <p>{pick(locale, "Sezonul explorează biodiversitatea. Disponibilitatea formatelor și evenimentelor diferă în funcție de regiune.", "The season explores biodiversity. Edition and event availability varies by region.")}</p>
          <a className="inline-cta" href="https://www.firstinspires.org/programs/fll/game-and-season" target="_blank" rel="noreferrer">FIRST season info <Arrow /></a>
        </div>
      </section>

      <section className="section surface-section">
        <div className="shell">
          <SectionHeading eyebrow="SEASON DEVELOPMENT" title={pick(locale, "Construim înainte să publicăm.", "We build before we publish.")} text={pick(locale, "Detaliile vor apărea numai după ce echipa le confirmă, fără specificații sau rezultate inventate.", "Details will be published only after team verification, with no invented specifications or results.")} />
          <div className="current-season-grid">
            {[
              ["01", pick(locale, "Robot", "Robot"), pick(locale, "Concept, misiuni și mecanisme în dezvoltare.", "Concept, missions, and mechanisms in development.")],
              ["02", pick(locale, "Proiect de inovație", "Innovation Project"), pick(locale, "Tema și cercetarea vor fi publicate după validare.", "The topic and research will be published after validation.")],
              ["03", pick(locale, "Documentație", "Documentation"), pick(locale, "Jurnalul de proiectare va fi adăugat pe parcursul sezonului.", "The engineering record will be added during the season.")],
            ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="contact-cta shell">
        <div><span className="eyebrow">PREVIOUS SEASON</span><h2>{pick(locale, "Vezi arhiva completă UNEARTHED.", "Explore the complete UNEARTHED archive.")}</h2></div>
        <Link className="button button-secondary" href={localPath(locale, "fll/2025-2026")}>2025–2026 <Arrow /></Link>
      </section>
    </>
  );
}

const applications = {
  ro: [
    ["01", "Arheologie", "Identificarea potențială a camerelor și golurilor ascunse în structuri istorice, fără forare."],
    ["02", "Geologie și mine", "Detectarea propusă a golurilor și anomaliilor din formațiuni de rocă."],
    ["03", "Securitate", "Analiza nedistructivă a containerelor pentru materiale dense."],
    ["04", "Infrastructură", "Investigarea podurilor și tunelurilor pentru defecte structurale ascunse."],
  ],
  en: [
    ["01", "Archaeology", "Potential identification of hidden chambers and voids in historic structures without drilling."],
    ["02", "Geology & mines", "Proposed detection of voids and anomalies within rock formations."],
    ["03", "Security", "Non-destructive analysis of containers for dense materials."],
    ["04", "Infrastructure", "Investigation of bridges and tunnels for hidden structural defects."],
  ],
};

const robotSpecs = {
  ro: [
    ["Design «Box Robot»", "Șasiul compact din grinzi LEGO Technic protejează hub-ul, motoarele și cablarea împotriva loviturilor și agățărilor."],
    ["Quick Swap", "Sistemul de fixare fără pini permite schimbarea modulelor active și a cadrelor în câteva secunde, prin montare de sus."],
    ["Navigație precisă", "Giroscopul controlează virajele și menținerea direcției; senzorii de culoare ajută la calibrarea pe liniile terenului și poziționarea la modele."],
    ["Ergonomie", "Centrul de greutate coborât susține stabilitatea, iar traseul protejat al cablurilor reduce riscul erorilor mecanice."],
  ],
  en: [
    ["“Box Robot” design", "A compact LEGO Technic beam chassis protects the hub, motors, and cabling from impacts and snags."],
    ["Quick Swap", "The pinless attachment system lets the team replace active modules and frames in seconds by mounting them from above."],
    ["Precise navigation", "The gyroscope controls turns and heading; color sensors support field-line calibration and positioning at mission models."],
    ["Ergonomics", "A low center of gravity supports stability, while protected cable routing reduces the risk of mechanical errors."],
  ],
};

export function FllArchivePage({ locale, achievementData = awards }: { locale: Locale; achievementData?: Award[] }) {
  const seasonAwards = achievementData.filter((item) => item.program === "FLL" && item.year === "2025–2026");
  return (
    <>
      <div className="shell season-back-wrap"><SeasonBackLink locale={locale} /></div>
      <FllHero
        locale={locale}
        eyebrow="FLL CHALLENGE · 2025–2026"
        title="UNEARTHED™"
        description={pick(locale, "Arhiva completă a sezonului: robotul de competiție, proiectul de inovație MuoVis, documentația, experții consultați și rezultatele echipei.", "The complete season archive: competition robot, MuoVis Innovation Project, documentation, consulted experts, and team results.")}
      >
        <div className="identity-card"><span>{pick(locale, "ARHIVĂ SEZON", "SEASON ARCHIVE")}</span><strong>2025—26</strong><p>MuoVis · Robot Game</p></div>
      </FllHero>

      <nav className="archive-nav" aria-label={pick(locale, "Cuprinsul sezonului", "Season contents")}>
        <div className="shell"><a href="#muovis">MuoVis</a><a href="#how-it-works">{pick(locale, "Cum funcționează", "How it works")}</a><a href="#solution">{pick(locale, "Soluție", "Solution")}</a><a href="#experts">{pick(locale, "Experți", "Experts")}</a><a href="#robot">Robot</a><a href="#documentation">{pick(locale, "Documentație", "Documentation")}</a><a href="#results">{pick(locale, "Rezultate", "Results")}</a></div>
      </nav>

      <section className="section shell" id="muovis">
        <SectionHeading eyebrow="INNOVATION PROJECT · MUOVIS" title={pick(locale, "Vedem în interior fără să distrugem.", "See inside without destroying.")} text={pick(locale, "MuoVis este conceptul unui sistem care folosește muoni produși de razele cosmice pentru a investiga obiecte și structuri mari.", "MuoVis is a system concept that uses cosmic-ray muons to investigate large objects and structures.")} />
        <div className="archive-intro-grid">
          <div className="archive-statement"><strong>{pick(locale, "Un sistem care investighează obiecte mari folosind particule cosmice.", "A system that investigates large objects using cosmic particles.")}</strong><p>{pick(locale, "Conceptul urmărește identificarea golurilor, zonelor cu densitate diferită și materialelor dense din interiorul obiectelor, fără intervenție distructivă.", "The concept aims to identify voids, areas of different density, and dense materials inside objects without destructive intervention.")}</p></div>
          <div className="archive-facts"><div><span>01</span><strong>{pick(locale, "Nedistructiv", "Non-destructive")}</strong></div><div><span>02</span><strong>{pick(locale, "Arhitectură modulară", "Modular architecture")}</strong></div><div><span>03</span><strong>{pick(locale, "Documentație tehnică", "Technical documentation")}</strong></div></div>
        </div>
      </section>

      <section className="section surface-section" id="how-it-works">
        <div className="shell">
          <SectionHeading eyebrow="01 / PRINCIPLE" title={pick(locale, "Cum funcționează tomografia cu muoni.", "How muon tomography works.")} />
          <ol className="process-grid">
            {[
              pick(locale, "Razele cosmice generează muoni în atmosferă.", "Cosmic rays create muons in the atmosphere."),
              pick(locale, "Muonii traversează obiectul investigat.", "Muons pass through the object being investigated."),
              pick(locale, "Detectoarele înregistrează traiectoriile particulelor.", "Detectors record the particles’ trajectories."),
              pick(locale, "Datele pot fi reconstruite într-o hartă 3D a densității.", "The data can be reconstructed into a 3D density map."),
            ].map((text, index) => <li key={text}><span>{String(index + 1).padStart(2, "0")}</span><p>{text}</p></li>)}
          </ol>
          <div className="why-grid"><div><span className="eyebrow">WHY IT MATTERS</span><h3>{pick(locale, "Structurile mari sunt greu de inspectat în profunzime.", "Large structures are difficult to inspect internally.")}</h3></div><ul className="feature-list"><li>{pick(locale, "Monumentele arheologice nu pot fi forate fără risc.", "Archaeological monuments cannot be drilled without risk.")}</li><li>{pick(locale, "Minele adânci pot fi dificil și periculos de explorat.", "Deep mines can be difficult and dangerous to explore.")}</li><li>{pick(locale, "Podurile și tunelurile pot ascunde defecte interne.", "Bridges and tunnels can hide internal defects.")}</li><li>{pick(locale, "Containerele cu materiale dense necesită metode sigure de verificare.", "Containers with dense materials require safe inspection methods.")}</li></ul></div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="02 / APPLICATIONS" title={pick(locale, "Unde poate fi aplicată tehnologia.", "Where the technology can be applied.")} />
        <div className="application-grid">{applications[locale].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section surface-section" id="solution">
        <div className="shell">
          <SectionHeading eyebrow="03 / PROPOSED SOLUTION" title={pick(locale, "Arhitectura MuoVis.", "The MuoVis architecture.")} text={pick(locale, "Conținutul de mai jos descrie conceptul documentat de echipă în sezonul 2025–2026, nu un produs validat în teren.", "The content below describes the concept documented by the team during 2025–2026, not a field-validated product.")} />
          <div className="solution-grid">
            <div className="solution-visual"><Image src={assetUrl("/images/projects/muovis-diagram.webp")} alt={pick(locale, "Diagramă tehnică MuoVis", "MuoVis technical diagram")} fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
            <div className="solution-copy">
              <h3>{pick(locale, "Sistem propus", "Proposed system")}</h3>
              <ul className="feature-list"><li>{pick(locale, "Detector compact de muoni", "Compact muon detector")}</li><li>{pick(locale, "Arhitectură modulară a sistemului", "Modular system architecture")}</li><li>{pick(locale, "Analiza și interpretarea datelor", "Data analysis and interpretation")}</li><li>{pick(locale, "Concept de integrare pe o platformă mobilă sau dronă", "Concept for integration on a mobile platform or drone")}</li></ul>
              <h3>{pick(locale, "Direcții de inovație", "Innovation directions")}</h3>
              <div className="season-tags"><span>{pick(locale, "PARTICULE COSMICE", "COSMIC PARTICLES")}</span><span>{pick(locale, "NEDISTRUCTIV", "NON-DESTRUCTIVE")}</span><span>{pick(locale, "MOBILITATE", "MOBILITY")}</span><span>{pick(locale, "RECONSTRUCȚIE DATE", "DATA RECONSTRUCTION")}</span></div>
              <div className="button-row"><a className="button button-secondary" href={assetUrl("/models/muovis-concept.glb")} download>{pick(locale, "Model 3D", "3D model")} ↓</a></div>
              <FllDocumentationLinks locale={locale} />
            </div>
          </div>
          <div className="concept-demo" aria-label={pick(locale, "Vizualizare conceptuală din prezentarea proiectului", "Concept visualization from the project presentation")}><div><span className="eyebrow">CONCEPT SIMULATION · 2025–2026</span><h3>{pick(locale, "De la traiectorii la o anomalie de densitate.", "From particle trajectories to a density anomaly.")}</h3><p>{pick(locale, "Prezentarea originală ilustra fluxul dorit: înregistrarea traiectoriilor, analiza densității și evidențierea unei zone neobișnuite. Aceasta este o simulare explicativă, nu rezultatul unui test fizic.", "The original presentation illustrated the intended flow: recording trajectories, analyzing density, and highlighting an unusual area. This is an explanatory simulation, not the result of a physical test.")}</p></div><div className="scan-readout"><span>&gt; MUON TRAJECTORIES</span><span>&gt; DENSITY RECONSTRUCTION</span><strong>&gt; ANOMALY VISUALIZATION</strong></div></div>
        </div>
      </section>

      <section className="section shell" id="experts">
        <SectionHeading eyebrow="04 / EXPERT INPUT" title={pick(locale, "Specialiști consultați pentru proiect.", "Experts consulted for the project.")} />
        <div className="expert-grid">{experts.map((expert) => <article key={expert.name}><div><Image src={assetUrl(expert.photo)} alt={expert.name} fill sizes="(max-width: 700px) 50vw, 20vw" /></div><h3>{expert.name}</h3><p>{expert.role[locale]}</p></article>)}</div>
      </section>

      <section className="section surface-section" id="robot">
        <div className="shell">
          <SectionHeading eyebrow="05 / ROBOT GAME · UNEARTHED" title={pick(locale, "Robot modular construit pentru schimbări rapide.", "A modular robot built for rapid changeovers.")} text={pick(locale, "Materialele video originale documentează robotul și modulele folosite în sezonul 2025–2026.", "The original video materials document the robot and modules used during the 2025–2026 season.")} />
          <div className="robot-overview"><video controls muted playsInline preload="metadata" poster={assetUrl("/images/gallery/video6.webp")}><source src={assetUrl("/media/fll/video6.mp4")} type="video/mp4" /></video><div className="robot-spec-list">{robotSpecs[locale].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
          <div className="robot-video-heading"><span className="eyebrow">MODULE ARCHIVE</span><h3>{pick(locale, "Demonstrații ale robotului și mecanismelor.", "Robot and mechanism demonstrations.")}</h3></div>
          <div className="robot-video-grid">{[1, 2, 3, 4, 5, 7].map((number) => <figure key={number}><video controls muted playsInline preload="none" poster={assetUrl(`/images/gallery/video${number}.webp`)}><source src={assetUrl(`/media/fll/video${number}.mp4`)} type="video/mp4" /></video><figcaption>{pick(locale, `Modul / demonstrație ${number}`, `Module / demonstration ${number}`)}</figcaption></figure>)}</div>
        </div>
      </section>

      <section className="section shell split-heading" id="results">
        <SectionHeading eyebrow="06 / FLL RESULTS" title={pick(locale, "Rezultatele sezonului", "Season results")} text="2025–2026" />
        <div className="award-wall">{seasonAwards.map((item) => <article className="award-row" key={item.id}><div className="award-year">{item.year}</div><div><div className="program-badges"><span className="badge-fll">FLL</span></div><h3>{item.award[locale]}</h3><p>{item.competition[locale]}{item.stage ? ` · ${item.stage[locale]}` : ""}</p></div></article>)}</div>
      </section>
    </>
  );
}
