"use client";
import { Comment } from "@/types/me";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import styles from "./style.module.css";
import DeleteButton from "../Comments/DeleteButton";
import { FcBookmark } from "react-icons/fc";
import Timeago from "../Timeago";

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
            <Link
              href={`/book/${comment.books.id}`}
              key={comment.id}
              className={styles.item}
            >
              <div className={styles.bookname}>
                <FcBookmark /> {comment.books.name}
              </div>
              <div className={styles.comment}>{comment.comment}</div>
              <div className={styles.control}>
                <span className={styles.date}>
                  등록일 : <Timeago date={comment.created_at} />
                </span>

                <DeleteButton comment_id={comment.id} callback={handleMutate} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
