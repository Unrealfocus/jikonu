"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, Shield } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, toggleInspect, getCartTotal, getInspectTotal, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const cartTotal = getCartTotal();
  const inspectTotal = getInspectTotal();
  const shippingFee = 50; // Flat rate for pilot
  const total = cartTotal + inspectTotal + shippingFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white/30 text-3xl font-bold">
                      {item.product.category.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-[#F29727] transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600">
                          by {item.product.seller.workshop}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-2xl font-bold text-[#F29727] mb-4">
                      ${item.product.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-semibold text-gray-700">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">
                        Subtotal: ${item.product.price * item.quantity}
                      </span>
                    </div>

                    {/* Inspect Option */}
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.includeInspect}
                          onChange={() => toggleInspect(item.product.id)}
                          className="mt-1 w-5 h-5 text-[#F29727] rounded focus:ring-[#F29727]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-4 h-4 text-[#F29727]" />
                            <span className="font-bold text-sm text-gray-900">
                              AbaTrade Inspect™
                            </span>
                            <span className="font-bold text-sm text-[#F29727]">
                              +$25
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Pre-shipping quality verification with photos
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-block text-[#F29727] font-semibold hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({getCartCount()} items):
                  </span>
                  <span className="font-semibold">${cartTotal}</span>
                </div>

                {inspectTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">AbaTrade Inspect™:</span>
                    <span className="font-semibold">${inspectTotal}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping to Houston:</span>
                  <span className="font-semibold">${shippingFee}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-[#F29727]">
                      ${total}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors mb-4"
              >
                {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
              </button>

              {/* Trust Indicators */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Secure escrow payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Verified sellers only</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Full buyer protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
