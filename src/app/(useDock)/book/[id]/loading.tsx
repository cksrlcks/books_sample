import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "@/components/BookDetail/style.module.css";
import Inner from "@/components/Inner";
export default function loading() {
  return (
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
  );
}
