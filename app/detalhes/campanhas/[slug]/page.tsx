import { notFound } from "next/navigation";
import { CampaignDetailPage } from "@/components/campaign-detail-page";
import { getPlatformSnapshot, getPublishedCampaignBySlug, getRelatedPublishedCampaigns } from "@/lib/platform-content";
import { isContentVisible } from "@/lib/platform-store";

export const dynamic = "force-dynamic";

export default async function CampaignDetailsRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [campaign, relatedCampaigns, db] = await Promise.all([
    getPublishedCampaignBySlug(slug),
    getRelatedPublishedCampaigns(slug),
    getPlatformSnapshot()
  ]);

  if (!campaign) {
    notFound();
  }

  const relatedProductIds = Array.isArray(campaign.relatedProductIds) ? campaign.relatedProductIds : [];
  const relatedProducts = db.products.filter(
    (product) => isContentVisible(product) && relatedProductIds.includes(product.id)
  );

  return (
    <CampaignDetailPage
      campaign={campaign}
      relatedCampaigns={relatedCampaigns}
      relatedProducts={relatedProducts}
    />
  );
}
