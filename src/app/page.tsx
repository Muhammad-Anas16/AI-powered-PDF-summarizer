"use client";

import BgGradient from "@/components/common/BgGradient";
import CTA_Section from "@/components/Home/CTA_Section";
import DemoSection from "@/components/Home/DemoSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorkSection from "@/components/Home/HowItWorkSection";
import PricingSection from "@/components/Home/PricingSection";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function Home() {
  useEffect(() => {
    const token = Cookies.get("token"); // Get JWT from cookie
    if (token) {
      try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      console.log("Decoded User ID:", decoded.id);
      
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
      }
    } else {
      console.log("⚠️ No user token found in cookies");
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