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

const IS_VERCEL = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined || /vercel/i.test(process.env.NEXT_RUNTIME ?? "") || process.env.LAMBDA_TASK_ROOT !== undefined;

let DATA_DIR = path.join(process.cwd(), "data");
let DB_PATH = path.join(DATA_DIR, "platform-db.json");
if (IS_VERCEL) {
  DATA_DIR = "/tmp/galetto-data";
  DB_PATH = path.join(DATA_DIR, "platform-db.json");
}

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
  spinWheels: PlatformDb["spinWheels"];
  sweepstakes: PlatformDb["sweepstakes"];
  couponRedemptions: PlatformDb["couponRedemptions"];
  shareKits: PlatformDb["shareKits"];
  rankingBoards: PlatformDb["rankingBoards"];
  financeTickets: PlatformDb["financeTickets"];
  notifications: PlatformDb["notifications"];
  requests: PlatformDb["requests"];
  settings: PlatformDb["settings"];
};

export type CollectionKey = keyof CollectionMap;

let memoryDb: PlatformDb | null = null;
let memoryDbPromise: Promise<PlatformDb> | null = null;

async function ensureDbFile() {
  if (IS_VERCEL) {
    try {
      await readFile(DB_PATH, "utf8");
    } catch {
      return;
    }
    return;
  }

  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
  }

  try {
    await readFile(DB_PATH, "utf8");
  } catch {
    const seed = memoryDb ?? createPlatformSeed();
    memoryDb = seed;
    try {
      await writeFile(DB_PATH, JSON.stringify(seed, null, 2), "utf8");
    } catch {
    }
  }
}

async function readPlatformDbFromDisk(): Promise<PlatformDb> {
  await ensureDbFile();

  try {
    const raw = await readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as PlatformDb;
    memoryDb = hydratePlatformDb(parsed);
    return memoryDb;
  } catch {
    if (memoryDb) {
      return memoryDb;
    }
    memoryDb = createPlatformSeed();
    return memoryDb;
  }
}

function mergeCollection<T extends { id: string; title?: string }>(saved: T[] | undefined, seed: T[]): T[] {
  if (!Array.isArray(saved) || saved.length === 0) {
    return seed;
  }

  const byId = new Map(saved.map((item) => [item.id, item]));
  const byTitle = new Map(saved.map((item) => [item.title, item]));
  const merged = seed.map((item) => {
    const current = byId.get(item.id) ?? (item.title ? byTitle.get(item.title) : undefined);
    if (!current) {
      return item;
    }
    return { ...current, ...item, id: current.id };
  });
  const usedTitles = new Set(merged.map((item) => item.title));
  const extras = saved.filter((item) => !usedTitles.has(item.title));
  return [...merged, ...extras];
}

function hydratePlatformDb(parsed: Partial<PlatformDb> | null | undefined): PlatformDb {
  const seed = createPlatformSeed();
  const source = parsed ?? {};

  return {
    ...seed,
    ...source,
    version: Math.max(Number(source.version ?? 1), 3),
    users: Array.isArray(source.users) ? source.users : seed.users,
    products: mergeCollection(source.products, seed.products),
    mentorships: Array.isArray(source.mentorships) ? source.mentorships : seed.mentorships,
    lives: Array.isArray(source.lives) ? source.lives : seed.lives,
    clubOffers: Array.isArray(source.clubOffers) ? source.clubOffers : seed.clubOffers,
    companies: Array.isArray(source.companies) ? source.companies : seed.companies,
    supplierLists: Array.isArray(source.supplierLists) ? source.supplierLists : seed.supplierLists,
    referralServices: Array.isArray(source.referralServices) ? source.referralServices : seed.referralServices,
    referrals: Array.isArray(source.referrals) ? source.referrals : seed.referrals,
    opportunities: Array.isArray(source.opportunities) ? source.opportunities : seed.opportunities,
    campaigns: Array.isArray(source.campaigns) ? source.campaigns : seed.campaigns,
    missions: Array.isArray(source.missions) ? source.missions : seed.missions,
    rewards: Array.isArray(source.rewards) ? source.rewards : seed.rewards,
    spinWheels: Array.isArray(source.spinWheels) ? source.spinWheels : seed.spinWheels,
    sweepstakes: Array.isArray(source.sweepstakes) ? source.sweepstakes : seed.sweepstakes,
    couponRedemptions: Array.isArray(source.couponRedemptions) ? source.couponRedemptions : seed.couponRedemptions,
    shareKits: Array.isArray(source.shareKits) ? source.shareKits : seed.shareKits,
    rankingBoards: Array.isArray(source.rankingBoards) ? source.rankingBoards : seed.rankingBoards,
    financeTickets: Array.isArray(source.financeTickets) ? source.financeTickets : seed.financeTickets,
    notifications: Array.isArray(source.notifications) ? source.notifications : seed.notifications,
    requests: Array.isArray(source.requests) ? source.requests : seed.requests,
    settings: Array.isArray(source.settings) ? source.settings : seed.settings,
    auditLog: Array.isArray(source.auditLog) ? source.auditLog : seed.auditLog
  };
}

export async function getPlatformDb(): Promise<PlatformDb> {
  if (memoryDb) {
    memoryDb = hydratePlatformDb(memoryDb);
    return memoryDb;
  }

  if (!memoryDbPromise) {
    memoryDbPromise = readPlatformDbFromDisk().finally(() => {
      memoryDbPromise = null;
    });
  }

  return memoryDbPromise;
}

export async function savePlatformDb(db: PlatformDb) {
  memoryDb = db;
  try {
    await ensureDbFile();
    await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch {
  }
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
