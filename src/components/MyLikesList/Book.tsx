import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { format, register } from "timeago.js";
import { ko } from "timeago.js/lib/lang";
import { Like } from "@/types/me";
register("ko", ko);

export default function BookCard({ like }: { like: Like }) {
  const { books: item, created_at } = like;
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

        <div className={styles.bookName}>{item.name}</div>
        <div className={styles.writter}>
          {item.writter} · {item.publisher}
        </div>

        <div className={styles.bookDate}>
          좋아요 등록 : {format(created_at, "ko")}
        </div>
      </article>
    </Link>
  );
}
