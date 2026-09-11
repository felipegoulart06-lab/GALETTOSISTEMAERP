import "server-only";

import Link from "next/link";
import { getPlatformDb } from "@/lib/platform-store";
import { formatPtDateTime } from "@/lib/safe-date";
import VoucherClientActions from "./_components/VoucherClientActions";

export const dynamic = "force-dynamic";

function buildQrCodeUrl(data: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=${encodeURIComponent(
    data
  )}`;
}

function formatDateTime(iso: string) {
  return formatPtDateTime(iso);
}

export default async function ClubVoucherPage({
  params
}: {
  params: Promise<{ validationToken: string }>;
}) {
  const { validationToken } = await params;
  const db = await getPlatformDb();

  const redemption = db.couponRedemptions.find(
    (item) => item.validationToken === validationToken
  );

  if (!redemption) {
    return (
      <main style={{ minHeight: "100vh", background: "#eef4fb" }}>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "80px 24px",
            display: "grid",
            gap: 16,
            fontFamily: "Inter, Arial, sans-serif",
            color: "#0f172a"
          }}
        >
          <h1 style={{ fontSize: 28, margin: 0 }}>Cupom não encontrado</h1>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            O voucher informado não existe ou foi removido. Verifique o link e
            tente novamente.
          </p>
          <Link
            href="/clubao"
            style={{
              justifySelf: "start",
              padding: "12px 20px",
              borderRadius: 14,
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            Voltar para o Clubão
          </Link>
        </div>
      </main>
    );
  }

  const offer = db.clubOffers.find((item) => item.id === redemption.offerId);
  const alreadyDownloaded = redemption.downloadCount >= 1;
  const qrUrl = buildQrCodeUrl(redemption.qrPayload);

  const statusTone =
    redemption.status === "ATIVO"
      ? { bg: "rgba(22, 163, 74, 0.12)", color: "#15803d" }
      : redemption.status === "EXPIRADO"
      ? { bg: "rgba(239, 68, 68, 0.12)", color: "#b91c1c" }
      : { bg: "rgba(100, 116, 139, 0.12)", color: "#334155" };

  return (
    <main style={{ minHeight: "100vh", background: "#eef4fb" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 24px 56px",
          display: "grid",
          gap: 20,
          fontFamily: "Inter, Arial, sans-serif",
          color: "#0f172a"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <small
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontSize: 11,
                opacity: 0.65
              }}
            >
              FG EXACTA · Clubão Premium
            </small>
            <h1 style={{ margin: 0, fontSize: 28 }}>Voucher do benefício</h1>
            <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
              Página de confirmação do cupom individual. Após o download, este
              arquivo não poderá ser gerado novamente.
            </p>
          </div>

          <VoucherClientActions
            token={validationToken}
            alreadyDownloaded={alreadyDownloaded}
            canDownload={
              redemption.status === "ATIVO" && !alreadyDownloaded
            }
          />
        </div>

        {alreadyDownloaded ? (
          <div
            style={{
              padding: 18,
              borderRadius: 18,
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.28)",
              display: "grid",
              gap: 4
            }}
          >
            <strong style={{ color: "#a16207" }}>
              Download já realizado
            </strong>
            <p style={{ margin: 0, color: "#854d0e", lineHeight: 1.6 }}>
              Este cupom já foi baixado em{" "}
              {redemption.downloadedAt
                ? formatDateTime(redemption.downloadedAt)
                : "—"}
              . Para garantir a autenticidade, não permitimos novos downloads.
              Se precisar de ajuda, entre em contato com o suporte.
            </p>
          </div>
        ) : null}

        <section
          className="voucher-sheet"
          style={
            {
              width: "210mm",
              maxWidth: "100%",
              minHeight: "297mm",
              margin: "0 auto",
              background:
                "radial-gradient(circle at top right, rgba(37, 99, 235, 0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(22, 163, 74, 0.14), transparent 28%), #ffffff",
              padding: "18mm",
              display: "grid",
              gap: 16,
              borderRadius: 24,
              boxShadow:
                "0 20px 45px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.05)",
              boxSizing: "border-box"
            } as React.CSSProperties
          }
        >
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: 18,
              alignItems: "stretch"
            }}
          >
            <div
              style={{
                display: "grid",
                gap: 10,
                padding: 20,
                borderRadius: 24,
                background: "linear-gradient(180deg, #07152d 0%, #0b1f45 100%)",
                color: "#ffffff"
              }}
            >
              <small
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: 10,
                  opacity: 0.76
                }}
              >
                Clubão Premium
              </small>
              <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.05 }}>
                {redemption.offerTitle}
              </h1>
              <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.86 }}>
                Voucher exclusivo para membros do Clubão, emitido digitalmente
                com QR Code único para validação no parceiro.
              </p>
              <span
                style={{
                  marginTop: 6,
                  justifySelf: "start",
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  fontWeight: 700,
                  letterSpacing: "0.12em"
                }}
              >
                {redemption.couponCode}
              </span>
            </div>

            <div
              style={{
                borderRadius: 24,
                overflow: "hidden",
                minHeight: 240,
                background: "#dbe8fb",
                position: "relative"
              }}
            >
              {offer?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={offer.image}
                  alt={redemption.offerTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    height: "100%",
                    fontSize: 14,
                    color: "#2563eb"
                  }}
                >
                  Imagem promocional do benefício
                </div>
              )}
            </div>
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 16
            }}
          >
            <div
              style={{
                padding: 18,
                borderRadius: 20,
                background: "#f7faff",
                border: "1px solid #dce6f5",
                display: "grid",
                gap: 12
              }}
            >
              <div>
                <small
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontSize: 10,
                    opacity: 0.7
                  }}
                >
                  Beneficiário
                </small>
                <p style={{ margin: 0, lineHeight: 1.6, fontSize: 14 }}>
                  <strong style={{ fontSize: 20 }}>{redemption.userName}</strong>
                </p>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    fontSize: 14,
                    opacity: 0.75
                  }}
                >
                  {redemption.userEmail}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12
                }}
              >
                <div>
                  <small
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontSize: 10,
                      opacity: 0.7
                    }}
                  >
                    Resgatado em
                  </small>
                  <p style={{ margin: 0, lineHeight: 1.6, fontSize: 14 }}>
                    {formatDateTime(redemption.redeemedAt)}
                  </p>
                </div>
                <div>
                  <small
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontSize: 10,
                      opacity: 0.7
                    }}
                  >
                    Válido até
                  </small>
                  <p style={{ margin: 0, lineHeight: 1.6, fontSize: 14 }}>
                    {formatDateTime(redemption.validUntil)}
                  </p>
                </div>
              </div>

              <div>
                <small
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontSize: 10,
                    opacity: 0.7
                  }}
                >
                  Identificação do voucher
                </small>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    opacity: 0.8
                  }}
                >
                  {redemption.couponCode}
                </p>
              </div>

              <span
                style={{
                  justifySelf: "start",
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: statusTone.bg,
                  color: statusTone.color
                }}
              >
                {redemption.status}
              </span>
            </div>

            <div
              style={{
                padding: 18,
                borderRadius: 20,
                background: "#ffffff",
                border: "1px solid #dce6f5",
                display: "grid",
                gap: 14,
                alignContent: "start"
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18 }}>Validação no parceiro</h3>
              <div
                style={{
                  borderRadius: 18,
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  padding: 16,
                  display: "grid",
                  justifyItems: "center",
                  gap: 10
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="QR Code de validação"
                  style={{ width: 210, height: 210, display: "block" }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#475569",
                    textAlign: "center",
                    lineHeight: 1.6
                  }}
                >
                  Apresente este QR Code e o código do cupom na hora de utilizar
                  o benefício.
                </p>
              </div>
            </div>
          </section>

          <section
            style={{
              padding: 18,
              borderRadius: 20,
              background: "#0b1f45",
              color: "#ffffff",
              display: "grid",
              gap: 10
            }}
          >
            <small
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontSize: 10,
                opacity: 0.76
              }}
            >
              Termos e condições de uso
            </small>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.86, fontSize: 13 }}>
              1. Este voucher é pessoal e intransferível, vinculado ao
              CPF/identidade do beneficiário.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.86, fontSize: 13 }}>
              2. Válido somente dentro do prazo de validade informado e mediante
              apresentação do QR Code ou código do cupom.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.86, fontSize: 13 }}>
              3. Não acumulativo com outras promoções, salvo acordo expresso do
              parceiro.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.86, fontSize: 13 }}>
              4. O download único garante a autenticidade do voucher; após
              baixado, a emissão digital é encerrada.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.86, fontSize: 13 }}>
              5. Em caso de dúvidas, entre em contato com o suporte da FG
              EXACTA.
            </p>
          </section>

          <section
            style={{
              padding: "14px 18px",
              borderRadius: 18,
              background: "#f7faff",
              border: "1px dashed #c1d0e9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>
              FG EXACTA · Clubão Premium · Documento digital válido após
              download único.
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>
              Emitido em: {formatDateTime(redemption.redeemedAt)}
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
