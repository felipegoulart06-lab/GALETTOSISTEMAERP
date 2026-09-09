import { notFound, redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import { sectionOrder, type SectionKey } from "@/lib/dashboard-data";

// #region debug-point D:section-env
const __debugEnv = (() => {
  let u = "http://127.0.0.1:7777/event";
  let s = "vercel-server-crash";
  try {
    const content = require("fs").readFileSync(".dbg/vercel-server-crash.env", "utf8");
    const mu = content.match(/DEBUG_SERVER_URL=(.+)/)?.[1];
    const ms = content.match(/DEBUG_SESSION_ID=(.+)/)?.[1];
    if (mu) u = mu;
    if (ms) s = ms;
  } catch {
  }
  return { u, s };
})();
const __debugEmit = (hypothesisId: string, location: string, msg: string, data: Record<string, unknown> = {}) => {
  try {
    void fetch(__debugEnv.u, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: __debugEnv.s,
        runId: "pre-fix",
        hypothesisId,
        location,
        msg: `[DEBUG] ${msg}`,
        data,
        ts: Date.now()
      })
    }).catch(() => undefined);
  } catch {
  }
};
// #endregion

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
  __debugEmit("D", "app/[section]/page.tsx:enter", "SectionPage enter", {
    section,
    sectionOrderSize: Array.isArray(sectionOrder) ? sectionOrder.length : -1,
    known: sectionOrder.includes(section as SectionKey),
    catalogo: query.catalogo ?? null,
    filtro: query.filtro ?? null,
    categoria: query.categoria ?? null
  });
  // #endregion

  if (section === "divulgue") {
    redirect("/produtos");
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
