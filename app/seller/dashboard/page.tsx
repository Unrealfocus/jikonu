"use client";

import { useState } from "react";
import { useSellerAuth } from "@/context/SellerAuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  mockSellerProducts,
  mockSellerOrders,
  mockSellerStats,
  getSellerOrderStatusLabel,
  getSellerOrderStatusColor,
} from "@/lib/mock-seller-data";

export default function SellerDashboardPage() {
  const { seller, isAuthenticated, logout } = useSellerAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "analytics" | "settings">("overview");

  if (!isAuthenticated) {
    router.push("/seller/auth/login?redirect=/seller/dashboard");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const pendingOrders = mockSellerOrders.filter((o) => o.status === "pending" || o.status === "preparing");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F29727] to-orange-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {seller?.name}!</h1>
              <p className="text-orange-100 mb-1">{seller?.workshop}</p>
              <p className="text-orange-100 text-sm">{seller?.location}</p>
              {seller?.verified && (
                <div className="inline-flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full mt-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Seller
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-colors backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{mockSellerStats.totalProducts}</span>
            </div>
            <p className="text-gray-600 font-semibold">Total Products</p>
            <p className="text-xs text-gray-500 mt-1">{mockSellerStats.activeProducts} active</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{mockSellerStats.pendingOrders}</span>
            </div>
            <p className="text-gray-600 font-semibold">Pending Orders</p>
            <p className="text-xs text-gray-500 mt-1">{mockSellerStats.totalOrders} total</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">${mockSellerStats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-600 font-semibold">Total Revenue</p>
            <p className="text-xs text-green-600 mt-1">+${mockSellerStats.thisMonthRevenue} this month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{mockSellerStats.averageRating}</span>
            </div>
            <p className="text-gray-600 font-semibold">Average Rating</p>
            <p className="text-xs text-gray-500 mt-1">{mockSellerStats.totalReviews} reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-[#F29727] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("products")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "products"
                      ? "bg-[#F29727] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-semibold">My Products</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "orders"
                      ? "bg-[#F29727] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-semibold">Orders</span>
                  {pendingOrders.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {pendingOrders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "analytics"
                      ? "bg-[#F29727] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-semibold">Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-[#F29727] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold">Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                  <div className="space-y-4">
                    {mockSellerOrders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-4 hover:border-[#F29727] transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-mono font-bold text-sm">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.buyerName}</p>
                          </div>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${getSellerOrderStatusColor(
                              order.status
                            )}`}
                          >
                            {getSellerOrderStatusLabel(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {order.items.length} item(s) · ${order.subtotal}
                        </p>
                        <div className="flex gap-2">
                          <button className="text-sm text-[#F29727] hover:underline font-semibold">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Products</h2>
                  <div className="space-y-4">
                    {mockSellerProducts.filter(p => p.status === "active").slice(0, 3).map((product) => (
                      <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white/30 text-xl font-bold">
                            {product.category.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${product.price} · Stock: {product.stockQuantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                  <button className="flex items-center gap-2 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Product
                  </button>
                </div>

                <div className="space-y-4">
                  {mockSellerProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white/30 text-3xl font-bold">
                            {product.category.substring(0, 2).toUpperCase()}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.category}</p>
                            </div>
                            <span
                              className={`text-sm font-bold px-3 py-1 rounded-full ${
                                product.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : product.status === "draft"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {product.status.replace("_", " ").toUpperCase()}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                            <span className="font-bold text-lg text-[#F29727]">${product.price}</span>
                            <span>Stock: {product.stockQuantity}</span>
                            <span>Min Order: {product.minimumOrder}</span>
                          </div>

                          <div className="flex gap-3">
                            <button className="flex items-center gap-2 text-sm font-semibold text-[#F29727] hover:underline">
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>

                <div className="space-y-4">
                  {mockSellerOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-mono font-bold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.createdAt.toLocaleDateString()} · {order.buyerName}
                          </p>
                        </div>
                        <span
                          className={`text-sm font-bold px-4 py-2 rounded-full ${getSellerOrderStatusColor(
                            order.status
                          )}`}
                        >
                          {getSellerOrderStatusLabel(order.status)}
                        </span>
                      </div>

                      <div className="mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-700">
                            {item.productName} × {item.quantity} = ${item.price * item.quantity}
                            {item.includeInspect && (
                              <span className="text-purple-600 ml-2">(Inspection Requested)</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="font-bold text-lg">Total: ${order.subtotal}</span>
                        <div className="flex gap-2">
                          <button className="bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                            Process Order
                          </button>
                          <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-4 py-2 rounded-lg border-2 border-gray-300 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Analytics</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-2">This Month</h3>
                      <p className="text-3xl font-bold text-[#F29727]">${mockSellerStats.thisMonthRevenue}</p>
                      <p className="text-sm text-gray-600 mt-1">Revenue</p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-2">Completed Orders</h3>
                      <p className="text-3xl font-bold text-green-500">{mockSellerStats.completedOrders}</p>
                      <p className="text-sm text-gray-600 mt-1">All time</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Detailed analytics charts coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Workshop Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Workshop Name
                    </label>
                    <input
                      type="text"
                      defaultValue={seller?.workshop}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={seller?.location}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={seller?.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Specialties
                    </label>
                    <input
                      type="text"
                      defaultValue={seller?.specialties.join(", ")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <button className="w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
