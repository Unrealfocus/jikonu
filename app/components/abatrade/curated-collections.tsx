"use client";

import { Heart, ArrowRight } from "lucide-react";
import SlideUp from "../animation/slideUp";
import Image from "next/image";

const collections = [
  {
    title: "Houston-Aba Pilot Collection",
    description: "Handpicked items exclusively for our Houston pilot program",
    itemCount: 150,
    image: "/assets/collection-1.jpg",
    tag: "Exclusive",
  },
  {
    title: "Bestseller Collection",
    description: "Most popular items from our verified artisans",
    itemCount: 200,
    image: "/assets/collection-2.jpg",
    tag: "Popular",
  },
  {
    title: "Staff Picks",
    description: "Curated selections from our team of experts",
    itemCount: 75,
    image: "/assets/collection-3.jpg",
    tag: "Featured",
  },
  {
    title: "Limited Edition",
    description: "Rare and unique handcrafted items",
    itemCount: 50,
    image: "/assets/collection-4.jpg",
    tag: "Limited",
  },
];

export default function CuratedCollections() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4 md:px-6">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Curated <span className="text-[#F29727]">Collections</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover handpicked selections from the finest artisans in Aba
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-orange-200 to-orange-300 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl font-bold">
                    {collection.itemCount}+
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <button className="bg-white/90 hover:bg-[#F29727] hover:text-white p-2 rounded-full transition-colors shadow-lg">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#F29727] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {collection.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#F29727]">
                      {collection.itemCount} Items
                    </span>
                    <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-[#F29727] transition-colors group">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
