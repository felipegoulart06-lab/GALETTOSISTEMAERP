import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getPlatformDb, savePlatformDb } from "@/lib/platform-store";

export const dynamic = "force-dynamic";

function buildVoucherHtml(params: {
  couponCode: string;
  userName: string;
  userEmail: string;
  offerTitle: string;
  redeemedAt: string;
  validUntil: string;
  status: "ATIVO" | "EXPIRADO" | "UTILIZADO";
  qrUrl: string;
  offerImage?: string;
}) {
  const {
    couponCode,
    userName,
    userEmail,
    offerTitle,
    redeemedAt,
    validUntil,
    status,
    qrUrl,
    offerImage
  } = params;

  const redeemedLabel = new Date(redeemedAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const validLabel = new Date(validUntil).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>${couponCode} - FG EXACTA Clubão</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, Arial, sans-serif;
        background: #eef4fb;
        color: #0f172a;
      }
      .sheet {
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        background:
          radial-gradient(circle at top right, rgba(37, 99, 235, 0.16), transparent 28%),
          radial-gradient(circle at bottom left, rgba(22, 163, 74, 0.14), transparent 28%),
          #ffffff;
        padding: 18mm;
        display: grid;
        gap: 16px;
      }
      .hero {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 18px;
        align-items: stretch;
      }
      .brand {
        display: grid;
        gap: 10px;
        padding: 20px;
        border-radius: 24px;
        background: linear-gradient(180deg, #07152d 0%, #0b1f45 100%);
        color: #ffffff;
      }
      .brand small {
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 10px;
        opacity: 0.76;
      }
      .brand h1 {
        margin: 0;
        font-size: 28px;
        line-height: 1.05;
      }
      .brand p {
        margin: 0;
        line-height: 1.6;
        opacity: 0.86;
      }
      .brand .code-pill {
        margin-top: 6px;
        justify-self: start;
        padding: 10px 16px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.22);
        font-weight: 700;
        letter-spacing: 0.12em;
      }
      .hero-image {
        border-radius: 24px;
        overflow: hidden;
        min-height: 240px;
        background: #dbe8fb;
        position: relative;
      }
      .hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .voucher-grid {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 16px;
      }
      .meta-card {
        padding: 18px;
        border-radius: 20px;
        background: #f7faff;
        border: 1px solid #dce6f5;
        display: grid;
        gap: 12px;
      }
      .meta-card small {
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 10px;
        opacity: 0.7;
      }
      .meta-card p {
        margin: 0;
        line-height: 1.6;
        font-size: 14px;
      }
      .meta-card strong {
        font-size: 20px;
      }
      .meta-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .qr-card {
        padding: 18px;
        border-radius: 20px;
        background: #ffffff;
        border: 1px solid #dce6f5;
        display: grid;
        gap: 14px;
        align-content: start;
      }
      .qr-card h3 {
        margin: 0;
        font-size: 18px;
      }
      .qr-frame {
        border-radius: 18px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        padding: 16px;
        display: grid;
        justify-items: center;
        gap: 10px;
      }
      .qr-frame img {
        width: 210px;
        height: 210px;
        display: block;
      }
      .status-pill {
        justify-self: start;
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        background: ${
          status === "ATIVO"
            ? "rgba(22, 163, 74, 0.12)"
            : status === "EXPIRADO"
            ? "rgba(239, 68, 68, 0.12)"
            : "rgba(100, 116, 139, 0.12)"
        };
        color: ${
          status === "ATIVO"
            ? "#15803d"
            : status === "EXPIRADO"
            ? "#b91c1c"
            : "#334155"
        };
      }
      .terms {
        padding: 18px;
        border-radius: 20px;
        background: #0b1f45;
        color: #ffffff;
        display: grid;
        gap: 10px;
      }
      .terms small {
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 10px;
        opacity: 0.76;
      }
      .terms p {
        margin: 0;
        line-height: 1.7;
        opacity: 0.86;
        font-size: 13px;
      }
      .footer {
        padding: 14px 18px;
        border-radius: 18px;
        background: #f7faff;
        border: 1px dashed #c1d0e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
      .footer p {
        margin: 0;
        font-size: 12px;
        color: #475569;
      }
    </style>
  </head>
  <body>
    <section class="sheet">
      <section class="hero">
        <div class="brand">
          <small>FG EXACTA · Clubão Premium</small>
          <h1>${offerTitle}</h1>
          <p>Voucher exclusivo para membros do Clubão, emitido digitalmente com QR Code único para validação no parceiro.</p>
          <span class="code-pill">${couponCode}</span>
        </div>
        <div class="hero-image">
          ${
            offerImage
              ? `<img src="${offerImage}" alt="${offerTitle}" />`
              : `<div style="display:grid;place-items:center;height:100%;font-size:14px;color:#2563eb;">Imagem promocional do benefício</div>`
          }
        </div>
      </section>

      <section class="voucher-grid">
        <div class="meta-card">
          <div>
            <small>Beneficiário</small>
            <p><strong>${userName}</strong></p>
            <p style="opacity:0.75">${userEmail}</p>
          </div>
          <div class="meta-row">
            <div>
              <small>Resgatado em</small>
              <p>${redeemedLabel}</p>
            </div>
            <div>
              <small>Válido até</small>
              <p>${validLabel}</p>
            </div>
          </div>
          <div>
            <small>Identificação do voucher</small>
            <p style="font-family:ui-monospace, SFMono-Regular, Menlo, monospace; opacity:0.8;">
              ${couponCode}
            </p>
          </div>
          <span class="status-pill">${status}</span>
        </div>

        <div class="qr-card">
          <h3>Validação no parceiro</h3>
          <div class="qr-frame">
            <img src="${qrUrl}" alt="QR Code de validação" />
            <p style="margin:0;font-size:12px;color:#475569;text-align:center;">
              Apresente este QR Code e o código do cupom na hora de utilizar o benefício.
            </p>
          </div>
        </div>
      </section>

      <section class="terms">
        <small>Termos e condições de uso</small>
        <p>1. Este voucher é pessoal e intransferível, vinculado ao CPF/identidade do beneficiário.</p>
        <p>2. Válido somente dentro do prazo de validade informado e mediante apresentação do QR Code ou código do cupom.</p>
        <p>3. Não acumulativo com outras promoções, salvo acordo expresso do parceiro.</p>
        <p>4. O download único garante a autenticidade do voucher; após baixado, a emissão digital é encerrada.</p>
        <p>5. Em caso de dúvidas, entre em contato com o suporte da FG EXACTA.</p>
      </section>

      <section class="footer">
        <p>FG EXACTA · Clubão Premium · Documento digital válido após download único.</p>
        <p>Emitido em: ${redeemedLabel}</p>
      </section>
    </section>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Token do cupom não informado." },
        { status: 400 }
      );
    }

    const db = await getPlatformDb();
    const redemptionIndex = db.couponRedemptions.findIndex(
      (item) => item.validationToken === token
    );

    if (redemptionIndex < 0) {
      return NextResponse.json(
        { ok: false, error: "Cupom não encontrado." },
        { status: 404 }
      );
    }

    const redemption = db.couponRedemptions[redemptionIndex];

    if (redemption.downloadCount >= 1) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Download já realizado. Este cupom permite apenas um download para garantir autenticidade."
        },
        { status: 403 }
      );
    }

    const offer = db.clubOffers.find((item) => item.id === redemption.offerId);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=${encodeURIComponent(
      redemption.qrPayload
    )}`;

    const html = buildVoucherHtml({
      couponCode: redemption.couponCode,
      userName: redemption.userName,
      userEmail: redemption.userEmail,
      offerTitle: redemption.offerTitle,
      redeemedAt: redemption.redeemedAt,
      validUntil: redemption.validUntil,
      status: redemption.status,
      qrUrl,
      offerImage: offer?.image
    });

    const nextRedemption = {
      ...redemption,
      downloadCount: 1,
      downloadedAt: new Date().toISOString()
    };

    const nextRedemptions = [...db.couponRedemptions];
    nextRedemptions[redemptionIndex] = nextRedemption;

    await savePlatformDb({ ...db, couponRedemptions: nextRedemptions });

    const filename = `voucher-${redemption.couponCode.toLowerCase()}.html`;
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch (error) {
    console.error("[clubao/download] Falha ao gerar download:", error);
    return NextResponse.json(
      { ok: false, error: "Falha interna ao preparar download." },
      { status: 500 }
    );
  }
}
