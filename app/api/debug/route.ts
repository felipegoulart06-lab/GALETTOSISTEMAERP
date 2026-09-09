import "server-only";

import { NextResponse } from "next/server";
import { getPlatformDb, isContentVisible } from "@/lib/platform-store";
import {
  buildUserDashboardSections,
  getPlatformSnapshot,
  getPublishedProducts
} from "@/lib/platform-content";
import { dashboardSections, sectionOrder } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const report: Record<string, unknown> = {
    ts: new Date().toISOString(),
    cwd: process.cwd(),
    nodeVersion: process.version,
    nextVersion: process.env.NEXT_RUNTIME ?? "unknown"
  };
  try {
    const t0 = Date.now();
    let db: unknown = null;
    try {
      db = await getPlatformDb();
      report["getPlatformDb"] = {
        ok: true,
        keys: db && typeof db === "object" ? Object.keys(db as object) : null,
        productsCount: Array.isArray((db as any)?.products) ? (db as any).products.length : -1,
        mentorshipsCount: Array.isArray((db as any)?.mentorships) ? (db as any).mentorships.length : -1,
        usersCount: Array.isArray((db as any)?.users) ? (db as any).users.length : -1,
        companiesCount: Array.isArray((db as any)?.companies) ? (db as any).companies.length : -1
      };
    } catch (dbError) {
      report["getPlatformDb"] = {
        ok: false,
        message: dbError instanceof Error ? dbError.message : String(dbError),
        stack: dbError instanceof Error ? dbError.stack : undefined
      };
      return NextResponse.json({ debug: "FAIL", step: "getPlatformDb", report }, { status: 500 });
    }

    try {
      const t1 = Date.now();
      const sections = await buildUserDashboardSections();
      report["buildUserDashboardSections"] = {
        ok: true,
        keysCount: Object.keys(sections).length,
        keys: Object.keys(sections),
        homeLabel: (sections as any).home?.label ?? null,
        homeCardsCount: Array.isArray((sections as any).home?.cards) ? (sections as any).home.cards.length : -1,
        durationMs: Date.now() - t1
      };
    } catch (secError) {
      report["buildUserDashboardSections"] = {
        ok: false,
        message: secError instanceof Error ? secError.message : String(secError),
        stack: secError instanceof Error ? secError.stack : undefined
      };
      return NextResponse.json({ debug: "FAIL", step: "buildUserDashboardSections", report }, { status: 500 });
    }

    try {
      const products = await getPublishedProducts();
      report["getPublishedProducts"] = {
        ok: true,
        count: products.length
      };
    } catch (prodError) {
      report["getPublishedProducts"] = {
        ok: false,
        message: prodError instanceof Error ? prodError.message : String(prodError),
        stack: prodError instanceof Error ? prodError.stack : undefined
      };
      return NextResponse.json({ debug: "FAIL", step: "getPublishedProducts", report }, { status: 500 });
    }

    try {
      const snapshot = await getPlatformSnapshot();
      report["getPlatformSnapshot"] = {
        ok: true,
        clubOffersIsArray: Array.isArray((snapshot as any)?.clubOffers),
        clubOffersCount: Array.isArray((snapshot as any)?.clubOffers) ? (snapshot as any).clubOffers.length : -1,
        couponIsArray: Array.isArray((snapshot as any)?.couponRedemptions),
        couponCount: Array.isArray((snapshot as any)?.couponRedemptions) ? (snapshot as any).couponRedemptions.length : -1
      };
    } catch (snapError) {
      report["getPlatformSnapshot"] = {
        ok: false,
        message: snapError instanceof Error ? snapError.message : String(snapError),
        stack: snapError instanceof Error ? snapError.stack : undefined
      };
      return NextResponse.json({ debug: "FAIL", step: "getPlatformSnapshot", report }, { status: 500 });
    }

    report["meta"] = {
      dashboardSectionsKeys: Object.keys(dashboardSections).length,
      sectionOrderSize: sectionOrder.length,
      totalMs: Date.now() - t0
    };

    return NextResponse.json({ debug: "OK", report }, { status: 200 });
  } catch (topError) {
    report["topLevel"] = {
      ok: false,
      message: topError instanceof Error ? topError.message : String(topError),
      stack: topError instanceof Error ? topError.stack : undefined
    };
    return NextResponse.json({ debug: "FATAL", report }, { status: 500 });
  }
}
