"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { sampleProducts } from "@/lib/sample-products";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  // Mock wishlist items (first 3 products)
  const [wishlist, setWishlist] = useState(sampleProducts.slice(0, 3));

  // Handle authentication redirect in useEffect to avoid SSR issues
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/account/wishlist");
    }
  }, [isAuthenticated, router]);

  // Show loading state while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F29727] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleRemove = (productId: string) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find((item) => item.id === productId);
    if (product) {
      addToCart(product, 1, false);
      // Optionally remove from wishlist after adding to cart
      // handleRemove(productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F29727] mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Account
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Heart className="w-10 h-10 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            Save your favorite items for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist!
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Product Image */}
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64 bg-gradient-to-br from-orange-200 to-orange-300 cursor-pointer group">
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
                      {product.category.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-semibold">View Details</span>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-6">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#F29727] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    by {product.seller.workshop}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-3xl font-bold text-[#F29727]">
                      ${product.price}
                    </p>
                    {product.inStock ? (
                      <span className="text-sm text-green-600 font-semibold">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        {wishlist.length > 0 && (
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">💡 Tip</h3>
            <p className="text-gray-600">
              Items in your wishlist are saved to your account. You can access them
              anytime from any device!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
