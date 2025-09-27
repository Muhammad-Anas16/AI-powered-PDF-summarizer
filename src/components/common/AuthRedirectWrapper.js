"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import FullPageLoader from "@/components/common/FullPageLoader";

export default function AuthRedirectWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && pathname === "/") {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [isSignedIn, isLoaded, pathname, router]);

  if (loading) return <FullPageLoader />;

  return <>{children}</>;
}