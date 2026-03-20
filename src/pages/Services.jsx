import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import TechBadge from "../components/TechBadge"
import EmptyState from "../components/ui/EmptyState"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { profile, serviceCatalog } from "../data/portfolioContent"
import { apiFetch } from "../services/platformApi"
import { formatCurrency } from "../utils/formatters"

const serviceProcess = [
  { title: "Briefing", description: "Objetivo, escopo e prioridade." },
  { title: "Execucao", description: "Interface, logica e integracao." },
  { title: "Entrega", description: "Publicacao e ajuste final." },
]

function normalizeService(service) {
  return {
    id: service?._id || service?.slug || service?.title || `service-${Math.random().toString(36).slice(2, 10)}`,
    title: service?.title || "Servico",
    slug: service?.slug || "",
    shortDescription: service?.shortDescription || service?.description || "",
    fullDescription: service?.fullDescription || service?.description || "",
    basePrice: Number(service?.basePrice || 0),
    estimatedDeliveryDays: Number(service?.estimatedDeliveryDays || 0),
    technologies: Array.isArray(service?.technologies) ? service.technologies : Array.isArray(service?.stack) ? service.stack : [],
  }
}

function fallbackCatalog() {
  return serviceCatalog.map((service) =>
    normalizeService({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      basePrice: Number(service.basePrice || String(service.price || "").replace(/[^\d]/g, "")) || 0,
      estimatedDeliveryDays: Number(String(service.delivery || "").match(/\d+/)?.[0] || 0),
      technologies: service.stack || [],
    })
  )
}

function ServicePreviewCard({ service }) {
  return (
    <article className="surface nested-card compact-card service-preview-card">
      <div className="task-card-header">
        <div>
          <h3>{service.title}</h3>
          <p className="section-copy compact">{service.shortDescription || service.fullDescription}</p>
        </div>
        <span className="mini-pill">{service.basePrice ? formatCurrency(service.basePrice) : "Sob consulta"}</span>
      </div>
    </article>
  )
}

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadServices() {
      try {
        const response = await apiFetch("/api/services")
        if (!active) {
          return
        }

        const normalized = (response || []).map(normalizeService)
        setServices(normalized.length ? normalized : fallbackCatalog())
      } catch {
        if (active) {
          setServices(fallbackCatalog())
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadServices()

    return () => {
      active = false
    }
  }, [])

  const catalog = useMemo(() => (services.length ? services : fallbackCatalog()), [services])
  const featuredItems = useMemo(() => catalog.slice(0, 2), [catalog])

  return (
    <main className="page-shell portfolio-page portfolio-reference-page portfolio-editorial-page services-reference-page">
      <PageHero
        actions={
          <>
            <a className="button" href={`mailto:${profile.email}`}>
              <IconSymbol className="icon-sm" name="mail" />
              Proposta
            </a>
            <a className="button secondary" href={profile.whatsappUrl} rel="noreferrer" target="_blank">
              <IconSymbol className="icon-sm" name="whatsapp" />
              WhatsApp
            </a>
            <Link className="button ghost" to="/projetos">
              <IconSymbol className="icon-sm" name="dashboard" />
              Projetos
            </Link>
          </>
        }
        aside={
          <div className="portfolio-reference-aside">
            {featuredItems.map((service) => (
              <ServicePreviewCard key={`hero-${service.id}`} service={service} />
            ))}
          </div>
        }
        className="portfolio-hero premium-portfolio-hero portfolio-reference-hero portfolio-editorial-hero"
        copyFooter={
          <div className="portfolio-hero-support">
            <div className="portfolio-proof-strip">
              <span className="mini-pill emphasis">Briefing</span>
              <span className="mini-pill">Escopo</span>
              <span className="mini-pill">Entrega</span>
            </div>
          </div>
        }
        description="Landing pages, sistemas web e refatoracao full stack."
        eyebrow="Servicos"
        meta={
          <>
            <span className="mini-pill emphasis">{catalog.length} ofertas</span>
            <span className="mini-pill">Sob escopo</span>
          </>
        }
        title="Escopo claro e entrega profissional."
      />

      {loading ? (
        <section className="surface section-card">
          <p className="section-copy">Carregando catalogo...</p>
        </section>
      ) : (
        <section className="surface section-card">
          <SectionHeader eyebrow="Catalogo" meta={<span className="mini-pill">{catalog.length} servico(s)</span>} title="Ofertas" />

          {catalog.length === 0 ? (
            <EmptyState message="Nenhum servico disponivel agora." />
          ) : (
            <div className="reference-project-grid service-catalog-grid">
              {catalog.map((service) => (
                <article className="surface service-catalog-card" key={service.id}>
                  <div className="reference-project-body">
                    <div className="task-card-header">
                      <div>
                        <h3>{service.title}</h3>
                        <p className="section-copy compact">{service.shortDescription || service.fullDescription}</p>
                      </div>
                      <span className="mini-pill">{service.basePrice ? `A partir de ${formatCurrency(service.basePrice)}` : "Sob consulta"}</span>
                    </div>

                    <div className="reference-project-stack">
                      {service.estimatedDeliveryDays ? <span className="mini-pill">Prazo: {service.estimatedDeliveryDays} dia(s)</span> : null}
                      {service.technologies.slice(0, 4).map((item) => (
                        <TechBadge key={`${service.id}-${item}`} value={item} />
                      ))}
                    </div>

                    <div className="project-link-row">
                      <a className="button small" href={profile.whatsappUrl} rel="noreferrer" target="_blank">
                        <IconSymbol className="icon-sm" name="whatsapp" />
                        Conversar
                      </a>
                      <a className="button ghost small" href={`mailto:${profile.email}`}>
                        <IconSymbol className="icon-sm" name="mail" />
                        Proposta
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="surface section-card">
        <SectionHeader eyebrow="Processo" title="Como eu conduzo" />

        <div className="service-process-grid">
          {serviceProcess.map((item, index) => (
            <article className="surface nested-card compact-card service-process-card" key={item.title}>
              <span className="mini-pill emphasis">Etapa {index + 1}</span>
              <strong>{item.title}</strong>
              <p className="section-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface portfolio-action-band service-cta-band">
        <div className="portfolio-action-copy">
          <p className="eyebrow">Contato</p>
          <h2>Escopo, proposta e execucao.</h2>
        </div>

        <div className="hero-actions">
          <a className="button" href={`mailto:${profile.email}`}>
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
