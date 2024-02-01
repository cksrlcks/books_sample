import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import PageTitle from "@/components/PageTitle";
import Profile from "@/components/Profile";
import Inner from "@/components/Inner";
export default async function Mypage() {
  return (
    <Inner>
      <PageTitle name="마이페이지" />

      <div className={styles.me}>
        <Profile />
      </div>

      <ul className={styles.myNav}>
        <li>
          <Link href="/mypage/me" className={styles.link}>
            내정보
          </Link>
        </li>
        <li>
          <Link href="/mypage/activity" className={styles.link}>
            나의 활동
          </Link>
        </li>
        <li>
          <Link href="/mypage/notice" className={styles.link}>
            공지사항
          </Link>
        </li>
      </ul>
    </Inner>
  );
}
