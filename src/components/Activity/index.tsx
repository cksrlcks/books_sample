import useSWR from "swr";
import styles from "./style.module.css";
import Link from "next/link";

export default function ActivityBar({ userId }: { userId: string }) {
  const { data, isLoading } = useSWR(`/api/activity?user_id=${userId}`);
  if (data) {
    return (
      <div className={styles.bar}>
        <Link href="/mypage/liked">좋아요 : {data.likes.data.length}</Link>
        <Link href="/mypage/comment">코멘트 : {data.comments.data.length}</Link>
      </div>
    );
  }
}
