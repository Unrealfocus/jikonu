"use client";

import { useRouter } from "next/navigation";
import { useSellerAuth } from "@/context/SellerAuthContext";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Eye, EyeOff, Package, DollarSign, Clock, Tag } from "lucide-react";
import { mockSellerProducts } from "@/lib/mock-seller-data";

interface ViewProductClientProps {
  productId: string;
}

export default function ViewProductClient({ productId }: ViewProductClientProps) {
  const { isAuthenticated } = useSellerAuth();
  const router = useRouter();

  const product = mockSellerProducts.find((p) => p.id === productId);

  if (!isAuthenticated) {
    router.push("/seller/auth/login?redirect=/seller/dashboard");
    return null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link
            href="/seller/dashboard"
            className="inline-block bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/seller/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F29727] mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        {/* Header with Actions */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600">Product Details & Information</p>
          </div>

          <div className="flex gap-3">
            <Link href={`/seller/products/edit/${product.id}`}>
              <button className="flex items-center gap-2 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                <Edit className="w-5 h-5" />
                Edit Product
              </button>
            </Link>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3 rounded-xl border-2 border-gray-300 transition-colors">
              <Trash2 className="w-5 h-5 text-red-500" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center"
                  >
                    <span className="text-white/30 text-4xl font-bold">
                      {product.category.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                ))}
                {product.images.length === 0 && (
                  <div className="col-span-2 md:col-span-3 text-center py-12 text-gray-400">
                    No images uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Description
                  </label>
                  <p className="text-gray-900">{product.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Category
                    </label>
                    <p className="text-gray-900">{product.category}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        {key}
                      </label>
                      <p className="text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Product Status</h3>

              <div className="space-y-4">
                <div>
                  <span
                    className={`inline-block text-sm font-bold px-4 py-2 rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : product.status === "draft"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status === "active" && (
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        ACTIVE
                      </span>
                    )}
                    {product.status === "draft" && (
                      <span className="flex items-center gap-2">
                        <EyeOff className="w-4 h-4" />
                        DRAFT
                      </span>
                    )}
                    {product.status === "out_of_stock" && (
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        OUT OF STOCK
                      </span>
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Created: {product.createdAt.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated: {product.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Pricing & Inventory</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#F29727]" />
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Stock Quantity</p>
                      <p className="text-2xl font-bold text-gray-900">{product.stockQuantity}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum Order:</span>
                    <span className="font-semibold text-gray-900">
                      {product.minimumOrder} units
                    </span>
                  </div>

                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {product.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full text-center bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl border-2 border-gray-300 transition-colors"
                >
                  View on Marketplace
                </Link>

                <button
                  className="w-full text-center bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl border-2 border-gray-300 transition-colors"
                >
                  Duplicate Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
