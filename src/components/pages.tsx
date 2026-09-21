import Image from "next/image";
import Link from "next/link";
import { awards } from "@/data/awards";
import { experts, localPath, pick, programs, timeline } from "@/data/content";
import { team } from "@/data/team";
import type { Award, Locale, TeamMember } from "@/data/types";
import { assetUrl } from "@/lib/assets";
import { GalleryGrid } from "./gallery-grid";
import { TeamGrid } from "./team-grid";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function PageHero({ index, title, description, meta, children }: { index: string; title: string; description: string; meta?: string; children?: React.ReactNode }) {
  return (
    <section className="page-hero technical-grid">
      <div className="shell page-hero-inner">
        <div>
          <span className="section-index">{index}</span>
          {meta && <span className="eyebrow">{meta}</span>}
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function AwardWall({ locale, data = awards, limit }: { locale: Locale; data?: Award[]; limit?: number }) {
  const list = limit ? data.slice(-limit).reverse() : data.slice().reverse();
  return (
    <div className="award-wall">
      {list.map((item) => (
        <article className="award-row" key={item.id}>
          <div className="award-year">{item.year}</div>
          <div>
            <div className="program-badges"><span className={`badge-${item.program.toLowerCase()}`}>{item.program}</span></div>
            <h3>{item.award[locale]}</h3>
            <p>{item.competition[locale]}{item.stage ? ` · ${item.stage[locale]}` : ""}</p>
          </div>
          {item.officialUrl && <a className="text-link" href={item.officialUrl} target="_blank" rel="noreferrer" aria-label={`${item.award[locale]} — official result`}><Arrow /></a>}
        </article>
      ))}
    </div>
  );
}

function MemberSelection({ locale, members = team }: { locale: Locale; members?: TeamMember[] }) {
  const featuredIds = ["boris-colesov", "natasha-avornicita", "rostik-pasetchnik", "lev-krupenenkov", "iulia-guc", "anton-mincioglo"];
  return (
    <div className="featured-team">
      {members.filter((member) => featuredIds.includes(member.id)).map((member) => (
        <article key={member.id}>
          <div className="featured-photo"><Image src={assetUrl(member.photo)} alt={`${member.name} — ${member.role[locale]}`} fill sizes="(max-width: 700px) 50vw, 16vw" /></div>
          <h3>{member.name}</h3>
          <p>{member.role[locale]}</p>
          <div className="program-badges">{member.programs.map((program) => <span key={program}>{program}</span>)}</div>
        </article>
      ))}
    </div>
  );
}

export function HomePage({ locale, members = team, achievementData = awards }: { locale: Locale; members?: TeamMember[]; achievementData?: Award[] }) {
  return (
    <>
      <section className="home-hero technical-grid">
        <div className="hero-layout shell">
          <div className="hero-copy">
            <span className="eyebrow">{pick(locale, "Chișinău · Moldova", "Chișinău · Moldova")}</span>
            <h1>BUILD.<br />CODE. <span>COMPETE.</span></h1>
            <p>{pick(locale, "Echipă de robotică din Moldova, activă în FIRST Tech Challenge #25491 și FIRST LEGO League.", "Moldovan robotics team competing in FIRST Tech Challenge #25491 and FIRST LEGO League.")}</p>
            <div className="credibility-line"><span />{pick(locale, "În ecosistemul FIRST din 2018", "In the FIRST ecosystem since 2018")}</div>
            <div className="button-row">
              <Link className="button button-primary" href={localPath(locale, "team")}>{pick(locale, "Cunoaște echipa", "Meet the team")}</Link>
              <Link className="button button-secondary" href={localPath(locale, "partners")}>{pick(locale, "Devino partener", "Partner with ROBOTECH")}</Link>
            </div>
          </div>
          <div className="hero-mosaic" aria-label={pick(locale, "Portrete reale ale membrilor ROBOTECH", "Real portraits of ROBOTECH members")}>
            {members.slice(0, 6).map((member, index) => (
              <div key={member.id} className={`mosaic-tile mosaic-${index + 1}`}><Image src={assetUrl(member.photo)} alt={member.name} fill priority={index < 2} sizes="(max-width: 800px) 33vw, 18vw" /></div>
            ))}
            <div className="mosaic-label"><span>FTC</span><strong>#25491</strong></div>
          </div>
        </div>
        <div className="stats-row shell">
          <div><strong>2018</strong><span>{pick(locale, "Începutul parcursului FIRST", "FIRST journey began")}</span></div>
          <div><strong>#25491</strong><span>{pick(locale, "Echipa FTC", "FTC team")}</span></div>
          <div><strong>3</strong><span>{pick(locale, "Programe FIRST", "FIRST programs")}</span></div>
          <div><strong>{achievementData.length}</strong><span>{pick(locale, "Premii și distincții", "Awards & distinctions")}</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label={pick(locale, "Programe la care participăm", "Programs we participate in")}>
        <div className="shell"><span>FIRST Tech Challenge</span><span>FIRST LEGO League Challenge</span><span>FIRST LEGO League Explore</span></div>
      </section>

      <section className="section shell about-grid">
        <SectionHeading eyebrow="01 / ROBOTECH" title={pick(locale, "Construim sisteme care trebuie să funcționeze.", "We build systems that have to work.")} />
        <div className="body-large">
          <p>{pick(locale, "ROBOTECH este o echipă de robotică din Moldova care proiectează roboți, dezvoltă proiecte inginerești și participă în programele FIRST din 2018.", "ROBOTECH is a student robotics team from Moldova that has been designing robots, developing engineering projects, and competing in FIRST programs since 2018.")}</p>
          <p>{pick(locale, "Îmbinăm mecanica, software-ul, cercetarea, designul și lucrul în echipă pentru a construi soluții testate în condiții reale de competiție.", "We combine mechanical engineering, software, research, design, and teamwork to build systems tested under real competition conditions.")}</p>
        </div>
      </section>

      <section className="section surface-section">
        <div className="shell">
          <SectionHeading eyebrow="02 / PROGRAMS" title={pick(locale, "Un singur nume. Trei direcții FIRST.", "One team. Three FIRST directions.")} />
          <div className="program-grid">
            {programs.map((program, index) => (
              <Link className="program-card" href={localPath(locale, program.href)} key={program.id}>
                <span className="card-index">0{index + 1}</span>
                <p>{program.meta[locale]}</p>
                <h3>{program.label}</h3>
                <p>{program.description[locale]}</p>
                <span className="card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell split-heading">
        <SectionHeading eyebrow="03 / RESULTS" title={pick(locale, "Rezultate care pot fi verificate.", "Results you can verify.")} text={pick(locale, "Premii raportate de echipă, prezentate fără a inventa clasări sau titluri.", "Team-provided results, presented without invented placements or titles.")} />
        <div>
          <AwardWall locale={locale} data={achievementData} limit={6} />
          <Link className="inline-cta" href={localPath(locale, "achievements")}>{pick(locale, "Vezi toate rezultatele", "View all achievements")} <span>→</span></Link>
        </div>
      </section>

      <section className="season-section technical-grid">
        <div className="shell season-layout">
          <div>
            <span className="eyebrow">FTC · 2026–2027</span>
            <h2>BIOBUZZ™<br /><span>presented by RTX</span></h2>
          </div>
          <div>
            <p>{pick(locale, "Noul sezon FTC face parte din sezonul FIRST® CANOPY™. ROBOTECH #25491 se află în etapa de cercetare, strategie și dezvoltare a robotului.", "The new FTC game is part of the FIRST® CANOPY™ season. ROBOTECH #25491 is in the research, strategy, and robot-development phase.")}</p>
            <div className="status-line"><i /> {pick(locale, "DEZVOLTARE ÎN CURS", "DEVELOPMENT IN PROGRESS")}</div>
            <div className="button-row">
              <Link className="button button-primary" href={localPath(locale, "ftc")}>{pick(locale, "Vezi direcția FTC", "Explore FTC")}</Link>
              <a className="button button-secondary" href="https://www.firstinspires.org/programs/ftc/game-and-season" target="_blank" rel="noreferrer">FIRST season info <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="04 / ENGINEERING" title={pick(locale, "Proiecte dezvoltate de echipă.", "Engineering built by the team.")} />
        <div className="project-feature-grid">
          <Link href={localPath(locale, "ftc")} className="project-feature project-ftc">
            <div className="project-visual robot-wireframe" aria-hidden="true"><span>FTC</span><b>25491</b></div>
            <div><span className="eyebrow">COMPETITION ROBOT</span><h3>{pick(locale, "Robotul FTC 2026–2027", "2026–2027 FTC Robot")}</h3><p>{pick(locale, "Mecanică, electronică, control și autonomie dezvoltate pentru competiție.", "Mechanics, electronics, control, and autonomous systems developed for competition.")}</p></div>
          </Link>
          <Link href={localPath(locale, "fll")} className="project-feature">
            <div className="project-visual"><Image src={assetUrl("/images/projects/muovis-diagram.webp")} alt={pick(locale, "Schemă tehnică MuoVis", "MuoVis technical diagram")} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span className="eyebrow">INNOVATION PROJECT</span><h3>MuoVis</h3><p>{pick(locale, "Concept documentat pentru investigarea structurilor mari folosind tomografie cu muoni.", "A documented concept for investigating large structures using muon tomography.")}</p></div>
          </Link>
        </div>
      </section>

      <section className="section surface-section">
        <div className="shell">
          <SectionHeading eyebrow="05 / HISTORY" title={pick(locale, "Un parcurs clar, fără a confunda programele.", "A clear history without mixing programs.")} />
          <div className="timeline">
            {timeline.map((item) => <div className="timeline-item" key={item.year}><strong>{item.year}</strong><p>{item[locale]}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="heading-row"><SectionHeading eyebrow="06 / PEOPLE" title={pick(locale, "Echipa din spatele robotului.", "The team behind the machine.")} /><Link className="inline-cta" href={localPath(locale, "team")}>{pick(locale, "Toată echipa", "Full team")} <span>→</span></Link></div>
        <MemberSelection locale={locale} members={members} />
      </section>

      <PartnerBanner locale={locale} />
    </>
  );
}

export function TeamPage({ locale, members = team }: { locale: Locale; members?: TeamMember[] }) {
  return (
    <>
      <PageHero index="01" meta={pick(locale, "19 PROFILURI VERIFICATE", "19 VERIFIED PROFILES")} title={pick(locale, "O echipă. Două niveluri de competiție.", "One team. Two levels of competition.")} description={pick(locale, "Membri activi, mentori și alumni din direcțiile FTC și FLL — administrați dintr-o singură sursă de date.", "Active members, mentors, and alumni across FTC and FLL — managed from one source of truth.")} />
      <section className="section shell"><TeamGrid locale={locale} members={members} /></section>
      <PartnerBanner locale={locale} />
    </>
  );
}

export function FtcPage({ locale, achievementData = awards }: { locale: Locale; achievementData?: Award[] }) {
  const ftcAwards = achievementData.filter((award) => award.program === "FTC");
  return (
    <>
      <PageHero index="02" meta="FIRST TECH CHALLENGE" title="ROBOTECH #25491" description={pick(locale, "Direcția FTC a ROBOTECH a început în 2020. Echipa #25491 are anul oficial de debut 2023 și concurează din Chișinău, Moldova.", "ROBOTECH’s FTC direction began in 2020. Team #25491 has an official 2023 rookie year and competes from Chișinău, Moldova.")}>
        <div className="identity-card"><span>{pick(locale, "IDENTITATE VERIFICATĂ", "VERIFIED IDENTITY")}</span><strong>#25491</strong><p>Chișinău · Moldova</p><a href="https://ftc-events.firstinspires.org/team/25491" target="_blank" rel="noreferrer">FIRST Event Web <Arrow /></a></div>
      </PageHero>

      <section className="section shell about-grid">
        <SectionHeading eyebrow="WHAT IS FTC?" title={pick(locale, "Robotică proiectată pentru un teren real de joc.", "Robotics engineered for a real field.")} />
        <div className="body-large"><p>{pick(locale, "FIRST Tech Challenge este un program în care echipele proiectează, construiesc și programează roboți pentru un joc competitiv lansat anual. Meciurile combină o perioadă autonomă cu controlul de către piloți.", "FIRST Tech Challenge is a program where teams design, build, and program robots for an annual competitive game. Matches combine an autonomous period with driver control.")}</p><p>{pick(locale, "Pentru ROBOTECH, FTC înseamnă integrarea mecanicii, electronicii, software-ului, documentației și strategiei într-un singur sistem fiabil.", "For ROBOTECH, FTC means integrating mechanics, electronics, software, documentation, and strategy into one reliable system.")}</p></div>
      </section>

      <section className="season-section technical-grid"><div className="shell season-layout"><div><span className="eyebrow">CURRENT SEASON · 2026–2027</span><h2>BIOBUZZ™<br /><span>presented by RTX</span></h2></div><div><p>{pick(locale, "Sezonul este inspirat de lumea naturală și de biodiversitate. Echipa analizează jocul, testează mecanisme și pregătește arhitectura software pentru noul robot.", "The season draws on the energy of the natural world and biodiversity. The team is analyzing the game, testing mechanisms, and preparing the software architecture for the new robot.")}</p><a className="inline-cta" href="https://www.firstinspires.org/programs/ftc/game-and-season" target="_blank" rel="noreferrer">Official season resources <Arrow /></a></div></div></section>

      <section className="section shell">
        <SectionHeading eyebrow="ROBOT / ENGINEERING" title={pick(locale, "Proiectarea este în curs.", "The robot is under development.")} text={pick(locale, "Specificațiile vor fi publicate numai după verificarea robotului 2026–2027.", "Specifications will be published only after the 2026–2027 robot is verified.")} />
        <div className="spec-grid">
          {["Drivetrain", "Motors", "Servos", "Control system", "Sensors", "Vision", "Autonomous", "CAD", "Weight", "Dimensions"].map((spec) => <div key={spec}><span>{spec}</span><strong>{pick(locale, "Odată cu prezentarea robotului", "Coming with the robot reveal")}</strong></div>)}
        </div>
      </section>

      <section className="section surface-section"><div className="shell"><SectionHeading eyebrow="SYSTEMS" title={pick(locale, "Patru discipline, un singur robot.", "Four disciplines, one robot.")} /><div className="discipline-grid">{[
        ["01", pick(locale, "Inginerie mecanică", "Mechanical engineering"), pick(locale, "Structură, mecanisme, prototipare și testare pentru fiabilitate.", "Structure, mechanisms, prototyping, and reliability testing.")],
        ["02", "Software", pick(locale, "Control, logică de meci și instrumente pentru iterații rapide.", "Control, match logic, and tools for fast iteration.")],
        ["03", pick(locale, "Autonomie", "Autonomous"), pick(locale, "Rutine și senzori validați pe teren înainte de competiție.", "Routines and sensing validated on the field before competition.")],
        ["04", pick(locale, "Echipă de teren", "Drive team"), pick(locale, "Pilotaj, strategie, comunicare și pregătire între meciuri.", "Driving, strategy, communication, and between-match preparation.")],
      ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section shell split-heading"><SectionHeading eyebrow="FTC / AWARDS" title={pick(locale, "Rezultate FTC", "FTC achievements")} /><div className="award-wall">{ftcAwards.slice().reverse().map((item) => <article className="award-row" key={item.id}><div className="award-year">{item.year}</div><div><div className="program-badges"><span>FTC</span></div><h3>{item.award[locale]}</h3><p>{item.competition[locale]}{item.stage ? ` · ${item.stage[locale]}` : ""}</p></div>{item.officialUrl && <a className="text-link" href={item.officialUrl} target="_blank" rel="noreferrer"><Arrow /></a>}</article>)}</div></section>

      <section className="section surface-section"><div className="shell external-cards"><a href="https://ftcscout.org/teams/25491" target="_blank" rel="noreferrer"><span>FTC SCOUT</span><strong>{pick(locale, "Date și meciuri", "Data & matches")}</strong><Arrow /></a><a href="https://ftc-events.firstinspires.org/team/25491" target="_blank" rel="noreferrer"><span>FIRST EVENT WEB</span><strong>{pick(locale, "Profil oficial", "Official profile")}</strong><Arrow /></a></div></section>
      <PartnerBanner locale={locale} />
    </>
  );
}

export function FllPage({ locale, achievementData = awards }: { locale: Locale; achievementData?: Award[] }) {
  return (
    <>
      <PageHero index="03" meta="FIRST LEGO LEAGUE" title={pick(locale, "Robot Game. Cercetare. Inovație.", "Robot Game. Research. Innovation.")} description={pick(locale, "ROBOTECH participă în FIRST LEGO League Challenge din 2018 și dezvoltă direcția Explore din 2023.", "ROBOTECH has participated in FIRST LEGO League Challenge since 2018 and has developed its Explore direction since 2023.")} />

      <section className="section shell"><div className="season-card fll-season"><span className="eyebrow">CURRENT SEASON · 2026–2027</span><h2>BIOGLOW™</h2><p>{pick(locale, "Sezonul FIRST LEGO League 2026–2027 explorează biodiversitatea. Disponibilitatea formatelor și evenimentelor diferă în funcție de regiune.", "The 2026–2027 FIRST LEGO League season explores biodiversity. Edition and event availability varies by region.")}</p><a className="inline-cta" href="https://www.firstinspires.org/programs/fll/game-and-season" target="_blank" rel="noreferrer">FIRST season info <Arrow /></a></div></section>

      <section className="section surface-section"><div className="shell"><SectionHeading eyebrow="2025–2026 / UNEARTHED" title={pick(locale, "Robotul FLL păstrat din arhivă.", "The archived FLL competition robot.")} text={pick(locale, "Videourile existente documentează modulele și robotul folosite în sezonul UNEARTHED.", "The existing videos document the modules and robot used during the UNEARTHED season.")} /><div className="video-feature"><video controls muted playsInline preload="metadata" poster={assetUrl("/images/gallery/video6.webp")}><source src={assetUrl("/media/fll/video6.mp4")} type="video/mp4" /></video><div><h3>{pick(locale, "Arhitectură modulară", "Modular architecture")}</h3><ul className="feature-list"><li>{pick(locale, "Șasiu compact din elemente LEGO Technic", "Compact LEGO Technic chassis")}</li><li>{pick(locale, "Module schimbabile rapid", "Quick-change modules")}</li><li>{pick(locale, "Navigație cu giroscop și senzori de culoare", "Gyroscope and color-sensor navigation")}</li><li>{pick(locale, "Cablare protejată și centru de greutate coborât", "Protected cabling and low center of gravity")}</li></ul></div></div></div></section>

      <section className="section shell">
        <SectionHeading eyebrow="INNOVATION PROJECT" title="MuoVis" text={pick(locale, "Un concept de sistem pentru inspectarea nedistructivă a structurilor mari folosind particule cosmice.", "A system concept for non-destructive inspection of large structures using cosmic particles.")} />
        <div className="muovis-grid"><div className="muovis-image"><Image src={assetUrl("/images/projects/muovis-diagram.webp")} alt={pick(locale, "Diagramă tehnică MuoVis", "MuoVis technical diagram")} fill sizes="(max-width: 900px) 100vw, 45vw" /></div><div className="muovis-copy"><div><span>01 / {pick(locale, "PROBLEMĂ", "PROBLEM")}</span><p>{pick(locale, "Structurile mari sunt dificil de inspectat în profunzime fără forare, desfacere sau alte intervenții distructive.", "Large structures can be difficult to inspect internally without drilling, dismantling, or other destructive intervention.")}</p></div><div><span>02 / {pick(locale, "SOLUȚIE PROPUSĂ", "PROPOSED SOLUTION")}</span><p>{pick(locale, "MuoVis documentează o arhitectură modulară de detector, electronică, logică digitală și reconstrucție pentru tomografie cu muoni.", "MuoVis documents a modular detector architecture, electronics, digital logic, and reconstruction workflow for muon tomography.")}</p></div><div><span>03 / {pick(locale, "REZULTAT", "RESULT")}</span><p>{pick(locale, "Echipa a realizat documentație tehnică, scheme, estimări și un model 3D. Site-ul nu prezintă conceptul ca produs validat în teren.", "The team produced technical documentation, schematics, estimates, and a 3D model. The site does not present the concept as a field-validated product.")}</p></div><div className="button-row"><a className="button button-primary" href={assetUrl(`/documents/muovis-documentation-${locale}.pdf`)} target="_blank">{pick(locale, "Documentație PDF", "PDF documentation")} <Arrow /></a><a className="button button-secondary" href={assetUrl("/models/muovis-concept.glb")} download>{pick(locale, "Model 3D", "3D model")} ↓</a></div></div></div>
      </section>

      <section className="section surface-section"><div className="shell"><SectionHeading eyebrow="EXPERT INPUT" title={pick(locale, "Specialiști consultați pentru proiect.", "Experts consulted for the project.")} /><div className="expert-grid">{experts.map((expert) => <article key={expert.name}><div><Image src={assetUrl(expert.photo)} alt={expert.name} fill sizes="(max-width: 700px) 50vw, 20vw" /></div><h3>{expert.name}</h3><p>{expert.role[locale]}</p></article>)}</div></div></section>
      <section className="section shell split-heading"><SectionHeading eyebrow="FLL / RESULTS" title={pick(locale, "Rezultate FLL", "FLL achievements")} /><div className="award-wall">{achievementData.filter((award) => award.program === "FLL").slice().reverse().map((item) => <article className="award-row" key={item.id}><div className="award-year">{item.year}</div><div><div className="program-badges"><span>FLL</span></div><h3>{item.award[locale]}</h3><p>{item.competition[locale]}{item.stage ? ` · ${item.stage[locale]}` : ""}</p></div></article>)}</div></section>
    </>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <><PageHero index="04" meta="ENGINEERING" title={pick(locale, "De la cerință la sistem.", "From requirement to system.")} description={pick(locale, "Proiecte de competiție și cercetare dezvoltate de membrii ROBOTECH.", "Competition and research projects developed by ROBOTECH members.")} /><section className="section shell"><div className="project-list"><article><div className="project-number">01</div><div><span className="eyebrow">FTC · 2026–2027</span><h2>{pick(locale, "Robot de competiție FTC", "FTC Competition Robot")}</h2><p>{pick(locale, "Un sistem integrat care trebuie să treacă inspecția, să execute sarcini autonome și să reziste ritmului unei competiții. Robotul curent este în dezvoltare; specificațiile vor apărea odată cu prezentarea oficială.", "An integrated system built to pass inspection, execute autonomous tasks, and survive competition pace. The current robot is in development; specifications will follow the official reveal.")}</p><Link className="inline-cta" href={localPath(locale, "ftc")}>{pick(locale, "Direcția FTC", "FTC program")} <span>→</span></Link></div><div className="robot-wireframe project-list-visual"><span>FTC</span><b>25491</b></div></article><article><div className="project-number">02</div><div><span className="eyebrow">FLL · INNOVATION PROJECT</span><h2>MuoVis</h2><p>{pick(locale, "Concept de tomografie cu muoni pentru investigarea nedistructivă a obiectelor mari. Proiectul include arhitectură, electronică, logică digitală, reconstrucție, estimări și consultare cu experți.", "Muon-tomography concept for non-destructive investigation of large objects. The project includes architecture, electronics, digital logic, reconstruction, estimates, and expert consultation.")}</p><Link className="inline-cta" href={localPath(locale, "fll")}>{pick(locale, "Vezi MuoVis", "Explore MuoVis")} <span>→</span></Link></div><div className="project-list-visual project-diagram"><Image src={assetUrl("/images/projects/muovis-diagram.webp")} alt={pick(locale, "Diagramă tehnică MuoVis", "MuoVis technical diagram")} fill sizes="(max-width: 900px) 100vw, 33vw" /></div></article></div></section></>
  );
}

export function AchievementsPage({ locale, achievementData = awards }: { locale: Locale; achievementData?: Award[] }) {
  return <><PageHero index="05" meta="2019—2026" title={pick(locale, "Rezultate, nu promisiuni.", "Results, not promises.")} description={pick(locale, "Cronologia premiilor și distincțiilor furnizate și verificate de echipă.", "A chronology of the awards and distinctions supplied and verified by the team.")} /><section className="section shell split-heading"><div><SectionHeading eyebrow="AWARDS WALL" title={String(achievementData.length)} text={pick(locale, "premii și distincții în FLL, FTC și alte competiții.", "awards and distinctions across FLL, FTC, and other competitions.")} /><p className="audit-note">{pick(locale, "Legăturile oficiale sunt afișate numai acolo unde au fost confirmate.", "Official links appear only where they have been confirmed.")}</p></div><AwardWall locale={locale} data={achievementData} /></section></>;
}

function PartnerBanner({ locale }: { locale: Locale }) {
  return <section className="partner-banner technical-grid"><div className="shell"><span className="eyebrow">PARTNERSHIPS</span><h2>{pick(locale, "Ajută o echipă din Moldova să construiască mai mult.", "Help a Moldovan team build what comes next.")}</h2><p>{pick(locale, "Sprijinul partenerilor se transformă direct în componente, fabricație, instrumente, înscrieri și acces la competiții.", "Partner support goes directly into components, manufacturing, tools, registration, and access to competitions.")}</p><Link className="button button-primary" href={localPath(locale, "partners")}>{pick(locale, "Discută un parteneriat", "Discuss a partnership")}</Link></div></section>;
}

export function PartnersPage({ locale }: { locale: Locale }) {
  const support = locale === "ro" ? ["Componente pentru robot", "Fabricație", "Electronică", "Instrumente", "Taxe de înscriere", "Deplasări", "Competiții", "Activități STEM"] : ["Robot components", "Manufacturing", "Electronics", "Tools", "Registration", "Travel", "Competitions", "STEM outreach"];
  return <><PageHero index="06" meta="SPONSORSHIP" title={pick(locale, "Construim viitorul împreună.", "Build the future with us.")} description={pick(locale, "ROBOTECH colaborează cu organizații care vor să susțină educația inginerească, tehnologia pentru tineri și robotica competitivă în Moldova.", "ROBOTECH works with organizations that want to support engineering education, youth technology, and competitive robotics in Moldova.")}><div className="identity-card partnership-contact"><span>{pick(locale, "CONTACT PARTENERIATE", "PARTNERSHIP CONTACT")}</span><strong>Boris Colesov</strong><a href="tel:+37368689606">+373 68 689 606</a></div></PageHero><section className="section shell"><SectionHeading eyebrow="WHAT SUPPORT ENABLES" title={pick(locale, "Sprijin concret. Rezultate vizibile.", "Concrete support. Visible results.")} /><div className="support-grid">{support.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></section><section className="section surface-section"><div className="shell partnership-layout"><div><SectionHeading eyebrow="PARTNER VISIBILITY" title={pick(locale, "O platformă pregătită pentru parteneri reali.", "A platform ready for real partners.")} /><p>{pick(locale, "Logourile și nivelurile de parteneriat vor fi publicate numai după confirmare. În prezent nu afișăm sponsori neconfirmați.", "Partner logos and tiers will be published only after confirmation. No unconfirmed sponsors are displayed today.")}</p></div><div className="partner-ready"><span>{pick(locale, "SPAȚIU CONFIGURABIL", "CONFIGURABLE PARTNER AREA")}</span><strong>{pick(locale, "Logo · Nivel · Link · Descriere", "Logo · Tier · Link · Description")}</strong><p>Supabase-backed partner records</p></div></div></section><section className="contact-cta shell"><div><span className="eyebrow">START A CONVERSATION</span><h2>{pick(locale, "Să vedem ce putem construi împreună.", "Let’s see what we can build together.")}</h2></div><a className="button button-primary" href="tel:+37368689606">{pick(locale, "Discută parteneriatul", "Discuss partnership")}</a></section></>;
}

export function GalleryPage({ locale }: { locale: Locale }) {
  return <><PageHero index="07" meta="MEDIA ARCHIVE" title={pick(locale, "O arhivă construită din materiale reale.", "An archive built from real media.")} description={pick(locale, "Imagini și cadre extrase exclusiv din proiectul ROBOTECH existent. Fără fotografie de stoc și fără portrete generate.", "Images and frames sourced exclusively from the existing ROBOTECH project. No stock photography and no generated portraits.")} /><section className="section shell"><GalleryGrid locale={locale} /></section></>;
}

export function ContactPage({ locale }: { locale: Locale }) {
  return <><PageHero index="08" meta="CHIȘINĂU · MOLDOVA" title={pick(locale, "Vorbește direct cu ROBOTECH.", "Talk directly to ROBOTECH.")} description={pick(locale, "Pentru parteneriate, instituții, școli, competiții și colaborări tehnice.", "For partnerships, institutions, schools, competitions, and technical collaboration.")} /><section className="section shell contact-grid"><div className="contact-primary"><span className="eyebrow">CONTACT PERSON</span><h2>Boris Colesov</h2><a href="tel:+37368689606">+373 68 689 606</a><div className="button-row"><a className="button button-primary" href="tel:+37368689606">{pick(locale, "Apelează", "Call now")}</a><Link className="button button-secondary" href={localPath(locale, "partners")}>{pick(locale, "Parteneriate", "Partnerships")}</Link></div></div><div className="contact-facts"><div><span>{pick(locale, "ECHIPĂ", "TEAM")}</span><strong>ROBOTECH</strong></div><div><span>{pick(locale, "LOCAȚIE", "LOCATION")}</span><strong>Chișinău, Moldova</strong></div><div><span>FTC</span><strong>Team #25491</strong></div><div><span>WEB</span><strong>robotech.md</strong></div></div></section></>;
}
