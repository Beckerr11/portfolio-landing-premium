import IconSymbol from "../components/IconSymbol"
import TechBadge from "../components/TechBadge"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import resumeAtsData from "../data/resumeAtsData.json"

function ResumeAtsEntry({ title, subtitle, period, location, bullets, link, linkLabel = "Abrir link" }) {
  return (
    <article className="surface nested-card compact-card resume-ats-entry">
      <div className="task-card-header">
        <div>
          <h3>{title}</h3>
          <p className="section-copy compact">{subtitle}</p>
        </div>
        {period ? <span className="mini-pill">{period}</span> : null}
      </div>

      {location ? <p className="section-copy compact resume-ats-meta">{location}</p> : null}

      <ul className="resume-ats-bullets">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {link ? (
        <a className="inline-link project-inline-link" href={link} rel="noreferrer" target="_blank">
          {linkLabel}
        </a>
      ) : null}
    </article>
  )
}

function ResumeSkillGroup({ group }) {
  return (
    <article className="surface nested-card compact-card resume-skill-group-card">
      <small>{group.group}</small>
      <h3>{group.group}</h3>
      <div className="pill-row stack-chip-row">
        {group.items.map((item) => (
          <TechBadge key={`${group.group}-${item}`} value={item} />
        ))}
      </div>
    </article>
  )
}

function ResumeContactCard({ title, value, href, icon }) {
  return (
    <a className="surface nested-card compact-card portfolio-link-card" href={href} rel="noreferrer" target="_blank">
      <div className="link-card-head">
        <IconSymbol className="icon-sm" name={icon} />
        <strong>{title}</strong>
      </div>
      <p>{value}</p>
    </a>
  )
}

export default function Curriculo() {
  return (
    <main className="page-shell portfolio-page portfolio-reference-page portfolio-editorial-page resume-ats-page">
      <PageHero
        actions={
          <>
            <a className="button" href="/Douglas_Aparecido_Silva_CV.pdf" rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name="resume" />
              Baixar curriculo ATS
            </a>
            <a className="button secondary" href={resumeAtsData.linkedinUrl} rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name="linkedin" />
              LinkedIn
            </a>
            <a className="button ghost" href={resumeAtsData.githubUrl} rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name="github" />
              GitHub
            </a>
          </>
        }
        className="portfolio-hero premium-portfolio-hero portfolio-reference-hero portfolio-editorial-hero"
        copyFooter={
          <div className="portfolio-hero-support">
            <div className="portfolio-quick-link-row">
              <a href={`mailto:${resumeAtsData.email}`}>
                <IconSymbol className="icon-sm" name="mail" />
                {resumeAtsData.email}
              </a>
              <a href={resumeAtsData.linkedinUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="linkedin" />
                LinkedIn
              </a>
              <a href={resumeAtsData.githubUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="github" />
                GitHub
              </a>
              <a href={resumeAtsData.instagramUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="instagram" />
                Instagram
              </a>
              <a href={resumeAtsData.whatsappUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="whatsapp" />
                WhatsApp
              </a>
            </div>

            <div className="resume-keyword-grid">
              {resumeAtsData.keywords.map((item) => (
                <TechBadge key={item} value={item} />
              ))}
            </div>
          </div>
        }
        description={resumeAtsData.summary}
        eyebrow="Curriculo ATS"
        meta={
          <>
            <span className="mini-pill emphasis">{resumeAtsData.title}</span>
            <span className="mini-pill">{resumeAtsData.location}</span>
            <span className="mini-pill">{resumeAtsData.phone}</span>
          </>
        }
        title={resumeAtsData.preferredName}
      />

      <section className="surface section-card">
        <SectionHeader eyebrow="Resumo" title={resumeAtsData.headline} />
        <p className="section-copy">{resumeAtsData.summary}</p>
      </section>

      <section className="surface section-card">
        <SectionHeader eyebrow="Skills" title="Habilidades principais" />

        <div className="portfolio-skill-grid">
          {resumeAtsData.skills.map((group) => (
            <ResumeSkillGroup group={group} key={group.group} />
          ))}
        </div>
      </section>

      <section className="surface section-card">
        <SectionHeader eyebrow="Experiencia" title="Experiencia pratica" />

        <div className="resume-timeline resume-ats-stack">
          {resumeAtsData.experience.map((item) => (
            <ResumeAtsEntry
              bullets={item.bullets}
              key={`${item.title}-${item.period}`}
              location={item.location}
              period={item.period}
              subtitle={item.company}
              title={item.title}
            />
          ))}
        </div>
      </section>

      <section className="content-grid two-columns">
        <article className="surface section-card">
          <SectionHeader eyebrow="Projetos" title="Projetos relevantes" />

          <div className="resume-timeline resume-ats-stack">
            {resumeAtsData.projects.map((project) => (
              <ResumeAtsEntry
                bullets={project.bullets}
                key={project.name}
                link={project.url}
                linkLabel="Abrir projeto"
                subtitle={project.stack}
                title={project.name}
              />
            ))}
          </div>
        </article>

        <article className="surface section-card">
          <SectionHeader eyebrow="Formacao" title="Formacao e contato" />

          <div className="resume-timeline resume-ats-stack">
            {resumeAtsData.education.map((item) => (
              <ResumeAtsEntry
                bullets={[item.details]}
                key={`${item.title}-${item.period}`}
                period={item.period}
                subtitle={item.institution}
                title={item.title}
              />
            ))}
          </div>

          <div className="portfolio-link-grid compact resume-contact-grid">
            <ResumeContactCard href={`mailto:${resumeAtsData.email}`} icon="mail" title="E-mail" value={resumeAtsData.email} />
            <ResumeContactCard href={resumeAtsData.linkedinUrl} icon="linkedin" title="LinkedIn" value={resumeAtsData.linkedinUrl.replace("https://", "")} />
            <ResumeContactCard href={resumeAtsData.githubUrl} icon="github" title="GitHub" value={resumeAtsData.githubUrl.replace("https://", "")} />
            <ResumeContactCard href={resumeAtsData.instagramUrl} icon="instagram" title="Instagram" value={resumeAtsData.instagramUrl.replace("https://", "")} />
            <ResumeContactCard href={resumeAtsData.whatsappUrl} icon="whatsapp" title="WhatsApp" value={resumeAtsData.whatsappUrl.replace("https://wa.me/", "+")} />
            <ResumeContactCard href={resumeAtsData.portfolioUrl} icon="services" title="Portfolio" value={resumeAtsData.portfolioUrl.replace("https://", "")} />
          </div>
        </article>
      </section>
    </main>
  )
}
