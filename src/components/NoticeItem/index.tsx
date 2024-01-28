import { RecentNotice } from "@/types/notice";
import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
export default function NoticeItem({ item }: { item: RecentNotice }) {
  return (
    <Link href={`/mypage/notice/${item.id}`}>
      <div className={styles.item}>
        <div>{item.title}</div>
        <div>{item.regDate}</div>
      </div>
    </Link>
  );
}
