import React from "react";
import styles from "./style.module.css";
import { RecentBook } from "@/types/book";
import Image from "next/image";
import Link from "next/link";

export default function Book({ item }: { item: RecentBook }) {
  return (
    <Link href={`/book/${item.bookId}`}>
      <article className={styles.bookItem}>
        <figure className={styles.bookThumbFrame}>
          {item.coverImageUrl ? (
            <Image src={item.coverImageUrl} alt={item.name} fill />
          ) : (
            <div className={styles.bookTempCover}>book</div>
          )}
        </figure>
        <div className={styles.bookName}>{item.name}</div>
        <div className={styles.bookText}>{item.description}</div>
        <div className={styles.bookDate}>{item.regDate}</div>
        <div className={styles.bookLike}>좋아용 : {item.likes}</div>
      </article>
    </Link>
  );
}
