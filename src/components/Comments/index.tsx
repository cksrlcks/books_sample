import styles from "./style.module.css";
import { BookData } from "@/types/book";
import { User } from "@/types/user";
import DeleteButton from "./DeleteButton";
import Timeago from "../Timeago";
export default function Comments({
  user,
  book,
}: {
  user: User | null;
  book: BookData;
}) {
  const comments = book.comments;
  if (!comments.length) {
    return <div className={styles.empty}>작성된 코멘트가 없습니다.</div>;
  }
  return (
    <div className={styles.list}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.header}>
            <div className={styles.user}>
              <span className={styles.name}>{comment.username}</span>
              <span className={styles.email}>({comment.email})</span>
            </div>
            <div className={styles.control}>
              {user?.id === comment.user_id && (
                <DeleteButton comment_id={comment.id} />
              )}
            </div>
          </div>
          <div className={styles.content}>{comment.comment}</div>
          <span className={styles.date}>
            <Timeago date={comment.created_at} />
          </span>
        </div>
      ))}
    </div>
  );
}
