import { notFound } from "next/navigation";
import { MentorshipDetailPage } from "@/components/mentorship-detail-page";
import { getPublishedMentorshipBySlug } from "@/lib/platform-content";

export const dynamic = "force-dynamic";

export default async function MentorshipDetailsRoute({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mentorship = await getPublishedMentorshipBySlug(slug);

  if (!mentorship) {
    notFound();
  }

  return <MentorshipDetailPage mentorship={mentorship} />;
}
