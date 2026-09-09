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

  const safeLinkedOfferIds = Array.isArray(company.linkedOfferIds) ? company.linkedOfferIds : [];
  const safeLinkedServiceIds = Array.isArray(company.linkedServiceIds) ? company.linkedServiceIds : [];
  const safeClubOffers = Array.isArray(db.clubOffers) ? db.clubOffers : [];
  const safeReferralServices = Array.isArray(db.referralServices) ? db.referralServices : [];

  const clubaoOffers = safeClubOffers.filter((offer) => safeLinkedOfferIds.includes(offer.id));
  const affiliateServices = safeReferralServices.filter((service) => safeLinkedServiceIds.includes(service.id));

  return (
    <CompanyDetailPage
      company={company}
      relatedCompanies={Array.isArray(relatedCompanies) ? relatedCompanies : []}
      clubaoOffers={clubaoOffers}
      affiliateServices={affiliateServices}
    />
  );
}

