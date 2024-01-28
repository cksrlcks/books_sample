"use client";

import React, { FormEventHandler, useState } from "react";
import styles from "./style.module.css";

export default function SearchBook() {
  const [sw, setSw] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSw(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${sw} 검색`);
  };
  return (
    <form className={styles.searchBox} onSubmit={handleSearch}>
      <input
        type="text"
        value={sw}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        검색
      </button>
    </form>
  );
}
