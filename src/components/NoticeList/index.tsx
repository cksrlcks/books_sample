"use client";
import { useEffect } from "react";
import Link from "next/link";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import { useInView } from "react-intersection-observer";
import { Notice } from "@/types/notice";
import styles from "./style.module.css";
import Timeago from "../Timeago";

export default function NoticeList() {
  const { data, error, isLoading, size, setSize, isEmpty, isEnd } =
    useInfiniteFetch<Notice>({
      url: "/api/notice",
      limit: 10,
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

  return (
    <div>
      {isLoading && <div>가져오는중...</div>}

      <ul className={styles.list}>
        {data?.map((post) => (
          <Link
            href={`/mypage/notice/${post.id}`}
            key={post.id}
            className={styles.item}
          >
            <span className={styles.title}>{post.title}</span>
            <span className={styles.date}>
              <Timeago date={post.created_at} />
            </span>
          </Link>
        ))}
      </ul>
      {/* {isEnd && <div className={styles.done}>모두 불러왔습니다.</div>} */}
      <div ref={ref} style={{ width: "100%", height: "30px" }}></div>
    </div>
  );
}
