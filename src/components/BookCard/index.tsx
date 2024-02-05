import React from "react";
import styles from "./style.module.css";
import { Book, RecentBook } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import Timeago from "../Timeago";

export default function Book({
  item,
  desc = "hide",
  type = "full",
}: {
  item: RecentBook;
  desc?: "show" | "hide";
  type?: "simple" | "full";
}) {
  return (
    <Link href={`/book/${item.id}`}>
      <article className={styles.bookItem}>
        <figure className={styles.bookThumbFrame}>
          {item["cover_img_url"] ? (
            <Image src={item["cover_img_url"]} alt={item.name} fill />
          ) : (
            <div className={styles.bookTempCover}>book</div>
          )}
        </figure>
        <div className={styles.action}>
          <div className={`${styles.bookIcon} ${styles.like}`}>
            <FcLike />
            <span className={styles.count}>{item.likes.length}</span>
          </div>
          <div className={`${styles.bookIcon} ${styles.comment}`}>
            <FcComments />
            <span className={styles.count}>{item.comments.length}</span>
          </div>
        </div>
        <div className={styles.bookName}>{item.name}</div>
        <div className={styles.writter}>
          {item.writter} · {item.publisher}
        </div>
        {desc === "show" && (
          <div className={styles.bookText}>{item.description}</div>
        )}
        <div className={styles.bookDate}>
          <Timeago date={item.created_at} />
        </div>
      </article>
    </Link>
  );
}
