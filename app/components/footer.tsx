"use client"
import Image from 'next/image';
import { SlideUp } from './animation/slideUp';
import ButtonAnimate from './animation/buttonAnimate';


export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="social-div">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#F29727] rounded-lg flex items-center justify-center font-bold text-white text-xl">
                  A
                </div>
                <span className="text-2xl font-bold">AbaTrade</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting authentic Nigerian artisans with Houston buyers through verified trust and quality.
              </p>
              <div className="social flex gap-3">
                <Image src="/assets/ri_instagram-fill.svg" alt="Instagram" width={30} height={30} className="hover:opacity-80 cursor-pointer" />
                <Image src="/assets/twitter.svg" alt="Twitter" width={30} height={30} className="hover:opacity-80 cursor-pointer" />
                <Image src="/assets/facebook.svg" alt="Facebook" width={30} height={30} className="hover:opacity-80 cursor-pointer" />
              </div>
            </div>

            {/* Marketplace Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Marketplace</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Browse Products</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Featured Artisans</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Collections</a></li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#F29727] transition-colors">AbaTrade Inspect™</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Request for Quotation</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Fast Customization</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Logistics</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#F29727] transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Seller Verification</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Buyer Protection</a></li>
                <li><a href="#" className="hover:text-[#F29727] transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="copy border-t border-gray-800 py-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-gray-400">© 2025 AbaTrade - Houston-Aba Pilot Phase v4.0</h1>
              <div className="flex gap-6 text-gray-400">
                <a href="#" className="hover:text-[#F29727] transition-colors">Terms of use</a>
                <a href="#" className="hover:text-[#F29727] transition-colors">Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}