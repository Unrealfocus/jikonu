import InspectionDetailClient from "./InspectionDetailClient";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default async function InspectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In Next.js 15, params is a Promise
  const { id } = await params;

  return <InspectionDetailClient inspectionId={id} />;
}
