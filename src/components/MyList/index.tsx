"use client";
import { useUser } from "@/context/AuthContext";
import React, { useState } from "react";
import useSWR from "swr";
import MyLikesList from "../MyLikesList";
import MyCommenstList from "../MyCommentsList";

export default function MyList() {
  const [tab, setTab] = useState<"like" | "comment">("like");
  const { user } = useUser();
  const { data } = useSWR(user ? `/api/me` : null);
  return (
    <div>
      <div>
        <button onClick={() => setTab("like")}>
          좋아요 {data ? data.likes.data.length : "-"}
        </button>
        <button onClick={() => setTab("comment")}>
          코멘트 {data ? data.comments.data.length : "-"}
        </button>
      </div>
      {tab === "like" ? <MyLikesList /> : <MyCommenstList />}
    </div>
  );
}
