"use client";
import BackButton from "@/components/BackButton";
import Book from "@/components/BookCard";
import SearchBook from "@/components/SearchBar";
import React, { FormEvent, useState } from "react";
import styles from "./style.module.css";
import Inner from "@/components/Inner";
import { RecentBook } from "@/types/book";

export default function SearchPage() {
  const [sw, setSw] = useState("");
  const [result, setResult] = useState<RecentBook[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    setLoading(true);
    const res = await fetch(`/api/book/search?sw=${sw}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };
  console.log(result);
  return (
    <>
      <Inner>
        <SearchBook value={sw} setValue={setSw} handleSearch={handleSubmit} />
        <br />
        {loading && <div>검색중입니다...</div>}

        {result?.length === 0 && <div>검색결과가 없습니다.</div>}
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
