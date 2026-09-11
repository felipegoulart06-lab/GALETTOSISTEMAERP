import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { formatPtDateTime } from "@/lib/safe-date";

type VoucherStatus = "ATIVO" | "EXPIRADO" | "UTILIZADO";

export async function buildClubaoCouponPdf(params: {
  serialNumber: string;
  couponCode: string;
  offerTitle: string;
  partnerName?: string;
  discountLabel?: string;
  userName: string;
  userEmail: string;
  redeemedAt: string;
  validUntil: string;
  status: VoucherStatus;
  qrPayload: string;
  protocol: string;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const courierBold = await pdf.embedFont(StandardFonts.CourierBold);

  const navy = rgb(0.031, 0.063, 0.145);
  const navySoft = rgb(0.043, 0.122, 0.271);
  const gold = rgb(0.82, 0.65, 0.28);
  const paper = rgb(0.98, 0.97, 0.94);
  const ink = rgb(0.08, 0.12, 0.2);
  const muted = rgb(0.38, 0.44, 0.54);
  const green = rgb(0.09, 0.51, 0.32);

  page.drawRectangle({ x: 0, y: 0, width, height, color: navy });
  page.drawRectangle({
    x: 18,
    y: 18,
    width: width - 36,
    height: height - 36,
    color: paper,
    borderColor: gold,
    borderWidth: 2
  });

  page.drawRectangle({
    x: 18,
    y: height - 168,
    width: width - 36,
    height: 150,
    color: navySoft
  });

  page.drawRectangle({
    x: 18,
    y: height - 172,
    width: width - 36,
    height: 4,
    color: gold
  });

  page.drawText("FG EXACTA", {
    x: 42,
    y: height - 58,
    size: 11,
    font: helveticaBold,
    color: gold
  });
  page.drawText("CLUBAO PREMIUM  ·  CUPOM OFICIAL DE RESGATE", {
    x: 42,
    y: height - 76,
    size: 9,
    font: helvetica,
    color: rgb(0.85, 0.89, 0.96)
  });
  page.drawText("NUMERO DE EMISSAO", {
    x: 42,
    y: height - 108,
    size: 8,
    font: helvetica,
    color: gold
  });
  page.drawText(params.serialNumber, {
    x: 42,
    y: height - 138,
    size: 22,
    font: courierBold,
    color: rgb(1, 1, 1)
  });

  page.drawRectangle({
    x: width - 196,
    y: height - 148,
    width: 154,
    height: 92,
    color: navy,
    borderColor: gold,
    borderWidth: 1
  });
  page.drawText("STATUS", {
    x: width - 178,
    y: height - 78,
    size: 8,
    font: helvetica,
    color: gold
  });
  page.drawText(params.status, {
    x: width - 178,
    y: height - 102,
    size: 16,
    font: helveticaBold,
    color: params.status === "ATIVO" ? rgb(0.55, 0.9, 0.7) : rgb(1, 1, 1)
  });
  page.drawText("Documento unico", {
    x: width - 178,
    y: height - 124,
    size: 8,
    font: helvetica,
    color: rgb(0.75, 0.8, 0.9)
  });

  const offerLines = wrapPdfText(params.offerTitle, 46);
  page.drawText("BENEFICIO", {
    x: 42,
    y: height - 210,
    size: 8,
    font: helveticaBold,
    color: muted
  });
  offerLines.forEach((line, index) => {
    page.drawText(line, {
      x: 42,
      y: height - 234 - index * 18,
      size: 16,
      font: helveticaBold,
      color: ink
    });
  });

  if (params.discountLabel) {
    page.drawText(sanitizePdfText(params.discountLabel), {
      x: 42,
      y: height - 234 - offerLines.length * 18 - 8,
      size: 11,
      font: helvetica,
      color: green
    });
  }

  page.drawRectangle({
    x: 42,
    y: 318,
    width: 310,
    height: 168,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.86, 0.89, 0.93),
    borderWidth: 1
  });

  drawMeta(page, helvetica, helveticaBold, 58, 458, "BENEFICIARIO", params.userName);
  drawMeta(page, helvetica, helveticaBold, 58, 418, "E-MAIL", params.userEmail);
  drawMeta(page, helvetica, helveticaBold, 58, 378, "RESGATADO EM", formatPtDateTime(params.redeemedAt));
  drawMeta(page, helvetica, helveticaBold, 58, 338, "VALIDO ATE", formatPtDateTime(params.validUntil));

  page.drawRectangle({
    x: 368,
    y: 318,
    width: 185,
    height: 168,
    color: navy,
    borderColor: gold,
    borderWidth: 1.25
  });
  page.drawText("CODIGO DO CUPOM", {
    x: 384,
    y: 456,
    size: 8,
    font: helvetica,
    color: gold
  });
  page.drawText(params.couponCode, {
    x: 384,
    y: 428,
    size: 13,
    font: courierBold,
    color: rgb(1, 1, 1)
  });
  page.drawText("Apresente este codigo", {
    x: 384,
    y: 404,
    size: 8,
    font: helvetica,
    color: rgb(0.78, 0.83, 0.92)
  });
  page.drawText("e o QR no parceiro.", {
    x: 384,
    y: 392,
    size: 8,
    font: helvetica,
    color: rgb(0.78, 0.83, 0.92)
  });
  if (params.partnerName) {
    page.drawText("PARCEIRO", {
      x: 384,
      y: 362,
      size: 7,
      font: helvetica,
      color: gold
    });
    page.drawText(sanitizePdfText(params.partnerName).slice(0, 28), {
      x: 384,
      y: 344,
      size: 9,
      font: helveticaBold,
      color: rgb(1, 1, 1)
    });
  }

  let qrEmbedded = false;
  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=8&data=${encodeURIComponent(params.qrPayload)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const qrResponse = await fetch(qrUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (qrResponse.ok) {
      const qrBytes = new Uint8Array(await qrResponse.arrayBuffer());
      const qrImage = await pdf.embedPng(qrBytes);
      page.drawRectangle({
        x: 198,
        y: 96,
        width: 200,
        height: 200,
        color: rgb(1, 1, 1),
        borderColor: navy,
        borderWidth: 1
      });
      page.drawImage(qrImage, {
        x: 214,
        y: 112,
        width: 168,
        height: 168
      });
      qrEmbedded = true;
    }
  } catch {
    qrEmbedded = false;
  }

  if (!qrEmbedded) {
    page.drawRectangle({
      x: 198,
      y: 96,
      width: 200,
      height: 200,
      color: rgb(1, 1, 1),
      borderColor: navy,
      borderWidth: 1
    });
    page.drawText("QR indisponivel", {
      x: 228,
      y: 190,
      size: 10,
      font: helvetica,
      color: muted
    });
    page.drawText("Use o codigo do cupom.", {
      x: 218,
      y: 174,
      size: 9,
      font: helvetica,
      color: muted
    });
  }

  page.drawText("VALIDACAO NO PARCEIRO", {
    x: 42,
    y: 286,
    size: 8,
    font: helveticaBold,
    color: muted
  });

  page.drawRectangle({
    x: 42,
    y: 42,
    width: width - 84,
    height: 46,
    color: navy
  });
  page.drawText(`Protocolo ${params.protocol.slice(0, 24).toUpperCase()}  ·  ${params.serialNumber}  ·  FG EXACTA Clubao`, {
    x: 54,
    y: 60,
    size: 8,
    font: helvetica,
    color: rgb(0.86, 0.9, 0.96)
  });

  page.drawText("Documento digital com numeracao exclusiva deste resgate. Pessoal e intransferivel.", {
    x: 42,
    y: 80,
    size: 8,
    font: helvetica,
    color: muted
  });

  return pdf.save();
}

function drawMeta(
  page: {
    drawText: (text: string, options: Record<string, unknown>) => void;
  },
  regular: { widthOfTextAtSize: (t: string, s: number) => number },
  bold: unknown,
  x: number,
  y: number,
  label: string,
  value: string
) {
  page.drawText(label, {
    x,
    y: y + 14,
    size: 7,
    font: regular,
    color: rgb(0.38, 0.44, 0.54)
  });
  page.drawText(sanitizePdfText(value).slice(0, 42), {
    x,
    y,
    size: 11,
    font: bold,
    color: rgb(0.08, 0.12, 0.2)
  });
}

function wrapPdfText(value: string, maxChars: number) {
  const words = sanitizePdfText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

function sanitizePdfText(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/ã/g, "a")
    .replace(/á|à|â/g, "a")
    .replace(/é|ê/g, "e")
    .replace(/í/g, "i")
    .replace(/ó|ô|õ/g, "o")
    .replace(/ú/g, "u")
    .replace(/ç/g, "c")
    .replace(/Ã/g, "A")
    .replace(/Á|À|Â/g, "A")
    .replace(/É|Ê/g, "E")
    .replace(/Í/g, "I")
    .replace(/Ó|Ô|Õ/g, "O")
    .replace(/Ú/g, "U")
    .replace(/Ç/g, "C")
    .replace(/ão/g, "ao");
}
