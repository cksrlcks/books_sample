"use client";
import { useUser } from "@/context/AuthContext";
import React, { useState } from "react";
import useSWR from "swr";

export default function MyList() {
  const [tab, setTab] = useState<"like" | "comment">("like");
  const { user } = useUser();
  const { data } = useSWR(user ? `/api/activity?user_id=${user.id}` : null);
  console.log(data);
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
      {tab === "like" ? <div>좋아요탭</div> : <div>코멘트탭</div>}
    </div>
  );
}
