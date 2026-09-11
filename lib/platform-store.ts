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

const __debugEmit = (hypothesisId: string, location: string, msg: string, data: Record<string, unknown> = {}) => {
  try {
    void fetch("http://127.0.0.1:7777/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "local",
        runId: "pre-fix",
        hypothesisId,
        location,
        msg: `[DEBUG] ${msg}`,
        data,
        ts: Date.now()
      })
    }).catch(() => undefined);
  } catch {
  }
};
// #endregion

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
};

export type CollectionKey = keyof CollectionMap;

async function ensureDbFile() {
  // #region debug-point A:ensure-db
  __debugEmit("A", "platform-store.ts:ensureDbFile:enter", "ensureDbFile enter", {
    dataDir: DATA_DIR,
    dbPath: DB_PATH,
    cwd: process.cwd(),
    nodeVersion: process.version,
    isVercel: IS_VERCEL
  });
  // #endregion

  if (IS_VERCEL) {
    try {
      await readFile(DB_PATH, "utf8");
      __debugEmit("A", "platform-store.ts:ensureDbFile:vercel:hit", "Vercel /tmp db existe", { dbPath: DB_PATH });
      return;
    } catch {
      __debugEmit("A", "platform-store.ts:ensureDbFile:vercel:memOnly", "Vercel sem db persistido, manter memória seed", { dbPath: DB_PATH });
      return;
    }
  }

  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch (mkdirError) {
    __debugEmit("A", "platform-store.ts:ensureDbFile:mkdirSkipped", "mkdir data falhou, seguindo sem escrever (read-only FS provavelmente)", {
      error: mkdirError instanceof Error ? mkdirError.message : String(mkdirError)
    });
  }

  try {
    await readFile(DB_PATH, "utf8");
    // #region debug-point A:read-hit
    __debugEmit("A", "platform-store.ts:ensureDbFile:hit", "ensureDbFile db file present", {
      dbPath: DB_PATH
    });
    // #endregion
  } catch (readError) {
    const seed = createPlatformSeed();
    try {
      await writeFile(DB_PATH, JSON.stringify(seed, null, 2), "utf8");
      // #region debug-point A:seed-miss
      __debugEmit("A", "platform-store.ts:ensureDbFile:createdSeed", "ensureDbFile created seed (writable FS)", {
        dbPath: DB_PATH,
        seedKeys: Object.keys(seed)
      });
      // #endregion
    } catch (writeError) {
      __debugEmit("A", "platform-store.ts:ensureDbFile:seedFallbackInMemory", "writeFile falhou, usando seed em memoria sem persistir (read-only FS / Vercel)", {
        readError: readError instanceof Error ? readError.message : String(readError),
        writeError: writeError instanceof Error ? writeError.message : String(writeError),
        seedKeys: Object.keys(seed)
      });
    }
  }
}

export async function getPlatformDb(): Promise<PlatformDb> {
  // #region debug-point A:get-db
  __debugEmit("A", "platform-store.ts:getPlatformDb:enter", "getPlatformDb enter", {});
  // #endregion
  await ensureDbFile();

  let raw: string | null = null;
  try {
    raw = await readFile(DB_PATH, "utf8");
  } catch (readError) {
    const seed = createPlatformSeed();
    __debugEmit("A", "platform-store.ts:getPlatformDb:readFailedUsingSeed", "readFile do DB falhou, retornando seed em memoria", {
      error: readError instanceof Error ? readError.message : String(readError),
      seedKeys: Object.keys(seed)
    });
    return seed;
  }

  // #region debug-point A:parse-db
  try {
    const parsed = JSON.parse(raw) as PlatformDb;
    __debugEmit("A", "platform-store.ts:getPlatformDb:ok", "getPlatformDb parsed success", {
      keys: Object.keys(parsed),
      users: Array.isArray(parsed.users) ? parsed.users.length : -1,
      products: Array.isArray(parsed.products) ? parsed.products.length : -1,
      companies: Array.isArray(parsed.companies) ? parsed.companies.length : -1,
      campaigns: Array.isArray(parsed.campaigns) ? parsed.campaigns.length : -1,
      clubOffers: Array.isArray(parsed.clubOffers) ? parsed.clubOffers.length : -1,
      couponRedemptions: Array.isArray(parsed.couponRedemptions) ? parsed.couponRedemptions.length : -1,
      auditLog: Array.isArray(parsed.auditLog) ? parsed.auditLog.length : -1
    });
    return parsed;
  } catch (error) {
    __debugEmit("A", "platform-store.ts:getPlatformDb:parseError", "getPlatformDb parse fail, fallback para seed", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawLength: raw.length,
      rawStart: raw.slice(0, 200)
    });
    return createPlatformSeed();
  }
  // #endregion
}

export async function savePlatformDb(db: PlatformDb) {
  try {
    await ensureDbFile();
    await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    __debugEmit("A", "platform-store.ts:savePlatformDb:writeSkipped", "savePlatformDb não pode escrever (read-only FS). Dados não persistidos mas runtime seguro.", {
      error: err instanceof Error ? err.message : String(err)
    });
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
