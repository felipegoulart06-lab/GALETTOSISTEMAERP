"use client";

import { useEffect } from "react";

let __dbgServerUrl = "http://127.0.0.1:7777/event";
let __dbgSessionId = "vercel-server-crash";
try {
  if (typeof require !== "undefined") {
    try {
      const envRaw = require("fs").readFileSync(".dbg/vercel-server-crash.env", "utf8") as string;
      envRaw.split(/\r?\n/).forEach((line) => {
        const [k, v] = line.split("=");
        if (!k || !v) return;
        if (k.trim() === "DEBUG_SERVER_URL") __dbgServerUrl = v.trim();
        if (k.trim() === "DEBUG_SESSION_ID") __dbgSessionId = v.trim();
      });
    } catch {}
  }
} catch {}
function __emitError(hyp: string, where: string, msg: string, extra?: Record<string, unknown>) {
  try {
    void fetch(__dbgServerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: __dbgSessionId,
        ts: Date.now(),
        hypothesis: hyp,
        where,
        message: msg,
        extra: extra ?? {}
      })
    }).catch(() => {});
  } catch {}
}

export default function GlobalErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    __emitError("Z", "app/global-error.tsx:GlobalErrorBoundary", "Erro GLOBAL capturado em Root Layout", {
      name: error?.name ?? null,
      message: error?.message ?? String(error),
      digest: (error as any)?.digest ?? null,
      stack: error?.stack ?? undefined
    });
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
