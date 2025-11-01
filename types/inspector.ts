export interface InspectorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  certifications: string[];
  specializations: string[];
  location: string;
  verified: boolean;
  rating: number;
  totalInspections: number;
  joinedDate: Date;
  profileImage?: string;
}

export interface InspectionRequest {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  inspectorId?: string;
  status: "pending" | "assigned" | "in_progress" | "completed" | "approved" | "rejected";
  priority: "low" | "medium" | "high";
  requestedDate: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  location: string;
  category: string;
  inspectionType: "standard" | "premium" | "custom";
  checklistItems: ChecklistItem[];
  photos: InspectionPhoto[];
  report?: InspectionReport;
  escrowAmount: number;
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  status: "pending" | "pass" | "fail" | "na";
  notes?: string;
  priority: "required" | "recommended" | "optional";
}

export interface InspectionPhoto {
  id: string;
  url: string;
  caption?: string;
  timestamp: Date;
  category: "product" | "packaging" | "defect" | "certification" | "other";
}

export interface InspectionReport {
  id: string;
  inspectionId: string;
  inspectorId: string;
  overallStatus: "pass" | "conditional_pass" | "fail";
  qualityScore: number; // 0-100
  summary: string;
  findings: ReportFinding[];
  recommendations: string[];
  passedChecks: number;
  failedChecks: number;
  totalChecks: number;
  reportUrl?: string;
  pdfUrl?: string;
  createdAt: Date;
  approvedByBuyer?: boolean;
  buyerOverride?: boolean;
  buyerOverrideReason?: string;
}

export interface ReportFinding {
  category: string;
  severity: "critical" | "major" | "minor" | "observation";
  description: string;
  recommendation?: string;
  images?: string[];
}

export interface InspectorStats {
  totalInspections: number;
  pendingInspections: number;
  inProgressInspections: number;
  completedThisMonth: number;
  averageRating: number;
  totalReviews: number;
  passRate: number; // percentage
  averageCompletionTime: number; // hours
}
