"use client";

import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import { RecentBook } from "@/types/book";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const router = useRouter();
  const { data, error, isLoading, size, setSize, isEmpty, isEnd, mutate } =
    useInfiniteFetch<RecentBook>({
      url: "/api/book",
      limit: 20,
    });

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }
    setSize(size + 1);
  }, [inView]);

  const handleDelete = async (book_id: number) => {
    await fetch(`/api/book/${book_id}`, {
      method: "DELETE",
    });
    mutate();
    router.refresh();
  };

  return (
    <div>
      <Link href="/admin/book/add">책추가하기</Link>
      <br />
      <br />
      <table>
        <tbody>
          {data?.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>
                <button type="button">수정</button>
              </td>
              <td>
                <button type="button" onClick={() => handleDelete(book.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEnd && (
        <div>
          <br />
          책을 모두 불러왔습니다.
        </div>
      )}
      <div ref={ref} style={{ width: "100%", height: "30px" }}></div>
    </div>
  );
}
