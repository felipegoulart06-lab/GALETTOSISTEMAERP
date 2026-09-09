import { notFound } from "next/navigation";
import { SupplierListDetailPage } from "@/components/supplier-list-detail-page";
import { getPublishedSupplierListBySlug } from "@/lib/platform-content";

export const dynamic = "force-dynamic";

export default async function SupplierListDetailsRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supplierList = await getPublishedSupplierListBySlug(slug);

  if (!supplierList) {
    notFound();
  }

  return <SupplierListDetailPage supplierList={supplierList} />;
}
