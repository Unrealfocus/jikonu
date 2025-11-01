"use client";

import { Shield, Users } from "lucide-react";
// import SlideUp from "../animation/slideUp";

const buyerProtection = [
  "Verified seller guarantee",
  "Quality inspection option",
  "Escrow payment security",
  "Dispute resolution",
  "Full refund policy",
];

const sellerProtection = [
  "Guaranteed payment post-delivery",
  "Protection against fraud",
  "Marketing support",
  "Logistics assistance",
  "Business growth tools",
];

export default function Protection() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* <SlideUp> */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            End-to-End <span className="text-[#F29727]">Protection</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive security for both buyers and sellers
          </p>
        </div>
        {/* </SlideUp> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Buyer Protection */}
          {/* <SlideUp delay={0.1}> */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#F29727] h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#F29727] w-14 h-14 rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Buyer Protection
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Shop with confidence knowing every purchase is protected by our
              comprehensive buyer guarantee program.
            </p>

            <ul className="space-y-4">
              {buyerProtection.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-[#F29727] rounded-full p-1 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-gray-700 font-semibold">
                💡 Your payment is held securely until you confirm receipt and
                satisfaction
              </p>
            </div>
          </div>
          {/* </SlideUp> */}

          {/* Seller Protection */}
          {/* <SlideUp delay={0.2}> */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-500 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Seller Protection
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Sell with peace of mind knowing your business is supported and
              protected at every step.
            </p>

            <ul className="space-y-4">
              {sellerProtection.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-blue-500 rounded-full p-1 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700 font-semibold">
                💼 Focus on your craft while we handle payments, shipping, and
                customer support
              </p>
            </div>
          </div>
          {/* </SlideUp> */}
        </div>
      </div>
    </section>
  );
}
