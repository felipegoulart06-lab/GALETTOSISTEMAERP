import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getPlatformDb, savePlatformDb } from "@/lib/platform-store";
import type { CouponRedemptionRecord } from "@/lib/platform-types";

export const dynamic = "force-dynamic";

function createSecureToken() {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createPublicCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const pick = (pool: string, length: number) =>
    Array.from(
      { length },
      () => pool[Math.floor(Math.random() * pool.length)]
    ).join("");
  return `FGX-${pick(letters, 3)}-${pick(digits, 2)}${pick(letters, 2)}${pick(digits, 1)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { offerId?: string };
    const offerId = body.offerId?.trim();

    if (!offerId) {
      return NextResponse.json(
        { ok: false, error: "Oferta não informada." },
        { status: 400 }
      );
    }

    const userId = request.cookies.get("fgx_user_id")?.value ?? "user-01";
    const userName =
      request.cookies.get("fgx_user_name")?.value ?? "Usuário FG EXACTA";
    const userEmail =
      request.cookies.get("fgx_user_email")?.value ?? "usuario@fgexacta.com";

    const db = await getPlatformDb();
    const offer = db.clubOffers.find((item) => item.id === offerId);

    if (!offer) {
      return NextResponse.json(
        { ok: false, error: "Oferta não encontrada." },
        { status: 404 }
      );
    }

    if (offer.status !== "PUBLICADO") {
      return NextResponse.json(
        { ok: false, error: "Oferta indisponível para resgate." },
        { status: 422 }
      );
    }

    const alreadyRedeemed = db.couponRedemptions.find(
      (item) => item.offerId === offerId && item.userId === userId
    );

    if (alreadyRedeemed) {
      return NextResponse.json(
        {
          ok: true,
          duplicated: true,
          validationToken: alreadyRedeemed.validationToken,
          couponCode: alreadyRedeemed.couponCode,
          voucherUrl: `/clubao/voucher/${alreadyRedeemed.validationToken}`
        },
        { status: 200 }
      );
    }

    if (
      offer.redemptionLimit > 0 &&
      (offer.redeemedCount ?? 0) >= offer.redemptionLimit
    ) {
      return NextResponse.json(
        { ok: false, error: "Estoque de cupons esgotado." },
        { status: 422 }
      );
    }

    const validationToken = createSecureToken();
    const couponCode = createPublicCode();
    const redeemedAt = new Date().toISOString();
    const validUntil =
      offer.endAt ??
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const redemption: CouponRedemptionRecord = {
      id: globalThis.crypto.randomUUID(),
      couponId: `coupon-${validationToken.slice(0, 12)}`,
      couponCode,
      publicCode: couponCode,
      offerId: offer.id,
      offerTitle: offer.title,
      userId,
      userName,
      userEmail,
      redeemedAt,
      validUntil,
      status: "ATIVO",
      pdfReference: `voucher-${couponCode.toLowerCase()}.html`,
      qrValidationToken: validationToken,
      validationToken,
      qrPayload: `https://fgexacta.app/clubao/validate/${validationToken}`,
      downloadCount: 0
    };

    const nextOffers = db.clubOffers.map((current) =>
      current.id === offer.id
        ? { ...current, redeemedCount: (current.redeemedCount ?? 0) + 1 }
        : current
    );

    const nextDb: typeof db = {
      ...db,
      clubOffers: nextOffers,
      couponRedemptions: [redemption, ...db.couponRedemptions]
    };

    await savePlatformDb(nextDb);

    return NextResponse.json(
      {
        ok: true,
        validationToken,
        couponCode,
        voucherUrl: `/clubao/voucher/${validationToken}`,
        redemption
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[clubao/redeem] Falha ao registrar resgate:", error);
    return NextResponse.json(
      { ok: false, error: "Falha interna ao registrar resgate." },
      { status: 500 }
    );
  }
}
