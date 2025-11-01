import { Order } from "@/types/product";
import { sampleProducts } from "./sample-products";

export const mockOrders: Order[] = [
  {
    id: "ORD-1234567890",
    items: [
      {
        product: sampleProducts[0], // Premium Leather Messenger Bag
        quantity: 1,
        includeInspect: true,
      },
      {
        product: sampleProducts[2], // Custom Leather Wallet
        quantity: 5,
        includeInspect: false,
      },
    ],
    subtotal: 295,
    inspectFee: 25,
    shippingFee: 50,
    total: 370,
    shippingAddress: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (713) 555-0123",
      address: "4567 Main Street, Apt 2B",
      city: "Houston",
      state: "TX",
      zipCode: "77002",
      country: "USA",
    },
    status: "in_transit",
    createdAt: new Date("2025-01-15"),
    estimatedDelivery: "Feb 10-15, 2025",
  },
  {
    id: "ORD-1234567891",
    items: [
      {
        product: sampleProducts[1], // Handwoven Ankara Dress
        quantity: 2,
        includeInspect: true,
      },
    ],
    subtotal: 170,
    inspectFee: 25,
    shippingFee: 50,
    total: 245,
    shippingAddress: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (713) 555-0123",
      address: "4567 Main Street, Apt 2B",
      city: "Houston",
      state: "TX",
      zipCode: "77002",
      country: "USA",
    },
    status: "in_inspection",
    createdAt: new Date("2025-01-20"),
    estimatedDelivery: "Feb 15-20, 2025",
  },
  {
    id: "ORD-1234567892",
    items: [
      {
        product: sampleProducts[3], // Handmade Leather Sandals
        quantity: 1,
        includeInspect: false,
      },
      {
        product: sampleProducts[4], // African Print Tote Bag
        quantity: 10,
        includeInspect: false,
      },
    ],
    subtotal: 325,
    inspectFee: 0,
    shippingFee: 50,
    total: 375,
    shippingAddress: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (713) 555-0123",
      address: "4567 Main Street, Apt 2B",
      city: "Houston",
      state: "TX",
      zipCode: "77002",
      country: "USA",
    },
    status: "delivered",
    createdAt: new Date("2024-12-10"),
    estimatedDelivery: "Jan 5-10, 2025",
  },
  {
    id: "ORD-1234567893",
    items: [
      {
        product: sampleProducts[6], // Traditional Isiagu Shirt
        quantity: 1,
        includeInspect: true,
      },
    ],
    subtotal: 75,
    inspectFee: 25,
    shippingFee: 50,
    total: 150,
    shippingAddress: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (713) 555-0123",
      address: "4567 Main Street, Apt 2B",
      city: "Houston",
      state: "TX",
      zipCode: "77002",
      country: "USA",
    },
    status: "completed",
    createdAt: new Date("2024-11-20"),
    estimatedDelivery: "Dec 15-20, 2024",
  },
];

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find((order) => order.id === id);
};

export const getOrdersByStatus = (status: string): Order[] => {
  return mockOrders.filter((order) => order.status === status);
};

export const getOrderStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: "Pending",
    payment_held: "Payment Held",
    in_inspection: "Quality Inspection",
    approved: "Approved for Shipping",
    in_transit: "In Transit",
    delivered: "Delivered",
    completed: "Completed",
    disputed: "Disputed",
  };
  return labels[status] || status;
};

export const getOrderStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-700",
    payment_held: "bg-blue-100 text-blue-700",
    in_inspection: "bg-yellow-100 text-yellow-700",
    approved: "bg-purple-100 text-purple-700",
    in_transit: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    completed: "bg-green-100 text-green-700",
    disputed: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};
