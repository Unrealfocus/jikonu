"use client";

import {
  Search,
  ShoppingCart,
  CheckCircle2,
  Truck,
  ThumbsUp,
} from "lucide-react";
// import SlideUp from "../animation/slideUp";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Browse & Select",
    description:
      "Search products or browse categories, view verified artisan profiles, and compare options and prices.",
    color: "bg-blue-500",
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: "Secure Checkout",
    description:
      "Add optional AbaTrade Inspect™, complete payment held in escrow, and receive order confirmation sent to seller.",
    color: "bg-purple-500",
  },
  {
    number: 3,
    icon: CheckCircle2,
    title: "Quality Verification",
    description:
      "Inspector visits workshop (if Inspect™ selected), product verification photos sent, and buyer approval before shipping.",
    color: "bg-green-500",
  },
  {
    number: 4,
    icon: Truck,
    title: "Reliable Shipping",
    description:
      "AbaTrade Logistics handles transport, real-time tracking provided, and customs clearance managed.",
    color: "bg-orange-500",
  },
  {
    number: 5,
    icon: ThumbsUp,
    title: "Safe Delivery",
    description:
      "Delivery to Houston address, buyer confirms receipt, payment released to seller, and review/rating option.",
    color: "bg-red-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* <SlideUp> */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How <span className="text-[#F29727]">AbaTrade Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your complete journey from browsing to delivery in 5 simple steps
          </p>
        </div>
        {/* </SlideUp> */}

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            // <SlideUp key={index} delay={index * 0.1}>
            <div key={index} className="relative mb-12 last:mb-0">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-[#F29727] to-transparent" />
              )}

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Icon Side */}
                <div className="flex-shrink-0">
                  <div
                    className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block bg-[#F29727] text-white text-sm font-bold px-3 py-1 rounded-full">
                      Step {step.number}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-grow bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border border-orange-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
            // {/* </SlideUp> */}
          ))}
        </div>

        {/* <SlideUp delay={0.5}> */}
        <div className="text-center mt-12">
          <button className="bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
            Start Shopping Now
          </button>
        </div>
        {/* </SlideUp> */}
      </div>
    </section>
  );
}
