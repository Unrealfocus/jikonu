"use client";

import { Product } from "@/types/product";
import { ShoppingCart, Heart, Star, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gradient-to-br from-orange-200 to-orange-300 overflow-hidden cursor-pointer">
          {/* Placeholder gradient - replace with actual image */}
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
            {product.category.substring(0, 2).toUpperCase()}
          </div>

          {/* Verified Badge */}
          {product.seller.verified && (
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 bg-white/90 hover:bg-[#F29727] hover:text-white p-2 rounded-full transition-colors shadow-lg z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-current text-red-500" : ""
              }`}
            />
          </button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-semibold">View Details</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-[#F29727] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 text-xs">{product.seller.workshop}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-current text-yellow-400" />
          <span className="text-sm font-semibold">{product.seller.rating}</span>
          <span className="text-xs text-gray-500">
            ({product.seller.totalOrders} orders)
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-[#F29727]">
              ${product.price}
            </p>
            {product.minimumOrder > 1 && (
              <p className="text-xs text-gray-500">
                Min. order: {product.minimumOrder}
              </p>
            )}
          </div>

          <Link href={`/products/${product.id}`}>
            <button className="bg-[#F29727] hover:bg-[#d97f0f] text-white p-3 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Delivery Time */}
        <div className="mt-3 text-xs text-gray-500 text-center">
          🚚 Delivery: {product.deliveryTime}
        </div>
      </div>
    </div>
  );
}
