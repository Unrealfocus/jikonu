"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SellerProfile } from "@/types/seller";

interface SellerAuthContextType {
  seller: SellerProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  workshop: string;
  location: string;
  specialties: string[];
}

const SellerAuthContext = createContext<SellerAuthContextType | undefined>(undefined);

export function SellerAuthProvider({ children }: { children: React.ReactNode }) {
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedSeller = localStorage.getItem("abatrade-seller");
    if (savedSeller) {
      setSeller(JSON.parse(savedSeller));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (seller) {
        localStorage.setItem("abatrade-seller", JSON.stringify(seller));
      } else {
        localStorage.removeItem("abatrade-seller");
      }
    }
  }, [seller, isLoaded]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in production, this would be an API call
    const mockSeller: SellerProfile = {
      id: "seller-1",
      email,
      name: "Chioma Okeke",
      workshop: "Royal Leather Crafts",
      location: "Ariaria Market, Aba",
      specialties: ["Leather Bags", "Wallets", "Belts"],
      yearsExperience: 15,
      verified: true,
      rating: 4.9,
      totalOrders: 523,
      createdAt: new Date("2020-01-15"),
    };

    setSeller(mockSeller);
    return true;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock signup - in production, this would be an API call
    const mockSeller: SellerProfile = {
      id: "seller-" + Date.now(),
      email: data.email,
      name: data.name,
      workshop: data.workshop,
      location: data.location,
      specialties: data.specialties,
      yearsExperience: 0,
      verified: false,
      rating: 0,
      totalOrders: 0,
      createdAt: new Date(),
    };

    setSeller(mockSeller);
    return true;
  };

  const logout = () => {
    setSeller(null);
  };

  return (
    <SellerAuthContext.Provider
      value={{
        seller,
        login,
        signup,
        logout,
        isAuthenticated: !!seller,
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  );
}

export function useSellerAuth() {
  const context = useContext(SellerAuthContext);
  if (context === undefined) {
    throw new Error("useSellerAuth must be used within a SellerAuthProvider");
  }
  return context;
}
