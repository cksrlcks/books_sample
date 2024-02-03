"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./style.module.css";

export default function DeleteButton({
  comment_id,
  book_id,
}: {
  comment_id: number;
  book_id: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const willDelete = confirm("정말 삭제하시겠습니까?");
    if (!willDelete) return;
    try {
      await fetch(`/api/comment/${book_id}`, {
        method: "DELETE",
        body: JSON.stringify({
          comment_id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    router.refresh();
  };
  return (
    <>
      {!isLoading && (
        <button onClick={handleDelete} className={styles.button}>
          삭제
        </button>
      )}
    </>
  );
}
