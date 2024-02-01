"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
      <div ref={ref}></div>
    </div>
  );
}
