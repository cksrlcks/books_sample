"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Inner from "../Inner";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./style.module.css";
export default function BackButton({
  path,
  mb = 30,
}: {
  path: string;
  mb?: number;
}) {
  const router = useRouter();
  const handleGoBack = () => {
    router.push(path);
  };
  return (
    <Inner style={{ marginBottom: mb }}>
      <button className={styles.back} onClick={handleGoBack}>
        <IoMdArrowRoundBack />
        <div className={styles.text}>뒤로가기</div>
      </button>
    </Inner>
  );
}
