import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-showcase">
        <div className="login-brand">
          <span>FG EXACTA</span>
        </div>

        <div className="login-copy">
          <span>Plataforma de oportunidades</span>
          <h2>
            Transforme
            <br />
            <strong>possibilidades</strong>
            <br />
            em movimento.
          </h2>
          <p>Aprenda, venda, indique e cresca com uma comunidade que joga junto.</p>
        </div>

        <div className="login-floating-card">
          <strong>+ R$ 2.840</strong>
          <span>este mes</span>
        </div>
      </section>

      <section className="login-panel">
        <LoginForm />
        <Link className="login-bypass-link" href="/">
          Entrar direto no painel
        </Link>
      </section>
    </main>
  );
}
