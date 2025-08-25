"use client";

import BgGradient from "@/components/common/BgGradient";
import CTA_Section from "@/components/Home/CTA_Section";
import DemoSection from "@/components/Home/DemoSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorkSection from "@/components/Home/HowItWorkSection";
import PricingSection from "@/components/Home/PricingSection";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // 👇 Make sure to use the same key you used in SignIn (you used "token")
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("✅ Decoded JWT:", decoded); // You'll see payload in console
      } catch (err) {
        console.error("❌ Failed to decode token", err);
      }
    } else {
      console.log("⚠️ No auth token found");
    }
  }, []);

  return (
    <div className="relative">
      <BgGradient>
        <HeroSection />
        <DemoSection />
        <HowItWorkSection />
        <PricingSection />
        <CTA_Section />
      </BgGradient>
    </div>
  );
}