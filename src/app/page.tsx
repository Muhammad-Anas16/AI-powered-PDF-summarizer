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
import { useDispatch } from "react-redux";
import { setUserId, clearUserId } from "@/redux/slices/userSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token"); // Get JWT from cookie
    if (token) {
      try {
        interface MyTokenPayload {
          id: string;
        }

        const decoded = jwtDecode<MyTokenPayload>(token);
        console.log("user token found in cookies");
        // console.log("user token found in cookies", decoded);
        // console.log("Decoded User ID:", decoded.id);

        if (decoded?.id) {
          dispatch(setUserId(decoded.id));
        } else {
          dispatch(clearUserId());
        }
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
        dispatch(clearUserId());
      }
    } else {
      console.log("⚠️ No user token found in cookies");
      dispatch(clearUserId());
    }
  }, [dispatch]);

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