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
  FileText,
  Download,
  Eye,
} from "lucide-react";
import { getOrderById, getOrderStatusLabel, getOrderStatusColor } from "@/lib/mock-orders";
import { mockInspectionRequests } from "@/lib/mock-inspection-data";

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

  // Find inspection report for this order
  const inspection = mockInspectionRequests.find((i) => i.orderId === order.id);
  const hasInspection = order.items.some((item) => item.includeInspect);
  const inspectionCompleted = inspection?.status === "completed" || inspection?.status === "approved";

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

        {/* Inspection Report Section */}
        {hasInspection && inspection && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    AbaTrade Inspect™ Report
                  </h2>
                  <p className="text-sm text-gray-600">Quality assurance inspection</p>
                </div>
              </div>
              {inspectionCompleted && (
                <span className="bg-green-100 text-green-700 text-sm font-bold px-4 py-2 rounded-full">
                  ✓ Inspection Complete
                </span>
              )}
              {!inspectionCompleted && (
                <span className="bg-yellow-100 text-yellow-700 text-sm font-bold px-4 py-2 rounded-full">
                  ⏳ Inspection In Progress
                </span>
              )}
            </div>

            {!inspectionCompleted ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Inspection Scheduled
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Our certified inspector is scheduled to verify product quality before
                      shipment. You'll be notified once the inspection is complete.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Inspector</p>
                        <p className="font-semibold">David Chen (INSP-001)</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Scheduled Date</p>
                        <p className="font-semibold">
                          {inspection.scheduledDate?.toLocaleDateString() || "TBD"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {inspection.report && (
                  <div className="space-y-6">
                    {/* Quality Score */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {inspection.report.qualityScore}
                        </div>
                        <p className="text-sm text-blue-900 font-semibold">
                          Quality Score
                        </p>
                        <p className="text-xs text-blue-700 mt-1">Out of 100</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {inspection.report.passedChecks}/{inspection.report.totalChecks}
                        </div>
                        <p className="text-sm text-green-900 font-semibold">
                          Checks Passed
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          {inspection.report.failedChecks} failed
                        </p>
                      </div>

                      <div
                        className={`rounded-xl p-6 text-center ${
                          inspection.report.overallStatus === "pass"
                            ? "bg-gradient-to-br from-green-50 to-green-100"
                            : inspection.report.overallStatus === "conditional_pass"
                            ? "bg-gradient-to-br from-yellow-50 to-yellow-100"
                            : "bg-gradient-to-br from-red-50 to-red-100"
                        }`}
                      >
                        <div
                          className={`text-4xl font-bold mb-2 ${
                            inspection.report.overallStatus === "pass"
                              ? "text-green-600"
                              : inspection.report.overallStatus === "conditional_pass"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {inspection.report.overallStatus === "pass"
                            ? "✓"
                            : inspection.report.overallStatus === "conditional_pass"
                            ? "⚠"
                            : "✗"}
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            inspection.report.overallStatus === "pass"
                              ? "text-green-900"
                              : inspection.report.overallStatus === "conditional_pass"
                              ? "text-yellow-900"
                              : "text-red-900"
                          }`}
                        >
                          {inspection.report.overallStatus.replace("_", " ").toUpperCase()}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            inspection.report.overallStatus === "pass"
                              ? "text-green-700"
                              : inspection.report.overallStatus === "conditional_pass"
                              ? "text-yellow-700"
                              : "text-red-700"
                          }`}
                        >
                          Overall Status
                        </p>
                      </div>
                    </div>

                    {/* Report Summary */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#F29727]" />
                        Inspector Summary
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {inspection.report.summary}
                      </p>
                    </div>

                    {/* Recommendations */}
                    {inspection.report.recommendations.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-3">
                          Recommendations
                        </h3>
                        <ul className="space-y-2">
                          {inspection.report.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                        <Eye className="w-5 h-5" />
                        View Full Report
                      </button>
                      <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3 rounded-xl border-2 border-gray-300 transition-colors">
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                    </div>

                    {/* Buyer Override Option (if needed) */}
                    {inspection.report.overallStatus !== "pass" && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-orange-600" />
                          Buyer Override Available
                        </h3>
                        <p className="text-gray-700 mb-4">
                          The inspection found some issues. You can choose to proceed with the
                          order anyway or request a full refund. Your payment remains in escrow
                          until you make a decision.
                        </p>
                        <div className="flex gap-3">
                          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                            Proceed with Order
                          </button>
                          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                            Request Refund
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

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
