import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAdminSession } from "@/lib/admin-auth";
import {
  deleteCollectionRecord,
  duplicateManagedRecord,
  getPlatformDb,
  type CollectionKey,
  upsertCollectionRecord
} from "@/lib/platform-store";
import type { ManagedModuleKey } from "@/lib/platform-types";

const moduleToCollection: Record<string, { collection: CollectionKey; auditModule: ManagedModuleKey }> = {
  usuarios: { collection: "users", auditModule: "users" },
  produtos: { collection: "products", auditModule: "products" },
  mentorias: { collection: "mentorships", auditModule: "mentorships" },
  lives: { collection: "lives", auditModule: "lives" },
  clubao: { collection: "clubOffers", auditModule: "clubOffers" },
  empresas: { collection: "companies", auditModule: "companies" },
  listas: { collection: "supplierLists", auditModule: "supplierLists" },
  indicacoes: { collection: "referralServices", auditModule: "referralServices" },
  oportunidades: { collection: "opportunities", auditModule: "opportunities" },
  campanhas: { collection: "campaigns", auditModule: "campaigns" },
  missoes: { collection: "missions", auditModule: "missions" },
  recompensas: { collection: "rewards", auditModule: "rewards" },
  "giro-da-sorte": { collection: "spinWheels", auditModule: "spinWheels" },
  sorteios: { collection: "sweepstakes", auditModule: "sweepstakes" },
  divulgue: { collection: "shareKits", auditModule: "shareKits" },
  ranking: { collection: "rankingBoards", auditModule: "rankingBoards" },
  financeiro: { collection: "financeTickets", auditModule: "financeTickets" },
  notificacoes: { collection: "notifications", auditModule: "notifications" },
  solicitacoes: { collection: "requests", auditModule: "requests" },
  configuracoes: { collection: "settings", auditModule: "settings" }
};

export async function GET() {
  await requireAdminSession();
  const db = await getPlatformDb();
  return NextResponse.json(db);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    module: string;
    action: "save" | "delete" | "duplicate";
    record?: Record<string, unknown>;
    id?: string;
    summary?: string;
  };

  const target = moduleToCollection[body.module];

  if (!target) {
    return NextResponse.json({ ok: false, error: "Módulo inválido." }, { status: 400 });
  }

  const session =
    body.action === "save" || body.action === "delete" || body.action === "duplicate"
      ? await requirePermission("manage:content")
      : await requireAdminSession();

  if (body.action === "save") {
    if (!body.record) {
      return NextResponse.json({ ok: false, error: "Registro ausente." }, { status: 400 });
    }

    const db = await upsertCollectionRecord({
      collection: target.collection,
      record: body.record as never,
      actor: session,
      auditModule: target.auditModule,
      auditAction: "UPDATE",
      summary: body.summary ?? "Registro salvo pelo Admin Master."
    });

    return NextResponse.json({ ok: true, db });
  }

  if (body.action === "delete") {
    if (!body.id) {
      return NextResponse.json({ ok: false, error: "ID ausente para exclusão." }, { status: 400 });
    }

    const db = await deleteCollectionRecord({
      collection: target.collection,
      id: body.id,
      actor: session,
      auditModule: target.auditModule,
      summary: body.summary ?? "Registro removido pelo Admin Master."
    });

    return NextResponse.json({ ok: true, db });
  }

  if (body.action === "duplicate") {
    if (!body.id) {
      return NextResponse.json({ ok: false, error: "ID ausente para duplicação." }, { status: 400 });
    }

    const db = await duplicateManagedRecord({
      collection: target.collection,
      id: body.id,
      actor: session,
      auditModule: target.auditModule
    });

    return NextResponse.json({ ok: true, db });
  }

  return NextResponse.json({ ok: false, error: "Ação inválida." }, { status: 400 });
}
