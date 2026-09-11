import { notFound } from "next/navigation";
import { ClientCtaPage } from "@/components/client-cta-page";
import { clientCtaPages } from "@/lib/client-cta-data";
import { sectionOrder, type SectionKey } from "@/lib/dashboard-data";

export function generateStaticParams() {
  // #region debug-point D:detalhes-static-params
  
  // #endregion
  return sectionOrder.map((section) => ({ section }));
}

export default async function ClientDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { section } = await params;
  const { categoria } = await searchParams;

  const inSectionOrder = sectionOrder.includes(section as SectionKey);
  const hasCtaPage = !!clientCtaPages[section as SectionKey];

  // #region debug-point D:detalhes-page-enter
  
  // #endregion

  if (section === "ranking" || !inSectionOrder || !hasCtaPage) {
    // #region debug-point D:detalhes-notfound
    
    // #endregion
    notFound();
  }

  return <ClientCtaPage sectionKey={section as SectionKey} selectedFilter={categoria} />;
}
