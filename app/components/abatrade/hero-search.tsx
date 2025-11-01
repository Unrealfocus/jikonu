"use client";

import { useState } from "react";
import { Search, Upload, ShieldCheck, Award, Globe } from "lucide-react";
import SlideUp from "../animation/slideUp";

const popularTags = [
  "Leather Bags",
  "Shoes",
  "Clothing",
  "Accessories",
  "Home Decor",
  "Textiles",
];

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Search:", searchQuery);
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SlideUp>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect with Authentic{" "}
              <span className="text-[#F29727]">Nigerian Artisans</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Houston's trusted marketplace for verified craftsmanship from Aba,
              Nigeria
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-xl p-3 mb-6 flex flex-col md:flex-row gap-3"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products, artisans, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#F29727] text-gray-900"
                />
              </div>

              <label className="flex items-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  Search by Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                className="px-8 py-4 bg-[#F29727] hover:bg-[#d97f0f] text-white font-semibold rounded-xl transition-colors"
              >
                Search
              </button>
            </form>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              <span className="text-sm text-gray-600">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white hover:bg-[#F29727] hover:text-white text-gray-700 rounded-full text-sm font-medium transition-all shadow-sm border border-gray-200"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#F29727]" />
                <span className="font-semibold text-gray-800">
                  Verified Sellers
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <Award className="w-6 h-6 text-[#F29727]" />
                <span className="font-semibold text-gray-800">
                  Quality Guaranteed
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <Globe className="w-6 h-6 text-[#F29727]" />
                <span className="font-semibold text-gray-800">
                  Global Shipping
                </span>
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
