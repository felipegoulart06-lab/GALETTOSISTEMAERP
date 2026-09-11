import { notFound, redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import { sectionOrder, type SectionKey } from "@/lib/dashboard-data";


export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
  searchParams
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ catalogo?: string; filtro?: string; categoria?: string }>;
}) {
  const { section } = await params;
  const query = await searchParams;

  // #region debug-point D:section-check
  
  // #endregion

  if (section === "divulgue") {
    redirect("/produtos");
  }

  if (section === "ranking") {
    notFound();
  }

  if (!sectionOrder.includes(section as SectionKey) || section === "home") {
    notFound();
  }

  return (
    <Dashboard
      sectionKey={section as SectionKey}
      productCatalogOpen={section === "produtos" && query.catalogo === "aberto"}
      productCatalogFilter={query.filtro ?? "Todos"}
      mentorshipFilter={section === "mentorias" ? query.categoria ?? "Todas" : "Todas"}
    />
  );
}
