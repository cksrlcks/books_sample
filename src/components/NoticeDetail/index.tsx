import { Notice } from "@/types/notice";
import Timeago from "../Timeago";
import styles from "./style.module.css";

export default function NoticeDetal({ post }: { post: Notice }) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.date}>
          <Timeago date={post.created_at} />
        </div>
      </div>
      <div className={styles.content}>{post.content}</div>
    </>
  );
}
