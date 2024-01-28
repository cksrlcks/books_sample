"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export default function ActiveLink({
  activeCss,
  href,
  children,
}: {
  activeCss: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const segment = useSelectedLayoutSegment();
  const isActive = path === href || (segment && href.includes(segment));
  return (
    <Link href={href} className={isActive ? activeCss : ""}>
      {children}
    </Link>
  );
}
