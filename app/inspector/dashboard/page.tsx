"use client";

import { useState, useEffect } from "react";
import { useInspectorAuth } from "@/context/InspectorAuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';
import {
  Shield,
  ClipboardCheck,
  TrendingUp,
  Settings,
  LogOut,
  Eye,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Star,
  Award,
} from "lucide-react";
import {
  mockInspectionRequests,
  mockInspectorStats,
  getInspectionStatusLabel,
  getInspectionStatusColor,
  getPriorityColor,
} from "@/lib/mock-inspection-data";

export default function InspectorDashboardPage() {
  const { inspector, isAuthenticated, logout } = useInspectorAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "assigned" | "completed" | "settings">("overview");

  // Handle authentication redirect in useEffect to avoid SSR and render issues
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/inspector/auth/login?redirect=/inspector/dashboard");
    }
  }, [isAuthenticated, router]);

  // Show loading state while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Filter inspections
  const pendingInspections = mockInspectionRequests.filter(
    (i) => i.status === "pending" && !i.inspectorId
  );
  const assignedInspections = mockInspectionRequests.filter(
    (i) => (i.status === "assigned" || i.status === "in_progress") && i.inspectorId === inspector?.id
  );
  const completedInspections = mockInspectionRequests.filter(
    (i) => (i.status === "completed" || i.status === "approved") && i.inspectorId === inspector?.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {inspector?.name}!</h1>
              <p className="text-blue-100 mb-1">{inspector?.location}</p>
              <p className="text-blue-100 text-sm">Inspector ID: {inspector?.id}</p>
              {inspector?.verified && (
                <div className="inline-flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full mt-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Inspector
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
              <ClipboardCheck className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">
                {mockInspectorStats.totalInspections}
              </span>
            </div>
            <p className="text-gray-600 font-semibold">Total Inspections</p>
            <p className="text-xs text-gray-500 mt-1">
              {mockInspectorStats.completedThisMonth} this month
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">
                {mockInspectorStats.pendingInspections + mockInspectorStats.inProgressInspections}
              </span>
            </div>
            <p className="text-gray-600 font-semibold">Active Tasks</p>
            <p className="text-xs text-gray-500 mt-1">
              {mockInspectorStats.inProgressInspections} in progress
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">
                {mockInspectorStats.averageRating}
              </span>
            </div>
            <p className="text-gray-600 font-semibold">Average Rating</p>
            <p className="text-xs text-gray-500 mt-1">
              {mockInspectorStats.totalReviews} reviews
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">
                {mockInspectorStats.passRate}%
              </span>
            </div>
            <p className="text-gray-600 font-semibold">Pass Rate</p>
            <p className="text-xs text-gray-500 mt-1">Quality standard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modern Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Inspector Portal</h3>
                    <p className="text-blue-100 text-xs">Quality Assurance</p>
                  </div>
                </div>
              </div>

              <nav className="py-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "overview"
                    ? " text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <TrendingUp className="w-5 h-5 mr-3" />
                  <span className="font-medium">Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("assigned")}
                  className={`flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "assigned"
                    ? " text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <div className="flex items-center">
                    <ClipboardCheck className="w-5 h-5 mr-3" />
                    <span className="font-medium">My Inspections</span>
                  </div>
                  {assignedInspections.length > 0 && (
                    <span className="bg-[#F29727] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {assignedInspections.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("completed")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "completed"
                    ? " text-[#F29727] border-r-4 border-[#F29727]"
                    : "bg-white"
                    }`}
                >
                  <CheckCircle2 className="w-5 h-5 mr-3" />
                  <span className="font-medium">Completed</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#F29727] transition-colors ${activeTab === "settings"
                    ? " text-[#F29727] border-r-4 border-[#F29727]"
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
                {/* Available Inspections */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Available Inspections
                  </h2>
                  {pendingInspections.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ClipboardCheck className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No available inspections at the moment</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingInspections.map((inspection) => (
                        <div
                          key={inspection.id}
                          className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-mono font-bold text-sm">{inspection.id}</p>
                              <h3 className="font-bold text-gray-900">{inspection.productName}</h3>
                              <p className="text-sm text-gray-600">{inspection.category}</p>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getPriorityColor(inspection.priority)}`}>
                              {inspection.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600 mb-3">
                            <span>📍 {inspection.location}</span>
                            <span>🏪 {inspection.sellerName}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                              Accept Inspection
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Pass Rate</span>
                          <span className="text-sm font-bold text-green-600">
                            {mockInspectorStats.passRate}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${mockInspectorStats.passRate}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Avg. Completion Time</span>
                          <span className="text-sm font-bold text-blue-600">
                            {mockInspectorStats.averageCompletionTime}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {inspector?.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assigned Inspections Tab */}
            {activeTab === "assigned" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Inspections</h2>

                {assignedInspections.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <ClipboardCheck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No assigned inspections</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignedInspections.map((inspection) => (
                      <div
                        key={inspection.id}
                        className="border border-gray-200 rounded-xl p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-mono font-bold text-gray-900">{inspection.id}</p>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">
                              {inspection.productName}
                            </h3>
                            <p className="text-sm text-gray-600">{inspection.category}</p>
                          </div>
                          <span
                            className={`text-sm font-bold px-4 py-2 rounded-full ${getInspectionStatusColor(
                              inspection.status
                            )}`}
                          >
                            {getInspectionStatusLabel(inspection.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Buyer</p>
                            <p className="font-semibold">{inspection.buyerName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Seller</p>
                            <p className="font-semibold">{inspection.sellerName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Scheduled Date</p>
                            <p className="font-semibold">
                              {inspection.scheduledDate?.toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-semibold">{inspection.location}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            href={`/inspector/inspections/${inspection.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                          >
                            Continue Inspection
                          </Link>
                          <button className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-4 py-2 rounded-lg border-2 border-gray-300 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Completed Tab */}
            {activeTab === "completed" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Inspections</h2>

                <div className="space-y-4">
                  {completedInspections.map((inspection) => (
                    <div
                      key={inspection.id}
                      className="border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-mono font-bold text-gray-900">{inspection.id}</p>
                          <h3 className="text-xl font-bold text-gray-900 mt-1">
                            {inspection.productName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Completed: {inspection.completedDate?.toLocaleDateString()}
                          </p>
                        </div>
                        {inspection.report && (
                          <span
                            className={`text-sm font-bold px-4 py-2 rounded-full ${inspection.report.overallStatus === "pass"
                              ? "bg-green-100 text-green-700"
                              : inspection.report.overallStatus === "conditional_pass"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {inspection.report.overallStatus.replace("_", " ").toUpperCase()}
                          </span>
                        )}
                      </div>

                      {inspection.report && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">
                                {inspection.report.qualityScore}
                              </p>
                              <p className="text-xs text-gray-600">Quality Score</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-green-600">
                                {inspection.report.passedChecks}
                              </p>
                              <p className="text-xs text-gray-600">Passed Checks</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-gray-900">
                                {inspection.photos.length}
                              </p>
                              <p className="text-xs text-gray-600">Photos Uploaded</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Link
                          href={`/inspector/inspections/${inspection.id}`}
                          className="text-sm text-blue-600 hover:underline font-semibold"
                        >
                          View Full Report
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Inspector Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={inspector?.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={inspector?.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={inspector?.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={inspector?.location}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors">
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
