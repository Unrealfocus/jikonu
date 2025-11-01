"use client";

import { Users, Heart, TrendingUp, Award } from "lucide-react";
import SlideUp from "../animation/slideUp";

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Verified Sellers",
    description: "Handpicked artisans from Aba",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Heart,
    number: "10,000+",
    label: "Happy Customers",
    description: "Satisfied buyers worldwide",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Award,
    number: "98%",
    label: "Success Rate",
    description: "Orders completed successfully",
    color: "from-green-500 to-green-600",
  },
  {
    icon: TrendingUp,
    number: "Growing",
    label: "Network",
    description: "Expanding daily",
    color: "from-orange-500 to-orange-600",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-[#F29727]">Thousands</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join our growing community of satisfied customers and verified
              artisans
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#F29727] transition-all duration-300 text-center group">
                <div
                  className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>

                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>

                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            </SlideUp>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <SlideUp delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold">Verified Platform</div>
                  <div className="text-sm text-gray-400">Secure & Trusted</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Quality Guaranteed</div>
                  <div className="text-sm text-gray-400">100% Authentic</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F29727] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold">24/7 Support</div>
                  <div className="text-sm text-gray-400">Always Here</div>
                </div>
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
