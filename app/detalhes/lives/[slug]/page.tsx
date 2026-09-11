import { notFound } from "next/navigation";
import { LiveWatchPage } from "@/components/live-watch-page";
import { getPublishedLiveBySlug } from "@/lib/platform-content";

export const dynamic = "force-dynamic";

export default async function LiveWatchRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const live = await getPublishedLiveBySlug(slug);

  if (!live) {
    notFound();
  }

  return <LiveWatchPage live={live} />;
}
