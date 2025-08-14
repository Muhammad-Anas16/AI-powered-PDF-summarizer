"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Plan {
  title: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  buttonLabel: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    title: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    currency: "USD",
    period: "month",
    features: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    buttonLabel: "Buy Now →",
  },
  {
    title: "Pro",
    description: "For professionals and teams",
    price: 19,
    currency: "USD",
    period: "month",
    features: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    buttonLabel: "Buy Now →",
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h3 className="text-green-600 font-semibold mb-2 tracking-wide uppercase">
          Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-8 flex flex-col items-center text-center transition-all ${
                plan.highlighted
                  ? "border-green-500 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {/* Plan Title */}
              <h4 className="text-xl font-semibold mb-2">{plan.title}</h4>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ${plan.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  {plan.currency} / {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-gray-700 text-sm mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                className={`w-full rounded-full text-base py-3 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-green-800 via-green-500 to-green-300 hover:from-green-700 hover:via-green-400 hover:to-green-200 text-white"
                    : "bg-green-100 hover:bg-green-200 text-green-700"
                }`}
              >
                {plan.buttonLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
