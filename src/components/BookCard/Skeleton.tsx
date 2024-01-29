import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./style.module.css";
export default function SkeletonUI() {
  return (
    <article className={styles.bookItem}>
      <figure className={styles.bookThumbFrame}>
        <Skeleton className={styles.bookTempCover} />
      </figure>

      <Skeleton className={styles.bookName} />
      <Skeleton className={styles.writter} />
      <Skeleton className={styles.bookDate} />
    </article>
  );
}
