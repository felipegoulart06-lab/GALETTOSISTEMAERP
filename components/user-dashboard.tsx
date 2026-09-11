import { DashboardView } from "@/components/dashboard";
import { loadDashboardPayload } from "@/lib/platform-content";
import type { SectionKey } from "@/lib/dashboard-data";

export async function Dashboard({
  sectionKey,
  productCatalogOpen = false,
  productCatalogFilter = "Todos",
  mentorshipFilter = "Todas"
}: {
  sectionKey: SectionKey;
  productCatalogOpen?: boolean;
  productCatalogFilter?: string;
  mentorshipFilter?: string;
}) {
  const payload = await loadDashboardPayload();

  return (
    <DashboardView
      sectionKey={sectionKey}
      productCatalogOpen={productCatalogOpen}
      productCatalogFilter={productCatalogFilter}
      mentorshipFilter={mentorshipFilter}
      sections={payload.sections}
      publishedProducts={payload.publishedProducts}
      snapshot={{
        clubOffers: payload.snapshot.clubOffers,
        couponRedemptions: payload.snapshot.couponRedemptions,
        spinWheels: payload.snapshot.spinWheels,
        lives: payload.snapshot.lives
      }}
    />
  );
}
