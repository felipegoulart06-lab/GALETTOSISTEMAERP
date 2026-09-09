import { AdminMasterPage } from "@/components/admin-master-page";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return <AdminMasterPage sectionKey="resumo" />;
}
