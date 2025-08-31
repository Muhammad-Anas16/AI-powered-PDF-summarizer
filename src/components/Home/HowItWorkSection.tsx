"use client";

import { FileUp, Brain, FileText } from "lucide-react";
import { ReactNode } from "react";

interface Step {
  icon: ReactNode;
  label: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <FileUp className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />,
    label: "Upload PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />,
    label: "AI Analysis",
    description:
      "Our advanced AI processes and analyses your document instantly",
  },
  {
    icon: <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />,
    label: "Get Summary",
    description: "Receive a clear, concise summary of your document",
  },
];

const HowItWorkSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h3 className="text-green-600 font-semibold mb-2 tracking-wide uppercase text-sm sm:text-base">
            How it works
          </h3>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
            Transform any PDF into an easy-to-digest
            <br className="hidden sm:block" />
            summary in three simple steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-5 rounded-2xl bg-green-100 flex items-center justify-center">
                {step.icon}
              </div>
              <h4 className="font-semibold text-lg sm:text-xl">{step.label}</h4>
              <p className="text-gray-600 text-sm sm:text-base max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
