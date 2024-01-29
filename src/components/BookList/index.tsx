"use client";
import React from "react";
import styles from "./style.module.css";
import Book from "../BookCard";
import { RecentBook } from "@/types/book";
import useSWR from "swr";
import Skeleton from "../BookCard/Skeleton";
export default function BookList() {
  const { data: items, isLoading, error } = useSWR<RecentBook[]>("/api/book");
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
      {items &&
        items.map((book) => (
          <div className={styles.item} key={book.id}>
            <Book item={book} desc="show" />
          </div>
        ))}
    </div>
  );
}
