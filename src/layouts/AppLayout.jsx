import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import { profile } from "../data/portfolioContent"

const publicItems = [
  { to: "/", label: "Inicio" },
  { to: "/servicos", label: "Servicos" },
  { to: "/projetos", label: "Projetos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/curriculo", label: "Curriculo" },
]

function buildNavLinkClass(baseClass) {
  return ({ isActive }) => `${baseClass}${isActive ? " active" : ""}`
}

export default function AppLayout() {
  const [isPublicMenuOpen, setIsPublicMenuOpen] = useState(false)

  function renderPublicNavigation(variant = "desktop") {
    const navClassName = variant === "desktop" ? "nav-pill" : "nav-pill mobile"

    return publicItems.map((item) => (
      <NavLink
        className={buildNavLinkClass(navClassName)}
        key={item.to}
        onClick={() => setIsPublicMenuOpen(false)}
        to={item.to}
      >
        {item.label}
      </NavLink>
    ))
  }

  function renderPublicActions(variant = "desktop") {
    const linkClassName = variant === "desktop" ? "public-utility-link" : "button ghost small"

    return (
      <>
        <a className={linkClassName} href={profile.githubUrl} rel="noreferrer" target="_blank">
          <IconSymbol className="icon-sm" name="github" />
          GitHub
        </a>
        <a className="button secondary small" href={profile.liveAppUrl} rel="noreferrer" target="_blank">
          <IconSymbol className="icon-sm" name="dashboard" />
          Demo ao vivo
        </a>
        <a className="button small" href={profile.whatsappUrl} rel="noreferrer" target="_blank">
          <IconSymbol className="icon-sm" name="whatsapp" />
          Contato
        </a>
      </>
    )
  }

  return (
    <div className="app-layout">
      <header className={`surface public-topbar public-topbar-minimal editorial-public-topbar${isPublicMenuOpen ? " menu-open" : ""}`}>
        <Link className="brand-link public-brand-link" to="/">
          <span className="brand-mark">DS</span>
          <span>
            <strong>{profile.shortName}</strong>
            <small>Landing premium</small>
          </span>
        </Link>

        <nav className="topbar-nav public-nav-desktop" aria-label="Navegacao publica">
          {renderPublicNavigation("desktop")}
        </nav>

        <div className="topbar-actions public-topbar-actions">
          <div className="public-desktop-actions">{renderPublicActions("desktop")}</div>
          <button
            aria-controls="public-mobile-panel"
            aria-expanded={isPublicMenuOpen}
            className="nav-icon-button public-menu-toggle"
            onClick={() => setIsPublicMenuOpen((current) => !current)}
            type="button"
          >
            <IconSymbol className="icon-md" name={isPublicMenuOpen ? "close" : "menu"} />
            <span className="sr-only">{isPublicMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>

        <div className={`public-mobile-panel${isPublicMenuOpen ? " open" : ""}`} id="public-mobile-panel">
          <nav className="public-mobile-nav" aria-label="Navegacao publica mobile">
            {renderPublicNavigation("mobile")}
          </nav>
          <div className="public-mobile-actions">{renderPublicActions("mobile")}</div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
