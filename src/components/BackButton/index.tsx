"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Inner from "../Inner";

export default function BackButton({ mb = 20 }: { mb?: number }) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <Inner style={{ marginBottom: mb }}>
      <button onClick={handleGoBack}>뒤로가기</button>
    </Inner>
  );
}
