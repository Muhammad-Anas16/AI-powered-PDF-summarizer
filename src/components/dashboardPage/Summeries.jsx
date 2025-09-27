"use client";
import { useState } from "react";
import { FileText } from "lucide-react";

const summariesData = [
  {
    title: "Q3 Financial Performance",
    description: "This summary outlines the key findings from Q3.",
    date: "2024-03-15",
  },
  {
    title: "Research Paper: AI in Healthcare",
    description: "An overview of recent advancements in AI for healthcare.",
    date: "2024-03-10",
  },
];

const Summaries = () => {
  const [filter, setFilter] = useState("Most Recent");

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Your Summaries</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Browse, search, and manage all your generated PDF summaries.
          </p>
        </div>
      </div>

      {/* Summaries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summariesData.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500">Generated: {item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summaries;