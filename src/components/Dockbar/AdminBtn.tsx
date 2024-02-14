"use client";
import Link from "next/link";
import { useUser } from "@/context/AuthContext";
import styles from "./style.module.css";

export default function AdminBtn() {
  const { profile } = useUser();
  return (
    <>
      {profile?.role === "admin" && (
        <Link href="/admin" className={styles.adminBtn}>
          관리자
        </Link>
      )}
    </>
  );
}
