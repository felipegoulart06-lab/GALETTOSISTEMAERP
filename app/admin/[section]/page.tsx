import { notFound } from "next/navigation";
import { AdminMasterPage } from "@/components/admin-master-page";
import {
  adminMasterSectionOrder,
  type AdminMasterSectionKey
} from "@/lib/admin-master-config";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return adminMasterSectionOrder
    .filter((section) => section !== "resumo")
    .map((section) => ({ section }));
}

export default async function AdminSectionPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!adminMasterSectionOrder.includes(section as AdminMasterSectionKey) || section === "resumo") {
    notFound();
  }

  return <AdminMasterPage sectionKey={section as AdminMasterSectionKey} />;
}
