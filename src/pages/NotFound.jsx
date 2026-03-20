import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="page-shell page-empty">
      <section className="surface empty-state-card">
        <p className="eyebrow">404</p>
        <h1>Página não encontrada</h1>
        <p className="section-copy">O endereço informado não existe mais ou foi movido para outra área do projeto.</p>
        <div className="inline-actions">
          <Link className="button" to="/">
            Voltar ao portfólio
          </Link>
          <Link className="button secondary" to="/dashboard">
            Ir para o dashboard
          </Link>
        </div>
      </section>
    </main>
  )
}
