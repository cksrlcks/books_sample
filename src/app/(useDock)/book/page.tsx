import BookList from "@/components/BookList";
import React from "react";
import { BookList as fakeList } from "@/mock/bookList";
import Book from "@/components/BookCard";
import PageTitle from "@/components/PageTitle";
import SearchBook from "@/components/SearchBook";
export default function BookPage() {
  return (
    <div>
      <PageTitle name="책" />
      <SearchBook />
      <br />
      <br />
      <br />
      <div>책리스트 (인피니티 스크롤로 만들기)</div>
      <br />
      <BookList items={fakeList} />
    </div>
  );
}
