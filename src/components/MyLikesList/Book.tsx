import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { Like } from "@/types/me";
import Timeago from "../Timeago";

export default function BookCard({ like }: { like: Like }) {
  const { books: item, created_at } = like;
  if (!item) {
    return <div>삭제된 책입니다.</div>;
  }
  return (
    <Link href={`/book/${item.id}`}>
      <article className={styles.bookItem}>
        <figure className={styles.bookThumbFrame}>
          {item["cover_img_url"] ? (
            <Image
              src={item["cover_img_url"]}
              alt={item.name}
              fill
              sizes="100%"
              priority={false}
            />
          ) : (
            <div className={styles.bookTempCover}>book</div>
          )}
        </figure>

        <div className={styles.bookName}>{item.name}</div>
        <div className={styles.writter}>
          {item.writter} · {item.publisher}
        </div>

        <div className={styles.bookDate}>
          좋아요 등록 : <Timeago date={created_at} />
        </div>
      </article>
    </Link>
  );
}
