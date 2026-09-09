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
const __debugEmit = async (hyp: string, where: string, msg: string, extra?: Record<string, unknown>) => {
  try {
    await fetch(__dbgServerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: __dbgSessionId,
        ts: Date.now(),
        hypothesis: hyp,
        where,
        message: msg,
        extra: extra ?? {}
      })
    }).catch(() => {});
  } catch {}
};
// #endregion

export function generateStaticParams() {
  // #region debug-point D:detalhes-static-params
  void __debugEmit("D", "app/detalhes/[section]/page.tsx:generateStaticParams", "generateStaticParams chamado", {
    sectionOrderCount: sectionOrder.length,
    sections: sectionOrder
  });
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
  void __debugEmit("D", "app/detalhes/[section]/page.tsx:ClientDetailPage:enter", "Detalhes page SSR iniciado", {
    section,
    inSectionOrder,
    hasCtaPage,
    sectionOrderCount: sectionOrder.length,
    ctaPagesKeys: Object.keys(clientCtaPages)
  });
  // #endregion

  if (!inSectionOrder || !hasCtaPage) {
    // #region debug-point D:detalhes-notfound
    void __debugEmit("D", "app/detalhes/[section]/page.tsx:ClientDetailPage:notFound", "Disparando notFound", {
      section,
      inSectionOrder,
      hasCtaPage
    });
    // #endregion
    notFound();
  }

  return <ClientCtaPage sectionKey={section as SectionKey} />;
}
