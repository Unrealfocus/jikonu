"use client"

import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './mobileMenu';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? 'underline text-[red] underline-offset-4 text-black'  
      : 'text-gray-600'; 

  return (
    <section className="header px-[0px] flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#F29727] rounded-lg flex items-center justify-center font-bold text-white text-xl">
            A
          </div>
          <span className="text-2xl font-bold text-gray-900">AbaTrade</span>
        </div>
      </Link>

      <div className="link flex gap-6">
        <Link href="/" className={linkStyle("/")}>Home</Link>
        <Link href="/about" className={linkStyle("/about")}>How it Works</Link>
        <Link href="/contact" className={linkStyle("/contact")}>Sellers</Link>
        <Link href="/about" className={linkStyle("/about")}>About</Link>
      </div>

      <Link href="https://form.jotform.com/250930986221155">
        <button className='hidden md:block bg-[#F29727] hover:bg-[#d97f0f] text-white px-6 py-2 rounded-lg font-semibold transition-colors'>
          Get Started
        </button>
      </Link>

      <div className='md:hidden block'>
        <MobileMenu />
      </div>
    </section>
  );
}
