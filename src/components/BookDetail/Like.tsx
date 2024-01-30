"use client";
import { likes } from "@/types/book";
import styles from "./like.module.css";
import useSWR, { mutate } from "swr";
import { useUser } from "@/context/AuthContext";
export default function ActionBar({ book_id }: { book_id: string }) {
  const { user } = useUser();
  const { data: likes, isLoading } = useSWR<likes[] | null>(
    `/api/like/${book_id}`
  );
  const liked = user && likes?.find((item) => item.user_id == user.id);

  const handleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!liked) {
      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({ book_id, user_id: user.id }),
      });
    } else {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify({ like_id: liked.id }),
      });
    }

    mutate(`/api/like/${book_id}`);
  };
  return (
    <div>
      <button
        className={`${styles.like} ${liked ? styles.on : styles.off}`}
        onClick={handleLike}
      >
        좋아요 {likes?.length || ""}
      </button>
    </div>
  );
}
