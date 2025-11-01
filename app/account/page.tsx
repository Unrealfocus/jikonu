"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Settings,
  Heart,
  ShoppingBag,
  LogOut,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { mockOrders, getOrderStatusLabel, getOrderStatusColor } from "@/lib/mock-orders";

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, getCartTotal, getCartCount } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "settings">("overview");

  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/account");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const activeOrders = mockOrders.filter(
    (order) => order.status !== "completed" && order.status !== "delivered"
  );

  const completedOrders = mockOrders.filter(
    (order) => order.status === "completed" || order.status === "delivered"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F29727] to-orange-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-[#F29727]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.name}!</h1>
                <p className="text-orange-100">{user?.email}</p>
              </div>
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-[#F29727]" />
              <span className="text-2xl font-bold text-gray-900">{activeOrders.length}</span>
            </div>
            <p className="text-gray-600 font-semibold">Active Orders</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{completedOrders.length}</span>
            </div>
            <p className="text-gray-600 font-semibold">Completed Orders</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{getCartCount()}</span>
            </div>
            <p className="text-gray-600 font-semibold">Cart Items</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <p className="text-gray-600 font-semibold">Wishlist Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modern Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-[#F29727] to-orange-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-[#F29727]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">My Account</h3>
                    <p className="text-orange-100 text-xs truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              <nav className="py-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "overview"
                      ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                      : ""
                    }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-medium">Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "orders"
                      ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                      : ""
                    }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  <span className="font-medium">My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "addresses"
                      ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                      : ""
                    }`}
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="font-medium">Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "settings"
                      ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                      : ""
                    }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-medium">Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Current Cart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Current Cart</h2>
                    <Link
                      href="/cart"
                      className="text-[#F29727] hover:underline font-semibold flex items-center gap-1"
                    >
                      View Cart
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Your cart is empty</p>
                      <Link
                        href="/products"
                        className="inline-block bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.slice(0, 3).map((item) => (
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
                            <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} × ${item.product.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-[#F29727]">
                              ${item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Cart Total:</span>
                          <span className="text-2xl font-bold text-[#F29727]">
                            ${getCartTotal()}
                          </span>
                        </div>
                      </div>

                      <Link href="/checkout">
                        <button className="w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-4 px-6 rounded-xl transition-colors">
                          Proceed to Checkout
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Active Orders */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Active Orders</h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-[#F29727] hover:underline font-semibold flex items-center gap-1"
                    >
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {activeOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No active orders</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeOrders.slice(0, 3).map((order) => (
                        <Link
                          key={order.id}
                          href={`/account/orders/${order.id}`}
                          className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-mono text-sm text-gray-600">{order.id}</p>
                              <p className="text-xs text-gray-500">
                                {order.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${getOrderStatusColor(
                                order.status
                              )}`}
                            >
                              {getOrderStatusLabel(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {order.items.length} item(s) · ${order.total}
                          </p>
                          <p className="text-xs text-gray-500">
                            Est. Delivery: {order.estimatedDelivery}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/account/orders/${order.id}`}
                      className="block border border-gray-200 rounded-xl p-6 hover:border-[#F29727] hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-mono font-bold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            Ordered on {order.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`text-sm font-bold px-4 py-2 rounded-full ${getOrderStatusColor(
                            order.status
                          )}`}
                        >
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white/30 text-xl font-bold">
                                {item.product.category.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="text-xl font-bold text-[#F29727]">
                          ${order.total}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    Add New Address
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">Home</h3>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        Default
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {user?.name}
                      <br />
                      4567 Main Street, Apt 2B
                      <br />
                      Houston, TX 77002
                      <br />
                      +1 (713) 555-0123
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button className="text-[#F29727] hover:underline font-semibold text-sm">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline font-semibold text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      />
                    </div>
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
