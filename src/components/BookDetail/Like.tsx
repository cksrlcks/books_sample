"use client";
import { Book, likes } from "@/types/book";
import styles from "./like.module.css";
import useSWR, { mutate } from "swr";
import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
export default function ActionBar({ book }: { book: Book }) {
  const { user } = useUser();
  const router = useRouter();
  const liked = user && book.likes?.find((item) => item.user_id == user.id);
  const handleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!liked) {
      await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({ book_id: book.id, user_id: user.id }),
      });
    } else {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify({ like_id: liked.id }),
      });
    }

    router.refresh();
  };
  return (
    <div>
      <button
        className={`${styles.like} ${liked ? styles.on : styles.off}`}
        onClick={handleLike}
      >
        좋아요 {book.likes?.length || ""}
      </button>
    </div>
  );
}
