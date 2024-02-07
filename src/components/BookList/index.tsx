"use client";
import { useEffect } from "react";
import styles from "./style.module.css";
import Book from "../BookCard";
import { RecentBook } from "@/types/book";
import Skeleton from "../BookCard/Skeleton";
import { useInView } from "react-intersection-observer";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";

export default function BookList() {
  const { data, error, isLoading, size, setSize, isEmpty, isEnd } =
    useInfiniteFetch<RecentBook>({
      url: "/api/book",
      limit: 4,
    });

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (!inView) {
      return;
    }
    setSize(size + 1);
  }, [inView]);

  return (
    <>
      <div className={styles.bookList}>
        {isLoading && (
          <>
            <div className={styles.item}>
              <Skeleton />
            </div>
            <div className={styles.item}>
              <Skeleton />
            </div>
            <div className={styles.item}>
              <Skeleton />
            </div>
            <div className={styles.item}>
              <Skeleton />
            </div>
            <div className={styles.item}>
              <Skeleton />
            </div>
          </>
        )}

        <>
          {data?.map((book) => (
            <div className={styles.item} key={book.id}>
              <Book item={book} desc="show" />
            </div>
          ))}
        </>
      </div>
      {isEnd && <div className={styles.done}>책을 모두 불러왔습니다.</div>}
      <div ref={ref} style={{ width: "100%", height: "30px" }}></div>
    </>
  );
}
