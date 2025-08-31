"use client";

<<<<<<< HEAD
import { useEffect } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email?: string;
  fullname?: string;
  exp?: number;
}

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
<<<<<<< HEAD
=======
  const [user, setUser] = useState<DecodedToken | null>(null);

>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
<<<<<<< HEAD
      jwtDecode<DecodedToken>(token);
      // console.log("✅ Decoded user", decoded);
=======
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
      // console.log("✅ Decoded user", user);
>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }, []);

  return <>{children}</>;
}