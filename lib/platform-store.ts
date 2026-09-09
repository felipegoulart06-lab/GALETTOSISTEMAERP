import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createPlatformSeed } from "@/lib/platform-seed";
import type {
  AdminSession,
  AuditEntry,
  BaseManagedEntity,
  ManagedModuleKey,
  PlatformDb,
  WorkflowStatus
} from "@/lib/platform-types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "platform-db.json");

type CollectionMap = {
  users: PlatformDb["users"];
  products: PlatformDb["products"];
  mentorships: PlatformDb["mentorships"];
  lives: PlatformDb["lives"];
  clubOffers: PlatformDb["clubOffers"];
  companies: PlatformDb["companies"];
  supplierLists: PlatformDb["supplierLists"];
  referralServices: PlatformDb["referralServices"];
  referrals: PlatformDb["referrals"];
  opportunities: PlatformDb["opportunities"];
  campaigns: PlatformDb["campaigns"];
  missions: PlatformDb["missions"];
  rewards: PlatformDb["rewards"];
  sweepstakes: PlatformDb["sweepstakes"];
  couponRedemptions: PlatformDb["couponRedemptions"];
};

export type CollectionKey = keyof CollectionMap;

async function ensureDbFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(DB_PATH, "utf8");
  } catch {
    const seed = createPlatformSeed();
    await writeFile(DB_PATH, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function getPlatformDb(): Promise<PlatformDb> {
  await ensureDbFile();
  const raw = await readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as PlatformDb;
}

export async function savePlatformDb(db: PlatformDb) {
  await ensureDbFile();
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export function isContentVisible(
  record: Pick<BaseManagedEntity, "status" | "startAt" | "endAt">,
  referenceDate = new Date()
) {
  if (record.status !== "PUBLICADO") {
    return false;
  }

  if (record.startAt && new Date(record.startAt) > referenceDate) {
    return false;
  }

  if (record.endAt && new Date(record.endAt) <= referenceDate) {
    return false;
  }

  return true;
}

function createAuditEntry({
  module,
  entityId,
  entityTitle,
  action,
  actor,
  previousStatus,
  nextStatus,
  summary
}: {
  module: ManagedModuleKey;
  entityId: string;
  entityTitle: string;
  action: AuditEntry["action"];
  actor: AdminSession;
  previousStatus?: WorkflowStatus | string;
  nextStatus?: WorkflowStatus | string;
  summary: string;
}): AuditEntry {
  return {
    id: globalThis.crypto.randomUUID(),
    module,
    entityId,
    entityTitle,
    action,
    changedByUserId: actor.userId,
    changedByName: actor.fullName,
    changedAt: new Date().toISOString(),
    previousStatus,
    nextStatus,
    summary
  };
}

export async function upsertCollectionRecord<K extends CollectionKey>({
  collection,
  record,
  actor,
  auditModule,
  auditAction,
  summary
}: {
  collection: K;
  record: CollectionMap[K][number];
  actor: AdminSession;
  auditModule: ManagedModuleKey;
  auditAction: AuditEntry["action"];
  summary: string;
}) {
  const db = await getPlatformDb();
  const items = [...db[collection]] as unknown as Array<CollectionMap[K][number]>;
  const existingIndex = items.findIndex((item) => item.id === record.id);
  const previousStatus =
    existingIndex >= 0 && "status" in items[existingIndex] ? (items[existingIndex].status as WorkflowStatus | undefined) : undefined;

  if (existingIndex >= 0) {
    items[existingIndex] = record;
  } else {
    items.unshift(record);
  }

  db[collection] = items as PlatformDb[K];
  db.auditLog.unshift(
    createAuditEntry({
      module: auditModule,
      entityId: record.id,
      entityTitle: "title" in record ? String(record.title) : record.id,
      action: auditAction,
      actor,
      previousStatus,
      nextStatus: "status" in record ? String(record.status) : undefined,
      summary
    })
  );

  await savePlatformDb(db);
  return db;
}

export async function deleteCollectionRecord<K extends CollectionKey>({
  collection,
  id,
  actor,
  auditModule,
  summary
}: {
  collection: K;
  id: string;
  actor: AdminSession;
  auditModule: ManagedModuleKey;
  summary: string;
}) {
  const db = await getPlatformDb();
  const item = db[collection].find((current) => current.id === id);
  db[collection] = db[collection].filter((current) => current.id !== id) as PlatformDb[K];

  if (item) {
    db.auditLog.unshift(
      createAuditEntry({
        module: auditModule,
        entityId: item.id,
        entityTitle: "title" in item ? String(item.title) : item.id,
        action: "DELETE",
        actor,
        previousStatus: "status" in item ? String(item.status) : undefined,
        summary
      })
    );
  }

  await savePlatformDb(db);
  return db;
}

export async function duplicateManagedRecord<K extends CollectionKey>({
  collection,
  id,
  actor,
  auditModule
}: {
  collection: K;
  id: string;
  actor: AdminSession;
  auditModule: ManagedModuleKey;
}) {
  const db = await getPlatformDb();
  const item = db[collection].find((current) => current.id === id);

  if (!item || !("title" in item)) {
    return db;
  }

  const duplicated = {
    ...item,
    id: globalThis.crypto.randomUUID(),
    slug: `${item.slug}-copia`,
    publicCode: `${item.publicCode}-COPY`,
    title: `${item.title} (Cópia)`,
    status: "RASCUNHO",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    createdByUserId: actor.userId,
    updatedByUserId: actor.userId,
    publishedAt: undefined,
    publishedByUserId: undefined
  };

  db[collection] = [duplicated, ...db[collection]] as PlatformDb[K];
  db.auditLog.unshift(
    createAuditEntry({
      module: auditModule,
      entityId: duplicated.id,
      entityTitle: duplicated.title,
      action: "DUPLICATE",
      actor,
      previousStatus: item.status,
      nextStatus: duplicated.status,
      summary: `Registro duplicado a partir de ${item.title}.`
    })
  );
  await savePlatformDb(db);
  return db;
}
