export interface SellerProfile {
  id: string;
  name: string;
  email: string;
  workshop: string;
  location: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  specialties: string[];
  yearsExperience: number;
  verified: boolean;
  rating: number;
  totalOrders: number;
  createdAt: Date;
}

export interface SellerProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  minimumOrder: number;
  deliveryTime: string;
  tags: string[];
  specifications?: Record<string, string>;
  status: "active" | "draft" | "out_of_stock";
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerOrder {
  id: string;
  buyerName: string;
  buyerEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    includeInspect: boolean;
  }[];
  subtotal: number;
  status: "pending" | "preparing" | "inspection_requested" | "ready_to_ship" | "shipped" | "delivered" | "completed" | "cancelled";
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  estimatedDelivery: string;
}

export interface SellerStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  thisMonthRevenue: number;
  averageRating: number;
  totalReviews: number;
}
