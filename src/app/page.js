"use client";

import CTA from "@/components/landingPage/CTA";
import Features from "@/components/landingPage/Features";
import Hero from "@/components/landingPage/Hero";
import Pricing from "@/components/landingPage/Pricing";

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#FAFAFB] p-0 m-0">
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </main>
  );
}