"use client";
import { likes } from "@/types/book";
import styles from "./like.module.css";
import { useUser } from "@/context/AuthContext";
import { useState } from "react";
import useSWR, { mutate } from "swr";
export default function ActionBar({ book_id }: { book_id: number }) {
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const { user } = useUser();

  const { data: likes, isLoading } = useSWR<likes[]>(`/api/like/${book_id}`);
  const liked =
    (user &&
      likes?.length &&
      likes.filter((item) => item.user_id == user.id)) ||
    [];

  const handleLike = async () => {
    setLikeLoading(true);
    if (!user) {
      alert("로그인이 필요합니다.");
      setLikeLoading(false);
      return;
    }
    if (liked.length === 0) {
      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({ book_id: book_id, user_id: user.id }),
      });
      const newLike = likes && [
        ...likes,
        { book_id: book_id, user_id: user.id },
      ];
      mutate(`/api/like/${book_id}`, {
        optimisticData: newLike,
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    } else {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify({ like_id: liked[0].id }),
      });
      const newLike = likes && likes.filter((like) => like.id !== liked[0].id);
      mutate(`/api/like/${book_id}`, {
        optimisticData: newLike,
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });
    }

    setLikeLoading(false);
  };

  return (
    <div>
      <button
        className={`${styles.like} ${liked.length ? styles.on : styles.off}`}
        onClick={handleLike}
        disabled={likeLoading}
      >
        좋아요 {likes?.length}
      </button>
    </div>
  );
}
