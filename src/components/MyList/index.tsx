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
  const { data: likes, isLoading: likesLoading } = useSWR(`/api/me/like`);
  const { data: comments, isLoading: commentsLoading } =
    useSWR(`/api/me/comment`);
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
            <span className={styles.count}>{likes ? likes.length : "-"}</span>
          </button>
          <button
            className={`${styles.tabBtn} ${
              tab === "comment" ? styles.active : ""
            }`}
            onClick={() => setTab("comment")}
          >
            <span className={styles.name}>코멘트</span>
            <span className={styles.count}>
              {comments ? comments.length : "-"}
            </span>
          </button>
        </div>
      </div>
      {tab === "like" ? <MyLikesList /> : <MyCommenstList />}
    </div>
  );
}
