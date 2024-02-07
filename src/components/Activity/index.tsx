import useSWR from "swr";
import styles from "./style.module.css";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";

export default function ActivityBar() {
  const { data: likes, isLoading: likesLoading } = useSWR(`/api/me/like`);
  const { data: comments, isLoading: commentsLoading } =
    useSWR(`/api/me/comment`);
  return (
    <div className={styles.bar}>
      <Link href="/mypage/activity?type=like">
        <FcLike /> {likesLoading ? "-" : likes.length}
      </Link>
      <Link href="/mypage/activity?type=comment">
        <FcComments /> {commentsLoading ? "-" : comments.length}
      </Link>
    </div>
  );
}
