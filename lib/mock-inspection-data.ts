import {
  InspectionRequest,
  ChecklistItem,
  InspectionPhoto,
  InspectionReport,
  ReportFinding,
  InspectorStats,
} from "@/types/inspector";

// Standard checklist for leather products
const leatherProductChecklist: ChecklistItem[] = [
  {
    id: "CHK-001",
    category: "Material Quality",
    item: "Leather authenticity verification",
    status: "pass",
    priority: "required",
    notes: "100% genuine leather confirmed",
  },
  {
    id: "CHK-002",
    category: "Material Quality",
    item: "Grain consistency and texture",
    status: "pass",
    priority: "required",
  },
  {
    id: "CHK-003",
    category: "Craftsmanship",
    item: "Stitching quality and alignment",
    status: "pass",
    priority: "required",
  },
  {
    id: "CHK-004",
    category: "Craftsmanship",
    item: "Edge finishing",
    status: "pass",
    priority: "recommended",
  },
  {
    id: "CHK-005",
    category: "Hardware",
    item: "Zipper functionality",
    status: "pass",
    priority: "required",
  },
  {
    id: "CHK-006",
    category: "Hardware",
    item: "Metal hardware quality (no rust)",
    status: "pass",
    priority: "required",
  },
  {
    id: "CHK-007",
    category: "Dimensions",
    item: "Product measurements match specification",
    status: "pass",
    priority: "required",
  },
  {
    id: "CHK-008",
    category: "Finish",
    item: "Color consistency",
    status: "pass",
    priority: "recommended",
  },
  {
    id: "CHK-009",
    category: "Packaging",
    item: "Protective packaging present",
    status: "pass",
    priority: "recommended",
  },
  {
    id: "CHK-010",
    category: "Documentation",
    item: "Care instructions included",
    status: "pass",
    priority: "optional",
  },
];

// Mock inspection photos
const mockPhotos: InspectionPhoto[] = [
  {
    id: "PHOTO-001",
    url: "/placeholder-inspection.jpg",
    caption: "Overall product view - front",
    timestamp: new Date("2024-01-15T10:30:00"),
    category: "product",
  },
  {
    id: "PHOTO-002",
    url: "/placeholder-inspection.jpg",
    caption: "Stitching detail - close-up",
    timestamp: new Date("2024-01-15T10:32:00"),
    category: "product",
  },
  {
    id: "PHOTO-003",
    url: "/placeholder-inspection.jpg",
    caption: "Hardware inspection - zipper",
    timestamp: new Date("2024-01-15T10:35:00"),
    category: "product",
  },
  {
    id: "PHOTO-004",
    url: "/placeholder-inspection.jpg",
    caption: "Packaging condition",
    timestamp: new Date("2024-01-15T10:40:00"),
    category: "packaging",
  },
];

// Mock report findings
const mockFindings: ReportFinding[] = [
  {
    category: "Material Quality",
    severity: "observation",
    description: "Leather grain shows natural variations typical of genuine leather",
    recommendation: "This is expected for authentic leather and adds to product uniqueness",
  },
  {
    category: "Craftsmanship",
    severity: "observation",
    description: "Hand-stitching shows slight variations in spacing",
    recommendation: "Characteristic of handmade artisan products, adds authenticity",
  },
];

// Mock inspection report
const mockReport: InspectionReport = {
  id: "REP-001",
  inspectionId: "INS-001",
  inspectorId: "INSP-001",
  overallStatus: "pass",
  qualityScore: 92,
  summary:
    "The leather handbag meets all required quality standards. Material authenticity confirmed, craftsmanship is excellent, and hardware functionality verified. Minor natural variations in leather grain are consistent with genuine leather products.",
  findings: mockFindings,
  recommendations: [
    "Product ready for shipment",
    "Ensure protective packaging for international transit",
    "Include care instructions with final shipment",
  ],
  passedChecks: 10,
  failedChecks: 0,
  totalChecks: 10,
  reportUrl: "#",
  pdfUrl: "#",
  createdAt: new Date("2024-01-15T11:00:00"),
  approvedByBuyer: true,
};

// Mock inspection requests
export const mockInspectionRequests: InspectionRequest[] = [
  {
    id: "INS-001",
    orderId: "ORD-001",
    productId: "1",
    productName: "Handcrafted Leather Handbag",
    sellerId: "seller-001",
    sellerName: "Chioma's Leatherworks",
    buyerId: "user-001",
    buyerName: "Sarah Johnson",
    inspectorId: "INSP-001",
    status: "completed",
    priority: "high",
    requestedDate: new Date("2024-01-10"),
    scheduledDate: new Date("2024-01-15"),
    completedDate: new Date("2024-01-15T11:00:00"),
    location: "Aba, Abia State",
    category: "Fashion & Accessories",
    inspectionType: "premium",
    checklistItems: leatherProductChecklist,
    photos: mockPhotos,
    report: mockReport,
    escrowAmount: 450,
    notes: "Customer requested premium inspection for high-value item",
  },
  {
    id: "INS-002",
    orderId: "ORD-002",
    productId: "2",
    productName: "Traditional Aso-Oke Fabric Bundle",
    sellerId: "seller-002",
    sellerName: "Nneka's Textiles",
    buyerId: "user-002",
    buyerName: "Michael Brown",
    inspectorId: "INSP-001",
    status: "in_progress",
    priority: "medium",
    requestedDate: new Date("2024-01-18"),
    scheduledDate: new Date("2024-01-20"),
    location: "Aba, Abia State",
    category: "Textiles",
    inspectionType: "standard",
    checklistItems: [
      {
        id: "CHK-T01",
        category: "Material Quality",
        item: "Thread quality and consistency",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-T02",
        category: "Material Quality",
        item: "Color fastness test",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-T03",
        category: "Dimensions",
        item: "Fabric width and length verification",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-T04",
        category: "Quality",
        item: "Pattern consistency",
        status: "pending",
        priority: "recommended",
      },
      {
        id: "CHK-T05",
        category: "Packaging",
        item: "Protective wrapping",
        status: "pending",
        priority: "recommended",
      },
    ],
    photos: [],
    escrowAmount: 200,
  },
  {
    id: "INS-003",
    orderId: "ORD-005",
    productId: "5",
    productName: "Custom Beaded Jewelry Set",
    sellerId: "seller-003",
    sellerName: "Ada's Beadworks",
    buyerId: "user-003",
    buyerName: "Emily Davis",
    inspectorId: "INSP-001",
    status: "assigned",
    priority: "low",
    requestedDate: new Date("2024-01-19"),
    scheduledDate: new Date("2024-01-22"),
    location: "Aba, Abia State",
    category: "Jewelry",
    inspectionType: "standard",
    checklistItems: [
      {
        id: "CHK-J01",
        category: "Materials",
        item: "Bead quality and authenticity",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-J02",
        category: "Construction",
        item: "String/wire strength test",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-J03",
        category: "Construction",
        item: "Clasp functionality",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-J04",
        category: "Finish",
        item: "Polish and finish quality",
        status: "pending",
        priority: "recommended",
      },
    ],
    photos: [],
    escrowAmount: 85,
  },
  {
    id: "INS-004",
    orderId: "ORD-NEW-001",
    productId: "3",
    productName: "Premium Leather Wallet",
    sellerId: "seller-001",
    sellerName: "Chioma's Leatherworks",
    buyerId: "user-004",
    buyerName: "James Wilson",
    status: "pending",
    priority: "high",
    requestedDate: new Date("2024-01-20"),
    location: "Aba, Abia State",
    category: "Fashion & Accessories",
    inspectionType: "premium",
    checklistItems: [
      {
        id: "CHK-W01",
        category: "Material",
        item: "Leather authenticity",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-W02",
        category: "Craftsmanship",
        item: "Stitching quality",
        status: "pending",
        priority: "required",
      },
      {
        id: "CHK-W03",
        category: "Functionality",
        item: "Card slot alignment",
        status: "pending",
        priority: "required",
      },
    ],
    photos: [],
    escrowAmount: 120,
  },
];

// Mock inspector stats
export const mockInspectorStats: InspectorStats = {
  totalInspections: 342,
  pendingInspections: 1,
  inProgressInspections: 1,
  completedThisMonth: 28,
  averageRating: 4.9,
  totalReviews: 312,
  passRate: 94.5,
  averageCompletionTime: 3.2,
};

// Helper functions
export function getInspectionStatusLabel(status: InspectionRequest["status"]): string {
  const labels: Record<InspectionRequest["status"], string> = {
    pending: "Pending Assignment",
    assigned: "Assigned",
    in_progress: "In Progress",
    completed: "Completed",
    approved: "Approved",
    rejected: "Rejected",
  };
  return labels[status];
}

export function getInspectionStatusColor(status: InspectionRequest["status"]): string {
  const colors: Record<InspectionRequest["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    assigned: "bg-blue-100 text-blue-700",
    in_progress: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return colors[status];
}

export function getPriorityColor(priority: "low" | "medium" | "high"): string {
  const colors = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };
  return colors[priority];
}

export function getSeverityColor(severity: "critical" | "major" | "minor" | "observation"): string {
  const colors = {
    critical: "bg-red-100 text-red-700 border-red-300",
    major: "bg-orange-100 text-orange-700 border-orange-300",
    minor: "bg-yellow-100 text-yellow-700 border-yellow-300",
    observation: "bg-blue-100 text-blue-700 border-blue-300",
  };
  return colors[severity];
}
