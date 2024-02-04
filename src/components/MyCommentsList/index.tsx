"use client";
import { Comment } from "@/types/me";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import styles from "./style.module.css";
import DeleteButton from "../Comments/DeleteButton";

export default function CommentList() {
  const { data, isLoading, mutate } = useSWR<Comment[]>("/api/me/comment");
  const handleMutate = () => {
    mutate();
  };
  return (
    <div>
      {isLoading ? (
        <div>가져오는중</div>
      ) : (
        <div className={styles.list}>
          {data?.map((comment) => (
            <Link href={`/book/${comment.books.id}`} key={comment.id}>
              {comment.books.name}
              <br />
              {comment.comment}
              <br />
              <DeleteButton comment_id={comment.id} callback={handleMutate} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
