export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  seller: Seller;
  inStock: boolean;
  minimumOrder: number;
  deliveryTime: string;
  tags: string[];
  specifications?: Record<string, string>;
}

export interface Seller {
  id: string;
  name: string;
  workshop: string;
  location: string;
  rating: number;
  totalOrders: number;
  verified: boolean;
  avatar?: string;
  yearsExperience: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  includeInspect: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  inspectFee: number;
  shippingFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "payment_held"
  | "in_inspection"
  | "approved"
  | "in_transit"
  | "delivered"
  | "completed"
  | "disputed";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  addresses: ShippingAddress[];
}
