"use client";
import BackButton from "@/components/BackButton";
import Book from "@/components/BookCard";
import SearchBook from "@/components/SearchBook";
import React, { FormEvent, useState } from "react";
import styles from "./style.module.css";
import Inner from "@/components/Inner";

export default function SearchPage() {
  const [sw, setSw] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/book/search?sw=${sw}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <>
      <BackButton />
      <Inner>
        <SearchBook value={sw} setValue={setSw} handleSearch={handleSubmit} />
        <br />
        {loading && <div>검색중입니다...</div>}

        <div className={styles.resultList}>
          {result &&
            result.map((book) => (
              <div className={styles.item} key={book.id}>
                <Book item={book} />
              </div>
            ))}
        </div>
      </Inner>
    </>
  );
}
