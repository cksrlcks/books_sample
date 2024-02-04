"use client";
import { Like } from "@/types/me";
import React from "react";
import useSWR from "swr";
import styles from "./style.module.css";
import Book from "./Book";

export default function MyLikeList() {
  const { data, isLoading } = useSWR<Like[]>("/api/me/like");
  return (
    <div>
      {isLoading ? (
        <div>가져오는중</div>
      ) : (
        <div className={styles.bookList}>
          {data?.map((like) => (
            <div className={styles.item} key={like.books.id}>
              <Book like={like} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
