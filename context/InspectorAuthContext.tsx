"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { InspectorProfile } from "@/types/inspector";

interface InspectorAuthContextType {
  inspector: InspectorProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: Partial<InspectorProfile> & { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

const InspectorAuthContext = createContext<InspectorAuthContextType | undefined>(undefined);

// Mock inspector for demo
const mockInspector: InspectorProfile = {
  id: "INSP-001",
  name: "David Chen",
  email: "david.chen@abatrade.com",
  phone: "+1 (555) 234-5678",
  certifications: ["ISO 9001 Lead Auditor", "AQSIQ Certified", "SGS Product Inspector"],
  specializations: ["Textiles", "Leather Goods", "Fashion Accessories"],
  location: "Aba, Abia State, Nigeria",
  verified: true,
  rating: 4.9,
  totalInspections: 342,
  joinedDate: new Date("2023-01-15"),
};

export function InspectorAuthProvider({ children }: { children: ReactNode }) {
  const [inspector, setInspector] = useState<InspectorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for saved inspector session
    const savedInspector = localStorage.getItem("inspector");
    if (savedInspector) {
      const parsed = JSON.parse(savedInspector);
      // Convert date strings back to Date objects
      parsed.joinedDate = new Date(parsed.joinedDate);
      setInspector(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, would call API
    if (email === "inspector@abatrade.com" && password === "password") {
      setInspector(mockInspector);
      setIsAuthenticated(true);
      localStorage.setItem("inspector", JSON.stringify(mockInspector));
      return true;
    }
    return false;
  };

  const signup = async (data: Partial<InspectorProfile> & { email: string; password: string }): Promise<boolean> => {
    // Mock signup - in real app, would call API
    const newInspector: InspectorProfile = {
      id: `INSP-${Date.now()}`,
      name: data.name || "",
      email: data.email,
      phone: data.phone || "",
      certifications: data.certifications || [],
      specializations: data.specializations || [],
      location: data.location || "",
      verified: false, // New inspectors need verification
      rating: 0,
      totalInspections: 0,
      joinedDate: new Date(),
    };

    setInspector(newInspector);
    setIsAuthenticated(true);
    localStorage.setItem("inspector", JSON.stringify(newInspector));
    return true;
  };

  const logout = () => {
    setInspector(null);
    setIsAuthenticated(false);
    localStorage.removeItem("inspector");
  };

  return (
    <InspectorAuthContext.Provider value={{ inspector, isAuthenticated, login, signup, logout }}>
      {children}
    </InspectorAuthContext.Provider>
  );
}

export function useInspectorAuth() {
  const context = useContext(InspectorAuthContext);
  if (context === undefined) {
    throw new Error("useInspectorAuth must be used within an InspectorAuthProvider");
  }
  return context;
}
