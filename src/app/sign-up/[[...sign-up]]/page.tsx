"use client";

import BgGradient from "@/components/common/BgGradient";
import { SignUp } from "@/components/common/SignUp";

export default function Page() {
  return (
    <section className="flex justify-center items-center h-[90vh] w-full">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient>
          <SignUp />
        </BgGradient>
      </div>
    </section>
  );
}