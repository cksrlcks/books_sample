"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return <button onClick={handleGoBack}>뒤로가기</button>;
}
