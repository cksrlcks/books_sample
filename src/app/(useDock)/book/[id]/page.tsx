import BookDetail from "@/components/BookDetail";
import { getBook } from "@/services/postServer";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { data, error } = await getBook(params.id);
  return <BookDetail bookId={params.id} book={data} />;
}
