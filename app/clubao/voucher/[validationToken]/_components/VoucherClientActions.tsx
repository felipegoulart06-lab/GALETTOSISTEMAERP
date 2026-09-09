"use client";

import { useState } from "react";

export default function VoucherClientActions({
  token,
  canDownload,
  alreadyDownloaded
}: {
  token: string;
  canDownload: boolean;
  alreadyDownloaded: boolean;
}) {
  const [downloading, setDownloading] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (downloading || !canDownload) {
      return;
    }

    setDownloading(true);
    setError(null);

    try {
      const response = await fetch(`/api/clubao/download?token=${encodeURIComponent(token)}`);

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (response.status === 403 && !alreadyDownloaded) {
          setError(payload?.error ?? "Download já realizado anteriormente.");
        } else {
          setError(
            payload?.error ??
              "Não foi possível baixar o cupom agora. Tente novamente em instantes."
          );
        }
        setDownloading(false);
        return;
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition") ?? "";
      const match = contentDisposition.match(/filename="?([^";]+)"?/);
      const filename = match?.[1] ?? `voucher-${token}.html`;

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      setClosing(true);
      window.setTimeout(() => {
        window.close();
      }, 1500);
    } catch (unknownError) {
      console.error("[voucher] Falha ao baixar cupom:", unknownError);
      setError("Não foi possível baixar o cupom. Tente novamente.");
      setDownloading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap"
      }}
    >
      <button
        type="button"
        onClick={handleDownload}
        disabled={!canDownload || downloading || closing}
        style={{
          padding: "14px 22px",
          borderRadius: 16,
          border: "none",
          cursor: canDownload && !downloading && !closing ? "pointer" : "not-allowed",
          background:
            canDownload && !downloading && !closing
              ? "linear-gradient(180deg, #16a34a 0%, #15803d 100%)"
              : "#cbd5e1",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          boxShadow:
            canDownload && !downloading && !closing
              ? "0 10px 24px rgba(22, 163, 74, 0.22)"
              : "none",
          minWidth: 220
        }}
      >
        {closing
          ? "Fechando janela..."
          : downloading
          ? "Preparando download..."
          : alreadyDownloaded
          ? "Download já realizado"
          : "Baixar cupom"}
      </button>

      {error ? (
        <span
          style={{
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(239, 68, 68, 0.10)",
            border: "1px solid rgba(239, 68, 68, 0.26)",
            color: "#b91c1c",
            fontSize: 13,
            maxWidth: 360,
            lineHeight: 1.5
          }}
        >
          {error}
        </span>
      ) : null}

      <a
        href="/clubao"
        style={{
          padding: "12px 18px",
          borderRadius: 14,
          background: "#ffffff",
          border: "1px solid #dce6f5",
          color: "#0f172a",
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 600
        }}
      >
        Voltar ao Clubão
      </a>
    </div>
  );
}
