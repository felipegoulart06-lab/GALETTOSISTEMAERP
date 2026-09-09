"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AccessMode = "usuario" | "administrador";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AccessMode>("usuario");
  const [email, setEmail] = useState("marina@fgexacta.com");
  const [password, setPassword] = useState("123456789");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mode })
    }).then(() => {
      router.push(mode === "administrador" ? "/admin" : "/");
      router.refresh();
    });
  };

  return (
    <form className="login-form-card" onSubmit={handleSubmit}>
      <span className="login-eyebrow">Bem-vinda de volta</span>
      <h1>
        Seu proximo
        <br />
        <span>nivel comeca aqui.</span>
      </h1>
      <p>Entre no seu espaco de crescimento.</p>

      <label className="login-field">
        <span>E-mail</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
      </label>

      <label className="login-field">
        <span>Senha</span>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
      </label>

      <div className="login-mode-switch" role="tablist" aria-label="Tipo de acesso">
        <button
          type="button"
          className={mode === "usuario" ? "is-active" : ""}
          onClick={() => setMode("usuario")}
        >
          Usuario
        </button>
        <button
          type="button"
          className={mode === "administrador" ? "is-active" : ""}
          onClick={() => setMode("administrador")}
        >
          Administrador
        </button>
      </div>

      <button type="submit" className="login-submit">
        Entrar na plataforma
      </button>

      <small>Acesso demonstrativo: por enquanto tudo liberado com dados ficticios.</small>
    </form>
  );
}
