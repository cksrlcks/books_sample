import useSWR from "swr";
import styles from "./style.module.css";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";

export default function ActivityBar() {
  const { data, isLoading } = useSWR(`/api/me`);
  return (
    <div className={styles.bar}>
      <Link href="/mypage/activity?type=like">
        <FcLike /> {isLoading ? "-" : data.likes.data.length}
      </Link>
      <Link href="/mypage/activity?type=comment">
        <FcComments /> {isLoading ? "-" : data.comments.data.length}
      </Link>
    </div>
  );
}
