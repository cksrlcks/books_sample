"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export default function ActiveLink({
  activeCss,
  href,
  children,
  className,
}: {
  activeCss: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const path = usePathname();
  const segment = useSelectedLayoutSegment();
  const isActive = path === href || (segment && href.includes(segment));
  return (
    <Link
      href={href}
      className={isActive ? `${activeCss} ${className}` : className}
    >
      {children}
    </Link>
  );
}
