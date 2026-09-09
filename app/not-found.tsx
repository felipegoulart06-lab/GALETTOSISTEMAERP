import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span>Página não encontrada</span>
        <h1>Essa rota ainda não existe no painel.</h1>
        <p>Volte para a Home para continuar navegando pela plataforma.</p>
        <Link href="/">Ir para a Home</Link>
      </div>
    </main>
  );
}
