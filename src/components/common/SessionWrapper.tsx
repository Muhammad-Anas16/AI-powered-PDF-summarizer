"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { de } from "zod/v4/locales";

interface DecodedToken {
  id: string;
  email?: string;
  fullname?: string;
  exp?: number;
}

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
      // console.log("✅ Decoded user", user);
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }, []);

  return <>{children}</>;
}