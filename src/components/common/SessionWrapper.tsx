"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email?: string;
  fullname?: string;
  exp?: number;
}

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      jwtDecode<DecodedToken>(token);
      // console.log("✅ Decoded user", decoded);
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }, []);

  return <>{children}</>;
}