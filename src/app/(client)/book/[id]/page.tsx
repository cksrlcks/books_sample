"use client";
import useSWR from "swr";
import BookDetail from "@/components/BookDetail";
import Skeleton from "@/components/BookDetail/skeleton";
import BackButton from "@/components/BackButton";

export default function page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useSWR(`/api/book/${params.id}`);

  return (
    <>
      <BackButton path="/book" />
      {isLoading ? <Skeleton /> : <BookDetail book={data} />}
    </>
  );
}
