import React from "react";
import styles from "./style.module.css";
import Book from "../BookCard";
import { RecentBook } from "@/types/book";
export default function BookList({ items }: { items: RecentBook[] }) {
  return (
    <div className={styles.bookList}>
      {items.map((book) => (
        <div className={styles.item}>
          <Book item={book} />
        </div>
      ))}
    </div>
  );
}
