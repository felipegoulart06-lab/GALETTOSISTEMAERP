import { Dashboard } from "@/components/user-dashboard";


export const dynamic = "force-dynamic";

export default function HomePage() {
  // #region debug-point D:home-render
  
  // #endregion
  return <Dashboard sectionKey="home" />;
}
