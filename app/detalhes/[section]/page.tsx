import { notFound } from "next/navigation";
import { ClientCtaPage } from "@/components/client-cta-page";
import { clientCtaPages } from "@/lib/client-cta-data";
import { sectionOrder, type SectionKey } from "@/lib/dashboard-data";

// #region debug-point D:detalhes-env
let __dbgServerUrl = "http://127.0.0.1:7777/event";
let __dbgSessionId = "vercel-server-crash";
try {
  if (typeof process !== "undefined") {
    try {
      if (typeof require !== "undefined") {
        const envRaw = require("fs").readFileSync(".dbg/vercel-server-crash.env", "utf8") as string;
        envRaw.split(/\r?\n/).forEach((line) => {
          const [k, v] = line.split("=");
          if (!k || !v) return;
          if (k.trim() === "DEBUG_SERVER_URL") __dbgServerUrl = v.trim();
          if (k.trim() === "DEBUG_SESSION_ID") __dbgSessionId = v.trim();
        });
      }
    } catch {}
  }
} catch {}
// #endregion

export function generateStaticParams() {
  // #region debug-point D:detalhes-static-params
  
  // #endregion
  return sectionOrder.map((section) => ({ section }));
}

export default async function ClientDetailPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  const inSectionOrder = sectionOrder.includes(section as SectionKey);
  const hasCtaPage = !!clientCtaPages[section as SectionKey];

  // #region debug-point D:detalhes-page-enter
  
  // #endregion

  if (!inSectionOrder || !hasCtaPage) {
    // #region debug-point D:detalhes-notfound
    
    // #endregion
    notFound();
  }

  return <ClientCtaPage sectionKey={section as SectionKey} />;
}
