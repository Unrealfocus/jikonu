"use client"

import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './mobileMenu';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Package, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useSellerAuth } from '@/context/SellerAuthContext';
import { useInspectorAuth } from '@/context/InspectorAuthContext';

export default function Header() {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { isAuthenticated: isSellerAuthenticated, seller } = useSellerAuth();
  const { isAuthenticated: isInspectorAuthenticated, inspector } = useInspectorAuth();
  const cartCount = getCartCount();

  const linkStyle = (path: string) =>
    pathname === path
      ? 'underline text-[red] underline-offset-4 text-black'
      : 'text-gray-600';

  return (
    <section className="header px-[0px] flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-[#F29727] rounded-lg flex items-center justify-center font-bold text-white text-xl">
            A
          </div>
          <span className="text-2xl font-bold text-gray-900">AbaTrade</span>
        </div>
      </Link>

      {/* Main Navigation */}
      <div className="link flex gap-6">
        <Link href="/" className={linkStyle("/")}>Home</Link>
        <Link href="/products" className={linkStyle("/products")}>Products</Link>
        <Link href="/about" className={linkStyle("/about")}>How it Works</Link>
        <Link href="/contact" className={linkStyle("/contact")}>Contact</Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {/* Shopping Cart */}
        <Link href="/cart" className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F29727] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>

        {/* Seller Account */}
        {isSellerAuthenticated ? (
          <Link href="/seller/dashboard">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 rounded-lg transition-colors border border-[#F29727]">
              <Package className="w-5 h-5 text-[#F29727]" />
              <span className="font-semibold text-[#F29727]">{seller?.name}</span>
            </button>
          </Link>
        ) : /* Inspector Account */
        isInspectorAuthenticated ? (
          <Link href="/inspector/dashboard">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors border border-blue-600">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">{inspector?.name}</span>
            </button>
          </Link>
        ) : /* Regular User Account */
        isAuthenticated ? (
          <Link href="/account">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" />
              <span className="font-semibold">{user?.name}</span>
            </button>
          </Link>
        ) : (
          /* Login Options */
          <>
            <Link href="/auth/login">
              <button className="bg-[#F29727] hover:bg-[#d97f0f] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Login
              </button>
            </Link>

            <Link href="/seller/auth/login">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 text-[#F29727] border border-[#F29727] rounded-lg font-semibold transition-colors">
                <Package className="w-4 h-4" />
                Seller
              </button>
            </Link>

            <Link href="/inspector/auth/login">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-blue-600 border border-blue-600 rounded-lg font-semibold transition-colors">
                <Shield className="w-4 h-4" />
                Inspector
              </button>
            </Link>
          </>
        )}
      </div>

      <div className='md:hidden block'>
        <MobileMenu />
      </div>
    </section>
  );
}
