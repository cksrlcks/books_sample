"use client";
import React from "react";
import useSWR from "swr";
import styles from "./style.module.css";
import { format, register } from "timeago.js";
import { ko } from "timeago.js/lib/lang";
import BackButton from "../BackButton";
import Inner from "../Inner";
import ActionBar from "./Like";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
register("ko", ko);

export default function BookDetail({ bookId }: { bookId: string }) {
  const { data: book, isLoading, error } = useSWR(`/api/book/${bookId}`);
  return (
    <>
      <div className={styles.header}>
        <BackButton />
      </div>
      {isLoading ? (
        <div className={styles.skeleton}>
          <figure className={styles.frame}>
            <Skeleton className={styles.img} />
          </figure>
          <Inner>
            <Skeleton className={styles.bookName} />
            <Skeleton className={styles.writter} />
            <Skeleton className={styles.bookDate} />
            <Skeleton className={styles.bookText} />
          </Inner>
        </div>
      ) : (
        <>
          <figure className={styles.frame}>
            <img src={book.cover_img_url} alt={book.name} />
          </figure>
          <Inner>
            <ActionBar book_id={book.id} />
          </Inner>
          <Inner>
            <div className={styles.bookName}>{book.name}</div>
            <div className={styles.writter}>
              {book.writter} · {book.publisher}
            </div>
            <div className={styles.bookDate}>
              등록일 : {format(book.created_at, "ko")}
            </div>
            <div className={styles.bookText}>{book.description}</div>
          </Inner>
        </>
      )}
    </>
  );
}
