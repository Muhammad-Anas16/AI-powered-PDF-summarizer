import React from "react";
import { ArrowRight } from "lucide-react";

const CTA_Section = () => {
  return (
    <section className="w-full bg-white py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ready to Save Hours of Reading Time?
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Transform lengthy documents into clear, actionable insights with our
          AI-powered summarizer.
        </p>

        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white
          bg-gradient-to-r from-green-800 via-green-500 to-green-300
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg hover:shadow-green-400/40
          hover:from-green-700 hover:via-green-400 hover:to-green-200
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Get Started <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default CTA_Section;
