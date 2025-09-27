"use client";

import { usePathname, useRouter } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!user && !isLoaded &&
      pathname !== "/" &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      router.push("/sign-in");
    }
  }, [user, isLoaded, pathname, router]);

  return (
    <>
      {pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/dashboard" || pathname === "/SummerizePdf" ? null : <Navbar />}

      {children}

      {pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/dashboard" || pathname === "/SummerizePdf" ? null : <Footer />}
    </>
  );
}