"use client";

import Link from "next/link";
import { SellerProduct } from "@/types/seller";
import { Edit, Eye, Trash2, Package, DollarSign } from "lucide-react";

interface SellerProductCardProps {
  product: SellerProduct;
  onDelete: (productId: string) => void;
}

export function SellerProductCard({ product, onDelete }: SellerProductCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "out_of_stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "draft":
        return "Draft";
      case "out_of_stock":
        return "Out of Stock";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-200">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-200 to-orange-300">
        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-5xl font-bold">
          {product.category.substring(0, 2).toUpperCase()}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(product.status)}`}>
            {getStatusText(product.status)}
          </span>
        </div>

        {/* Image Count */}
        {product.images.length > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {product.images.length} {product.images.length === 1 ? 'image' : 'images'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#F29727]" />
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{product.stockQuantity} units</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/seller/products/view/${product.id}`}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
          <Link
            href={`/seller/products/edit/${product.id}`}
            className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Created: {product.createdAt.toLocaleDateString()}</span>
            <span>Min Order: {product.minimumOrder}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
