"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;

  // In a real app, you'd fetch order details from an API
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    estimatedDelivery: "21-30 days",
    status: "payment_held",
    email: "customer@email.com",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase from AbaTrade
            </p>
            <p className="text-sm text-gray-500">
              Order ID: <span className="font-mono font-bold">{order.id}</span>
            </p>
          </div>

          {/* Order Status Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#F29727] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Payment Held in Escrow
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your payment of is securely held by AbaTrade. The seller has
                    been notified and will prepare your order.
                  </p>
                  <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    COMPLETED
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Order Preparation
                  </h3>
                  <p className="text-sm text-gray-600">
                    The artisan will prepare your order. If you selected AbaTrade
                    Inspect™, our inspector will verify quality before shipping.
                  </p>
                  <div className="mt-2 inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                    IN PROGRESS
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Shipping & Tracking
                  </h3>
                  <p className="text-sm text-gray-600">
                    AbaTrade Logistics will handle shipping from Aba to Houston.
                    You'll receive tracking information via email.
                  </p>
                  <div className="mt-2 inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                    PENDING
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Delivery & Confirmation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Once delivered, confirm receipt to release payment to the
                    seller. Payment is only released after your approval.
                  </p>
                  <div className="mt-2 inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                    PENDING
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#F29727] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-900">{order.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#F29727] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">
                    {order.estimatedDelivery}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F29727] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">
                    Confirmation sent to
                  </p>
                  <p className="font-semibold text-gray-900">{order.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-[#F29727] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold text-gray-900 font-mono">
                    {order.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">
              📧 Check Your Email
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              We've sent a detailed confirmation to <strong>{order.email}</strong>
            </p>
            <p className="text-sm text-gray-600">
              This email contains your order summary, tracking information, and
              important instructions for the delivery process.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-xl border-2 border-gray-300 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link href="/contact" className="text-[#F29727] hover:underline font-semibold">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
