"use client";

import { useEffect } from "react";


export default function GlobalErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body style={{ minHeight: "100dvh", background: "#0b1020", color: "#e5e7eb", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, -apple-system, sans-serif", margin: 0 }}>
        <div style={{ width: "min(640px, 100%)", borderRadius: 16, border: "1px solid #1f2937", padding: 32 }}>
          <div style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid #7f1d1d", background: "#450a0a", color: "#fecaca", fontSize: 12, fontWeight: 600, display: "inline-block" }}>
            ERRO CRÍTICO (ROOT)
          </div>
          <h1 style={{ fontSize: 26, marginTop: 16, color: "#fff" }}>Falha ao inicializar a plataforma</h1>
          <p style={{ color: "#94a3b8" }}>Ocorreu um erro no carregamento inicial. Detalhes abaixo:</p>
          <pre style={{ marginTop: 16, padding: 16, borderRadius: 12, border: "1px solid #1f2937", background: "#020617", overflow: "auto", maxHeight: 300, fontSize: 12, color: "#93c5fd", whiteSpace: "pre-wrap" }}>
{`Mensagem: ${error?.message ?? String(error)}
Digest:  ${(error as any)?.digest ?? "—"}
Stack:   ${error?.stack ?? "— indisponível —"}`}
          </pre>
          <button
            type="button"
            onClick={() => { try { reset(); } catch {} try { window.location.reload(); } catch {} }}
            style={{ marginTop: 20, cursor: "pointer", border: "none", padding: "12px 18px", borderRadius: 10, background: "#2563eb", color: "#fff", fontWeight: 600 }}
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  );
}
