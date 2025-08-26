'use client';

import Link from "next/link";
import React from "react";
import { cn } from './../../lib/utils';
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-green-600 capitalize", className, isActive && 'text-rose-500')}
    >
      {children}
    </Link>
  );
};

export default NavLink;