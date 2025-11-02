import { getProductById, sampleProducts } from "@/lib/sample-products";
import ProductDetailClient from "./ProductDetailClient";
import Link from "next/link";

// Generate static paths for all products at build time
export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link
          href="/products"
          className="text-[#F29727] hover:underline"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
