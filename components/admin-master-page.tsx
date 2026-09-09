import { notFound } from "next/navigation";
import { AdminMasterClient } from "@/components/admin-master-client";
import {
  adminMasterSectionOrder,
  type AdminMasterSectionKey
} from "@/lib/admin-master-config";
import { requireAdminSession } from "@/lib/admin-auth";
import { getPlatformDb } from "@/lib/platform-store";

export async function AdminMasterPage({
  sectionKey
}: {
  sectionKey: AdminMasterSectionKey;
}) {
  if (!adminMasterSectionOrder.includes(sectionKey)) {
    notFound();
  }

  const [session, db] = await Promise.all([requireAdminSession(), getPlatformDb()]);

  return <AdminMasterClient sectionKey={sectionKey} initialDb={db} session={session} />;
}
