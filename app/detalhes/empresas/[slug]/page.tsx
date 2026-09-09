import { notFound } from "next/navigation";
import { CompanyDetailPage } from "@/components/company-detail-page";
import { getPlatformSnapshot, getPublishedCompanyBySlug, getRelatedPublishedCompanies } from "@/lib/platform-content";

export const dynamic = "force-dynamic";

export default async function CompanyDetailsRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [company, relatedCompanies, db] = await Promise.all([
    getPublishedCompanyBySlug(slug),
    getRelatedPublishedCompanies(slug),
    getPlatformSnapshot()
  ]);

  if (!company) {
    notFound();
  }

  const clubaoOffers = db.clubOffers.filter((offer) => company.linkedOfferIds.includes(offer.id));
  const affiliateServices = db.referralServices.filter((service) => company.linkedServiceIds.includes(service.id));

  return <CompanyDetailPage company={company} relatedCompanies={relatedCompanies} clubaoOffers={clubaoOffers} affiliateServices={affiliateServices} />;
}
