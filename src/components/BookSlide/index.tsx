"use client";
import React from "react";
import styles from "./styles.module.css";
import { RecentBook } from "@/types/book";
import Book from "../BookCard";
import Slider from "../Swiper";
import useSWR from "swr";
import Skeleton from "../BookCard/Skeleton";

export default function BookSlide({
  filter,
}: {
  filter: "recent" | "likes" | "comments";
}) {
  const {
    data: items,
    isLoading,
    error,
  } = useSWR<RecentBook[]>(`/api/book/recent?filter=${filter}`);
  const SkeletonTempArray = Array.from({ length: 5 }, (v, index) => index);
  return (
    <div className={styles.container}>
      {isLoading && (
        <Slider slidesPerView="auto">
          <div className={styles.item} style={{ marginRight: 16 }}>
            <Skeleton />
          </div>
          <div className={styles.item} style={{ marginRight: 16 }}>
            <Skeleton />
          </div>
          <div className={styles.item} style={{ marginRight: 16 }}>
            <Skeleton />
          </div>
          <div className={styles.item} style={{ marginRight: 16 }}>
            <Skeleton />
          </div>
          <div className={styles.item} style={{ marginRight: 16 }}>
            <Skeleton />
          </div>
        </Slider>
      )}
      {items && (
        <Slider slidesPerView="auto" spaceBetween={16}>
          {items.map((book) => (
            <div className={styles.item} key={book.id}>
              <Book item={book} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
