import React from "react";
import styles from "./styles.module.css";
import { RecentBook } from "@/types/book";
import Book from "../BookCard";
export default function BookSlide({ items }: { items: RecentBook[] }) {
  return (
    <div className={styles.container}>
      {items.map((book) => (
        <div className={styles.item}>
          <Book item={book} />
        </div>
      ))}
    </div>
  );
}
