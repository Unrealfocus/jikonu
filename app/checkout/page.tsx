"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShippingAddress } from "@/types/product";
import { CheckCircle2, CreditCard, MapPin, Shield, Package } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, getInspectTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "Houston",
    state: "TX",
    zipCode: "",
    country: "USA",
  });

  const cartTotal = getCartTotal();
  const inspectTotal = getInspectTotal();
  const shippingFee = 50;
  const total = cartTotal + inspectTotal + shippingFee;

  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/checkout");
    return null;
  }

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment and create order
      const orderId = "ORD-" + Date.now();
      clearCart();
      router.push(`/orders/${orderId}`);
    }
  };

  const updateShipping = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress({ ...shippingAddress, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Review" },
              { num: 3, label: "Payment" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                    step >= s.num
                      ? "bg-[#F29727] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-6 h-6" /> : s.num}
                </div>
                <div
                  className={`ml-2 mr-2 font-semibold ${
                    step >= s.num ? "text-[#F29727]" : "text-gray-600"
                  }`}
                >
                  {s.label}
                </div>
                {idx < 2 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      step > s.num ? "bg-[#F29727]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-[#F29727]" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Shipping Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.fullName}
                          onChange={(e) => updateShipping("fullName", e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => updateShipping("phone", e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => updateShipping("email", e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) => updateShipping("address", e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => updateShipping("city", e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.state}
                          onChange={(e) => updateShipping("state", e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.zipCode}
                          onChange={(e) => updateShipping("zipCode", e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors"
                  >
                    Continue to Review
                  </button>
                </div>
              )}

              {/* Step 2: Review Order */}
              {step === 2 && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-[#F29727]" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Review Your Order
                    </h2>
                  </div>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white/30 text-2xl font-bold">
                            {item.product.category.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} × ${item.product.price}
                          </p>
                          {item.includeInspect && (
                            <p className="text-sm text-[#F29727] font-semibold">
                              + AbaTrade Inspect™ ($25)
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="p-4 bg-gray-50 rounded-lg mb-6">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-sm text-gray-600">
                      {shippingAddress.fullName}
                      <br />
                      {shippingAddress.address}
                      <br />
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.zipCode}
                      <br />
                      {shippingAddress.phone}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-[#F29727] hover:underline font-semibold mt-2"
                    >
                      Edit Address
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-xl border-2 border-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-[#F29727]" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Secure Payment
                    </h2>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-[#F29727] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          Escrow Protection
                        </h3>
                        <p className="text-sm text-gray-600">
                          Your payment will be held securely by AbaTrade until you
                          confirm receipt and satisfaction with your order. The
                          seller will only receive payment after your approval.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-xl border-2 border-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors"
                    >
                      Place Order - ${total}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${cartTotal}</span>
                </div>
                {inspectTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">AbaTrade Inspect™:</span>
                    <span className="font-semibold">${inspectTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">${shippingFee}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-[#F29727]">
                  ${total}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure escrow payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Buyer protection guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
