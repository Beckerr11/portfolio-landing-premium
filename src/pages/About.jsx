import { Link } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import { AboutCard, HeroIdentityCard, RepositoryCard, SocialProofCard, StackSummaryCard } from "../components/portfolio/PublicPortfolioCards"
import { aboutHighlights, curatedRepositories, socialProofCards, stackGroups } from "../components/portfolio/publicPortfolioData"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { profile } from "../data/portfolioContent"

const summaryHighlights = aboutHighlights.slice(0, 2)
const summaryProofs = socialProofCards.slice(0, 2)
const summaryStack = stackGroups.slice(0, 2)
const summaryRepositories = curatedRepositories.slice(0, 2)

export default function About() {
  return (
    <main className="page-shell portfolio-page portfolio-reference-page portfolio-editorial-page about-reference-page">
      <PageHero
        actions={
          <>
            <Link className="button" to="/projetos">
              <IconSymbol className="icon-sm" name="dashboard" />
              Projetos
            </Link>
            <a className="button secondary" href={`mailto:${profile.email}`}>
              <IconSymbol className="icon-sm" name="mail" />
              Proposta
            </a>
          </>
        }
        aside={<HeroIdentityCard />}
        className="portfolio-hero premium-portfolio-hero portfolio-reference-hero portfolio-editorial-hero"
        copyFooter={
          <div className="portfolio-hero-support">
            <div className="portfolio-quick-link-row">
              <a href={profile.cvPath} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="resume" />
                Curriculo PDF
              </a>
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
        description="Base tecnica, codigo publico e produto publicado."
        eyebrow="Sobre"
        meta={
          <>
            <span className="mini-pill emphasis">React + Node</span>
            <span className="mini-pill">Codigo publico</span>
          </>
        }
        title="Base tecnica e credibilidade."
      />

      <section className="content-grid two-columns">
        <article className="surface section-card">
          <SectionHeader eyebrow="Direcao" title="Como eu entrego" />

          <div className="portfolio-mini-grid">
            {summaryHighlights.map((item) => (
              <AboutCard item={item} key={item.title} />
            ))}
          </div>

          <div className="stack-group-grid">
            {summaryStack.map((group) => (
              <StackSummaryCard group={group} key={group.title} />
            ))}
          </div>
        </article>

        <article className="surface section-card">
          <SectionHeader eyebrow="Prova" title="Base publica" />

          <div className="social-proof-grid">
            {summaryProofs.map((item) => (
              <SocialProofCard item={item} key={item.title} />
            ))}
          </div>

          <div className="reference-repository-grid founder-link-grid">
            {summaryRepositories.map((repository) => (
              <RepositoryCard key={repository.name} repository={repository} />
            ))}
          </div>
        </article>
      </section>

      <section className="surface portfolio-action-band">
        <div className="portfolio-action-copy">
          <p className="eyebrow">Contato</p>
          <h2>Disponivel para freelas, produto e evolucao de software.</h2>
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
        </div>
      </section>
    </main>
  )
}
