import BookList from "@/components/BookList";
import React from "react";
import PageTitle from "@/components/PageTitle";
import SearchBook from "@/components/SearchBook";
export default async function BookPage() {
  return (
    <div>
      <PageTitle name="책" />
      <SearchBook />
      <br />
      <br />
      <br />
      <div>책리스트 (인피니티 스크롤로 만들기)</div>
      <br />
      <BookList />
    </div>
  );
}
