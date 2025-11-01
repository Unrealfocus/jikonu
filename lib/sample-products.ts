import { Product } from "@/types/product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Messenger Bag",
    description: "Handcrafted genuine leather messenger bag perfect for professionals. Features multiple compartments, adjustable strap, and durable brass hardware.",
    price: 120,
    images: ["/products/leather-bag-1.jpg", "/products/leather-bag-2.jpg"],
    category: "Leather Bags",
    inStock: true,
    minimumOrder: 1,
    deliveryTime: "14-21 days",
    tags: ["Leather", "Bags", "Professional", "Handmade"],
    seller: {
      id: "seller-1",
      name: "Chioma Okeke",
      workshop: "Royal Leather Crafts",
      location: "Ariaria Market, Aba",
      rating: 4.9,
      totalOrders: 523,
      verified: true,
      yearsExperience: 15,
    },
    specifications: {
      Material: "Genuine Leather",
      Dimensions: "15\" x 11\" x 4\"",
      Color: "Brown, Black",
      Weight: "2.5 lbs",
    },
  },
  {
    id: "2",
    name: "Handwoven Ankara Dress",
    description: "Beautiful handwoven Ankara dress with traditional patterns. Perfect for special occasions and cultural events.",
    price: 85,
    images: ["/products/ankara-dress-1.jpg", "/products/ankara-dress-2.jpg"],
    category: "Clothing",
    inStock: true,
    minimumOrder: 1,
    deliveryTime: "10-14 days",
    tags: ["Ankara", "Dress", "Traditional", "Fashion"],
    seller: {
      id: "seller-2",
      name: "Adaeze Nwankwo",
      workshop: "Adaeze Fashion House",
      location: "Aba North, Aba",
      rating: 4.8,
      totalOrders: 342,
      verified: true,
      yearsExperience: 10,
    },
    specifications: {
      Material: "100% Cotton Ankara",
      Sizes: "S, M, L, XL",
      Care: "Hand wash or dry clean",
    },
  },
  {
    id: "3",
    name: "Custom Leather Wallet",
    description: "Slim leather wallet with RFID protection. Can be customized with initials or logo.",
    price: 35,
    images: ["/products/wallet-1.jpg", "/products/wallet-2.jpg"],
    category: "Accessories",
    inStock: true,
    minimumOrder: 5,
    deliveryTime: "7-14 days",
    tags: ["Leather", "Wallet", "Custom", "RFID"],
    seller: {
      id: "seller-1",
      name: "Chioma Okeke",
      workshop: "Royal Leather Crafts",
      location: "Ariaria Market, Aba",
      rating: 4.9,
      totalOrders: 523,
      verified: true,
      yearsExperience: 15,
    },
    specifications: {
      Material: "Full-grain Leather",
      Dimensions: "4.5\" x 3.5\"",
      Slots: "8 card slots + bill compartment",
      Features: "RFID Protection",
    },
  },
  {
    id: "4",
    name: "Handmade Leather Sandals",
    description: "Comfortable handmade leather sandals. Traditional Nigerian craftsmanship with modern design.",
    price: 45,
    images: ["/products/sandals-1.jpg", "/products/sandals-2.jpg"],
    category: "Shoes",
    inStock: true,
    minimumOrder: 1,
    deliveryTime: "14-21 days",
    tags: ["Shoes", "Leather", "Sandals", "Handmade"],
    seller: {
      id: "seller-3",
      name: "Emeka Okonkwo",
      workshop: "Emeka's Footwear",
      location: "Cemetery Market, Aba",
      rating: 4.7,
      totalOrders: 278,
      verified: true,
      yearsExperience: 12,
    },
    specifications: {
      Material: "Genuine Leather",
      Sizes: "US 7-13",
      Sole: "Rubber anti-slip",
    },
  },
  {
    id: "5",
    name: "African Print Tote Bag",
    description: "Large tote bag with vibrant African prints. Perfect for shopping or beach trips.",
    price: 28,
    images: ["/products/tote-1.jpg", "/products/tote-2.jpg"],
    category: "Accessories",
    inStock: true,
    minimumOrder: 10,
    deliveryTime: "7-10 days",
    tags: ["Tote", "African Print", "Bag", "Accessories"],
    seller: {
      id: "seller-2",
      name: "Adaeze Nwankwo",
      workshop: "Adaeze Fashion House",
      location: "Aba North, Aba",
      rating: 4.8,
      totalOrders: 342,
      verified: true,
      yearsExperience: 10,
    },
    specifications: {
      Material: "Cotton Canvas with Ankara lining",
      Dimensions: "18\" x 14\" x 6\"",
      Handle: "Reinforced cotton straps",
    },
  },
  {
    id: "6",
    name: "Leather Belt with Custom Buckle",
    description: "Handcrafted leather belt with custom brass buckle. Available in multiple colors.",
    price: 32,
    images: ["/products/belt-1.jpg", "/products/belt-2.jpg"],
    category: "Accessories",
    inStock: true,
    minimumOrder: 5,
    deliveryTime: "7-14 days",
    tags: ["Belt", "Leather", "Custom", "Accessories"],
    seller: {
      id: "seller-1",
      name: "Chioma Okeke",
      workshop: "Royal Leather Crafts",
      location: "Ariaria Market, Aba",
      rating: 4.9,
      totalOrders: 523,
      verified: true,
      yearsExperience: 15,
    },
    specifications: {
      Material: "Full-grain Leather",
      Width: "1.5 inches",
      Sizes: "32-42 inches",
      Buckle: "Solid brass",
    },
  },
  {
    id: "7",
    name: "Traditional Isiagu Shirt",
    description: "Authentic Isiagu shirt with lion head embroidery. Traditional Nigerian formal wear.",
    price: 75,
    images: ["/products/isiagu-1.jpg", "/products/isiagu-2.jpg"],
    category: "Clothing",
    inStock: true,
    minimumOrder: 1,
    deliveryTime: "14-21 days",
    tags: ["Isiagu", "Traditional", "Formal", "Clothing"],
    seller: {
      id: "seller-4",
      name: "Chukwu Fashions",
      workshop: "Chukwu Traditional Wear",
      location: "Aba South, Aba",
      rating: 4.6,
      totalOrders: 189,
      verified: true,
      yearsExperience: 8,
    },
    specifications: {
      Material: "Premium Cotton blend",
      Sizes: "M, L, XL, XXL",
      Embroidery: "Traditional lion head pattern",
    },
  },
  {
    id: "8",
    name: "Handwoven Basket Set",
    description: "Set of 3 handwoven baskets in different sizes. Perfect for home storage and decoration.",
    price: 55,
    images: ["/products/basket-1.jpg", "/products/basket-2.jpg"],
    category: "Home Decor",
    inStock: true,
    minimumOrder: 2,
    deliveryTime: "10-14 days",
    tags: ["Baskets", "Home Decor", "Handwoven", "Storage"],
    seller: {
      id: "seller-5",
      name: "Ngozi Crafts",
      workshop: "Ngozi Artisan Collective",
      location: "Eziukwu Market, Aba",
      rating: 4.9,
      totalOrders: 412,
      verified: true,
      yearsExperience: 18,
    },
    specifications: {
      Material: "Natural raffia and palm",
      Sizes: "Small (8\"), Medium (12\"), Large (16\")",
      Use: "Storage, decoration, gift baskets",
    },
  },
];

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter((product) => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

export const categories = [
  "Leather Bags",
  "Shoes",
  "Clothing",
  "Accessories",
  "Home Decor",
  "Textiles",
];
