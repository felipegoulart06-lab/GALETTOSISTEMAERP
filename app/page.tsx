import { Dashboard } from "@/components/dashboard";

// #region debug-point D:home-env
const __debugEnv = (() => {
  let u = "http://127.0.0.1:7777/event";
  let s = "vercel-server-crash";
  try {
    if (typeof require !== "undefined") {
      const content = require("fs").readFileSync(".dbg/vercel-server-crash.env", "utf8");
      const mu = content.match(/DEBUG_SERVER_URL=(.+)/)?.[1];
      const ms = content.match(/DEBUG_SESSION_ID=(.+)/)?.[1];
      if (mu) u = mu;
      if (ms) s = ms;
    }
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

export default function HomePage() {
  // #region debug-point D:home-render
  __debugEmit("D", "app/page.tsx:HomePage:render", "HomePage render started", {});
  // #endregion
  return <Dashboard sectionKey="home" />;
}
