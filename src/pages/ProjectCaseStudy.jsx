import { Link, Navigate, useParams } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import TechBadge from "../components/TechBadge"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { curatedRepositories, deliveryPrinciples, profile, showcaseShots } from "../data/portfolioContent"

const repositoryByName = {
  crm: curatedRepositories.find((repository) => repository.name === "crm-comercial-fullstack")?.url || profile.githubUrl,
  auth: curatedRepositories.find((repository) => repository.name === "saas-auth-dashboard-demo")?.url || profile.githubUrl,
  landing: curatedRepositories.find((repository) => repository.name === "portfolio-landing-premium")?.url || profile.githubUrl,
}

const caseStudyMap = {
  "plataforma-auth-operacao": {
    eyebrow: "Case study",
    title: "Portfolio, autenticacao e operacao",
    summary: "Base full stack com landing, auth e workspace na mesma identidade.",
    outcome: "Da primeira visita ao workspace.",
    stack: ["React", "Node.js", "MongoDB", "JWT", "OAuth", "Vite"],
    proofs: [
      "Landing publica com CTA principal.",
      "Auth local e social.",
      "Dashboard, admin e area autenticada.",
    ],
    screens: [showcaseShots[0], showcaseShots[1]],
    primaryHref: profile.liveAppUrl,
    primaryLabel: "Produto ao vivo",
    secondaryHref: repositoryByName.auth,
    secondaryLabel: "GitHub",
    workspaceHref: "/dashboard",
  },
  "crm-ciclo-comercial": {
    eyebrow: "Case study",
    title: "CRM e ciclo comercial",
    summary: "Fluxo comercial com clientes, propostas, PDF e compartilhamento.",
    outcome: "Ferramenta real para proposta e fechamento.",
    stack: ["React", "Express", "MongoDB", "PDF", "WhatsApp", "REST API"],
    proofs: [
      "Clientes, produtos e servicos no mesmo painel.",
      "Proposta em PDF com historico.",
      "Compartilhamento por WhatsApp.",
    ],
    screens: [showcaseShots[2], showcaseShots[1]],
    primaryHref: repositoryByName.crm,
    primaryLabel: "GitHub",
    secondaryHref: profile.liveAppUrl,
    secondaryLabel: "Preview",
    workspaceHref: "/admin/crm",
  },
  "inbox-area-cliente": {
    eyebrow: "Case study",
    title: "Inbox e area do cliente",
    summary: "Mensagens, pedidos e acompanhamento no mesmo workspace.",
    outcome: "Pos-venda com cara de produto.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    proofs: [
      "Inbox com historico.",
      "Area do cliente com timeline e propostas.",
      "Fluxo consistente entre site e workspace.",
    ],
    screens: [showcaseShots[3], showcaseShots[0]],
    primaryHref: profile.liveAppUrl,
    primaryLabel: "Produto ao vivo",
    secondaryHref: repositoryByName.landing,
    secondaryLabel: "GitHub",
    workspaceHref: "/cliente",
  },
}

function ProofCard({ text }) {
  return (
    <article className="surface nested-card compact-card capability-preview-card">
      <span className="mini-pill emphasis">Prova</span>
      <p className="section-copy">{text}</p>
    </article>
  )
}

function ScreenCard({ shot }) {
  return (
    <article className="surface nested-card compact-card showcase-preview-card">
      <div className="showcase-card-media">
        <img alt={`Previa do modulo ${shot.title}`} loading="lazy" src={shot.src} />
      </div>
      <div className="showcase-card-copy">
        <small>{shot.tag}</small>
        <h3>{shot.title}</h3>
      </div>
    </article>
  )
}

function CaseStudySignalCard({ item }) {
  return (
    <article className="surface nested-card compact-card case-study-signal-card">
      <span className="mini-pill emphasis">{item.label}</span>
      <strong>{item.value}</strong>
    </article>
  )
}

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const caseStudy = caseStudyMap[slug]

  if (!caseStudy) {
    return <Navigate replace to="/" />
  }

  const caseStudySignals = [
    { label: "Stack", value: caseStudy.stack.slice(0, 3).join(" • ") },
    { label: "Prova", value: caseStudy.primaryLabel },
    { label: "Fluxo", value: caseStudy.workspaceHref === "/dashboard" ? "Publico + autenticado" : "Modulo real" },
  ]

  return (
    <main className="page-shell portfolio-page portfolio-reference-page portfolio-editorial-page case-study-reference-page">
      <PageHero
        actions={
          <>
            <a className="button" href={caseStudy.primaryHref} rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name={caseStudy.primaryLabel === "Repositorio" ? "github" : "dashboard"} />
              {caseStudy.primaryLabel}
            </a>
            <a className="button ghost" href={caseStudy.secondaryHref} rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name={caseStudy.secondaryLabel === "Repositorio" ? "github" : "dashboard"} />
              {caseStudy.secondaryLabel}
            </a>
            <Link className="button secondary" to="/projetos">
              <IconSymbol className="icon-sm" name="arrow" />
              Voltar
            </Link>
          </>
        }
        aside={
          <div className="portfolio-reference-aside">
            <article className="surface nested-card compact-card portfolio-profile-card">
              <p className="eyebrow">Outcome</p>
              <h3>{caseStudy.outcome}</h3>
              <div className="reference-project-stack">
                {caseStudy.stack.map((item) => (
                  <TechBadge key={`${caseStudy.title}-${item}`} value={item} />
                ))}
              </div>
            </article>
          </div>
        }
        className="portfolio-hero portfolio-reference-hero portfolio-editorial-hero"
        copyFooter={
          <div className="portfolio-hero-support">
            <div className="portfolio-proof-strip">
              <span className="mini-pill emphasis">Case real</span>
              <span className="mini-pill">Produto publicado</span>
              <span className="mini-pill">Stack comprovada</span>
            </div>
            <div className="portfolio-quick-link-row">
              <Link to={caseStudy.workspaceHref}>
                <IconSymbol className="icon-sm" name="dashboard" />
                Abrir workspace
              </Link>
              <a href={profile.githubUrl} rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="github" />
                GitHub
              </a>
              <a href={`mailto:${profile.email}`}>
                <IconSymbol className="icon-sm" name="mail" />
                E-mail
              </a>
            </div>
            <div className="case-study-signal-grid">
              {caseStudySignals.map((item) => (
                <CaseStudySignalCard item={item} key={item.label} />
              ))}
            </div>
          </div>
        }
        description={caseStudy.summary}
        eyebrow={caseStudy.eyebrow}
        meta={
          <>
            <span className="mini-pill emphasis">{profile.shortName}</span>
            <span className="mini-pill">{profile.location}</span>
            <span className="mini-pill">Produto real</span>
          </>
        }
        title={caseStudy.title}
      />

      <section className="content-grid two-columns">
        <article className="surface section-card">
          <SectionHeader eyebrow="Provas" title="O que este case entrega" />
          <div className="portfolio-mini-grid">
            {caseStudy.proofs.map((item) => (
              <ProofCard key={item} text={item} />
            ))}
          </div>
        </article>

        <article className="surface section-card">
          <SectionHeader eyebrow="Stack" title="Tecnologias" />
          <div className="reference-project-stack">
            {caseStudy.stack.map((item) => (
              <TechBadge key={`${caseStudy.title}-stack-${item}`} value={item} />
            ))}
          </div>
          <div className="portfolio-mini-grid">
            {deliveryPrinciples.slice(0, 3).map((item) => (
              <article className="surface nested-card compact-card capability-preview-card" key={item.title}>
                <strong>{item.title}</strong>
                <p className="section-copy">{item.description}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="surface section-card">
        <SectionHeader eyebrow="Telas" title="Leitura visual" />
        <div className="reference-showcase-grid">
          {caseStudy.screens.map((shot) => (
            <ScreenCard key={`${caseStudy.title}-${shot.title}`} shot={shot} />
          ))}
        </div>
      </section>

      <section className="surface section-card">
        <SectionHeader eyebrow="Links" title="Acessos rapidos" />
        <div className="portfolio-link-grid compact">
          <a className="surface nested-card compact-card portfolio-link-card" href={caseStudy.primaryHref} rel="noreferrer" target="_blank">
            <div className="link-card-head">
              <IconSymbol className="icon-sm" name={caseStudy.primaryLabel === "Repositorio" ? "github" : "dashboard"} />
              <strong>{caseStudy.primaryLabel}</strong>
            </div>
            <p>Abrir prova principal.</p>
          </a>
          <a className="surface nested-card compact-card portfolio-link-card" href={caseStudy.secondaryHref} rel="noreferrer" target="_blank">
            <div className="link-card-head">
              <IconSymbol className="icon-sm" name={caseStudy.secondaryLabel === "Repositorio" ? "github" : "dashboard"} />
              <strong>{caseStudy.secondaryLabel}</strong>
            </div>
            <p>Abrir apoio tecnico.</p>
          </a>
          <Link className="surface nested-card compact-card portfolio-link-card" to={caseStudy.workspaceHref}>
            <div className="link-card-head">
              <IconSymbol className="icon-sm" name="dashboard" />
              <strong>Workspace</strong>
            </div>
            <p>Abrir modulo.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
