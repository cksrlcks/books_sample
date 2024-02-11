"use client";
import useSWR from "swr";
import NoticeDetail from "@/components/NoticeDetail";
import BackButton from "@/components/BackButton";
import { Notice } from "@/types/notice";
import Inner from "@/components/Inner";

export default function page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useSWR<Notice>(`/api/notice/${params.id}`);

  return (
    <>
      <BackButton path="/book" />
      <Inner>
        {isLoading && <div>불러오는중...</div>}
        {data && <NoticeDetail post={data} />}
      </Inner>
    </>
  );
}
