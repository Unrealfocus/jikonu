"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, includeInspect: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleInspect: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getInspectTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("abatrade-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("abatrade-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity: number, includeInspect: boolean) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, includeInspect }
            : item
        );
      }

      return [...prevCart, { product, quantity, includeInspect }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleInspect = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, includeInspect: !item.includeInspect }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getInspectTotal = () => {
    // Inspect fee is $25 per item that has it enabled
    return cart.reduce((total, item) => total + (item.includeInspect ? 25 : 0), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleInspect,
        clearCart,
        getCartTotal,
        getInspectTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
