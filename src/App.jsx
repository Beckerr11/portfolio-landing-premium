import { Suspense, lazy, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { profile } from "./data/portfolioContent"
import AppLayout from "./layouts/AppLayout"

const Portfolio = lazy(() => import("./pages/Portfolio"))
const Projects = lazy(() => import("./pages/Projects"))
const About = lazy(() => import("./pages/About"))
const Curriculo = lazy(() => import("./pages/Curriculo"))
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"))
const Services = lazy(() => import("./pages/Services"))
const NotFound = lazy(() => import("./pages/NotFound"))

function RouteLoadingFallback() {
  return (
    <main className="page-shell page-empty">
      <section className="surface empty-state-card">
        <p className="eyebrow">Carregando</p>
        <h1>Preparando a pagina</h1>
      </section>
    </main>
  )
}

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return (
    <main className="page-shell page-empty">
      <section className="surface empty-state-card">
        <p className="eyebrow">Redirecionando</p>
        <h1>Abrindo a demonstracao ao vivo</h1>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Portfolio />} />
          <Route element={<Projects />} path="/projetos" />
          <Route element={<About />} path="/sobre" />
          <Route element={<Curriculo />} path="/curriculo" />
          <Route element={<ProjectCaseStudy />} path="/projetos/:slug" />
          <Route element={<Services />} path="/servicos" />

          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/dashboard" />
          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/admin/dashboard" />
          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/admin/crm" />
          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/cliente" />
          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/login" />
          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/register" />
          <Route element={<ExternalRedirect to={profile.liveAppUrl} />} path="/registre-se" />
          <Route element={<Navigate replace to="/" />} path="/oauth/callback" />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </Suspense>
  )
}
