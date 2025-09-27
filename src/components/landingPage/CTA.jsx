"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const CTA = () => {
  const { user } = useUser();
  return (
    <section className="bg-teal-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to revolutionize your document workflow?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already saving time and gaining deeper
          insights from their PDFs.
        </p>
        <Link
          href={user ? "/dashboard" : "/sign-in"}
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded inline-block"
        >
          Start Summarizing Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;
