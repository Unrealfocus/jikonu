"use client";

import { useState, useMemo } from "react";
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
  Search,
  Filter,
  Shield,
} from "lucide-react";
import {
  mockSellerProducts,
  mockSellerOrders,
  mockSellerStats,
  getSellerOrderStatusLabel,
  getSellerOrderStatusColor,
} from "@/lib/mock-seller-data";
import { SellerProductCard } from "@/app/components/seller/SellerProductCard";
import { DeleteConfirmationModal } from "@/app/components/seller/DeleteConfirmationModal";
import { mockInspectionRequests } from "@/lib/mock-inspection-data";

export default function SellerDashboardPage() {
  const { seller, isAuthenticated, logout } = useSellerAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "analytics" | "settings">("overview");

  // Product filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("all");

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);

  // Products state (in real app, would fetch from API)
  const [products, setProducts] = useState(mockSellerProducts);

  if (!isAuthenticated) {
    router.push("/seller/auth/login?redirect=/seller/dashboard");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setProductToDelete({ id: product.id, name: product.name });
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  // Get unique categories for filter
  const categories = Array.from(new Set(mockSellerProducts.map((p) => p.category)));

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

      // Status filter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;

      // Price range filter
      let matchesPrice = true;
      if (priceRangeFilter === "0-50") {
        matchesPrice = product.price < 50;
      } else if (priceRangeFilter === "50-100") {
        matchesPrice = product.price >= 50 && product.price < 100;
      } else if (priceRangeFilter === "100-200") {
        matchesPrice = product.price >= 100 && product.price < 200;
      } else if (priceRangeFilter === "200+") {
        matchesPrice = product.price >= 200;
      }

      return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, priceRangeFilter]);

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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{mockSellerStats.totalProducts}</span>
            </div>
            <p className="text-gray-600 font-semibold">Total Products</p>
            <p className="text-xs text-gray-500 mt-1">{mockSellerStats.activeProducts} active</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{mockSellerStats.pendingOrders}</span>
            </div>
            <p className="text-gray-600 font-semibold">Pending Orders</p>
            <p className="text-xs text-gray-500 mt-1">{mockSellerStats.totalOrders} total</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">${mockSellerStats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-600 font-semibold">Total Revenue</p>
            <p className="text-xs text-green-600 mt-1">+${mockSellerStats.thisMonthRevenue} this month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{mockSellerStats.averageRating}</span>
            </div>
            <p className="text-gray-600 font-semibold">Average Rating</p>
            <p className="text-xs text-gray-500 mt-1">{mockSellerStats.totalReviews} reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modern Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-[#F29727] to-orange-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#F29727]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Seller Dashboard</h3>
                    <p className="text-orange-100 text-xs">{seller?.workshop}</p>
                  </div>
                </div>
              </div>

              <nav className="py-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "overview"
                    ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <TrendingUp className="w-5 h-5 mr-3" />
                  <span className="font-medium">Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("products")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "products"
                    ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  <span className="font-medium">My Products</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "orders"
                    ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <div className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-3" />
                    <span className="font-medium">Orders</span>
                  </div>
                  {pendingOrders.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {pendingOrders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "analytics"
                    ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  <span className="font-medium">Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "settings"
                    ? "bg-orange-50 text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
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
              <div className="space-y-6">
                {/* Header with Add Button */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {filteredProducts.length} of {products.length} products
                      </p>
                    </div>
                    <Link href="/seller/products/add">
                      <button className="flex items-center gap-2 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                        <Plus className="w-5 h-5" />
                        Add Product
                      </button>
                    </Link>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products by name, description, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F29727] focus:border-transparent"
                    />
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price Range
                      </label>
                      <select
                        value={priceRangeFilter}
                        onChange={(e) => setPriceRangeFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                      >
                        <option value="all">All Prices</option>
                        <option value="0-50">Under $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100-200">$100 - $200</option>
                        <option value="200+">$200+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery || categoryFilter !== "all" || statusFilter !== "all" || priceRangeFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Start by adding your first product"}
                    </p>
                    {products.length === 0 && (
                      <Link href="/seller/products/add">
                        <button className="inline-flex items-center gap-2 bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                          <Plus className="w-5 h-5" />
                          Add Your First Product
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <SellerProductCard
                        key={product.id}
                        product={product}
                        onDelete={handleDeleteProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>

                <div className="space-y-4">
                  {mockSellerOrders.map((order) => {
                    // Find associated inspection
                    const inspection = mockInspectionRequests.find((i) => i.orderId === order.id);
                    const hasInspection = order.items.some((item) => item.includeInspect);
                    const inspectionPassed = inspection?.report?.overallStatus === "pass";
                    const inspectionCompleted = inspection?.status === "completed" || inspection?.status === "approved";
                    const fundsLocked = hasInspection && !inspectionCompleted;

                    return (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-6 hover:border-[#F29727] transition-colors"
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
                            <div key={idx} className="text-sm text-gray-700 flex items-center justify-between">
                              <span>
                                {item.productName} × {item.quantity} = ${item.price * item.quantity}
                                {item.includeInspect && (
                                  <span className="text-purple-600 ml-2 text-xs font-semibold">
                                    (Inspection Required)
                                  </span>
                                )}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Escrow Status */}
                        {hasInspection && (
                          <div className={`mb-4 p-4 rounded-lg border-2 ${fundsLocked
                            ? "bg-yellow-50 border-yellow-300"
                            : inspectionPassed
                              ? "bg-green-50 border-green-300"
                              : "bg-red-50 border-red-300"
                            }`}>
                            <div className="flex items-start gap-3">
                              <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${fundsLocked
                                ? "text-yellow-600"
                                : inspectionPassed
                                  ? "text-green-600"
                                  : "text-red-600"
                                }`} />
                              <div className="flex-1">
                                <h4 className={`font-bold text-sm mb-1 ${fundsLocked
                                  ? "text-yellow-900"
                                  : inspectionPassed
                                    ? "text-green-900"
                                    : "text-red-900"
                                  }`}>
                                  {fundsLocked && "🔒 Payment Held in Escrow"}
                                  {!fundsLocked && inspectionPassed && "✅ Inspection Passed - Funds Releasing"}
                                  {!fundsLocked && !inspectionPassed && "⚠️ Inspection Issues Detected"}
                                </h4>
                                <p className={`text-xs ${fundsLocked
                                  ? "text-yellow-800"
                                  : inspectionPassed
                                    ? "text-green-800"
                                    : "text-red-800"
                                  }`}>
                                  {fundsLocked && (
                                    <>
                                      Buyer's payment (${order.subtotal}) is secured in escrow.
                                      Funds will be released to you once inspection passes or buyer approves override.
                                      {inspection?.scheduledDate && (
                                        <span className="block mt-1">
                                          Inspection scheduled: {inspection.scheduledDate.toLocaleDateString()}
                                        </span>
                                      )}
                                    </>
                                  )}
                                  {!fundsLocked && inspectionPassed && (
                                    <>
                                      Quality inspection passed with score {inspection?.report?.qualityScore}/100.
                                      Funds will be released to your account within 2-3 business days after shipment confirmation.
                                    </>
                                  )}
                                  {!fundsLocked && !inspectionPassed && inspection?.report && (
                                    <>
                                      Inspection status: {inspection.report.overallStatus.replace("_", " ").toUpperCase()}.
                                      Awaiting buyer decision to proceed or refund.
                                    </>
                                  )}
                                </p>
                                {inspectionCompleted && inspection?.report && (
                                  <div className="mt-2 flex gap-3 text-xs">
                                    <span className={fundsLocked ? "text-yellow-700" : inspectionPassed ? "text-green-700" : "text-red-700"}>
                                      Passed: {inspection.report.passedChecks}/{inspection.report.totalChecks}
                                    </span>
                                    <span className={fundsLocked ? "text-yellow-700" : inspectionPassed ? "text-green-700" : "text-red-700"}>
                                      Score: {inspection.report.qualityScore}/100
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Order Total and Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div>
                            <span className="font-bold text-lg text-gray-900">Total: ${order.subtotal}</span>
                            {hasInspection && fundsLocked && (
                              <span className="block text-xs text-yellow-600 font-semibold mt-1">
                                ⏳ Pending Inspection Approval
                              </span>
                            )}
                            {hasInspection && !fundsLocked && inspectionPassed && (
                              <span className="block text-xs text-green-600 font-semibold mt-1">
                                ✓ Ready to Ship & Release Funds
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {inspectionCompleted && inspectionPassed && (
                              <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                                Ship Order
                              </button>
                            )}
                            {!inspectionCompleted && (
                              <button className="bg-gray-400 text-white font-bold px-4 py-2 rounded-lg cursor-not-allowed text-sm" disabled>
                                Awaiting Inspection
                              </button>
                            )}
                            <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-4 py-2 rounded-lg border-2 border-gray-300 transition-colors text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            productName={productToDelete?.name || ""}
          />
        </div>
      </div>
    </div>
  );
}
