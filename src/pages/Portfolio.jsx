import { Link } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import TechBadge from "../components/TechBadge"
import { HeroPlatformCard, ProjectCard } from "../components/portfolio/PublicPortfolioCards"
import { featuredProjects, landingTrustMarkers, serviceCatalog } from "../components/portfolio/publicPortfolioData"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { profile } from "../data/portfolioContent"

const homeProofs = landingTrustMarkers.slice(0, 3)
const homeProjects = featuredProjects.slice(0, 2)
const homeServices = serviceCatalog.slice(0, 2)

export default function Portfolio() {
  return (
    <main className="page-shell portfolio-page portfolio-reference-page portfolio-editorial-page">
      <PageHero
        actions={
          <>
            <a className="button" href={`mailto:${profile.email}`}>
              <IconSymbol className="icon-sm" name="mail" />
              Pedir proposta
            </a>
            <Link className="button secondary" to="/servicos">
              <IconSymbol className="icon-sm" name="services" />
              Ver servicos
            </Link>
          </>
        }
        aside={<HeroPlatformCard />}
        className="portfolio-hero premium-portfolio-hero portfolio-reference-hero portfolio-editorial-hero"
        copyFooter={
          <div className="portfolio-hero-support">
            <div className="portfolio-proof-strip">
              <span className="mini-pill emphasis">Produto publicado</span>
              <span className="mini-pill">React + Node</span>
              <span className="mini-pill">Fluxo real</span>
            </div>

            <div className="portfolio-quick-link-row">
              <a href={profile.liveAppUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="dashboard" />
                Ver demo
              </a>
              <Link to="/projetos">
                <IconSymbol className="icon-sm" name="services" />
                Projetos
              </Link>
            </div>
          </div>
        }
        description="Landing pages e sistemas com foco comercial."
        eyebrow="Douglas Silva | desenvolvimento full stack"
        meta={
          <>
            <span className="mini-pill emphasis">{profile.shortName}</span>
            <span className="mini-pill">{profile.location}</span>
          </>
        }
        title={
          <>
            Sites e sistemas com aparencia profissional.
            <span className="portfolio-hero-title-accent">Feitos para vender melhor.</span>
          </>
        }
      />

      <section className="surface section-card portfolio-trust-band">
        <SectionHeader eyebrow="Prova" title="Sinais do produto" />

        <div className="portfolio-trust-grid">
          {homeProofs.map((item) => (
            <article className="surface nested-card compact-card portfolio-trust-card" key={item.title}>
              <strong>{item.title}</strong>
              <p className="section-copy compact portfolio-trust-metric">{item.metric}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface section-card">
        <SectionHeader
          actions={
            <Link className="button ghost small" to="/servicos">
              Catalogo completo
            </Link>
          }
          eyebrow="Servicos"
          title="Servicos principais"
        />

        <div className="card-grid portfolio-route-grid">
          {homeServices.map((service) => (
            <article className="surface nested-card compact-card portfolio-offer-card" key={service.slug}>
              <div className="task-card-header">
                <div>
                  <h3>{service.title}</h3>
                  <p className="section-copy compact">{service.shortDescription}</p>
                </div>
                <span className="mini-pill emphasis">{service.price}</span>
              </div>

              <div className="pill-row stack-chip-row">
                {service.stack.slice(0, 3).map((tech) => (
                  <TechBadge key={`${service.slug}-${tech}`} value={tech} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface section-card">
        <SectionHeader
          actions={
            <Link className="button ghost small" to="/projetos">
              Ver projetos
            </Link>
          }
          eyebrow="Projetos"
          title="Projetos em destaque"
        />

        <div className="founder-project-grid">
          {homeProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="surface portfolio-action-band">
        <div className="portfolio-action-copy">
          <p className="eyebrow">Contato</p>
          <h2>Projetos para vender melhor e operar com clareza.</h2>
        </div>

        <div className="portfolio-link-grid compact">
          <a className="surface nested-card compact-card portfolio-link-card" href={`mailto:${profile.email}`}>
            <div className="link-card-head">
              <IconSymbol className="icon-sm" name="mail" />
              <strong>E-mail</strong>
            </div>
            <p>{profile.email}</p>
          </a>
          <a className="surface nested-card compact-card portfolio-link-card" href={profile.whatsappUrl} rel="noreferrer" target="_blank">
            <div className="link-card-head">
              <IconSymbol className="icon-sm" name="whatsapp" />
              <strong>WhatsApp</strong>
            </div>
            <p>Briefing, proposta e prazo.</p>
          </a>
        </div>
      </section>
    </main>
  )
}
