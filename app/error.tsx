"use client";

import Link from "next/link";
import { useEffect } from "react";


export default function AppErrorBoundary({
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
    <div style={{ minHeight: "100dvh", background: "#0b1020", color: "#e5e7eb", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, -apple-system, sans-serif", margin: 0 }}>
        <div style={{ width: "min(680px, 100%)", borderRadius: 16, border: "1px solid #1f2937", background: "linear-gradient(180deg,#0f172a 0%, #0b1220 100%)", padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, border: "1px solid #7f1d1d", background: "#450a0a", color: "#fecaca", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            <span aria-hidden>●</span> Falha ao renderizar
          </div>
          <h1 style={{ margin: "16px 0 8px", fontSize: 28, color: "#ffffff" }}>Ops, algo deu errado.</h1>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
            Uma exceção ocorreu ao montar a página. Os detalhes abaixo ajudam a diagnosticar a causa.
          </p>

          <div style={{ marginTop: 24, padding: 16, borderRadius: 12, border: "1px solid #1f2937", background: "#020617", color: "#e2e8f0", fontSize: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "10px 16px", alignItems: "start" }}>
              <div style={{ color: "#64748b" }}>Mensagem</div>
              <div style={{ wordBreak: "break-word", color: "#fca5a5", fontWeight: 600 }}>{error?.message ?? String(error)}</div>
              <div style={{ color: "#64748b" }}>Digest</div>
              <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "#fde68a", wordBreak: "break-all" }}>{(error as any)?.digest ?? "—"}</div>
              <div style={{ color: "#64748b" }}>Nome</div>
              <div style={{ color: "#cbd5e1" }}>{error?.name ?? "Error"}</div>
              <div style={{ color: "#64748b", alignSelf: "start" }}>Stack</div>
              <pre style={{ margin: 0, maxHeight: 260, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: "#93c5fd", lineHeight: 1.5 }}>{error?.stack ?? "— stack indisponível —"}</pre>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                try { reset(); } catch {}
                try { window.location.reload(); } catch {}
              }}
              style={{ cursor: "pointer", border: "none", padding: "12px 16px", borderRadius: 10, background: "#2563eb", color: "#ffffff", fontWeight: 600, fontSize: 14 }}
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #334155", color: "#e2e8f0", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
            >
              Voltar para home
            </Link>
          </div>
        </div>
    </div>
  );
}
