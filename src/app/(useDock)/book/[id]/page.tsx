import BookDetail from "@/components/BookDetail";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  return <BookDetail bookId={params.id} />;
}
