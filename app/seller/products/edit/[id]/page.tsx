import EditProductClient from "./EditProductClient";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In Next.js 15, params is a Promise
  const { id } = await params;

  return <EditProductClient productId={id} />;
}
