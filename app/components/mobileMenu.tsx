'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSellerAuth } from '@/context/SellerAuthContext';
import { useInspectorAuth } from '@/context/InspectorAuthContext';
import { User, Package, Shield } from 'lucide-react';

export default function MobileMenu() {
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { isAuthenticated: isSellerAuthenticated, seller } = useSellerAuth();
  const { isAuthenticated: isInspectorAuthenticated, inspector } = useInspectorAuth();

  // Hide main navigation if logged in as seller or inspector
  const showMainNav = !isSellerAuthenticated && !isInspectorAuthenticated;

  return (
    <div className={`phone ${isActive ? 'active' : ''} `}>
      <div>
        <svg className="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 400" height="400" width="220">
          <g className="top-bars" strokeWidth="4">
            <path className="bar bar1" d="M 178,20 H 202" />
            <path className="bar bar2" d="M 178,29 H 202" />
          </g>
        </svg>
      </div>

      <div className="menu-click-area" onClick={() => setIsActive(!isActive)}></div>

      <div className="menu">
        {/* Show main navigation only for regular users */}
        {showMainNav && (
          <>
            <Link onClick={() => setIsActive(!isActive)} href="/">Home</Link>
            <Link onClick={() => setIsActive(!isActive)} href="/products">Products</Link>
            <Link onClick={() => setIsActive(!isActive)} href="/about">How it Works</Link>
            <Link onClick={() => setIsActive(!isActive)} href="/contact">Contact</Link>
          </>
        )}

        {/* Seller Authenticated */}
        {isSellerAuthenticated && (
          <>
            <Link onClick={() => setIsActive(!isActive)} href="/seller/dashboard">
              <div className="flex items-center gap-2 text-[#F29727] font-semibold">
                <Package className="w-5 h-5" />
                {seller?.name}
              </div>
            </Link>
          </>
        )}

        {/* Inspector Authenticated */}
        {isInspectorAuthenticated && (
          <>
            <Link onClick={() => setIsActive(!isActive)} href="/inspector/dashboard">
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <Shield className="w-5 h-5" />
                {inspector?.name}
              </div>
            </Link>
          </>
        )}

        {/* Regular User Authenticated */}
        {isAuthenticated && showMainNav && (
          <Link onClick={() => setIsActive(!isActive)} href="/account">
            <div className="flex items-center gap-2 font-semibold">
              <User className="w-5 h-5" />
              {user?.name}
            </div>
          </Link>
        )}

        {/* Not Authenticated - Show Login Options */}
        {!isAuthenticated && !isSellerAuthenticated && !isInspectorAuthenticated && (
          <>
            <Link onClick={() => setIsActive(!isActive)} href="/auth/login">
              <button className="bg-[#F29727] hover:bg-[#d97f0f] text-white w-full mb-2">
                Login
              </button>
            </Link>
            <Link onClick={() => setIsActive(!isActive)} href="/seller/auth/login">
              <button className="flex items-center justify-center gap-2 border border-[#F29727] text-[#F29727] hover:bg-orange-50 w-full mb-2">
                <Package className="w-4 h-4" />
                Seller Login
              </button>
            </Link>
            <Link onClick={() => setIsActive(!isActive)} href="/inspector/auth/login">
              <button className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 w-full">
                <Shield className="w-4 h-4" />
                Inspector Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}