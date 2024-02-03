"use client";
import { BookData, likes } from "@/types/book";
import styles from "./like.module.css";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { User } from "@/types/user";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
export default function ActionBar({
  user,
  book,
}: {
  user: User | null;
  book: BookData;
}) {
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const likes = book.likes;
  const router = useRouter();

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
        body: JSON.stringify({ book_id: book.id, user_id: user.id }),
      });
    } else {
      await fetch("/api/like", {
        method: "DELETE",
        body: JSON.stringify({ like_id: liked[0].id }),
      });
    }
    router.refresh();
    setLikeLoading(false);
  };

  return (
    <button
      className={`${styles.like} ${liked.length ? styles.on : styles.off}`}
      onClick={handleLike}
      disabled={likeLoading}
    >
      좋아요 {likes?.length}
    </button>
  );
}
