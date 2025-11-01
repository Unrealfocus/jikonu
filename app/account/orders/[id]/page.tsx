"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Shield,
} from "lucide-react";
import { getOrderById, getOrderStatusLabel, getOrderStatusColor } from "@/lib/mock-orders";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const order = getOrderById(params.id as string);

  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/account");
    return null;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Link
            href="/account"
            className="inline-block bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  // Order status steps
  const orderSteps = [
    {
      status: "payment_held",
      icon: DollarSign,
      title: "Payment Held in Escrow",
      description: "Your payment is securely held by AbaTrade",
      completed: true,
    },
    {
      status: "in_inspection",
      icon: Shield,
      title: "Quality Inspection",
      description: "Inspector verifying product quality",
      completed: ["in_inspection", "approved", "in_transit", "delivered", "completed"].includes(order.status),
    },
    {
      status: "approved",
      icon: CheckCircle2,
      title: "Approved for Shipping",
      description: "Order approved and ready to ship",
      completed: ["approved", "in_transit", "delivered", "completed"].includes(order.status),
    },
    {
      status: "in_transit",
      icon: Truck,
      title: "In Transit",
      description: "Package is on its way to you",
      completed: ["in_transit", "delivered", "completed"].includes(order.status),
    },
    {
      status: "delivered",
      icon: Package,
      title: "Delivered",
      description: "Package has been delivered",
      completed: ["delivered", "completed"].includes(order.status),
    },
  ];

  const currentStepIndex = orderSteps.findIndex((step) => step.status === order.status);

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
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
              <p className="text-gray-600">
                Order ID: <span className="font-mono font-bold">{order.id}</span>
              </p>
            </div>
            <span
              className={`text-sm font-bold px-6 py-3 rounded-full ${getOrderStatusColor(
                order.status
              )}`}
            >
              {getOrderStatusLabel(order.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#F29727]" />
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold text-gray-900">
                  {order.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#F29727]" />
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold text-gray-900">{order.estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-[#F29727]" />
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-gray-900 text-xl">${order.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Tracking Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Tracking</h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

            <div className="space-y-8">
              {orderSteps.map((step, index) => (
                <div key={step.status} className="relative flex gap-6">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                      step.completed
                        ? "bg-[#F29727] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        {step.completed && (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        )}
                        {!step.completed && order.status === step.status && (
                          <Clock className="w-6 h-6 text-[#F29727] animate-pulse" />
                        )}
                      </div>
                      <p className="text-gray-600">{step.description}</p>

                      {step.completed && (
                        <p className="text-sm text-green-600 font-semibold mt-2">
                          ✓ Completed
                        </p>
                      )}
                      {!step.completed && order.status === step.status && (
                        <p className="text-sm text-[#F29727] font-semibold mt-2">
                          ⏳ In Progress
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>

              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-6 pb-6 border-b border-gray-200 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white/30 text-3xl font-bold">
                        {item.product.category.substring(0, 2).toUpperCase()}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-[#F29727] transition-colors mb-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        by {item.product.seller.workshop}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: ${item.product.price}</span>
                      </div>
                      {item.includeInspect && (
                        <div className="mt-2 inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                          <Shield className="w-3 h-3" />
                          AbaTrade Inspect™ Included
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#F29727]">
                        ${item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${order.subtotal}</span>
                </div>
                {order.inspectFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>AbaTrade Inspect™:</span>
                    <span className="font-semibold">${order.inspectFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee:</span>
                  <span className="font-semibold">${order.shippingFee}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-[#F29727]">${order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F29727]" />
                Delivery Address
              </h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-semibold text-gray-900">
                  {order.shippingAddress.fullName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p className="pt-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {order.shippingAddress.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {order.shippingAddress.email}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-3 px-4 rounded-xl transition-colors">
                  Contact Support
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl border-2 border-gray-300 transition-colors">
                  Download Invoice
                </button>
                {order.status === "delivered" && (
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    Confirm Delivery
                  </button>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                🔒 Buyer Protection
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Payment held in escrow
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Quality guaranteed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Full refund if unsatisfied
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
