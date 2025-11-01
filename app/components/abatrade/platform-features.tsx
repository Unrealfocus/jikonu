"use client";

import { FileText, Palette, Truck } from "lucide-react";
import SlideUp from "../animation/slideUp";

const features = [
  {
    icon: FileText,
    title: "Request for Quotation (RFQ)",
    description:
      "Submit bulk order inquiries with custom specifications and negotiate directly with artisans for the best deals.",
    features: [
      "Bulk order inquiries",
      "Custom specifications",
      "Direct artisan negotiation",
      "Competitive pricing",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Palette,
    title: "Fast Customization",
    description:
      "Personalize your orders with logo additions, design modifications, and material variations with quick turnaround.",
    features: [
      "Logo additions",
      "Design modifications",
      "Color/material variations",
      "Quick turnaround options",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Truck,
    title: "AbaTrade Logistics",
    description:
      "End-to-end shipping management with customs clearance handling, tracking integration, and Houston delivery coordination.",
    features: [
      "End-to-end shipping",
      "Customs clearance handling",
      "Real-time tracking",
      "Houston delivery coordination",
    ],
    color: "from-orange-500 to-orange-600",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Key Platform <span className="text-[#F29727]">Features</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need for seamless cross-border trade
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#F29727] transition-all duration-300 h-full flex flex-col">
                <div
                  className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

                <p className="text-gray-300 mb-6 flex-grow">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F29727] font-bold">✓</span>
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-6 w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Learn More
                </button>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
