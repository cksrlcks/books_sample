"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function index() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query_alert = searchParams.get("alert");
    const query_path = searchParams.get("redirect_url");
    if (query_alert) {
      alert(query_alert);
      if (query_path) {
        router.push(query_path);
      }
    }
  }, []);
  return null;
}
