"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  Star,
  MapPin,
  CheckCircle2,
  Truck,
  Shield,
  Award,
  Minus,
  Plus,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [includeInspect, setIncludeInspect] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, includeInspect);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const inspectFee = includeInspect ? 25 : 0;
  const subtotal = product.price * quantity;
  const total = subtotal + inspectFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#F29727]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#F29727]">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl h-96 lg:h-[500px] flex items-center justify-center mb-4 relative">
              <div className="text-white/20 text-8xl font-bold">
                {product.category.substring(0, 2).toUpperCase()}
              </div>
              {product.seller.verified && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Seller
                </div>
              )}
            </div>

            {/* Thumbnail images placeholder */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg h-20 cursor-pointer hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.seller.rating)
                          ? "fill-current text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">
                  {product.seller.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.seller.totalOrders} orders)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-4xl font-bold text-[#F29727] mb-2">
                  ${product.price}
                </p>
                {product.minimumOrder > 1 && (
                  <p className="text-sm text-gray-600">
                    Minimum order quantity: {product.minimumOrder} units
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(product.minimumOrder, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* AbaTrade Inspect */}
              <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInspect}
                    onChange={(e) => setIncludeInspect(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#F29727] rounded focus:ring-[#F29727]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-5 h-5 text-[#F29727]" />
                      <span className="font-bold text-gray-900">
                        Add AbaTrade Inspect™
                      </span>
                      <span className="font-bold text-[#F29727]">+$25</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Our inspector visits the workshop before shipping to verify
                      quality and send you photos.
                    </p>
                  </div>
                </label>
              </div>

              {/* Price Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                {includeInspect && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">AbaTrade Inspect™:</span>
                    <span className="font-semibold">$25</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-[#F29727]">
                    ${total}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button className="bg-white hover:bg-gray-50 border-2 border-gray-300 p-4 rounded-xl transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* View Cart Link */}
              {addedToCart && (
                <Link
                  href="/cart"
                  className="block mt-4 text-center text-[#F29727] font-semibold hover:underline"
                >
                  View Cart & Checkout →
                </Link>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <Shield className="w-6 h-6 text-[#F29727] mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900">
                  Escrow Protected
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <Truck className="w-6 h-6 text-[#F29727] mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900">
                  {product.deliveryTime}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <Award className="w-6 h-6 text-[#F29727] mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900">
                  Quality Verified
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About the Artisan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {product.seller.name}
              </h3>
              <p className="text-[#F29727] font-semibold mb-4">
                {product.seller.workshop}
              </p>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span>{product.seller.location}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <span className="font-bold">{product.seller.rating}</span>
                </div>
                <span className="text-gray-600">
                  {product.seller.totalOrders} completed orders
                </span>
              </div>
              <p className="text-gray-600">
                {product.seller.yearsExperience}+ years of experience in
                traditional Nigerian craftsmanship
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <p className="font-bold text-gray-900">Verified Seller</p>
                <p className="text-sm text-gray-600">ID & workshop verified</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl">
                <Award className="w-8 h-8 text-[#F29727] mb-2" />
                <p className="font-bold text-gray-900">Quality Products</p>
                <p className="text-sm text-gray-600">High customer ratings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <span className="font-semibold text-gray-900">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
