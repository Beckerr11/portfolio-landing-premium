import { Link } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import { HeroPlatformCard, ModuleCard, ProjectCard } from "../components/portfolio/PublicPortfolioCards"
import { featuredProjects, productModules } from "../components/portfolio/publicPortfolioData"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { profile } from "../data/portfolioContent"

const featuredModules = productModules.slice(0, 3)

export default function Projects() {
  return (
    <main className="page-shell portfolio-page portfolio-reference-page portfolio-editorial-page projects-reference-page">
      <PageHero
        actions={
          <>
            <a className="button" href={profile.liveAppUrl} rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name="dashboard" />
              Ver demo
            </a>
            <a className="button secondary" href={`mailto:${profile.email}`}>
              <IconSymbol className="icon-sm" name="mail" />
              Pedir proposta
            </a>
          </>
        }
        aside={<HeroPlatformCard />}
        className="portfolio-hero premium-portfolio-hero portfolio-reference-hero portfolio-editorial-hero"
        copyFooter={
          <div className="portfolio-hero-support">
            <div className="portfolio-quick-link-row">
              <Link to="/servicos">
                <IconSymbol className="icon-sm" name="services" />
                Servicos
              </Link>
              <a href={profile.githubUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="github" />
                GitHub
              </a>
              <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="linkedin" />
                LinkedIn
              </a>
            </div>
          </div>
        }
        description="Projetos, modulos e execucao publicada."
        eyebrow="Projetos"
        meta={
          <>
            <span className="mini-pill emphasis">Produto publicado</span>
            <span className="mini-pill">Dashboard + CRM + Inbox</span>
          </>
        }
        title="Projetos que mostram execucao e produto."
      />

      <section className="surface section-card">
        <SectionHeader eyebrow="Cases" title="Projetos em destaque" />

        <div className="founder-project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="surface section-card">
        <SectionHeader eyebrow="Modulos" title="Areas do produto" />

        <div className="founder-module-grid">
          {featuredModules.map((module) => (
            <ModuleCard key={module.title} module={module} />
          ))}
        </div>
      </section>

      <section className="surface portfolio-action-band">
        <div className="portfolio-action-copy">
          <p className="eyebrow">Contato</p>
          <h2>Se quiser esse nivel no seu produto, vamos conversar.</h2>
        </div>

        <div className="hero-actions">
          <Link className="button" to="/servicos">
            <IconSymbol className="icon-sm" name="services" />
            Servicos
          </Link>
          <a className="button secondary" href={`mailto:${profile.email}`}>
            <IconSymbol className="icon-sm" name="mail" />
            Proposta
          </a>
          <a className="button ghost" href={profile.whatsappUrl} rel="noreferrer" target="_blank">
            <IconSymbol className="icon-sm" name="whatsapp" />
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
