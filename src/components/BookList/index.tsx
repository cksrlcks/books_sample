"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./style.module.css";
import Book from "../BookCard";
import { RecentBook } from "@/types/book";
import useSWRInfinite from "swr/infinite";
import Skeleton from "../BookCard/Skeleton";
import { useInView } from "react-intersection-observer";

export default function BookList() {
  const limit = 4;
  const getKey = (pageIndex: number, prevData: RecentBook[]) => {
    if (prevData && !prevData.length) return null;
    if (!pageIndex) return `/api/book?page=0&limit=${limit}`;
    return `/api/book?page=${pageIndex}&limit=${limit}`;
  };
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<RecentBook[]>(getKey);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);
  const items = useMemo(() => {
    const array: RecentBook[] = [];
    if (data) {
      return array.concat.apply([], data);
    }
  }, [data]);

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

        {items && (
          <>
            {items?.map((book) => (
              <div className={styles.item} key={book.id}>
                <Book item={book} desc="show" />
              </div>
            ))}
          </>
        )}
      </div>
      {isReachingEnd && (
        <div className={styles.done}>책을 모두 불러왔습니다.</div>
      )}
      <div ref={ref} style={{ width: "100%", height: "30px" }}></div>
    </>
  );
}
