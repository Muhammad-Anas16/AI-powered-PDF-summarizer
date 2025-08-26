"use client";

import { usePathname, useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import NavLink from "./navLink";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token in cookies whenever path changes
  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  // If user is on sign-in or sign-up page → only show logo
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return (
      <nav className="flex justify-between items-center py-4 lg:px-8 px-4">
        <div>
          <NavLink
            href={"/"}
            className="flex items-center gap-1 lg:gap-2 shrink-0"
          >
            <FileText className="w-5 h-5 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-semibold lg:text-xl text-gray-900">Lubb</span>
          </NavLink>
        </div>
      </nav>
    );
  }

  // Protected link click handler
  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/sign-in");
    } else {
      router.push(href);
    }
  };

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("token");        // Clear token
    setIsLoggedIn(false);           // Update state immediately
    router.push("/");               // Redirect to home
  };

  return (
    <nav className="flex justify-between items-center py-4 lg:px-8 px-4">
      {/* Logo */}
      <div>
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FileText className="w-5 h-5 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-semibold lg:text-xl text-gray-900">Lubb</span>
        </NavLink>
      </div>

      {/* Center Nav Items */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        {/* <NavLink href="/#pricing">Pricing</NavLink> */}
        <button
          onClick={(e) => handleProtectedClick(e, "/dashboard")}
          className="capitalize hover:underline"
        >
          Your Summaries
        </button>
      </div>

      {/* Right Nav Items */}
      <div className="flex lg:justify-end gap-4 items-center">
        <button
          onClick={(e) => handleProtectedClick(e, "/upload")}
          className="hover:underline"
        >
          Upload a PDF
        </button>

        {!isLoggedIn ? (
          <NavLink href="/sign-in" className="hover:underline">
            Sign In
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:underline text-red-600 font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;