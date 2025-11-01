"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/product";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("abatrade-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem("abatrade-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("abatrade-user");
      }
    }
  }, [user, isLoaded]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in production, this would be an API call
    const mockUser: User = {
      id: "user-1",
      email,
      name: email.split("@")[0],
      addresses: [],
    };

    setUser(mockUser);
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock signup - in production, this would be an API call
    const mockUser: User = {
      id: "user-" + Date.now(),
      email,
      name,
      addresses: [],
    };

    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
