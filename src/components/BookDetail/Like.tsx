"use client";
import { Book, likes } from "@/types/book";
import styles from "./like.module.css";
import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
export default function ActionBar({ book_id }: { book_id: string }) {
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const { user } = useUser();

  const { data: likes, isLoading } = useSWR<likes[] | null>(
    `/api/like/${book_id}`
  );
  const liked = user && likes?.find((item) => item.user_id == user.id);

  const handleLike = async () => {
    setLikeLoading(true);
    if (!user) {
      alert("로그인이 필요합니다.");
      setLikeLoading(false);
      return;
    }
    if (!liked) {
      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({ book_id: book_id, user_id: user.id }),
      });
    } else {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify({ like_id: liked.id }),
      });
    }
    mutate(`/api/like/${book_id}`);
    setLikeLoading(false);
  };

  return (
    <div>
      <button
        className={`${styles.like} ${liked ? styles.on : styles.off}`}
        onClick={handleLike}
        disabled={likeLoading}
      >
        좋아요 {likes?.length || ""}
      </button>
    </div>
  );
}
