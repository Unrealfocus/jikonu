"use client";

import { useState } from "react";
import { useInspectorAuth } from "@/context/InspectorAuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import {
  mockInspectionRequests,
  getInspectionStatusLabel,
  getInspectionStatusColor,
} from "@/lib/mock-inspection-data";
import { ChecklistItem } from "@/types/inspector";

interface InspectionDetailClientProps {
  inspectionId: string;
}

export default function InspectionDetailClient({ inspectionId }: InspectionDetailClientProps) {
  const { inspector, isAuthenticated } = useInspectorAuth();
  const router = useRouter();

  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<{ url: string; caption: string }[]>([]);
  const [reportSummary, setReportSummary] = useState("");
  const [qualityScore, setQualityScore] = useState(85);
  const [overallStatus, setOverallStatus] = useState<"pass" | "conditional_pass" | "fail">("pass");

  if (!isAuthenticated) {
    router.push("/inspector/auth/login?redirect=/inspector/dashboard");
    return null;
  }

  // Find the inspection
  const inspection = mockInspectionRequests.find((i) => i.id === inspectionId);

  if (!inspection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Inspection Not Found</h1>
          <Link href="/inspector/dashboard" className="text-blue-600 hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Initialize checklist if empty
  if (checklist.length === 0 && inspection.checklistItems.length > 0) {
    setChecklist(inspection.checklistItems);
  }

  const handleChecklistUpdate = (itemId: string, status: ChecklistItem["status"]) => {
    setChecklist(
      checklist.map((item) =>
        item.id === itemId ? { ...item, status } : item
      )
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In real app, upload to server
      const newPhotos = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        caption: "",
      }));
      setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    alert("Draft saved! You can continue this inspection later.");
  };

  const handleSubmitReport = () => {
    const passedChecks = checklist.filter((item) => item.status === "pass").length;
    const failedChecks = checklist.filter((item) => item.status === "fail").length;

    alert(
      `Inspection Report Submitted!\n\n` +
      `Quality Score: ${qualityScore}\n` +
      `Overall Status: ${overallStatus}\n` +
      `Passed Checks: ${passedChecks}/${checklist.length}\n` +
      `Failed Checks: ${failedChecks}\n` +
      `Photos Uploaded: ${uploadedPhotos.length}\n\n` +
      `The buyer and seller will be notified.`
    );

    router.push("/inspector/dashboard");
  };

  const passedChecks = checklist.filter((item) => item.status === "pass").length;
  const failedChecks = checklist.filter((item) => item.status === "fail").length;
  const pendingChecks = checklist.filter((item) => item.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/inspector/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono font-bold text-sm text-gray-600">{inspection.id}</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">
                  {inspection.productName}
                </h1>
                <p className="text-gray-600 mt-1">{inspection.category}</p>
              </div>
              <span
                className={`text-sm font-bold px-4 py-2 rounded-full ${getInspectionStatusColor(
                  inspection.status
                )}`}
              >
                {getInspectionStatusLabel(inspection.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-xs text-gray-500">Buyer</p>
                <p className="font-semibold">{inspection.buyerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Seller</p>
                <p className="font-semibold">{inspection.sellerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-semibold">{inspection.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Escrow Amount</p>
                <p className="font-semibold text-green-600">${inspection.escrowAmount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quality Checklist */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quality Checklist</h2>
                <div className="flex gap-2 text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                    {passedChecks} Pass
                  </span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                    {failedChecks} Fail
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-bold">
                    {pendingChecks} Pending
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{item.item}</p>
                          {item.priority === "required" && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleChecklistUpdate(item.id, "pass")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          item.status === "pass"
                            ? "bg-green-600 text-white"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Pass
                      </button>
                      <button
                        onClick={() => handleChecklistUpdate(item.id, "fail")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          item.status === "fail"
                            ? "bg-red-600 text-white"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        Fail
                      </button>
                      <button
                        onClick={() => handleChecklistUpdate(item.id, "na")}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          item.status === "na"
                            ? "bg-gray-600 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        N/A
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspection Photos</h2>

              <div className="mb-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 font-semibold">
                      Click to upload photos
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>

              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={photo.url}
                          alt={`Inspection photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Report Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspection Report</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Summary
                  </label>
                  <textarea
                    value={reportSummary}
                    onChange={(e) => setReportSummary(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Provide a detailed summary of your findings..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Quality Score: {qualityScore}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={qualityScore}
                    onChange={(e) => setQualityScore(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor (0)</span>
                    <span>Excellent (100)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Overall Status
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOverallStatus("pass")}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        overallStatus === "pass"
                          ? "bg-green-600 text-white"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      Pass
                    </button>
                    <button
                      onClick={() => setOverallStatus("conditional_pass")}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        overallStatus === "conditional_pass"
                          ? "bg-yellow-600 text-white"
                          : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      }`}
                    >
                      Conditional
                    </button>
                    <button
                      onClick={() => setOverallStatus("fail")}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        overallStatus === "fail"
                          ? "bg-red-600 text-white"
                          : "bg-red-50 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      Fail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button
                  onClick={handleSaveDraft}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save Draft
                </button>

                <button
                  onClick={handleSubmitReport}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Submit Report
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Checklist</span>
                      <span className="font-bold">
                        {passedChecks + failedChecks}/{checklist.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            ((passedChecks + failedChecks) / checklist.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Photos</span>
                      <span className="font-bold">{uploadedPhotos.length}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Report Summary</span>
                      <span className="font-bold">
                        {reportSummary.length > 0 ? "✓" : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Tips</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Take clear, well-lit photos</li>
                  <li>• Document any defects found</li>
                  <li>• Complete all required checklist items</li>
                  <li>• Provide detailed summary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
