"use client";

import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.module.css";

export default function SearchBook({
  value,
  setValue,
  handleSearch,
}: {
  value: string;
  setValue: (sw: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, []);
  return (
    <form className={styles.searchBox} onSubmit={handleSearch}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력해주세요"
        className={styles.searchInput}
        ref={inputRef}
      />
      <button type="submit" className={styles.searchButton}>
        검색
      </button>
    </form>
  );
}
