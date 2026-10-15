import Image from "next/image";
import Link from "next/link";
import { awards } from "@/data/awards";
import { localPath, localize, pick, programs, timeline } from "@/data/content";
import { translateText } from "@/data/ru";
import { team } from "@/data/team";
import type { Award, Locale, TeamMember } from "@/data/types";
import { assetUrl } from "@/lib/assets";
import { GalleryGrid } from "./gallery-grid";
import { TeamGrid } from "./team-grid";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ eyebrow, title, text, locale }: { eyebrow: string; title: string; text?: string; locale: Locale }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{locale === "ru" ? translateText(eyebrow) : eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function PageHero({ index, title, description, meta, children, locale }: { index: string; title: string; description: string; meta?: string; children?: React.ReactNode; locale: Locale }) {
  return (
    <section className="page-hero technical-grid">
      <div className="shell page-hero-inner">
        <div>
          <span className="section-index">{index}</span>
          {meta && <span className="eyebrow">{locale === "ru" ? translateText(meta) : meta}</span>}
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
            <h3>{localize(item.award, locale)}</h3>
            <p>{localize(item.competition, locale)}{item.stage ? ` · ${localize(item.stage, locale)}` : ""}</p>
          </div>
          {item.officialUrl && <a className="text-link" href={item.officialUrl} target="_blank" rel="noreferrer" aria-label={`${localize(item.award, locale)} — official result`}><Arrow /></a>}
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
          <div className="featured-photo"><Image src={assetUrl(member.photo)} alt={`${member.name} — ${localize(member.role, locale)}`} fill sizes="(max-width: 700px) 50vw, 16vw" /></div>
          <h3>{member.name}</h3>
          <p>{localize(member.role, locale)}</p>
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
            <h1 className={locale === "ru" ? "ru-hero-title" : undefined}>{locale === "ru" ? <>СОБИРАЙ.<br />ПИШИ КОД.<br /><span>ПОБЕЖДАЙ.</span></> : <>BUILD.<br />CODE. <span>COMPETE.</span></>}</h1>
            <p>{pick(locale, "Echipă de robotică din Moldova, activă în FIRST Tech Challenge #25491 și FIRST LEGO League.", "Moldovan robotics team competing in FIRST Tech Challenge #25491 and FIRST LEGO League.")}</p>
            <div className="credibility-line"><span />{pick(locale, "În ecosistemul FIRST din 2018", "In the FIRST ecosystem since 2018")}</div>
            <div className="button-row">
              <Link className="button button-primary" href={localPath(locale, "team")}>{pick(locale, "Cunoaște echipa", "Meet the team")}</Link>
              <Link className="button button-secondary" href={localPath(locale, "partners")}>{pick(locale, "Devino partener", "Partner with ROBOTECH")}</Link>
            </div>
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
        <SectionHeading locale={locale} eyebrow="01 / ROBOTECH" title={pick(locale, "Construim sisteme care trebuie să funcționeze.", "We build systems that have to work.")} />
        <div className="body-large">
          <p>{pick(locale, "ROBOTECH este o echipă de robotică din Moldova care proiectează roboți, dezvoltă proiecte inginerești și participă în programele FIRST din 2018.", "ROBOTECH is a student robotics team from Moldova that has been designing robots, developing engineering projects, and competing in FIRST programs since 2018.")}</p>
          <p>{pick(locale, "Îmbinăm mecanica, software-ul, cercetarea, designul și lucrul în echipă pentru a construi soluții testate în condiții reale de competiție.", "We combine mechanical engineering, software, research, design, and teamwork to build systems tested under real competition conditions.")}</p>
        </div>
      </section>

      <section className="section surface-section">
        <div className="shell">
          <SectionHeading locale={locale} eyebrow="02 / PROGRAMS" title={pick(locale, "Un singur nume. Trei direcții FIRST.", "One team. Three FIRST directions.")} />
          <div className="program-grid">
            {programs.map((program, index) => (
              <Link className="program-card" href={localPath(locale, program.href)} key={program.id}>
                <span className="card-index">0{index + 1}</span>
                <p>{localize(program.meta, locale)}</p>
                <h3>{program.label}</h3>
                <p>{localize(program.description, locale)}</p>
                <span className="card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell split-heading">
        <SectionHeading locale={locale} eyebrow="03 / RESULTS" title={pick(locale, "Rezultate care pot fi verificate.", "Results you can verify.")} text={pick(locale, "Premii raportate de echipă, prezentate fără a inventa clasări sau titluri.", "Team-provided results, presented without invented placements or titles.")} />
        <div>
          <AwardWall locale={locale} data={achievementData} limit={6} />
          <Link className="inline-cta" href={localPath(locale, "achievements")}>{pick(locale, "Vezi toate rezultatele", "View all achievements")} <span>→</span></Link>
        </div>
      </section>

      <section className="season-section technical-grid">
        <div className="shell season-layout">
          <div>
            <span className="eyebrow">{locale === "ru" ? translateText("FTC · 2026–2027") : "FTC · 2026–2027"}</span>
            <h2>BIOBUZZ™<br /><span>{locale === "ru" ? "при поддержке RTX" : "presented by RTX"}</span></h2>
          </div>
          <div>
            <p>{pick(locale, "Noul sezon FTC face parte din sezonul FIRST® CANOPY™. ROBOTECH #25491 se află în etapa de cercetare, strategie și dezvoltare a robotului.", "The new FTC game is part of the FIRST® CANOPY™ season. ROBOTECH #25491 is in the research, strategy, and robot-development phase.")}</p>
            <div className="status-line"><i /> {pick(locale, "DEZVOLTARE ÎN CURS", "DEVELOPMENT IN PROGRESS")}</div>
            <div className="button-row">
              <Link className="button button-primary" href={localPath(locale, "ftc")}>{pick(locale, "Vezi direcția FTC", "Explore FTC")}</Link>
              <a className="button button-secondary" href="https://www.firstinspires.org/programs/ftc/game-and-season" target="_blank" rel="noreferrer">{pick(locale, "FIRST season info", "FIRST season info")} <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading locale={locale} eyebrow="04 / ENGINEERING" title={pick(locale, "Proiecte dezvoltate de echipă.", "Engineering built by the team.")} />
        <div className="project-feature-grid">
          <Link href={localPath(locale, "ftc")} className="project-feature project-ftc">
            <div className="project-visual robot-wireframe" aria-hidden="true"><span>FTC</span><b>25491</b></div>
            <div><span className="eyebrow">{locale === "ru" ? translateText("COMPETITION ROBOT") : "COMPETITION ROBOT"}</span><h3>{pick(locale, "Robotul FTC 2026–2027", "2026–2027 FTC Robot")}</h3><p>{pick(locale, "Mecanică, electronică, control și autonomie dezvoltate pentru competiție.", "Mechanics, electronics, control, and autonomous systems developed for competition.")}</p></div>
          </Link>
          <Link href={localPath(locale, "fll/2025-2026#muovis")} className="project-feature">
            <div className="project-visual"><Image src={assetUrl("/images/projects/muovis-diagram.webp")} alt={pick(locale, "Schemă tehnică MuoVis", "MuoVis technical diagram")} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div><span className="eyebrow">{locale === "ru" ? translateText("INNOVATION PROJECT") : "INNOVATION PROJECT"}</span><h3>MuoVis</h3><p>{pick(locale, "Concept documentat pentru investigarea structurilor mari folosind tomografie cu muoni.", "A documented concept for investigating large structures using muon tomography.")}</p></div>
          </Link>
        </div>
      </section>

      <section className="section surface-section">
        <div className="shell">
          <SectionHeading locale={locale} eyebrow="05 / HISTORY" title={pick(locale, "Un parcurs clar, fără a confunda programele.", "A clear history without mixing programs.")} />
          <div className="timeline">
            {timeline.map((item) => <div className="timeline-item" key={item.year}><strong>{item.year}</strong><p>{localize(item, locale)}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="heading-row"><SectionHeading locale={locale} eyebrow="06 / PEOPLE" title={pick(locale, "Echipa din spatele robotului.", "The team behind the machine.")} /><Link className="inline-cta" href={localPath(locale, "team")}>{pick(locale, "Toată echipa", "Full team")} <span>→</span></Link></div>
        <MemberSelection locale={locale} members={members} />
      </section>

      <PartnerBanner locale={locale} />
    </>
  );
}

export function TeamPage({ locale, members = team }: { locale: Locale; members?: TeamMember[] }) {
  return (
    <>
      <PageHero locale={locale} index="01" meta={pick(locale, "19 PROFILURI VERIFICATE", "19 VERIFIED PROFILES")} title={pick(locale, "O echipă. Două niveluri de competiție.", "One team. Two levels of competition.")} description={pick(locale, "Membri activi, mentori și alumni din direcțiile FTC și FLL — administrați dintr-o singură sursă de date.", "Active members, mentors, and alumni across FTC and FLL — managed from one source of truth.")} />
      <section className="section shell"><TeamGrid locale={locale} members={members} /></section>
      <PartnerBanner locale={locale} />
    </>
  );
}

export function FtcPage({ locale, achievementData = awards }: { locale: Locale; achievementData?: Award[] }) {
  const ftcAwards = achievementData.filter((award) => award.program === "FTC");
  return (
    <>
      <PageHero locale={locale} index="02" meta="FIRST TECH CHALLENGE" title="ROBOTECH #25491" description={pick(locale, "Direcția FTC a ROBOTECH a început în 2020. Echipa #25491 are anul oficial de debut 2023 și concurează din Chișinău, Moldova.", "ROBOTECH’s FTC direction began in 2020. Team #25491 has an official 2023 rookie year and competes from Chișinău, Moldova.")}>
        <div className="identity-card"><span>{pick(locale, "IDENTITATE VERIFICATĂ", "VERIFIED IDENTITY")}</span><strong>#25491</strong><p>Chișinău · Moldova</p><a href="https://ftc-events.firstinspires.org/team/25491" target="_blank" rel="noreferrer">FIRST Event Web <Arrow /></a></div>
      </PageHero>

      <section className="section shell about-grid">
        <SectionHeading locale={locale} eyebrow="WHAT IS FTC?" title={pick(locale, "Robotică proiectată pentru un teren real de joc.", "Robotics engineered for a real field.")} />
        <div className="body-large"><p>{pick(locale, "FIRST Tech Challenge este un program în care echipele proiectează, construiesc și programează roboți pentru un joc competitiv lansat anual. Meciurile combină o perioadă autonomă cu controlul de către piloți.", "FIRST Tech Challenge is a program where teams design, build, and program robots for an annual competitive game. Matches combine an autonomous period with driver control.")}</p><p>{pick(locale, "Pentru ROBOTECH, FTC înseamnă integrarea mecanicii, electronicii, software-ului, documentației și strategiei într-un singur sistem fiabil.", "For ROBOTECH, FTC means integrating mechanics, electronics, software, documentation, and strategy into one reliable system.")}</p></div>
      </section>

      <section className="season-section technical-grid"><div className="shell season-layout"><div><span className="eyebrow">{locale === "ru" ? translateText("CURRENT SEASON · 2026–2027") : "CURRENT SEASON · 2026–2027"}</span><h2>BIOBUZZ™<br /><span>{locale === "ru" ? "при поддержке RTX" : "presented by RTX"}</span></h2></div><div><p>{pick(locale, "Sezonul este inspirat de lumea naturală și de biodiversitate. Echipa analizează jocul, testează mecanisme și pregătește arhitectura software pentru noul robot.", "The season draws on the energy of the natural world and biodiversity. The team is analyzing the game, testing mechanisms, and preparing the software architecture for the new robot.")}</p><a className="inline-cta" href="https://www.firstinspires.org/programs/ftc/game-and-season" target="_blank" rel="noreferrer">Official season resources <Arrow /></a></div></div></section>

      <section className="section shell">
        <SectionHeading locale={locale} eyebrow="ROBOT / ENGINEERING" title={pick(locale, "Proiectarea este în curs.", "The robot is under development.")} text={pick(locale, "Specificațiile vor fi publicate numai după verificarea robotului 2026–2027.", "Specifications will be published only after the 2026–2027 robot is verified.")} />
        <div className="spec-grid">
          {["Drivetrain", "Motors", "Servos", "Control system", "Sensors", "Vision", "Autonomous", "CAD", "Weight", "Dimensions"].map((spec) => <div key={spec}><span>{spec}</span><strong>{pick(locale, "Odată cu prezentarea robotului", "Coming with the robot reveal")}</strong></div>)}
        </div>
      </section>

      <section className="section surface-section"><div className="shell"><SectionHeading locale={locale} eyebrow="SYSTEMS" title={pick(locale, "Patru discipline, un singur robot.", "Four disciplines, one robot.")} /><div className="discipline-grid">{[
        ["01", pick(locale, "Inginerie mecanică", "Mechanical engineering"), pick(locale, "Structură, mecanisme, prototipare și testare pentru fiabilitate.", "Structure, mechanisms, prototyping, and reliability testing.")],
        ["02", "Software", pick(locale, "Control, logică de meci și instrumente pentru iterații rapide.", "Control, match logic, and tools for fast iteration.")],
        ["03", pick(locale, "Autonomie", "Autonomous"), pick(locale, "Rutine și senzori validați pe teren înainte de competiție.", "Routines and sensing validated on the field before competition.")],
        ["04", pick(locale, "Echipă de teren", "Drive team"), pick(locale, "Pilotaj, strategie, comunicare și pregătire între meciuri.", "Driving, strategy, communication, and between-match preparation.")],
      ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section shell split-heading"><SectionHeading locale={locale} eyebrow="FTC / AWARDS" title={pick(locale, "Rezultate FTC", "FTC achievements")} /><div className="award-wall">{ftcAwards.slice().reverse().map((item) => <article className="award-row" key={item.id}><div className="award-year">{item.year}</div><div><div className="program-badges"><span>FTC</span></div><h3>{localize(item.award, locale)}</h3><p>{localize(item.competition, locale)}{item.stage ? ` · ${localize(item.stage, locale)}` : ""}</p></div>{item.officialUrl && <a className="text-link" href={item.officialUrl} target="_blank" rel="noreferrer"><Arrow /></a>}</article>)}</div></section>

      <section className="section surface-section"><div className="shell external-cards"><a href="https://ftcscout.org/teams/25491" target="_blank" rel="noreferrer"><span>FTC SCOUT</span><strong>{pick(locale, "Date și meciuri", "Data & matches")}</strong><Arrow /></a><a href="https://ftc-events.firstinspires.org/team/25491" target="_blank" rel="noreferrer"><span>FIRST EVENT WEB</span><strong>{pick(locale, "Profil oficial", "Official profile")}</strong><Arrow /></a></div></section>
      <PartnerBanner locale={locale} />
    </>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <><PageHero locale={locale} index="04" meta="ENGINEERING" title={pick(locale, "De la cerință la sistem.", "From requirement to system.")} description={pick(locale, "Proiecte de competiție și cercetare dezvoltate de membrii ROBOTECH.", "Competition and research projects developed by ROBOTECH members.")} /><section className="section shell"><div className="project-list"><article><div className="project-number">01</div><div><span className="eyebrow">{locale === "ru" ? translateText("FTC · 2026–2027") : "FTC · 2026–2027"}</span><h2>{pick(locale, "Robot de competiție FTC", "FTC Competition Robot")}</h2><p>{pick(locale, "Un sistem integrat care trebuie să treacă inspecția, să execute sarcini autonome și să reziste ritmului unei competiții. Robotul curent este în dezvoltare; specificațiile vor apărea odată cu prezentarea oficială.", "An integrated system built to pass inspection, execute autonomous tasks, and survive competition pace. The current robot is in development; specifications will follow the official reveal.")}</p><Link className="inline-cta" href={localPath(locale, "ftc")}>{pick(locale, "Direcția FTC", "FTC program")} <span>→</span></Link></div><div className="robot-wireframe project-list-visual"><span>FTC</span><b>25491</b></div></article><article><div className="project-number">02</div><div><span className="eyebrow">{locale === "ru" ? translateText("FLL · 2025–2026 · INNOVATION PROJECT") : "FLL · 2025–2026 · INNOVATION PROJECT"}</span><h2>MuoVis</h2><p>{pick(locale, "Concept de tomografie cu muoni pentru investigarea nedistructivă a obiectelor mari. Proiectul include arhitectură, electronică, logică digitală, reconstrucție, estimări și consultare cu experți.", "Muon-tomography concept for non-destructive investigation of large objects. The project includes architecture, electronics, digital logic, reconstruction, estimates, and expert consultation.")}</p><Link className="inline-cta" href={localPath(locale, "fll/2025-2026#muovis")}>{pick(locale, "Vezi arhiva MuoVis", "Explore the MuoVis archive")} <span>→</span></Link></div><div className="project-list-visual project-diagram"><Image src={assetUrl("/images/projects/muovis-diagram.webp")} alt={pick(locale, "Diagramă tehnică MuoVis", "MuoVis technical diagram")} fill sizes="(max-width: 900px) 100vw, 33vw" /></div></article></div></section></>
  );
}

export function AchievementsPage({ locale, achievementData = awards }: { locale: Locale; achievementData?: Award[] }) {
  return <><PageHero locale={locale} index="05" meta="2019—2026" title={pick(locale, "Rezultate, nu promisiuni.", "Results, not promises.")} description={pick(locale, "Cronologia premiilor și distincțiilor furnizate și verificate de echipă.", "A chronology of the awards and distinctions supplied and verified by the team.")} /><section className="section shell split-heading"><div><SectionHeading locale={locale} eyebrow="AWARDS WALL" title={String(achievementData.length)} text={pick(locale, "premii și distincții în FLL, FTC și alte competiții.", "awards and distinctions across FLL, FTC, and other competitions.")} /><p className="audit-note">{pick(locale, "Legăturile oficiale sunt afișate numai acolo unde au fost confirmate.", "Official links appear only where they have been confirmed.")}</p></div><AwardWall locale={locale} data={achievementData} /></section></>;
}

function PartnerBanner({ locale }: { locale: Locale }) {
  return <section className="partner-banner technical-grid"><div className="shell"><span className="eyebrow">{locale === "ru" ? translateText("PARTNERSHIPS") : "PARTNERSHIPS"}</span><h2>{pick(locale, "Ajută o echipă din Moldova să construiască mai mult.", "Help a Moldovan team build what comes next.")}</h2><p>{pick(locale, "Sprijinul partenerilor se transformă direct în componente, fabricație, instrumente, înscrieri și acces la competiții.", "Partner support goes directly into components, manufacturing, tools, registration, and access to competitions.")}</p><Link className="button button-primary" href={localPath(locale, "partners")}>{pick(locale, "Discută un parteneriat", "Discuss a partnership")}</Link></div></section>;
}

export function PartnersPage({ locale }: { locale: Locale }) {
  const support = locale === "ru" ? ["Детали для робота", "Изготовление деталей", "Электроника", "Инструменты", "Регистрационные взносы", "Поездки", "Соревнования", "STEM-мероприятия"] : locale === "ro" ? ["Componente pentru robot", "Fabricație", "Electronică", "Instrumente", "Taxe de înscriere", "Deplasări", "Competiții", "Activități STEM"] : ["Robot components", "Manufacturing", "Electronics", "Tools", "Registration", "Travel", "Competitions", "STEM outreach"];
  return <><PageHero locale={locale} index="06" meta="SPONSORSHIP" title={pick(locale, "Construim viitorul împreună.", "Build the future with us.")} description={pick(locale, "ROBOTECH colaborează cu organizații care vor să susțină educația inginerească, tehnologia pentru tineri și robotica competitivă în Moldova.", "ROBOTECH works with organizations that want to support engineering education, youth technology, and competitive robotics in Moldova.")}><div className="identity-card partnership-contact"><span>{pick(locale, "CONTACT PARTENERIATE", "PARTNERSHIP CONTACT")}</span><strong>Boris Colesov</strong><a href="tel:+37368689606">+373 68 689 606</a></div></PageHero><section className="section shell"><SectionHeading locale={locale} eyebrow="WHAT SUPPORT ENABLES" title={pick(locale, "Sprijin concret. Rezultate vizibile.", "Concrete support. Visible results.")} /><div className="support-grid">{support.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div></section><section className="section surface-section"><div className="shell partnership-layout"><div><SectionHeading locale={locale} eyebrow="PARTNER VISIBILITY" title={pick(locale, "O platformă pregătită pentru parteneri reali.", "A platform ready for real partners.")} /><p>{pick(locale, "Logourile și nivelurile de parteneriat vor fi publicate numai după confirmare. În prezent nu afișăm sponsori neconfirmați.", "Partner logos and tiers will be published only after confirmation. No unconfirmed sponsors are displayed today.")}</p></div><div className="partner-ready"><span>{pick(locale, "SPAȚIU CONFIGURABIL", "CONFIGURABLE PARTNER AREA")}</span><strong>{pick(locale, "Logo · Nivel · Link · Descriere", "Logo · Tier · Link · Description")}</strong><p>{locale === "ru" ? "Данные партнёров в Supabase" : "Supabase-backed partner records"}</p></div></div></section><section className="contact-cta shell"><div><span className="eyebrow">{locale === "ru" ? translateText("START A CONVERSATION") : "START A CONVERSATION"}</span><h2>{pick(locale, "Să vedem ce putem construi împreună.", "Let’s see what we can build together.")}</h2></div><a className="button button-primary" href="tel:+37368689606">{pick(locale, "Discută parteneriatul", "Discuss partnership")}</a></section></>;
}

export function GalleryPage({ locale }: { locale: Locale }) {
  return <><PageHero locale={locale} index="07" meta="MEDIA ARCHIVE" title={pick(locale, "O arhivă construită din materiale reale.", "An archive built from real media.")} description={pick(locale, "Imagini și cadre extrase exclusiv din proiectul ROBOTECH existent. Fără fotografie de stoc și fără portrete generate.", "Images and frames sourced exclusively from the existing ROBOTECH project. No stock photography and no generated portraits.")} /><section className="section shell"><GalleryGrid locale={locale} /></section></>;
}

export function ContactPage({ locale }: { locale: Locale }) {
  return <><PageHero locale={locale} index="08" meta="CHIȘINĂU · MOLDOVA" title={pick(locale, "Vorbește direct cu ROBOTECH.", "Talk directly to ROBOTECH.")} description={pick(locale, "Pentru parteneriate, instituții, școli, competiții și colaborări tehnice.", "For partnerships, institutions, schools, competitions, and technical collaboration.")} /><section className="section shell contact-grid"><div className="contact-primary"><span className="eyebrow">{locale === "ru" ? translateText("CONTACT PERSON") : "CONTACT PERSON"}</span><h2>Boris Colesov</h2><a href="tel:+37368689606">+373 68 689 606</a><div className="button-row"><a className="button button-primary" href="tel:+37368689606">{pick(locale, "Apelează", "Call now")}</a><Link className="button button-secondary" href={localPath(locale, "partners")}>{pick(locale, "Parteneriate", "Partnerships")}</Link></div></div><div className="contact-facts"><div><span>{pick(locale, "ECHIPĂ", "TEAM")}</span><strong>ROBOTECH</strong></div><div><span>{pick(locale, "LOCAȚIE", "LOCATION")}</span><strong>{locale === "ru" ? "Кишинёв, Молдова" : "Chișinău, Moldova"}</strong></div><div><span>FTC</span><strong>{locale === "ru" ? "Команда #25491" : "Team #25491"}</strong></div><div><span>WEB</span><strong>robotech.md</strong></div></div></section></>;
}
