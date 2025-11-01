"use client";

import { MapPin, Award, Star, Package, Eye } from "lucide-react";
import SlideUp from "../animation/slideUp";

export default function FeaturedArtisan() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-[#F29727]">Artisan Spotlight</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the master craftspeople behind our authentic products
            </p>
          </div>
        </SlideUp>

        <div className="max-w-6xl mx-auto">
          <SlideUp delay={0.2}>
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Side */}
                <div className="relative h-96 lg:h-auto bg-gradient-to-br from-orange-300 to-orange-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-16 h-16" />
                      </div>
                      <p className="text-lg font-semibold">Chioma Okeke</p>
                      <p className="text-sm opacity-90">Master Craftsperson</p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-[#F29727] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured Artisan
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      Chioma Okeke
                    </h3>
                    <p className="text-lg text-[#F29727] font-semibold mb-4">
                      Royal Leather Crafts
                    </p>

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 text-[#F29727]" />
                      <span>Ariaria Market, Aba, Nigeria</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-5 h-5 text-[#F29727]" />
                      <span className="font-semibold">15+ Years Experience</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Leather Bags", "Custom Wallets", "Belts", "Accessories"].map(
                        (specialty) => (
                          <span
                            key={specialty}
                            className="bg-white border border-[#F29727] text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Success Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-[#F29727]" />
                        <span className="text-2xl font-bold text-gray-900">
                          500+
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Orders Completed</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-[#F29727]" />
                        <span className="text-2xl font-bold text-gray-900">
                          4.9/5
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Satisfaction Rate</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-[#F29727] hover:bg-[#d97f0f] text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" />
                      Visit Workshop
                    </button>
                    <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-xl border-2 border-gray-200 transition-colors">
                      View Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
