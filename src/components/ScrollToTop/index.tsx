"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);
  return null;
}
