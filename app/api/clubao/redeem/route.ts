import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { createPublicCouponCode, createSecureToken, nextCouponSerial } from "@/lib/clubao-coupon";
import { getPlatformDb, savePlatformDb } from "@/lib/platform-store";
import type { CouponRedemptionRecord } from "@/lib/platform-types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      offerId?: string;
      userId?: string;
      userName?: string;
      userEmail?: string;
    };
    const offerId = body.offerId?.trim();

    if (!offerId) {
      return NextResponse.json({ ok: false, error: "Oferta não informada." }, { status: 400 });
    }

    const userId = body.userId?.trim() || request.cookies.get("fgx_user_id")?.value || "usr-felipe-goulart-01";
    const userName = body.userName?.trim() || request.cookies.get("fgx_user_name")?.value || "Felipe Goulart";
    const userEmail = body.userEmail?.trim() || request.cookies.get("fgx_user_email")?.value || "felipe@fgexacta.com";

    const db = await getPlatformDb();
    const offer = Array.isArray(db.clubOffers) ? db.clubOffers.find((item) => item.id === offerId) : undefined;

    if (!offer) {
      return NextResponse.json({ ok: false, error: "Oferta não encontrada." }, { status: 404 });
    }

    if (offer.status !== "PUBLICADO") {
      return NextResponse.json({ ok: false, error: "Oferta indisponível para resgate." }, { status: 422 });
    }

    const redemptions = Array.isArray(db.couponRedemptions) ? db.couponRedemptions : [];
    const alreadyRedeemed = redemptions.find((item) => item.offerId === offerId && item.userId === userId);

    if (alreadyRedeemed) {
      return NextResponse.json(
        {
          ok: true,
          duplicated: true,
          validationToken: alreadyRedeemed.validationToken,
          couponCode: alreadyRedeemed.couponCode,
          serialNumber: alreadyRedeemed.serialNumber,
          pdfUrl: `/api/clubao/download?token=${encodeURIComponent(alreadyRedeemed.validationToken)}`,
          voucherUrl: `/clubao/voucher/${alreadyRedeemed.validationToken}`,
          redemption: alreadyRedeemed
        },
        { status: 200 }
      );
    }

    if (offer.redemptionLimit > 0 && (offer.redeemedCount ?? 0) >= offer.redemptionLimit) {
      return NextResponse.json({ ok: false, error: "Estoque de cupons esgotado." }, { status: 422 });
    }

    const validationToken = createSecureToken();
    const couponPrefix = typeof (offer as { couponPrefix?: string }).couponPrefix === "string" && (offer as { couponPrefix?: string }).couponPrefix
      ? String((offer as { couponPrefix?: string }).couponPrefix)
      : "FGX";
    const couponCode = createPublicCouponCode(couponPrefix.replace(/[^A-Z0-9]/gi, "").slice(0, 4) || "FGX");
    const serialNumber = nextCouponSerial(redemptions);
    const redeemedAt = new Date().toISOString();
    const validUntil = offer.endAt ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const origin = request.nextUrl.origin;

    const redemption: CouponRedemptionRecord = {
      id: globalThis.crypto.randomUUID(),
      couponId: `coupon-${serialNumber.toLowerCase()}`,
      couponCode,
      publicCode: couponCode,
      serialNumber,
      offerId: offer.id,
      offerTitle: offer.title,
      userId,
      userName,
      userEmail,
      redeemedAt,
      validUntil,
      status: "ATIVO",
      pdfReference: `cupom-${serialNumber.toLowerCase()}.pdf`,
      qrValidationToken: validationToken,
      validationToken,
      qrPayload: `${origin}/clubao/voucher/${validationToken}`,
      downloadCount: 0
    };

    const nextOffers = db.clubOffers.map((current) =>
      current.id === offer.id ? { ...current, redeemedCount: (current.redeemedCount ?? 0) + 1 } : current
    );

    await savePlatformDb({
      ...db,
      clubOffers: nextOffers,
      couponRedemptions: [redemption, ...redemptions],
      auditLog: [
        {
          id: globalThis.crypto.randomUUID(),
          module: "couponRedemptions",
          entityId: redemption.id,
          entityTitle: `${serialNumber} · ${couponCode}`,
          action: "CREATE",
          changedByUserId: userId,
          changedByName: userName,
          changedAt: redeemedAt,
          nextStatus: "ATIVO",
          summary: `Cupom ${serialNumber} (${couponCode}) resgatado para "${offer.title}" por ${userName}.`
        },
        ...(Array.isArray(db.auditLog) ? db.auditLog : [])
      ]
    });

    return NextResponse.json(
      {
        ok: true,
        validationToken,
        couponCode,
        serialNumber,
        pdfUrl: `/api/clubao/download?token=${encodeURIComponent(validationToken)}`,
        voucherUrl: `/clubao/voucher/${validationToken}`,
        redemption
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[clubao/redeem] Falha ao registrar resgate:", error);
    return NextResponse.json({ ok: false, error: "Falha interna ao registrar resgate." }, { status: 500 });
  }
}
