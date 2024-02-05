"use client";
import { useUser } from "@/context/AuthContext";
import React, { useState } from "react";
import useSWR from "swr";
import MyLikesList from "../MyLikesList";
import MyCommenstList from "../MyCommentsList";
import styles from "./style.module.css";

export default function MyList() {
  const [tab, setTab] = useState<"like" | "comment">("like");
  const { user } = useUser();
  const { data } = useSWR(user ? `/api/me` : null);
  return (
    <div>
      <div className={styles.tab}>
        <div className={styles.tabInner}>
          <button
            className={`${styles.tabBtn} ${
              tab === "like" ? styles.active : ""
            }`}
            onClick={() => setTab("like")}
          >
            <span className={styles.name}>좋아요</span>
            <span className={styles.count}>
              {data ? data.likes.data.length : "-"}
            </span>
          </button>
          <button
            className={`${styles.tabBtn} ${
              tab === "comment" ? styles.active : ""
            }`}
            onClick={() => setTab("comment")}
          >
            <span className={styles.name}>코멘트</span>
            <span className={styles.count}>
              {data ? data.comments.data.length : "-"}
            </span>
          </button>
        </div>
      </div>
      {tab === "like" ? <MyLikesList /> : <MyCommenstList />}
    </div>
  );
}
