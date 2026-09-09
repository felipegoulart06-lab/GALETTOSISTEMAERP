import { notFound } from "next/navigation";
import { ClientCtaPage } from "@/components/client-cta-page";
import { clientCtaPages } from "@/lib/client-cta-data";
import { sectionOrder, type SectionKey } from "@/lib/dashboard-data";

export function generateStaticParams() {
  return sectionOrder.map((section) => ({ section }));
}

export default async function ClientDetailPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!sectionOrder.includes(section as SectionKey) || !clientCtaPages[section as SectionKey]) {
    notFound();
  }

  return <ClientCtaPage sectionKey={section as SectionKey} />;
}
