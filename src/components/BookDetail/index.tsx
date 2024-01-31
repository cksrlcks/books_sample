"use client";
import React from "react";
import styles from "./style.module.css";
import { format, register } from "timeago.js";
import { ko } from "timeago.js/lib/lang";
import BackButton from "../BackButton";
import Inner from "../Inner";
import ActionBar from "./Like";
import "react-loading-skeleton/dist/skeleton.css";
import { Book } from "@/types/book";
register("ko", ko);

export default function BookDetail({ book }: { book: Book }) {
  return (
    <>
      <div className={styles.header}>
        <BackButton />
      </div>
      <>
        <figure className={styles.frame}>
          <img src={book.cover_img_url} alt={book.name} />
        </figure>
        <Inner>
          <ActionBar book={book} />
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
    </>
  );
}
