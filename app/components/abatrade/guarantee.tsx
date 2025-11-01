"use client";

import { CheckCircle2, Users, Search as SearchIcon, Lock } from "lucide-react";
import SlideUp from "../animation/slideUp";

const pillars = [
  {
    icon: Users,
    title: "On-the-Ground Verification",
    description:
      "Field team in Aba personally vets every artisan with physical workshop visits, identity verification, and product quality confirmation before listing approval.",
    features: [
      "Physical workshop visits required",
      "Identity verification mandatory",
      "Product quality confirmation",
      "Direct artisan validation",
    ],
  },
  {
    icon: SearchIcon,
    title: "Expert Quality Inspection",
    subtitle: "AbaTrade Inspect™",
    description:
      "Optional add-on service where our inspector visits the seller's workshop before shipping to verify your order matches expectations with photo documentation.",
    features: [
      "Inspector visits seller's workshop",
      "Pre-shipping verification",
      "Photo documentation provided",
      "Buyer approval before shipping",
    ],
  },
  {
    icon: Lock,
    title: "Secure Escrow System",
    description:
      "Payment held by AbaTrade until delivery confirmation. Funds only released after buyer approval with complete purchase protection and dispute resolution included.",
    features: [
      "Payment held until delivery",
      "Buyer approval required",
      "Complete purchase protection",
      "Dispute resolution included",
    ],
  },
];

export default function AbaTradeGuarantee() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              The <span className="text-[#F29727]">AbaTrade Guarantee</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our three-pillar trust system ensures every transaction is secure,
              verified, and quality-assured
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <SlideUp key={index} delay={index * 0.1}>
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 h-full flex flex-col">
                <div className="bg-[#F29727] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Pillar {index + 1}: {pillar.title}
                </h3>

                {pillar.subtitle && (
                  <div className="inline-block bg-[#F29727] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                    {pillar.subtitle}
                  </div>
                )}

                <p className="text-gray-600 mb-6 flex-grow">
                  {pillar.description}
                </p>

                <ul className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#F29727] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
