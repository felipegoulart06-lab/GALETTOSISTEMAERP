import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { nextCouponSerial } from "@/lib/clubao-coupon";
import { buildClubaoCouponPdf } from "@/lib/clubao-voucher-pdf";
import { getPlatformDb, savePlatformDb } from "@/lib/platform-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();

    if (!token) {
      return NextResponse.json({ ok: false, error: "Token do cupom não informado." }, { status: 400 });
    }

    const db = await getPlatformDb();
    const redemptions = Array.isArray(db.couponRedemptions) ? db.couponRedemptions : [];
    const redemptionIndex = redemptions.findIndex((item) => item.validationToken === token);

    if (redemptionIndex < 0) {
      return NextResponse.json({ ok: false, error: "Cupom não encontrado." }, { status: 404 });
    }

    const redemption = redemptions[redemptionIndex];
    const offer = Array.isArray(db.clubOffers) ? db.clubOffers.find((item) => item.id === redemption.offerId) : undefined;
    const serialNumber = redemption.serialNumber || nextCouponSerial(redemptions.filter((_, index) => index !== redemptionIndex));

    const pdfBytes = await buildClubaoCouponPdf({
      serialNumber,
      couponCode: redemption.couponCode,
      offerTitle: redemption.offerTitle || offer?.title || "Beneficio Clubao",
      partnerName: offer?.partnerName,
      discountLabel: offer?.discountLabel,
      userName: redemption.userName,
      userEmail: redemption.userEmail,
      redeemedAt: redemption.redeemedAt,
      validUntil: redemption.validUntil,
      status: redemption.status,
      qrPayload: redemption.qrPayload,
      protocol: redemption.validationToken
    });

    const nextRedemption = {
      ...redemption,
      serialNumber,
      pdfReference: `cupom-${serialNumber.toLowerCase()}.pdf`,
      downloadCount: (redemption.downloadCount ?? 0) + 1,
      downloadedAt: new Date().toISOString()
    };
    const nextRedemptions = [...redemptions];
    nextRedemptions[redemptionIndex] = nextRedemption;
    await savePlatformDb({ ...db, couponRedemptions: nextRedemptions });

    const filename = `cupom-${serialNumber.toLowerCase()}.pdf`;
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch (error) {
    console.error("[clubao/download] Falha ao gerar PDF:", error);
    return NextResponse.json({ ok: false, error: "Falha interna ao gerar o PDF do cupom." }, { status: 500 });
  }
}
