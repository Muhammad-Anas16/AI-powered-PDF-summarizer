"use client";

import BgGradient from "@/components/common/BgGradient";
import CTA_Section from "@/components/Home/CTA_Section";
import DemoSection from "@/components/Home/DemoSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorkSection from "@/components/Home/HowItWorkSection";
// import PricingSection from "@/components/Home/PricingSection";

export default function Home() {
  return (
    <div className="relative">
      <BgGradient>
        <HeroSection />
        <DemoSection />
        <HowItWorkSection />
        {/* <PricingSection /> */}
        <CTA_Section />
      </BgGradient>
    </div>
  );
}
