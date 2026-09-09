import { notFound } from "next/navigation";
import ReferralServiceDetailWrapper from "@/components/referral-service-detail-page";
import { getPlatformSnapshot } from "@/lib/platform-content";
import type { CompanyRecord, ReferralServiceRecord } from "@/lib/platform-types";

export const dynamic = "force-dynamic";

export default async function ReferralServiceDetailRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const db = await getPlatformSnapshot();
  const servicesSafe: ReferralServiceRecord[] = Array.isArray((db as any)?.referralServices) ? (db as any).referralServices : [];
  const companiesSafe: CompanyRecord[] = Array.isArray((db as any)?.companies) ? (db as any).companies : [];

  const service =
    servicesSafe.find((item) => typeof (item as any)?.slug === "string" && (item as any).slug === decoded) ??
    servicesSafe.find((item) => String(item.id) === decoded) ??
    servicesSafe.find((item) => (item as any)?.publicCode === decoded) ??
    null;

  if (!service) {
    notFound();
  }

  const relatedCompany = companiesSafe.find((company) => company.id === service.companyId);

  return ReferralServiceDetailWrapper({
    service,
    relatedCompany,
    relatedServices: servicesSafe.slice(0, 8)
  });
}
